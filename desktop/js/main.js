"use strict";

function setHTML(wrap,tpl,data){

}

$('.doctor-list').each(function(){
	var self = this;
	var url = $(this).data('json');
	$.ajax({
		url: url,
		type: "get",
		success: function(data){
			$(self).empty();
			$(data).each(function(index,item){
				var li = $('<li class="item-doctor"><div class="item-inner"><div class="img-wrap"><img src="pic/'+item.pic+'" /></div></div></li>');
				li.appendTo($(self));
			})
		}
	})
})
var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	initialSlide: 0
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
			$(this).css({"visibility":"visible"});
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
