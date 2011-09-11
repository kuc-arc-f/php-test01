<?php
//------------------------------------
// @calling
// @purpose :
// @date
// @argment
// @return
//------------------------------------
include_once("../libs/AppCom.php");

	session_start();
	$clsConst = new AppConst();
	
	if(isset($_SESSION["ki_user"]["ID"])){
		$smarty = new MySmarty();
		$db     =new ComMysql();

		$dat = array();
		$param["@001"] = $_SESSION["ki_user"]["ID"];

		$i_ct=0;
		$result = $db->GetRecord_byId("KIA101", 1, $param);	
		while ($row = mysql_fetch_array ($result)) {
			$dat[$i_ct] = $row;
			$i_ct +=1;
		}
		$smarty->assign("result", $dat);
		//
		$smarty->disp_Layout("KIA101.tpl");
	}else{
		$_SESSION["error_meaasge"] = $clsConst->MSG_ERROR_001;
		header( "Location: ./error.php" );
	}
?>