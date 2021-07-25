import { addRoomUI, getRoomTemplate } from "../packs/room";
import consumer from "./consumer"

consumer.subscriptions.create("UserChannel", {
  async connected() {
    console.log('UserChannel is connected');

    window.roomTemplate = await getRoomTemplate()
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    switch(data.type) {
      case 'room':
        data['sent_at'] = ''

        addRoomUI('.inbox_chat', roomTemplate, data)
        break;
    }
  }
});


