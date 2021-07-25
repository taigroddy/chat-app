import { addUsersBeforeModalOpen } from './custom-modal';
import { loadRoomMessages } from './message';
import { refreshLastSentAtOfRoom } from './room';

// Form
$(document).on('submit', '#send-mesage-box', function($e) {
  $e.preventDefault();
  
  let input = $(this).find('input[type="text"]').val()
  
  if(input != undefined && input != '') {
    this.submit();
    this.reset();
  }
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

$(document).on('click', '.chat_list', function() {
  let room_id = $(this).data('room-id'),
      title   = $(this).data('title')

  $('#send-mesage-box #room_id').val(room_id)
  $('#room-tilte').html(title)

  loadRoomMessages(room_id);
 
  $('.chat_list').removeClass('active')
  $(this).addClass('active')
});

addUsersBeforeModalOpen('#newRoom', { exclude: 'me' })
addUsersBeforeModalOpen('#addUsers', { exclude: 'me' })

$(document).ready(function(){ 
  refreshLastSentAtOfRoom()
})

setInterval(() => { refreshLastSentAtOfRoom }, 60000)

$(window).on('focus', function () {
  refreshLastSentAtOfRoom()
});