task default: %w[run]

task :setup do
  sh "sudo docker volume create nodemodules"
end

task :run do
  sh "sudo docker-compose run --service-ports --rm dev"
end
