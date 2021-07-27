import consumer from "./consumer"
import { addMessageUI, messageBoxScrollTop, isSentByMe } from '../packs/message'
import { isInChatRoom, notifyRoom, updateRoomUI } from "../packs/room";
import { addJoinRoomUI } from "../packs/user";


consumer.subscriptions.create("RoomChannel", {
  async connected() {
    console.log('RoomChannel is connected')
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    switch(data.type) {
      case 'users':
        joinUsersToRoom(data.users, data.room_id)

        messageBoxScrollTop()
        break
      case 'message':
        let template = isSentByMe(data) ? messageByMeTemplate : messageByFriendTemplate

        if(isInChatRoom(data.room_id)) addMessageUI('.message-box', template, data)

        updateRoomUI('.inbox_chat', roomTemplate, data)

        if(!isSentByMe(data) && !isInChatRoom(data.room_id)) notifyRoom('.inbox_chat', data) 

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
