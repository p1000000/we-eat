### July 11, 2018

- Updated to allow setup to occur even if the shared docker nework (`wework_dev`) has not yet been created
- BUGFIX: ensuring that rspec runs via the spring preloader (and runs at all with script/test)

### July 10, 2018

- Support for setting the `CONTAINER_TAG` in `docker.compose.yml` as well as in `docker-compose.test.yml`
- Bugfix for a renamed service not being replicated everywhere

### July 9, 2018

- Gave `docker-compose.yml` feature parity with `docker-compose.test.yml` (now both support explicitly setting the image tag)

### July 6, 2018

- Added instructions for upgrading the ruby version (minor and patch)

### July 6, 2018

- Upgraded to ruby 2.5.1
- Switched to including rubocop as a default gem
- Now recommending strict locking in the Gemfile
- Adding a statement timeout to the database.yml
- Updating robots.txt to prevent crawling
- Namespacing spring to prevent collisions between test and development environments
- Updating various scripts to use the spring preloading

### June 20, 2018

- Updated `.rubocop.yml` to handle current versions of rubocop

### Apr 7, 2018

- Added `.rubocop.yml` file, to help with the linting from the get go.

### Mar 27, 2018

- Comments and readme updates

### Mar 27, 2018

- typo fix in `docker-compose.test.yml`
- ensure test:prepare is run in `script/setup`

### Mar 26, 2018

- Properly reversing the frozen and gem groups from the `Dockerfile` in `script/setup`
- Switching from `script/exec` to running the docker-compose commands directly when running `script/setup` or `script/update`

### Mar 8, 2018

- `spring` and `spring-commands-rspec` added (without requiring ruby on host).

### Mar 6, 2018

- adding newrelic.yml for monitoring

### Mar 2, 2018

- Removing `timecop` as a suggested gem as their are now built-in libraries

### Feb 27, 2018

Fixing broken dependencies
- re-adding bin/rails and bin/rake as they are necessary for rails commands
- Following the pattern for rails 5 for utilities that are no longer run using rake

### Feb 23, 2018

Changes to application.rb, Gemfile, and Dockerfile
- adding Garbage Collection profiling by default
- Bumping ruby version to 2.5.0
- additional tweak for running in our existing infrastructure

### Feb 6, 2018

Changes to Dockerfile
- Updated Dockerfile to pull from dockerhub ruby

### Jan 2, 2018

Changes to docker-compose.test.yml, script/setup, and script/test:
- Switched docker-compose.test.yml to point to an isolated (alpine) postgres to simplify use

### Dec 5, 2017

- Updated Dockerfile for new ruby base containers (non-onbuild)
- Added install steps to readme

### Nov 13, 2017

- Standardizing use of `bp-we-eat` instead of `APPLICATION` or `bp-we-eat`
- Ensuring that the Dockerfile uses puma with the `puma.rb` config
- Cleaned up the `puma.rb` file to ensure the project runs on port 80 by default
- docker-compose no longer overrides dockerfile for running the web server
- made all of the `script` files executable

###  Nov 1, 2017

Bugfix: missed an `end` in the Gemfile

### Oct 31, 2017

Bugfix: changing the syntax of `script/exec` to accept additional commands (would fail in some cases previously)

### Oct 26, 2017

Initial release

- Scripts to rule them all
- Gemfile template
- docker-compose template
- application.rb template
