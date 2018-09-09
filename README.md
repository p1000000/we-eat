# Part 1: Making sure everything works

## Getting Started

To get started:

1. Clone this repo (be sure to change the remote origin!): `git clone git@github.com:WeConnect/mission-4-we-eat-template.git`
1. Run `script/setup` to install your needed gems, create the database(s) and other needs

## Scripts to Rule Them All

Based on the github (the company) concept, most interaction with the project is handled through simple bash scripts.

For background view the [repo](https://github.com/github/scripts-to-rule-them-all) and the [blog post](https://githubengineering.com/scripts-to-rule-them-all/)

### Running
Run the app on docker:
```
script/server
```

### Testing
Run test on docker:
```
script/test
```

### Arbitrary command

We added an additional command, `script/exec` to allow you to interact with the code with the full "rails-y" context. This command is how you can run your usual migrations and gem upgrades.

To use run `script/exec bundle install` for example.

## Deployment

The configuration for Docker is handled using [docker-compose](https://docs.docker.com/compose/overview/). Update the file(s) to suite your particular team's needs.

[Quay](https://quay.io/repository/wework/) is where you can see our tags, builds, and hooks.

CircleCi configuration deploys the containers to staging on every merge to staging, and to production on every merge to master.

## Environment Variables

Environment variables are set in Heroku

# Part 2: Basic app
Follow the instructions on [the wiki](https://connect.we.co/display/TPB/WeEat%3A+Learn+our+stack), to create your basic application. You should already have
a frontend ready, but the backend is missing. Take your time to generate the models that you
need to support our frontend: Restaurants, Reviews, etc.

# Part 3: Messaging details
This exercise contains a section that deals with async messaging. Here are some tips on how to get started.

## Bunny How To
Bunny is the gem that communicates with Rabbitmq. Here's a quick how to, to create your first publisher and listener

Sending event:
```
conn = Bunny.new
conn.start
ch = conn.create_channel
queue = ch.queue(<TOPIC>, auto_delete: true)
exchange = ch.default_exchange
exchange.publish(message, routing_key: queue.name)
```

Reading event:
```
conn = Bunny.new
conn.start
channel = conn.create_channel
queue = channel.queue(<TOPIC>, auto_delete: true)

queue.subscribe(block: true) do |_, _, payload|
  # DO STUFF
end
```

## Sending command
Publish a message to the `delivery.create` topic with the following payload: `{ name: <NAME> }`.

## Payloads
The delivery service publishes these messages, in this order (if all goes well, that is), to the `delivery.status_updated` topic:

```
# Received
{
  order_id: 'cc7a521c-4f6b-462d-bbc1-6250c025556e',
  customer_name: 'Miss Hayley Becker',
  time: Tue, 01 May 2018 05:53:39 +0000,
  publish_time: Tue, 01 May 2018 05:53:39 +0000,
  status: 'Received'
}

# Prepared
{
  order_id: 'cc7a521c-4f6b-462d-bbc1-6250c025556e',
  customer_name: 'Miss Hayley Becker',
  time: Tue, 01 May 2018 05:53:45 +0000,
  publish_time: Tue, 01 May 2018 05:53:45 +0000,
  status: 'Prepared',
  cook: 'Luigi Abshire DDS'
}

# Packaged
{
  order_id: 'cc7a521c-4f6b-462d-bbc1-6250c025556e',
  customer_name: 'Miss Hayley Becker',
  time: Tue, 01 May 2018 05:54:35 +0000,
  publish_time: Tue, 01 May 2018 05:54:35 +0000,
  status: 'Packaged'
}

# Waiting for pickup
{
  order_id: 'cc7a521c-4f6b-462d-bbc1-6250c025556e',
  customer_name: 'Miss Hayley Becker',
  time: Tue, 01 May 2018 05:55:24 +0000,
  publish_time: Tue, 01 May 2018 05:55:24 +0000,
  status: 'Waiting for pickup',
  courier: 'Layla Bergnaum'
}

# In route
{
  order_id: 'cc7a521c-4f6b-462d-bbc1-6250c025556e',
  customer_name: 'Miss Hayley Becker',
  time: Tue, 01 May 2018 05:56:08 +0000,
  publish_time: Tue, 01 May 2018 05:56:08 +0000,
  status: 'In route',
  courier: 'Layla Bergnaum',
  estimated_time_of_arival: '12 minutes'
}

# Delivered
{
  order_id: 'cc7a521c-4f6b-462d-bbc1-6250c025556e',
  customer_name: 'Miss Hayley Becker',
  time: Tue, 01 May 2018 05:57:02 +0000,
  publish_time: Tue, 01 May 2018 05:57:02 +0000,
  status: 'Delivered',
  courier: 'Layla Bergnaum',
  signed_by: 'Miss Hayley Becker'
}
```
