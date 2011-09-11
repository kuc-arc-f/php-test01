//-------------------------------------------------------------------------------------------------
//@関数名  inStrChk
//		   指定されたチェックモードで入力文字列のチェックを行う。
//		   チェックは入力文字列をUNICODEに変換して行う
//
//
//@param  argFormName		（I）チェックするフォームの名前
//		  argFormIndex		（I）チェックするフォームのインデックス（配列でないときはnullか0）
//		  argTargetName 	（I）チェックするテキストの名前
//		  argTargetIndex	（I）チェックするテキストのインデックス（配列でないときはnullか0）
//
//		  argflg			（I）チェックするモードを指定する
//								 0:半角数字のみの入力を許可
//								 1:半角英字のみの入力を許可
//								 2:半角英数字のみの入力を許可
//								 3:全角カタカナのみの入力を許可
//								 4:全角ひらがなのみの入力を許可
//								 5:半角カタカナのみの入力を許可（一部半角を含む）
//								 6:※使用しない
//								 7:日付書式のみ許可
//								 8:商品コード属性（半角英数字、記号）のみの入力を許可
//								 9:全角文字のみの入力を許可
//								10:全ての入力を許可
//								11:半角英数字：改行付（バーコード入力用）
//								12:半角英数字、アンダースコア、ハイフン、ピリオド（ファイル名用）
//								13:半角数字・小数点のみの入力を許可
//								14:E-Mail書式 (@, - .)) [ex.naka]
//								15:URL 書式 (:,/,-,_))  [ex.naka]
//
//		  WildCardFlg		 (I) ワイルドカード（*）の入力許可フラグ 0:エラー 1:許可
//
//		  mustflg			（I）0：任意  1：必須
//		  maxlength 		（I）入力の最大桁数を指定（バイト単位） ０指定はチェックしない
//		  minlength 		（I）入力の最小桁数を指定（バイト単位） ０指定はチェックしない
//
//		  hyouji_name		（I）メッセージに表示する項目の名称（"電話番号"など）
//
//@return 上記処理モードでチェック後
//		  正常：true
//		  異常：false
//-------------------------------------------------------------------------------------------------
function inStrChk(argFormName, argFormIndex, argTargetName, argTargetIndex,argFlg,WildCardFlg,
				  argMustflg,argMaxLength,argMinLength,hyouji_name){
	var chk_flg    = true;
	var wkflg	   = argFlg;
	var wkmustflg  = argMustflg;
	var wkmsg	   = hyouji_name;
	var wkMaxLen   = argMaxLength;
	var wkMinLen   = argMinLength;
	var rtn
	//チェックする文字列を取得
	var chkTarget  = makeEvalStr(argFormName, argFormIndex, argTargetName, argTargetIndex);
	var wkinStr    = eval(chkTarget + ".value");
	var wkUnicode  = 0;
	
	var WildCardCount = 0;

	//フラグを数値化
	wkflg		=	wkflg + 0;
	wkMaxLen	=	wkMaxLen + 0;
	wkMinLen	=	wkMinLen + 0;

	//必須入力チェック
	if	(wkinStr.length ==	0)	{
		if	(wkmustflg	==	1)	{
			window.alert(wkmsg + "は必須項目です。");
			rtn =	Err_Focus_Move(chkTarget);
			return	false;
		}else{
			//任意入力でデータがない場合はtrue return
			return	true;
		}
	}
	//入力文字列のチェック
	for (i = 0;  i < wkinStr.length;  i++){
		Wk_Unicode = wkinStr.charCodeAt(i); 	//UNICODE に変換
		//チェックモード、入力文字（UNICODE）をチェック関数に引継ぎ判定
		if (isStr(wkflg,WildCardFlg,Wk_Unicode,wkinStr)) {
		   if ((WildCardFlg == 0)&&(Wk_Unicode == 0x002A)){
				window.alert(wkmsg + "に「*」\nは入力できません。");
				rtn =	Err_Focus_Move(chkTarget);
				return false;
		   }else{
				//＊の入力をカウント
				if (Wk_Unicode == 0x002A) {
					WildCardCount = WildCardCount + 1;
				}
				//OK
		   }
		}else{
			//＊の入力をカウント
		   if ((WildCardFlg == 1)&&(Wk_Unicode == 0x002A)){
				if (Wk_Unicode == 0x002A) {
					WildCardCount = WildCardCount + 1;
				}
			   //OK
		   }else{
				chk_flg = false;
				break;
		   }
		}
	}

	//最大桁数チェック
	if	(wkMaxLen	!=	0)	{
		if	(wkMaxLen	<	getLength(wkinStr)) {
			window.alert(wkmsg + "は「" + wkMaxLen + "」文字まで入力可能です。\n（全角を２文字、半角を１文字として数えます）");
			rtn =	Err_Focus_Move(chkTarget);
			return	false;
		}
	}
	//最小桁数チェック
	if	(wkMinLen	!=	0)	{
		if	(wkMinLen	>	getLength(wkinStr)) {
			window.alert(wkmsg + "は「" + wkMinLen + "」文字以上入力して下さい。\n（全角を２文字、半角を１文字として数えます）");
			rtn =	Err_Focus_Move(chkTarget);
			return	false;
		}
	}

	//5:半角カタカナ以外のみの入力
	//前後のスペースチェック
	if	(wkflg == 5) {
		//入力文字数とスペースTrim後の文字数が違う場合はエラー
		if	(getLength(Trim(wkinStr))	!=	 getLength(wkinStr)) {	
			window.alert(wkmsg + "は前後にスペース入力できません。");
			rtn =	Err_Focus_Move(chkTarget);
			return	false;
		}
	}

	//7:日付書式のチェック
	if	(wkflg == 7) {
		chk_flg = inDateChk(wkinStr);
	}

	//エラー存在時
	if (!chk_flg){
		swlabel:
		switch	(wkflg) {
		//0:半角数字のみの入力を許可
		case 0:
			window.alert(wkmsg + "は半角数字のみ入力が可能です。");
			break swlabel;
		//1:半角英字のみの入力を許可
		case 1:
			window.alert(wkmsg + "は半角英字のみ入力が可能です。");
			break swlabel;
		//2:半角英数字のみの入力を許可
		case 2:
			window.alert(wkmsg + "は半角英数字のみ入力が可能です。");
			break swlabel;
		//3:全角カタカナのみの入力を許可
		case 3:
			window.alert(wkmsg + "は全角カタカナのみ入力が可能です。");
			break swlabel;
		//4:全角ひらがなのみの入力を許可
		case 4:
			window.alert(wkmsg + "は全角ひらがなのみ入力が可能です。");
			break swlabel;
		//5:半角カタカナのみの入力を許可（一部半角を含む）
		case 5:
			///window.alert(wkmsg + "には半角カタカナのみ入力が可能です。");
//英小文字の入力を禁止によるメッセージ変更　2002/08/27
			window.alert(wkmsg + "には「 [ 」、「 ^ 」、「 ~ 」、「 | 」、英小文字\n以外の半角文字の入力が可能です。");
			break swlabel;
		//6:使用しない
		case 6:
			window.alert(wkmsg + "には半角数字、「 - 」の入力が可能です。");
			break swlabel;
		//7:使用しない
		case 7:
			window.alert(wkmsg + "には日付書式（YYYY-MM-DD）の入力が可能です。");
			break swlabel;
		//8:商品コード属性（半角英数字、_、ハイフン）のみの入力を許可
		//UPD 20040127 「.」もOK
		case 8:
			window.alert(wkmsg + "は半角英数字、半角カタカナ、半角スペース、\n「 _ 」、「 - 」、「 / 」、「 . 」、「 ' 」、「 " + String.fromCharCode(0x0022) + " 」、「 ( 」、「 ) 」、「 + 」\nのみ入力が可能です。");
			break swlabel;
		//9:全角文字のみの入力を許可
		case 9:
			window.alert(wkmsg + "には全角文字の入力が可能です。");
			break swlabel;
		case 11:
			window.alert(wkmsg + "は半角英数字の入力が可能です。");
			break swlabel;
		case 12:
			window.alert(wkmsg + "は半角英数字「 _ 」、「 - 」、「 . 」の入力が可能です。");
			break swlabel;
		//13:半角数字・小数点のみの入力を許可
		case 13:
//			window.alert(wkmsg + "は半角数字・小数点のみ入力が可能です。");
			window.alert(wkmsg + "は不正な値です。");
			break swlabel;
		case 14:
			window.alert(wkmsg + "は不正な値です。半角英数字、[@][-][_][.]の入力が可能です。");
			break swlabel;
		case 15:
			window.alert(wkmsg + "は不正な値です。");
			break swlabel;
		default:
			break swlabel;
		}
		//エラー個所にフォーカスを移動する
		rtn =	Err_Focus_Move(chkTarget);
	}

	if (chk_flg){
		//「*」のみの入力をチェック
		if ((WildCardFlg == 1)&&(WildCardCount == i)){
			alert(wkmsg + "に「*」\nのみの入力はできません。");
			rtn =	Err_Focus_Move(chkTarget);
			return false;
		}
	}

	return chk_flg;

}
//-------------------------------------------------------------------------------------------------
//@関数名  isStr
//@comment inStrChkの文字列チェック関数
//		   チェックは入力文字列をUNICODEに変換して行う
//
//
//@param   argflg			（I）チェックするモードを指定する（inStrChkの値を引継ぎ）
//								 0:半角数字のみの入力を許可
//								 1:半角英字のみの入力を許可
//								 2:半角英数字のみの入力を許可
//								 3:全角カタカナのみの入力を許可
//								 4:全角ひらがなのみの入力を許可
//								 5:半角カタカナのみの入力を許可（一部半角を含む）
//								 6:電話番号属性（半角数字、ハイフン）のみの入力を許可
//								 7:E-Mail属性（半角英数字、@、ピリオド、ハイフン）のみの入力を許可
//								 8:商品コード属性（半角英数字、_、ハイフン）のみの入力を許可
//								 8:商品コード属性（半角英数字、_、ハイフン）のみの入力を許可
//								 9:全角文字のみの入力を許可
//								 11:半角英数字：改行付（バーコード入力用）
//
//		   WildCardFlg		 (I) ワイルドカード（*）の入力許可フラグ 0:エラー 1:許可
//
//
//		   inUnicode		（I）チェックする文字（UNICODEで収録）
//
//@return 上記処理モードでチェック後
//		  正常：true
//		  異常：false
//-------------------------------------------------------------------------------------------------
function isStr(flg,WildCardFlg,inUnicode,orgStr){
	var wkflg	 = flg;
	var Wk_Unicode = inUnicode;

	//ひらがなの範囲		【ぁ】0x3041 ～ 【ん】0x3093
	//全角カタカナの範囲	【ァ】0x30A1 ～ 【ヶ】0x30F6 ,【ー】0x30FC ,【ヽ】0x30FD ,【ヾ】0x30FE
	//半角カタカナの範囲	【｡】 0xFF61 ～ 【ﾟ】 0xFF9F	
	//全角数値の範囲		【０】0xFF10 ～ 【９】0xFF19
	//全角英字(Upper)の範囲 【Ａ】0xFF21 ～ 【Ａ】0xFF3A
	//全角英字(Lower)の範囲 【ａ】0xFF41 ～ 【ｚ】0xFF5A
	//半角数値の範囲		【0】 0x0030 ～ 【9】 0x0039
	//半角英字(Upper)の範囲 【A】 0x0041 ～ 【Z】 0x005A
	//半角英字(Lower)の範囲 【a】 0x0061 ～ 【z】 0x007A
	//記号の範囲			【_】 0x005F ,【@】 0x0040 ,【-】 0x002D ,【.】 0x002E ,【*】 0x002A	
	//						【!】 0x0021 ,【"】 0x0022 ,【%】 0x0025 ,【&】 0x0026 ,【'】 0x0027
	//						【/】 0x002F ,【;】 0x003B ,【<】 0x003C ,【>】 0x003E ,【[】 0x005B
	//						【\】 0x005C ,【]】 0x005D ,【{】 0x007B ,【|】 0x007C ,【}】 0x007D
	//						【 】 0x0020 ,【(】 0x0028 ,【)】 0x0029 ,【+】 0x002b	

	switch	(wkflg) {
	case 0:
		//0:半角数字のみの入力を許可
		if ((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) {
			return true;
		}else{
			return false;
		}
	case 1:
		//1:半角英字のみの入力を許可
		if (((0x0041 <= Wk_Unicode) && (Wk_Unicode <= 0x005A)) ||
			((0x0061 <= Wk_Unicode) && (Wk_Unicode <= 0x007A))) {
			return true;
		}else{
			return false;
		}
	case 2:
		//2:半角英数字のみの入力を許可
		if (((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) ||
			((0x0041 <= Wk_Unicode) && (Wk_Unicode <= 0x005A)) ||
			((0x0061 <= Wk_Unicode) && (Wk_Unicode <= 0x007A))) {
			return true;
		}else{
			return false;
		}
	case 3:
		//3:全角カタカナのみの入力を許可
		if (((0x30A1 <= Wk_Unicode) && (Wk_Unicode <= 0x30F6)) ||
			(Wk_Unicode == 0x30FC) ||	
			(Wk_Unicode == 0x30FD) ||	
			(Wk_Unicode == 0x30FE)) {
			return true;
		}else{
			return false;
		}
	case 4:
		//4:全角ひらがなのみの入力を許可
		if	((0x3041 <= Wk_Unicode) && (Wk_Unicode <= 0x3093)) {
			return true;
		}else{
			return false;
		}
	case 5:
		//5:半角カタカナチェック（商品型番チェックと同様）
		//（半角英数字,半角カタカナ、記号）のみの入力を許可
		//記号の範囲	【"】 0x0022 ,【'】 0x0027 ,【(】 0x0028 ,【)】 0x0029
		//				【+】 0x002b ,【-】 0x002D ,【/】 0x002F ,【_】 0x005F
		//				【 】 0x0020 
		//				【ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ】 0xff66 ～ 0xff9f
//		if (((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) ||
//			((0x0041 <= Wk_Unicode) && (Wk_Unicode <= 0x005A)) ||
//			((0x0061 <= Wk_Unicode) && (Wk_Unicode <= 0x007A)) ||
//			(Wk_Unicode == 0x0022)||
//			(Wk_Unicode == 0x0027)||
//			(Wk_Unicode == 0x0028)||
//			(Wk_Unicode == 0x0029)||
//			(Wk_Unicode == 0x002b)||
//			(Wk_Unicode == 0x002D)||
//			(Wk_Unicode == 0x002F)||
//			(Wk_Unicode == 0x005F)||
//			((Wk_Unicode >= 0xff66) && (Wk_Unicode <= 0xff9f))||
//			(Wk_Unicode == 0x0020)){
//STEP用にチェックを強化　2002/08/26
		if (
			((Wk_Unicode >= 0x0020)&&(Wk_Unicode <= 0x00A5))||
			((Wk_Unicode >= 0xFF60)&&(Wk_Unicode <= 0xFF9F))
		){
		   return true;
		}else{
			return false;
		}
	case 6:
		//6:電話番号属性（半角数字、ハイフン）のみの入力を許可
		if (((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) ||
			(Wk_Unicode == 0x002D)){
		   return true;
		}else{
			return false;
		}
	case 7:
		//7:E-Mail属性（半角英数字、@、ピリオド、ハイフン）のみの入力を許可
		if (((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) ||
			((0x0041 <= Wk_Unicode) && (Wk_Unicode <= 0x005A)) ||
			((0x0061 <= Wk_Unicode) && (Wk_Unicode <= 0x007A)) ||
			 (Wk_Unicode == 0x005F) ||
			 (Wk_Unicode == 0x0040) ||
			 (Wk_Unicode == 0x002D) ||
			 (Wk_Unicode == 0x002E)) {
			return true;
		}else{
			return false;
		}
	case 8:
		//商品コードチェック
		//記号の範囲	【"】 0x0022 ,【'】 0x0027 ,【(】 0x0028 ,【)】 0x0029
		//				【+】 0x002b ,【-】 0x002D ,【/】 0x002F ,【_】 0x005F
		//				【 】 0x0020 ,【.】 0x002E
		//				【ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ】 0xff66 ～ 0xff9f
		if (((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) ||
			((0x0041 <= Wk_Unicode) && (Wk_Unicode <= 0x005A)) ||
			((0x0061 <= Wk_Unicode) && (Wk_Unicode <= 0x007A)) ||
			(Wk_Unicode == 0x0022)||
			(Wk_Unicode == 0x0027)||
			(Wk_Unicode == 0x0028)||
			(Wk_Unicode == 0x0029)||
			(Wk_Unicode == 0x002b)||
			(Wk_Unicode == 0x002D)||
			(Wk_Unicode == 0x002E)||
			(Wk_Unicode == 0x002F)||
			(Wk_Unicode == 0x005F)||
			((Wk_Unicode >= 0xff66) && (Wk_Unicode <= 0xff9f))||
			(Wk_Unicode == 0x0020)){
		   return true;
		}else{
			return false;
		}
	case 9:
		//9:全角文字のみ入力を許可
		if	(((0x00A6 <= Wk_Unicode) && (Wk_Unicode <= 0xFF60)) ||
			(Wk_Unicode == 0xFFE3) ||
			(Wk_Unicode == 0xFFE5) ||
			(Wk_Unicode == 0x002A)){
			return true;
		}else{
			return false;
		}
	case 10:
		//10:全文字を許可
		return true;
	case 11:
		//11:半角英数字：改行の入力を許可（バーコード入力用）
//		if (((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) ||
//			((0x0041 <= Wk_Unicode) && (Wk_Unicode <= 0x005A)) ||
//			((0x0061 <= Wk_Unicode) && (Wk_Unicode <= 0x007A)) ||
//			(Wk_Unicode == 0x000D) ||
//			(Wk_Unicode == 0x000A) ||
//			(Wk_Unicode == 0x002C) ||
//			(Wk_Unicode == 0x0020)) {
//			return true;
//		}else{
//			return false;
//		}

		if (((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) ||
			((0x0041 <= Wk_Unicode) && (Wk_Unicode <= 0x005A)) ||
			((0x0061 <= Wk_Unicode) && (Wk_Unicode <= 0x007A)) ||
			(Wk_Unicode == 0x000D) ||
			(Wk_Unicode == 0x000A) ||
			(Wk_Unicode == 0x002C) ||
			(Wk_Unicode == 0x0022)||
			(Wk_Unicode == 0x0027)||
			(Wk_Unicode == 0x0028)||
			(Wk_Unicode == 0x0029)||
			(Wk_Unicode == 0x002b)||
			(Wk_Unicode == 0x002D)||
			(Wk_Unicode == 0x002E)||
			(Wk_Unicode == 0x002F)||
			(Wk_Unicode == 0x005F)||
			((Wk_Unicode >= 0xff66) && (Wk_Unicode <= 0xff9f))||
			(Wk_Unicode == 0x0020)){
		   return true;
		}else{
			return false;
		}
	case 12:
		//12:ファイル名属性（半角英数字、ピリオド、ハイフン、アンダースコア）のみの入力を許可
		if (((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) ||
			((0x0041 <= Wk_Unicode) && (Wk_Unicode <= 0x005A)) ||
			((0x0061 <= Wk_Unicode) && (Wk_Unicode <= 0x007A)) ||
			 (Wk_Unicode == 0x005F) ||
			 (Wk_Unicode == 0x002D) ||
			 (Wk_Unicode == 0x002E)) {
			return true;
		}else{
			return false;
		}
	case 13:
		//13:小数属性（半角数字、小数点）のみの入力を許可
		if (((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) ||
			(Wk_Unicode == 0x002E)){
			var parts	= orgStr.split('.') ;
			if (parts.length > 2) {
				return false ;
			}
			if (parts[0] == undefined || (parts[1] != undefined && parts[0].length == 0 && parts[1].length == 0)) {
				return false ;
			}
//			if (parts[1] != undefined  && parts[1].length > digLength) {
//				return false ;
//			}
		   return true;
		}else{
			return false;
		}
	case 14:
		//14:E-Mail属性（半角英数字、@、ピリオド、ハイフン）のみの入力を許可
		if (((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) ||
			((0x0041 <= Wk_Unicode) && (Wk_Unicode <= 0x005A)) ||
			((0x0061 <= Wk_Unicode) && (Wk_Unicode <= 0x007A)) ||
			 (Wk_Unicode == 0x005F) ||
			 (Wk_Unicode == 0x0040) ||
			 (Wk_Unicode == 0x002D) ||
			 (Wk_Unicode == 0x002E)) {
			return true;
		}else{
			return false;
		}
	case 15:
		//15:URL 属性（半角英数字、etc）のみの入力を許可
		if (((0x0030 <= Wk_Unicode) && (Wk_Unicode <= 0x0039)) ||
			((0x0041 <= Wk_Unicode) && (Wk_Unicode <= 0x005A)) ||
			((0x0061 <= Wk_Unicode) && (Wk_Unicode <= 0x007A)) ||
			 (Wk_Unicode == 0x005F) ||
			 (Wk_Unicode == 0x002D) ||
			 (Wk_Unicode == 0x002E) ||
			 (Wk_Unicode == 0x002F) ||
			 (Wk_Unicode == 0x003A)) {
			return true;
		}else{
			return false;
		}
	default:
			window.alert ("システムエラー。管理者ＣＡＬＬ。");
			return false;
	}
}

var digLength = 0 ;
function setDigLength( num ) {
	if (num) {
		digLength	= num ;
	}
}

//-------------------------------------------------------------------------------------------------
// 関数名 ：chkElementArray
//          ターゲットオブジェクトが配列なのかどうかをチェック
// @param ：argFormName    （I）チェックするフォームの名前
//        ：argTargetName  （I）チェックするコントロールの名前
//        ：argTargetIndex （I）チェックするテキストのインデックス（配列でないときはnullか0）
// @return：true 配列である。  false:配列ではない。
// 備考   ：フォームが配列の場合は、formname[0]のようにインデックスまで指定する
//-------------------------------------------------------------------------------------------------
function chkElementArray(argFormName, argTargetName, argTargetIndex){
    var ArrayFlg;

    // 引数にnullがきたときは配列ではないので無条件にfalse。
    if (argTargetIndex == null){
        ArrayFlg = false;

    // 引数に1以上がきたときは配列なので無条件にtrue。
    }else if (argTargetIndex >= 1) {
        ArrayFlg = true;

    // ゼロのときは配列か配列じゃないかわからないので判定処理。
    }else{
        var str = "document." + argFormName + "." + argTargetName + ".length";
        if (isNaN(eval(str)) == false){
            ArrayFlg = true;
        }
        else{
            ArrayFlg = false;
        }
    }
    return ArrayFlg;
}

//-------------------------------------------------------------------------------------------------
//@関数名  getLength
//@comment 文字列のバイト数を求める
//         ２バイト文字＝２、１バイト文字＝１となる
//
//@param   argTarget            （I）チェック文字列
//
//@return 引数文字列のバイト数
//-------------------------------------------------------------------------------------------------
function getLength(argTarget) {
    var wkstr   = argTarget;
    var len     = wkstr.length;
    var n       = 0;
    var i;
    
    for(i = 0; i < len; i++) {
        if(iszenkaku(wkstr.charCodeAt(i))){ //全角 UNICODEで判定
            n+=2;
        }else{
            n++;
        }
    }
    return n;                               //文字数をリターン
}

//-------------------------------------------------------------------------------------------------
//@関数名  iszenkaku
//@comment 全角文字チェック
//
//@param   Unicode  （I）チェック文字（１文字）
//
//@return 全角：true
//        半角：false
//-------------------------------------------------------------------------------------------------
function iszenkaku(Unicode) {
    var Wk_Unicode = Unicode;

    //UNICODE  0x0020 ～ 0x007E までは半角とみなす
    //         上記以外を全角とみなす
    if ((0x0020 <= Wk_Unicode) && (Wk_Unicode <= 0x007E)) {
        return false;                                       //半角
    }else{
		//半角カタカナを1バイトとする（DDIPカスタマイズ　2002/06/18）
		//ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ
		if ((Wk_Unicode >= 0xff60)&&(Wk_Unicode <= 0xff9f)) {
			return false;
		}
        return true;                                        //全角
    }
}

//-------------------------------------------------------------------------------------------------
//@関数名  Err_Focus_Move
//@comment エラー個所にフォーカスを移動する
//
//
//@param   argTarget        （I）移動するフォームの定義（makeEvalStrにて作成した文字列）
//
//@return 上記処理モードでチェック後
//        正常：true
//        異常：false
//-------------------------------------------------------------------------------------------------
function Err_Focus_Move(argTarget){
    var str;
    var rtn;
		
	if (eval(argTarget).type == "hidden") {
	    return true;	
	}
	
    //エラー個所にフォーカスを移動する
    str = argTarget + ".focus()";
    rtn = eval(str);
    str = argTarget + ".select()";
    rtn = eval(str);

    return true;
}

//-------------------------------------------------------------------------------------------------
//@関数名  LTrim
//@comment LTrim
//
//@param   argStr           （I）文字列
//
//@return 空白除去左文字列
//-------------------------------------------------------------------------------------------------
  function LTrim(argstr){
    var wkstr = argstr;
    while(wkstr.charAt(0)==" " || wkstr.charAt(0)=="　"){
      wkstr = wkstr.substring(1,wkstr.length)
    }
    return(wkstr); 
  }

//-------------------------------------------------------------------------------------------------
//@関数名  RTrim
//@comment RTrim
//
//@param   argStr           （I）文字列
//
//@return 空白除去右文字列
//-------------------------------------------------------------------------------------------------
  function RTrim(argstr){
    var wkstr = argstr;
    while(wkstr.charAt(wkstr.length-1)==" " || wkstr.charAt(wkstr.length-1)=="　"){
      wkstr = wkstr.substring(0,wkstr.length-1)
    }
    return(wkstr); 
  }
  
//-------------------------------------------------------------------------------------------------
//@関数名  Trim
//@comment Trim
//
//@param   argStr           （I）文字列
//
//@return 空白除去左右文字列
//-------------------------------------------------------------------------------------------------
//正規表現
  function Trim(argstr){
    var wkstr = argstr;
    wkstr = wkstr.replace(/^[ 　]+/,"");
    wkstr = wkstr.replace(/[ 　]+$/,"");
    return(wkstr);
  }
  
//-------------------------------------------------------------------------------------------------
// 関数名 ：makeEvalStr
//          フォームの中のコントロールを示唆する文字列を配列を加味して作成
// @param ：argFormName     （I）チェックするフォームの名前
//        ：argFormIndex    （I）チェックするフォームのインデックス（配列でないときはnullか0）
//        ：argTargetName   （I）チェックするテキストの名前
//        ：argTargetIndex  （I）チェックするテキストのインデックス（配列でないときはnullか0）
// @return：作成された文字列
//-------------------------------------------------------------------------------------------------
function makeEvalStr(argFormName, argFormIndex, argTargetName, argTargetIndex){
    var str;
    var wk_formname;
    var formsidx;
    // フォームが配列なのかどうかをチェック
    formsidx = chkFormArray(argFormName, argFormIndex);
    if (formsidx != null){
        wk_formname = "forms[" + formsidx + "]";
    }
    else{
        wk_formname = argFormName;
    }
    // テキストが配列なのかどうかをチェック
    if (chkElementArray(wk_formname, argTargetName, argTargetIndex) == true){
        str = "document." + wk_formname + "." + argTargetName + "[" + argTargetIndex + "]";
    }
    else{
        str = "document." + wk_formname + "." + argTargetName;
    }
    return(str);
}

//-------------------------------------------------------------------------------------------------
// 関数名 ：chkFormArray
//          フォームが配列なのかどうかをチェック
// @param ：argFormName     （I）チェックするフォームの名前
//        ：argTargetIndex  （I）チェックするテキストのインデックス（配列でないときはnullか0）
// @return：null 配列ではない
//          数値 document.formsのインデックス
//-------------------------------------------------------------------------------------------------
function chkFormArray(argFormName, argTargetIndex){
    var ArrayIdx = null;
    var FormCount = 0;
    var svIdx = null;

    // 引数にnullがきたときは配列ではないので何もしない
    if (argTargetIndex == null){
    }else{
        var formcnt = document.forms.length;

        // NNの場合、eval(フォーム名[idx])だと実行時エラーが起きるため、
        // formsで置き換えて処理する。ただし、別名のフォームがドキュメントに
        // あるかもしれないので、forms配列の中から指定されたものを探してインデックスを置き換える。
        for (var i = 0; i < formcnt; i++) {

            // 同じ名称のフォームが複数あったら配列。
            if ((document.forms[i].name == argFormName )){ 

                // ターゲットのインデックスに該当するformsインデックスを取得。
                if (FormCount == argTargetIndex){
                    svIdx = i;
                }

                FormCount += 1;

                // 配列であることが証明され、なおかつ、formsインデックスも取得できたらＥＸＩＴ
                if ((FormCount > 1) && (svIdx != null)){
                    ArrayIdx = svIdx;
                    break;
                }
            }
        }
    }
    return ArrayIdx;
}

/**************************************************************** 
* 機　能： 入力された値が日付でYYYY-MM-DD形式になっているか調べる 
* 引　数： datestr　入力された値 
* 戻り値： 正：true　不正：false 
****************************************************************/ 
function inDateChk(datestr) { 
    // 正規表現による書式チェック 
    if(!datestr.match(/^\d{4}\-\d{2}\-\d{2}$/)){ 
        return false; 
    } 
    var vYear = datestr.substr(0, 4) - 0; 
    var vMonth = datestr.substr(5, 2) - 1; // Javascriptは、0-11で表現 
    var vDay = datestr.substr(8, 2) - 0; 
    // 月,日の妥当性チェック 
    if(vMonth >= 0 && vMonth <= 11 && vDay >= 1 && vDay <= 31){ 
        var vDt = new Date(vYear, vMonth, vDay); 
        if(isNaN(vDt)){ 
            return false; 
        }else if(vDt.getFullYear() == vYear && vDt.getMonth() == vMonth && vDt.getDate() == vDay){ 
            return true; 
        }else{ 
            return false; 
        } 
    }else{ 
        return false; 
    } 
}

//-------------------------------------------------------------------------------------------------
//inStrChkで使用する定数を定義
//チェックするモードを指定する
var HNum		= 0		//:半角数字のみの入力を許可
var HAlph		= 1		//:半角英字のみの入力を許可
var HChar		= 2		//:半角英数字のみの入力を許可
var AKtkn		= 3		//:全角カタカナのみの入力を許可
var AHrgn		= 4		//:全角ひらがなのみの入力を許可
var HKtkn		= 5		//:入力禁止文字以外の半角項目を入力可能
var HNumHyphen  = 6     //:半角数字+ハイフンを許可
var Mail		= 7		//:E-Mail属性（半角英数字、@、ピリオド、ハイフン）のみの入力を許可
var SCode		= 8		//:商品コード属性（半角英数字、_、ハイフン）のみの入力を許可
var AChar		= 9		//:全角文字のみの入力を許可
var AllOk		= 10	//:全ての文字を許可
var Step		= 5		//STEP制限文字の入力を禁止（HKtknと同内容）
var Fname		= 12	//:ファイル名属性（半角英数字、アンダースコア、ピリオド、ハイフン）のみの入力を許可
var HDecFra     = 13    //:小数（半角数字、ピリオド）のみの入力を許可

//WildCardFlg		 (I) ワイルドカード（*）の入力許可フラグ 0:エラー 1:許可
var WCardOn		= 1
var WCardOff	= 0

//mustflg			（I）0：任意  1：必須
var MustOn		= 1
var MustOff		= 0


var digLength	= 0 ;	// 小数桁数