$(document).ready(function() {
  //four tabs, not superdry
  $('#tab01').click(function() {
    $('#tabcontent01').show();
    $('#tabcontent02').hide();
    $('#tabcontent03').hide();
    $('#tabcontent04').hide();
  });
  $('#tab02').click(function() {
    $('#tabcontent01').hide();
    $('#tabcontent02').show();
    $('#tabcontent03').hide();
    $('#tabcontent04').hide();
  });
  $('#tab03').click(function() {
    $('#tabcontent01').hide();
    $('#tabcontent02').hide();
    $('#tabcontent03').show();
    $('#tabcontent04').hide();
  });
  $('#tab04').click(function() {
    $('#tabcontent01').hide();
    $('#tabcontent02').hide();
    $('#tabcontent03').hide();
    $('#tabcontent04').show();
  });
});
