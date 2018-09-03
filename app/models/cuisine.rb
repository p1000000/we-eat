# == Schema Information
#
# Table name: cuisines
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  icon       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Cuisine < ApplicationRecord
  has_many :restaurants

  validates_presence_of :name, :icon
end
