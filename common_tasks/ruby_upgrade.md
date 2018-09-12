## Ruby Version Upgrade

Steps you will want to follow to upgrade your application from one ruby version to another.

For the purposes of this file `VERSION` will refer to the ruby version you are updating to.

### All Upgrades (Minor and Patch)

1. Update your `Gemfile` and your `Dockerfile` to the new ruby version
1. Run `docker run --rm -v "$PWD":/usr/src/app -w /usr/src/app ruby:VERSION bundle update --ruby`
1. Verify that your new docker build succeeds.

For the last step, I recommend tagging the new image as `bp-we-eat:local` and then run `export CONTAINER_TAG=bp-we-eat` in your local shell that you are testing your application in. Then you can run through your test suite and do manual testing to ensure that your application still runs properly.

### Minor (and presumably major) Version Upgrades

After doing the steps above, you will need to tear down your local and rebuild all the gem installations. The `bin/ruby_upgrade` script should handle this for your project.
