# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  resources :restaurants, only: :index
  resources :cuisines, only: :index
  resources :reviews, only: :create

  root 'pages#index'

  Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
    [user, password] == [ENV['SIDEKIQ_USERNAME'], ENV['SIDEKIQ_PASSWORD']]
  end
  mount Sidekiq::Web => '/sidekiq'
  
  namespace :deliveries_manager do
    resources :deliveries, only: [:index, :show, :create]
  end
end
