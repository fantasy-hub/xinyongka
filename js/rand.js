var $dom = $(document),
    $coverct = $('.coverct'),
    $coverch = $('.coverbg__change'),
    lock = true,
    x1, x2, y1, y2, isMove, direction1, direction2;

//声明页面
var rand;
//声明卡种
var cardNum;

//对数组进行随机取值
function sendNum(arr) {
	  return arr[Math.floor(Math.random()*arr.length)];
}

// 获取本地存储的商机卡: cardNum返回1或2或3
function getStorageCard() {
    cardNum = localStorage.getItem('Type');
    return cardNum;
}

/**
 * 默认rand-1优享信用卡
 * 5-粉丝信用卡，6-fm信用卡，7-joy信用卡
 * 2-理财金卡，3-理财白金卡，4-财富卡
 */
function randCard() {
	  var randArr1 = [1, 5, 6, 7],
	      randArr2 = [2, 3, 4];
		  
	 if(cardNum === 1) {
		return rand = sendNum(randArr1);
	 } else if(cardNum === 2) {
		 return rand = sendNum(randArr2);
	 } else {
		 return rand = Math.floor(Math.random()*7 + 1);  
	 }
}

// 获取本地存储的客户昵称
function getStorage() {
    let name = localStorage.getItem('Name');
    return name;
}


// 客户提示信息
function renderName() {
    let entry = document.querySelector('.entry__title');
    let name = getStorage();
	console.log(rand);
	if(rand === 1 || rand ===5 || rand === 6 || rand ===7) {
		entry.innerHTML = `以下是为${name}推荐的信用卡：`;
	} else {
		entry.innerHTML = `以下是为${name}推荐的理财卡：`;
	}
}


//信用卡右边栏轮盘：一开始中心位置展示的第三章卡片
var oindex = 2;

var cardJson = [
    {
        type: 1,
        name: '银色版标准白金卡',
        code: '卡种代码：07503',
        link: 'url("./img/series/sidecard/07503-1.png")'
    },
    {
        type: 2,
        name: '三人组标准白金卡',
        code: '卡种代码: 07502',
        link: 'url("./img/series/sidecard/07502-1.png")'
    },
    {
        type: 3,
        name: '多彩版标准白金卡',
        code: '卡种代码: 07504',
        link: 'url("./img/series/sidecard/07504-1.png")'
    },
    {
        type: 4,
        name: '纯爱版甜蜜款',
        code: '卡种代码: 07509',
        link: 'url("./img/series/sidecard/07509-1.png")'
    },
    {
        type: 5,
        name: '莎莉标准白金卡',
        code: '卡种代码: 07507',
        link: 'url("./img/series/sidecard/07507-1.png")'
    }
];
var joyJson = [
    {
        type: 1,
        name: '万事达标准白金卡',
        code: '卡种代码：29501',
        link: 'url("./img/series/sidecard/29501-1.png")'
    },
    {
        type: 2,
        name: '银联标准白金卡',
        code: '卡种代码: 09701',
        link: 'url("./img/series/sidecard/09701-1.png")'
    },
    {
        type: 3,
        name: 'VISA标准白金卡',
        code: '卡种代码: 29301',
        link: 'url("./img/series/sidecard/29301-1.png")'
    },
    {
        type: 4,
        name: 'JOY银联金卡（学生版）',
        code: '卡种代码: 19401',
        link: 'url("./img/series/sidecard/joycard-1.png")'
    },
    {
        type: 5,
        name: '银联标准白金卡',
        code: '卡种代码: 09701',
        link: 'url("./img/series/sidecard/09701-1.png")'
    }
]
var fmJson = [
    {
        type: 1,
        name: '喜马拉雅大咖主题版金卡（横版）',
        code: '卡种代码：11802',
        link: 'url("./img/series/sidecard/11802-1.png")'
    },
    {
        type: 2,
        name: '喜马拉雅大咖主题版金卡（竖版）',
        code: '卡种代码: 01803',
        link: 'url("./img/series/sidecard/11803-1.png")'
    },
    {
        type: 3,
        name: '喜马拉雅FM标准金卡',
        code: '卡种代码: 11801',
        link: 'url("./img/series/sidecard/11801-1.png")'
    },
    {
        type: 4,
        name: '喜马拉雅FM标准白金卡',
        code: '卡种代码: 02801',
        link: 'url("./img/series/sidecard/02801-1.png")'
    },
    {
        type: 5,
        name: '喜马拉雅大咖主题版标准白金卡',
        code: '卡种代码: 02802',
        link: 'url("./img/series/sidecard/02802-1.png")'
    }
]

