class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.references :cuisine, foreign_key: true
      t.boolean :accepts_10bis, default: false
      t.string :address
      t.json :coordinates
      t.integer :max_delivery_time

      t.timestamps
    end
  end
end
