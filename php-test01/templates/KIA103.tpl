<div id="main">
&nbsp;
<font style="color : #226; font-size : 20pt; font-weight : bold;">{$title_message}</font>
<table border="0" cellpadding=0 cellspacing=0>
{if $form_type== KI_FORM_TYP_EDIT}
   <form name='form1' id="form1" action="{$PHP_DIR}/KIA106.php" method='post' >
<input type="hidden" name="KIA003_id" id="KIA003_id"  value="{$EA003_id}"/>
{else}
   <form name='form1' id="form1" action="{$PHP_DIR}/KIA104.php" method='post' >
{/if}
<!--
	 <tr>
	  <td colspan="3"><div id="notice_tbl"></div>
	  </td>
	 </tr>
 -->
<!-- -->  
 <tr height="25">
  <td colspan="3" align="right">
{if $form_type==KI_FORM_TYP_EDIT }
	<input type="button" name="btn_save" id="btn_save" value=" Save " onclick="document.form1.submit();"></input>
	&nbsp;&nbsp
	<input type="button" name="btn_del" id="btn_del" value=" Delete " onclick="KIA103_del('{$PHP_DIR}/KIA107.php?id={$EA003_id}', 'Delete ok?');"></input>
{else}
	<input type="button" name="btn_save" id="btn_save" value=" Save " onclick="KIA103_add( '{$PHP_DIR}/KIA108.php', 'Add OK?');"></input>
		&nbsp;&nbsp
{/if}
	 &nbsp;&nbsp;&nbsp;&nbsp;
	  </td>
 </tr>
<!-- -->
<!--
 <tr height="25">
  <td >
  &nbsp;
  </td>
  <td colspan="2" align="center" valign="top"><font color="red"><div id="id_text_msg01">&nbsp;</div></font> 
  </td>
 </tr>
 -->
<!-- -->  
 <tr height="40px">
  <td>&nbsp;<font class="txt-16px-bold-gray">Name</font>&nbsp;
   <font color="red">※</font>&nbsp;
  </td>
  <td>
   <input maxlength="20" type="text" name="txt_name" id="txt_name" size="20" value="{$dat[0].S_NAME}" />
  </td>
  <td valign="bottom"> &nbsp;
  </td>
 </tr>
<!-- -->  
 <tr height="40px">
  <td>&nbsp;<font class="txt-16px-bold-gray">Code</font>&nbsp;
  </td>
  <td>
   <input maxlength="20" type="text" name="txt_code" id="txt_code" size="20" value="{$dat[0].S_CD}" />
  </td>
  <td valign="bottom"> &nbsp;
  </td>
 </tr>

</table>
<br />

<hr />
 &nbsp;<a href="{$PHP_DIR}/KIA101.php">Back</a>
</div>
<!-- End_Main -->
