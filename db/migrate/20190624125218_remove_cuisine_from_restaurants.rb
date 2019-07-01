class RemoveCuisineFromRestaurants < ActiveRecord::Migration[5.1]
  def change
    remove_column :restaurants, :cuisine, :string
  end
end
