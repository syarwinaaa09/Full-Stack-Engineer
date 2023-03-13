#tests if biology.txt was added to the staging area

diff_files = `cd my-quizzes; git diff --staged --name-only`.split("\n")

if diff_files.include?("biology.txt")
  exit 0
else
  exit 1
end