require 'action_controller'

module Buzz #:nodoc:
	class AlrevesController < ActionController::Base
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

	  def init_layout
	    @components.push(Buzz::Component.new())
	    render :text => get_response_json
	  end
	end
end

