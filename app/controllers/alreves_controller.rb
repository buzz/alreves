class AlrevesController < ActionController::Base
  attr_accessor :components, :client_actions

  def initialize
    @components = []
    @client_actions = []
  end

  # starts the web application using rhtml
  def alreves_boot
    render
  end

  # send default component (usually page layout)
  def alreves_init
    @components.push(Component.new())
  end

  # the default will be to generate json
  def default_render
    components = []
    @components.each do |c|
      components << c.to_json
    end
    render :text => "{'components':[#{components.join(',')}],'client_actions':#{@client_actions.to_json}}"
  end
end
