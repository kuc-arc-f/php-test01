<?php
//------------------------------------
// @calling
// @purpose : Login
// @date
// @argment
// @return
//------------------------------------

//
require_once("../libs/AppCom.php");

	session_start();
	$_SESSION["ki_user"]  =array();
	
	$db     =new ComMysql();

	$smarty = new MySmarty();
 if(isset($_POST["user_login_id"]) && isset($_POST["user_password"]) ){
	$param["@001"] =$_POST["user_login_id"];
	$param["@002"] =$_POST["user_password"];
	$result = $db->GetRecord_byId("KIA102", 1, $param);	
	$num_rows = mysql_num_rows($result);
	if($num_rows < 1 ){
		$message ="Login Error";
		$smarty->assign("message", $message );

		$smarty->display("KIA102.tpl");
	}else{
		while ($row = mysql_fetch_array ($result)) {
			$_SESSION["ki_user"]    = $row;
		}
		setcookie( KI_COOK_USER , $_POST["user_login_id"], time()+ KI_COOK_EXPR );
		setcookie( KI_COOK_PASS , $_POST["user_password"], time()+ KI_COOK_EXPR );
		
		header( "Location: ./KIA101.php");
		exit;
	}
 }else{
 	 $login_user="";
 	 $login_pass="";
 	 $form_type=1;  /* 1=first_login */
 	 
 	 if (isset($_COOKIE[ KI_COOK_USER ])) {
	 	 $login_user=$_COOKIE[ KI_COOK_USER ];
	 	 $login_pass=$_COOKIE[ KI_COOK_PASS ];
	 	 $form_type =2;
	 }
	$smarty->assign("login_user", $login_user );
	$smarty->assign("login_pass", $login_pass );
	$smarty->assign("form_type" , $form_type );
	$smarty->assign("msg_004" , $clsConst->MSG_004  );
	$smarty->assign("s_auto_login" , "1");

	$smarty->display("KIA102.tpl");
 };
?>