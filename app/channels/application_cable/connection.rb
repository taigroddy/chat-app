module ApplicationCable
  class Connection < ActionCable::Connection::Base
    include Devise::Controllers::Helpers

    def connect
      self.identifiers += Set.new([:current_user])
    end
  end
end
