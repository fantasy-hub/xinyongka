// import './reset.css'
// import './face.scss'
// import './flexible'

let flag = 0;
let cardNum;

(function init() {
    // backHome();
    // //调用摄像头拍照
    // enableCamera();

    setTimeout(function () {
        window.location.href = './rand.html'
    }, 3000);
})()

/**
 * 启用摄像头
 */
function enableCamera() {
    boundAsync.controlCamera('00').then(function(rs) {
        // console.log(rs);
        if(JSON.parse(rs).status !== '01') {
            console.log('启用摄像头成功');
            // detectCamera()
           
            cameraApi();
           
        } else  {
            console.log('启用摄像头失败');
        }
    });
}
/**
 * 关闭摄像头
 */
function disableCamera() {
    boundAsync.controlCamera('01').then(function(rs) {
        console.log(rs);
    });
}

/**
*接收浏览器消息
*/

function receiveBrowserMsg(data) {
    // console.log("receiveBrowserMsg:"+ JSON.stringify(data));
    let info = JSON.parse(JSON.stringify(data));
    
    if(info.CommandParam == '02' && flag) {
        console.log('接受消息成功')

        // closeDetectCamera();
    } 
}


function cameraApi() {
    
    boundAsync.cameraCapture().then(function (rs) {
        console.log( JSON.parse(rs));

        var base64 = JSON.parse(rs).base64img;
        // 显示拍照图片
        
        //获取特征码（个人信息）
        var data = {
                    _fw_service_id : "faceFeatruesService",
                    transaction_id : "",
                    action : "/soleface/facenumber",
                    jsonData :{
                        serviceName: "06", //07获取特征码  //06获取个人信息
                        searchType: "02",  //01:查本地库；02：查远程库
                        src: base64  
                    }
                }
        //  获取特征码（个人信息）      
        boundAsync.faceRecHttpRequest(JSON.stringify(data)).then(function (rs) {
            console.log( JSON.parse(rs));
            let info = JSON.parse(rs);
            flag++;
            console.log(flag)
            if (base64) {
                document.querySelector('.face-img').src = 'data:image/jpeg;base64,' + base64;
            }
            
            //扫描成功
            if (info.entity.CST_GRP && info.entity.CST_GRP.lenght > 0 || flag === 2) {
                console.log('识别成功');
                // flag = false;
                // isSuccess = true;
                document.querySelector('.face-img').src = 'data:image/jpeg;base64,' + base64;
                // if (flag === 2)
                console.log(info.entity.CST_GRP);
                if(info.entity.CST_GRP && info.entity.CST_GRP.lenght > 0) {
                    let name = info.entity.CST_GRP[0].Cst_Nm; //姓名
                    let foo = info.entity.CST_GRP[0].Gnd_Cd_DESC;
										let id = info.entity.CST_GRP[0].Crdt_No; //身份证号
                    successFace(name, foo, id);
                } else {
                    successFace();
                }
                
            
            } else {
                // 扫描识别
                console.log('识别失败，未获取得数据');
                // flag = false;
                // isSuccess = false;
                reFace();
                document.querySelector('.face-img').src = 'data:image/jpeg;base64,' + base64;
            }     
        })

    })
}

// 人脸识别成功:name是姓，desc是性别
function successFace(name, desc, id) {
    let prompt = document.querySelector('.tip__title');
    let type = '';
    let localName = '';
    if (name && desc) {
				//根据客户个人信息查询商机 参数：姓名 身份证号
				qryPersonalCommercialOpportunity(name, id)
				
        if (desc === '女') {
        type = '女士';
        } else {
            type = '先生';
        }
        name = name.slice(0, 1);
        prompt.innerHTML = `识别成功！您好，${name}${type}！`;
        localName = `${name}${type}`;
				
    } else {
        prompt.innerHTML = `识别成功！`;
        localName = '您';
    }
    disableCamera();
    storageHandle(localName);
    setTimeout(function () {
        prompt.innerHTML = `正在为您推荐…`;
    }, 1000);
    setTimeout(function () {
        window.location.href = './rand.html'
    }, 2500);
}

