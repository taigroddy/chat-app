class HomeController < ApplicationController
  def index
    @rooms = current_user.rooms.left_joins(:messages).group('rooms.id').select('rooms.*', 'messages.content as last_message')

    @messages = Message.where(room_id: @rooms.first.id).joins(:user).select('messages.*', 'users.email as user_email')

    @users = User.all.where.not(id: current_user.id)
  end
end
