<?php

// Optionally add the following code to your Wordpress theme's functions.php file to make it load a custom javascript file via the WP admin header on each page load
// If you already have a method for loading a custom bit of JS into only your admin pages then you likely can ignore this.

function acf_repeater_copy_paste_admin_header_inserts() {
	echo '<script type="text/javascript" src="'.get_stylesheet_directory_uri().'/acf-repeater-copy-paste.js"></script>';
}
add_action('admin_head', 'acf_repeater_copy_paste_admin_header_inserts');

?>
