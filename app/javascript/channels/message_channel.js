require('jquery')
require('../packs/room')
import consumer from "./consumer"
import { getMessageTemplate, addMessage, messageBoxScrollTop } from '../packs/message';

var template  = ''

consumer.subscriptions.create("MessageChannel", {
  async connected() {
    console.log('MessageChannel is connected')

    template = await getMessageTemplate();
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    $('.show-messages').append(addMessage(template, data))

    messageBoxScrollTop()
  }
});
