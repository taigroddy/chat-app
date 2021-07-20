require('jquery')
require('../packs/room')
import consumer from "./consumer"
import { getMessageTemplate, addMessage, messageBoxScrollTop } from '../packs/message';

var messageTemplate  = ''

consumer.subscriptions.create("MessageChannel", {
  async connected() {
    console.log('MessageChannel is connected')

    messageTemplate = await getMessageTemplate();
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if (data.room_id == $('#room_id').val()) {
      $('.show-messages').append(addMessage(messageTemplate, data))
    }

    messageBoxScrollTop()
  }
});
