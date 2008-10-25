require 'action_controller'

module buzz #:nodoc:
	class ApplicationController < ActionController::Base
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
	    @components.push(Component.new())
	    render :text => get_response_json
	  end
	end
end

