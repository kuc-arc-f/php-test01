<?php
//------------------------------------
// @calling
// @purpose : DB check.
// @date
// @argment
// @return
//------------------------------------
include_once("../libs/AppCom.php");

	$db     =new ComMysql();
		
	$param["@001"] = $_GET["uid"];
	$result = $db->GetRecord_toArray("KIA108", 1, $param);

	print(json_encode($result));
?>