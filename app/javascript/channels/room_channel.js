import consumer from "./consumer"
import { getMeTemplate, getFriendTemplate, addMessageUI, messageBoxScrollTop } from '../packs/message'
import { getRoomTemplate } from "../packs/room";
import { addJoinRoomUI, getJoinRoomTemplate } from "../packs/user";


consumer.subscriptions.create("RoomChannel", {
  async connected() {
    console.log('RoomChannel is connected')

    window.messageByMeTemplate     = await getMeTemplate(),
    window.messageByFriendTemplate = await getFriendTemplate(),
    window.joinRoomTemplate        = await getJoinRoomTemplate()
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log(data);

    switch(data.type) {
      case 'users':
        joinUsersToRoom(data.users, data.room_id)

        messageBoxScrollTop()
        break
      case 'message':
        let template = data.sent_by == 'me' ? messageByMeTemplate : messageByFriendTemplate;

        addMessageUI('.message-box', template, data)

        messageBoxScrollTop()
        break;
    }
  }
});


function joinUsersToRoom(users, room_id) {
  $.each(users, function(index, user) {
    addJoinRoomUI('.message-box', joinRoomTemplate, user, room_id)
  })
}