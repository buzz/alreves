{macro link(name, url, options)}
  {if typeof options != 'object'}
  	${%options = {}|eat%}
	{/if}
  <a href="javascript:$.alreves.loadURL('${url}'{if typeof options.data != 'undefined'}, ${options.data}{/if});"{if typeof options.id != 'undefined'} id="${options.id}"{/if}{if typeof options.class != 'undefined'} class="${options.class}"{/if}>${name}</a>
{/macro}
${macros.link = link |eat}

