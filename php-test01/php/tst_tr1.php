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
		
		$db     =new ComMysql();
		//(1)
		$result = $db->Exec_NonQuery03( "SET AUTOCOMMIT=0;" );
		if ($result == false) {
		  exit;
		}
		//(2) Start
		$result = $db->Exec_NonQuery03( "START TRANSACTION;" );
		if ($result == false) {
		  exit;
		}
		//(3) exec_01
		$result = $db->Exec_NonQuery03( "UPDATE KI_TR_TST01 SET S_CD='300' WHERE ID=27;" );
		if ($result == false) {
		  $result02 = $db->Exec_NonQuery03( "ROLLBACK;" );
  		  $_SESSION["error_meaasge"] =  $clsConst->MSG_ERROR_005;
		  header( "Location: ./error.php" );
		  exit;
		}
		//(4) exec_02
		$result = $db->Exec_NonQuery03( "UPDATE KI_TR_TST01 SET USER_ID =  WHERE ID=27;" );
		if ($result == false) {
		  $result02 = $db->Exec_NonQuery03( "ROLLBACK;" );
  		  $_SESSION["error_meaasge"] = $clsConst->MSG_ERROR_005;
		  header( "Location: ./error.php" );
		  exit;
		}
		//(5) commit;
		$result = $db->Exec_NonQuery03( "COMMIT;" );
		if ($result == false) {
  		  $_SESSION["error_meaasge"] = "DB Error.";
		  header( "Location: ./error.php" );
		  exit;
		}
?>