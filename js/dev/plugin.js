/*
jQuery Teopisto
*/
(function ( $ ) {
  $.fn.teopisto = function( options ) {
   
    var defaults = {
      child: '*',
      interval: '380',
      offset: '68%',
      effect: 'zoom',
      random: false
    };
   
    var settings = $.extend( {}, defaults, options ),
      body = $('body'),
      child = settings.child,
      time = settings.interval,
      distance = settings.offset,
      container = this,
      item = $('>'+child, container),
      effect;

    $(document).ready(function(){
      body.addClass('teopisto-preload');
      container.addClass('teopisto');
      item.addClass('passenger');

      switch (settings.effect) {
        case 'zoom':
          effect = 'zoom';
          break;
        case 'fade':
          effect = 'fade';
          break;
        case 'slideBottom':
          effect = 'slidebottom';
          break;
        case 'slideTop':
          effect = 'slidetop';
          break;
        case 'slideLeft':
          effect = 'slideleft';
          break;
        case 'slideRight':
          effect = 'slideright';
          break;
        case 'slideBottom3d':
          effect = 'slidebottom3d';
          break;
        case 'slideTop3d':
          effect = 'slidetop3d';
          break;
        case 'slideLeft3d':
          effect = 'slideleft3d';
          break;
        case 'slideRight3d':
          effect = 'slideright3d';
          break;
        default:
          effect = 'zoom';
      }

      container.addClass(effect);
    });
   
    $(window).load(function(){
      body.removeClass('teopisto-preload');
      return container.each(function(){
        var container = $(this);

        container.waypoint(function(direction) {
          if (direction=='down') {
            if (!container.hasClass('faded')) {

              var itemNumber = item.length;

              if (settings.random) {
                var o = item
                  i = o.length, 
                  j = 0, 
                  temp = null;

                while ( --i )
                {
                  j = Math.floor( Math.random() * (i - 1) );
                  temp = o[i];
                  o[i] = o[j];
                  o[j] = temp;
                }
              }

              for (var i = 0; i < itemNumber; i++) {

                (function(n) {
                  var interval = time*i,
                    object = $(item[i]);

                  setTimeout(function(){
                    object.addClass('appear');
                    // console.log(i);
                  }, interval);
                })(i);
              };

              container.addClass('faded');

            };
          };
        }, { offset: distance });
      });
    });
   
  };
}( jQuery ));
