class Room < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :messages

  # Before action
  before_create :generate_key
  ##

  def generate_key
    self.key = Digest::SHA1.hexdigest([Time.now, rand].join)
  end
end
