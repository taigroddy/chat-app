import { addRoomUI, getRoomTemplate } from "../packs/room";
import consumer from "./consumer"

consumer.subscriptions.create("UserChannel", {
  async connected() {
    console.log('UserChannel is connected');
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log(data)
    switch(data.type) {
      case 'room':
        data['sent_at'] = ''

        addRoomUI('.inbox_chat', roomTemplate, data)
        break;
    }
  }
});


