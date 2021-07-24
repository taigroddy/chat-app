##
# Message model
##
class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room

  def self.select_user_email
    joins(:user).select('messages.*', 'users.email as sent_by').order('messages.created_at': :asc)
  end
end
