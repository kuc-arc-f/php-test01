<?php

function init() {
	//MySmartyクラスの読み込み
	require_once($_SERVER["DOCUMENT_ROOT"]. "/../libs/MySmarty.class.php");
	
	//セッションを開始する
	session_start();
	session_regenerate_id(true);

}

//性別のリスト（配列）を返す関数
function getSexList() {
	$sex_value = array(
		"1" => "男性",
		"2" => "女性"
	);
	return $sex_value;
}

//年代のリスト（配列）を返す関数
function getAgeList() {
	$age_value = array(
		"1" => "10代",
		"2" => "20代",
		"3" => "30代",
		"4" => "40代",
		"5" => "50代",
		"6" => "60代以上"
	);
	return $age_value;
}

//動物のリスト（配列）を返す関数
function getAnimalList() {
	$animal_value = array(
		"1" => "いぬ",
		"2" => "ねこ",
		"3" => "らいおん",
		"4" => "きりん",
		"5" => "とら",
		"6" => "うさぎ",
		"7" => "さる",
		"8" => "ぺんぎん",
		"9" => "うま",
		"10" => "ぞう"
	);
	return $animal_value;
}

?>