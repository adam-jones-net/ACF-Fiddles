ACF Table Repeater Copy/Paste (Proof of Concept)

Description
-----------
This code allows you to take tab seperated value (TSV) content and paste it into ACF repeater fields.  If you paste multiple rows of data then the code will handle that and add as many new rows as required.  This is particularly useful if you use a program such as Excel as when you do a COPY in Excel it uses TSV formatting.   This means that with this code you can allow your users to directly COPY from Excel or another TSV source and then PASTE into an ACF repeater field!


See it in action
----------------
View a very quick demo here: https://www.youtube.com/watch?v=Sr_ZBnyHKnw&feature=youtu.be


Installation
------------
1) If you don't have a custom JS file running in the WP admin get that setup by adding the content of my functions.php file to your own theme's functions.php file.
2) Now go and edit any existing ACF field groups that use repeaters that you want to run the copy/paste with.  Add a custom class of 'tableCopyPaste' to the repeater field and then update the field group.   
3) That's it!  Now go and edit/create a post.   Go to Excel or another program, select and COPY your fields, then return to the WP Admin and do a PASTE inside the repeater field!


How it works
------------
Once active the code will catch every paste you make within the WP admin.   It will however only actually attempt to do anything if:

1) the cursor is within an ACF repeater field 
2) the field has a custom css class assigned to it called 'tableCopyPaste' (via the ACF field group configuration for that particular repeater field).
3) the number of columns in the data copied from your source match the number of visible input fields within the row of the repeater field

Assuming the above basic requirements are met the code will run over the data in the clipboard and attempt to insert it into the form fields of the repeater, adding as many new rows as required.



Limitations
------------
1) Only some ACF field types are supported; Standard integers, text and date picker fields (assumed to be in dd/mm/yyyy date format) *
2) You need to setup an ACF repeater that uses the 'table' layout, other layouts are not supported * 
3) Handling of fields that are not as expected is more or less controlled but not that graceful - ie if your 2nd column is a number field and your pasted data has a 2nd column with letters then that 2nd column will be skipped
4) Yes I know, it's slow.   It's fine for a small quantity of rows but if you have 100s or 1000s of rows it is a little on the slow side as you watch it add the content.

* These limitations could be easily resolved; please feel free to submit any updates or if you need this code integrating with your own ACF setup in a more specific manor just get in touch with me via www.adam-makes-websites.com

REMEMBER: check the JS console for output as the code produces lots of feedback as to what it's attempting to do.
