class RoomsController < ApplicationController
  before_action :set_room, only: %i[ show edit update destroy add_message add_users load_messages]

  # GET /rooms or /rooms.json
  def index
    @rooms = current_user.rooms
  end

  # GET /rooms/1 or /rooms/1.json
  def show
    @messages = @room.messages
  end

  # GET /rooms/new
  def new
    @room = Room.new
  end

  # GET /rooms/1/edit
  def edit
  end

  # POST /rooms or /rooms.json
  def create
    @room = Room.new(room_params)

    respond_to do |format|
      if @room.save
        format.html { redirect_to @room, notice: "Room was successfully created." }
        format.json { render :show, status: :created, location: @room }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @room.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /rooms/1 or /rooms/1.json
  def update
    respond_to do |format|
      if @room.update(room_params)
        format.html { redirect_to @room, notice: "Room was successfully updated." }
        format.json { render :show, status: :ok, location: @room }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @room.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /rooms/1 or /rooms/1.json
  def destroy
    @room.destroy
    respond_to do |format|
      format.html { redirect_to rooms_url, notice: "Room was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def add_message
    message = Message.create(message_params)

    if message
      ActionCable.server.broadcast 'message_channel', { content: message.content, name: current_user.email } 
    end 
  end

  def add_users
    users = User.where(id: params[:user_ids])

    @room.users << users
    
    @room.save!
  end

  def load_messages
    @messages = @room.messages

    render template: 'messages/message_box', layout: false
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_room
      @room = current_user.rooms.find(params[:id] || params[:room_id])
    end

    # Only allow a list of trusted parameters through.
    def room_params
      params.require(:room).permit(:title).merge(users: [current_user])
    end

    def message_params
      params.permit(:content).merge({ user: current_user, room: @room })
    end
end
