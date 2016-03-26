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
	$(".projectThumbnail").on("mouseenter", function(e) {
		$(this).children(".projectThumbnailHover").fadeIn(300);

		$(this).children(".projectThumbnailHover").find("h4").css("display", "block");
		$(this).children(".projectThumbnailHover").find("h4").css("opacity", "0");
		$(this).children(".projectThumbnailHover").find("h4").delay(200).animate({left: '30', opacity: 1}, 200);

		$(this).children(".projectThumbnailHover").find("h5").css("display", "block");
		$(this).children(".projectThumbnailHover").find("h5").css("opacity", "0");
		$(this).children(".projectThumbnailHover").find("h5").delay(350).animate({left: '30', opacity: 1}, 200);
	})

	$(".projectThumbnail").on("mouseleave", function(e) {
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

$(window).load(function() {
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
    $('header nav ul').append($(
        '<li><a class="email" href="mail' + 'to:irene' + '@ir' + 'eneros.net"><img alt="Contact me" src="data:image/gif;base64,R0lGODlhEAALANUAAPT09KCgoKqqqq+vr7CwsKurq/Pz86Ghofj4+KOjo6mpqfb29vn5+ZiYmPDw8JeXl/Hx8Z2dnbW1tZubm66urp+fn7e3t7GxsfX19aysrJ6enurq6qioqK2traenp/v7+6ampvf396Kiovr6+v39/f7+/vz8/KSkpKWlpf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQAAsAAAaIQEKDgBJ1PMWCJ3HwRCiBAiaFSJVMH6wpFSJoTilRKkUak60lVKpyAqQUoa2DTDKdSKED2C0olcZlYiMpAidbVSglH2NgBn8TJyUjJgMmYpYlHoMjIHdhJlsgIGQfFykjJycLASluDAZWKRAlowknEiEkDKdnG6cLGSgWKMQoJ8UKAgEcAw8DQQA7" /></a></li>'
    ))

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
				this.title = '<h4>' + $(this.element).find('img').attr('alt') + '</h4>' + '<p>' + this.title + '</p>';
			},
			helpers : {
				title : { type: 'inside' },
				media : {}
			}
		});
  });
