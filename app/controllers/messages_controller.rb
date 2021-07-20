class MessagesController < ApplicationController
  skip_before_action :authenticate_user!

  def template
    render template: 'messages/template', layout: false, locals: { message: {} }
  end
end
