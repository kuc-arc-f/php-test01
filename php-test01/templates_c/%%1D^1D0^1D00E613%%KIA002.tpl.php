<?php /* Smarty version 2.6.18, created on 2011-02-01 10:24:37
         compiled from KIA002.tpl */ ?>
<html>
<head>
<meta http-equiv='content-type' content='text/html;charset=UTF-8'>
<script src="<?php echo $this->_tpl_vars['PUBLIC_DIR']; ?>
/javascripts/kinen_an.js" type="text/javascript"></script>
</head>
<body>
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0">
<!-- Loop -->
<?php $_from = $this->_tpl_vars['result']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['loopName'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['loopName']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['key'] => $this->_tpl_vars['dat']):
        $this->_foreach['loopName']['iteration']++;
?>
<TR onclick="javascript:func_kinen( '<?php echo $this->_tpl_vars['dat']['HD_ID']; ?>
');">
 <TD style="border-bottom:1px solid #888888" width="48px">
  <img style='width:48px; height:48px;' src='/kinen/image/gift_01.png' align='left'>
 </TD>
 <TD style="border-bottom:1px solid #888888" width="60%">
  <B><font color='#6666ff'><?php echo $this->_tpl_vars['dat']['TITLE']; ?>
</font></B>
 </TD>
 <TD style="border-bottom:1px solid #888888">
 &nbsp; <?php echo $this->_tpl_vars['dat']['DT_NOW_3']; ?>
 日
 </TD>
</TR>
<?php endforeach; endif; unset($_from); ?>
<!-- Loop_End -->
</table>
</body></html>