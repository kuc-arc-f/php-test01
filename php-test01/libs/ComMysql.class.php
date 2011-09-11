<?php
require_once("AppCom.php");
	
//------------------------------------
// @calling
// @purpose : Mysql共通
// @date
// @argment
// @return
//------------------------------------
class ComMysql{
	
	public $Con;
	
	//------------------------------------
	// @calling
	// @purpose
	// @date
	// @argment
	// @return
	//------------------------------------
	function Connect(){
		//MySQLへ接続
			$this->Con = mysql_connect (KI_DB_HOST ,KI_DB_USER , KI_DB_PASS);

			if ($this->Con   == false) {
			    $message  = 'Invalid query: ' . mysql_error() . "\n";
			    $message .= 'Whole query: ' . $query;
			    die($message);
				return false;
			} 
			
			//MySQLのデータベースを選択
			$select_db = mysql_select_db ( KI_DB_NAME , $this->Con  ); 
			if ($select_db == false) {
				print "DB_SELECT Error!";
				return false;
			}

		return false;
	}
	
	//------------------------------------
	// @calling
	// @purpose
	// @date
	// @argment
	// @return
	//------------------------------------
	function GetRecord( $sql ){
		$result = mysql_query ("SET NAMES utf8;" , $this->Con );
		$result = mysql_query ($sql , $this->Con );

		return $result;
	}
	
	//------------------------------------
	// @calling
	// @purpose
	// @date
	// @argment : param=条件
	// @return  : array
	//------------------------------------
	function GetRecord_toArray( $sql_id, $sql_no,  $param ){
		$s_ret ="";

		$result = mysql_query ("SELECT SQL_TEXT FROM KI_MS_SQL WHERE SYSTEM_ID='" . $sql_id . "' AND SQL_NO=" . $sql_no , $this->Con );
		if (!$result) {
		    $message  = 'Invalid query: ' . mysql_error() . "\n";
		    $message .= 'Whole query: ' . $query;
		    die($message);
		    return false;
		}
		
		while ($row = mysql_fetch_array ($result)) {
			$s_ret = $row["SQL_TEXT"];
		}

		// replace
		foreach( $param as $key => $value){
			$s_ret  = str_replace($key, $value, $s_ret );
		}
		
		
		$result = $this->GetRecord( $s_ret );

		$i_ct=0;
		while ($row = mysql_fetch_array ($result)) {
			$data[$i_ct] = $row;
			$i_ct += 1;
		}
	
		return $data;
	}
	
	//------------------------------------
	// @calling
	// @purpose
	// @date
	// @argment : param=条件
	// @return
	//------------------------------------
	function GetRecord_byId( $sql_id, $sql_no,  $param ){
		$s_ret ="";

		$result = mysql_query ("SELECT SQL_TEXT FROM KI_MS_SQL WHERE SYSTEM_ID='" . $sql_id . "' AND SQL_NO=" . $sql_no , $this->Con );
		if (!$result) {
		    $message  = 'Invalid query: ' . mysql_error() . "\n";
		    $message .= 'Whole query: ' . $query;
		    die($message);
		    return false;
		}
		
		while ($row = mysql_fetch_array ($result)) {
			$s_ret = $row["SQL_TEXT"];
		}

		// replace
		foreach( $param as $key => $value){
			$s_ret  = str_replace($key, $value, $s_ret );
		}
		
		
//var_dump( $s_ret );
		$result = $this->GetRecord( $s_ret );

		return $result;
	}

	//------------------------------------
	// @calling
	// @purpose
	// @date
	// @argment : param=条件
	// @return
	//------------------------------------
	function Exec_NonQuery( $sql_id, $sql_no,  $param ){
		$s_ret ="";

		$result = mysql_query ("SELECT SQL_TEXT FROM KI_MS_SQL WHERE SYSTEM_ID='" . $sql_id . "' AND SQL_NO=" . $sql_no , $this->Con );
		if (!$result) {
		    $message  = 'Invalid query: ' . mysql_error() . "\n";
		    $message .= 'Whole query: ' . $query;
		    die($message);
		    return false;
		}
		
		while ($row = mysql_fetch_array ($result)) {
			$s_ret = $row["SQL_TEXT"];
		}

		// replace
		foreach( $param as $key => $value){
			$s_ret  = str_replace($key, $value, $s_ret );
		}
		
		$result = mysql_query ("SET NAMES utf8;" , $this->Con );
		$ret = mysql_query( $s_ret ,$this->Con );

		return $ret;
	}	
	
	//------------------------------------
	// @calling
	// @purpose
	// @date
	// @argment
	// @return
	//------------------------------------
	function ComMysql(){
		$ret = $this->Connect();
	}
	
}
?>