/*

    theme : dayfly (script)
    
        by ilonino.tumblr.com
    
    
    > please do not copy/steal code without my permission
    

*/

// back to top button (c) html-tuts.com 
$('.back-to-top a').click(function() {
	$('html, body').animate({
		scrollTop: 0
	}, 1000);
	return false;
});

// tumblr audio scripts
function radios() {     
  
  // minimal soundcloud player (c) shythemes.tumblr.com
   var color = '{color:Links}';
    $('.soundcloud_audio_player').each(function(){
        $(this).attr({ src: $(this).attr('src').split('&')[0] + '&amp;liking=false&amp;sharing=false&amp;auto_play=false&amp;show_comments=false&amp;continuous_play=false&amp;buying=false&amp;show_playcount=false&amp;show_artwork=false&amp;origin=tumblr&amp;color=' + color.split('#')[1], height: 116, width: '100%' });
    }); 
    // change colour of new tumblr audio player (c) shudesigns.tumblr.com
    var $audio = $('iframe.tumblr_audio_player');
      $audio.load(function() {
        $(this).contents().find('head').append('<style type="text/css">' +
          '.audio-player { background: {color:Background}; color: {color:Text}!important; }' +
        '</style>');
      });
}
$(document).ready(radios);

// photoset-grid.js (c) style hatch
function myPhotoset() {
    $('.photoset-grid-lightbox').each(function() {
        $(this).photosetGrid({
            highresLinks:true,
            rel:$(this).attr('data-id'),
            gutter:'1px',
            // colorbox
            onComplete: function(){
                $('.photoset-grid-lightbox').attr('style', '');
                $('.photoset-grid-lightbox a.photoset-cell').colorbox({
                    transition:'fade', // elastic, fade or none
                    photo:true,
                    scalePhotos:true,
                    maxHeight:'75%',
                    maxWidth:'75%',
                    opacity:'0.99',
                    current:'',
                    loop:true
                });
             }
        }); 
    });
}
$(document).ready(myPhotoset);

$(document).ready(function(){
    
    // jQuery UI tooltip
    $('body').tooltip();

    // fitvids.js (c) Chris Coyier
    $(".video").fitVids({customSelector:"iframe[src*='www.tumblr.com/video']"});
    
    // search tags (c) shythemes.tumblr.com
    $('.search').submit(function(event){
        
        var value = $('input:first').val();
        
        location.replace('http://{Name}.tumblr.com/tagged/' + value);
    });
       
   {block:IndexPage}
   var $container = $('.posts-holder');

    // init Masonry (c) David DeSandro
        $container.masonry({
            itemSelector:'.posts', 
            columnWidth:'.posts',
            gutter:75,
            stagger:100,
            // nicer reveal transition
            visibleStyle: { transform: 'translateY(0)', opacity: 1 },
            hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
        }); 
        
    // initial items reveal and ImagesLoaded
        $container.imagesLoaded().progress(function() {
            $container.removeClass('are-images-unloaded');
            $container.masonry('layout');
        });
    
    // get Masonry instance
    var msnry = $container.data('masonry');

    {block:ifinfinitescroll}
    // init Infinte Scroll (c) MetaFizzy
        $container.infiniteScroll({
            path:'.next',
            history:false,
            prefill:true,
            append:'.posts',
            hideNav:'.pagination',
            status:'.page-load-status', 
            outlayer:msnry,
            {block:ifManualLoad}
            button: '.view-more-button',
            // load pages on button click
            scrollThreshold: false,
            // disable loading on scroll
            {/block:ifManualLoad}
        });
    
    // get Infinite Scroll instance
    var infScroll = $container.data('infiniteScroll');
    
    // triggered after items have been appended to the container
    $container.on('append.infiniteScroll',function(event, response, path, items){
        
        var $newElems = $(items);
        
        var $newElemsIDs = $newElems.map(function(){
            return this.id;
        }).get();
        Tumblr.LikeButton.get_status_by_post_ids($newElemsIDs);
        radios();
        myPhotoset();
        $(".video").fitVids({customSelector:"iframe[src*='www.tumblr.com/video']"});
        $container.imagesLoaded().progress(function() {
            $container.masonry('layout');
        });
    });
    {/block:ifInfiniteScroll}
    {/block:Indexpage}
});
// AOS - Animate on scroll library (c) michalsnik
$(window).on('load', function() {
  AOS.init({
    offset: 150,
    easing: 'ease-in-out',
    once: true
  });
});