function styleChange() {

    var $ct = $('.ct');

    $('.server').hide();
    $('.four-child').hide();
    $('.joy').hide();
    $('.wealth').hide();
    $('.feature').hide();
    $('.wrap__sidebar').hide();

        
    if(rand === 2) {
        //更改样式
        $('.code').hide();
        $('.server').show();
        $ct.addClass('ct2');
        //更换内容
        $('.wrap__series').html('建行理财金卡');
        $('.items-1__intro .items__introhead').html('投资理财，保值增值');
        $('.items-1__intro .items__introtext').html('通过建行理财卡，您可以办理外汇买卖、国债、基金、第三方存管等一系列投资理财业务，是您获取更高收益的理财好帮手。');
        $('.items-2__intro .items__introhead').html('境外交易');
        $('.items-2__intro .items__introtext').html('可在全球150多个国家及地区通用。')
        $('.items-3__intro .items__introhead').html('代收代付，方便灵活');
        $('.items-3__intro .items__introtext').html('您可将建行理财卡作为代发工资账户，也可用于代扣代缴有关费用，省去了您提取现金及现金缴费的烦恼。');
        $('.items-4__intro .items__introhead').html('尊贵服务， 超值享受');
        $('.items-4__intro .items__introtext').html('持有本卡的客户在全省范围内，可以在建设银行理财中心、理财窗口或贵宾室，由专职的客户经理提供理财服务，享受各项优先优惠政策带来的便捷和尊贵感。');
        $('.items-5__intro .items__introhead').html('短信通知，安全体贴');
        $('.items-5__intro .items__introtext').html('建设银行将通过手机短信方式为您提供账户金额变动实时通知、到期提醒、亲情问候、金融信息服务等服务，使您对自己的资金状况了如指掌。此项功能需要签约开通。')
        $('.items-6__intro .items__introhead').html('渠道广泛，用卡便捷');
        $('.items-6__intro .items__introtext').html('除在遍布全国的建行柜台交易外，您还可以在建行自助设备、电话银行、网上银行、手机银行上进行交易，随时随地体验用卡乐趣。');
        $('.side__card-num').hide();
        $('.side__intro').html('建行理财卡具有现金存取、支付结算、证券交易、外汇买卖、购物消费、账户管理及其他理财签约服务等功能，并可享受建设银行提供的优先优惠、理财咨询等多项尊贵服务。建行理财卡有白金卡、金卡两个品种供客户选择。');
    }

    if(rand === 3 ) {
        //更改样式
        $('.code').hide();
        $('.server').show();
        $ct.addClass('ct3');
        //更换内容
        $('.wrap__series').html('建行理财白金卡');
        $('.items-1__intro .items__introhead').html('投资理财，保值增值');
        $('.items-1__intro .items__introtext').html('通过建行理财卡，您可以办理外汇买卖、国债、基金、第三方存管等一系列投资理财业务，是您获取更高收益的理财好帮手。');
        $('.items-2__intro .items__introhead').html('境外交易');
        $('.items-2__intro .items__introtext').html('可在全球150多个国家及地区通用。');
        $('.items-3__intro .items__introhead').html('代收代付，方便灵活');
        $('.items-3__intro .items__introtext').html('您可将建行理财卡作为代发工资账户，也可用于代扣代缴有关费用，省去了您提取现金及现金缴费的烦恼。');
        $('.items-4__intro .items__introhead').html('尊贵服务， 超值享受');
        $('.items-4__intro .items__introtext').html('持有本卡的客户在全国范围内，可以在建设银行理财中心、理财窗口或贵宾室，由专职的客户经理提供理财服务，享受各项优先优惠政策带来的便捷和尊贵感。');
        $('.items-5__intro .items__introhead').html('短信通知，安全体贴');
        $('.items-5__intro .items__introtext').html('建设银行将通过手机短信方式为您提供账户金额变动实时通知、到期提醒、亲情问候、金融信息服务等服务，使您对自己的资金状况了如指掌。此项功能需要签约开通。');
        $('.items-6__intro .items__introhead').html('渠道广泛，用卡便捷');
        $('.items-6__intro .items__introtext').html('除在遍布全国的建行柜台交易外，您还可以在建行自助设备、电话银行、网上银行、手机银行上进行交易，随时随地体验用卡乐趣。');
        $('.side__card-num').hide();
        $('.side__intro').html('建行理财卡具有现金存取、支付结算、证券交易、外汇买卖、购物消费、账户管理及其他理财签约服务等功能，并可享受建设银行提供的优先优惠、理财咨询等多项尊贵服务。建行理财卡有白金卡、金卡两个品种供客户选择。')
    }

    if(rand === 4) {
        $('.six-child').detach();
        $('.four-child').detach();
        $('.joy').detach();

        $('.code').hide();
        $('.wealth').show();
        $('.server').show();

        $ct.addClass('ct4');

        $('.wrap__series').html('建行财富卡');
        $('.side__card-num').hide();
        $('.side__intro').html('建行金融IC卡是建设银行采用PBOC标准IC（集成电路）技术发行的新型银行卡，除具备消费、转账、存取现、一卡多户、代收代付等传统银行卡功能外，还可同时加载其他增值服务和行业管理功能，具有使用安全、应用广泛、支付便捷等特点。目前，建行金融IC卡包括龙卡通、理财卡、财富管理和私人银行卡、准贷记卡等多个卡种，在社保、医疗、交通、教育等公共服务领域均有广泛应用，同时还在金融IC卡基础上推出了移动支付等创新产品。');

        setInterval(function(){
            turns('.wealth__introhead', '.wealth__introtext');
        }, 10000);

    }

    if(rand === 5) {
        $('.six-child').hide();
        $('.four-child').show();
        $('.wrap__side').hide();
        $('.wrap__sidebar').show();
        $('.feature').show();
        
        $ct.addClass('ct5');

        $('.wrap__series').html('LINEFRIENDS粉丝信用卡');
    }

    if(rand === 6) {
        $('.six-child').hide();
        $('.four-child').show();
        $('.wrap__side').hide();
        $('.wrap__sidebar').show();

        $ct.addClass('ct6');

        $('.wrap__series').html('龙卡喜马拉雅FM信用卡');
        $('.ite-1__intro .ite__introhead').html('免货币兑换手续费');
        $('.ite-1__intro .ite__introtext').html('免去持卡人所有外币交易的货币兑换手续费。 ');
        $('.ite-2__intro .ite__introhead').html('专属卡面设计');
        $('.ite-2__intro .ite__introtext').html('喜马拉雅FM龙卡标准版卡面采用复古“黑胶唱片”与现代播放软件“播放”按钮结合的图案，唱片上紧密环绕着喜马拉雅FM的节目分类，展现复古与现代相结合的设计理念。大咖主题版卡面由马东及奇葩天团成员亲自设计，并经粉丝海选后确定，限时发行。');
        $('.ite-3__intro .ite__introhead').html('赫兹Hertz租车权益');
        $('.ite-3__intro .ite__introtext').html('持卡人可在赫兹Hertz美国、泰国门店享受：标准白金卡87折礼遇，金卡9折礼遇。');
        $('.ite-4__intro .ite__introhead').html('贴心的出行保障');
        $('.ite-4__intro .ite__introtext').html('刷卡购买机票或支付旅费（含机票）可享受金卡最高100万元、标准白金卡最高500万元高额航空意外险保障。挂失前48小时境外盗刷，可享境外失卡保障服务（标准白金卡最高2万元，金卡最高1万元)。');
    }

    if(rand === 7) {
        $('.six-child').detach();
        $('.four-child').detach();
        $('.wealth').detach();

        $('.wrap__side').hide();
        $('.wrap__sidebar').show();
        $('.joy').show();
        $('.feature').show();

        $ct.addClass('ct7');

        $('.wrap__series').html('龙卡JOY信用卡');
        $('.items-1__intro .items__introhead').html('');
        $('.items-1__intro .items__introtext').html('');
        $('.items-2__intro .items__introhead').html('');
        $('.items-2__intro .items__introtext').html('');
        $('.items-3__intro .items__introhead').html('');
        $('.items-3__intro .items__introtext').html('');
        $('.items-4__intro .items__introhead').html('');
        $('.items-4__intro .items__introtext').html('');
        $('.items-5__intro .items__introhead').html('');
        $('.items-5__intro .items__introtext').html('');
        $('.items-6__intro .items__introhead').html('');
        $('.items-6__intro .items__introtext').html('');

        setInterval(function(){
            turns('.joy__introhead', '.joy__introtext');
        }, 10000);
    }

    $ct.show();

    if(rand === 1 || rand === 2 || rand === 3 ) {
        $('.four-child').detach();
        $('.joy').detach();
        $('.wealth').detach();

        setInterval(function() {
            turns('.items__introhead', '.items__introtext');
        }, 10000);
    }
    
    if(rand === 5 || rand === 6) {
        $('.six-child').detach();
        $('.joy').detach();
        $('.wealth').detach();

        setInterval(function() {
            turns('.ite__introhead', '.ite__introtext');
        }, 10000);
    }

}


