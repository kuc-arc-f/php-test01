<?php
//------------------------------------
// @calling
// @purpose : New
// @date
// @argment
// @return
//------------------------------------

include_once("../libs/AppCom.php");

	$title_message="Add";

	session_start();
	
	//MySmartyインスタンス生成
	$smarty = new MySmarty();

	$smarty->assign("title_message", $title_message );
	$smarty->disp_Layout("KIA103.tpl");

?>