import { generateHTMLFromTemplate, getTemplate } from './template'

export function messageBox() {
  return $(".message-box")
}

export function removeOverlay() {
  $('.mesgs .overlay').addClass('d-none')
}

export async function getFriendTemplate() {
  return await getTemplate('/templates/message')
}

export async function getMeTemplate() {
  return await getTemplate('/templates/message?for=me')
}

export async function sendMessage(data, callback) {
  $.post('rooms/add_message', data).done((res) => callback(res) )
}

export function addMessageUI(selector, template, data) {
  $(selector).append(
    generateHTMLFromTemplate(template, data)
  )
}

export function messageBoxScrollTop() {
  if (messageBox() != undefined) {
    messageBox().scrollTop(messageBox()[0].scrollHeight)
  }
}

export function loadRoomMessages(room_id) {
  messageBox().html('')

  $.post(
    '/rooms/load_messages',
    {
      room_id: room_id
    },
    function(data) {
      $.each(data, function(ind, item) {
        let template = item.sent_by.toLowerCase() == 'me' ? messageByMeTemplate : messageByFriendTemplate
        
        addMessageUI(messageBox(), template, item)
      })

      messageBoxScrollTop()
    }
  )
}

export function isSentByMe(data) {
  return data.sent_by == 'me'
}