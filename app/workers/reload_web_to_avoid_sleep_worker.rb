# frozen_string_literal: true

require 'sidekiq-scheduler'
require 'net/http'
##
# Class ReloadWebToAvoidSleepWorker
##
class ReloadWebToAvoidSleepWorker
  include Sidekiq::Worker
  include Rails.application.routes.url_helpers
  sidekiq_options retry: 0

  def perform
    uri = ENV.fetch('RELOAD_URL') { root_path }

    Net::HTTP.get(URI.parse(uri))
  end
end
