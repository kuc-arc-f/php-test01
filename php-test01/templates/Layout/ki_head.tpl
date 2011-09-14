<html>
<head>
  <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
  <title>TEST01:{$smarty.session.ki_user.USER_ID}</title>
    <link href="{$PUBLIC_DIR}/stylesheets/main.css" media="screen" rel="Stylesheet" type="text/css" />
    <link href="{$PUBLIC_DIR}/stylesheets/ki.css" media="screen" rel="Stylesheet" type="text/css" />
    <link href="{$PUBLIC_DIR}/stylesheets/ki_main.css" media="screen" rel="Stylesheet" type="text/css" />
    <link href="/SexyButtons/sexybuttons.css" media="screen" rel="Stylesheet" type="text/css" />
    <script src="{$PUBLIC_DIR}/javascripts/prototype.js" type="text/javascript"></script>
    <script src="{$PUBLIC_DIR}/javascripts/inputchk.js" type="text/javascript"></script>
    <script src="{$PUBLIC_DIR}/javascripts/kinen_form.js" type="text/javascript"></script> 
    <script src="{$PUBLIC_DIR}/javascripts/kinen.js" type="text/javascript"></script>
</head>
<body style="font-family:Arial; margin: 0px; padding:0px;">
<table border="0" width="100%" style="background: #CAF9CF" cellpadding=0 cellspacing=0>
 <tr height="40px">
    	<TD class="table_colmn03_bottom02" width="200px" style="border-right: 1px solid gray">
		<font color=green>
		 <img src="{$IMAGE_DIR}/0727a2.png" />
		</font>
	</TD>
	<TD class="table_colmn03_bottom02" valign=middle style="width : 150px">
		&nbsp;
		<font  color="#FF00FF" style="padding-left: 10px; font-size : 11pt; font-family : "Arial";">
		 Trial Ver
		</font>
	</TD>
	<TD class="table_colmn03_bottom02" align="right" valign=middle style="padding-right: 10px; width :300px">
		|&nbsp;<a href="{$PHP_DIR}/KIA101.php" style="color: blue;text-decoration:none;">Home</a>&nbsp;|
		{if $smarty.session.user.AUTH_TYP==9}
			&nbsp;<a href="{$PHP_DIR}/YF001.php" style="color: blue;text-decoration:none;">Admin</a>&nbsp;|
		{/if}
	</TD>
	<TD class="table_colmn03_bottom02">&nbsp
	</TD>
	<TD class="table_colmn03_bottom02" style="width : 80px" align="right" valign="middle">
		|&nbsp;<a href="{$PHP_DIR}/KIA102.php?init=1" style="color: blue;text-decoration:none;">logout</a>
		&nbsp;|&nbsp;&nbsp;
	</TD>
 </tr>
 </table>
 <!-- --> 
<div id="store">
  <div id="colmuns">
    <div id="side">
      <div id="cart_02">
	      <table border="0" cellpadding=0 cellspacing=0  height="600px">
	        <tr height="48px">
	         <td colspan="2">
	          <img src="{$IMAGE_DIR}/0310a3.png" style="border: 1px solid gray" width="128px"/>
	         </td>
	        </tr>
	        <!-- -->
	        <tr height="50px">
	         <td valign="bottom" align="center" colspan="2" style="font-weight: bold; color: green">
	         &nbsp;
	         { $smarty.session.ki_user.USER_ID }
	         </td>
	        </tr>
	        <tr>
	         <td>
	         &nbsp;
	         </td>
	        </tr>
	      </table>      
      </div>
      
      <br>
      <!-- <a href="#">Home</a> -->
      <br> 
    </div>
</div>

