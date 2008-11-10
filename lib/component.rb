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
      if value.is_a? Hash and !value[:data].nil?
        if !value[:json_opts].nil? and
            value[:data].is_a? ActiveRecord::Base or
            value[:data].is_a? Array
          data.push "'#{key}':#{value[:data].to_json value[:json_opts]}"
        else
          data.push "'#{key}':#{value[:data].to_json}"
        end
      else
        data.push "'#{key}':#{value.to_json}"
      end
    end
    "{'dest':'#{@dest}','template_name':'#{@template_name}','data':{#{data.join(',')}}}"
  end
end
