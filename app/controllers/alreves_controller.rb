class AlrevesController < ActionController::Base
  def alreves_init
    @components.push(Component.new())
    render :text => get_response_json
  end
end
