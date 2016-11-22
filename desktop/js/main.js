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
        initialSlide: 0,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        coverflow: {
            rotate: 45,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        }
    });