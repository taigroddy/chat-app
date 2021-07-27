import { generateHTMLFromTemplate, getTemplate } from './template'

export async function getJoinRoomTemplate() {
  return getTemplate('/templates/user?type=join')
}

export function addJoinRoomUI(selector, template, data, room_id) {
  if ($('#room_id').val() == room_id) {
    $(selector).append(
      generateHTMLFromTemplate(template, data)
    )
  }
}