<A HREF="{$PHP_DIR}/KIA103.php" style="color: blue;text-decoration:none;">| Add |</A><br />
<br />
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0">
<!-- Loop -->
{foreach from =$result item="dat" key="key" name="loopName"}
<TR">
 <TD style="border-bottom:1px solid #888888" width="60%">
  <B><font color='#226'>{$dat.S_NAME}</font></B>
 </TD>
 <TD style="border-bottom:1px solid #888888">
 &nbsp;{$dat.S_CD }
 </TD>
 <TD style="border-bottom:1px solid #888888">
 &nbsp; <A HREF="{$PHP_DIR}/KIA105.php?id={$dat.ID }">[ Edit ] </A>
 </TD>
</TR>
{/foreach}
<!-- Loop_End -->
</table>
