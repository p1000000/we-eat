# Part 1: Making sure everything works

## Getting Started

To get started:

1. Clone this repo (be sure to change the remote origin!): `git clone git@github.com:WeConnect/mission-4-we-eat-template.git`
( Troubleshooting: clone might fail because you dont have a personal access token, to get one [see instructions](https://connect.we.co/pages/viewpage.action?pageId=135605341) )

2. Run `script/setup` to install your needed gems, create the database(s) and other needs
(You will need [Docker](https://store.docker.com/editions/community/docker-ce-desktop-mac) installed (recommended to enlarge the memory limit to 4 GB, Docker -> preferences -> advanced -> memory)
and [Quay](https://github.com/WeConnect/spaceman/wiki/Signup-with-Quay.io) access for this step)

## Scripts to Rule Them All

Based on the github (the company) concept, most interaction with the project is handled through simple bash scripts.

For background view the [repo](https://github.com/github/scripts-to-rule-them-all) and the [blog post](https://githubengineering.com/scripts-to-rule-them-all/)

Consult your buddy which parts of the pet project are more relevant for your teams work.
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

#### Using exec for code analysis
Another example use: You can run the following command to manually perform code analysis of your project:
`script/exec "annotate && rubocop && brakeman"`

(annotate will comment your classes with useful information, rubocop is a linter for ruby and will report any style errors, brakeman analyses security issues in your code)

This command also runs automatically on `git push` via a script found under `/hooks/pre-push`

# Part 2: Learn Our Stack

## The Site
It's 12 o'clock again and your stomach is grumbling. How will you choose where to eat?

Luckily, this site will help you narrow down your choices with ease, and save priceless and countless engineer-hours!

This site allows you to view and filter restaurant by decision-critical parameters such as time-to-delivery, 10bis availability and cuisine and track your order.

## Training Objectives
* Get hands-on experience using our stack.
* Receive feedback on your code, best-practices and common pitfall avoidance.
* Setup a restful API
* Work with rabbitMQ and sidekiq
* Develop in a dockerized environment.

### External Resources
* [Ruby on Rails](https://connect.we.co/display/DIGI/Technical+Resources#TechnicalResources-ROR) - first 10 chapters of the 'Pragmatic Programmer' book.
* [RSpec](https://blog.teamtreehouse.com/an-introduction-to-rspec) - Read the linked 3-part Blog post which explains the main concepts for RSpec and Behavior-Driven Testing.
* [Sidekiq](https://github.com/mperham/sidekiq/wiki) - Background task processing
* [Docker](https://docs.docker.com/) - Our services run in docker, including their infrastructure. Get familiar with docker and docker compose
* [Postman](https://app.getpostman.com/app/download/osx64) - this app allowing us to send HTTP requests directly to the server.
* [Technical Resources](https://connect.we.co/display/DIGI/Technical+Resources) - more resources

## Source Control And Reviews Guidelines
* You should store your project on your GitHub account.
* For each part of the project, open a new branch from the tip of the previous part's branch (or master if it's the first part)
	* Example: if we have 2 parts, P1 and P2, we'll create P1 from master, and later P2 from the tip of P1 (This is just an example, try to give your branch a meaningful name i.e. backend-part)
	* This will allow the part to be reviewed while you move to the next part.
	* Whenever you finish a part, create a pull request from it.
	* When the pull request is approved, merge the branch into your master.

## Setup The Project
The project will consist of the following components: 

1. Existing react client. (Found under `/client`)
1. Existing delivery management rails engine, which can be communicated with via rabbitmq (Found under `/lib/delivery_manager`)
1. Main project - the main logic component that you would work on
	1. Restful API that exposes the main entities (Restaurants, Reviews etc.).
	1. RabbitMq subscriber that receives the events on the orders
	1. Order events processor using sidekiq

## Main Project
### Part 1: Models And Controllers
*Topics: Ruby, Rails, ActiveRecord*

For each entity, implement the following:

* DB Migration to include the new model(s) - plan and execute.
* Support basic rest operations (create, read [index/show], update, delete) and determine what they should do.
* Routing - determine resources' routes, change default implementation if needed.

Tips:

* Use [this gem](https://github.com/ctran/annotate_models) to auto-document your models
* To enable debugging inside RubyMine using docker-compose follow instructions [here](https://blog.jetbrains.com/ruby/2017/05/rubymine-2017-2-eap-1-docker-compose/)

#### 1. Restaurants
A restaurant consists of:

* Its name
* Its cuisine (genre)
* Whether it accepts 10bis
* Its address
* Its maximum delivery time
* Its longitude
* Its latitude

#### 2. Restaurant Reviews
Add the ability to submit a review.
A review consists of:

* Reviewer's name
* The review rating
* A comment

The restaurant's rating becomes an average of all existing ratings.

Add the ability to edit and remove reviews.

Tips:

* Have the review resource as part of the restaurant (what is a review without the restaurant its written about?)

#### Backend Tests
*Topics: RSpec*

Read at [Technical Resources](https://connect.we.co/display/DIGI/Technical+Resources) about RSpec, Factory Bot and Shoulda Matchers.  
Use RSpec to test the models and controllers.  
Suggestion: grab someone who has RSpec experience and get an overview.

#### Apis
Provided is the current's client api expected request/response. 
**You shouldnt technically have to make any changes to the client, but feel free to do so if you feel like it**

**GET /api/v1.0/restaurants**

	Response:
	Status: 200
	Content-type: 'application/json'
	Body:
		[
			{
				id: number,
				name: string,
				cuisine: {
					name: string,
					icon: <>
				},
				address: string,
				accepts_10bis: boolean,
				max_delivery_time: number,
				coordinates: {
			   		lat: number,
			   		lng: number
			   	},
			   	reviews: [
			   		{
			   			id: nubmer, 
			   			name: string,
			   			comment?: string,
			   			rating: number
			   		},
			   		...
			   	]
			},
			...
		]

**GET /api/v1.0/cuisines**

	Response:
	Status: 200
	Content-type: 'application/json;
	Body:
		[
			{
				name: string,
				icon: <>
			}
		]

**GET /api/v1.0/reviews**

	Response:
	Status: 200
	Content-type: 'application/json;
	Body:
		[
			{
				name: string,
				rating: number,
				comment: string
			}
		]


### Part 2: Import Restaurants And Reviews Using API
*Topics: Rails, RSpec, Gems, Rake, API calls, Environment Variables*

[Zomato](https://developers.zomato.com/) is an API provider which gives access to restaurant data all over the world.  
We will import ( = steal) restaurant and review data for restaurants in New York City.

**Zomato documentation access and generating token is blocked from Israel**

you can use this API key - 64051c9e2b0354b2938b32fcf4cd8fb2

In order to see Zomato documentation offline - you can copy zomato-swagger.json (can be found on the project main dir) to a swagger editor -
https://editor.swagger.io/


#### REQUIREMENTS
* Load X NYC **restaurants** into our database.
* For each restaurant, load at most Y **reviews**.
* Loading restaurants and reviews will be triggered via a **rake task** and/or a simple UI.
* When encountering a restaurant that already exists in the DB, either overwrite it or skip addition.

#### SOME DIRECTIONS
* Generate an API key on the site.
* You can toy with the API yourself on the side and find basic information you need, such as how to query for a particular city.
* Determine which of the APIs the site offers can help you obtain the data you need.
* Note that you should limit the number of restaurants being loaded. There are tens of thousands of restaurants in NYC. Luckily, the API lets us limit the number of results.
* To make http calls, you can use the [Faraday gem](https://github.com/lostisland/faraday) or Ruby’s built-in [Net::http](https://ruby-doc.org/stdlib-2.4.1/libdoc/net/http/rdoc/Net/HTTP.html)
* You can optionally convert the JSON responses you get to Ruby objects using the [Hashie gem](https://github.com/intridea/hashie)


### Part 3: Process Orders
Add The Ability To Make An Order From A Specific Restaurant.  
Whenever an order is being made the order app will publish an order to RabbitMq.  
You would listen to the Mq and process the orders asynchronously using [sidekiq](https://github.com/mperham/sidekiq).
Think of a concept of having a listener that is listening consistently (and not on demand)
The orders can get to you not in chronicle order, each event will have a status and could have different fields.


#### Directions
* On the WeEat website an "ORDER" button exists on every restaurant. Submitting an order through it will trigger a new delivery flow, this will cause delivery status payloads to be sent on the queue.
(the code for this is under lib/deliveries_manager - treat it as a black box)
* Create a RabbitMQ listener for a queue named: 'delivery.status_updated', this queue will be receiving delivery status payloads which you will need to process.
* Call the order processor - the sidekiq worker in charge of processing orders
* Process the order - Save the order to the DB when you receive a status payload. Notice that you should save the merged order and keep the most advanced status.

#### Messaging details
Here are some tips on how to get started.
##### Bunny How To
Bunny is the gem that communicates with Rabbitmq. A listener using Rabbit looks like the following:


Reading event:

	conn = Bunny.new
	conn.start
	channel = conn.create_channel
	queue = channel.queue(<TOPIC>, auto_delete: true)
	
	queue.subscribe(block: true) do |_, _, payload|
	  # DO STUFF
	end

##### DeliveryManager Payloads

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
  estimated_time_of_arrival: '12 minutes'
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

#### Anything You Can Think Of!
The purpose of WeEat is to give you a hands-on experience with our stack. Feel like there's a topic you want to try out and none of the existing tasks give you what you need? Talk with your buddy and come up with something.

