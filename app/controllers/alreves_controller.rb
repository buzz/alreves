class AlrevesController < ActionController::Base
  # starts the web application using rhtml
  def alreves_boot
    render
  end

  # send default component (usually page layout)
  def alreves_init
    @components.push(Component.new())
    render :text => get_response_json
  end
end
