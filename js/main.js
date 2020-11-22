var firebaseConfig = {
    apiKey: "AIzaSyA6F125jGXkCH__9xtN5b3KVc13yRl9kIA",
    authDomain: "simple-history-by-ahnaf.firebaseapp.com",
    databaseURL: "https://simple-history-by-ahnaf.firebaseio.com",
    projectId: "simple-history-by-ahnaf",
    storageBucket: "simple-history-by-ahnaf.appspot.com",
    messagingSenderId: "201857902847",
    appId: "1:201857902847:web:774bed5d0c27cb9b9304ca",
    measurementId: "G-VV2M0Q3B7Q"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  ///Reference messages collection
  var messagesRef=firebase.database().ref('messages') ;


   ///Listen for form submit
   document.getElementById('contactForm').addEventListener('submit',submitForm);
  	///Submit Form
   function submitForm(e){
	  e.preventDefault();

	  ///Get Values
	  var name=getInputVal('name');
	  var email=getInputVal('email');
	  var phone=getInputVal('phone');
	  var company=getInputVal('company');
	  var subject=getInputVal('subject');
	  var message=getInputVal('message');
	  
	  ///save message 
	  saveMessage(name,email,phone,company,subject,message);

  }
  ///function to get form values
  function getInputVal(id){
	  return document.getElementById(id).nodeValue;
  }

jQuery(function($) {'use strict',

	//#main-slider
	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 8000
		});
	});


	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});
		
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	document.getElementById('contactForm').addEventListener('submit',submitForm)
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),

			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
		});
	});

	
	//goto top
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});	

	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});	
});
///save message to firebase
function saveMessage(name,email,phone,company,message,subject){
	newMessageRef=messagesRef.push();
	newMessageRef.set({
		name: name, 
		company: company,
		email: email,
		phone: phone,
		message: message ,
	});
}