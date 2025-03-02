/** Stolen shamelessly from https://alantrotter.com/ */

//this is the bit of code that makes the whole opening and closing text thing work.
$('a[data-o]').click(function(e) {

  //this line just stops it visiting the href which is always #
  e.preventDefault();

  var openedby = $(this).attr('data-o');
  $('[data-ob="' + openedby +'"]').removeClass('off').addClass('on');

  // var closedby = $(this).attr('data-c');
  // $('[data-cb="' + closedby +'"]').removeClass('on').addClass('off');

  $(this).contents().unwrap();

});
