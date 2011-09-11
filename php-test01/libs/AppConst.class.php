<?PHP
class AppConst {
	
	var $val01 = 'val01_###';

	// Const
	var $NEXT_INTERVAL= 90;
	var $VAL001_IMAGE_NORMAL ="00_default.png";
	var $VAL001_PAGE_MAX= 20;
	var $VAL003_PAGE_TEST= 10;
	var $VAL004_Pager_Delta= 10;
	var $VAL005_Pager_NextImg   = "次へ &gt;&gt;";
	var $VAL006_Pager_PrevtImg  ="&lt;&lt; 前へ";
	var $VAL007_MAX_NUM_KINTAI =  30;
	var $VAL008_MAX_AUTO       = 100;
	var $VAL009_MAX_GET_REST   = 70;
	var $VAL013_MAX_USER_NUM   = 100;
	var $VAL014_WEB_IE         = "IE";

	//
	var $NUM_KIA006_100   = 100;
	var $NUM_KIA006_500   = 500;
	var $NUM_KIA006_1000  = 1000;
	var $NUM_KIA006_2000  = 2000;
	var $NUM_KIA006_5000  = 5000;
	var $NUM_KIA006_10000 = 10000;

	// Message
	var $MSG_001 = 'Copyright 2009-2010 ';
	var $MSG_002 = "KUC.kakebo";
	var $MSG_003 = "KUC.kakebo for php for php v1.0.4";
	var $MSG_004 = "トライアル版";
	var $MSG_005 = "削除します、宜しいですか？";
	var $MSG_006 = "登録します、宜しいですか？";
	var $MSG_007 = "指定なし";

	// Message_ERROR
	var $MSG_ERROR_001 = "Argment Error";
	var $MSG_ERROR_002 = "時間内制限数を超えました。しばらく経ってから登録下さい";
	var $MSG_ERROR_003 = "Over GetCount";
	var $MSG_ERROR_004 = "Data Insert Error";
	var $MSG_ERROR_005 = "Data Update Error";
	var $MSG_ERROR_006 = "Data Delete Error";
	var $MSG_ERROR_007 = "sorry, Max Account Over.. this System";
	var $MSG_ERROR_008 = "Data Select Error";
	var $MSG_ERROR_009 = "sorry, this System IE or Chrome required.";

	var $MSG_001_TEST = '##MSG_001_TEST';
	var $MSG_002_TEST = '##MSG_00[21_TEST';
	public $PUBLIC_DIR = "/public";

	function __construct(){
	}
}
?>