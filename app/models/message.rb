##
# Message model
##
class Message < ApplicationRecord
  belongs_to :user
  belongs_to :room

  # Before callback
  before_create :encrypt_content
  ##

  def self.select_user_email
    joins(:user).select('messages.*', 'users.email as sent_by').order('messages.created_at': :asc)
  end

  def content=(data)
    @content_humanize = data
  end

  def content
    id ? MessageEncryption.call(room.key).decode(content_encrypted) : nil
  end

  private

  def encrypt_content
    self.content_encrypted = MessageEncryption.call(room.key).encode(@content_humanize)
  end
end
