// JavaScript Document


	$(window).on('load', function() {
	
		"use strict";
						
		/*----------------------------------------------------*/
		/*	Preloader
		/*----------------------------------------------------*/
		
		var preloader = $('#loader-wrapper'),
			loader = preloader.find('.cssload-box-loading');
			loader.fadeOut();
			preloader.delay(400).fadeOut('slow');
				
		try {
			if ($.fn.stellar) {
				$(window).stellar({});
			}
		} catch(err) {
			console.warn('Stellar parallax initialization skipped:', err);
		}
	});


	$(window).on('scroll', function() {
		
		"use strict";
								
		/*----------------------------------------------------*/
		/*	Navigtion Menu Scroll
		/*----------------------------------------------------*/	
		
		var b = $(window).scrollTop();
		
		if( b > 100 ){		
			$(".wsmainfull").addClass("scroll");
		} else {
			$(".wsmainfull").removeClass("scroll");
		}				

	});


	$(document).ready(function() {
			
		"use strict";


		/*----------------------------------------------------*/
		/*	Bespoke Ultra-Smooth Hero Slider Controller
		/*----------------------------------------------------*/

		var $heroSlider = $('#hero-2 .slider');
		if ($heroSlider.length) {
			var $slides = $heroSlider.find('.slides > li');
			var totalSlides = $slides.length;

			if (totalSlides > 0) {
				var currentIndex = 0;
				var autoplayTimer = null;
				var intervalMs = 3500;
				var isTransitioning = false;

				// Create elegant navigation dots
				var $dotsContainer = $('<ul class="hero-slider-dots"></ul>');
				for (var i = 0; i < totalSlides; i++) {
					$dotsContainer.append('<li data-index="' + i + '" class="' + (i === 0 ? 'active' : '') + '"></li>');
				}
				$('#hero-2').append($dotsContainer);
				var $dots = $dotsContainer.find('li');

				function goToSlide(index) {
					if (isTransitioning) return;
					if (index < 0) index = totalSlides - 1;
					if (index >= totalSlides) index = 0;

					isTransitioning = true;
					$slides.removeClass('active');
					$dots.removeClass('active');

					$slides.eq(index).addClass('active');
					$dots.eq(index).addClass('active');
					currentIndex = index;

					setTimeout(function() {
						isTransitioning = false;
					}, 500);
				}

				function nextSlide() {
					goToSlide((currentIndex + 1) % totalSlides);
				}

				function prevSlide() {
					goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
				}

				function startAutoplay() {
					stopAutoplay();
					autoplayTimer = setInterval(nextSlide, intervalMs);
				}

				function stopAutoplay() {
					if (autoplayTimer) {
						clearInterval(autoplayTimer);
						autoplayTimer = null;
					}
				}

				function restartAutoplay() {
					startAutoplay();
				}

				// Arrow buttons
				$('.slide-next, .hero-slider-nav a.slide-next').on('click', function(e) {
					e.preventDefault();
					nextSlide();
					restartAutoplay();
				});

				$('.slide-prev, .hero-slider-nav a.slide-prev').on('click', function(e) {
					e.preventDefault();
					prevSlide();
					restartAutoplay();
				});

				// Dot indicators
				$dots.on('click', function() {
					var idx = parseInt($(this).attr('data-index'), 10);
					goToSlide(idx);
					restartAutoplay();
				});

				// Touch swipe support
				var touchStartX = 0;
				var touchEndX = 0;
				$('#hero-2').on('touchstart', function(e) {
					touchStartX = e.originalEvent.touches[0].clientX;
				});
				$('#hero-2').on('touchend', function(e) {
					touchEndX = e.originalEvent.changedTouches[0].clientX;
					if (touchStartX - touchEndX > 40) {
						nextSlide();
						restartAutoplay();
					} else if (touchEndX - touchStartX > 40) {
						prevSlide();
						restartAutoplay();
					}
				});

				// Initialize & Start automatic slideshow immediately
				goToSlide(0);
				startAutoplay();

				// Ensure autoplay keeps running across tabs/windows
				$(window).on('focus', startAutoplay);
				document.addEventListener('visibilitychange', function() {
					if (!document.hidden) {
						startAutoplay();
					}
				});
			}
		}


		/*----------------------------------------------------*/
		/*	Animated Scroll To Anchor
		/*----------------------------------------------------*/
		
		$('.header a[href^="#"], .page a.btn[href^="#"], .page a.internal-link[href^="#"]').on('click', function (e) {
			
			e.preventDefault();

			var target = this.hash,
				$target = jQuery(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top - 60 // - 200px (nav-height)
			}, 'slow', 'easeInSine', function () {
				window.location.hash = '1' + target;
			});
			
		});

		
		/*----------------------------------------------------*/
		/*	ScrollUp
		/*----------------------------------------------------*/
		
		$.scrollUp = function (options) {

			// Defaults
			var defaults = {
				scrollName: 'scrollUp', // Element ID
				topDistance: 600, // Distance from top before showing element (px)
				topSpeed: 800, // Speed back to top (ms)
				animation: 'fade', // Fade, slide, none
				animationInSpeed: 200, // Animation in speed (ms)
				animationOutSpeed: 200, // Animation out speed (ms)
				scrollText: '', // Text for element
				scrollImg: false, // Set true to use image
				activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
			};

			var o = $.extend({}, defaults, options),
				scrollId = '#' + o.scrollName;

			// Create element
			$('<a/>', {
				id: o.scrollName,
				href: '#top',
				title: o.scrollText
			}).appendTo('body');
			
			// If not using an image display text
			if (!o.scrollImg) {
				$(scrollId).text(o.scrollText);
			}

			// Minium CSS to make the magic happen
			$(scrollId).css({'display':'none','position': 'fixed','z-index': '2147483647'});

			// Active point overlay
			if (o.activeOverlay) {
				$("body").append("<div id='"+ o.scrollName +"-active'></div>");
				$(scrollId+"-active").css({ 'position': 'absolute', 'top': o.topDistance+'px', 'width': '100%', 'border-top': '1px dotted '+o.activeOverlay, 'z-index': '2147483647' });
			}

			// Scroll function
			$(window).on('scroll', function(){	
				switch (o.animation) {
					case "fade":
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).fadeIn(o.animationInSpeed) : $(scrollId).fadeOut(o.animationOutSpeed) );
						break;
					case "slide":
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).slideDown(o.animationInSpeed) : $(scrollId).slideUp(o.animationOutSpeed) );
						break;
					default:
						$( ($(window).scrollTop() > o.topDistance) ? $(scrollId).show(0) : $(scrollId).hide(0) );
				}
			});

			// To the top
			$(scrollId).on('click', function(event){
				$('html, body').animate({scrollTop:0}, o.topSpeed);
				event.preventDefault();
			});

		};
		
		// $.scrollUp();


		/*----------------------------------------------------*/
		/*	Tabs #1
		/*----------------------------------------------------*/

		$('ul.tabs-1 li').click(function(){
			var tab_id = $(this).attr('data-tab');

			$('ul.tabs-1 li').removeClass('current');
			$('.tab-content').removeClass('current');

			$(this).addClass('current');
			$("#"+tab_id).addClass('current');
		});
		

		/*----------------------------------------------------*/
		/*	Tabs #2
		/*----------------------------------------------------*/

		$('ul.tabs-2 li').click(function(){
			var tab_id = $(this).attr('data-tab');

			$('ul.tabs-2 li').removeClass('displayed');
			$('.tab-content').removeClass('displayed');

			$(this).addClass('displayed');
			$("#"+tab_id).addClass('displayed');
		});


		/*----------------------------------------------------*/
		/*	Hero Countries Carousel
		/*----------------------------------------------------*/
	
		var owl = $('.hero-coutries-carousel');
			owl.owlCarousel({
				items: 3,
				loop:true,
				autoplay:true,
				navBy: 1,
				nav: true,
				dots: false,	
				autoplayTimeout: 4000,
				autoplayHoverPause: true,
				smartSpeed: 900,
				responsive:{
					0:{
						items:1
					},
					550:{
						items:1
					},
					767:{
						items:1
					},
					768:{
						items:2
					},
					991:{
						items:3
					}
				}
		});


	    /*----------------------------------------------------*/
		/*	Tabs Carousel
		/*----------------------------------------------------*/
	
		var owl = $('.services-carousel');
			owl.owlCarousel({
				items: 4,
				loop:true,
				autoplay:true,
				navBy: 1,
				nav: true,
				dots: false,
				autoplayTimeout: 4000,
				autoplayHoverPause: true,
				smartSpeed: 900,
				responsive:{
					0:{
						items:1
					},
					550:{
						items:1
					},
					767:{
						items:2
					},
					768:{
						items:2
					},
					992:{
						items:3
					},
					1100:{
						items:4
					}
				}
		});


		/*----------------------------------------------------*/
		/*	Portfolio Grid
		/*----------------------------------------------------*/

		$('.grid-loaded').imagesLoaded(function () {

	        // filter items on button click
	        $('.brands-filter').on('click', 'button', function () {
	            var filterValue = $(this).attr('data-filter');
	            $grid.isotope({
	              filter: filterValue
	            });
	        });

	        // change is-checked class on buttons
	        $('.brands-filter button').on('click', function () {
	            $('.brands-filter button').removeClass('is-checked');
	            $(this).addClass('is-checked');
	            var selector = $(this).attr('data-filter');
	            $grid.isotope({
	              filter: selector
	            });
	            return false;
	        });

	        // init Isotope
	        var $grid = $('.masonry-wrap').isotope({
	            itemSelector: '.brand-3',
	            percentPosition: true,
	            transitionDuration: '0.7s',
	            masonry: {
	              // use outer width of grid-sizer for columnWidth
	              columnWidth: '.brand-3',
	            }
	        });
	        
	    });


		/*----------------------------------------------------*/
		/*	Single Image Lightbox
		/*----------------------------------------------------*/
				
		$('.image-link').magnificPopup({
		  type: 'image'
		});	


		/*----------------------------------------------------*/
		/*	Video Link #1 Lightbox
		/*----------------------------------------------------*/
		
		$('.video-popup1').magnificPopup({
		    type: 'iframe',		  	  
				iframe: {
					patterns: {
						youtube: {			   
							index: 'youtube.com',
							src: 'https://www.youtube.com/embed/SZEflIVnhH8'				
								}
							}
						}		  		  
		});


		/*----------------------------------------------------*/
		/*	Video Link #2 Lightbox
		/*----------------------------------------------------*/
		
		$('.video-popup2').magnificPopup({
		    type: 'iframe',		  	  
				iframe: {
					patterns: {
						youtube: {			   
							index: 'youtube.com',
							src: 'https://www.youtube.com/embed/7e90gBu4pas'				
								}
							}
						}		  		  
		});


		/*----------------------------------------------------*/
		/*	Video Link #3 Lightbox
		/*----------------------------------------------------*/
		
		$('.video-popup3').magnificPopup({
		    type: 'iframe',		  	  
				iframe: {
					patterns: {
						youtube: {			   
							index: 'youtube.com',
							src: 'https://www.youtube.com/embed/0gv7OC9L2s8'					
								}
							}
						}		  		  
		});


		/*----------------------------------------------------*/
		/*	Statistic Counter
		/*----------------------------------------------------*/
	
		$('.count-element').each(function () {
			$(this).appear(function() {
				$(this).prop('Counter',0).animate({
					Counter: $(this).text()
				}, {
					duration: 1800,
					easing: 'swing',
					step: function (now) {
						$(this).text(Math.ceil(now));
					}
				});
			},{accX: 0, accY: 0});
		});


		/*----------------------------------------------------*/
		/*	Brands Logo Rotator
		/*----------------------------------------------------*/
	
		var owl = $('.brands-carousel');
			owl.owlCarousel({
				items: 6,
				loop:true,
				autoplay:true,
				navBy: 1,
				autoplayTimeout: 3500,
				autoplayHoverPause: false,
				smartSpeed: 600,
				responsive:{
					0:{
						items:2
					},
					550:{
						items:3
					},
					767:{
						items:3
					},
					768:{
						items:4
					},
					991:{
						items:4
					},				
					1000:{
						items:5
					}
				}
		});


		/*----------------------------------------------------*/
		/*	Testimonials Rotator
		/*----------------------------------------------------*/
	
		var owl = $('.reviews-holder');
			owl.owlCarousel({
				items: 3,
				loop:true,
				autoplay:true,
				navBy: 1,
				nav: true,
				dots: false,
				autoplayTimeout: 4500,
				autoplayHoverPause: true,
				smartSpeed: 600,
				responsive:{
					0:{
						items:1
					},
					767:{
						items:1
					},
					768:{
						items:2
					},
					991:{
						items:3
					},
					1000:{
						items:3
					}
				}
		});


		/*----------------------------------------------------*/
		/*	Testimonials Rotator
		/*----------------------------------------------------*/
	
		var owl = $('.testimonials-holder');
			owl.owlCarousel({
				items: 4,
				loop:true,
				autoplay:true,
				navBy: 1,
				nav: true,
				dots: false,
				autoplayTimeout: 4500,
				autoplayHoverPause: false,
				smartSpeed: 1500,
				responsive:{
					0:{
						items:1
					},
					767:{
						items:1
					},
					768:{
						items:2
					},
					991:{
						items:3
					},
					1000:{
						items:4
					}
				}
		});


		/*----------------------------------------------------*/
		/*	Hero Request Form Validation
		/*----------------------------------------------------*/

		$(".hero-request-form").validate({
			rules: {
				name: "required",
				email: {
					required: true,
					email: true
				},
				phone:{
					required: true,
					digits: true,
				},
				select: "required",
			},
			messages: {
				select: "This field is required",
				name: "Please enter your name",
				email: "We need your email address to contact you",
				phone: "Please enter a valid number",
			}
		});


		/*----------------------------------------------------*/
		/*	Hero Register Form Validation
		/*----------------------------------------------------*/

		$(".hero-register-form").validate({
			rules: {			
				name: "required",
				email: {
					required: true,
					email: true
				},
				select: "required",
			},
			messages: {				
				name: "Please enter your name",
				email: "We need your email address",
				select: "This field is required",
			}
		});


		/*----------------------------------------------------*/
		/*	Request Form Validation
		/*----------------------------------------------------*/
		
		$(".request-form").validate({
			rules: {				
				name: "required",
				email: {
					required: true,
					email: true
				},
				phone:{
					required: true,
					digits: true,
				},
				select: "required",
			},
			messages: {
				select: "This field is required",
				name: "Please enter your name",
				email: "We need your email address to contact you",
				phone: "Please enter a valid number",
			}
		});


		/*----------------------------------------------------*/
		/*	Contact Form Validation
		/*----------------------------------------------------*/
		
		$(".contact-form").validate({
			rules: {				
				name: "required",
				email: {
					required: true,
					email: true
				},
				select: "required",
				message: "required",
			},
			messages: {
				select: "This field is required",
				name: "Please enter your name",
				email: "We need your email address to contact you",
				message: "Please enter no more than (1) characters",
			}
		});


		/*----------------------------------------------------*/
		/*	Comment Form Validation
		/*----------------------------------------------------*/
		
		$(".comment-form").validate({
			rules: {				
				name: "required",
				email: {
					required: true,
					email: true
				},
				message: "required",
			},
			messages: {
				name: "Please enter your name",
				email: "We need your email address to contact you",
				message: "Please enter no more than (1) characters",
			}
		});


		/*----------------------------------------------------*/
		/*	Newsletter Subscribe Form
		/*----------------------------------------------------*/
	
		$('.newsletter-form').ajaxChimp({
        language: 'cm',
        url: 'https://dsathemes.us3.list-manage.com/subscribe/post?u=af1a6c0b23340d7b339c085b4&id=344a494a6e'
            //http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
		});

		$.ajaxChimp.translations.cm = {
			'submit': 'Submitting...',
			0: 'We have sent you a confirmation email',
			1: 'Please enter your email address',
			2: 'An email address must contain a single @',
			3: 'The domain portion of the email address is invalid (the portion after the @: )',
			4: 'The username portion of the email address is invalid (the portion before the @: )',
			5: 'This email address looks fake or invalid. Please enter a real email address'
		};	

	});



