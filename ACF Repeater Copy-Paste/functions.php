<?php

// Admin only extra JS/CSS for this code to work
function acf_repeater_copy_paste_admin_header_inserts() {
	echo '<script type="text/javascript" src="'.get_stylesheet_directory_uri().'/acf-repeater-copy-paste.js"></script>';
}
add_action('admin_head', 'acf_repeater_copy_paste_admin_header_inserts');

?>
