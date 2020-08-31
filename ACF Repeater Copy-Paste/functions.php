<?php

// Optionally add to your theme functions file to make it load a custom javascript file via the WP admin header on each page load

function acf_repeater_copy_paste_admin_header_inserts() {
	echo '<script type="text/javascript" src="'.get_stylesheet_directory_uri().'/acf-repeater-copy-paste.js"></script>';
}
add_action('admin_head', 'acf_repeater_copy_paste_admin_header_inserts');

?>
