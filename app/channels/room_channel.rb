##
# RoomChannel is responsible for Sync data when Room and Message change
##
class RoomChannel < ApplicationCable::Channel
  def subscribed
    return unless current_user.present?

    current_user.rooms.each do |room|
      stream_for room, coder: ActiveSupport::JSON do |message|
        transmit data_processing(message, room.id)
      end
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def data_processing(message, room_id)
    if message.present?
      case message['type']
      when 'message'
        message['sent_by'] = 'me' if message['user_id'] == current_user.id
      when 'room'
        message['last_message'] = message['default_message'] || ''
      end
    end

    message['room_id'] = room_id

    message
  end
end
