/*
••••••••••••••••••••••••

Powered by Type & Grids™
www.typeandgrids.com

••••••••••••••••••••••••
*/

jQuery.easing.def = "easeOutQuad";

$(document).ready(function()
{
	
	// For fluid video embedding
	$(".video").fitVids();
	// Project thumbnail hover
	$(".projectThumbnail").on("mouseenter", function(e)
	{
		$(this).children(".projectThumbnailHover").fadeIn(300);
		
		$(this).children(".projectThumbnailHover").find("h4").css("display", "block");
		$(this).children(".projectThumbnailHover").find("h4").css("opacity", "0");
		$(this).children(".projectThumbnailHover").find("h4").delay(200).animate({left: '30', opacity: 1}, 200);
		
		$(this).children(".projectThumbnailHover").find("h5").css("display", "block");
		$(this).children(".projectThumbnailHover").find("h5").css("opacity", "0");
		$(this).children(".projectThumbnailHover").find("h5").delay(350).animate({left: '30', opacity: 1}, 200);
	})
	
	$(".projectThumbnail").on("mouseleave", function(e)
	{
		$(this).children(".projectThumbnailHover").fadeOut(200);
		$(this).children(".projectThumbnailHover").find("h4").animate({left: '0', opacity: 0}, 0);
		$(this).children(".projectThumbnailHover").find("h5").animate({left: '0', opacity: 0}, 0);
	})
	
	// Hide hover effect on touch devices
	if (Modernizr.touch) {
		$(".projectThumbnailHover").css("display", "none");
		$(".projectThumbnailHover").css("visibility", "hidden");
		$(".projectThumbnail").unbind("mouseenter");
		$(".projectThumbnail").unbind("mouseleave");	
	}	
});

// Remove site preloader after site is loaded
$(window).load(function() {
	$('#sitePreloader').delay(200).fadeOut(500, function() {
		$(this).remove();
	});
	
	// Fade site in
	$(".container").delay(700).fadeIn(500);
	$container = $("#creations").isotope({
		animationEngine: 'jquery',
		sortBy: 'random',
		itemSelector : '.project',
		layoutMode: 'masonry',
		animationOptions: {
			duration: 500,
			easing: 'easeOutQuad',
			queue: false
		}
	});

	function hashCheck(){
		var hash = window.location.hash.substring(1).replace(/creation\/all/, '*').replace(/creation\//, '')
	
		if (hash) {
		    $container.isotope({
		        filter: (hash=="*")?hash:'.' + hash
		    });
		}
	}
	

	window.onhashchange = hashCheck;

	hashCheck();

	$('#overview').on( 'click', 'a', function(e) {
		e.preventDefault();
		var filterValue = $(this).attr('data-filter');
		$container.isotope({ filter: filterValue });
		window.location.hash = 'creation/' + filterValue.replace('*', 'all').replace('.', '');
	});
});

 $(document).ready(function () {
    $("#visions").nanoGallery({
      thumbnailWidth: 'auto',
      thumbnailHeight: 250,
      kind: 'flickr',
   	  userID: '127244759@N04',
   	  blackList: 'movimenti digitali|Lo-fi bianco e nero|Lo-fi colori',
      colorScheme: 'none',
      locationHash: true,
      viewer: 'fancybox',
      albumSorting: 'random',
      viewerToolbar: {
      	style: 'fullWidth',
      	autoMinimize:15000
      },
      galleryToolbarHideIcons: true,
      thumbnailHoverEffect: [{ name: 'labelAppear75', duration: 300 }],
      theme: 'light',
      thumbnailGutterWidth : 0,
      thumbnailGutterHeight : 20,
      thumbnailLabel: { hideIcons: true, display: true, position: 'overImageOnTop', align: 'left', displayDescription:false },
      i18n: {
      	breadcrumbHome: 'Visions'
      }
    });
	$(".fancybox").fancybox({				
			padding : 0,
			'nextEffect':'fade', 
    		'prevEffect':'fade',
			beforeShow: function () {
				this.title = $(this.element).attr('title');
				this.title = '<h4>' + $(this.element).parent().find('img').attr('alt') + '</h4>' + '<p>' + this.title + '</p>';
			},
			helpers : {
				title : { type: 'inside' },
				media : {}
			}
		});
  });

