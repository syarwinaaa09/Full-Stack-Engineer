require "rubygems"
require "git"

begin
  g = Git.open(".")
rescue
  puts "No git repo has been made"
  exit 1
else
  puts "there is a git repo here"
  exit 0
end