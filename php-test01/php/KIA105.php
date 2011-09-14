<?php
//------------------------------------
// @calling
// @purpose : edit
// @date
// @argment
// @return
//------------------------------------

include_once("../libs/AppCom.php");

	$title_message="Edit";
	
	session_start();
	$smarty = new MySmarty();

	if(isset($_SESSION["ki_user"]["ID"])){
		$s_id   = $_GET["id"];
		$db     =new ComMysql();

		$dat = array();
		$param["@001"] = $s_id;
		$result = $db->GetRecord_byId("KIA105", 1, $param);	
		$i_ct=0;
		while ($row = mysql_fetch_array ($result)) {
			$dat[$i_ct] = $row;
			$i_ct += 1;
		}
	
 		$smarty->assign("title_message", $title_message );
 		$smarty->assign("EA003_id"     , $s_id );
 		$smarty->assign("form_type"    , KI_FORM_TYP_EDIT );
		$smarty->assign("dat"          , $dat);
		$smarty->disp_Layout("KIA103.tpl");
	}else{
	 print( $clsConst->MSG_ERROR_001 );
	}
?>