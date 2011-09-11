<?php
//DB
define("KI_DB_HOST", "");
define("KI_DB_NAME", "");
define("KI_DB_USER", "");
define("KI_DB_PASS", "");

// 
define("ROOT_DIR"   , $_SERVER['DOCUMENT_ROOT'] . "/..");
define("KI_ROOT_DIR", $_SERVER['DOCUMENT_ROOT'] . "/kinen" );
define("KI_IMAGE_USR_DIR",  KI_ROOT_DIR . "/image_user/");

//define("KI_ROOT_DIR", $_SERVER['DOCUMENT_ROOT']."/kake");
define("KI_ROOT_URL",  "/kinen");
define("PUBLIC_DIR"  , ANQ_ROOT_URL ."/public");
define("PHP_DIR"     , ANQ_ROOT_URL ."/php");
define("LOG_FLG"     , true);
define("LOG_FNAME"   , YT_ROOT_DIR . "/log/error_php.log");				// エラー用ログファイルパス

//URL
define("KI_SERVER_NAME", $_SERVER['SERVER_NAME']);


// Cook= 30 Day
$i_cook_exp = 3600 * 24 * 30;

define("KI_COOK_EXPR",  $i_cook_exp);
define("KI_COOK_USER" ,"ki_user_id");
define("KI_COOK_PASS" ,"ki_user_pass");

//CODE
define("RET_CODE_OK"   , 1 );
define("RET_CODE_NG"   , 0 );

define("KI_FORM_TYP_NEW"    , 1 );
define("KI_FORM_TYP_EDIT"   , 2 );

//Message
define("MSG_001"   , "Copyright 2009-2010 KUC Inc. All right reserved. ");
?>