//------------------------------------
// @calling : 
// @purpose :
// @date    :
// @argment :
// @return  :
//------------------------------------
function EA002_AutoComp( uid ) {
/*
	new Ajax.Autocompleter("txt_ken", "choices", "./EA013.php", {
		paramName:"p",
		minChars:1
	});
  */

	new Ajax.Autocompleter("txt_ken", "choices", "/bm/php/EA013.php", {
		paramName: 'key',
		parameters: 'uid='+ uid,
		minChars:1
	});	
}
//------------------------------------
// @calling : 
// @purpose :
// @date    :
// @argment :
// @return  :
//------------------------------------
function EA003_AutoComp( uid ) {

	new Ajax.Autocompleter("txt_biko", "choices", "/bm/php/EA018.php", {
		paramName: 'key',
		parameters: 'uid='+ uid,
		minChars:1
	});	
}
//------------------------------------
// @calling : 
// @purpose :
// @date    :
// @argment :
// @return  :
//------------------------------------
function EA002_ken( url ) {
	document.form1.action= url;
	document.form1.submit();
}

//------------------------------------
// @calling : 
// @purpose :
// @date    :
// @argment :
// @return  :
//------------------------------------
function EA013_getAjax( url ) {
// alert('#_SA002_getNext_Ajax');

//		url +='?time='+ s_time+'&SA002_id='+ uid+'&SA002_m_id='+i_mid;
		var str = Form.serialize('form1'); 
		new Ajax.Request
		(
			url,
			{
				"method": "GET", 
				"parameters": str,
			    onSuccess: function(transport){
			      alert( transport.responseText );
			      var dat = eval( '(' + transport.responseText + ')' );
  			      alert(dat.ct_num );
		          if(parseInt(dat.ct_num) > 0){
			          return false;
  			      }else{
	  			      alert('dat.ct_num=0');
  			      }
		          return true;
			    },
			    onFailure: function(){
	  			      alert('Ajax Request Error [Something went wrong...]');
			    }
			}
		);
//	return false;
}
//------------------------------------
// @calling : 
// @purpose :
// @date    :
// @argment :
// @return  :
//------------------------------------
function EC006_chekAjax( url ,uid ) {

		var str = Form.serialize('form1'); 
		new Ajax.Request
		(
			url+ '?uid='+ uid,
			{
				"method": "GET", 
				"parameters": str,
			    onSuccess: function(transport){
					  // alert( transport.responseText );
				      var dat = eval( '(' + transport.responseText + ')' );
	//  			      alert(dat[0].CT_NUM );
	  			      if(parseInt(dat[0].CT_NUM) > 0){
				          alert(uid +' 様は登録済みです。');
				          return false;
	  			      }
					  document.form1.submit();
					  return false;  			      				
			    },
			    onFailure: function(){ alert('Something went wrong...') }
			}
		);
	return false;
}
//------------------------------------
// @calling : 
// @purpose :
// @date    :
// @argment :
// @return  :
//------------------------------------
function EA016_url( url) {

		var s_url = $('txt_url').value;

		var str = Form.serialize('form1'); 
		new Ajax.Request
		(
			url+ '?s_url='+ s_url,
			{
				"method": "GET", 
				"parameters": str,
			    onSuccess: function(transport){
					  alert( transport.responseText );
					  return false;  			      				
/*
				      var dat = eval( '(' + transport.responseText + ')' );
	  			      if(parseInt(dat[0].CT_NUM) > 0){
				          alert(uid +' 様は登録済みです。');
				          return false;
	  			      }
					  document.form1.submit();
					  return false;  			      				
 */					  
			    },
			    onFailure: function(){ alert('Something went wrong...') }
			}
		);
	return false;
}
 