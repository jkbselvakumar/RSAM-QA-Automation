	Load_RSAM_Env_XML_File	
	dtFileName = Environment("RSAM_DataTable_Path")&"\RSAM_Control_Type.xls"
'----------------------------------------------------------------------------------------------------
    DataTable.ImportSheet dtFileName,1,"RSAM_Control_Relate_Objects"
'----------------------------------------------------------------------------------------------------
'######################################################################
'Fetching the values from the datatable and passing on to the variables
'######################################################################
strctrlRelatedObjectTypes = DataTable("Control_Related_ObjectTypes","RSAM_Control_Relate_Objects")
'######################################################################
'Validation of the Object Types Frame
'######################################################################
Browser("RSAM Administration").Page("RSAM Administration").Frame("Control_ObjectTypes").WebElement("Object_Types_Tab").Click
Wait 3
With Browser("RSAM Administration").Page("RSAM Administration")
	LnkUpdateStatus = .Frame("Control_ObjectTypes").Link("Update").Object.IsDisabled
	LnkCancelStatus = .Frame("Control_ObjectTypes").Link("Cancel").Object.IsDisabled
	chkShowAll = .Frame("Control_ObjectTypes").WebCheckBox("ShowAll").GetROProperty("value")
	If LnkUpdateStatus = FALSE and  LnkCancelStatus = TRUE and chkShowAll = "0" Then
		RSAM_Automation_Result_File_Update "RSAM Control Object Types","Verified the Update and Cancel Links are disabled and the Show All is unchecked","Update and Cancel Links should be disabled and the Show All is unchecked","Update and Cancel Links are disabled and the Show All is unchecked","Pass"
	Else
		RSAM_Automation_Result_File_Update "RSAM Control Object Types","Verified the Update and Cancel Links are disabled and the Show All is unchecked","Update and Cancel Links should be disabled and the Show All is unchecked","Does not behave as per the expected result. Please check the application","Fail"
	End If
End With
Browser("RSAM Administration").Page("RSAM Administration").Frame("Control_ObjectTypes").WebCheckBox("ShowAll").Set "ON"
Wait 5
'####################################################################
Function fnSelectObjectTypes(RelatedObjectTypes)
   strobjtype = Split(RelatedObjectTypes,";")
	For i = 0 to UBound(strobjtype)
		irowobjType = Browser("RSAM Administration").Page("RSAM Administration").Frame("Control_ObjectTypes").WebTable("Related_Object_Types").GetRowWithCellText(strobjtype(i),3,1)
		Set chkObjectType = Browser("RSAM Administration").Page("RSAM Administration").Frame("Control_ObjectTypes").WebTable("Related_Object_Types").ChildItem(irowobjType,1,"WebCheckBox",0)
		chkObjectType.Set "ON"
	Next
End Function
'######################################################################
''Function for the cancel of the related attribute types
'######################################################################
Function fnCancelObjectType(RelatedObjectTypes)
   strobjtype = Split(RelatedObjectTypes,";")
For i = 0 to UBound(strobjtype)
	irowobjType = Browser("RSAM Administration").Page("RSAM Administration").Frame("Control_ObjectTypes").WebTable("Related_Object_Types").GetRowWithCellText(strobjtype(i),3,1)
	Set chkObjectType = Browser("RSAM Administration").Page("RSAM Administration").Frame("Control_ObjectTypes").WebTable("Related_Object_Types").ChildItem(irowobjType,1,"WebCheckBox",0)
	chkval = chkObjectType.GetROProperty("checked")
	If chkval = 0 Then
		RSAM_Automation_Result_File_Update "RSAM Control Object Types","Verifies the cancel link validation","On clicking the cancel link the selected object type should be unchecked","On clicking the cancel link the selected object type should be unchecked","Pass"
	Else
		RSAM_Automation_Result_File_Update "RSAM Control Object Types","Verifies the cancel link validation","On clicking the cancel link the selected object type should be unchecked","Does not behave as expected, check it manually in the application","Fail"
	End If
Next
End Function
'######################################################################
''Validation for the cancel of the related attribute types
'######################################################################
fnSelectObjectTypes(strctrlRelatedObjectTypes)
Browser("RSAM Administration").Page("RSAM Administration").Frame("Control_ObjectTypes").Link("Cancel").Click
fnCancelObjectType(strctrlRelatedObjectTypes)
'######################################################################
''Validation for the Update of the related attribute types
'######################################################################
fnSelectObjectTypes(strctrlRelatedObjectTypes)
Browser("RSAM Administration").Page("RSAM Administration").Frame("Control_ObjectTypes").Link("Update").Click
'#####################################################################



