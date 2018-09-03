# frozen_string_literal: true

threads_count = ENV.fetch('RAILS_MAX_THREADS') { 5 }
threads threads_count, threads_count

port        ENV.fetch('PORT') { 80 }

environment ENV.fetch('RAILS_ENV') { 'development' }

worker_timeout ENV.fetch('WORKER_TIMEOUT') { 30 }

plugin :tmp_restart
