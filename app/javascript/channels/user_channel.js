import { addRoomUI } from "../packs/room";
import consumer from "./consumer"
import { roomChannel } from "./room_channel";

consumer.subscriptions.create("UserChannel", {
  async connected() {
    console.log('UserChannel is connected');
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    switch(data.type) {
      case 'room':
        data['sent_at'] = ''

        addRoomUI('.inbox_chat', roomTemplate, data)
        
        roomChannel.streaming_for_new(data)
        break;
    }
  }
});


