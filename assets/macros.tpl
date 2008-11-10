{macro link(name, url, options)}
  {if typeof options != 'object'}
  	${%options = {}|eat%}
	{/if}
  <a href="${url}" onclick="{if typeof options.loadurl != 'undefined'}jQuery.alreves.loadURL('${options.loadurl}'{if typeof options.data != 'undefined'}, ${options.data}{/if});{/if}{if typeof options.js != 'undefined'}${options.js}{/if}"{if typeof options.id != 'undefined'} id="${options.id}"{/if}{if typeof options.class != 'undefined'} class="${options.class}"{/if}>${name}</a>
{/macro}
${macros.link = link |eat}

