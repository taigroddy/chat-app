import { loadRoomMessages } from './message';

// Form
$(document).on('submit', '#send-mesage-box', function($e) {
  $e.preventDefault();
  this.submit();
  this.reset();
})

$(document).on('submit', '#new-room-form', function($e) {
  $e.preventDefault();

  this.submit();

  $('#close-new-room-form').click();

  this.reset();
})

$(document).on('submit', '#add-user-form', function($e) {
  $e.preventDefault();

  $(this).append(`<input type="hidden" name="room_id" value="${$('#room_id').val()}" />`)

  this.submit();

  $('#close-add-users-form').click();

  this.reset();
})


$(document).on('keypress', '#send-mesage-box textarea', function() {
  if ($(this).val().length > 0) {
    $('#send-mesage-box input[type="submit"]').prop('disabled', null);
  }
})

$(document).on('click', '.room', function() {
  var room_id = $(this).find('input[type="hidden"]').val()
  
  $('#send-mesage-box #room_id').val(room_id)

  loadRoomMessages(room_id);
 
  $('.room').removeClass('active')
  $(this).addClass('active')
});
