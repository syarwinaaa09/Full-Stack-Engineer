require "rubygems"
require "git"

begin
  g = Git.open(".")
  g.log(20).count
rescue
  puts "No commit has been made"
  exit 1
else
  puts "A commit has been made"
  exit 0
end
