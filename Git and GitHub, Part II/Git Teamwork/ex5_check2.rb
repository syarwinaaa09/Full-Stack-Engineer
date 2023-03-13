# tests if master has been merged with origin/master
# checks if the hash of master is the same as the hash of origin/master

origin_master = `cd my-quizzes; cat .git/refs/remotes/origin/master`.chomp

master = `cd my-quizzes; cat .git/refs/heads/master`.chomp

if origin_master == master
	exit 0
else 
	exit 1
end