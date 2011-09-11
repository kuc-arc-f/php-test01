<?php

// ルートディレクトリを変数にセットする
// define("ROOT_DIR", $_SERVER['DOCUMENT_ROOT']."/..");

// Smartyクラスを呼び出す
require_once("Smarty.class.php");

// require_once("AppConst.php");

// Smartyクラスを継承したMySmartyクラスを作成する
class MySmarty extends Smarty {
	
	// 変数
	//public $AppConst;
	
	//コンストラクタ（コンストラクタとは、オブジェクトを生成する際に呼び出されて内容の初期化などを行なうメソッドです。
	function MySmarty () {
		$clsConst = new AppConst();

		// テンプレートディレクトリの上書き
		 $this->template_dir   = KI_ROOT_DIR . "/templates";
		
		// コンパイルディレクトリの上書き
		 $this->compile_dir    = KI_ROOT_DIR . "/templates_c";
		
		// 左右デリミタの上書き
		// $this->left_delimiter  = "{{";   // デミリタとは、Smartyの変数や関数などを区切る記号です。
		// $this->right_delimiter = "}}";   // デフォルトのデミリタだと開始区切りが「{」で終了区切りが「}」で区切るとSmartyの処理として認識される設定になっています。
		
		                                             // デフォルトで全ての変数にescapeをかける
		// $this->default_modifiers = array('escape');  // Smartyのテンプレート内で使用するすべての変数にきまった処理を実行します。
		                                             // ここでは、「escape」という処理を行う設定にします。
		
		// Smartyクラスのコンストラクタの呼び出し
		$this->Smarty();
		
		// Const
		$base_dir   = KI_ROOT_URL;
		$this->assign("KI_ROOT_DIR", $base_dir );
		$this->assign("KI_ROOT_URL", $base_dir );
		$this->assign("PUBLIC_DIR"  , $base_dir . "/public");
		$this->assign("PHP_DIR"     , $base_dir . "/php");
		$this->assign("IMAGE_DIR"   , $base_dir . "/image");
		$this->assign("IMAGE_DIR_USER"   , $base_dir . "/image_user");
		$this->assign("KI_SERVER_NAME"    , YT_SERVER_NAME);
		$this->assign("APP_CONST"    , $clsConst);
	}
	
	//
	// function getLayout(){
	// 	return "/Layout/anq_main.tpl";
	// 	}
	
	//------------------------------------
	// @calling
	// @purpose
	// @date
	// @argment
	// @return
	//------------------------------------
	function disp_Layout ( $tpl_name ) {
		$this->display($this->template_dir . "/Layout/ki_head.tpl");
		$this->display($this->template_dir . "/" .$tpl_name );
		$this->display($this->template_dir . "/Layout/ki_foot.tpl");
	}
}
?>