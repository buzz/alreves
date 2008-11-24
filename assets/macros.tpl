{macro link(name, url, options)}
{eval EOF}
o = jQuery.extend({
  id: '',
  class: '',
  target: '_self'
}, options);
EOF
<a href="${url}"{if typeof o.loadurl != 'undefined'} onclick="jQuery.alreves.loadURL('${o.loadurl}'{if typeof o.loadoptions != 'undefined'}, ${o.loadoptions}{/if});${o.js}"{/if} id="${o.id}" class="${o.class}" target="${o.target}">${name}</a>
{/macro}
${macros.link = link|eat}

