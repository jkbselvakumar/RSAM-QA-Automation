
	Load_RSAM_Env_XML_File	
	dtFileName = Environment("RSAM_DataTable_Path")&"\RSAM_Control_Type.xls"
'----------------------------------------------------------------------------------------------------
    DataTable.ImportSheet dtFileName,1,"RSAM_Add_Control_Answers"
'----------------------------------------------------------------------------------------------------
'######################################################################
'Fetching the values from the datatable and passing on to the variables
'######################################################################
strctrlAnswerLevel = DataTable("Answer_Level","RSAM_Add_Control_Answers")
strctrlAnswerDesc = DataTable("Answer_Desc","RSAM_Add_Control_Answers")
strctrlAnswerWeight = DataTable("Answer_Weight","RSAM_Add_Control_Answers")
strctrlAnswerDescription = DataTable("Answer_Description","RSAM_Add_Control_Answers")
strctrlAnswerComments = DataTable("Comments","RSAM_Add_Control_Answers")
strctrlAnswerFile = DataTable("File_Attachment","RSAM_Add_Control_Answers")
strctrlAnswerHidden = DataTable("Hidden_Control","RSAM_Add_Control_Answers")
strctrlAnswerShow = DataTable("Show_Options","RSAM_Add_Control_Answers")
strctrlAnswerAuto = DataTable("Control_Auto_Answers","RSAM_Add_Control_Answers")
strctrlAnswerAutoLevel = DataTable("Control_Auto_Answers_Level","RSAM_Add_Control_Answers")
strctrlAnswerAspects = DataTable("Control_Aspects","RSAM_Add_Control_Answers")
strctrlAnswerCriticalityLevel = DataTable("Criticality_Level","RSAM_Add_Control_Answers")
strctrlAnswerCriticality = DataTable("Criticality_Answer","RSAM_Add_Control_Answers")
'#########################################################################
'Validation of the ADD,Edit and Delete Links
'#########################################################################
With Browser("RSAM Administration").Page("RSAM Administration")
	LnkAddStatus = .Frame("ControlLevel(Answers)").Link("Add").Object.IsDisabled
	LnkEditStatus = .Frame("ControlLevel(Answers)").Link("Edit").Object.IsDisabled
	LnkDelStatus = .Frame("ControlLevel(Answers)").Link("Delete").Object.IsDisabled
	If LnkAddStatus = FALSE and  LnkEditStatus = TRUE and LnkDelStatus = TRUE Then
		RSAM_Automation_Result_File_Update "RSAM ControlLevel Answer Links","Verified the Add, Edit and Delete Links when the ControlLevel Answer Frame page is loaded","Add should be enabled, Edit and Delete should be disabled","Add should be enabled, Edit and Delete should be disabled","Pass"
	Else
		RSAM_Automation_Result_File_Update "RSAM ControlLevel Answer Links","Verified the Add, Edit and Delete Links when the ControlLevel Answer Frame is loaded","Add should be enabled, Edit and Delete should be disabled","Does not behave as per the expected result. Please check the application","Fail"
	End If
End With
'#########################################################################
Browser("RSAM Administration").Page("RSAM Administration").Frame("ControlLevel(Answers)").Link("Add").Click
'#########################################################################
'Validation for the Add control level pop up
'#########################################################################
strcomm = Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebRadioGroup("Comments").GetROProperty("value")
strFileAtt = Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebRadioGroup("FileAttachment").GetROProperty("value")
	If strcomm = "xrdoNoCmmnts" and  strFileAtt = "xrdoNoFileAttchmnt" Then
		RSAM_Automation_Result_File_Update "RSAM Add Control Level","Verifies if the No comments allowed and No attachment allowed are enabled by default","No Comments Allowed  and No Attachments Allowed should be enabled by default","No Comments Allowed  and No Attachments Allowed is enabled by default","Pass"
	Else
		RSAM_Automation_Result_File_Update "RSAM Add Control Level","Verifies if the No comments allowed and No attachment allowed are enabled by default","No Comments Allowed  and No Attachments Allowed should be enabled by default","Does not behave as per the expected result. Please check the application","Fail"
	End If
