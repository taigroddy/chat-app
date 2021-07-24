##
# RoomsController
##
class RoomsController < ApplicationController
  before_action :set_room, only: [:show, :edit, :update, :destroy, :add_users_to_room, :add_message, :load_messages]

  # POST /rooms or /rooms.json
  def create
    add_users_to_room
  end

  # PATCH/PUT /rooms/1 or /rooms/1.json
  # def update
  #   if @room.update(room_params)
  #   end
  # end

  # DELETE /rooms/1 or /rooms/1.json
  # def destroy
  #   @room.destroy
  # end

  def add_message
    message = Message.create(message_params)

    RoomChannel.broadcast_to(@room, message.as_json.merge(sent_by: current_user.email))
  end

  def load_messages
    @messages = @room.messages.joins(:user).select_user_email.map(&map_message_info)

    render json: @messages
  end

  def add_users_to_room
    @room ||= Room.new(room_params)

    users = User.where(id: params.dig(:room, :user_ids)) + [current_user]

    @room.users << users

    @room.save

    helpers.notify_room_of_user(@room, { methods: :default_message })
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_room
    @room = current_user.rooms.find(params[:id] || params[:room_id])
  end

  def room_params
    params.require(:room).permit(:title)
  end

  def message_params
    params.permit(:content).merge({ user: current_user, room: @room })
  end

  def map_message_info
    lambda do |m|
      sent_by = m.sent_by == current_user.email ? 'Me' : m.sent_by

      { 
        sent_by: sent_by, 
        content: m.content
      }
    end
  end
end
