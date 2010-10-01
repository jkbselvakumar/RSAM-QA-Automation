'################################################################################################################
' #Script Name:	RSAM _AttributeType
'# Description:	 This script does the following
'							1. It will load the environment variable file during run time
'							2. Fetch Username and Password defined in the file
'							3. Login in the application
'							4. Verify if the user name is specified in the Home Page
'							5. Write the corresponding results to the custom log file	
'							6. Calls the following Functions 1)RSAM_Password_Encrypt. 2)Get_Value_From_DB
'							7. Compares the username and password and validates the username on the home page.				
'# Input Parameters: 
'# Return Values:
' # Dependencies: 1. The Environment XML File should be present, 
'								2. The framework folder structures should not be modified.
'								3. Object Reporsitory should be associated
'								4. RSAM_Function_Library should be associated
'#Author: Selva	
'#Date Created: Feb 10, 2010
'#Date Modified
'#
'# 
'Date		Name					Description
'# ------		--------					---------------
'################################################################################################################## 
	Dim LnkAddStatus, LnkEditStatus, LnkDelStatus, strDefaultSelection, iDefaultNoOfLines, strDefaultRadioValue, blnDefaultObjAttCheck, blnDefaultFndAttCheck
	
'----------------------------------------------------------------------------------------------------
	fNavigateUsingTopMenu"RSAM","RSAM Home","Manage>Administration"
'----------------------------------------------------------------------------------------------------
	With Browser("RSAM").Page("RSAM Administration")
		.WebElement("Attributes").Click
		If .WebElement("Attributes_Header").Exist and .Frame("AttributeFrame").WebElement("Attribute Types (questions)").Exist  Then
			RSAM_Automation_Result_File_Update "RSAM Attribute Header","Verify the header after clicking on the attributes","Attribute header and the tab should be present","Attributes header and tab are present","Pass"
		Else
			RSAM_Automation_Result_File_Update "RSAM Attribute Header","Verify the header after clicking on the attributes","Attribute header and the tab should be present","Attributes header and tab are not present","Fail"
		End If
		LnkAddStatus = .Frame("AttributeFrame").Link("Add").Object.IsDisabled
		LnkEditStatus = .Frame("AttributeFrame").Link("Edit").Object.IsDisabled
		LnkDelStatus = .Frame("AttributeFrame").Link("Delete").Object.IsDisabled
		If LnkAddStatus = FALSE and  LnkEditStatus = TRUE and LnkDelStatus = TRUE Then
			RSAM_Automation_Result_File_Update "RSAM Attribute Home Links","Verified the Add, Edit and Delete Links when the attributes page is loaded","Add should be enabled, Edit and Delete should be disabled","Add should be enabled, Edit and Delete should be disabled","Pass"
		Else
			RSAM_Automation_Result_File_Update "RSAM Attribute Home Links","Verified the Add, Edit and Delete Links when the attributes page is loaded","Add should be enabled, Edit and Delete should be disabled","Does not behave as per the expected result. Please check the application","Fail"
		End If
	End With

	




























