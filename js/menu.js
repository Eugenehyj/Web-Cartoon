$(document).ready(function(){
	var sub = $('#sub');

	var activeRow;
	var activeMenu;

	var timer;

	var mouseInSub = false;

	sub.on('mouseenter',function(){
		mouseInSub = true;
	}).on('mouseleave',function(){
		mouseInSub = false;
	});

	var mouseTrack = [];

	var moveHandler = function(e){
		mouseTrack.push({
			x: e.pageX,
			y: e.pageY
		});

		//alert(mouseTrack[2])

		if(mouseTrack.length > 3){
			mouseTrack.shift();
		}
	}

	$('#test')
		.on('mouseenter',function(){
			$(document).bind('mousemove',moveHandler);
		})
		.on('mouseleave',function(){
			sub.addClass('none');

			if(activeRow){
				activeRow.removeClass('active');
				activeRow = null;
			}

			if(activeMenu){
				activeMenu.addClass('none');
				activeMenu = null;
			}

			$(document).unbind('mousemove',moveHandler);
		})
		.on('mouseenter','li',function(e){
			sub.removeClass('none');
			if(!activeRow && e.target.nodeName == 'LI'){
				
				activeRow = $(e.target).addClass('active');
				
				activeMenu = $('#'+activeRow.data('id'));
				activeMenu.removeClass('none');
				
			}
			//实现deDom
			if(timer){
				clearTimeout(timer);
			}

			var currMousePos = mouseTrack[mouseTrack.length - 1];
			var leftCorner = mouseTrack[mouseTrack.length - 2];

			var delay = needDelay(sub,leftCorner,currMousePos);
			//alert(delay)   

			if(delay){
				timer = setTimeout(function(){
					if(mouseInSub){
						return;
					}
					if(e.target.nodeName == 'LI'){
						activeRow.removeClass('active');
						activeMenu.addClass('none');
						activeRow = $(e.target);
						activeRow.addClass('active');
						activeMenu = $('#' + activeRow.data('id'));
						activeMenu.removeClass('none');
						//实现deDom
						timer = null;
					}
				
				},300);
			}else{
				var prevActiveRow = activeRow;
				var prevActiveMenu = activeMenu;

				activeRow = $(e.target);
				activeMenu = $('#' + activeRow.data('id'));

				prevActiveRow.removeClass('active');
				prevActiveMenu.addClass('none');

				activeRow.addClass('active');
				activeMenu.removeClass('none');
			}
		})
});