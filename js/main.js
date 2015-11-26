$(function(){
    /*-------------------------------------------------------------------*/
    /*  1. Preloader.
    /*-------------------------------------------------------------------*/
    $(window).load(function() {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({'overflow':'visible'});
    });
    
    /*-------------------------------------------------------------------*/
    /*  2. Makes the height of all selected elements (".match-height")
    /*  exactly equal. Requires jQuery matchHeight plugin.
    /*-------------------------------------------------------------------*/
    $(window).smartload(function(){
        if ($.fn.matchHeight){
            $('.match-height').matchHeight();
        }
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  3. Just did another hack of dropdown menu for Bootstrap scrollspy.
    /*-------------------------------------------------------------------*/
    $('body').on('activate.bs.scrollspy', function(){
        $('.page-scroll.dropdown > .dropdown-toggle').each(function(){
            $(this).attr('data-target', '#');
        });
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  4. Page scrolling feature, requires jQuery Easing plugin.
    /*-------------------------------------------------------------------*/
    var pageScroll = function(){
        $('.page-scroll').click(function(e){
            e.preventDefault();
            
            var anchor = $(this),
            href = anchor.attr('href'),
            offset = $('body').attr('data-offset');
            
            $('html, body').stop().animate({
                scrollTop: $(href).offset().top - (offset - 1)
            }, 1500, 'easeInOutExpo');
            
            /*
             * Automatically retract the navigation after clicking 
             * on one of the menu items.
             */
            if(!$(this).parent().hasClass('dropdown')){
                $('.szecsa-collapse').collapse('hide');
            }
        });
    };
    
    pageScroll();
    
    
    /*-------------------------------------------------------------------*/
    /*  5. Make navigation menu on your page always stay visible.
    /*  Requires jQuery Sticky plugin.
    /*-------------------------------------------------------------------*/
    var stickyMenu = function(){
        var ww = Math.max($(window).width(), window.innerWidth),
        nav = $('.navbar.navbar-fixed-top');

        if ($.fn.unstick){
            nav.unstick();
        }
        
        if ($.fn.sticky && ww >= 992){
            nav.sticky({topSpacing: 0});
        }
    };
    
    stickyMenu();
    
    // Call stickyMenu() when window is resized.
    $(window).smartresize(function(){
        stickyMenu();
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  6. Navbar dropdown opening on hover,
    /*  and opening on click for collapsed navbar.
    /*-------------------------------------------------------------------*/
    var toggleNavbarMethod = function(){
        var ww = Math.max($(window).width(), window.innerWidth),
        dropdown = $('.navbar .dropdown');
        
        if (ww >= 992){
            dropdown.on('mouseover', function(){
                if (!$(this).hasClass('open')){
                    $(this).addClass('open');
                }
            }).on('mouseout', function(){
                if ($(this).hasClass('open')){
                    $(this).removeClass('open');
                }
            });
        }
        else {
            dropdown.off('mouseover').off('mouseout');
        }
    };
    
    toggleNavbarMethod();
    
    // Call toggleNavbarMethod(); when window is resized.
    $(window).smartresize(function(){
        toggleNavbarMethod();
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  7. Prevent bootstrap dropdown closing when clicked.
    /*-------------------------------------------------------------------*/
    $('.dropdown-menu').click(function(e){
        e.stopPropagation();
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  8. Google Map. Requires gmap3 plugin.
    /*-------------------------------------------------------------------*/
    $('contact').ready(function (){
        if ($("div").is("#gmap")){
            $("#gmap").gmap3({
                marker:{
                    latLng: [46.253539,20.142435]                    
                },
                map: {
                    options: {
                        styles: [{
                            stylers: [{
                                "saturation": -80
                            }, {
                                "lightness": -10
                            }, {
                                "gamma": 1.5
                            }]
                        }],
                        zoom: 13,
                        scrollwheel: false,
                        draggable: true
                    }
                }
            });
        }
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  9. Column Chart (Section - My Strengths)
    /*-------------------------------------------------------------------*/
    var columnChart = function (){
        $('.column-chart').find('.item-progress').each(function(){
            var item = $(this);
            var newHeight = $(this).parent().height() * ($(this).data('percent') / 100);
            
            item.css('height', newHeight);
        });
    };
    
    // Call columnChart() when window is loaded.
    $(window).smartload(function(){
        columnChart();
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  10. Section - My Resume
    /*-------------------------------------------------------------------*/
    var resumeCollapse = function (){
        var ww = Math.max($(window).width(), window.innerWidth),
        workItem = $('.collapse:not(:first)', '#work'),
        educationItem = $('.collapse:not(:first)', '#education');
        
        if (ww < 768){
            workItem.collapse('show');
            educationItem.collapse('show');
        }
        else{
            workItem.collapse('hide');
            educationItem.collapse('hide');
        }
    };
    
    // Call resumeCollapse() when window is loaded.
    $(window).smartload(function(){
        resumeCollapse();
    });
    
    // Call resumeCollapse() when window is resized.
    $(window).smartresize(function(){
        resumeCollapse();
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  11. Section - Projects
    /*-------------------------------------------------------------------*/
    $(".img-over").css({ opacity: 0 });

    //-------- Hover animation for the elements of the portfolio --------//

    $('.project a').hover(function () {
        $(this).children('.img-over ').stop().animate({ opacity: 1 }, 'fast');
    }, function () {
        $(this).children('.img-over ').stop().animate({ opacity: 0 }, 'slow');
    });

    $('.project').hover(function () {
        var projDesc = $(this).find('.project-desc');
        var offset = ($(this).height() / 2) - (projDesc.height() / 2);
        $(this).find('.img-over').css('padding-top', offset - 18);
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  12. Circle Chart (Section - Languages)
    /*-------------------------------------------------------------------*/
    var circleChart = function (){
        $('.circle-chart').find('.item-progress').each(function(){
            var item = $(this),
            maxHeight = 108,
            newHeight = maxHeight * ($(this).data('percent') / 100);
            
            // Only animate elements when using non-mobile devices    
            if (jQuery.browser.mobile === false){
                item.one('inview', function(isInView) {
                    if (isInView){
                        // Animate item
                        item.animate({
                            height: newHeight
                        },1500);
                    }
                });
            }
            else{
                item.css('height', newHeight);
            }
        });
    };
    
    // Call circleChart() when window is loaded.
    $(window).smartload(function(){
        circleChart();
    });
    
    /*-------------------------------------------------------------------*/
    /*  13. LIGHTBOX (Section - Projects) Requires imagelightbox plugin.
    /*-------------------------------------------------------------------*/  
    $(function () {
        // ACTIVITY INDICATOR
        var activityIndicatorOn = function () {
            $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
        },
            activityIndicatorOff = function () {
                $('#imagelightbox-loading').remove();
            },

            // OVERLAY
            overlayOn = function () {
                $('<div id="imagelightbox-overlay"></div>').appendTo('body');
            },
            overlayOff = function () {
                $('#imagelightbox-overlay').remove();
            },

            // CLOSE BUTTON
            closeButtonOn = function (instance) {
                $('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function () { $(this).remove(); instance.quitImageLightbox(); return false; });
            },
            closeButtonOff = function () {
                $('#imagelightbox-close').remove();
            },

            // CAPTION
            captionOn = function () {
                var description = $('a[href="' + $('#imagelightbox').attr('src') + '"] img').attr('alt');
                if (description.length > 0)
                    $('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
            },
            captionOff = function () {
                $('#imagelightbox-caption').remove();
            },

            // NAVIGATION
            navigationOn = function (instance, selector) {
                var images = $(selector);
                if (images.length) {
                    var nav = $('<div id="imagelightbox-nav"></div>');
                    for (var i = 0; i < images.length; i++)
                        nav.append('<button type="button"></button>');

                    nav.appendTo('body');
                    nav.on('click touchend', function () { return false; });

                    var navItems = nav.find('button');
                    navItems.on('click touchend', function () {
                        var $this = $(this);
                        if (images.eq($this.index()).attr('href') !== $('#imagelightbox').attr('src'))
                            instance.switchImageLightbox($this.index());

                        navItems.removeClass('active');
                        navItems.eq($this.index()).addClass('active');

                        return false;
                    })
                    .on('touchend', function () { return false; });
                }
            },
            navigationUpdate = function (selector) {
                var items = $('#imagelightbox-nav button');
                items.removeClass('active');
                items.eq($(selector).filter('[href="' + $('#imagelightbox').attr('src') + '"]').index(selector)).addClass('active');
            },
            navigationOff = function () {
                $('#imagelightbox-nav').remove();
            },

            // ARROWS
            arrowsOn = function (instance, selector) {
                var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>');

                $arrows.appendTo('body');

                $arrows.on('click touchend', function (e) {
                    e.preventDefault();

                    var $this = $(this),
                        $target = $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]'),
                        index = $target.index(selector);

                    if ($this.hasClass('imagelightbox-arrow-left')) {
                        index = index - 1;
                        if (!$(selector).eq(index).length)
                            index = $(selector).length;
                    }
                    else {
                        index = index + 1;
                        if (!$(selector).eq(index).length)
                            index = 0;
                    }

                    instance.switchImageLightbox(index);
                    return false;
                });
            },
            arrowsOff = function () {
                $('.imagelightbox-arrow').remove();
            };

        //	WITH ACTIVITY INDICATION
        $('a[data-imagelightbox="a"]').imageLightbox(
        {
            onLoadStart: function () { activityIndicatorOn(); },
            onLoadEnd: function () { activityIndicatorOff(); },
            onEnd: function () { activityIndicatorOff(); }
        });

        //	WITH OVERLAY & ACTIVITY INDICATION
        $('a[data-imagelightbox="b"]').imageLightbox(
        {
            onStart: function () {  overlayOn(); },
            onEnd: function () { overlayOff();  activityIndicatorOff(); },
            onLoadStart: function () { activityIndicatorOn(); },
            onLoadEnd: function () { activityIndicatorOff(); }
        });

        //	WITH "CLOSE" BUTTON & ACTIVITY INDICATION
        var instanceC = $('a[data-imagelightbox="c"]').imageLightbox(
        {
            quitOnDocClick: false,
            onStart: function () { closeButtonOn(instanceC); },
            onEnd: function () { closeButtonOff(); activityIndicatorOff(); },
            onLoadStart: function () { activityIndicatorOn(); },
            onLoadEnd: function () { activityIndicatorOff(); }
        });

        //	WITH CAPTION & ACTIVITY INDICATION
        $('a[data-imagelightbox="d"]').imageLightbox(
        {
            onLoadStart: function () { captionOff(); activityIndicatorOn(); },
            onLoadEnd: function () { captionOn(); activityIndicatorOff(); },
            onEnd: function () { captionOff(); activityIndicatorOff(); }
        });

        //	WITH ARROWS & ACTIVITY INDICATION
        var selectorG = 'a[data-imagelightbox="g"]';
        var instanceG = $(selectorG).imageLightbox(
        {
            onStart: function () { arrowsOn(instanceG, selectorG); },
            onEnd: function () { arrowsOff(); activityIndicatorOff(); },
            onLoadStart: function () { activityIndicatorOn(); },
            onLoadEnd: function () { $('.imagelightbox-arrow').css('display', 'block'); activityIndicatorOff(); }
        });

        //	WITH NAVIGATION & ACTIVITY INDICATION
        var selectorE = 'a[data-imagelightbox="e"]';
        var instanceE = $(selectorE).imageLightbox(
        {
            onStart: function () { navigationOn(instanceE, selectorE); },
            onEnd: function () { navigationOff(); activityIndicatorOff(); },
            onLoadStart: function () { activityIndicatorOn(); },
            onLoadEnd: function () { navigationUpdate(selectorE); activityIndicatorOff(); }
        });

        //	ALL COMBINED
        var selectorF = 'a[data-imagelightbox="f"]';
        var instanceF = $(selectorF).imageLightbox(
        {
            onStart: function () { overlayOn(); closeButtonOn(instanceF); arrowsOn(instanceF, selectorF); },
            onEnd: function () { overlayOff(); captionOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
            onLoadStart: function () { captionOff(); activityIndicatorOn(); },
            onLoadEnd: function () { captionOn(); activityIndicatorOff(); $('.imagelightbox-arrow').css('display', 'block'); }
        });

    });   
    
    /*-------------------------------------------------------------------*/
    /*  14. Content Animation - Requires appear.js
    /*-------------------------------------------------------------------*/  

    var isMobile = false;

    if (isMobile === false) {
        $('*[data-animated]').addClass('animated');
    }


    function animated_contents() {
        $(".animated:appeared").each(function (i) {
            var $this    = $(this),
                animated = $(this).data('animated');

            setTimeout(function () {
                $this.addClass(animated);
            }, 100 * i);

           /* $('.progress-bar .bar').each(function (i) {
                var pogresBar = $this.data('width');
                $this.css({'width' : pogresBar});
            });*/
        });
    }

    animated_contents();
    $(window).scroll(function () {
        animated_contents();
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  15. Disabled some link button
    /*-------------------------------------------------------------------*/
    $('.disabled').click(function(e){
     e.preventDefault();
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  16. Tooltip plugin
    /*-------------------------------------------------------------------*/
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip(); 
    });
    
    
    /*-------------------------------------------------------------------*/
    /*  17. Change Site Language without leaving current site section
    /*-------------------------------------------------------------------*/

});