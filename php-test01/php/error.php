<?php
//------------------------------------
// @calling
// @purpose :
// @date
// @argment
// @return
//------------------------------------

//Smartyクラスの呼び出し
include_once("../libs/AppCom.php");

	// セッション開始
	session_start();
	
	$smarty = new MySmarty();
	
	$smarty->assign("flash_notice", $_SESSION["error_meaasge"]);
	
		//テンプレートの表示
	$smarty->display("Layout/yt_input_head.tpl");		
	$smarty->display("error.tpl");

	exit;
?>