# tests to see if user has switched to new branch

master_ref = "ref: refs/heads/master"

current_ref = `cd my-quizzes; cat .git/HEAD`.chomp

if current_ref != master_ref
  exit 0
else
  exit 1
end