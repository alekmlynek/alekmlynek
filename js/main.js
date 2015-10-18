(function($) {
	
	'use strict';

	
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var pagePercentage = 0;
	
	$(window).load(function() { // makes sure the whole site is loaded
      $('#status').fadeOut(); // will first fade out the loading animation
      $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
      $('body').delay(350).css({'overflow':'visible'});
    });
	
	$(document).ready(function(e) {
		
		// global
		var Modernizr = window.Modernizr;
		
			
		// support for CSS Transitions & transforms
		var support = Modernizr.csstransitions && Modernizr.csstransforms;
		var support3d = Modernizr.csstransforms3d;
		// transition end event name and transform name
		// transition end event name
		var transEndEventNames = {
								'WebkitTransition' : 'webkitTransitionEnd',
								'MozTransition' : 'transitionend',
								'OTransition' : 'oTransitionEnd',
								'msTransition' : 'MSTransitionEnd',
								'transition' : 'transitionend'
							},
		transformNames = {
						'WebkitTransform' : '-webkit-transform',
						'MozTransform' : '-moz-transform',
						'OTransform' : '-o-transform',
						'msTransform' : '-ms-transform',
						'transform' : 'transform'
					};
					
		if( support ) {
			this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.PMMain';
			this.transformName = transformNames[ Modernizr.prefixed( 'transform' ) ];
			//console.log('this.transformName = ' + this.transformName);
		}
		
	/* ==========================================================================
	   Newsletter submit
	   ========================================================================== */
		if( $('#pm-home-newsletter-btn').length > 0 ){
				
			$('#pm-home-newsletter-btn').on('click', function(e) {
				
				e.preventDefault();
				
				$('#mc-embedded-subscribe-form').submit();
				
			});
				
		}
		
	/* ==========================================================================
	   Skills table
	   ========================================================================== */
	   
	   function animateSkillsTable() {
		   
		   if( $('.pm-skills-container').length > 0 ){
			   
			   //Calculations
				var cWidth = $('.pm-skills-inner').width(),
				numOfCircles = $('.pm-skills-logo').length,
				totalSpots = cWidth / numOfCircles,
				centerX = (cWidth / 2) - 25,
				centerY = centerX,
				radiusX = cWidth / 2,
				radiusY = radiusX,
				speed = 0.07,
				interval = 200,
				circleCounter = 1,
				timer = null;
								
				$(".pm-skills-container:in-viewport").each(function() {
					
					if (!$('.pm-skills-container').hasClass('already-animated')) {
				   
					   $('.pm-skills-container').addClass('already-animated');
					   
					   timer = setInterval(animateCircles, 200);
									
						$('.pm-skills-logo').each(function(index, element) {
							
							//set the start positions
							$('.pm-skills-logo').css({
								'top' : (cWidth / 2) - ($('.pm-skills-logo').height() / 2),
								'left' : (cWidth / 2) - ($('.pm-skills-logo').width() / 2),
							});
							
							$(this).on('click mouseover mouseout', function(e) {
								
								e.preventDefault();
								
								var $this = $(this);
								
								/*if(e.type === 'mouseover') {
									$this.addClass('active');	
								}*/
								
								if(e.type === 'click') {
									
									$('.pm-skills-logo').removeClass('active');
									$(this).addClass('active');
									
									var id = $(this).attr('id'),
									idNum = id.substr(id.lastIndexOf("-") + 1);
									
									$('.pm-skills-logo-text').removeClass('active');
									$('#pm-skills-logo-text-'+idNum+'').addClass('active');
									
									//Animate milestone
									var dataStop = $(this).attr("data-stop"),
									dataSpeed = $(this).attr("data-speed"),
									targetMilestone = $('#pm-skills-logo-text-percentage-'+ idNum +'');
									
									animateSkillsMilestones(dataStop, dataSpeed, targetMilestone);
									
								}
								
								
							});
							
						});
					   
				   }//end if
					
				});//end of viewport check
				
			}
			
			function animateCircles() {
				
				if(circleCounter >= numOfCircles){
					clearInterval(timer);
				}
				
				var angle = circleCounter * ((Math.PI * 2) / numOfCircles),
				dx = Math.cos(angle)*radiusX+centerX,
				dy = Math.sin(angle)*radiusY+centerY;
							
				var currCircle = $('#pm-skills-logo-'+ circleCounter +''),
				circleID = currCircle.attr('id'),
				circleIDNum = circleID.substr(circleID.lastIndexOf("-") + 1),
				topPosition = Math.round( (dx / cWidth) * 100 ) + '%',
				leftPosition = Math.round( (dy / cWidth) * 100 ) + '%'; //convert top and left values to percentages for responsiveness
				
				currCircle.animate({
					'top' : topPosition,
					'left' : leftPosition,
					'opacity' : 1
				}, 600, 'easeInOutBack');
				
				if(circleCounter == 1){
					
					$('#pm-skills-logo-text-'+circleIDNum+'').addClass('active');
					currCircle.addClass('active');
					
					//Animate milestone
					var dataStop = currCircle.attr("data-stop"),
					dataSpeed = currCircle.attr("data-speed"),
					targetMilestone = $('#pm-skills-logo-text-percentage-'+ circleIDNum +'');
					
					animateSkillsMilestones(dataStop, dataSpeed, targetMilestone);
				}
				
				//console.log('dx = ' + dx);
				circleCounter++;
				
			}
		   
	   }
	   		
		
	/* ==========================================================================
	   Like boxes
	   ========================================================================== */
	   if( $('.pm-gallery-post-like-box').length > 0 ){
		   
		   $('.pm-gallery-post-like-box').each(function(index, element) {
           
		   		var $this = $(element);
				
				$this.on('click', function(e) {
					
					e.preventDefault();
					
					var span = $(this).parent().find('span'),
					currentValue = span.text(),
					//intValue = parseInt(span.text(), 10),
					newValue = parseInt(currentValue) + 1;
					
					span.html(newValue);
					
					//Save value into database
					
					
				});
		    
           });
		   
	   }
	   
	   if( $('.pm-news-post-like-box').length > 0 ){
			 
			 $('.pm-news-post-like-box').each(function(index, element) {
           
		   		var $this = $(element);
				
				$this.on('click', function(e) {
					
					e.preventDefault();
					
					var span = $(this).parent().find('span'),
					currentValue = span.text(),
					//intValue = parseInt(span.text(), 10),
					newValue = parseInt(currentValue) + 1;
					
					span.html(newValue);
					
					//Save value into database
					
					
				});
		    
           });
			   
	   }
	   
	   
		
	/* ==========================================================================
	   Newsletter forms submission
	   ========================================================================== */
		if( $('#pm-home-newsletter-btn').length > 0 ){
			
			$('#pm-home-newsletter-btn').on('click', function(e) {
				
				e.preventDefault();
				
				$('#mc-embedded-subscribe-form').submit();
				
			});
			
		}
		
		if( $('#pm-sidebar-newsletter-btn').length > 0 ){
			
			$('#pm-sidebar-newsletter-btn').on('click', function(e) {
				
				e.preventDefault();
				
				$('#mc-embedded-subscribe-form2').submit();
				
			});
			
		}
		
	/* ==========================================================================
	   Set inital position of float menu
	   ========================================================================== */
		var windowWidth = $(window).width() / 2,
		floatMenuWidth = $('#pm-float-menu-container').outerWidth() / 2;
				
		$('#pm-float-menu-container').css({
			'left' : windowWidth - floatMenuWidth
		});
		
	/* ==========================================================================
	   Initialize Twitterfetch
	   ========================================================================== */
	   if( typeof twitterFetcher != 'undefined'  ){		   
		   //Update the '330034190164819968' with your Twitter widget ID number. Instructions can be found here -> http://www.dezzain.com/tutorials/easy-twitter-feeds-with-javascript/
		   if( $('#pm-twitter-news').length > 0 ){
			   twitterFetcher.fetch( '330034190164819968', 'pm-twitter-news', 2, true, false, false, 'default'); 
		   }
		   if( $('#pm-twitter-news-sidebar').length > 0 ){
			   twitterFetcher.fetch( '330034190164819968', 'pm-twitter-news-sidebar', 2, true, false, false, 'default'); 
		   }
		   
	   }
		
	/* ==========================================================================
	   Initialize animations
	   ========================================================================== */
		//animateMilestones();
		//animateProgressBars();
		//animatePieCharts();
		//setDimensionsPieCharts();
		
		
	/* ==========================================================================
	   Initialize WOW plugin for element animations
	   ========================================================================== */
		if( $(window).width() > 991 ){
			
			if( typeof WOW != 'undefined'  ){	
				new WOW().init();
			}
			
			
		}
		
	/* ==========================================================================
	   Home news posts img interaction
	   ========================================================================== */
	   if( $('.pm-home-news-post-container').length > 0 ){
		   
		   $('.pm-home-news-post-container').each(function(index, element) {
           
		   		var $this = $(this),
				$expandBtn = $this.find('.pm-gallery-post-expand-btn'),
				$imgContainer = $this.find('.pm-home-news-post-img'),
				$categoryContainer = $this.find('.pm-home-news-post-category');
				
				$expandBtn.on('click touchstart', function(e) {
					
					e.preventDefault();
					
					if( !$(this).hasClass('active') ){
						
						$(this).addClass('active');
						
						$imgContainer.animate({
							'height' : '225px'	
						}, 600, 'easeInOutBack');
						
						$categoryContainer.animate({
							'top' : '10px'	
						}, 400, 'easeInOutBack');
						
					} else {
						
						$(this).removeClass('active');
						
						$imgContainer.animate({
							'height' : '125px'	
						}, 500, 'easeInBack');
						
						$categoryContainer.animate({
							'top' : '-100px'	
						}, 300, 'easeInBack');
							
					}
					
				});
		    
           });
		   
	   }
		
		
	/* ==========================================================================
	   Menu system
	   ========================================================================== */
		if( $('#pm-header-menu-btn').length > 0 ){
						
			var $menuBtn = $('#pm-header-menu-btn');
			
			$menuBtn.on('click', function(e) {
				
				//CALL METHODS FUNCTION
				methods.displayMenu();
								
				$('.pm-menu-exit').on('click', function(e) {
					methods.hideMenu();
				});
											
				e.preventDefault();
			
			});
			
		}
		
		if( $('#pm-header-menu-btn-micro').length > 0 ){
						
			var $menuBtn = $('#pm-header-menu-btn-micro');
			
			$menuBtn.on('click', function(e) {
				
				//CALL METHODS FUNCTION
				methods.displayMenu();
								
				$('.pm-menu-exit').on('click', function(e) {
					methods.hideMenu();
				});
											
				e.preventDefault();
			
			});
			
		}
		
		
	/* ==========================================================================
	   Timeline container
	   ========================================================================== */
		if($('#pm-timeline-container').length > 0){
			
			var counter = 1,
			listHeight = 0,
			totalListItems = $('.pm-timeline-dates').children().length;
			
			//Hide prev btn on load
			$('#pm-timeline-bar-prev-btn').hide();
						
			$('#pm-timeline-bar-next-btn').on('click', function(e) {
				
				e.preventDefault();
				
				//increment counter
				if(counter < totalListItems){
					
					counter++;	
					
					$('#pm-timeline-bar-prev-btn').fadeIn();
									
					//animate bullets
					var $firstBullet = $('.pm-timeline-controller-bullet.first'),
					$secondBullet = $('.pm-timeline-controller-bullet.second'),
					$thirdBullet = $('.pm-timeline-controller-bullet.third');
					
					$secondBullet.stop().animate({
						'top' : 0,
						'opacity' : 0
					}, 1000, function(e) {
					
						//reset position for next animation
						$secondBullet.css({
							'top' : '47%',
							'opacity' : 1	
						});
						
					});
					
					$thirdBullet.stop().animate({
						'top' : '47%',
						'opacity' : 1
					}, 1000, function(e) {
					
						//reset position for next animation
						$thirdBullet.css({
							'top' : '90%',
							'opacity' : 0	
						});
						
					});
							
					listHeight += 180;
							
					//animate list items		
					$('.pm-timeline-dates li').stop().animate({
						'top' : -listHeight	
					}, 1000);
					
					//animate descriptions
					var currDesc = $('.pm-timeline-descriptions').find('li.active'),
					nextDesc = currDesc.next();
					
					currDesc.removeClass('active');
					nextDesc.addClass('active');
					
					if(counter == totalListItems){
						$(this).fadeOut();
					}
										
					//console.log('listHeight = ' + listHeight);
										
				}//end if
				
				//console.log('counter = ' + counter);
				
			});
			
			$('#pm-timeline-bar-prev-btn').on('click', function(e) {
				
				e.preventDefault();
												
				//decrement counter
				if(counter > 1){
					
					counter--;
					
					$('#pm-timeline-bar-next-btn').fadeIn();
					
					//animate bullets
					var $firstBullet = $('.pm-timeline-controller-bullet.first'),
					$secondBullet = $('.pm-timeline-controller-bullet.second'),
					$thirdBullet = $('.pm-timeline-controller-bullet.third');
					
					$firstBullet.stop().animate({
						'top' : '47%',
						'opacity' : 1
					}, 1000, function(e) {
					
						//reset position for next animation
						$firstBullet.css({
							'top' : 0,
							'opacity' : 0	
						});
						
					});
					
					$secondBullet.stop().animate({
						'top' : '90%',
						'opacity' : 0
					}, 1000, function(e) {
					
						//reset position for next animation
						$secondBullet.css({
							'top' : '47%',
							'opacity' : 1	
						});
						
					});
					
					//animate list items in reverse
					listHeight -= 180;
					
					$('.pm-timeline-dates li').stop().animate({
						'top' : -listHeight
					}, 1000);
					
					//animate descriptions
					var currDesc = $('.pm-timeline-descriptions').find('li.active'),
					prevDesc = currDesc.prev();
					
					currDesc.removeClass('active');
					prevDesc.addClass('active');
					
					if(counter == 1){
						$(this).fadeOut();
					}
					
					//console.log('listHeight = ' + listHeight);
					
				}//end if
				
				//console.log('counter = ' + counter);
				
			});
			
		}
		
		
	/* ==========================================================================
	   Staff member system
	   ========================================================================== */
	   if($('.pm-staff-member-system').length > 0){
		   
		   var staffCounter = 1,
		   totalStaffListItems = $('.pm-staff-member-system-profile-image-list').children().length;
		   
		   //Display the first bio upon page load
		   $('.pm-staff-member-system-bio-list').find('li.active').fadeIn(1000);
		   
		   //Hide prev btn on load
		   $('.pm-staff-member-system-controls-btn.prev').animate({ 'opacity' : 0 });
		   
		   $('.pm-staff-member-system-controls-btn.next').on('click', function(e) {
			   
			   e.preventDefault();
			   
			   //increment counter
				if(staffCounter < totalStaffListItems){
					
					staffCounter++;
					
					$('.pm-staff-member-system-controls-btn.prev').animate({ 'opacity' : 1 });
					
					//animate bio pics
					var currPic = $('.pm-staff-member-system-profile-image-list').find('li.active'),
					nextPic = currPic.next();
					
					if( $(window).width() > 359 ){
						
						currPic.removeClass('active animated-once shrink');
						nextPic.addClass('active animated-once shrink');
						
					} else {
						
						currPic.removeClass('active animated-once');
						nextPic.addClass('active animated-once');
							
					}					
					
					//animate bio info
					var currBio = $('.pm-staff-member-system-bio-list').find('li.active'),
					nextBio = currBio.next();
					
					currBio.removeClass('active').fadeOut(500);
					nextBio.addClass('active').fadeIn(1000);
					
					if(staffCounter == totalStaffListItems){
						$(this).animate({ 'opacity' : 0 });
					}
					
				}//end if
			   
		   });
		   
		    $('.pm-staff-member-system-controls-btn.prev').on('click', function(e) {
				
				e.preventDefault();
				
				//decrement counter
				if(staffCounter > 1){
					
					staffCounter--;
					
					$('.pm-staff-member-system-controls-btn.next').animate({ 'opacity' : 1 });
					
					//animate bio pics
					var currPic = $('.pm-staff-member-system-profile-image-list').find('li.active'),
					prevPic = currPic.prev();
					
					
					if( $(window).width() > 359 ){
						
						currPic.removeClass('active animated-once shrink');
						prevPic.addClass('active animated-once shrink');
						
					} else {
						
						currPic.removeClass('active animated-once');
						prevPic.addClass('active animated-once');
							
					}
										
					//animate bio info
					var currBio = $('.pm-staff-member-system-bio-list').find('li.active'),
					prevBio = currBio.prev();
					
					currBio.removeClass('active').fadeOut(500);
					prevBio.addClass('active').fadeIn(1000);
					
					if(staffCounter == 1){
						$(this).animate({ 'opacity' : 0 });
					}
					
				}//end if
				
			   
		   });
		   
	   }
		
		
	/* ==========================================================================
	   Isotope menu expander (mobile only)
	   ========================================================================== */
	   if($('.pm-portfolio-system-filter-expand').length > 0){
		   
		   var totalHeight = 0;
		   
		   $('.pm-portfolio-system-filter-expand').on('click', function(e) {
			   
			   var $this = $(this),
			   $parentUL = $this.parent('ul');
			   			   
			   //get the height of the total li elements
			   $parentUL.children('li').each(function(index, element) {
					totalHeight += $(this).height();
			   });
			   			   
			   if( !$parentUL.hasClass('expanded') ){
				   
				    //expand the menu
					$parentUL.addClass('expanded');
				   				  
				    $parentUL.css({
					  "height" : totalHeight	  
				    });
					
					$this.find('i').removeClass('fa-angle-down').addClass('fa-close');
				   
			   } else {
				
					//close the menu
					$parentUL.removeClass('expanded');
				   				  
				    $parentUL.css({
					  "height" : 80 
				    });
					
					$this.find('i').removeClass('fa-close').addClass('fa-angle-down');
									   
			   }
			   
			   //reset totalheight
			   totalHeight = 0;
			   
		   });
		   
	   }
	   
	   
	/* ==========================================================================
	   Gallery filter re-ordering (mobile only)
	   ========================================================================== */
		$('.pm-portfolio-system-filter').children().each(function(i,e) {
						
			$(e).find('a').on('click', function(e) {
					
				e.preventDefault();				
				
				if( $(window).width() < 760 ){
					//Capture parent li index for list reordering
					var listItem = $(this).closest('li');
					var listItemIndex = $(this).closest('li').index();
					//console.log( "Index: " +  listItemIndex );
					
					//$('.pm-isotope-filter-system').insertAfter(listItem, $('.pm-isotope-filter-system').find("li").index(0));
					
					$('.pm-portfolio-system-filter').find("li").eq(0).after(listItem);
				}
									
			});	
			
		});
		
		
	/* ==========================================================================
	   Gallery System
	   ========================================================================== */
		if( $('.pm-portfolio-system-container').length > 0 ){
			
			$('.pm-gallery-post-container').each(function(index, element) {
				
				var $expandBtn = $(this).find('.pm-gallery-post-expand-btn'),
				$expandBtnContainer = $(this).find('.pm-gallery-post-expand-btn-container'),
				$detailsContainer = $(this).find('.pm-gallery-post-details-container'),
				$detailsClose = $(this).find('.pm-gallery-post-details-close-btn'),
				$detailsBorder = $(this).find('.pm-gallery-post-details-border'),
				$detailsList = $(this).find('.pm-gallery-post-details-btns'),
				$likeBox = $(this).find('.pm-gallery-post-like-box-container'); 
                
				
				
				$expandBtn.on('click touchstart', function(e) {
				
					e.preventDefault();
					
					/*if(e.type === 'mouseover'){ }*/
					
					$likeBox.animate({
						'opacity' : 0,
						'top' : '-100px'			
					}, 600, 'easeInOutBack'); //easeOutBounce
					
					$expandBtnContainer.animate({
						'opacity' : 0,
						'bottom' : '-100px'			
					}, 600, 'easeInOutBack'); //easeOutBounce
					
					$detailsContainer.css({ 'visibility' : 'visible' }).animate({
						'opacity' : 1,		
					}, 600); //easeOutBounce
					
					$detailsBorder.animate({
						'height' : '99%',
						'padding' : '20px',
						'opacity' : 1,		
					}, 800, 'easeInOutBack'); //easeOutBounce
					
				});
				
				$detailsClose.on('click', function(e) {
					
					e.preventDefault();
					
					$likeBox.animate({
						'opacity' : 1,
						'top' : '0'			
					}, 600, 'easeInOutBack'); //easeOutBounce
					
					$expandBtnContainer.animate({
						'opacity' : 1,
						'bottom' : '0'			
					}, 600, 'easeInOutBack'); //easeOutBounce
					
					$detailsContainer.animate({
						'opacity' : 0,		
					}, 600, function(e) {
						
						$(this).css({'visibility' : 'hidden'});
							
					}); //easeOutBounce
					
					$detailsBorder.animate({
						'height' : '2px',
						'padding' : '0px',
						'opacity' : 0,		
					}, 800, 'easeInOutBack'); //easeOutBounce
					
				});
				
            });
				
			
		}
		
		//Filter system - active bar
		if( $('#pm-portfolio-system-filter').length > 0 ){
			
			if( $(window).width() > 760 ){
				methods.animateGalleryBar( $('#pm-portfolio-system-filter-active-bar') );
			}
			
		}
		
	/* ==========================================================================
	   Pricing table system
	   ========================================================================== */
	   if( $('.pm-pricing-table-container').length > 0 ){
		   
		   
		   $('.pm-pricing-table-container').each(function(index, element) {
           
		   		var $expander = $(this).find('.pm-pricing-table-details-expander');
				
				$expander.each(function(index, element) {
                    
					var $desc = $(this).parent().find('.pm-pricing-table-details-info'),
					$container = $(this).parent().find('.pm-pricing-table-details-container');
					
					$(this).on('click', function(e) {
					
						e.preventDefault();
						
						if( !$(this).hasClass('active') ){
							
							$(this).parent().addClass('active');
							
							$(this).addClass('active');
							
							$(this).removeClass('fa fa-angle-down').addClass('fa fa-close');
							
							$container.css({
								'height' : 	$desc.height() + 80
							});
							
						} else {
							
							$(this).parent().removeClass('active');
						
							$(this).removeClass('active');
							
							$(this).removeClass('fa fa-close').addClass('fa fa-angle-down');
							
							$container.css({
								'height' : 	50
							});
							
						}
						
						
					
						//alert($desc.height());
					
					});
					
                });
				
				
					
		    
           });
			
			
			
	   }
	   
	   
		
		
	/* ==========================================================================
	   Services Tab system
	   ========================================================================== */
	   if( $('.pm-services-tab-system-container').length > 0 ){
			  
			  //set initial arrow position
			  methods.animateServicesArrow( $('#pm-services-tab-system-container-arrow') );
			  			  
			  //Assign click events
			  $('.pm_services_tab_icon_container').each(function(index, element) {
              
			  		var $this = $(this);
					
					$this.find('a').on('click', function(e) {
						
						e.preventDefault();
						
						//extract id number
						var id = $(this).attr('id'),
						idNum = id.substring(id.lastIndexOf('-') + 1);
						
						//Get target description
						var targetDesc = $('#pm-services-tab-system-desc-' + idNum);
						
						//remove active class on descriptions
						$('.pm-services-tab-system-desc').removeClass('active');
						
						//add active class on target description
						
						targetDesc.addClass('active');
												
						//swap active class on parent container
						$('.pm_services_tab_icon_container').removeClass('active');
						$this.addClass('active');
						
						//Desktop interaction
						if( $(window).width() > 767 ){
																											
							//recalculate arrow position
							methods.animateServicesArrow( $('#pm-services-tab-system-container-arrow') );
							
						} else {
							
							//scroll down to services description
							methods.scrollToServiceDescription( $('#pm-services-tab-system-scrollto') );
							
						}
						
						
						
								
					});
			    
              });
			  
			  //Assign click events to expander
			  $('.pm-services-tab-system-desc-expander').each(function(index, element) {
              
			  	  var $this = $(this);
				  
				  var currDesc = $this.parents().find('.pm-services-tab-system-desc');
				  
				  if(currDesc.hasClass('active')){
					  
					  $this.on('click', function(e) {
					 
						 e.preventDefault();
						 
						 var descContainer = $(this).parent().find('.pm-services-tab-system-desc-text'),
				  		 wrapper = $(this).parent().find('.pm-services-tab-system-desc-wrapper');
						 
						 if( !$(this).hasClass('expanded') ){
							 
							 $(this).addClass('expanded');
							 $(this).removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
							 
							 wrapper.css({
								'height' : descContainer.height()
							 });
							 
							 
						 } else {
							
							$(this).removeClass('expanded');
							$(this).removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
							 
							 wrapper.css({
								'height' : 180
							 });
							 
						 }							 
						  
					  });
					  
				  }
				  
			    
              });
			  
			   
	   }
	   
	/* ==========================================================================
	   Gallery Isotope filter activation
	   ========================================================================== */
	   
	   if( $('#pm-portfolio-system-filter').length > 0 ){
		   
		   $('#pm-portfolio-system-filter').children().each(function(i,e) {
						
			$(e).find('a').on('click', function(e) {
					
				e.preventDefault();
				
				$('#pm-portfolio-system-filter').children().find('a').removeClass('active');
				$(this).addClass('active');
				
				if( $(window).width() > 760 ){
					methods.animateGalleryBar( $('#pm-portfolio-system-filter-active-bar') );
				}
				
				var id = $(this).attr('id');
				$('#pm-isotope-item-container').isotope({ filter: '.'+$(this).attr('id') });
				
			});
						
			
		});
		   
	   }
	   
		
		

		
		
	/* ==========================================================================
	   Timetable shortcode interaction
	   ========================================================================== */
	   if( $('.pm-timetable-container').length > 0 ){
		   
		   $('.pm-accordion-horizontal').on('click', function(e) {
			  
			  e.preventDefault();
			  
			  var parentAccordion = $(this).data('collapse'),
			  targetPanel = $(this).data('panel');
			  
			  //console.log('expand ' + targetPanel + ' in parent accordion ' + parentAccordion);
			  
			  $('#'+parentAccordion).find('.pm-timetable-accordion-panel').each(function(index, element) {
					$(this).removeClass('active');
              });
			  
			  $('#'+targetPanel).addClass('active');
			   
		   });
		   
	   }//endif
		
		
	/* ==========================================================================
	   animateMilestones
	   ========================================================================== */
	
		function animateMilestones() {
	
			$(".milestone:in-viewport").each(function() {
				
				var $t = $(this);
				var	n = $t.find(".milestone-value").attr("data-stop");
				var	r = parseInt($t.find(".milestone-value").attr("data-speed"));
					
				if (!$t.hasClass("already-animated")) {
					$t.addClass("already-animated");
					$({
						countNum: $t.find(".milestone-value").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function() {
							$t.find(".milestone-value").text(Math.floor(this.countNum));
						},
						complete: function() {
							$t.find(".milestone-value").text(this.countNum);
						}
					});
				}
				
			});
	
		}
		
		function animateSkillsMilestones(dataStop, dataSpeed, target) {
					
			var $t = target;
			var	n = dataStop;
			var	r = parseInt(dataSpeed);
				
			if (!$t.hasClass("already-animated")) {
				$t.addClass("already-animated");
				$({
					countNum: $t.find(".milestone-value").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".milestone-value").text(Math.floor(this.countNum) + '%');
					},
					complete: function() {
						$t.find(".milestone-value").text(this.countNum + '%');
					}
				});
			}
	
		}
		
	/* ==========================================================================
	   animateProgressBars
	   ========================================================================== */
	
		function animateProgressBars() {
				
			$(".pm-progress-bar .pm-progress-bar-outer:in-viewport").each(function() {
				
				var $t = $(this),
				progressID = $t.attr('id'),
				numID = progressID.substr(progressID.lastIndexOf("-") + 1),
				targetDesc = '#pm-progress-bar-desc-' + numID,
				$target = $(targetDesc).find('span'),
				$diamond = $(targetDesc).find('.pm-progress-bar-diamond'),
				dataWidth = $t.attr("data-width");
								
				
				if (!$t.hasClass("already-animated")) {
					
					$t.addClass("already-animated");
					$t.animate({
						width: dataWidth + "%"
					}, 2000);
					$target.animate({
						"left" : dataWidth + "%",
						"opacity" : 1
					}, 2000);
					$diamond.animate({
						"left" : dataWidth + "%",
						"opacity" : 1
					}, 2000);
					
				}
				
			});
	
		}
		
		
	/* ==========================================================================
	   Staff post item
	   ========================================================================== */
	   if( $(".pm-staff-profile-container").length > 0 ){
			
			$(".pm-staff-profile-container").each(function(index, element) {
				
				 var $this = $(element),
				 expandBtn = $this.find('.pm-staff-profile-expander'),
				 quoteBox = $this.find('.pm-staff-profile-quote'),
				 socialIcons = $this.find('.pm-staff-profile-icons'),
				 isActive = false;
				 
				 expandBtn.on('click', function(e) {
					 
					 e.preventDefault();
					 
					 if(!isActive){
						 
						 isActive = true
						 
						 expandBtn.removeClass('fa fa-plus').addClass('fa fa-close');
						 
						 quoteBox.css({
							'top' : 0
						 });
						 
						 socialIcons.css({
							'opacity' : 0,
							'right' : -70
						 });
						 
						 
					 } else {
						
						isActive = false;
						
						expandBtn.removeClass('fa fa-close').addClass('fa fa-plus');
						
						quoteBox.css({
							'top' : 290
						});
						 
						socialIcons.css({
							'opacity' : 1,
							'right' : 15
						});
						 
					 }
					 
					 
				 });				 
				
			});
			   
	   }
	   
	/* ==========================================================================
	   Gallery post item
	   ========================================================================== */
	   if( $(".pm-gallery-post-item-container").length > 0 ){
			
			$(".pm-gallery-post-item-container").each(function(index, element) {
				
				 var $this = $(element),
				 expandBtn = $this.find('.pm-gallery-item-expander'),
				 excerpt = $this.find('.pm-gallery-item-excerpt'),
				 isActive = false;
				 
				 expandBtn.on('click', function(e) {
					 
					 e.preventDefault();
					 
					 if(!isActive){
						 
						 isActive = true
						 
						 expandBtn.removeClass('fa fa-plus').addClass('fa fa-close');
						 
						 excerpt.css({
							'top' : 0
						 });
						 						 
						 
					 } else {
						
						isActive = false;
						
						expandBtn.removeClass('fa fa-close').addClass('fa fa-plus');
						
						excerpt.css({
							'top' : 400
						});
						 						 
					 }
					 
					 
				 });				 
				
			});
			   
	   }				
		
	/* ==========================================================================
	   Testimonials carousel (homepage)
	   ========================================================================== */
	   if( $("#pm-testimonials-carousel").length > 0 ){
			  
			$("#pm-testimonials-carousel").PMTestimonials({
				speed : 500,
				slideShow : true,
				slideShowSpeed : 7000,
				controlNav : false,
				arrows : true	
			});
			   
	   }
		
	/* ==========================================================================
	   Brand carousel (homepage)
	   ========================================================================== */
	   if( $("#pm-brands-carousel").length > 0 ){
		   
		    var owl = $("#pm-brands-carousel");
			var isPlaying = false;
		   
		    owl.owlCarousel({
				
				items : 4, //10 items above 1000px browser width
				itemsDesktop : [5000,4],
				itemsDesktopSmall : [991,2],
				itemsTablet: [767,2],
				itemsTabletSmall: [720,1],
				itemsMobile : [320,1],
				
				//Pagination
				pagination : false,
				paginationNumbers: false,
				
		   });
		   
		    // Custom Navigation Events
			$(".pm-owl-next").on('click', function(){
				owl.trigger('owl.next');
			})
			$(".pm-owl-prev").on('click', function(){
				owl.trigger('owl.prev');
			})
			
				
			$("#pm-owl-play").on('click', function(){
				
				if(!isPlaying){
					isPlaying = true;
					$(this).removeClass('fa fa-play').addClass('fa fa-stop');
					owl.trigger('owl.play',3000); //owl.play event accept autoPlay speed as second parameter
				} else {
					isPlaying = false;
					$(this).removeClass('fa fa-stop').addClass('fa fa-play');
					owl.trigger('owl.stop');
				}
				
				
			});
			
			
				
		   
	   }
		
	/* ==========================================================================
	   Flexslider (homepage)
	   ========================================================================== */
	   if( $("#pm-flexslider-home").length > 0 ){
		   
		   $("#pm-flexslider-home").flexslider({
				animation:"slide", 
				controlNav: false, 
				directionNav: true, 
				animationLoop: true, 
				slideshow: false, 
				arrows: true, 
				touch: false, 
				prevText : "", 
				nextText : "",
				start : function() {
					$('.flex-direction-nav').find('li').eq(0).append('<div class="flex-prev-shadow" />');
					$('.flex-direction-nav').find('li').eq(1).append('<div class="flex-next-shadow" />');
				},
			});
		   
	   }
		
	/* ==========================================================================
	   PrettyPhoto activation
	   ========================================================================== */
	  if( $("a[data-rel^='prettyPhoto']").length > 0 ){
		  							
			$("a[data-rel^='prettyPhoto']").prettyPhoto({
				animation_speed: 'normal', /* fast/slow/normal */
				slideshow: 5000, /* false OR interval time in ms */
				autoplay_slideshow: false, /* true/false */
				opacity: 0.80, /* Value between 0 and 1 */
				show_title: true, /* true/false */
				//allow_resize: true, /* Resize the photos bigger than viewport. true/false */
				//default_width: 640,
				//default_height: 480,
				counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
				theme: 'dark_square', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
				horizontal_padding: 20, /* The padding on each side of the picture */
				hideflash: true, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
				wmode: 'opaque', /* Set the flash wmode attribute */
				autoplay: true, /* Automatically start videos: True/False */
				modal: false, /* If set to true, only the close button will close the window */
				deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
				overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
				keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
				changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
				
			});
			
		}	
	   
	/* ==========================================================================
	   MeanMenu (mobile menu)
	   ========================================================================== */
	    /*$('#pm-main-navigation').meanmenu({
			//meanMenuContainer: '#pm-mobile-menu-container',
			meanScreenWidth : 	"980",
			meanRevealPositionDistance: "0",
			meanShowChildren: true,
			meanExpandableChildren: true,
			meanExpand: "+",
			meanMenuCloseSize: "18px"
		});*/
		
	/* ==========================================================================
	   Testimonials widget
	   ========================================================================== */
	   if( $('.pm-testimonials-widget-quotes').length > 0 ){
		   
		    $('.pm-testimonials-widget-quotes').PMTestimonials({
				speed : 450,
				slideShow : true,
				slideShowSpeed : 6000,
				controlNav : false,
				arrows : true 
			});
		   
	   }
		
	/* ==========================================================================
	   Homepage slider
	   ========================================================================== */
		if($('#pm-slider').length > 0){
						
			$('#pm-slider').PMSlider({
				speed : 700,
				easing : 'ease',
				loop : true, 
				controlNav : true, //false = no bullets / true = bullets
				controlNavThumbs : true,
				animation : 'fade',
				fullScreen : false,
				slideshow : true,
				slideshowSpeed : 6000,
				pauseOnHover : true,
				arrows : true,
				fixedHeight : true, //do not change this value
				fixedHeightValue : 755,
				touch : true,
				progressBar : false
			});
			
		}
		

		
		
	/* ==========================================================================
	   Panel scrolling
	   ========================================================================== */
	   $('#back-top-scroll-up').on('click', function(e){
		   
		   e.preventDefault();
		   
		   //Find the container that is in the view
		   var container = $(".container-scroll:in-viewport").first(),
		   id = container.attr('id'),
		   scrollPrev = container.prev(),
		   prevID = scrollPrev.attr('id');
		   
		   //console.log(scrollPrev.attr('id'));
		   
		   if(typeof prevID === "undefined"){
			   
			   $('html, body').stop().animate({
					scrollTop: 0
				}, 1000);
			   
		   } else {
				 
				 $('html, body').stop().animate({
					scrollTop: $(scrollPrev).offset().top + 5
				}, 1000);
				   
		   }
		   
		   
		   
	   });
	   
	   $('#back-top-scroll-down').on('click', function(e){
		   
		   e.preventDefault();
		   
		   var container = $(".container-scroll:in-viewport"),
		   id = container.attr('id'),
		   scrollNext = container.next();
		   
		   //console.log(scrollNext.attr('id')); 
		   
		  $('html, body').stop().animate({
				scrollTop: $(scrollNext).offset().top + 5
			}, 1000);
		   
	   });
		
		
	
		
	/* ==========================================================================
	   Datepicker
	   ========================================================================== */
	   if($("#pm_app_form_date").length > 0){
		   $("#pm_app_form_date").datepicker();
	   }
	   
	/* ==========================================================================
	   Gallery Isotope activation
	   ========================================================================== */
	   if($("#gallery-posts").length > 0){


			 $('#pm-isotope-item-container').isotope({
				  itemSelector : '.isotope-item',
				  //percentPosition: true,
				  transitionDuration: '0.6s',
				  masonry: {
					columnWidth: '.grid-sizer'
				  }
				});

		  
	   }
	   
		
	/* ==========================================================================
	   Isotope menu expander (mobile only)
	   ========================================================================== */
	   if($('.pm-isotope-filter-system-expand').length > 0){
		   
		   var totalHeight = 0;
		   
		   $('.pm-isotope-filter-system-expand').on('click', function(e) {
			   
			   var $this = $(this),
			   $parentUL = $this.parent('ul');
			   			   
			   //get the height of the total li elements
			   $parentUL.children('li').each(function(index, element) {
					totalHeight += $(this).height() + 5;
			   });
			   			   
			   if( !$parentUL.hasClass('expanded') ){
				   
				    //expand the menu
					$parentUL.addClass('expanded');
				   				  
				    $parentUL.css({
					  "height" : totalHeight	  
				    });
					
					$this.find('i').removeClass('fa-angle-down').addClass('fa-close');
				   
			   } else {
				
					//close the menu
					$parentUL.removeClass('expanded');
				   				  
				    $parentUL.css({
					  "height" : 94
				    });
					
					$this.find('i').removeClass('fa-close').addClass('fa-angle-down');
									   
			   }
			   
			   //reset totalheight
			   totalHeight = 0;
			   
		   });
		   
		   
		   $('.pm-isotope-filter-system').children().each(function(i,e) {
						
				if(i > 0){
					
					//add click functionality
					$(e).find('a').on('click', function(e) {
						
						e.preventDefault();
																	
												
						if( $(window).width() < 991 ){
							//Capture parent li index for list reordering
							var listItem = $(this).closest('li');
							var listItemIndex = $(this).closest('li').index();
							console.log( "Index: " +  listItemIndex );
							
							//$('.pm-isotope-filter-system').insertAfter(listItem, $('.pm-isotope-filter-system').find("li").index(0));
							
							$('.pm-isotope-filter-system').find("li").eq(0).after(listItem);
						}
											
					});
					
				}
							
				
			});
		   
		   
	   }//end of if
		
		
	/* ==========================================================================
	   Language Selector drop down
	   ========================================================================== */
		if($('.pm-dropdown.pm-language-selector-menu').length > 0){
			$('.pm-dropdown.pm-language-selector-menu').on('mouseover', methods.dropDownMenu).on('mouseleave', methods.dropDownMenu);
		}
		
	/* ==========================================================================
	   Filter system drop down
	   ========================================================================== */
		if($('.pm-dropdown.pm-filter-system').length > 0){
			$('.pm-dropdown.pm-filter-system').on('mouseover', methods.dropDownMenu).on('mouseleave', methods.dropDownMenu);
		}
		
	/* ==========================================================================
	   Categories system drop down
	   ========================================================================== */
		if($('.pm-dropdown.pm-categories-menu').length > 0){
			$('.pm-dropdown.pm-categories-menu').on('mouseover', methods.dropDownMenu).on('mouseleave', methods.dropDownMenu);
		}
		

		
	/* ==========================================================================
	   Main menu interaction
	   ========================================================================== */
		if( $('.pm-nav').length > 0 ){
						
			//superfish activation
			$('.pm-nav').superfish({
				delay: 0,
				animation: {opacity:'show',height:'show'},
				speed: 300,
				dropShadows: false,
			});
			
			$('.sf-sub-indicator').html('<i class="fa fa-angle-down"></i>');
			
			$('.sf-menu ul .sf-sub-indicator').html('<i class="fa fa-angle-right"></i>');
						
		};	
		
	/* ==========================================================================
	   Checkout expandable forms
	   ========================================================================== */
		if ($('#pm-returning-customer-form-trigger').length > 0){
			
			var $returningFormExpanded = false;
			
			$('#pm-returning-customer-form-trigger').on('click', function(e) {
				
				e.preventDefault();
				
				if( !$returningFormExpanded ) {
					$returningFormExpanded = true;
					$('#pm-returning-customer-form').fadeIn(700);
					
				} else {
					$returningFormExpanded = false;
					$('#pm-returning-customer-form').fadeOut(300);
				}
				
			});
			
		}
		
		if ($('#pm-promotional-code-form-trigger').length > 0){
			
			var $promotionFormExpanded = false;
			
			$('#pm-promotional-code-form-trigger').on('click', function(e) {
				
				e.preventDefault();
				
				if( !$promotionFormExpanded ) {
					$promotionFormExpanded = true;
					$('#pm-promotional-code-form').fadeIn(700);
					
				} else {
					$promotionFormExpanded = false;
					$('#pm-promotional-code-form').fadeOut(300);
				}
				
			});
			
		}

				
	/* ==========================================================================
	   isTouchDevice - return true if it is a touch device
	   ========================================================================== */
	
		function isTouchDevice() {
			return !!('ontouchstart' in window) || ( !! ('onmsgesturechange' in window) && !! window.navigator.maxTouchPoints);
		}
				
		
		//dont load parallax on mobile devices
		function runParallax() {
			
			//enforce check to make sure we are not on a mobile device
			if( !isMobile.any()){
							
				//stellar parallax
				$.stellar({
				  horizontalOffset: 0,
				  verticalOffset: 0,
				  horizontalScrolling: false,
				});
				
				$('.pm-parallax-panel').stellar();
				
								
			}
			
		}//end of function
		
	/* ==========================================================================
	   Checkout form - Account password activation
	   ========================================================================== */
	   
	   if( $('#pm-create-account-checkbox').length > 0){
			  			
			$('#pm-create-account-checkbox').change(function(e) {
				
				if( $('#pm-create-account-checkbox').is(':checked') ){
					
					$('#pm-checkout-password-field').fadeIn(500);
					
				} else {
					$('#pm-checkout-password-field').fadeOut(500);	
				}
				
			});
			   
	   }
	   
	   
	 /* ==========================================================================
	   Accordion and Tabs
	   ========================================================================== */
	   
	    $('#accordion').collapse({
		  toggle: false
		})
	    $('#accordion2').collapse({
		  toggle: false
		})
	   
		if($('.panel-title').length > 0){
			
			var $prevItem = null;
			var $currItem = null;
			
			$('.pm-accordion-link').on('click', function(e) {
				
				var $this = $(this);
				
				if($prevItem == null){
					$prevItem = $this;
					$currItem = $this;
				} else {
					$prevItem = $currItem;
					$currItem = $this;
				}				
				
				
				if( $currItem.attr('href') != $prevItem.attr('href') ) {
										
					//toggle previous item
					if( $prevItem.parent().find('i').hasClass('fa fa-minus') ){
						$prevItem.parent().find('i').removeClass('fa fa-minus').addClass('fa fa-plus');
					}
					
					$currItem.parent().find('i').removeClass('fa fa-plus').addClass('fa fa-minus');
					
				} else if($currItem.attr('href') == $prevItem.attr('href')) {
										
					//else toggle same item
					if( $currItem.parent().find('i').hasClass('fa fa-minus') ){
						$currItem.parent().find('i').removeClass('fa fa-minus').addClass('fa fa-plus');
					} else {
						$currItem.parent().find('i').removeClass('fa fa-plus').addClass('fa fa-minus');
					}
						
				} else {
					
					//console.log('toggle current item');
					$currItem.parent().find('i').removeClass('fa fa-plus').addClass('fa fa-minus');
					
				}
				
				
			});

			
		}
		
	/* ==========================================================================
	   Back to top button
	   ========================================================================== */
		$('#back-top-last').on('click', function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});

		
	/* ==========================================================================
	   When the window is scrolled, do
	   ========================================================================== */
		$(window).scroll(function () {
			
			//animateMilestones();
			//animateProgressBars();
			animateSkillsTable();
			
			//toggle back to top btn
			var endZone = $('.pm-fat-footer').offset().top - $(window).height();
			
			//console.log(endZone);
			
			if($(this).scrollTop() > endZone && $(window).width() > 991) {
					
				if( support ) {
					$('#back-top').css({ right : -100 });
				} else {
					$('#back-top').animate({ right : -100 });
				}
							
					
			} else  if ($(this).scrollTop() > 250 && $(window).width() > 991) {
					
				if( support ) {
					$('#back-top').css({ right : 20 });
				} else {
					$('#back-top').animate({ right : 20 });
				}
					
			} else {
				if( support ) {
					$('#back-top').css({ right : -100 });
				} else {
					$('#back-top').animate({ right : -100 });
				}
			}
			
			
			
			if ($(this).scrollTop() > 190) {
					
				$('#pm-float-menu-container').addClass('active');
								
			} else {
				
				$('#pm-float-menu-container').removeClass('active');
									
			}//end of if
			
			//toggle fixed nav
			if( $(window).width() > 991 ){
				
				if ($(this).scrollTop() > 190) {
					
					$('.pm-nav-container').addClass('fixed');
									
				} else {
					
					$('.pm-nav-container').removeClass('fixed');
										
				}//end of if
				
				
				//Calculate window scroll status
				var base = this,
				container = $(base);
				
				var wrapper = $('#pm_layout_wrapper'),
				viewportHeight = $(window).height(), 
				scrollbarHeight = viewportHeight / wrapper.height() * viewportHeight,
				progress = $(window).scrollTop() / (wrapper.height() - viewportHeight),
				distance = progress * (viewportHeight - scrollbarHeight) + scrollbarHeight / 2 - container.height() / 2;
				
				$('#back-top-status').text(Math.round(progress * 100) + '%');
				
				//track this for global purposes
				pagePercentage = Math.round(progress * 100);
				
				//console.log(pagePercentage);
			
			}
						
		});
		
	/* ==========================================================================
	   Detect page scrolls on buttons
	   ========================================================================== */
		if( $('.pm-page-scroll').length > 0 ){
			
			$('.pm-page-scroll').on('click', function(e){
												
				e.preventDefault();
				var $this = $(this);
				var sectionID = $this.attr('href');
								
				$('html, body').animate({
					scrollTop : $(sectionID).offset().top + 50
				}, 1000);
				
			});
			
		}

	
	/* ==========================================================================
	   Back to top button
	   ========================================================================== */
		$('#pm-back-to-top').on('click', function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
	/* ==========================================================================
	   Accordion menu
	   ========================================================================== */
		if($('#accordionMenu').length > 0){
			$('#accordionMenu').collapse({
				toggle: false,
				parent: false,
			});
		}
		
		
	/* ==========================================================================
	   Tab menu
	   ========================================================================== */
		if($('.pm-nav-tabs').length > 0){
			//actiavte first tab of tab menu
			$('.pm-nav-tabs a:first').tab('show');
			$('.pm-nav-tabs li:first-child').addClass('active');
		}

	/* ==========================================================================
	   Parallax check
	   ========================================================================== */
		var $window = $(window);
		var $windowsize = 0;
		
		function checkWidth() {
			$windowsize = $window.width();
			if ($windowsize < 980) {
				//if the window is less than 980px, destroy parallax...
				$.stellar('destroy');
			} else {
				runParallax();	
			}
		}
		
		// Execute on load
		checkWidth();
		// Bind event listener
		$(window).resize(checkWidth);

		
	/* ==========================================================================
	   Window resize call
	   ========================================================================== */
		$(window).resize(function(e) {
			methods.windowResize();
		});

		
	/* ==========================================================================
	   Tooltips
	   ========================================================================== */
		if( $('.pm_tip').length > 0 ){
			$('.pm_tip').PMToolTip();
		}
		if( $('.pm_tip_static_bottom').length > 0 ){
			$('.pm_tip_static_bottom').PMToolTip({
				floatType : 'staticBottom'
			});
		}
		if( $('.pm_tip_static_top').length > 0 ){
			$('.pm_tip_static_top').PMToolTip({
				floatType : 'staticTop'
			});
		}
		
	/* ==========================================================================
	   TinyNav
	   ========================================================================== */
		//$(".pm-footer-navigation").tinyNav();
		
			
	}); //end of document ready

	
	/* ==========================================================================
	   Options
	   ========================================================================== */
		var options = {
			dropDownSpeed : 100,
			slideUpSpeed : 200,
			slideDownTabSpeed: 50,
			changeTabSpeed: 200,
		}
	
	/* ==========================================================================
	   Methods
	   ========================================================================== */
		var methods = {
			
			dropDownMenu : function(e){  
					
				var body = $(this).find('> :last-child');
				var head = $(this).find('> :first-child');
				
				if (e.type == 'mouseover'){
					body.fadeIn(options.dropDownSpeed);
				} else {
					body.fadeOut(options.dropDownSpeed);
				}
				
			},
			
			animateGalleryBar : function(element) {
				
				var $e = $(element);
				
				var activeTarget = $('.pm-portfolio-system-filter').find('a.active'),
			    activeTargetWidth = activeTarget.width() / 2,
			    activeTargetPos = activeTarget.offset().left;
				
				$e.css({
				  'left' : activeTargetPos,
				  'width' : activeTarget.width()
			    });
								
			},
			
			animateServicesArrow : function(element) {
				
				var $e = $(element);
				
				var activeTarget = $('.pm_services_tab_icon_container.active'),
				activeTargetWidth = activeTarget.width() / 2,
				activeTargetPos = (activeTarget.offset().left + activeTargetWidth) - 10;
				  
				$e.css({
					'left' : activeTargetPos
				});
				
			},
			
			scrollToServiceDescription : function(element) {
								
				var $e = $(element);
				
				$('html, body').stop().animate({
					scrollTop: $e.offset().top
				}, 1000);
				
			},
			
			displayMenu : function(e) {
							
				var menuContainer = $("#pm-menu-container");
				
				menuContainer.css({
					'height' : $(window).height(),
					'opacity' : 1
				});
				
			},
			
			hideMenu : function(e) {
				
				var menuContainer = $("#pm-menu-container");
				
				menuContainer.css({
					'opacity' : 0,
					'height' : 0
				});
				
			},
					
			windowResize : function() {
				//resize calls
				
				var windowWidth = $(window).width() / 2,
				floatMenuWidth = $('#pm-float-menu-container').outerWidth() / 2;
				
				$('#pm-float-menu-container').css({
					'left' : windowWidth - floatMenuWidth
				});
				
				if( $(window).width() > 767 ){
					
					if( $('#pm-portfolio-system-filter').length > 0 ){
						methods.animateGalleryBar( $('#pm-portfolio-system-filter-active-bar') );
					}
					
					if( $('.pm-services-tab-system-container').length > 0 ){
						methods.animateServicesArrow( $('#pm-services-tab-system-container-arrow') );
					}
					
					
					$('#pm-portfolio-system-filter').css({
						'height' : 'auto'	
					});
					
				} else {
					
					$('#pm-portfolio-system-filter').css({
						'height' : 80	
					}).removeClass('expanded');
					
					$('.pm-portfolio-system-filter-expand').find('i').removeClass('fa fa-close').addClass('fa fa-angle-down');
					
				}
				
			},
			
		};
		
	
	
})(jQuery);

