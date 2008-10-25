dir = File.join(RAILS_ROOT, 'public', 'templates')
puts "Create directory '#{dir}'"
FileUtils.mkdir(dir)
src = File.join(File.dirname(__FILE__), 'assets', 'index.html')
dest = File.join(RAILS_ROOT, 'public')
puts "Copy '#{src}' to '#{dest}'"
FileUtils.cp(src, dest)

