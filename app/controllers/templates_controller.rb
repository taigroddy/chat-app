##
# TemplatesController
##
class TemplatesController < ApplicationController
  skip_before_action :authenticate_user!

  def room
    render template: 'rooms/template', layout: false, locals: { room: {} }
  end

  def user
    render template: 'users/join_template', layout: false, locals: { user: {} }
  end

  def message
    if params[:for] == 'me'
      render template: 'messages/me_template', layout: false, locals: { message: {} }
    else
      render template: 'messages/friend_template', layout: false, locals: { message: {} }
    end
  end
end
