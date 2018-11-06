# frozen_string_literal: true

module DeliveriesManager
  class DeliveriesController < ApplicationController
    def index
      render json: Delivery.all
    end

    def show
      render json: Delivery.find(uuid: params[:id])
    end

    def create
      delivery = Delivery.create(name: params[:name])
      DeliveryPublisher.perform_async(delivery.id)
      render json: Delivery.find(uuid: delivery.id)
    end
  end
end
