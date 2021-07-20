import consumer from "./consumer";
import { getTemplate, generateRoomHTML } from '../packs/room';

var roomTemplate = '';

consumer.subscriptions.create("RoomChannel", {
  async connected() {
    console.log('RoomChannel is connected')

    roomTemplate = await getTemplate()
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if (data.action == 'create') {
      $('.rooms').append(generateRoomHTML(roomTemplate, data))
    }
  }
});