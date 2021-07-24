##
# RoomsHelper
##
module RoomsHelper
  def notify_room_of_user(room, options = {})
    users = room.users.new_entries || room.users

    users.each do |user|
      UserChannel.broadcast_to(user, room.as_json(options))
    end

    RoomChannel.broadcast_to(room, { type: 'users', users: users }) if users.present?
  end
end
