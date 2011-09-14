<?php
//------------------------------------
// @calling
// @purpose : Edit, Update
// @date
// @argment
// @return
//------------------------------------
include_once("../libs/AppCom.php");

	session_start();
	$smarty = new MySmarty();
	if(isset($_POST["txt_name"])){
		$db     =new ComMysql();
		$param["@001"] = $_POST["KIA003_id"];
		$param["@002"] = $_POST["txt_name"];
		$param["@003"] = $_POST["txt_code"];
		$result = $db->Exec_NonQuery( "KIA106", 1,  $param );
		if ($result == false) {
			print $clsConst->MSG_ERROR_005;
			exit;
		}
		//
		header( "Location: ./KIA101.php");
	}else{
	 print( $clsConst->MSG_ERROR_001 );
	}
?>