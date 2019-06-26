class RemoveIndexCuisineIdIdFromRestaurants < ActiveRecord::Migration[5.1]
  def change
    remove_index :restaurants, name: 'index_restaurants_on_cuisine_id'
  end
end
