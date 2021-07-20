##
# RoomsController
##
class RoomsController < ApplicationController
  before_action :set_room, only: [:show, :edit, :update, :destroy, :add_message, :add_users, :load_messages]

  # POST /rooms or /rooms.json
  def create
    room = Room.new(room_params)

    room.users << current_user

    room.save

    room.users.each do |user|
      UserChannel.broadcast_to(user, room.as_json(methods: :default_message))
    end

    RoomChannel.broadcast_to(room, { type: 'users', users: users })

    room.errors.clear
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

    RoomChannel.broadcast_to(@room, message.as_json.merge(email: message.user.email))
  end

  def add_users
    users = User.where(id: params.dig(:room, :user_ids))

    @room.users << users

    @room.save

    RoomChannel.broadcast_to(@room, { type: 'users', users: users })

    users.each do |user|
      UserChannel.broadcast_to(user, @room)
    end

    @room.errors.clear
  end

  def load_messages
    @messages = @room.messages.joins(:user).select_user_email

    render template: 'messages/message_box', layout: false
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_room
    @room = current_user.rooms.find(params[:id] || params[:room_id])
  end

  def room_params
    params.require(:room).permit(:title, user_ids: [])
  end

  def message_params
    params.permit(:content).merge({ user: current_user, room: @room })
  end
end
