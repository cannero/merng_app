task default: %w[run]

task :setup do
  sh "sudo docker volume create nodemodules"
end

task :run do
  sh "sudo docker-compose run --service-ports --rm dev" do |ok, res|
    if ok || res.exitstatus == 130
      #puts "everything ok"
    else
      puts "failed with <#{res}>"
    end
  end
end
