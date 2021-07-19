import { loadRoomMessages } from './message';

$(document).on('submit', '#send-mesage-box', function($e) {
  $e.preventDefault();
  this.submit();
  this.reset();
})

$(document).on('keypress', '#send-mesage-box textarea', function() {
  if ($(this).val().length > 0) {
    $('#send-mesage-box input[type="submit"]').prop('disabled', null);
  }
})

$(document).ready(function() {
  $(".show-messages").scrollTop($(".show-messages")[0].scrollHeight);
})

$(document).on('click', '.room', function() {
  var room_id = $(this).find('input[type="hidden"]').val()
  
  $('#send-mesage-box #room_id').val(room_id)

  loadRoomMessages(room_id);
 
  $('.room').removeClass('active')
  $(this).addClass('active')
});
