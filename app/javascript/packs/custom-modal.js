require('select2')

export function addUsersBeforeModalOpen(selector, options = {}) {
  $(document).on('show.bs.modal', selector, function () {
    let select = $(selector).find('select')
    select.select2().empty().trigger('change')

    $.get(requestUrl(options), function(res) {
      let data = $.map(res, function(item) {
        return new Option(item.email, item.id, false, false);
      })

      select.html(data).trigger('change')

      $(selector).find('input[type="submit"]').removeAttr('disabled')
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