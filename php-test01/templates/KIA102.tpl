<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login</title>
<script src="{$PUBLIC_DIR}/javascripts/prototype.js" type="text/javascript"></script>
<script src="{$PUBLIC_DIR}/javascripts/bm.js" type="text/javascript"></script>
</head>
<body onload="doFocus();" style="font-family: Arial">
<p style="color: green"></p>
<form action="{$PHP_DIR}/KIA102.php" method="post" name="loginform">
<input type="hidden" name="auto_login" id="auto_login" value="{$s_auto_login}" />
<br>
<br>
<hr>
<br>
<br>
 <table border="0" align=center valign="middle" cellpadding=0 cellspacing=0>
 <tr>
  <!-- <td colspan="2" align="center" style="color:green ;font-weight:bold;font-size : 32pt ; font-family : HG丸ｺﾞｼｯｸM-PRO"> -->
  <td colspan="2" align="center">
   <img src="{$IMAGE_DIR}/0716b1.png" alt="" style="border: 1px solid gray;" border="1">
    <!-- {$APP_CONST->MSG_002} -->
  </td>
 </tr>
 <!-- -->
 <tr height="30px" align="center">
  <td colspan="2">
	   <font  color="#FF00FF" style="font-size : 11pt; font-family : "Arial";">
	    {$msg_004}
	   </font>
  </td>
 </tr>

 <tr>
  <td>user_id：</td>
  <td>
   <input class="login_input_size" id="user_login_id" name="user_login_id" value="{$login_user}" size="12" type="text" style="ime-mode: disabled;" />
  </td>
  {if $form_type!=2}
	  <td rowspan="2" align="center" width="150px">
	    <a href="{$PHP_DIR}/EC002.php">
	    <img src="{$IMAGE_DIR}/0204d.png" alt=""  border="0">
	   </a>
	  </td>
  {/if}
 </tr>
 <tr>
  <td>password：</td>
  <td>
    <input class="login_input_size" id="user_password" name="user_password" value="{$login_pass}" size="12" type="password" />
  </td>
 </tr>

 <tr height="40px">
  <td><input name="commit" type="submit" value="login" /></td>
 </tr>
 <tr>
  <td colspan="2" align="center"><font color="red">{$message}</font></td>
 </tr>
 </table>
 <br>
        
 <hr>
 <div align="right" style="font-family:Arial">
 System-Info.
<br>
 <a href="" style="text-decoration:none;">
 [ home ]</a>
 <br>
 <br>
{$APP_CONST->MSG_001 }
<br>
 </div>

</form>

</body>
</html>