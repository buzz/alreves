ActionController::Base.send :include, AlrevesControllerHelper
ActionView::Helpers::AssetTagHelper::register_javascript_expansion :alreves => ["../plugin_assets/alreves/javascripts/jquery.alreves.js",
                                                                                "../plugin_assets/alreves/javascripts/trimpath-template.js"]
