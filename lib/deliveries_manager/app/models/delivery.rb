# frozen_string_literal: true

class Delivery
  attr_reader :statuses, :id

  @deliveries_store = Redis.new(url: ENV['REDIS_URL'])
  @deliveries_store.setnx('__delivery_all', JSON.dump([]))

  def self.all
    JSON.load(get('all')).map do |uuid|
      find(uuid: uuid)
    end
  end

  def self.delete
    set('all', JSON.dump([]))
  end

  def self.find(uuid:)
    statuses = JSON.load(get(uuid))
    statuses.select { |s| s['time'] < DateTime.current }.last
  end

  def self.delivery_statuses(uuid:)
    JSON.load(get(uuid))
  end

  def self.create(name: nil)
    delivery = Delivery.new(name: name)
    set(delivery.id, JSON.dump(delivery.statuses.deep_dup))

    all = JSON.load(get('all')).insert(0, delivery.id)
    set('all', JSON.dump(all))

    delivery
  end

  def self.get(key)
    @deliveries_store.get(generate_key(key))
  end

  def self.set(key, value)
    @deliveries_store.set(generate_key(key), value)
  end

  def self.generate_key(key)
    "__delivery_#{key}"
  end

  private_class_method :generate_key, :get, :set

  def initialize(name: nil)
    @name = name || Faker::Name.name
    @courier = Faker::Name.name
    @cook = Faker::Name.name
    @time = DateTime.current
    @id = SecureRandom.uuid
    @statuses = generate_statuses
  end

  private

  def generate_statuses
    [
      order_received,
      order_prepared,
      order_packaged,
      package_waiting_for_pick_up,
      package_in_route,
      package_delivered,
    ]
  end

  def order_received
    base_message.merge(status: 'Received')
  end

  def order_prepared
    base_message.merge(status: 'Prepared',
                       cook: @cook)
  end

  def order_packaged
    base_message.merge(status: 'Packaged')
  end

  def package_waiting_for_pick_up
    base_message.merge(status: 'Waiting for pickup',
                       courier: @courier)
  end

  def package_in_route
    base_message.merge(status: 'In route',
                       courier: @courier,
                       estimated_time_of_arrival: "#{(SecureRandom.rand * 30).round(0)} minutes")
  end

  def package_delivered
    base_message.merge(status: 'Delivered',
                       courier: @courier,
                       signed_by: SecureRandom.rand > 0.3 ? @name : Faker::Name.name)
  end

  def base_message
    message = {
      order_id: @id,
      customer_name: @name,
      time: @time,
      publish_time: @time,
    }

    @time += (SecureRandom.rand * (ENV['TIME_FACTOR'] || 5).to_i).round(0).second

    message
  end
end
