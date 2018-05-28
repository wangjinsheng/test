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


var bkeys = new Array("ali","阿里","网易","京东","天猫","支付宝","华为","百度","滴滴","美团","拼多多",
	"去哪网","趣拿","新浪","有赞","挖财","腾讯","大众","菜鸟","饿了么","拉扎斯","携程","微店","平安科技","58","贝贝","蘑菇街",
	"美丽联合","小米","唯品会","360","汽车超人","淘宝","蚂蚁","1号店","搜狗","搜狐","众安","宜信","头条",
	"爱奇艺","微博","小红书","点我","高德","聚划算","微贷");
	bkeys.push("曹操");
	bkeys.push("兑吧");

var messagelist = [];
	messagelist.push("考虑我们51信用卡的机会吗？");
	messagelist.push("我们这边有挺多岗位的，也比较急缺");
	messagelist.push("有意向可以交流起来");
// messagelist.push("期待您的回复！");

// ---------------------------自定义数组---------------------------------

function sendMessageToContentScriptByPostMessage()
{
	//window.postMessage({cmd: 'message', data: data}, '*');
	var itemList = getItemList();
	for (var i = 0; i < 40; i++) {
		var extrnal = i * 400;
		// alert(extrnal);
		sleep(extrnal).then(() => {
           $("#recommend-list li").each(function (i) {
				if($(this).is(":hidden")){
					return;
				}
				var divText = $(this).children("a").children("div.text").html();
				if(divText == undefined){
					var objectHtml = $(this).children("a").children("div.chat-info").children("div.text").html();
					hideSelfDiv(this,objectHtml,itemList,"list");
				}else{
					// alert(divText);
					hideSelfDiv(this,divText,itemList,"other");
				}

				var deleteSpanItem = $(this).children("div .sider-op").children("span.deleteSpanItem").html();
				// alert(deleteSpanItem);

				if(typeof(deleteSpanItem) == "undefined"){
					var dataUid = $(this).children('a').attr("data-uid");

			   		var link = '<span class="deleteSpanItem" style="cursor:pointer" onclick="deleteSpanItem('+dataUid+')">过滤</span>';
			   		// alert(dataUid);
					$(this).children("div .sider-op").prepend(link);
				}
			});
			// clickLoadmoreDiv();
			$("div.loadmore").click();
		})
	};
}

