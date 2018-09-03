# frozen_string_literal: true

class CreateApiToken < ActiveRecord::Migration[5.1]
  def change
    create_table :api_keys do |t|
      t.string :access_token, null: false
      t.string :token_owner
      t.string :status, default: 'active'
      t.boolean :is_general, default: false
      t.timestamps

      t.index :access_token, unique: true
      t.index [:access_token, :status]
    end
  end
end
