# tests to see if changes have been made to the working directory
# outputs git diff command to variable and sees if variable contains file name 

diff_files = `cd my-quizzes; git diff --name-only`.split("\n")

if diff_files.include?("biology.txt")
  exit 0
else
  exit 1
end