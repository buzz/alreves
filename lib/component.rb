class Component
  attr_accessor :dest, :template_name, :data

  def initialize(opts = {})
    @dest = opts[:dest] || 'body'
    @template_name = opts[:template_name] || 'border'
    @data = opts[:data] || {}
  end

  def to_json
    data = []
    @data.each do |key, value|
      if value.is_a? ActiveRecord::Base
        data.push "'#{key}':#{value[:data].to_json(value[:json_opts])}"
      else
        data.push "'#{key}':#{value[:data].to_json()}"
      end
    end
    "{'dest':'#{@dest}','template_name':'#{@template_name}','data':{#{data.join(',')}}}"
  end
end
