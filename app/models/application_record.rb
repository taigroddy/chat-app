class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def type
    self.class.to_s.downcase
  end

  def as_json(options = {})
    options.merge!({ methods: :type }) { |_key, old_value, new_value| Array(old_value) + Array(new_value) }

    super(options)
  end
end
