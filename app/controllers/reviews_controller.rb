class ReviewsController < ApplicationController
  def create
    review = Review.create!(review_params)
    render json: review
  rescue ActiveRecord::RecordInvalid => e
    render json: {
      error: e.to_s
    }, status: :not_found
  end

  private

  def review_params
    params.require(:review).permit(:restaurant_id, :name, :rating, :comment)
  end
end
