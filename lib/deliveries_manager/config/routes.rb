# frozen_string_literal: true

DeliveriesManager::Engine.routes.draw do
  mount DeliveriesManager::Engine => '/deliveries_manager'
end
