##
# HomeController
##
class HomeController < ApplicationController
  def index
    @rooms = current_user.rooms.left_joins(:messages).group('rooms.id').select('rooms.*', 'messages.content as last_message')

    @messages = @rooms.present? ? Message.where(room_id: @rooms.first.id).select_user_email : []

    @users = User.all.where.not(id: current_user.id)
  end
end
