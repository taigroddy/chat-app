##
# UserChannel is responsible for Sync data when the relative data of current user is changed
##
class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user if current_user.present?
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def stream_for_user(user)
    stream_for user
  end

  def stop_stream_for_user(user)
    stop_stream_for User.find_by(id: user['id'])
  end
end
