class HomeController < ApplicationController
  def index
    @rooms = current_user.rooms.left_joins(:messages).group('rooms.id').select('rooms.*', 'messages.content as last_message')

    @messages = Message.where(room_id: @rooms.first.id)
  end
end