/**
 * @param 先淡出 然后替换内容，替换好了淡入
 * @param 关键代码：$li.eq(i).find('.items__icon').removeClass().addClass('items__icon ' + arr[i].icon).attr('iconname', arr[i].icon);
 */
function turns(head, text) {
    var $ct = $('.content__list'),
        $li = $ct.find('.list__item'),
        arr = [];
    // 保存内容
    for(var i = 0; i < $li.length; i++) {
        arr.push({
            title: $li.eq(i).find(head).html(),
            desc: $li.eq(i).find(text).html(),
            icon: $li.eq(i).find('.items__icon').attr('iconname')
        });
    }
    // console.log(arr)
    // 全部淡出
    // $li.removeClass('fadein').addClass('fadeout');
    setTimeout(function() {
        // 内容向下窜一位
        arr.splice(0, 0, arr[arr.length - 1]);
        arr.pop();
        // 绑定新数据
        // console.log(arr)
        for(var i = 0; i < $li.length; i++) {
            $li.eq(i).find(head).html(arr[i].title);
            $li.eq(i).find(text).html(arr[i].desc);
            $li.eq(i).find('.items__icon').removeClass().addClass('items__icon ' + arr[i].icon).attr('iconname', arr[i].icon);
        }
        // 全部淡入
        // $li.removeClass('fadeout').addClass('fadein');
    }, 1200);
}



