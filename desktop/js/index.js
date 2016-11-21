"use strict";

require(["jquery","swiper"],function($,swiper) {
	var cssUrl = require.toUrl("./swiper.min.css");
	var cssTag = $('<link rel="stylesheet" type="text/css" href="'+cssUrl+'">');
	cssTag.appendTo('head');
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true
    });
    
	$('.add-sub').each(function(){
		var sub = $(this).find('.btn-sub'),
			add = $(this).find('.btn-add'),
			number = $(this).find('.number'),
			num = Number(number.text()),
			max = $(this).data('max');
		function count(){
			num = num + this;
			sub.removeClass('disabeld');
			add.removeClass('disabeld');
			if(num<=0){
				num = 0;
				sub.addClass('disabeld');
			}
			if(num>=max){
				num = max;
				add.addClass('disabeld');
			}
			number.text(num);
		}
		sub.on('click',count.bind(-1));
		add.on('click',count.bind(1));
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
			}).html('<div class="text flex flex-items-center flex-items-middle">'+text+'</div>');
		},
		hide: function(){
			this.wrap.hide().empty();
		}
	}
	pop.wrap.appendTo('body');
	$('.add-to-cart').on('click',function(e){
		pop.alert('<span class="icon icon-face">你已成功添加购物车</span>')
	});
	$('.select-menu .select-menu-inner').click(function(){
		var open = $('.select-menu').hasClass('open');
		if(open){
			$('.select-menu').removeClass('open')
		}else{
			$('.select-menu').addClass('open')
		}
	})
	$('.nav-control').each(function(){
		var masker = $('<div class="masker"></div>');
		$(this).find('.icon-setting').click(function(){
			var open = $('.nav-control').hasClass('open');
			if(open){
				$('.nav-control').removeClass('open');
				masker.remove();
			}else{
				$('.nav-control').addClass('open');
				masker.appendTo('body');
			}
		})
	})
	$('.order-item').each(function(index,item){
		$(item).find('.title').on('click',function(){
			var open = $(item).hasClass('open');
			if(open){
				$(item).removeClass('open')
			}else{
				$(item).addClass('open')
			}
		})
	})
});
