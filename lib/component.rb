class Component
  attr_accessor :dest, :template_name, :data

  def initialize(opts = {})
    @dest = opts[:dest] || 'body'
    @template_name = opts[:template_name] || 'border'
    @data = opts[:data] || {}
  end
end
