Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show, :update] do 
        resources :articles, only: [:create, :show, :index, :update, :destroy] do
          resources :comments, only: [:create, :show, :index]
        end
      end
      post '/login', to: 'users#login'
    end
  end


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