/**
 * @param 取得dom transform属性的rotate值
 */
function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}

//信用卡右边栏轮盘
function sideCaro() {
    function playPre() {
        var $ct = $('.sidebar__imgbg');
        // let oldDeg = getRotationDegrees($ct);

        //匹配角度
        let strRaw = +$ct[0].style.transform.match(/[-]{0,1}[\d]*[\.]{0,1}[\d]+/g)[0];
        $ct.css('transform', `rotate(${strRaw - 36}deg)`);

        oindex === 4 ? oindex = 0 : oindex++;
  
        if(rand === 5) {
            $('.sidebar__intro-head').html(cardJson[oindex].name);
            $('.sidebar__intro-type').html(cardJson[oindex].code);
            $('.content__card').css('background-image', cardJson[oindex].link);
        }
        if(rand === 6) {
            $('.sidebar__intro-head').html(fmJson[oindex].name);
            $('.sidebar__intro-type').html(fmJson[oindex].code);
            $('.content__card').css('background-image', fmJson[oindex].link);
        }
        if(rand === 7) {
            $('.sidebar__intro-head').html(joyJson[oindex].name);
            $('.sidebar__intro-type').html(joyJson[oindex].code);
            $('.content__card').css('background-image', joyJson[oindex].link);
        }
    }
    function playNext() {
        var $ct = $('.sidebar__imgbg');
        // let oldDeg = getRotationDegrees($ct);
        let strRaw = +$ct[0].style.transform.match(/[-]{0,1}[\d]*[\.]{0,1}[\d]+/g)[0];
        $ct.css('transform', `rotate(${strRaw + 36}deg)`);
        
        oindex === 0 ? oindex = 4 : oindex--;
        // console.log(oindex % 5);
        if(rand === 5) {
            $('.sidebar__intro-head').html(cardJson[oindex].name);
            $('.sidebar__intro-type').html(cardJson[oindex].code);
            $('.content__card').css('background-image', cardJson[oindex].link);
        }
        if(rand === 6) {
            $('.sidebar__intro-head').html(fmJson[oindex].name);
            $('.sidebar__intro-type').html(fmJson[oindex].code);
            $('.content__card').css('background-image', fmJson[oindex].link);
        }
        if(rand === 7) {
            $('.sidebar__intro-head').html(joyJson[oindex].name);
            $('.sidebar__intro-type').html(joyJson[oindex].code);
            $('.content__card').css('background-image', joyJson[oindex].link).fadeIn();
        }
    }
    // $('.sidebar__ct').on('touchstart touchmove touchend', function(e) {
    //     var touch = e.originalEvent.targetTouches[0];
    //     if(e.type == 'touchstart') {
    //         x1 = touch.pageX;
    //         y1 = touch.pageY;
    //     }
    //     else if(e.type == 'touchmove') {
    //         x2 = touch.pageX;
    //         y2 = touch.pageY;
    //         isMove = true;
    //     }
    //     else if(e.type == 'touchend') {
    //             direction1 = Math.abs(x2 - x1), //绝对值
    //             direction2 = y2 - y1;
    //         //向上滑动
    //         if(direction1 < 100 && direction2 < -100 && isMove) {
    //             playPre();
    //             isMove = false;
    //         }
    //         //向下滑动
    //         else if(direction1 < 100 && direction2 > 100 && isMove) {
    //             playNext();
    //             isMove = false;
    //         }
    //     }
    // })

    $('.sidebar__ct').on('mousedown', function(e) {
        e.preventDefault();
        x1 = e.screenX;
        y1 = e.screenY;
        // console.log(x1, y1);
    }).on('mouseup', function(e) {
        x2 = e.screenX;
        y2 = e.screenY;
        // console.log(x1, y1, x2, y2);
        direction1 = Math.abs(x2 - x1), //绝对值
        direction2 = y2 - y1;
        //向上滑动
        if(direction2 < -100) {
            playPre();
        }
        //向下滑动
        else if(direction2 > 100) {
            playNext();
        }
    });
}


