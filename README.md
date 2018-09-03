### Prerequisites

Before starting off make sure you have [Local Infrastructure](https://github.com/WeConnect/local-infrastructure) set up and running on your machine.
This is a utility tool intended to make working with docker projects easy so you can hit the ground running. It will download and install all the main services we're using (Postgres, Redis, Rabbit etc)

```
# First time setting up
git clone git@github.com:WeConnect/local-infrastructure.git && cd local-infrastructure
script/setup

```

```
# Run all services
# Must run this inside **local-infrastructure** directory
# You need to run this every time you reboot your computer
docker-compose up
```

### Getting Started

To get started:

1. Clone this repo (be sure to change the remote origin!): `git clone git@github.com:WeConnect/mission-4-rails-template.git`
1. Run `script/initialize PROJECT_NAME PROJECT_PORT` to replace the references to `PROJECT` to your cool app name and `PROJECT_PORT` to the external port of the app. Example: `script/initialize snake_case 5001`. This will also take care of the Application name in `application.rb` to be `CamelCase`, and will create the initial docker image.
1. Modify all of the `script/` and `docker-compose.*` files to suit your project's needs
1. Run `script/setup` to install your needed gems, create the database(s) and other needs
1. Run `script/exec rake secret` to generate a `SECRET_KEY_BASE` secret and store it in your heroku environment variables.

To get git pre-push hook setup:

1. Symlink pre-push file inside .git/hooks directory: `ln -s ../../hooks/pre-push .git/hooks`
1. Make pre-push executable: `chmod +x .git/hooks/pre-push`

> What does it do?

For every commit, before pushing the changes, [rubocop](https://github.com/bbatsov/rubocop) will run and lint the code and will try to auto fix style violations if possible.
This ensures having consistent code styles on the project when working with multiple people on the team.
In addition, [Brakeman](https://github.com/presidentbeef/brakeman) is a static code analysis and will check for potential problems in the code.

> What if I want to skip running pre-commit hook?

You may want to commit your changes and rubocop lint fixes separately
Or skip running pre-push hook for some other reason
To achieve this push with --no-verify flag
```
git push ... --no-verify
```

### Testing
Run test on docker:
```
script/test
```

### Scripts to Rule Them All

Based on the github (the company) concept, most interaction with the project is handled through simple bash scripts.

For background view the [repo](https://github.com/github/scripts-to-rule-them-all) and the [blog post](https://githubengineering.com/scripts-to-rule-them-all/)

#### script/exec

We added an additional command, `script/exec` to allow you to interact with the code with the full "rails-y" context. This command is how you can run your usual migrations and gem upgrades.

To use run `script/exec bundle install` for example.

### Docker

Our main (RoR) image is hosted on [Quay](https://quay.io/repository/wework/PROJECT))
### Deployment

The configuration for Docker is handled using [docker-compose](https://docs.docker.com/compose/overview/). Update the file(s) to suite your particular team's needs.

[Quay](https://quay.io/repository/wework/PROJECT) is where you can see our tags, builds, and hooks.

CircleCi configuration deploys the containers to staging on every merge to staging, and to production on every merge to master.

### Environment Variables

Environment variables are set in Heroku
