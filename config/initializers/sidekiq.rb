# frozen_string_literal: true

Sidekiq.configure_server do |config|
  config.redis = {
    url: ENV['REDISTOGO_URL'] ||= "redis://#{ENV['REDIS_HOST'] ||= 'redis'}:6379/0"
  }
end

Sidekiq.configure_client do |config|
  config.redis = {
    url: ENV['REDISTOGO_URL'] ||= "redis://#{ENV['REDIS_HOST'] ||= 'redis'}:6379/0"
  }
end
