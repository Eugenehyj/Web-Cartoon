var t;
//1.数据定义
var data=[
	{img:1,h1:'Creative',h2:'名侦探柯南'},
	{img:2,h1:'Friendly',h2:'海贼王'},
	{img:3,h1:'Tranquilent',h2:'狐妖小红娘'},
	{img:4,h1:'Insecure',h2:'一人之下'},
	{img:5,h1:'Loving',h2:'王牌御史'},
	{img:6,h1:'Passionate',h2:'银魂'},
	{img:7,h1:'Crazy',h2:'火影忍者'}
];
//2.通用函数
//alert(g('.main-i'));
function g(id){
	if(id.substr(0,1) == '.'){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}

//3.添加幻灯片的操作
function addSliders(){
	
	//3.1获取模板
	var tpl_main = g('template_main').innerHTML
			.replace(/^\s*/,'')
			.replace(/\s*$/,'');
	//alert(tpl_main);
	var tpl_ctrl = g('template_ctrl').innerHTML
			.replace(/^\s*/,'')
			.replace(/\s*$/,'');
	//alert(tpl_ctrl);
	
	//3.2定义最终输出的HTML变量
	var out_main = [];
	var out_ctrl = [];
	
	//3.3遍历所有数据,构建最终输出的HTML
	for(i in data){
		var _html_main = tpl_main
				.replace(/{{index}}/g,data[i].img)
				.replace(/{{h2}}/g,data[i].h1)
				.replace(/{{h3}}/g,data[i].h2)
				.replace(/{{css}}/g,['','slider-i_right'][i%2]);
		
		var _html_ctrl = tpl_ctrl
				.replace(/{{index}}/g,data[i].img);
		
		out_main.push(_html_main);
		out_ctrl.push(_html_ctrl);
	}
	
	//3.4把HTMl回写到对应DOM里面
	g('template_main').innerHTML = out_main.join('');
	g('template_ctrl').innerHTML = out_ctrl.join('');

	//6.增加背景
	// g('template_main').innerHTML += tpl_main
	// 		.replace(/{{index}}/g,'{{index}}')
	// 		.replace(/{{h2}}/g,data[i].h1)
	// 		.replace(/{{h3}}/g,data[i].h2);
	// g('main_{{index}}').id = 'main_background';
}

//4.幻灯片切换
function switchSlider(n){
	if(t!=null)clearTimeout(t);
	if(n>7)n=1;
	//4.1获得要展现的幻灯片和控制按钮DOM
	var main = g('main_'+n);
	var ctrl = g('ctrl_'+n);

	//4.2获得所有的幻灯片以及控制按钮
	var clear_main = g('.slider-i');
	var clear_ctrl = g('.ctrl-i');
	//4.3清楚样式
	for(var i=0;i<clear_ctrl.length;i++){
		clear_main[i].className = clear_main[i].className
				.replace(' slider-i_active','');
		clear_ctrl[i].className = clear_ctrl[i].className
				.replace(' ctrl-i_active','');
	}
	//4.4增加样式
	main.className += ' slider-i_active';
	ctrl.className += ' ctrl-i_active';

	//6.2切换时，复制上一张幻灯片到main_background
	// setTimeout(function(){
	// 	g('main_background').innerHTML = main.innerHTML;
	// },1000);
	n+=1;
	t=setTimeout('switchSlider('+n+')',3000);
}

//5.动态调整图片margin-top使其水平居中
function movePictures(){
	var pictures = g('.picture');
	for(var i=0;i<pictures.length;i++){
		pictures[i].style.marginTop = '-'+pictures[i].clientHeight/2+'px';
	}
}

window.onload = function(){
	addSliders();
	switchSlider(1);
	setTimeout(function(){
		movePictures();
	},10);
}

//

//showB();

var roleTime = 0;
var roleBack = 1;
var roleTimer;
function showB(){
	var showBook = document.getElementById('showBook');
	showBook.style.top = '0';
}
function hiddenB(){
	var showBook = document.getElementById('showBook');
	showBook.style.top = '180px';
}
setRoleClick();
function setRoleClick(){
	var leftTips = document.getElementById('leftTips');
	var rightTips = document.getElementById('rightTips');
	var tips = [leftTips,rightTips];
	var name = ['leftTips','rightTips']
	leftTips.onclick = function(){
		bAndS();
		
		actionRole(tips,name);
	}
	rightTips.onclick = function(){
		bAndS();
		//randomBook();
		actionRole(tips,name);
	}
}
//展示图书停止动作
function bAndS(){
	var talk = document.getElementById('talk');
	hiddenB();
	setTimeout(function(){
		talk.style.display = "block";
	},2500);
	setTimeout(function(){
		showB();
		randomBook();
		clearTimeout(roleTimer);
	},3000);
}
roleBtn();
function roleBtn(){
	var talkBtn = document.getElementById('talkBtn');
	var talk = document.getElementById('talk');
	talkBtn.onclick = function(){
		talk.style.display = "none";
	}
}
//挥手图切换(三图为一组)
function actionRole(obj,name){
	clearTimeout(roleTimer);
	if(roleTime>2){
		if(roleBack > 0 ){
			obj[0].className = name[0] + " " + name[0] + roleBack;
			obj[1].className = name[1] + " " + name[1] + roleBack;
			roleBack--;
			roleTimer = setTimeout(function(){actionRole(obj,name)},100);
		}else{
			roleTime = 0;
			roleBack = 1;
			roleTimer = setTimeout(function(){actionRole(obj,name)},100);
		}
	}
	else{
		obj[0].className = name[0] + " " + name[0] + roleTime;
		obj[1].className = name[1] + " " + name[1] + roleTime;
		roleTime++;
		roleTimer = setTimeout(function(){actionRole(obj,name)},200);
	}
}

function randomBook(){
	var showBook = document.getElementById('showBook');
	var num = Math.floor(Math.random()*11);
	//alert(num);
	showBook.src="images/b"+num+".jpg";
}