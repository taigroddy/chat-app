$(document).on('click', '.sidebar-mobile #open-menu', function() {
  openSidebarMenu()
})

$(document).on('click', '.sidebar-mobile #close-menu', function() {
  closeSidebarMenu()
})

export function openSidebarMenu() {
  const rooms = $('.inbox_people')
  rooms.removeClass('d-none d-md-block');
  rooms.addClass('animate__animated animate__fadeInLeft');

  setTimeout(() => {
    rooms.removeClass('animate__animated animate__fadeInLeft');
  }, 500)
}

export function closeSidebarMenu() {
  const rooms = $('.inbox_people')
  rooms.addClass('animate__animated animate__fadeOutLeft');

  setTimeout(() => {
    rooms.addClass('d-none d-md-block');
    rooms.removeClass('animate__animated animate__fadeOutLeft');
  }, 500)
}