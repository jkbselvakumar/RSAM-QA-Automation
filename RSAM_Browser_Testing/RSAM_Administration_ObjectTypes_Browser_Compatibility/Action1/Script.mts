'-------------------------------------------------------------------------------------------------------------------------------------------------------------
'General Object Types Page control Verification
'-------------------------------------------------------------------------------------------------------------------------------------------------------------
Browser("RSAM Administration").Page("RSAM Administration").WebElement("Object Types").Click
fnObjectTypesControls "Object Types"
'-------------------------------------------------------------------------------------------------------------------------------------------------------------
'-------------------------------------------------------------------------------------------------------------------------------------------------------------
'Srandard Object Types Page control Verification
'-------------------------------------------------------------------------------------------------------------------------------------------------------------
Browser("RSAM Administration").Page("RSAM Administration").WebElement("Standard").Click
fnObjectTypesControls "Standard"
'-------------------------------------------------------------------------------------------------------------------------------------------------------------
'-------------------------------------------------------------------------------------------------------------------------------------------------------------
Function fnObjectTypesControls(ObjectType)
	With Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame")
		blnObjectTypes = .WebElement("Object Types").Exist
		blnAddLnk = .Link("Add").Exist
		blnEditLnk = .Link("Edit").Exist
		blnDelLnk = .Link("Delete").Exist
		.Link("Add").Click
	End With
	With Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame_AddPopUp")
		blnCloseIcon = .Image("Close").Exist
		blnCloseButton = .WebButton("Close").Exist
		blnAddMulChkBox = .WebCheckBox("xchkUpdateMultiple").Exist
		blnDescription = .WebEdit("xtxtDescription").Exist
		blnExcel = .WebEdit("xtxtExcelInstr").Exist
		blnName = .WebEdit("xtxtName").Exist
		blnWblElmntName = .WebElement("xtxtName").Exist
		blnWrkFlwState = .WebList("xddlInitialWorkflowState").Exist
		blnWLstSelfReg = .WebList("xddlSelfRegistrationOptions").Exist
		blnWbTblAtt = .WebTable("Attributes").Exist
		If blnCloseIcon and blnCloseButton and blnAddMulChkBox and blnDescription and blnExcel and blnName and blnWblElmntName and blnWrkFlwState and blnWLstSelfReg and blnWbTblAtt Then
			Reporter.ReportEvent micPass,"Add Object Types PopUp","All the respective controls for the"&ObjectType&"Object Types PopUp are present"
		Else
			Reporter.ReportEvent micFail,"Add Object Types PopUp","All the respective controls for the"&ObjectType&" PopUp are not present"
		End If
		.WebButton("Close").Click
	End With
	With Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame")
		blnObjectTypesGrid = .WebTable("Object Types Grid").Exist
		strObjName = .WebTable("Object Types Grid").GetCellData(2,3)
		.WebTable("Object Types Grid").WebElement("innertext:="&strObjName&"").Click
		blnAttType = .WebElement("Attribute Types").Exist
		blnAtttypeGrid = .WebTable("AttTypeGrid").Exist
		blnControlType = .WebElement("Control Types").Exist
		.WebElement("Control Types").Click
		blnCtrlTypeGrid = .WebTable("Attribute Types Grid").Exist
		blnCriFacTyp = .WebElement("Criticality Factor Types").Exist
		.WebElement("Criticality Factor Types").Click
		blnCriFacTypGrid = .WebTable("Attribute Types Grid").Exist
	End With
	If blnObjectTypes and blnAddLnk and blnEditLnk and blnDelLnk and blnObjectTypesGrid and blnAttType and blnAtttypeGrid and blnControlType and blnCtrlTypeGrid and blnCriFacTyp and blnCriFacTypGrid Then
		Reporter.ReportEvent micPass,"Object Types Page","All the respective controls for the"&ObjectType&" Page are present"
	Else
		Reporter.ReportEvent micFail,"Object Types Page","All the respective controls for the"&ObjectType&" Page are not present"
	End If
End Function
'-------------------------------------------------------------------------------------------------------------------------------------------------------------
'-------------------------------------------------------------------------------------------------------------------------------------------------------------


