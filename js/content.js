
var len = imgs.length,
	index = 0;

var rightCon = document.getElementById('rightCon');
var rightBtn = document.getElementById('rightBtn');

var topMenu = document.getElementById('topMenu');
var area = document.getElementById('logo');
var leftCon = document.getElementById('leftCon');
var art = document.getElementsByTagName('article');
var areaMain = document.getElementsByTagName('header');

var count = 1;
var timer;
//点击角色状态
var state = 1;
var width;
var height;
var rightConH;
var rightConW;


rightCon.onmouseover = changeRole_1;

rightBtn.onclick = rollBack;

rightBtn.onmouseover = changeImg;

rightBtn.onmouseout = fomalImg;

changeRole('rightCon2','rightCon1',200,2000);

areaMain[0].onmouseover = topMenuBlock;

art[0].onmouseover = topMenuNone;


//图片预加载+上下页切换
$.preload(imgs,{
	order:'ordered'
})
$('.btn').on('click',function(){
	if($(this).data('control')==='prev'){//上一张。通过当前对象获取data的control对比得到具体值
		index=Math.max(0,--index);
	}else{//下一张
		index=Math.min(len-1,++index);
	}
	document.title=(index+1)+'/'+len;
	$('#img').attr('src',imgs[index]);
});
//顶部菜单与左侧菜单显示
function topMenuBlock(){
	area.style.opacity = '0';
	topMenu.style.top = "0";
	leftCon.style.left = "0";
}
//顶部菜单与左侧菜单消失
function topMenuNone(){
	area.style.opacity = '1';;
	topMenu.style.top = "-80px";
	leftCon.style.left = "-150px";
}
//一组图片动作切换
function changeRole(content1,content2,sameGroup,nextGroup){
	// if(sameGroup==null||sameGroup=="")sameGroup=200;
	// if(nextGroup==null||nextGroup=="")nextGroup=2000;
	clearTimeout(timer);
	//alert(content1);
	if(count%2==0){
		rightCon.className = "rightCon "+content2;
		count++;
		timer=setTimeout('changeRole("'
				+content1+'","'
				+content2+'","'
				+sameGroup+'","'
				+nextGroup+'")',parseInt(sameGroup));
	}else{
		count++;
		rightCon.className = "rightCon "+content1;
		timer=setTimeout('changeRole("'
				+content1+'","'
				+content2+'","'
				+sameGroup+'","'
				+nextGroup+'")',parseInt(nextGroup));
	}
}
//变更角色动作
function changeRole_1(){
	clearTimeout(timer);
	rightCon.style.width = "110px";
	rightCon.className = "rightCon rightCon3";

	count = 2;
	rightBtn.style.display = "block";
	if(state == '1' || state == '2'){
		changeRole('rightCon3','rightCon4','300','300');
		state++;
	}
	else{
		//二次点可击执行语言框弹出
		state = 1;
		changeRole('rightCon3','rightCon4','300','300');
	}
}
//点击角色回滚按钮触发事件
function rollBack(){
	rightCon.style.width = "45px";
	rightCon.style.right = '0';
	//rightCon.style.bottom = '20%';
	rightBtn.style.display = "none";
	state = 1;
	clearTimeout(timer);
	changeRole('rightCon2','rightCon1',200,2000);
}
//变更人物按钮样式
function changeImg(){
	var backCon = document.getElementById('backCon');
	backCon.src="images/tool3.jpg";
}
//重置人物按钮样式
function fomalImg(){
	var backCon = document.getElementById('backCon');
	backCon.src="images/tool2.jpg";
}
/*拖放事件开始*/
rightCon.ondragstart = function(e){  
    //console.log('事件源p3开始拖动');  
    //记录刚一拖动时，鼠标的偏移量
    width = document.body.clientWidth || document.documentElement.clientWidth;
    height = document.body.clientHeight || document.documentElement.clientHeight;  
    offsetX= e.offsetX;  
    offsetY= e.offsetY;
    rightConH = rightCon.offsetHeight;
    rightConW = rightCon.offsetWidth;
    console.log(rightConH+","+rightConW)
    //console.log(width) 
}
rightCon.ondrag = function(e){  
	//console.log('事件源p3拖动中');  
	var x= e.pageX;  
	var y= e.pageY;  
	//console.log(x+'-'+y);  
	//drag事件最后一刻，无法读取鼠标的坐标，pageX和pageY都变为0  
	if(x==0 && y==0){  
	    return; //不处理拖动最后一刻X和Y都为0的情形  
	}  
	
	x-=offsetX;  
	y-=offsetY;
	// rightCon.style.left = x+'px';  
	// rightCon.style.top = y+'px';

	x+=rightConW;
	y+=rightConH;
	
	rightCon.style.right = (width-x)+'px';  
	rightCon.style.bottom = (height-y)+'px';   
}
rightCon.ondragend = function(){  
    //console.log('源对象p3拖动结束');  
}
/*拖放事件结束*/