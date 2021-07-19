import consumer from "./consumer";

consumer.subscriptions.create("RoomChannel", {
  async connected() {
    console.log('RoomChannel is connected')
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
  }
});