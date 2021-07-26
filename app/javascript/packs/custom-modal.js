require('select2')

export function addUsersBeforeModalOpen(selector, options = {}) {
  $(document).on('show.bs.modal', selector, function () {
    $(selector).find('select').select2().empty().trigger('change')

    $.get(requestUrl(options), function(res) {
      let data = $.map(res, function(item) {
        return new Option(item.email, item.id, false, false);
      })

      $(selector).find('select').html(data).trigger('change')
    })
  })
}

function requestUrl(options) {
  let requestUrl = '/users'

  if(options.exclude) {
    requestUrl += `?exclude=${options.exclude}`
  }

  return requestUrl
}