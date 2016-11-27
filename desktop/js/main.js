"use strict";

function setHTML(wrap,tpl,data){

}

var pop = {
	masker: $('<div class="pop-masker"></div>'),
	wrap: $('<div class="pop-alert"></div>'),
	show: function(html){
		var self = this;
		this.masker.show();
		this.wrap.show().html(html);
		this.wrap.on('click',function(event){
			self.hide();
			event.stopPropagation();
		})
		this.wrap.find('.pop-wrap-inner').on('click',function(event){
			event.stopPropagation();
		})
	},
	alert: function(text){
		this.wrap.show().delay(1000).fadeOut(10,function(){
			$(this).empty();
		}).html('<div class="text">'+text+'</div>');
	},
	hide: function(){
		this.masker.hide();
		this.wrap.hide().empty();
	}
}
pop.masker.appendTo('body');
pop.wrap.appendTo('body');
$('.pop-icon-list li').each(function(){
	$(this).find('img').on('click',function(){
		if($(this).data('pop')){
			var html = '<img src="'+$(this).data('pop')+'" />';
			pop.show($('<div class="pop-wrap"><div class="pop-wrap-inner"><div class="img-wrap">'+html+'</div></div></div>'));
		}
	})
});

$('.hospital-list li').each(function(){
	$(this).on('mouseenter',function(){
		$(this).find('.cover').show();
	});
	$(this).on('mouseleave',function(){
		$(this).find('.cover').hide();
	});
})

$('.btn-menu').on('click',function(){
	if($(this).hasClass('down')){
		$(this).removeClass('down');
		$(this).siblings().show();
	}else{
		$(this).addClass('down');
		$(this).siblings().hide();
	}
	
})

$('.doctor-list').each(function(){
	var self = this;
	var url = $(this).data('json');
	$.ajax({
		url: url,
		type: "get",
		success: function(data){
			$(self).empty();
			$(data).each(function(index,item){
				var img = item.pop ? '<img data-pop="pic/'+item.pop+'" src="pic/'+item.pic+'" />' : '<img src="pic/'+item.pic+'" />';
				var cover = item.des ? '<div class="cover"><div class="name">'+item.name+'</div><div class="en">'+item.en+'</div><div class="des">'+item.des.replace('|','<br />')+'</div></div>' : null;
				var li = $('<li class="item-doctor"><div class="item-inner"><div class="img-wrap">'+img+'</div></div></li>');
				if(cover){
					$(cover).appendTo(li.find('.item-inner'))
					li.on('mouseenter',function(){
						$(this).find('.cover').show();
					});
					li.on('mouseleave',function(){
						$(this).find('.cover').hide();
					});
				}
				li.appendTo($(self));
			})
			if($(self).hasClass('pop-doctor-list')){
				$(self).find('li').each(function(){
					$(this).find('img').on('click',function(){
						if($(this).data('pop')){
							var html = '<img src="'+$(this).data('pop')+'" />';
							pop.show($('<div class="pop-wrap pop-doctor"><div class="pop-wrap-inner"><div class="img-wrap">'+html+'</div></div></div>'));
						}
					})
				});
			}
			if($(self).hasClass('pop-designer-list')){
				$(self).find('li').each(function(){
					$(this).find('img').on('click',function(){
						if($(this).data('pop')){
							var html = '<img src="'+$(this).data('pop')+'" />';
							pop.show($('<div class="pop-wrap pop-designer"><div class="pop-wrap-inner"><div class="img-wrap">'+html+'</div></div></div>'));
						}
					})
				});
			}
			
			
		}
	})
})
$('.swiper-slide').each(function(){
	var w = $(this).parent().parent().width();
	$(this).width(w)
})
var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	paginationClickable: '.swiper-pagination',
	initialSlide: 0,
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev'
});
$('.swiper-banner .next').on('click',function(){
	swiper.swipeNext();
});
$('.swiper-banner .prev').on('click',function(){
	swiper.swipePrev();
});

$(function(){
	$(".flipster").flipster({
		itemContainer: 'ul',
		itemSelector: 'li',
		style: 'coverflow',
		start: 'center',
		enableKeyboard: false,
		enableMousewheel: false,
		enableTouch: false,
		onItemSwitch: function(){}
	});

});
function aniFunc(wrap) {
	$(wrap).find('.animate').each(function() {
		if($(this).hasClass('img')){
			$(this).css({"opacity":"1"});
		}
		$(this).show().addClass($(this).attr('data-animate') + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass($(this).attr('data-animate') + ' animated animate');
		});
	});
}
function actionScroll(){
	$('.animate-banner').each(function(index,item){
		if($(window).height()+$(window).scrollTop() > $(item).offset().top){
			aniFunc($(item))
		}
	})
}
actionScroll();
$(window).on('scroll',_.throttle(actionScroll,300))
