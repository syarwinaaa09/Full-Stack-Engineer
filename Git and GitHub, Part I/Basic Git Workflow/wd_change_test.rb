scene_1 = `git status -s`.split("\n").detect do |f|
    f.include? "scene-1.txt"
  end
  
  if scene_1.nil?
    exit 1
  elsif scene_1.include? "AM"
    exit 0
  else
    exit 1
  end
  
  