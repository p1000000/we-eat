# == Schema Information
#
# Table name: restaurants
#
#  id                :integer          not null, primary key
#  name              :string
#  is10bis           :boolean
#  address           :string
#  max_delivery_time :integer
#  longitude         :decimal(, )
#  latitude          :decimal(, )
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  cuisine_id        :integer
#

require 'rails_helper'

RSpec.describe Restaurant, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
