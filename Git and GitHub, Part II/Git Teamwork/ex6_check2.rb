# tests to see if a new branch "bio-questions" has been created 
# prints out the branches and checks for appearance of "bio-questions" string

branches = `cd my-quizzes; git branch`.split("\n").map{|branch| branch.strip}

if branches.include?("bio-questions")
	exit 0
else
	exit 1
end