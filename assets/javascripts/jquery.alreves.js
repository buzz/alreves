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
		  jQuery(component.dest).fadeIn('slow');
		});
	}
  },

  /* process server response */
  processResponse: function(components) {
	if (typeof components == 'object')
	  jQuery.each(components, function(key, component) {
		  if (typeof component.template_name != 'undefined' && typeof component.dest != 'undefined') {
			// download template if not already cached
			if (typeof jQuery.alreves.caches.templates[component.template_name] == 'undefined') {
			  ++jQuery.alreves.request_count;
			  jQuery.ajax({
				  type: "GET",
					url: 'templates/'+component.template_name+'.tpl',
					success: function(response) {
						jQuery.alreves.caches.templates[component.template_name] = TrimPath.parseTemplate(response);
						--jQuery.alreves.request_count;
						jQuery.alreves.updatePage(components);
				  },
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log('AJAX request error: ' + textStatus + ' (' + errorThrown + ')');
						--jQuery.alreves.request_count;
				  }
				});
			} else
			  jQuery.alreves.updatePage(components);
		  }
		});
  },

  /* execute an action on server */
  loadURL: function(url, post_data) {
	if(!this.processing_state)
	  jQuery.post(url, typeof post_data == 'object' ? post_data : null, function(response) {
		  jQuery.alreves.processResponse(response);
		}, 'json');
  },

  /* Submit a form using post ajax request */
  submitForm: function(form) {
		var fields = jQuery('#'+form+' :input').serializeArray();
		this.loadURL(jQuery('#'+form).attr('action'), fields);
		jQuery('#'+form+' :input').disable();
  },

  /* Inject stylesheet */
  injectCSS: function(css_url) {
    $('head').append('<link rel="stylesheet" type="text/css" href="'+css_url+'" />')
  },

  /* Add macro file */
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
	}
}

