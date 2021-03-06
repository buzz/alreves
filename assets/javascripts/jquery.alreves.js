/*
 * Alreves JQuery plugin
 *
 * (c) 2008 buzz
 * Licensed under the GPL
 *
 */

jQuery.alreves = {
  /* true if alreves is currently processing a user request */
  processing_state: false,

  /* number of current template requests */
  request_count: 0,

  /* engine caches */
  caches: {
    templates: {},
    macros: {}
  },

  /* authenticity_token for Rail's RequestForgeryProtection */
  authenticity_token: '',

  /* update page with content */
  updatePage: function(components) {
		if (this.request_count < 1) {
			jQuery.each(components, function(key, component) {
				// for storing macros
				component.data.macros = {}
				// apply common macros
				jQuery.each(jQuery.alreves.caches.macros, function(key, template) {
					template.process(component.data);
				});
				jQuery(component.dest).html(jQuery.alreves.caches.templates[component.template_name].process(component.data));
			});
		}
  },

  /* process server response */
  processResponse: function(response) {
		// process components
	  if (typeof response.components == 'object') {
		  jQuery.each(response.components, function(key, component) {
			  if (typeof component.template_name != 'undefined' && typeof component.dest != 'undefined') {
				  // download template if not already cached
				  if (typeof jQuery.alreves.caches.templates[component.template_name] == 'undefined') {
					  ++jQuery.alreves.request_count;
					  jQuery.ajax({
						  type: "GET",
						  url: 'templates/'+component.template_name+'.tpl',
						  success: function(template) {
							  jQuery.alreves.caches.templates[component.template_name] = TrimPath.parseTemplate(template);
							  --jQuery.alreves.request_count;
							  jQuery.alreves.updatePage(response.components);
						  },
						  error: function(XMLHttpRequest, textStatus, errorThrown) {
							  console.log('AJAX request error: ' + textStatus + ' (' + errorThrown + ')');
							  --jQuery.alreves.request_count;
						  }
					  });
				  } else
						jQuery.alreves.updatePage(response.components);
			  }
		  });
	  }
	  if (typeof response.client_actions == 'object') {
			for (var i = 0; i < response.client_actions.length; ++i) {
				eval(response.client_actions[i]);
      }
		}
  },

  /* execute an action on server */
  loadURL: function(url, options) {
		var settings = jQuery.extend({post_data: {}, success: function(){}}, options);
		if (!this.processing_state)
			if (typeof post_data != 'object') {
				post_data = {};
			}
    settings.post_data.authenticity_token = this.authenticity_token;
    jQuery.post(url, settings.post_data, function(response) {
      jQuery.alreves.processResponse(response);
			settings.success();
    }, 'json');
		return jQuery;
  },

  /* submit a form using post ajax request */
  submitForm: function(form, options) {
		settings = jQuery.extend({success: function(){}}, options);
		f = jQuery(form);
		if (f.length != 1)
			return;
		var inputs = f.find(':input');
		var fields = {};
    jQuery.each(inputs.serializeArray(), function(key, value){
			fields[value.name] = value.value;
		});
    this.loadURL(f.attr('action'), {post_data: fields, success: settings.success});
		return f;
  },

  /* inject stylesheet */
  injectCSS: function(css_url) {
    $('head').append('<link rel="stylesheet" type="text/css" href="'+css_url+'" />');
		return jQuery;
  },

  /* inject javascript */
  injectJS: function(js_url, callback) {
    jQuery.ajax({
      type: "GET",
      url: js_url,
      success: function(response) {
        eval(response);
				if (typeof callback == 'function')
					callback();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log('AJAX request error: ' + textStatus + ' (' + errorThrown + ')');
      }
    });
		return jQuery;
  },

  /* add macro file */
  addMacroFile: function(macro_url) {
    if (typeof this.caches.macros[macro_url] == 'undefined') {
      jQuery.ajax({
        type: "GET",
        url: macro_url,
        success: function(response) {
          jQuery.alreves.caches.macros[macro_url] = TrimPath.parseTemplate(response);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log('AJAX request error: ' + textStatus + ' (' + errorThrown + ')');
        }
      });
    }
		return jQuery;
  }
}
