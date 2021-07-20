require('jquery')

export const roomUrl = {
  template: '/rooms/template',
  create: '/rooms'
}

export function getTemplate() {
  return $.get(roomUrl.template, function(data) {
    return data
  }).fail(function() {
    // default template
    return `
      <p>{{name}}</p>
      <p class="alert alert-primary">{{content}}</p>
    `
  })
}

export function generateRoomHTML(template, data) {
  var attrs =  template.match(/{{[\w]*}}/g)

  jQuery.each(attrs, function(index, item) {
    var key = item.replaceAll('{', '').replaceAll('}', '')

    template = template.replaceAll(item, data[key])
  })

  return template;
}