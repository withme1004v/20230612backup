$(function(){

	/* 공유 하기 버튼*/ 
	$(".share-toggle").on("click",function(){
		$(this).closest(".share").toggleClass("hover");
	});

	/* 상단으로 이동 */ 
	$(".quick-top").on("click",function(){
		$("html, body").animate({"scrollTop":"0"},300);
	});

	var counterUp = window.counterUp["default"];
	var $counters = $(".counter");
	$counters.each(function (ignore, counter) {
		var waypoint = new Waypoint( {
			element: $(this),
			handler: function() { 
				counterUp(counter, {
					duration: 300,
					delay: 1
				}); 
				this.destroy();
			},
			offset: 'bottom-in-view',
		} );
	});

	
	$(".c-chart").waypoint(function(){
		$(".c-chart li").each(function(){
			var widthx = $(this).attr("data-class");
			$(this).find(".bar").animate({width: widthx+"%"},450);
		});
	},{offset:"70%"});
	

	
	$(".page .contents").each(function(){
		var waypoint = new Waypoint( {
			element: $(this),
			handler: function(direction) { 
				if(direction === "down") {
					$(this.element).parent().find(".header").removeClass("fixed").addClass("after");
				}
			},
			offset: 'bottom-in-view',
		} );
	});

	$(".page .contents").each(function(){
		var waypoint = new Waypoint( {
			element: $(this),
			handler: function(direction) { 
				if (direction === "up") {
					$(this.element).parent().find(".header").removeClass("fixed").removeClass("after");
				}
			},
			offset: '0',
		} );
	});

	$(".page .contents").each(function(){
		var waypoint = new Waypoint( {
			element: $(this),
			handler: function(direction) { 
				if (direction === "up") {
					$(".header").removeClass("fixed");
					$(this.element).parent().find(".header").addClass("fixed").removeClass("after");
				}
			},
			offset:  'bottom-in-view',
		} );
	});

	$(".header-inner").each(function(){
		var waypoint = new Waypoint({
			element: $(this),
			handler: function(direction) { 
				$(this.element).parent().addClass("fixed").removeClass("after");
			},
			offset: 'bottom-in-view',
		} );
	});

	if ($("#chart").length > 0 ) {
		var chart = new Chart(document.getElementById('chart'), {
			type: 'doughnut',
			data: {
				//labels: ["paper", "plastic", "wood", "other"],
				datasets: [{
					data: [66, 20, 8, 8],
					backgroundColor: [
						'rgba(41, 174, 85, 1)',
						'rgba(98, 195, 131, 1)',
						'rgba(155, 217, 177, 1)',
						'rgba(212, 239, 224, 1)',
					],
					borderWidth: 0
				}]
			},
			
			options: {
				tooltips: {enabled: false},
   				hover: {mode: null},
				
			  }
		});
	}

	var swiper1 = new Swiper('.slider1 .swiper-container', {
		slidesPerView: 'auto',
      	spaceBetween: 24,
		loop: true,
		pagination: {
			el: '.slider1 .swiper-pagination',
			type: 'bullets',
			clickable: true,
		  },
	});
	var swiper2 = new Swiper('.slider2 .swiper-container', {
		slidesPerView: 'auto',
      	spaceBetween: 24,
		loop: true,
		pagination: {
			el: '.slider2 .swiper-pagination',
			type: 'bullets',
			clickable: true,
		  },
	});
	var swiper3 = new Swiper('.slider3 .swiper-container', {
		slidesPerView: 'auto',
      	spaceBetween: 24,
		loop: true,
		pagination: {
			el: '.slider3 .swiper-pagination',
			type: 'bullets',
			clickable: true,
		  },
	});
	var swiper4 = new Swiper('.slider4 .swiper-container', {
		slidesPerView: 'auto',
      	spaceBetween: 24,
		loop: true,
		pagination: {
			el: '.slider4 .swiper-pagination',
			type: 'bullets',
			clickable: true,
		  },
	});
	var swiper5 = new Swiper('.slider5 .swiper-container', {
		slidesPerView: 'auto',
      	spaceBetween: 24,
		loop: true,
		pagination: {
			el: '.slider5 .swiper-pagination',
			type: 'bullets',
			clickable: true,
		  },
	});
	var swiper6 = new Swiper('.slider6 .swiper-container', {
		slidesPerView: 'auto',
      	spaceBetween: 24,
		loop: true,
		pagination: {
			el: '.slider6 .swiper-pagination',
			type: 'bullets',
			clickable: true,
		  },
	});

	$(".toggle-wrap .toggle-btn").on("click",function(){
		$(this).toggleClass("on");
		$(this).parent().find(".toggle-hidden").slideToggle();
	});

	$(".tooltip-button").on("click",function(){
		var txt = $(this).next(".v-portal").text();
		$(".info-text").text(txt);
		$("header").css("z-index",10);
		$(".dimmed").show();
		$(".info-content").stop().animate({"bottom":'0'},300);
	});

	$(".close").on("click",function(){
		$(".info-content").stop().animate({"bottom":'-300px'},300);
		$("header").css("z-index",13);
		$(".dimmed").stop().fadeOut(300);
	});
});



