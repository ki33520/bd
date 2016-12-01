$.extend({
	testAct: function(str,reg){
		return(reg.test(str));
	},
	testBasic: function(str){
		var bl = str ? true : false;
		return(bl);
	},
	testMail: function(str){
		var myReg = /^[.-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
		return($.testAct(str,myReg));
	},
	testPass: function(str){
		var myReg = /^[a-z0-9_-]{3,18}$/;
		return($.testAct(str,myReg));
	},
	testNumber: function(str){
		var myReg = /^[0-9]/;
		return($.testAct(str,myReg));
	},
	testMobile: function(str){
		var myReg = /^(1(([35][0-9])|(47)|[8][0123456789]))\d{8}$/;
		return($.testAct(str,myReg));
	},
	QueryString: function(str){
		var sValue=location.search.match(new RegExp("[\?\&]"+str+"=([^\&]*)(\&?)","i"));
		return sValue?sValue[1]:sValue;
	}
});
var pop = {
	wrap: $('<div class="pop-alert"></div>'),
	show: function(html){
		var self = this;
		this.wrap.show().html(html);
		this.wrap.on('click',function(){
			self.hide();
		})
	},
	alert: function(text){
		this.wrap.show().delay(1000).fadeOut(10,function(){
			$(this).empty();
		}).html('<div class="text">'+text+'</div>');
	},
	hide: function(){
		this.wrap.hide().empty();
	}
}
pop.wrap.appendTo('body');

var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	paginationClickable: '.swiper-pagination',
	initialSlide: 0,
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev'
});
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
$('.doctor-list').each(function(){
	var self = this;
	var url = $(this).data('json');
	var link = $(this).data('link');
	$.ajax({
		url: url,
		type: "get",
		success: function(data){
			$(self).empty();
			$(data).each(function(index,item){
				var img = link ? '<a href="'+link+'?node='+index+'"><img src="pic/'+item.pic+'" /></a>' :'<img src="pic/'+item.pic+'" />' ;
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
		}
	})
})

$('.doctor-detail').each(function(){
	var node = $.QueryString('node');
	$(this).find('.detail-item').eq(node).show();
})