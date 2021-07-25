import { generateHTMLFromTemplate, getTemplate } from './template'
import { format, formatDistance } from 'date-fns'

require('jquery')

export const roomUrl = {
  template: '/templates/room',
  create: '/rooms'
}

export async function getRoomTemplate() {
  return await getTemplate(roomUrl.template)
}

export function addRoomUI(selector, template, data) {
  data['last_message'] ||= data['default_message']
  data['sent_at'] ||= ''
  
  $(selector).prepend(
    generateHTMLFromTemplate(template, data)
  )

  let element = $(selector).find(`.chat_list[data-room-id="${data.id}"]`)
  element.data('last-sent-at', data['created_at'])

  updateLastSentAtOfRoom(element)
}

export function updateRoomUI(selector, template, data) {
  const element = $(selector).find(`.chat_list[data-room-id="${data.room_id}"]`)

  data['last_message'] = data['content']
  data['id'] = data['room_id']
  data['title'] = element.data('title')

  element.data('last-sent-at', data['created_at'])

  element.html(
    $(generateHTMLFromTemplate(template, data)).html()
  )
  
  updateLastSentAtOfRoom(element)

  $(selector).sortChildren('last-sent-at', 'asc')
}

export function notifyRoom(selector, data) {
  const element = $(selector).find(`.chat_list[data-room-id="${data.id}"]`)
  element.addClass('animate__animated animate__flash')

  setTimeout(function() {
    element.removeClass('animate__animated animate__flash')
  },  1000)
}

export function isInChatRoom(room_id) {
  return $('#room_id').val() == room_id
}

export function refreshLastSentAtOfRoom() {
  $('.inbox_chat .chat_list').each(function(ind, element) {
    updateLastSentAtOfRoom(element)
  })
}

export function updateLastSentAtOfRoom(selector) {
  const element = $(selector)

  let sent_at = element.data('last-sent-at')
  
  $(element).find('.chat_date').html(formatDistance(new Date(sent_at), new Date, { addSuffix: true }))
}