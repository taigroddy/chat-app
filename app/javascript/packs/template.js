export const templateDefault = `
  <p>{{name}}</p>
  <p class="alert alert-primary">{{content}}</p>
`

export function generateHTMLFromTemplate(template, data) {
  var attrs =  template.match(/{{[\w]*}}/g)

  jQuery.each(attrs, function(index, item) {
    var key = item.replaceAll('{', '').replaceAll('}', '')

    template = template.replaceAll(item, data[key])
  })

  return template;
}

export function getTemplate(url, htmlDefautl = templateDefault) {
  return $.get(url, function(template) {
    return template
  }).fail(function() {
    return htmlDefautl
  })
}