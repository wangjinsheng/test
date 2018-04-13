// 通过DOM事件发送消息给content-script
(function() {
	var customEvent = document.createEvent('Event');
	customEvent.initEvent('myCustomEvent', true, true);
	// 通过事件发送消息给content-script
	function sendMessageToContentScriptByEvent(data) {
		data = data || '你好，我是injected-script!';
		var hiddenDiv = document.getElementById('myCustomEventDiv');
		hiddenDiv.innerText = data
		hiddenDiv.dispatchEvent(customEvent);
	}
	window.sendMessageToContentScriptByEvent = sendMessageToContentScriptByEvent;
})();

// 通过postMessage调用content-script
function invokeContentScript(code)
{
	window.postMessage({cmd: 'invoke', code: code}, '*');
}

// ---------------------------自定义数组---------------------------------

var bkeys = [];
	bkeys.push("ali");
	bkeys.push("阿里");
	bkeys.push("网易");
	bkeys.push("京东");
	bkeys.push("天猫");
	bkeys.push("支付宝");
	bkeys.push("华为");
	bkeys.push("百度");
	bkeys.push("滴滴");
	bkeys.push("美团");
	bkeys.push("拼多多");
	bkeys.push("去哪网");
	bkeys.push("趣拿");
	bkeys.push("新浪");
	bkeys.push("有赞");
	bkeys.push("挖财");
	bkeys.push("腾讯");
	bkeys.push("大众");
	bkeys.push("菜鸟");
	bkeys.push("饿了么");
	bkeys.push("拉扎斯");
	bkeys.push("携程");
	bkeys.push("微店");
	bkeys.push("平安科技");
	bkeys.push("58");
	bkeys.push("贝贝");
	bkeys.push("蘑菇街");
	bkeys.push("美丽联合");
	bkeys.push("小米");
	bkeys.push("唯品会");
	bkeys.push("360");
	bkeys.push("汽车超人");

var messagelist = [];
	messagelist.push("考虑我们51信用卡的机会吗？");
	messagelist.push("我们这边有挺多岗位的，也比较急缺");
	messagelist.push("有意向可以交流起来");
// messagelist.push("期待您的回复！");

// ---------------------------自定义数组---------------------------------

function sendMessageToContentScriptByPostMessage()
{
	//window.postMessage({cmd: 'message', data: data}, '*');
	$("#recommend-list li").each(function (i) {
		if($(this).is(":hidden")){
			return;
		}
		var divText = $(this).children("a").children("div.text").html();
		if(divText == undefined){
			var objectHtml = $(this).children("a").children("div.chat-info").children("div.text").html();
			// var flag = false;
			// $.each(bkeys,function(index,item){
			// 	if(objectHtml.search(item)!=-1){
			// 		flag = true;
			// 	}
			// })

			// if (flag) {
			// 	var nextOne = $(this).children("div.sider-op").html();
			// 	if(nextOne.search("继续沟通")!=-1){
			// 		flag = false;
			// 	}
			// };
			
			// if (!flag) {
			// 	$(this).hide();
			// };
			hideSelfDiv(this,objectHtml,"list");
		}else{
			// alert(divText);
			hideSelfDiv(this,divText,"other");
		}
	});
}

function hideSelfDiv(item,value,list){
	var flag = ifneedHide(item,value,list);
	if (!flag) {
		$(item).hide();
	};

}

function ifneedHide(item,value,list){
	var flag = false;
	$.each(bkeys,function(index,item){
		if(value.search(item)!=-1){
			flag = true;
		}
	})
	if (list == 'list') {
		if (flag) {
			var nextOne = $(item).children("div.sider-op").html();
			if(nextOne.search("继续沟通")!=-1){
				flag = false;
			}
		};

		if (flag) {
			var graduat = $(item).children("a").children("div.info-labels").html();
			if(graduat.search("应届生")!=-1){
				flag = false;
			}
		};
	};

	if (flag) {
		if(value.search("外派")!=-1){
			flag = false;
		}
		if(value.search("外包")!=-1){
			flag = false;
		}
	}
	return flag;
}

