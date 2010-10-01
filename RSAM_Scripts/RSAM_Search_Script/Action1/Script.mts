'################################################################################################################
' #Script Name:	RSAM_Search_Functionality
'# Description:	 This script does the following
'							1. It will load the environment variable file during run time
'							2. Navigate to the Search Page
'							3. Validate the Search Criteria pop up and enter the criteria values
'							4. Get the count  of the number of records returned by the criteria
'							5. Sort the results based on entity column
'							6.. Validate the sorting
'							7. Grouping the search by entity column and validate the tree image
'# Input Parameters: 
'# Return Values:
' # Dependencies: 1. The Environment XML File should be present, 
'								2. The framework folder structures should not be modified.
'								3. Object Reporsitory should be associated
'								4. RSAM_Function_Library should be associated
'#Author: Selva	
'#Date Created: July 01, 2010
'#Date Modified
'#
'# 
'Date		Name					Description
'# ------		--------					---------------
'################################################################################################################## 
	Dim iRecrodsReturned, strSearchCompleteInfo, iRecPerPage
'----------------------------------------------------------------------------------------------------
'Navigating to the search page 
'----------------------------------------------------------------------------------------------------
	fNavigateUsingTopMenu"name:=RSAM Administration","title:=RSAM Administration","Home"
	fNavigateUsingTopMenu"RSAM","RSAM Home","Search>Search Objects>[New Search]"

'----------------------------------------------------------------------------------------------------
'1. The below code validates the existence of the Search criteria page
'2. Enters the search criteria in the pop up, it uses the default selection and in the field filter it clicks on select all
'3. Closes the search criteria pop up by clicking close
'----------------------------------------------------------------------------------------------------
	If Browser("Select Fields").Exist Then
        RSAM_Automation_Result_File_Update "Search Criteria Page","Search Criteria pop up","Search Criteria Page should pop up","The Search Criteria page has popped up","Pass"
		Browser("Select Fields").Page("Select Fields").WebElement("Field Filter").Click
		Browser("Select Fields").Window("Selection -- Webpage Dialog").Page("Selection").WebElement("Select All").Click
		Browser("Select Fields").Window("Selection -- Webpage Dialog").Page("Selection").WebElement("Update").Click
		Browser("Select Fields").Page("Select Fields").Link("Update").Click
	Else
		RSAM_Automation_Result_File_Update "Search Criteria Page","Search Criteria pop up","Search Criteria Page should pop up","The Search Criteria page did not popped up","Fail"
	End If
'----------------------------------------------------------------------------------------------------
'1. Gets the count of number of records returned
'----------------------------------------------------------------------------------------------------
	strSearchCompleteInfo = Browser("RSAM Search: Objects").Page("RSAM Search: Objects").WebElement("Search Complete").GetROProperty("innerhtml")
	iRecrodsReturned = Split(strSearchCompleteInfo," ")
	RSAM_Automation_Result_File_Update "SEARCH REC1","Records Returned","The no of records returned",iRecrodsReturned(2),"Pass"
	iRecPerPage = Browser("RSAM Search: Objects").Page("RSAM Search: Objects").WebEdit("RecordsPerPage").GetROProperty("Value")

'----------------------------------------------------------------------------------------------------
'1. Sorts the entity 
'2. Compares the entities only in the current page
'----------------------------------------------------------------------------------------------------
	Browser("RSAM Search: Objects").Page("RSAM Search: Objects").WebElement("Entity").Click
	wait(3)
	If  iRecrodsReturned(2) > 0 Then
		For i = 2 To iRecPerPage
			'strFirstEntityHtmlId = chr(34)&"html id:=xuwgSearchResult_rc_0_"&i &chr(34)
			'strFirstEntityHtmlId = chr(34)&"html id:=xuwgSearchResult_rc_0_"&i &chr(34)&";"&chr(34)&"html tag:=TD"&chr(34)
			'strNextEntityHtmlId = chr(34)&"html id:=xuwgSearchResult_rc_0_"&i+1 &chr(34)
			'strFirstEntity = Browser("RSAM Search: Objects").Page("RSAM Search: Objects").WebElement(strFirstEntityHtmlId).GetROProperty("innertext")
			strFirstEntity  = Browser("RSAM Search: Objects").Page("RSAM Search: Objects").WebTable("OBJTYPE_ID_R").GetCellData(i,4)
			strNextEntity = Browser("RSAM Search: Objects").Page("RSAM Search: Objects").WebTable("OBJTYPE_ID_R").GetCellData(i+1,4)
			If strFirstEntity <= strNextEntity Then
				RSAM_Automation_Result_File_Update "SEARCH SORT","Sorting of the searches","Search has to be sorted in ascending order","Search has been sorted in ascending order","Pass"
			Else
				RSAM_Automation_Result_File_Update "SEARCH SORT","Sorting of the searches","Search has to be sorted in ascending order","Search is not  sorted in ascending order","Fail"
			End If
		Next
	End If

'----------------------------------------------------------------------------------------------------
'1. Groups the search results based on entity
'2. Validates the grouping by checking i th '+' image.
'----------------------------------------------------------------------------------------------------
    Browser("RSAM Search: Objects").Page("RSAM Search: Objects").WebElement("Entity").Drag
	Wait 2
	Browser("RSAM Search: Objects").Page("RSAM Search: Objects").WebElement("Drag a column header here to group by that column").Drop
	wait 2
	If  iRecrodsReturned(2) > 0 Then
		If Browser("RSAM Search: Objects").Page("RSAM Search: Objects").Image("ig_treeXPPlus").Exist Then
			RSAM_Automation_Result_File_Update "SEARCH Grouping","Grouping of the searches","Search has to be grouped based on entity","Search has been grouped by entity","Pass"
		Else
			RSAM_Automation_Result_File_Update "SEARCH Grouping","Grouping of the searches","Search has to be grouped based on entity","Search has not been grouped by entity","Fail"
		End If
	End If
Browser("RSAM Search: Objects").Page("RSAM Search: Objects").WebElement("Home").Click
'----------------------------------------------------------------------------------------------------
'1. Saving the search
'----------------------------------------------------------------------------------------------------
'	Browser("RSAM Search: Objects").Page("RSAM Search: Objects").WebElement("Save/Load Search").Click
'Browser("RSAM Search: Objects").Page("RSAM Search: Objects").WebElement("Save As").Click


	

		 
















