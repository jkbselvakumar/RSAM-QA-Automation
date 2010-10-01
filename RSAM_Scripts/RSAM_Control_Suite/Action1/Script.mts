'################################################################################################################
' #Script Name:	RSAM _Add_Control
'# Description:	 This script does the following
'							1. It will load the environment variable file during run time
'							2. It will navigate to the controls in the RSAM administration page
'							3. Verify if the Controls types grid is loaded
'							4. Verify if the Add, Edit, Delete, and Indent links are existing
'							5. Write the corresponding results to the custom log file	
'							6. Calls the following Functions 1)fNavigateUsingTopMenu. 2)RSAM_RandomString
'							7. The values required to the creation of a control type is fetched from the datatables
'# Input Parameters: 
'# Return Values:
' # Dependencies: 1. The Environment XML File should be present, 
'								2. The framework folder structures should not be modified.
'								3. Object Reporsitory should be associated
'								4. RSAM_Function_Library should be associated
'#Author: Selva	
'#Date Created: July 29, 2010
'#Date Modified
'#
'# 
'Date		Name					Description
'# ------		--------					---------------
'################################################################################################################## 
	Dim LnkAddStatus, LnkEditStatus, LnkDelStatus, iDomainsTableRowId, chkDomainName
	Load_RSAM_Env_XML_File	
	dtFileName = Environment("RSAM_DataTable_Path")&"\RSAM_Control_Type.xls"
'----------------------------------------------------------------------------------------------------
    DataTable.ImportSheet dtFileName,1,"RSAM_Add_Control"
'----------------------------------------------------------------------------------------------------
'######################################################################
'Fetching the values from the datatable and passing on to the variables
'######################################################################
	strctrlDescription = DataTable("Control_Type_Description","RSAM_Add_Control")
	strctrlName = DataTable("Control_Type_Name","RSAM_Add_Control")
	strctrlExpandedDescription = DataTable("Expanded_Description","RSAM_Add_Control")
	strctrlURL = DataTable("URL","RSAM_Add_Control")
	strctrlDomain = DataTable("Domain","RSAM_Add_Control")
	strctrlWeight = DataTable("Weight","RSAM_Add_Control")
	strctrlAddMultiple = DataTable("Add_Multiple","RSAM_Add_Control")
'######################################################################
	fNavigateUsingTopMenu"name:=RSAM Administration","title:=RSAM Administration","Home"
	fNavigateUsingTopMenu"RSAM","RSAM Home","Manage>Administration"
'######################################################################
'Verifying the objects present on the controls page.
'######################################################################
With Browser("RSAM").Page("RSAM Administration")
		.WebElement("Controls").Click
        If .Frame("ControlsFrame").WebElement("Control Types (questions)").Exist  Then
			RSAM_Automation_Result_File_Update "RSAM Control Type Header","Verify the header after clicking on the Controls","Controls Type header and the tab should be present","Control Type header and tab are present","Pass"
		Else
			RSAM_Automation_Result_File_Update "RSAM Control Type Header","Verify the header after clicking on the Controls","Control Type header and the tab should be present","Control Type header and tab are not present","Fail"
		End If
		LnkAddStatus = .Frame("ControlsFrame").Link("Add").GetROProperty("class")
		LnkEditStatus = .Frame("ControlsFrame").Link("Edit").GetROProperty("class")
		LnkDelStatus = .Frame("ControlsFrame").Link("Delete").GetROProperty("class")
		If LnkAddStatus = "csLinkButton" and  LnkEditStatus = "csLinkButtonDisabled" and LnkDelStatus = "csLinkButtonDisabled" Then
			RSAM_Automation_Result_File_Update "RSAM Control Type  Home Links","Verified the Add, Edit and Delete Links when the Control Type  page is loaded","Add should be enabled, Edit and Delete should be disabled","Add should be enabled, Edit and Delete should be disabled","Pass"
		Else
			RSAM_Automation_Result_File_Update "RSAM Control Type  Home Links","Verified the Add, Edit and Delete Links when the Control Type  page is loaded","Add should be enabled, Edit and Delete should be disabled","Does not behave as per the expected result. Please check the application","Fail"
		End If
		If .Frame("ControlsFrame").Image("left").Exist and .Frame("ControlsFrame").Image("Right").Exist Then
			RSAM_Automation_Result_File_Update "RSAM Control Type  Indents","Verified the left and the Right Indents when the Control Type  page is loaded","Left and Right Indents should be present","Left and Right Indents are present","Pass"
		Else
			RSAM_Automation_Result_File_Update "RSAM Control Type  Indents","Verified the left and the Right Indents when the Control Type  page is loaded","Left and Right Indents should be present","Left and Right Indents are not present","Fail"
		End If
End With
'######################################################################
'Adding a control Type
'######################################################################
Browser("RSAM").Page("RSAM Administration").Frame("ControlsFrame").Link("Add").Click
If  strctrlAddMultiple = "Yes" Then
	Browser("RSAM").Page("RSAM Administration").Frame("AddControl").WebCheckBox("xchkUpdateMultiple").Set "ON"
End If
strcltrlnamesplit = Split(strctrlName,";")
For i=0 To UBound(strcltrlnamesplit)
	With Browser("RSAM").Page("RSAM Administration").Frame("AddControl")
		.WebEdit("ControlType_Name").Set RSAM_RandomString(strcltrlnamesplit(i),"4")
		.WebElement("Description").Click
		.WebEdit("Control_Description").Set strctrlDescription
		.WebElement("Expanded_Description").Click
		.WebEdit("Control_Description").Set strctrlExpandedDescription
		.WebEdit("ControlType_URL").Set strctrlURL
		.WebEdit("CtrlTypeWeight").Set strctrlWeight
		.WebCheckBox("ShowAllDomains").Set "ON"
	End With
	Wait 5
	'######################################################################
	'Selecting the check box based on the domain name. If there are more than one domain
	' with the same name the first one will be selected.
	'######################################################################
		iDomainsTableRowId = Browser("RSAM").Page("RSAM Administration").Frame("AddControl").WebTable("DomainsTables").GetRowWithCellText(strctrlDomain,1)
		Set chkDomainName = Browser("RSAM").Page("RSAM Administration").Frame("AddControl").WebTable("DomainsTables").ChildItem(iDomainsTableRowId,1,"WebCheckBox",0)
		chkDomainName.Set "ON"
		Browser("RSAM").Dialog("Message from webpage").WinButton("OK").Click
		If strctrlAddMultiple = "Yes" and i = UBound(strcltrlnamesplit) Then
			Browser("RSAM").Page("RSAM Administration").Frame("AddControl").WebCheckBox("xchkUpdateMultiple").Set "OFF" 
		End If
		Browser("RSAM").Page("RSAM Administration").Frame("AddControl").WebButton("Update").Click
Next
'######################################################################
'Bringing the application back to the Home Page
'######################################################################
	










