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
