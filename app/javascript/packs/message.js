require('jquery')

export function getMessageTemplate() {
  return $.get('/messages/template', function(data) {
    return data
  }).fail(function() {
    // default template
    return `
      <p>{{name}}</p>
      <p class="alert alert-primary">{{content}}</p>
    `
  })
}

export function addMessage(template, data) {
  var attrs =  template.match(/{{[\w]*}}/g)

  jQuery.each(attrs, function(index, item) {
    var key = item.replaceAll('{', '').replaceAll('}', '')

    template = template.replaceAll(item, data[key])
  })

  return template;
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