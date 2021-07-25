##
# HomeController
##
class HomeController < ApplicationController
  def index
    current_user_id = current_user.id

    @rooms = Rooms::LastMessageQuery.call(current_user_id)

    @messages = Message.where(room_id: @rooms.first.id).select_user_email

    @users = User.all.where.not(id: current_user_id)
  end
end
