Rails.application.routes.draw do
  root 'home#index'

  resources :rooms, only: [:create, :update, :destroy] do
    collection do
      post :add_message, action: :add_message
      post :add_users, action: :add_users_to_room
      post :load_messages, action: :load_messages
    end
  end

  resources :templates, only: [] do
    collection do
      get :message, action: :message
      get :user, action: :user
      get :room, action: :room
    end
  end

  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
