ACF Table Repeater Copy/Paste (Proof of Concept)

Description
-----------
This code allows you to take tab seperated value content and paste it into repeaters in bulk.  This is particularly useful if you use a program such as Excel as when you do a COPY in Excel it uses TSV formatting.   This means that with this code you can allow your users to directly COPY from Excel or another TSV source and then PASTE into an ACF repeater field!


See it in action
----------------
View a very quick demo here: https://www.youtube.com/watch?v=Sr_ZBnyHKnw&feature=youtu.be


Installation
------------
1) If you don't have a custom JS file running in the WP admin get that setup by adding the content of my functions.php file to your own theme's functions.php file.
2) Now go and edit any existing ACF field groups that use repeaters that you want to run the copy/paste with.  Add a custom class of 'tableCopyPaste' to the repeater field and then update the field group.   
3) That's it!  Now go and edit/create a post.   Go to Excel or another program, select and COPY your fields, then return to the WP Admin and do a PASTE inside the repeater field!


Limitations
------------
1) Only a few basic ACF field types are supported; Standard integers, text and date picker fields (assumed to be in dd/mm/yyyy date format)
2) You need to setup an ACF repeater that uses the 'table' layout, other layouts are not supported
3) Handling of fields that are not as expected is more or less controlled but not that graceful - ie if your 2nd column is a number field and your pasted data has a 2nd column with letters then that 2nd column will be skipped
4) Yes I know, it's slow.   It's fine for some rows but if you have say >100 rows it is a little on the slow side as you watch it add the content.

Remember; check the JS console for output as the code produces lots of feedback as to what it's attempting to do
