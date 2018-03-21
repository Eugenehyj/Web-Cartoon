/*瀑布流数据开始*/
function diplayData(dataInt){
	//图片加载
	if(checkScrollSlide()==true){
		var oParent = document.getElementById('allBook');
		//将数据块渲染到页面尾部
		for(var i=0;i<dataInt.data.length;i++){
			var oBox = document.createElement('div');
			oBox.className = 'bookBox';
			oParent.appendChild(oBox);
			var oPic = document.createElement('div');
			oPic.className = 'pic';
			oBox.appendChild(oPic);
			var oImage = document.createElement('img');
			oImage.src = dataInt.data[i].src;
			oPic.appendChild(oImage);
		}
		//waterfall('allBook','bookBox');
		//displayPic();
	}
}
//当图片高度参差不齐时可调用自动补全
function waterfall(parent,box){
	//将allBook下所有class元素取出
	var oParent = document.getElementById(parent);
	var oBoxs = document.getElementsByClassName(box);
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(oParent.offsetWidth/oBoxW);
	//console.log(cols);
	var hArr = [];
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = "absolute";
			oBoxs[i].style.top = minH+'px';
			//oBoxs[i].style.left = oBoxW*index+'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
}
//获取当前位置from:waterfall
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
//检测是否具备滚动加载数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById('allBook');
	var oBoxs = document.getElementsByClassName('bookBox');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	//var height = document.body.offsetHeight || document.documentElement.offsetHeight;
	// console.log("scrollTop:"+scrollTop+" height:"+height);
	// console.log(document.body.clientHeight);
	// console.log((lastBoxH<scrollTop+height)?true:false);
	return (lastBoxH<scrollTop+height)?true:false;
}
/*瀑布流数据结束*/

/*全部书本页面开始*/
//使左侧菜单栏随滚动条置顶
function setFlow(){
	var typeMenu = document.getElementById('typeMenu');
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	if(scrollTop>=toTop){
		typeMenu.style.position = "fixed";
		typeMenu.style.top = '0';
		typeMenu.style.transition = 'all 0s';
	}
	else{
		typeMenu.style.position = "absolute";
		typeMenu.style.top = '107px';
	}
}
//获取左侧菜单栏到顶部的原始位置
var toTop;
function getTop(){
	var typeMenu = document.getElementById('typeMenu');
	toTop = typeMenu.offsetTop;
}
//启动页面是左侧菜单栏卷轴动画效果
function changeMenu(){
	var typeMenu = document.getElementById('typeMenu');
	typeMenu.style.height = "710px";
}
/*全部书本页面结束*/

/*详细页面开始*/
//漫画集数生成
function setImgChater(){
	var imgWidth = 700;
	var k = 1;
	var count = Math.floor(imgWidth/40);
	var imgContent = document.getElementById('imgContent');
	for(var i=0;i<count-1;i++){
		var childDiv = document.createElement('div');
		childDiv.className = 'img1';
		imgContent.appendChild(childDiv);
		var childImg = document.createElement('img');
		childImg.src = "./images/book1.jpg";
		//childImg.className = "stepImg";	//使用滚动页效果时赋值
		childImg.style.width = "700px";
		childImg.style.marginLeft = "-"+(40*(i+1))+"px"; 
		childDiv.appendChild(childImg);
		var childSpan = document.createElement('span');
		k+=1;
		childSpan.innerHTML = '第'+(k)+'话';
		childDiv.appendChild(childSpan);
	}
	//alert(count);
}
//
function changePage(){
	var btn = document.getElementsByClassName('btn');
	for(var i=0;i<btn.length;i++){
		btn[i].onclick = (function(arg){return function(){nextPage(arg);}})(i)
	}
}
//
var stepPage = 1; //滚动翻页使用
var times = 17; //滚动翻页使用
var max = 8;
var page;
function nextPage(n){
	var timer;
	stepPage = 1;
	times = 17;
	//stepPage = 0; //滚动翻页使用
	var btn = document.getElementsByClassName('btn');
	if(n=='0'){	
		page=Math.max(0,--page);	
		//sPage();
		collectPage();
	}else{
		page=Math.min(max,++page);
		//sPage();
		collectPage();
	}
}
//合并换页
function collectPage(){
	var img1 = document.getElementsByClassName('img1');
	if(stepPage > 16 ){
		if(times > 0){
			if(times == '17'){
				timer = setTimeout('collectPage()',1000);
				times--;
			}
			else{
				img1[times].style = '';
				times--;
				timer = setTimeout('collectPage()',70);
			}
		}
		else{
			times = 17;
			clearTimeout(timer);
		}
	}
	else{
		img1[stepPage].style.marginLeft = '-47px';
		stepPage++;
		timer = setTimeout('collectPage()',30);
	}
}
// 滚动页效果
// function sPage(){
// 	var stepImg = document.getElementsByClassName('stepImg');
// 	if(stepPage>16){
// 		if(times > 0){
// 			stepImg[times-1].style.transform = "";
// 			times--;
// 			timer = setTimeout('sPage()',100);
// 		}
// 		else{
// 			times = 17;
// 			clearTimeout(timer);
// 		}
// 	}else{
// 		toTurn(stepImg[stepPage]);
// 		stepPage++;
// 		timer = setTimeout('sPage()',70);
// 	}
// }
//右侧图片添加点击事件
function otherImages(){
	var otherImg = document.getElementsByClassName('otherImg');
	for(var i=0;i<otherImg.length;i++){
		otherImg[i].onclick = (function(arg){return function(){imagesToText(arg);}})(i)
	}
}
//旋转动画第一步
var imgTiner;
var change = 1;
function imagesToText(index){
	var otherImg = document.getElementsByClassName('otherImg');
	if(change == 1){
		toBiger(otherImg[index]);
	}
	else{
		toBigTurn(otherImg[index]);	
	}
	imgTiner=setTimeout('imagesToBack('+index+')',200);
}
//旋转动画第二步
function imagesToBack(index){
	var otherImg = document.getElementsByClassName('otherImg');
	var oImg = otherImg[index].getElementsByTagName('img');
	if(change == 1){
		toBigTurn(otherImg[index]);
		setTimeout(function(){oImg[0].style.opacity = "0";},300);
	}
	else{
		toBiger(otherImg[index]);
		setTimeout(function(){oImg[0].style.opacity = "1";},300);
	}
	imgTiner=setTimeout('imagesToEnd('+index+')',500);
}
//旋转动画第三步
function imagesToEnd(index){
	var otherImg = document.getElementsByClassName('otherImg');
	if(change == 1){
		toTurn(otherImg[index]);
		change++;
	}
	else{
		change = 1;
		otherImg[index].style.transform = "";
	}
}
//放大
function toBiger(obj){
	obj.style.transform = "scale(1.1)";
}
//放大和旋转
function toBigTurn(obj){
	obj.style.transform = "scale(1.1) rotateY(180deg)";
}
//旋转
function toTurn(obj){
	obj.style.transform = "rotateY(180deg)";
}
/*详细页面结束*/