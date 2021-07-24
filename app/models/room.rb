##
# Room model
##
class Room < ApplicationRecord
  has_many :messages
  has_and_belongs_to_many :users do
    attr_accessor :new_entries

    def << (value)
      self.new_entries = Array(value) - self

      self.replace(self | Array(value))
    end
  end

  # Before action
  before_create :generate_key
  ##

  def generate_key
    self.key = Digest::SHA1.hexdigest([Time.now, rand].join)
  end

  def default_message
    ''
  end
end
