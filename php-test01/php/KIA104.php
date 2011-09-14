<?php
//------------------------------------
// @calling
// @purpose : New, Insert
// @date
// @argment
// @return
//------------------------------------
include_once("../libs/AppCom.php");

	session_start();
	$smarty = new MySmarty();
		
	if(isset($_POST["txt_name"])){
		$db     =new ComMysql();
		$param["@001"] = $_POST["txt_name"];
		$param["@002"] = $_POST["txt_code"];
		$param["@003"] = $_SESSION["ki_user"]["ID"];

		$_SESSION["KIA004_dat"]    = $_POST;

		$result = $db->Exec_NonQuery( "KIA104", 1,  $param );
		if ($result == false) {
		  print $clsConst->MSG_ERROR_004;
		  exit;
		}
		header( "Location: ./KIA101.php");
	}else{
	 print( $clsConst->MSG_ERROR_001 );
	}
?>