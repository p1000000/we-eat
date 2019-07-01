class RemoveRestaurantFromCuisines < ActiveRecord::Migration[5.1]
  def change
    remove_column :cuisines, :restaurant_id, :bigint
  end
end
