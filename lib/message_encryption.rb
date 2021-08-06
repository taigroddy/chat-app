# frozen_string_literal: true

##
# MessageEncryption
##
class MessageEncryption
  def self.call(key)
    self.new(key)
  end
  
  def initialize(key)
    @key = key
  end

  def encode(data)
    verifier.generate(data)
  end

  def decode(signature)
    verifier.verify(signature)
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    nil
  end

  def verifier
    ActiveSupport::MessageVerifier.new(ENV['SHARE_SECRET_KEY'] + @key)
  end
end