function quickIfHide(item,value,list){
	var flag = false;
	$.each(bkeys,function(index,item){
		if(value.search(item)!=-1){
			flag = true;
		}
	})
	if (list == 'nextOne') {
		if (flag) {
			var nextOne = $(item).children("div.sider-op").html();
			if(nextOne.search("继续沟通")!=-1){
				flag = false;
			}
		};
	};

	if (flag) {
		var graduat = $(item).children("a").children("div.info-labels").html();
		if(graduat.search("应届生")!=-1){
			flag = false;
		}
	};
	

	if (flag) {
		if(value.search("外派")!=-1){
			flag = false;
		}
		if(value.search("外包")!=-1){
			flag = false;
		}
	}
	return flag;
}


//发消息，快速发消息方法
function sendMessageToCandidate(){
	var chatdiv = $("#container").children("div.chat-container").children("div.sec-content").children("div.detail-box")
	.children("div.chat-wrap").children("div.chat-tab-content").children("div.chat-editor");

	$.each(messagelist,function(index,item){
		$(chatdiv).children("div.chat-message").html(item);

		var chatOp = $(chatdiv).children("div.chat-op");
		var chatOpBt = $(chatOp).children("button");
		$(chatOpBt).removeClass("btn-disabled");
		$(chatOpBt).click();
	});
}

function requestDisable(){
	var chatdiv = $("#container").children("div.chat-container").children("div.sec-content").children("div.detail-box")
	.children("div.chat-wrap").children("div.chat-tab-content").children("div.chat-editor");
	var resumeItem = $(chatdiv).children("div.chat-controls").children("a")
	// alert($(resumeItem).html());
	$(resumeItem).removeClass("disabled");

	$(chatdiv).children("div.chat-controls").children("a.btn-resume").children("span").html("求简历");
}


function requestWeixin(){
	doRequest("btn-weixin");
}
function requestResume(){
	var chatdiv = $("#container").children("div.chat-container").children("div.sec-content").children("div.detail-box")
	.children("div.chat-wrap").children("div.chat-tab-content").children("div.chat-editor");
	
	var chatOp = $(chatdiv).children("div.chat-op");
	var chatOpBt = $(chatOp).children("button");
	if($(chatdiv).children("div.chat-controls").children("a.btn-resume").hasClass("disabled")){
		$(chatdiv).children("div.chat-message").html("方便发一份简历过来吗？");
		$(chatOpBt).click();
	}

	doRequest("btn-resume");
}

function doRequest(dataName){
	var chatdiv = $("#container").children("div.chat-container").children("div.sec-content").children("div.detail-box")
	.children("div.chat-wrap").children("div.chat-tab-content").children("div.chat-editor");
	$(chatdiv).children("div.chat-controls").children("a."+dataName).click();

	// alert($(".dialog-container").html());
	$(".dialog-container").children("div.dialog-footer").children("div.btns").children("span.btn-sure").click();
}

// 一键快速消息发送
function quickMessage(data){
	var index = 0;
	$("#recommend-list li").each(function(i){
		if(!$(this).is(":hidden")){
			// alert($(this).html());
			var objectHtml = $(this).children("a").children("div.chat-info").children("div.text").html();
			var ifHide = ifneedHide(this,objectHtml,data);
			if(ifHide){
				if(index < 1){
					$(this).children("div.sider-op").children("button").click();
				}
				
				index = index + 1;
			}
		}
	});
}

function receiverResume(){
	var chatdiv = $("#container").children("div.chat-container").children("div.sec-content").children("div.detail-box")
	.children("div.chat-wrap").children("div.chat-tab-content");
	$(chatdiv).children("div.notice-dialog").children().children("span.btn-agree").click();
}

function goBackMuen(){
	var muenA = $("div.side-menu").children("dl.menu-recommend").children().children();
	// alert($(muenA).html());
	$(muenA).click();
}
