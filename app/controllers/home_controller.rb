##
# HomeController
##
class HomeController < ApplicationController
  def index
    @rooms = Rooms::LastMessageQuery.call(current_user.id)

    @messages = @rooms.present? ? Message.where(room_id: @rooms.first.id).select_user_email : []

    @users = User.all.where.not(id: current_user.id)
  end
end
