class AddCuisineToRestaurant < ActiveRecord::Migration[5.1]
  def change
    add_reference :restaurants, :cuisine, index: true
  end
end
