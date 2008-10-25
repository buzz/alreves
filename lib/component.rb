module Buzz #:nodoc:
	class Component
	  attr_accessor :dest, :template_name, :data

	  def initialize(opts = {})
	    @dest = opts[:dest] || 'body'
	    @template_name = opts[:template_name] || 'border'
	    @data = opts[:data] || { }
	  end

	  def get_attributes_json
	    data = []
	    @data.each do |key, value|
	      data.push "'#{key}': #{value}"
	    end
	    "{'dest':'#{@dest}','template_name':'#{@template_name}','data':{#{data.join(',')}}}"
	  end
	end
end

