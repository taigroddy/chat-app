import { getFriendTemplate, getMeTemplate, messageBoxScrollTop } from "./message";
import { getRoomTemplate } from "./room";
import { getJoinRoomTemplate } from "./user";

document.addEventListener("turbolinks:load", async function() {
  window.messageByMeTemplate     = await getMeTemplate(),
  window.messageByFriendTemplate = await getFriendTemplate(),
  window.joinRoomTemplate        = await getJoinRoomTemplate()
  window.roomTemplate            = await getRoomTemplate()

  messageBoxScrollTop()
})

document.addEventListener("turbolinks:request-start", function() {
})