'#########################################################################
With Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame")
	.WebEdit("level").Set strctrlAnswerLevel
	.WebEdit("Desc").Set strctrlAnswerDesc
	.WebEdit("RemedDesc").Set strctrlAnswerDescription
	.WebEdit("Weight").Set strctrlAnswerWeight
	.WebRadioGroup("Comments").Select strctrlAnswerComments
	.WebRadioGroup("FileAttachment").Select strctrlAnswerFile
End With
If  strctrlAnswerHidden = "Yes" Then
	Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebCheckBox("Hidden").Set "ON"
End If
'#########################################################################
'Function to Select Auto Answer level or Aspect Option and Criticality Level
'#########################################################################
Select Case strctrlAnswerShow
	Case "Show Auto-Answers"
		Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").Link("Show Auto-Answers").Click
		fnSaveConfirmation
		fnSelectAutoAnswerLevel
	Case "Show Aspects"
		Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").Link("Show Aspects").Click
		fnSaveConfirmation
		fnSelectAspectOption
	Case "Show Criticality"
		Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").Link("Show Criticality").Click
		fnSaveConfirmation
		fnSelectCriticalityAnswer
	Case "Show Auto-Answers;Show Aspects;Show Criticality"
		Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").Link("Show Auto-Answers").Click
		fnSaveConfirmation
		fnSelectAutoAnswerLevel
		Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").Link("Show Aspects").Click
		fnSelectAspectOption
		Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").Link("Show Criticality").Click
		fnSelectCriticalityAnswer
End Select
'############################################################################################################
wait 3
Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").Link("Update").Click
'#########################################################################
'Function to handle Save confirmation pop up
'#########################################################################
Function fnSaveConfirmation()
	If Browser("RSAM Administration").Dialog("Message from webpage").Exist Then
		Browser("RSAM Administration").Dialog("Message from webpage").WinButton("OK").Click
	Else
		Browser("RSAM Administration").Dialog("text:=Microsoft Internet Explorer").WinButton("text:=OK").Click
	End If
End Function
'#########################################################################
'Function to Select Auto Answer level
'#########################################################################
Function fnSelectAutoAnswerLevel()
	irowval = Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebTable("AutoAnswer_Table").GetRowWithCellText(strctrlAnswerAuto,4,1)
	Set selAutoAnswer = Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebTable("AutoAnswer_Table").ChildItem(irowval,5,"WebElement",0)
	selAutoAnswer.Click
	ilevelrow = Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebTable("AutoAnswers_DropDown").GetRowWithCellText(strctrlAnswerAutoLevel,2,1)
	Set selAutoAnswerLevel = Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebTable("AutoAnswers_DropDown").ChildItem(ilevelrow,2,"WebElement",0)
	selAutoAnswerLevel.Click
End Function
'#########################################################################
'Function to Select Aspect Option
'#########################################################################
Function fnSelectAspectOption()
	irowaspectval = Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebTable("Aspect_Option_Table").GetRowWithCellText(strctrlAnswerAspects,3,1)
	Set chkAspectOption = Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebTable("Aspect_Option_Table").ChildItem(irowaspectval,1,"WebCheckBox",0)
	chkAspectOption.Set "ON"
End Function
'#########################################################################
'Function to Select Criticality Answers
'#########################################################################
Function fnSelectCriticalityAnswer()
	irowcriticality = Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebTable("Criticality_Table").GetRowWithCellText(strctrlAnswerCriticalityLevel,2,1)
	irowcriticalityval = irowcriticality-2
	crcrowval =  chr(34)&"xuwgCriticality_rc_"&irowcriticalityval&"_2"&chr(34)
	Msgbox(crcrowval)
    Set oDesc = Description.Create()
	oDesc("html id").Value = "xuwgCriticality_rc_"&irowcriticalityval&"_2"
	oDesc("class").Value = "RowStyle"
	'oDesc("innerhtml").Value = "----"
    Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebTable("Criticality_Table").WebElement(oDesc).Click
	iCriticalityrow = Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebTable("Criticality_Level_Table").GetRowWithCellText(strctrlAnswerCriticality,2,1)
	Set selCriticalityLevel = Browser("RSAM Administration").Page("RSAM Administration").Frame("Add_Control_Frame").WebTable("Criticality_Level_Table").ChildItem(iCriticalityrow,2,"WebElement",0)
	selCriticalityLevel.Click
End Function
'#########################################################################

 


	



















































