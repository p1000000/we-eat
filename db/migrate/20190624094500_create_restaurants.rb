class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :cuisine
      t.boolean :is10bis
      t.string :address
      t.integer :max_delivery_time
      t.decimal :longitude
      t.decimal :latitude

      t.timestamps
    end
  end
end
