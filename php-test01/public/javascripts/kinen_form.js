//------------------------------------
// @calling : 
// @purpose :
// @date    :
// @argment :
// @return  :
//------------------------------------
function KIA103_chekAjax( url ,uid ) {

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
				          alert(uid +' already Saved.');
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

