##
# UsersController
##
class UsersController < ApplicationController
  def index
    users = User.all

    case params[:exclude]
    when 'me'
      users = users.where.not(id: current_user.id)
    end

    render json: users
  end

  def logout
    UserChannel.broadcast_to(current_user, { type: 'logout', user: current_user })

    sign_out(User)

    redirect_to root_path
  end
end
