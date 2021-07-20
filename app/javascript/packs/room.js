import { generateHTMLFromTemplate, getTemplate } from './template'

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

  $(selector).append(
    generateHTMLFromTemplate(template, data)
  )
}