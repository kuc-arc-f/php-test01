//
  function doFocus() {
  	document.loginform.user_login_id.focus();
  
  //login	
  if ($('auto_login').value=='1' ){
//  alert('auto_login');
	  if (($('user_login_id').value != '') && ($('user_password').value != '')) {}
	  	  	document.loginform.submit();
	  }
  }

//------------------------------------
// @calling : 
// @purpose :
// @date    :
// @argment :
// @return  :
//------------------------------------
function KIA103_del( url, msg ) {
	if (confirm( msg )) {
		document.form1.
		location.href= url;
	}
}
