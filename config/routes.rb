Rails.application.routes.draw do
  root 'home#index'

  resources :rooms do
    member do
      post :add_message, action: :add_message
      post :add_users, action: :add_users
    end

    collection do
      post :add_message, action: :add_message
      post :load_messages, action: :load_messages
    end
  end

  resources :messages, only: [] do
    collection do
      get :template, action: :template
    end
  end

  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
