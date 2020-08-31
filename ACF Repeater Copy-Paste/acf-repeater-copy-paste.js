/*
ACF Repeater Copy/Paste concept
By Adam Jones
www.adam-makes-websites.com

Last Updated: 30/8/20

See readme at https://github.com/arkid/ACF-Fiddles/tree/master/ACF%20Repeater%20Copy-Paste for more info
*/

jQuery(document).ready(function() {

	// setup listener for copy/paste in ACF
	document.addEventListener('paste', function (event) {

		// ASSUMPTIONS:
		// Pasted date values will always be in dd/mm/yyyy format, if they aren't in your repeater this will need work to handle

		// Requires:
		// stripNonAlphaNumeric(), char_count()

		// Internal Settings
		var table_paste_debug=true;
			// Enable to troubleshoot: it provides info in JS console on exactly what is being pasted in which field

		// get current cursor location
		var cursorObject=event.target;
		var cursorID=cursorObject.id;

		console.clear();
		console.log("Table copy/paste caught a paste event...");

		// vital to check we are inside a repeater before continuing...
		if (jQuery("#"+cursorID).parents('div.acf-repeater').length) {

			if (jQuery("#"+cursorID).parents('div.acf-field-repeater').hasClass("tableCopyPaste")) {

				event.preventDefault(); 	//disable default cut,copy,paste

				// get clipboard data
				var clipText = event.clipboardData.getData('Text');

				// check there are tabs!
				if (char_count(clipText,"\t")>0){

					// first check for line returns
					var splitDataNL = clipText.split('\r');
					var lineArray=[];
					for (i = 0; i < splitDataNL.length; i++) {
						//console.log("looping line return: "+i+", content: "+splitDataNL[i]);
						if (splitDataNL[i]!="" && splitDataNL[i]!=null && stripNonAlphaNumeric(splitDataNL[i])!=""){
							lineArray.push(splitDataNL[i]);
						}
					}
					console.log("Compiled array of "+lineArray.length+" rows to insert: "+lineArray);

					// check we have at least as many text input fields as columns in our tabbed data
					var numInputs=jQuery("#"+cursorID).parents('tr.acf-row').find("input:visible").length;
					var dataCols=lineArray[0].split('\t').length;
					if (dataCols<=numInputs){

						console.log("Pasted column vs table column check all ok, the table has "+numInputs+" columns, clipboard data has "+dataCols);

						// Main loop through the cells...
						for (i = 0; i < lineArray.length; i++) {
							// split by tab
							var splitDataTSV=lineArray[i].split('\t');

							console.log("New row being processed...");

							// add new/next row via button click?
							if (i>0){
								console.log("calling add row button");
								jQuery("#"+cursorID).closest(".acf-repeater").find(".acf-button[data-event='add-row']").trigger("click");

								console.log("Attempting cursor move from current position of: "+cursorID+"...");
								var newID=jQuery("#"+cursorID).closest('tr').next('tr').find("td input:text").first().attr("id");
								// update cursor object
								cursorID=newID;
								console.log("Set cursor to new position of id: "+newID);
							}

							// if a visible field add values for the row...
							var counter=0;
							jQuery("#"+cursorID).closest("tr").find('input:visible').each(function(i,val) {
								var inputID=jQuery(this).attr("id");
								var valToPaste=splitDataTSV[counter];
								if (valToPaste){valToPaste=valToPaste.trim();}

								if (table_paste_debug===true){
									console.log( "Adding value:'"+valToPaste+"' to ACF form input: #"+inputID);
								}

								// add the values to the inputs...
								jQuery("#"+inputID).val(valToPaste);
								counter++;
							});

							// Also add to the hidden values input (for a date field) ?
							var counter=0;
							jQuery("#"+cursorID).closest("tr").find('input[type="hidden"]').each(function(i,val) {
								var inputID=jQuery(this).attr("id");
								var valToPaste=splitDataTSV[counter];
								if (valToPaste){valToPaste=valToPaste.trim();}

								if (valToPaste!="" && char_count(valToPaste,"/")>0){

									if (table_paste_debug===true){
										console.log("Converting date for hidden date field, found "+char_count(valToPaste,"/")+" slashes");
									}

									// convert date to different format
									var dateParts = valToPaste.split("/");
									var hiddenDateFormat = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); // for uk date format
									var d = hiddenDateFormat.getDate();
									var m =  hiddenDateFormat.getMonth();
									m += 1;  // JavaScript months are 0-11
									var y = hiddenDateFormat.getFullYear();

									if (d<10){
										d=d.toString();
										d="0"+d;
									}else{
										d=d.toString();
									}
									if (m<10){
										m=m.toString();
										m="0"+m;
									}else{
										m=m.toString();
									}
									y=y.toString();


									var hiddenDateFormatComp=y+m+d;

									if (table_paste_debug===true){
										console.log( "Adding value to HIDDEN FIELD:'"+hiddenDateFormatComp+"' to hidden ACF field: # "+inputID);
									}

									jQuery("#"+inputID).val(hiddenDateFormatComp);
									counter++;
								}

							});

						}

					}else{
						console.log("ERROR: The table has "+numInputs+" columns but the tabbed clipboard data has "+dataCols+", pasting into this table will not work.");
					}

				}else{
					if (confirm("WARNING: This paste occured within a repeater which was expecting tab formatted data.  No tabbed data was found however - are you sure you want to paste this data?")){
						// let the paste occur anyway
					}else{
						// Stop data actually being pasted into current cursor input
						event.stopPropagation();
						event.preventDefault();
					}
				}

			}else{
				console.log("Table copy/paste not activating as the repeater being pasted into doesn't have the class 'tableCopyPaste'");
			}
		}else{
			console.log("Table copy/paste not activating as a paste was not made inside an ACF repeater field'");
		}

	});



});


// Some extra helper functions
function char_count(str, letter) {
 var letter_Count = 0;
 for (var position = 0; position < str.length; position++)
 {
    if (str.charAt(position) == letter)
      {
      letter_Count += 1;
      }
  }
  return letter_Count;
}
function stripNonAlphaNumeric(input){
    input=input.replace(/[^0-9a-z]/gi, '');
    return input;
}