function server() {
    $dom.on('click', '.switch-mode', function(){
        window.location.href = './index.html';
    });

    $dom.on('click', '.server__text', function() {
        $('.coverwrap').fadeIn();
        $coverch.show().removeClass('fadeout').addClass('fadein');

        // 调用呼叫接口
        sendCmd_callReceiver();
    });
}


/**
 * todo 一键呼叫，调用接口
*/
function sendCmd_callReceiver() {
    var succFlag = false;
    var data = {};
    data._fw_service_id = "stm.queryApplicationParam";
    data.transaction_id = "stm.queryApplicationParam";
    data.jsonData = {};
    data.jsonData.param_id = "ZHYH_CALL_RECEIVER";
    data.jsonData.condition_data = {};
    data.jsonData.condition_data.devType = "1";
    data.jsonData.ins_id = "[_Blng_InsID_]";
    invokeShell(JSON.stringify(data), function (rs) {
        //成功： "{"needSignFlag": false,"BK_STATUS": "00","RESULT_DATA":[ "receiver": "10677661"}]"
        var jObj;
        var queryReceiverFlag = true;
        if (rs) {
            try {
                jObj = JSON.parse(rs);
            }
            catch (e) {
                queryReceiverFlag = false;
            }
        }
        if (queryReceiverFlag == true && jObj != null && jObj.BK_STATUS == "00" && jObj.RESULT_DATA && jObj.RESULT_DATA.length > 0) {
            var count = 0;
            var resultLen = jObj.RESULT_DATA.length;
            for (var i = 0; i < resultLen; i++) {
                var data = {};
                data._fw_service_id = "CommonService";
                data.transaction_id = "mdm-push-to-user";//生产环境去掉-test,测试环境加上-test
                //data.transaction_id = "mdm-push-to-user-test";//生产环境去掉-test,测试环境加上-test
                jsonMsgData = {};
                jsonMsgData.pkgName = "com.ccb.ecpmobile.ecp";
                jsonMsgData.title = "智慧银行呼叫";
                jsonMsgData.desc = "信用卡理财卡产品互动区域有客户想咨询产品";
                jsonMsgData.showFlag = "Y";
                jsonMsgData.fromUser = "ZHYH_MJ";
                //jsonMsgData.toUser="72852068";//根据实际情况传入
                jsonMsgData.toUser = jObj.RESULT_DATA[i].receiver;//根据实际情况传入
                jsonMsgData.detail = {};
                jsonMsgData.detail.content = "信用卡理财卡产品互动区域有客户想咨询产品";
                jsonMsgData.detail.extraData = "";
                jsonMsgData.metaData = {};
                jsonMsgData.metaData.msgType = "SMBK";
                jsonMsgData.metaData.pageId = "";
                data.jsonData = {};
                data.jsonData.msg = JSON.stringify(jsonMsgData);
                data.jsonData.ins_id = "[_Blng_InsID_]";
                invokeShell(JSON.stringify(data), function (rs) {
                    count++;
                    //成功： "{"total": 0,"errors": {},"status": 200,"records": [],"success": true}"
                    var callReceiverFlag = true;
                    if (rs) {
                        try {
                            resultJObj = JSON.parse(rs);
                        }
                        catch (e) {
                            callReceiverFlag = false;
                        }
                    }
                    if (resultJObj && callReceiverFlag && succFlag == false && resultJObj.status == 200 && resultJObj.success == true) {
                        succFlag = true;//呼叫成功一个即可
                        console.log(1);
                        setTimeout(function() {
                            $('.tel__icon-0').nextUntil().hide();
                            $('.tel__icon-0').show();
                            $(".coverbg__change-text").html("呼叫成功,请稍等!");
                        },3000);

                        setTimeout(function() {
                            $('.coverwrap').fadeOut();
                            $coverch.removeClass('fadein').addClass('fadeout').hide();

                            //为下一次点击一键办理进行展示内容的更改
                            $(".coverbg__change-text").html("正在为您呼叫工作人员，请稍等～");
                            $('.tel__icon-0').hide();
                            $('.tel__icon-0').nextUntil().show();
                        }, 6000);

                    }
                    if (count == resultLen && succFlag == false) {
                        //call_success(succFlag);    
                        $(".coverbg__change-text").html("呼叫失败,请重试!");
                        setTimeout(function() {
                            $('.coverwrap').fadeOut();
                            $coverch.removeClass('fadein').addClass('fadeout').hide();

                            $(".coverbg__change-text").html("正在为您呼叫工作人员，请稍等～");
                            $('.tel__icon-0').hide();
                            $('.tel__icon-0').nextUntil().show();
                        }, 3000);
                    }
                });
            }
        } else {
            succFlag = false;
            //call_success(succFlag);    
            $(".coverbg__change-text").html("呼叫失败,请重试!");
            setTimeout(function() {
                $('.coverwrap').fadeOut();
                $coverch.removeClass('fadein').addClass('fadeout').hide();

                $(".coverbg__change-text").html("正在为您呼叫工作人员，请稍等～");
                $('.tel__icon-0').hide();
                $('.tel__icon-0').nextUntil().show();
            }, 3000);
        }

    });
}