//创建本地存储客户称呼 和 商机卡
function storageHandle(data, type) { 
    localStorage.clear();
    localStorage.setItem('Name', data);
    
    // 推荐信用卡类型
    localStorage.setItem('Type', type);
}

// 重新扫描
function reFace() {
    let prompt = document.querySelector('.tip__title');
    prompt.innerHTML = '请移动您的脸部到识别框内';
    setTimeout(function(){
        cameraApi();
    },2000)
}
// 返回首页按钮
function backHome() {
    let back = document.querySelector('.switch-mode');
    back.addEventListener('click', function () {
        window.location.href = './index.html';
    }, false);
}


//根据客户个人信息查询商机
function qryPersonalCommercialOpportunity(name, id){		//查询个人商机
	var jsonDataQry = {};
		jsonDataQry._fw_service_id = "simpleTransaction";
		jsonDataQry.transaction_id = "A11610110-stm";
		jsonDataQry.jsonData = {
			Crdt_TpCd:"1010",
			Crdt_No: id, //json.baoxiang_Crdt_No 身份证
			Idv_Lgl_Nm: name, //json.baoxiang_Cst_Nm 姓名
			Cst_ID:"476110000000554138",
			Chnl_Txn_CD:"S0010001",
			OPER_CODE:'ZHYH0001',
			BRANCH_ID:"[_Blng_InsID_]",
			_auth_info:{
				TXN_STFF_ID:"ZHYH0001"
			},
			Rmrk_2:"2",
			TXN_ITT_CHNL_CGY_CODE:"20190031",
			TXN_ITT_CHNL_ID:"A004123456789123456789"
		}
	boundAsync.p2TransRequest(JSON.stringify(jsonDataQry)).then(function (res) {
        console.log(res)
        res = JSON.parse(res);
        if( res.BK_STATUS == "00" ){
        	if( !res.CmTch_GRP ){
        		qryPrdInfo();
        	}else{
        		qryPersonalCommercialOpportunityClassify( res.CmTch_GRP[0].SrcSys_PD_CD );
        	}
        	
        }else{
        	console.log("查询个人商机失败");
        	console.log(res)
        	qryPrdInfo();
        }
    });	
}

//如果取得类别号，就进行本地存储，将卡种信息传入rand.js
function qryPrdInfo(num) {
	if(num.length > 0) {
		if(num == "014") {
			localStorage.setItem('cardNum', 1);
		} else if(num == "002") {
			localStorage.setItem('cardNum', 2);
		}
	} else {
		localStorage.setItem('cardNum', 3);
	}
}

//查询商机分类
function qryPersonalCommercialOpportunityClassify( SrcSys_PD_CD ){
	var jsonDataQry = {};
		jsonDataQry._fw_service_id = "simpleTransaction";
		jsonDataQry.transaction_id = "A00210029-common";
		jsonDataQry.jsonData = {
			PD_Ctlg_ECD:"",
			PD_Ctlg_Hier_Cd:"",
			ASPD_ID: SrcSys_PD_CD ,
			ASPD_Nm:"",
			_pagination:{'PAGE_JUMP':1, 'REC_IN_PAGE':50},
		}
	boundAsync.p2TransRequest(JSON.stringify(jsonDataQry)).then(function (res) {
		console.log(res)
		try{
			res = JSON.parse(res);
		}catch(e){
			console.log(e)
			console.log(res)
		}
		
		/**
		 *查询卡种：信用卡还是理财卡
		 *todo 数据库未保存个人信息，所以无法进行卡种判断
		*/
		if( res.BK_STATUS == "00" ){
			if( res.PD_Lst_Itm ){
				//014-信用卡，002-理财卡
				if( res.PD_Lst_Itm[0].PD_Grp_ECD == "014" ){
					qryPrdInfo("014");
					
				}else if( res.PD_Lst_Itm[0].PD_Grp_ECD == "002" ){
					qryPrdInfo("002");
				}
// 				else if( res.PD_Lst_Itm[0].PD_Grp_ECD == "040" ){
// 					qryPrdInfo("040");
// 				}
			}else{
				console.log("商机返回无PD_Lst_Itm")
				qryPrdInfo();
			}
			
			
		}
	})
}
