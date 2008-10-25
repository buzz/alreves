module AlrevesControllerHelper
  attr_accessor :components

  def initialize
    @components = []
  end

  def get_response_json
    response = []
    @components.each do |component|
      response << component.get_attributes_json()
    end
    "[ #{response.join(',')} ]"
  end
end

