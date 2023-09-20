$(function(){

    /* Title */
    if($('.visual.lush').length>0){
        $('html > head > title').text('러쉬소개 > 프레쉬 핸드메이드 코스메틱 러쉬');
    }
    if($('.visual.donation').length>0){
        $('html > head > title').text('기부와 나눔 > 캠페인 > 프레쉬 핸드메이드 코스메틱 러쉬');
    }
    if($('.report').length>0){
        $('html > head > title').text('기부보고서 > 기부와 나눔 > 캠페인 > 프레쉬 핸드메이드 코스메틱 러쉬');
    }
    if($('.visual.cycle, .cycle_area').length>0){
        $('html > head > title').text('자원순환 > 캠페인 > 프레쉬 핸드메이드 코스메틱 러쉬');
    }   
    if($('.visual.spa').length>0){
        $('html > head > title').text('소개 > 스파 > 프레쉬 핸드메이드 코스메틱 러쉬');
    }
    if($('.visual.spa_info').length>0){
        $('html > head > title').text('이용방법 > 스파 > 프레쉬 핸드메이드 코스메틱 러쉬');
    }
    if($('.visual.shop').length>0){
        $('html > head > title').text('매장안내 > 프레쉬 핸드메이드 코스메틱 러쉬');
    }
    if($('.visual.btob').length>0){
        $('html > head > title').text('B2B > 프레쉬 핸드메이드 코스메틱 러쉬');
    }


    /* 메인 패럴렉스 */ 
    /* const main = $("main").attr("id");
	if (main === "main") {	
		AOS.init();
		window.addEventListener('load', AOS.refresh);		
	}  */
    const image = document.getElementsByClassName('move_motion');
    new simpleParallax(image, {
        delay: .6,
        transition: 'cubic-bezier(0,0,0,1)'
    }); 

    /* Top ani */
    $(".quick_top").on("click",function(){
		$("html, body").animate({"scrollTop":"0"},300);
	});   

   /* Gnb - lnb Floating */
   function gnbFloating(){
        const $lnb = $('.lnb_wrap'),
            $gnbWrap = $('.gnb_wrap');             
        
        // contents 중간에서 새로고침시 초기화
        const winHei = $(window).height();
        const winY = $(window).scrollTop();           
    /*  if(winY > winHei){
            $gnbWrap.addClass('is_scroll');
        }else{
            $gnbWrap.removeClass('is_scroll');
        } */   
    
        function gnbLnbEvent(){
            const $lnb = $('.lnb_wrap');           
            let scrollTop = 0;         
            let lastScroll = 0;            
            
            //scroll up/down event
            function scrollUpDown(){
                if(scrollTop > lastScroll) {
                    //down                        
                    $gnbWrap.addClass('is_hidden');
                    $gnbWrap.removeClass('is_scroll');
                    $lnb.removeClass('is_up');                    
                } else {
                    // up
                    $gnbWrap.removeClass('is_hidden');
                    $gnbWrap.addClass('is_scroll');
                    $lnb.addClass('is_up');
                }
                lastScroll = scrollTop;                                        
            }
            
            // gnb, lnb 기본 모션
            if($lnb.length > 0){
                lnbTop = $lnb.offset().top - 65; 

                // contents 중간에서 새로고침시 초기화
                if(winY > lnbTop){
                    $gnbWrap.removeClass('is_scroll');
                    $lnb.addClass('is_active');                     
                } 
                        
                $(window).on('scroll', function(){                    
                    scrollTop = $(this).scrollTop(); 
                    if(scrollTop > 1 && scrollTop <= lnbTop){  
                        $gnbWrap.removeClass('is_scroll');                        
                        $lnb.removeClass('is_active');                   
                        $lnb.removeClass('is_up');                   
                    }
                    if(scrollTop > lnbTop) {
                        $lnb.addClass('is_active');                
                        scrollUpDown();
                    }
                    if(scrollTop <= 1){
                        $lnb.removeClass('is_active');
                        $lnb.removeClass('is_up');
                        $gnbWrap.removeClass('is_scroll');
                        $gnbWrap.removeClass('is_hidden');
                    }                
                })
            }
        
            if($('.visual_txt').length > 0){
                const visualTxtTop = $('.visual_txt').offset().top - 100;            
                
                $(window).on('scroll', function(){ 
                    scrollTop = $(this).scrollTop();                  
                    if(scrollTop > visualTxtTop){
                        $gnbWrap.addClass('is_scroll'); 
                    }else{
                        $gnbWrap.removeClass('is_scroll'); 
                    }  
                }) 
                $(window).on('load', function(){  
                    scrollTop = $(this).scrollTop();                  
                    if(scrollTop > visualTxtTop){
                        $gnbWrap.addClass('is_scroll'); 
                    }   
                })    
            } 
        }gnbLnbEvent();    
    }gnbFloating();

    $(window).on('resize', function(){                    
        gnbFloating();    
    }) 

   /* Swiper */
    // swiper Full pagination
    const pageFullSwiper= [".lush_info_swiper"]; // main 러쉬소개
    const pageFullSwiperLength= pageFullSwiper.length;
   
    for(let i=0;i<=pageFullSwiperLength;i++){
        var swiper = new Swiper(pageFullSwiper[i], {            
            slidesPerView: "auto", 
            grabCursor: true,
            pagination: {  
                el: ".swiper-pagination",               
                clickable: true,
            },
        });       
    }  

    /* main 카테고리소개 > 상품이미지 */
    const $lushProSwiper = $('.lush_pro_swiper');
    const lushProSwiperAllay = [];

    $lushProSwiper.each(function(){       
        const autoSwiper = new Swiper(this, { 
            slidesPerView: "auto", 
            /* loop:true, */
            /* slidesPerGroup:3, */   
            grabCursor: true,            
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            on: {
                reachEnd: function() {
                    categorySwiper.slideNext();                     
                }
            }
        });  
        $('.lush_pro_swiper .swiper-slide').on('mouseenter', function(){           
            autoSwiper.autoplay.stop();
        })
        $('.lush_pro_swiper .swiper-slide').on('mouseleave', function(){           
            autoSwiper.autoplay.start();
        }) 
        lushProSwiperAllay.push(autoSwiper);
    })

    // main 카테고리소개 > 상품이미지 초기화
    function lushProSwiperInitiator(){
        lushProSwiperAllay.forEach(function(eachSWiper) {                              
            eachSWiper.autoplay.stop();  
        }); 
    }lushProSwiperInitiator();
    
    // main 카테고리소개
    const categorySwiper = new Swiper('.lush_category_swiper', { 
        effect:'fade',
        fadeEffect: {
            crossFade: true
          },
        speed:500,             
        grabCursor: true,
        rewind : true,                           
        pagination: { 
            el: ".swiper-pagination",
            clickable: true,
        },
        on: {
            slideChange: function() { 
                lushProSwiperInitiator();             
                lushProSwiperAllay[categorySwiper.realIndex].slideTo(0,0,false);                   
                lushProSwiperAllay[categorySwiper.realIndex].autoplay.start();               
            }             
        }  
    });

    // main 카테고리 소개 scroll autoplay.start 제어
    const swiperElement = $('.lush_category_swiper');
    if(swiperElement.length > 0){
        let scrollTop = 0;    
        const swiperPosition = swiperElement.offset().top;
        $(window).on('scroll', function(){        
            scrollTop = $(this).scrollTop();        
            if(scrollTop >= swiperPosition - 600){                
               lushProSwiperAllay[0].autoplay.start();   
            }             
        })        
    }

    // main 카테고리 소개 상품이미지 클릭시 QR 코드 view
    const $lush_pro = $('.lush_pro_swiper .swiper-slide'),
          $lush_categoryQr = $lush_pro.parents('.lush_pro').siblings('.category_img');
    let qrStates = true;

    $lush_pro.on('click', function(){
        let that = $(this);
        
        if(qrStates == true){
            that.parents('.lush_pro').siblings('.category_img').addClass('is_active');
            qrStates = false;
        }else{
            that.parents('.lush_pro').siblings('.category_img').removeClass('is_active');
            qrStates = true;
        }
        
        //console.log('aa');
    })
    $('html').click(function(e) {   
        if(!$('.lush_pro_swiper .swiper-slide').has(e.target).length) {
            $lush_categoryQr.removeClass('is_active');
            qrStates = true;
        }
    });  


    // swiper pagination
    const pageSwiper= [".btob_company_swiper", ".spa_info_swiper", ".report_swiper", ".cycle_swiper", ".shop_list_swiper"]; 
    //  b2b 단하나의가치, b2b 기업용선물후기, spa 소개,  기부보고서, 자원순환,  매장소개
    const pageSwiperLength= pageSwiper.length;
   
    for(let i=0;i<=pageSwiperLength;i++){
        var swiperPage = new Swiper(pageSwiper[i], {  
            loop : 'true',         
            pagination: { 
                el: ".swiper-pagination",
                clickable: true,
            },
        });       
    } 

/*     //swiper fadein
    const pageFadeSwiper= [".shop_list_swiper"];  // 매장소개
    const pageFadeSwiperLength= pageFadeSwiper.length;
   
    for(let i=0;i<=pageFadeSwiperLength;i++){
        var swiperPage = new Swiper(pageFadeSwiper[i], {
            effect:'fade',           
            pagination: { 
                el: ".swiper-pagination",
                clickable: true,
            },
        });       
    } 
 */
    // quick
    function quickMenu(){
        const $lushStore = $('.quick_menu .lush_store'),              
              $icoStore = $lushStore.find('.ico_store'),
              $icoClose = $lushStore.find('.btn_clo'),
              $storeInfo = $('.lush_store .store_info');

        $storeInfo.addClass('is_active'); 
        $icoStore.on('mouseenter', function(e){
            e.preventDefault();
            $storeInfo.addClass('is_active'); 
        })        
       /*  $icoStore.on('mouseleave', function(e){
            e.preventDefault();
            $storeInfo.removeClass('is_active'); 
        })        
        $storeInfo.on('mouseleave', function(e){
            e.preventDefault();
            $storeInfo.removeClass('is_active');
        }) */

        $icoClose.on('click',function(){
            $storeInfo.removeClass('is_active');
        })
    }quickMenu();

    //main - 코어벨류
    function lushValue(){
        const $lushValue = $('.lush_value'),
              $lushValueList = $lushValue.find('.lush_value_list > li');

        $lushValueList.each(function(){
            let that = $(this);
            let thatIndex = that.index();
            that.on('mouseenter',function(){
                that.siblings('li').css({'background-color':'transparent'});

                // $lushValue의 클래스명을 탐색하여 그 중에서 'core_value'로 시작하는 클래스를 제거함.
                $lushValue.removeClass(function() {
                    return $(this).attr('class').split(' ').filter(function(className) {
                        return className.startsWith('core_value');
                    });                    
                })               
                $lushValue.addClass('core_value' + thatIndex);  
            }).on('mouseleave', function(){
                that.siblings('li').css({'background-color':'#222'});             
            })
        })
        $lushValue.on('mouseleave', function(){
            $(this).removeClass(function() {
                return $(this).attr('class').split(' ').filter(function(className) {
                    return className.startsWith('core_value');
                });                    
            })           
        })
    }lushValue(); 
    
    /* 주소 복사 */
    $('.clipboardBtn').on('click', function(e) { 
        let text = $(this).siblings('a').html(); 
        $('.clip_target').val(text); 
        $('.clip_target').select(); 
        try { 
            const successful = document.execCommand('copy'); 
            
            $('.clip_tooltip').addClass('is_active');
            setTimeout(function(){
                $('.clip_tooltip').removeClass('is_active');
            }, 1000);
            
        } catch (err) { 
            alert('이 브라우저는 지원하지 않습니다.');
            $('.clip_tooltip').removeClass('is_active');
        } 
    });

    /* 스파 구매방법 */
    //scroll event
    if($('.spa_buy.buy').length > 0){
        const spaBuyTop = $('.spa_buy.buy').offset().top;
        let ani =true;
        $(window).on('scroll', function(){
            scrollTop = $(this).scrollTop(); 
            if(scrollTop > spaBuyTop - 820 ){ 
                if(ani==true){
                    spaBuyStep();
                    ani=false;
                }
            }
        });
    }
    if($('.spa_buy.reserve').length > 0){
        const spaReserveTop = $('.spa_buy.reserve').offset().top;
        let ani =true;
        $(window).on('scroll', function(){
            scrollTop = $(this).scrollTop(); 
            if(scrollTop > spaReserveTop - 820 ){ 
                if(ani==true){
                    spaReserveStep();
                    ani=false;
                }    
            }            
        });
    }
    //스파 방법 step ani
    function spaBuyAni(name, time){
        const $spa_buy = $(name), 
              $spa_step = $spa_buy.find('.buy_step > li');         
        let currentIndex = 0; 
        $spa_step.eq(0).find('img').attr('src', function(index, attr){
            return attr.replace('_off@2x','_active@2x');
        });
        setInterval(function(){ 
            $spa_step.find('img').attr('src', function(index, attr){
                return attr.replace('_active@2x','_off@2x')
            });
            currentIndex = (currentIndex + 1) % $spa_step.length; 
            $spa_step.eq(currentIndex).find('img').attr('src', function(index, attr){
                return attr.replace('_off@2x','_active@2x');
            }); 
        }, time);
    }
    //구매방법
    function spaBuyStep(){                   
        spaBuyAni('.buy', 1000); 
    } 
    //예약방법   
    function spaReserveStep(){                   
        spaBuyAni('.reserve', 1000); 
    }   

    /* 아코디언 */ 
    const $accordion = $('.accordion_wrap'),
          $accorItem = $accordion.find('.accordion_item'),
          $accorTit = $accorItem.find('.accor_tit').find('.trigger'),
          $accorPanel = $accorItem.find('.accor_panel') ;
    const $spaShop = $('.spa_shop');
                    
    $accorPanel.slideUp(100);
    $accorItem.addClass('is_hide');    
    
    // first open
    $('.accordion_item:first-of-type').removeClass('is_hide').addClass('is_active');        
    $('.accordion_item:first-of-type').find($accorPanel).slideDown(100);
    //shop first close
    $('.shop_wrap .accordion_item:first-of-type').removeClass('is_active').addClass('is_hide');        
    $('.shop_wrap .accordion_item:first-of-type').find($accorPanel).slideUp(100);
    //spa 이용방법 first close
    $('.spa_use_wrap.use .accordion_item:first-of-type').removeClass('is_active').addClass('is_hide');        
    $('.spa_use_wrap.use .accordion_item:first-of-type').find($accorPanel).slideUp(100); 
    
    //Aria+
    function accordionAria(){  
        $accorItem.each(function(){
            let that = $(this);
            if(that.hasClass('is_active')){
                that.attr({'aria-states':'expanded'});
                that.find($accorTit).attr({'aria-selected':'true'});
                that.find($accorPanel).attr({'aria-hidden':'false'});
            }else{
                that.attr({'aria-states':'disabled'});
                that.find($accorTit).attr({'aria-selected':'false'});
                that.find($accorPanel).attr({'aria-hidden':'true'});
            }
        })       
    }accordionAria();    
    
    //Accordion Event
    $accordion.each(function(){
        let $accorWrap = $(this);
        const myTrigger = $accorWrap.find($accorTit);       
    
        myTrigger.on('click',function(e){
            e.preventDefault();
            let that = $(this);
            const myTit = that.parents('.accordion_item:first'),          
                  myPanel = that.parent('.accor_tit').siblings('.accor_panel'); 

            function selfEvent(){
                myTit.removeClass('is_active').addClass('is_hide');
                $accorWrap.find($accorPanel).slideUp(100);
                accordionAria();
            }
            function anotherEVent(){
                $accorWrap.find($accorItem).removeClass('is_active');
                myTit.addClass('is_active').removeClass('is_hide');
                $accorWrap.find($accorPanel).slideUp(100);
                myPanel.slideDown(100); 
                accordionAria();    
            }
            if($spaShop.length > 0){
                if(myTit.hasClass('is_active')==false){  
                    anotherEVent();                 
                }
            }else{
                if(myTit.hasClass('is_active')){
                    selfEvent();
                }else{
                    anotherEVent();
                }
            }            
        }) 
    }) 
 
    /* Tab */
    function tabArea(){           
        const $tab_area = $('.tab_area');  
        $tab_area.each(function(index){   
            let that = $(this);                             
            const $tab_list = that.children('.tab_list').find('li'),
                $tab_listFirst = that.children('.tab_list').find('li:first-child'),
                $tab_btn = $tab_list.children('button'),
                $tab_panel_area = that.children('.tab_panel_area'),
                $tab_panel = $tab_panel_area.children('.tab_panel'),
                $tab_panelFirst = $tab_panel_area.children('.tab_panel:first'),
                $tab_num = 'tab' + index ,
                $tab_panelNum = 'tabpanel' + index  ;  
            $tab_btn.attr({
                'aria-selected':'false',
                'tabindex':'-1',
                'role':'tab'
            });
            $tab_panel.attr({
                'aria-expanded':'false',
                'role':'tab_panel'
            });  
            $tab_listFirst.children('button').addClass('is_active').attr({'aria-selected':'true','tabindex':'0'}); 
            $tab_panelFirst.addClass('is_active').attr({'aria-expanded':'true'});  
            $tab_btn.each(function(index){
                let that = $(this);
                that.attr({
                    'id':$tab_num + '_list' + index ,                        
                    'aria-controls':$tab_panelNum + '_panel' + index 
                });
            });  
            $tab_panel.each(function(index){
                let that = $(this);
                that.attr({
                    'id':$tab_panelNum + '_panel' + index,
                    'aria-labelledby':$tab_num + '_list' + index                
                }); 
            });   
            $tab_btn.on('click',function(){
                let that = $(this);
                $tab_btn.removeClass('is_active');
                that.addClass('is_active');  
                const activePanel = that.attr('aria-controls');
                $('#'+ activePanel).addClass('is_active').attr('aria-expanded','true');
                $('#'+ activePanel).siblings('.tab_panel').removeClass('is_active').attr('aria-expanded','false');  
            })
        }); 
    }tabArea();

    /* 캠페인 > 자원순환, Footer - GNB */
    const $cycle = $('.cycle_area'),
          $policy = $('.policy'),
          $contentsWrap = $('.contents_wrap'), 
          $gnbWrap = $('.gnb_wrap');  

    if($cycle.length > 0 ){
        $contentsWrap.addClass('cycle_area');
        $gnbWrap.addClass('is_white');
    }    
    if($policy.length > 0){       
        $gnbWrap.addClass('is_white');
    }   
    
    /* customer select */
    $('.select_box').each(function(){
        let $this = $(this) 
        const numberOfOptions = $this.children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        const $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option:selected').eq(0).text());

        const $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (let i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        const $listItems = $list.children('li');
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();

            const url = $(this).attr('rel'); // get selected value
            if (url) { // require a URL
                window.location = url; // redirect
            }return false;                                
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    });
})