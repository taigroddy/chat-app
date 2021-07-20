class RoomsController < ApplicationController
  before_action :set_room, only: %i[ show edit update destroy add_message add_users load_messages]

  # POST /rooms or /rooms.json
  def create
    room = Room.new(room_params)

    room.users << current_user

    if room.save
      ActionCable.server.broadcast 'room_channel', { action: 'create', title: room.title, id: room.id, last_message: ''  } 
    end
  end

  # PATCH/PUT /rooms/1 or /rooms/1.json
  def update
    if @room.update(room_params)
      ActionCable.server.broadcast 'room_channel', { action: 'update', updated: { **@room.to_h  } } 
    end
  end

  # DELETE /rooms/1 or /rooms/1.json
  def destroy
    @room.destroy

    ActionCable.server.broadcast 'room_channel', { action: 'delete' }
  end

  def add_message
    message = Message.create(message_params)

    if message
      ActionCable.server.broadcast 'message_channel', { content: message.content, name: current_user.email, room_id: message.room_id } 
    end 
  end

  def add_users
    users = User.where(id: params[:user_ids])

    @room.users << users
    
    if @room.save!
      ActionCable.server.broadcast 'room_channel', { action: 'add_users', name: users.pluck(:name) }
    end
  end

  def load_messages
    @messages = @room.messages.joins(:user).select('messages.*', 'users.email as user_email')

    render template: 'messages/message_box', layout: false
  end

  def template
    render template: 'rooms/template', layout: false, locals: { room: {} }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_room
      @room = current_user.rooms.find(params[:id] || params[:room_id])
    end

    # Only allow a list of trusted parameters through.
    def room_params
      params.require(:room).permit(:title, user_ids: [])
    end

    def message_params
      params.permit(:content).merge({ user: current_user, room: @room })
    end
end
