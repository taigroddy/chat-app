import { addUsersBeforeModalOpen } from './custom-modal';
import { loadRoomMessages, removeOverlay, sendMessage } from './message';
import { closeSidebarMenu } from './mobile';
import { refreshLastSentAtOfRoom } from './room';

const MOBILE_SCREEN = 768;

// Modal
addUsersBeforeModalOpen('#newRoom', { exclude: 'me' })
addUsersBeforeModalOpen('#addUsers', { exclude: 'me' })
// END

// Form
$(document).on('submit', '#send-mesage-box', function($e) {
  $e.preventDefault();
  
  let input = $(this).find('input[type="text"]').val()
  
  if(input != undefined && input != '') {
    sendMessage($(this).serialize(), () => {})

    this.reset()
  }
})

$(document).on('submit', '#new-room-form', function($e) {
  $e.preventDefault();

  this.submit();

  this.reset();

  $('#close-new-room-form').click();
})

$(document).on('submit', '#add-user-form', function($e) {
  $e.preventDefault();

  $(this).append(`<input type="hidden" name="room_id" value="${$('#room_id').val()}" />`)

  this.submit();

  $('#close-add-users-form').click();

  this.reset();

  removeOverlay()
})
// END

$(document).on('click', '.chat_list', function() {
  let room_id = $(this).data('room-id'),
      title   = $(this).data('title')

  $('#send-mesage-box #room_id').val(room_id)
  $('#room-tilte').html(title)

  loadRoomMessages(room_id);
 
  $('.chat_list').removeClass('active')
  $(this).addClass('active')
  
  removeOverlay()

  if ($(window).width() < MOBILE_SCREEN) {
    closeSidebarMenu()
  }
});

// Refresh last sent at of rooms
$(document).ready(function(){ 
  refreshLastSentAtOfRoom()
})

$(window).on('focus', function () {
  refreshLastSentAtOfRoom()
});

setInterval(() => { refreshLastSentAtOfRoom }, 60000)
// END

// Overlay create a new room
$(document).on('click', '#open-new-room-modal', function() {
  if ($(window).width() < MOBILE_SCREEN) {
    $('.sidebar-mobile #open-menu').click();
    $('a[data-target="#newRoom"]').click();
  } else {
    $('.sidebar-mobile #open-menu').click();
    $('a[data-target="#newRoom"]').click();
  }
})