function queryNew(){
	var itemList = getItemList();

	for (var i = 0; i < 40; i++) {
		var extrnal = i * 400;
		// alert(extrnal);
		sleep(extrnal).then(() => {
           $("#recommend-list li").each(function (i) {
				if($(this).is(":hidden")){
					return;
				}
				var divText = $(this).children("a").children("div.text").html();
				if(divText == undefined){
					var objectHtml = $(this).children("a").children("div.chat-info").children("div.text").html();
					hideSelfDivQueryNeq(this,objectHtml,itemList,"list");
				}else{
					// alert(divText);
					hideSelfDivQueryNeq(this,divText,itemList,"other");
				}
				
				var deleteSpanItem = $(this).children("div .sider-op").children("span.deleteSpanItem").html();
				// alert(deleteSpanItem);

				if(typeof(deleteSpanItem) == "undefined"){
					var dataUid = $(this).children('a').attr("data-uid");

			   		var link = '<span class="deleteSpanItem" style="cursor:pointer" onclick="deleteSpanItem('+dataUid+')">过滤</span>';
			   		// alert(dataUid);
					$(this).children("div .sider-op").prepend(link);
				}
			});

           
			// clickLoadmoreDiv();
			$("div.loadmore").click();
		})
	};
}
function hideSelfDivQueryNeq(item,value,itemList,list){
	var flag = ifneedHideQueryNeq(item,value,itemList,list);
	if (!flag) {
		$(item).hide();
	};

}
function ifneedHideQueryNeq(item,value,itemList,list){
	var flag = true;
	if (list == 'list') {
		if (flag) {
			var nextOne = $(item).children("div.sider-op").html();
			if(nextOne.search("继续沟通")!=-1){
				flag = false;
			}
		};

		if (flag) {
			var graduat = $(item).children("a").children("div.info-labels").html();
			if(graduat.search("应届生")!=-1 || graduat.search("大专")!=-1 || graduat.search("1年")!=-1){
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

	var dataUid = $(item).children("a").attr("data-uid");
	if(flag){
		$.each(itemList,function(index,indexItem){
		if(indexItem == dataUid){
				// alert(dataUid);
				flag = false;
			}
		});
	}
	return flag;
}

function hideSelfDiv(item,value,itemList,list){
	var flag = ifneedHide(item,value,itemList,list);
	if (!flag) {
		$(item).remove();
	};

}

function ifneedHide(item,value,itemList,list){
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
			if(graduat.search("应届生")!=-1 || graduat.search("大专")!=-1 || graduat.search("1年")!=-1){
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
	var dataUid = $(item).children("a").attr("data-uid");
	if(flag){
		$.each(itemList,function(index,indexItem){
		if(indexItem == dataUid){
				// alert(dataUid);
				flag = false;
			}
		});
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
		if(graduat.search("应届生")!=-1 || graduat.search("大专")!=-1 || graduat.search("1年")!=-1){
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
					nextQuickMessage($(this).children("div.sider-op").children("button"));//延时点击
				}
				
				index = index + 1;
			}
		}
	});
}

// 一键快速消息发送
function quickMessageNew(){
	var index = 0;
	$("#recommend-list li").each(function(i){
		if(!$(this).is(":hidden")){
			// alert($(this).html());
			var objectHtml = $(this).children("a").children("div.chat-info").children("div.text").html();
			var flag =  (this,objectHtml,"list");
			if(ifHide){
				if(index < 1){
					$(this).children("div.sider-op").children("button").click();
					nextQuickMessage($(this).children("div.sider-op").children("button"));//延时点击
				}
				
				index = index + 1;
			}
		}
	});
}

function nextQuickMessage(item){
	setTimeout(function(){
			$(item).click();
			setTimeout(function(){
				sendMessageToCandidate();
				setTimeout(function(){
					goBackMuen();
				},400);
			},600);
		},800);
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

function clickLoadmoreDiv(){
	setTimeout(function(){
		$("div.loadmore").click();
		setTimeout(function(){
			$("div.loadmore").click();
		},300);

	},300);
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function testStore(){
	// alert(333);
	$("#recommend-list li").each(function(i){
   		// alert($(this).children('a').attr("data-uid"));
   		var itemlink = $(this).children('a');
   		var dataUid = itemlink.attr("data-uid");
   		var link = '<span onclick="deleteSpanItem('+dataUid+')">span</span>';
   		// $(this).children('a').children("div.info-labels").append(link); 
   		// alert( $(this).children("div .sider-op").html());
		$(this).children("div .sider-op").prepend(link);

   	});
	
}

function deleteSpanItem(item){
	// alert(item)
	storeItem(item);
}

function storeItem(param){
	var storage=window.localStorage;
  	var realJobId;
  	$("div.dropdown-menu li").each(function(i){
  		if($(this).hasClass('cur')){
  			var jobid = $(this).attr("data-jobid");
  			if(typeof(jobid) != "undefined"){
  				realJobId = jobid;
  			}
  		}
  	});
  	// storage.removeItem(realJobId);
 	var itemList;
 	var storExp=storage.getItem(realJobId);
 	// alert(storExp);
 	if (!storExp && typeof(storExp)!="undefined" && storExp!=0) { 

		itemList = [];
	}else{
		// itemList = JSON.parse(storExp);
		itemList = storExp.split(',');
	}


	var operateItem = param;
	var flag = false;
	$.each(itemList,function(index,item){
	if(item == operateItem){
			flag = true;
		}
	})

	if(!flag){
		itemList.push(operateItem);
	}
   	storage.setItem(realJobId,itemList);
}

function getItemList(){
	var storage=window.localStorage;
  	var realJobId;
  	$("div.dropdown-menu li").each(function(i){
  		if($(this).hasClass('cur')){
  			var jobid = $(this).attr("data-jobid");
  			if(typeof(jobid) != "undefined"){
  				realJobId = jobid;
  			}
  		}
  	});
  	// storage.removeItem(realJobId);
 	var itemList;
 	var storExp=storage.getItem(realJobId);
 	// alert(storExp);
 	if (!storExp && typeof(storExp)!="undefined" && storExp!=0) { 

		itemList = [];
	}else{
		// itemList = JSON.parse(storExp);
		itemList = storExp.split(',');
	}
	return itemList;
}