function invokeShell(data, callback) {

    boundAsync.p2TransRequest(data).then(function (rs) {
        if (callback)
            callback(rs);
    });
}

function jslog(level, msg) {
    boundAsync.jslog(level, msg).then(function (rs) {
    });
}

function callP2Service(transId, jsonData, callback) {
    var jsonDataQry = {};
    jsonDataQry._fw_service_id = "simpleTransaction";
    jsonDataQry.transaction_id = transId;
    jsonDataQry.jsonData = JSON.stringify(jsonData);

    boundAsync.p2TransRequest(JSON.stringify(jsonDataQry)).then(function (rs) {
        try {
            rs = JSON.parse(rs);
            callback(rs);
        } catch (e) {
            console.log("数据错误，返回数据为：");
            console.log(rs);
        }


    });
}

//无人操作退回首页
let body = document.querySelector('body');
function noHuman() {
    let timer = 0;
    let revtime = setTimeout(function(){
        window.location.href = "./index.html";
    }, 30000)
    body.addEventListener('touchstart',function(){
        clearTimeout(revtime);
        clearTimeout(timer);
    }, false);
    body.addEventListener('touchend',function(){
        timer = setTimeout(function () {
            window.location.href = "./index.html";
        }, 30000);
    }, false);
}

$(function() {
	getStorageCard();
	randCard();
    styleChange();
    server();
    sideCaro();
    renderName();
    noHuman();
});