# https://hub.docker.com/_/ruby
FROM ruby:2.5.1

# Only needed if running on kubernetes
RUN echo "if [ -e /confd/.env ]; then . /confd/.env; fi" >> /etc/profile
# Also kubernetes-only, PATH is reset for the ENV injection
RUN echo "export PATH=$PATH" >> ~/.bashrc

WORKDIR /app

# If you are using sidekiq-ent or other credential-requiring gems
# Uncomment the following two lines to persist the credential
# ARG BUNDLE_ENTERPRISE__CONTRIBSYS__COM
# ENV BUNDLE_ENTERPRISE__CONTRIBSYS__COM=$BUNDLE_ENTERPRISE__CONTRIBSYS__COM

COPY Gemfile* /app/
COPY . /app

# Similar to --no-deployment, but we don't want to vendor the gems
RUN bundle config --local frozen 1
RUN bundle install --jobs 32 --without test development


CMD puma -C /app/config/puma.rb
