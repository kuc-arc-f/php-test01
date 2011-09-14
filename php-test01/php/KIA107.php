<?php
//------------------------------------
// @calling
// @purpose : delete
// @date
// @argment
// @return
//------------------------------------
include_once("../libs/AppCom.php");

	session_start();
	$smarty = new MySmarty();
		
	if(isset($_GET["id"])){
		$db     =new ComMysql();
		$param["@001"] = $_GET["id"];
		$result = $db->Exec_NonQuery( "KIA107", 1,  $param );
		if ($result == false) {
		  print $clsConst->MSG_ERROR_004;
		  exit;
		}
		header( "Location: ./KIA101.php");
	}else{
	 print( $clsConst->MSG_ERROR_001 );
	}
?>