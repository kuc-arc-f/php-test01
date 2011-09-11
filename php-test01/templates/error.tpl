<div id="mainbody">
{if $flash_notice != "" }
  <div id="notice">{$smarty.session.error_meaasge}</div>
{/if}
<br />

</form>
{if $url_error  !=""}
	<a href="{$smarty.session.url_error}">Back</a>
{/if}
</p>
</div>