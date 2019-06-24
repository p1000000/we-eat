class CreateCuisines < ActiveRecord::Migration[5.1]
  def change
    create_table :cuisines do |t|
      t.string :name
      t.string :icon_uri
      t.references :restaurant, foreign_key: true

      t.timestamps
    end
  end
end
