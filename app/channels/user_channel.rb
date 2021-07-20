##
# UserChannel is responsible for Sync data when the relative data of current user is changed
##
class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user if current_user
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
