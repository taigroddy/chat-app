import { generateHTMLFromTemplate, getTemplate } from './template'

require('jquery')

export async function getFriendTemplate() {
  return await getTemplate('/templates/message')
}

export async function getMeTemplate() {
  return await getTemplate('/templates/message?for=me')
}

export function addMessageUI(selector, template, data) {
  $(selector).append(
    generateHTMLFromTemplate(template, data)
  )
}

export function messageBoxScrollTop() {
  $(".show-messages").scrollTop($(".show-messages")[0].scrollHeight);
}

export function loadRoomMessages(room_id) {
  $.post(
    '/rooms/load_messages',
    {
      room_id: room_id
    },
    function(data) {
      $('.show-messages').html(data);
      messageBoxScrollTop()
    }
  )
}