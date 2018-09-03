class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :name
      t.integer :rating, default: 0
      t.text :comment
      t.references :restaurant, foreign_key: true

      t.timestamps
    end
  end
end
