connect 'alreves_init', :controller => 'application', :action => 'alreves_init', :conditions => { :method => :post }

connect ':controller', :action => 'index', :conditions => { :method => :post }
connect ':controller/:id', :action => 'show', :id => /\d+/, :conditions => { :method => :post }
connect ':controller/:action', :conditions => { :method => :post }
connect ':controller/:action/:id', :conditions => { :method => :post }

