'----------------------------------------------------------------------------------------------------
	Load_RSAM_Env_XML_File	
	dtFileName = Environment("RSAM_DataTable_Path")&"\RSAM_Attribute_Type.xls"
'----------------------------------------------------------------------------------------------------
    DataTable.ImportSheet dtFileName,1,"RSAM_Add_Attribute"
'----------------------------------------------------------------------------------------------------
	strAttDescription = DataTable("Attribute_Type_Description","RSAM_Add_Attribute")
	strAttName = DataTable("Attribute_Type_Names","RSAM_Add_Attribute")
	strResponseType = DataTable("Response_Type","RSAM_Add_Attribute")
	strLines = DataTable("Lines","RSAM_Add_Attribute")
    strDSPMultiSelect = DataTable("MultiSelect","RSAM_Add_Attribute")
	strDSPName = DataTable("DSPName","RSAM_Add_Attribute")
	usrRole = DataTable("LDAPAssignRole","RSAM_Add_Attribute")
	strUsesAttType = DataTable("Attribute_Use_Type","RSAM_Add_Attribute")
	answerType = DataTable("Answer","RSAM_Add_Attribute")
	attReadHidden = DataTable("Attribute_Level","RSAM_Add_Attribute")
	attusrDisplay =  DataTable("LDAPUserDisplay","RSAM_Add_Attribute")
	strPreventUnassign = DataTable("Prevent_Unassign","RSAM_Add_Attribute")
	strSavedSearchListType = DataTable("Saved_Search_List_Type","RSAM_Add_Attribute")
	strSavedSearches = DataTable("Saved_Searches","RSAM_Add_Attribute")
	strBypassPerm = DataTable("Bypass_Perm","RSAM_Add_Attribute")
	strAttModify = DataTable("Modify_Existing","RSAM_Add_Attribute")
'----------------------------------------------------------------------------------------------------
   'Validate Add Attribute pop up with default checks
'----------------------------------------------------------------------------------------------------
	If Lcase(strAttModify)<>"yes" Then
		Browser("RSAM").Page("RSAM Administration").Frame("AttributeFrame").Link("Add").Click
		With  Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute")
			strDefaultSelection = .WebList("AttResponseType").GetROProperty("Selection")
			iDefaultNoOfLines = .WebEdit("AttLines").GetROProperty("Value")
			strDefaultRadioValue = .WebRadioGroup("GrpAnswerOption").GetROProperty("Value")
			blnDefaultObjAttCheck = .WebCheckBox("chkbxObjAttribute").GetROProperty("Checked")
			blnDefaultFndAttCheck = .WebCheckBox("xchkbxFindingAttribute").GetROProperty("Checked")
		End With
		If  strDefaultSelection = "Text"  and iDefaultNoOfLines ="2" and strDefaultRadioValue="xrdoAnsReq"  and blnDefaultObjAttCheck = "1" and blnDefaultFndAttCheck ="1" Then
			RSAM_Automation_Result_File_Update "Add Attribute","Verified the default selection on the Add Attribute Page","Response Type should be 'Text'; # of Lines = '2'; Answer is Required; Object Attributes and Finding Attributes should be selected;","Behaves as Expected","Pass"
		Else
			RSAM_Automation_Result_File_Update "Add Attribute","Verified the default selection of the response type","Response Type should be 'Text'; # of Lines = '2'; Answer is Required; Object Attributes and Finding Attributes should be selected;","Does not Behave as Expected","Fail"
		End If
	End If
'----------------------------------------------------------------------------------------------------
   'Validate Add Attribute pop up blank fields
'----------------------------------------------------------------------------------------------------

'----------------------------------------------------------------------------------------------------
   'Validate Add Attributes
'----------------------------------------------------------------------------------------------------
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		If  strAttName = "" or strAttDescription = "" Then
			With Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute")
				.WebEdit("AttTypeName").Set strAttName
				If   strAttDescription <> "" Then
					.WebElement("AttDescription").Click
					.WebEdit("Attribute_Description").Set strAttDescription
				End If
				.WebButton("Update").Click
			End With
			If Browser("RSAM").Dialog("Microsoft Internet Explorer").WinButton("AttTypeBlankOK").Exist Then
				Browser("RSAM").Dialog("Microsoft Internet Explorer").WinButton("AttTypeBlankOK").Click
				RSAM_Automation_Result_File_Update "Attribute Name/Type Blank","Mandatory field verification on Add or Modify Attribute Types screen:when Attribute Type Name field  is kept blank","Validation for Blank Attribute type name should provide an alert","Behaves as Expected","Pass"
			ElseIf Browser("RSAM").Dialog("Message from webpage").WinButton("OK").Exist Then
				Browser("RSAM").Dialog("Message from webpage").WinButton("OK").Click
				RSAM_Automation_Result_File_Update "Attribute Name/Type Blank","Mandatory field verification on Add or Modify Attribute Types screen:when Attribute Type Name field  is kept blank","Validation for Blank Attribute type name should provide an alert","Behaves as Expected","Pass"
			ElseIf Browser("RSAM").Dialog("Microsoft Internet Explorer").WinButton("AttQuestionBlankOK").Exist  Then
				Browser("RSAM").Dialog("Microsoft Internet Explorer").WinButton("AttQuestionBlankOK").Click
				RSAM_Automation_Result_File_Update "Attribute Name/Type Blank","Mandatory field verification on Add or Modify Attribute Types screen:when Attribute Description  Name field  is kept blank","Validation for Blank Attribute type Description should provide an alert","Behaves as Expected","Pass"
			Else
				RSAM_Automation_Result_File_Update "Attribute Name/Type/Description  Blank","Mandatory field verification on Add or Modify Attribute Types screen:when Attribute Type Name/Description field  is kept blank","Validation for Blank Attribute type/Description name should provide an alert","Does not Behave as Expected","Fail"
			End If
			Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Cancel").Click
			Parameter("strAttTypeName") = ""
			Browser("RSAM").Window("-- Webpage Dialog").Page("Page").WebButton("No").Click
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		Else
			With Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute")
				.WebEdit("AttTypeName").Set RSAM_RandomString(strAttName,"4")
				Parameter("strAttTypeName") = .WebEdit("AttTypeName").GetROProperty("Value")
				.WebElement("AttDescription").Click
				.WebEdit("Attribute_Description").Set RSAM_RandomString(strAttDescription,"10")
			End With
			If strResponseType = "" and strLines="" Then
				Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click	
			Else
				Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebList("AttResponseType").Select strResponseType
				fnAttDescription
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------				
				Select Case strResponseType
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					Case "Text"
						If Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebEdit("AttLines").Exist Then
							RSAM_Automation_Result_File_Update "No of lines","Number of lines validation for text","The number of lines box should appear when the text response type is selected","Behaves as Expected","Pass"
							Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebEdit("AttLines").Set strLines
							If answerType<>"" Then
								fnAnswer answerType
							End If
							If attReadHidden<>"" Then
								fnAttReadHidden attReadHidden
							End If
							If strUsesAttType<>"" Then
								fnUsesAttType strUsesAttType
							End If
							If  strLines > 15 or strLines = 0Then
								Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
								fnCancel "OK"
							Else
								Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
							End If
						Else
							Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
							RSAM_Automation_Result_File_Update "No of lines","Number of lines validation for text","The number of lines box should appear when the text response type is selected","Does not Behave as Expected","Fail"
						End If
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					Case "Dynamic SP"
						If Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkbxMultiSel").Exist Then
							RSAM_Automation_Result_File_Update "Dynamic SP Multi Select","Multi Select  validation for Dynamic SP","The Multi Select check box should appear when the Dynamic SP response type is selected","Behaves as Expected","Pass"
							If strDSPMultiSelect = "Yes"  Then
								Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkbxMultiSel").Set "ON"
								fnAttDescription
							End If
							If  CStr(strDSPName)<>"" Then
								Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebEdit("xtxtSPName").Set strDSPName
								If answerType<>"" Then
									fnAnswer answerType
								End If
								If attReadHidden<>"" Then
									fnAttReadHidden attReadHidden
								End If
								If strUsesAttType<>"" Then
									fnUsesAttType strUsesAttType
								End If
								Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
							Else
								Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
								fnCancel "OK"
							End If
						Else
							RSAM_Automation_Result_File_Update "Dynamic SP Multi Select","Multi Select  validation for Dynamic SP","The Multi Select check box should appear when the Dynamic SP response type is selected","Does not Behave as Expected","Fail"
						End If

'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					Case "LDAP User Search"
						blAssignRolesLDAPUsers = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebElement("AssignRolesLDAPUsers").Exist
						blUserCheclBox = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkUserId").Exist
						blUserName = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkName").Exist
						blUserEmail = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkEmail").Exist
						blPreventUnassign = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkPreventUnassign").Exist
						blUserID = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkUserId").GetROProperty("checked")
						bldashboarparam = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkbxDashboardParam").Object.isDisabled
						If blAssignRolesLDAPUsers and blUserCheclBox and  blUserName and blUserEmail and blPreventUnassign Then
							RSAM_Automation_Result_File_Update "Response Type 'LDAP User Search'","Verifies if all the default fields for LDAP user search are populated", "All the related fields should be displayed","Behaves as expected","Pass"
							If  blUserID = 1 and bldashboarparam = True Then
								RSAM_Automation_Result_File_Update "Response Type 'LDAP User Search'","Verifies if all the default fields for LDAP user search are populated and selected", "The user id should be enabled and the dashboard parameters should be disabled","Behaves as expected","Pass"
							Else
								RSAM_Automation_Result_File_Update "Response Type 'LDAP User Search'","Verifies if all the default fields for LDAP user search are populated and selected", "The user id should be enabled and the dashboard parameters should be disabled","Does not behave as expected","Fail"
							End If
                        Else
							RSAM_Automation_Result_File_Update "Response Type 'LDAP User Search'","Verifies if all the default fields for LDAP user search are populated", "All the related fields should be displayed","Does not behave as expected","Fail"
						End If
						If strDSPMultiSelect = "Yes"  Then
							Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkbxMultiSel").Set "ON"
						End If
						If answerType<>"" Then
							fnAnswer answerType
						End If
						If attReadHidden<>"" Then
							fnAttReadHidden attReadHidden
						End If
						If strUsesAttType<>"" Then
							fnUsesAttType strUsesAttType
						End If
						If usrRole<>"" Then
							fnAssignRoleLDAPuser usrRole
						End If
						If attusrDisplay<>"" Then
							fnAttLDAPUserDisplay attusrDisplay
						End If
						If strPreventUnassign = "Yes" Then
							Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkPreventUnassign").Set "On"
						End If
						fnAttDescription
						Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					Case "Cosmetic"
						If Browser("RSAM").Dialog("Microsoft Internet Explorer").WinButton("TotalLengthHTMLOK").Exist Then
							Browser("RSAM").Dialog("Microsoft Internet Explorer").WinButton("TotalLengthHTMLOK").Click
						End If
						fnAttDescription
						If strUsesAttType<>"" Then
							fnUsesAttType strUsesAttType
						End If
						Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					Case "Number"
						fnAttDescription
						If answerType<>"" Then
							fnAnswer answerType
						End If
						If attReadHidden<>"" Then
							fnAttReadHidden attReadHidden
						End If
						If strUsesAttType<>"" Then
							fnUsesAttType strUsesAttType
						End If
						Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					Case "List Box"
						fnAttDescription
						If answerType<>"" Then
							fnAnswer answerType
						End If
						If attReadHidden<>"" Then
							fnAttReadHidden attReadHidden
						End If
						If strUsesAttType<>"" Then
							fnUsesAttType strUsesAttType
						End If
						Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					Case "Multi-Select"
						fnAttDescription
						If answerType<>"" Then
							fnAnswer answerType
						End If
						If attReadHidden<>"" Then
							fnAttReadHidden attReadHidden
						End If
						If strUsesAttType<>"" Then
							fnUsesAttType strUsesAttType
						End If
						Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					Case "Date Picker"
						fnAttDescription
						If answerType<>"" Then
							fnAnswer answerType
						End If
						If attReadHidden<>"" Then
							fnAttReadHidden attReadHidden
						End If
						If strUsesAttType<>"" Then
							fnUsesAttType strUsesAttType
						End If
						Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					Case "File Attachment"
						fnAttDescription
						If answerType<>"" Then
							fnAnswer answerType
						End If
						If attReadHidden<>"" Then
							fnAttReadHidden attReadHidden
						End If
						If strUsesAttType<>"" Then
							fnUsesAttType strUsesAttType
						End If
						Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					Case "Saved RSAM Search"
						blsearchlist = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebList("xddlSearchTypes").Exist
						blsearchlistdefaultvalue  = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebList("xddlSearchTypes").GetROProperty("default value")
						bldashboardparam = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkbxDashboardParam").Object.isDisabled
						blbypassperm = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkByPassPerm").Exist
						blsavedsearchtable = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("SavedSearchTable").Exist
						If blsearchlist and blbypassperm and blsavedsearchtable Then
							RSAM_Automation_Result_File_Update "Response Type 'Saved RSAM Search'","Verifies if all the default fields for Saved RSAM Search are populated", "All the related fields should be displayed","Behaves as expected","Pass"
							If blsearchlistdefaultvalue="Object Search" and bldashboardparam = True Then
								RSAM_Automation_Result_File_Update "Response Type 'Saved RSAM  Search'","Verifies if all the default fields for Saved RSAM search are populated and selected", "The object search should be selected  and the dashboard parameters should be disabled","Behaves as expected","Pass"
							Else
								RSAM_Automation_Result_File_Update "Response Type 'Saved RSAM  Search'","Verifies if all the default fields for Saved RSAM search are populated and selected", "The object search should be selected  and the dashboard parameters should be disabled","Does not Behave as expected","Fail"
							End If
						Else
							RSAM_Automation_Result_File_Update "Response Type 'Saved RSAM Search'","Verifies if all the default fields for Saved RSAM Search are populated", "All the related fields should be displayed","Does not Behaves as expected","Fail"
						End If
						If strDSPMultiSelect = "Yes"  Then
							Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkbxMultiSel").Set "ON"
						End If
						If answerType<>"" Then
							fnAnswer answerType
						End If
						If attReadHidden<>"" Then
							fnAttReadHidden attReadHidden
						End If
						If strUsesAttType<>"" Then
							fnUsesAttType strUsesAttType
						End If
						If strSavedSearchListType<>"" Then
							 fnSavedSearchList strSavedSearchListType
						End If
						If strSavedSearches<>"" Then
							fnSelectSavedSearches strSavedSearches
						End If
						If strBypassPerm = "Yes" Then
							Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("xchkByPassPerm").Set "ON"
						End If
						fnAttDescription
						iSearchRowNum = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("SavedSearchTable").GetRowWithCellText(strDSPName)
						Set chkSearchName = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("SavedSearchTable").ChildItem(iSearchRowNum,0,"WebCheckBox",0)
						chkSearchName.Set "ON"
						Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Update").Click
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
					End Select
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			End If
			If Parameter("strAttTypeName") <> "" Then
				RunAction "RSAM_Attribute_Pagination_Search", oneIteration, Parameter("strAttTypeName")
			End If
		End If
'----------------------------------------------------------------------------------------------------
   'Validate the newly created  Attributes
'----------------------------------------------------------------------------------------------------	
	Function fnCancel(oKButtonName)
		If Browser("RSAM").Dialog("Message from webpage").WinButton(oKButtonName).Exist Then
            RSAM_Automation_Result_File_Update "Add Attribute Type","Mandatory Field Validation Add Attribute Type","Validation on all the client side validations should be present","Behaves as expected","Pass"
			Browser("RSAM").Dialog("Message from webpage").WinButton(oKButtonName).Click
			Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebButton("Cancel").Click
			Parameter("strAttTypeName") = ""
			Browser("RSAM").Window("-- Webpage Dialog").Page("Page").WebButton("No").Click
		Else
			RSAM_Automation_Result_File_Update "Add Attribute Type","Mandatory Field Validation Add Attribute Type","Validation on all the client side validations should be present","Does not Behave as expected","Fail"
		End If
	End Function
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Function fnAttDescription()
		With Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute")
			.WebElement("AttDescription").Click
			.WebEdit("Attribute_Description").Set RSAM_RandomString(strAttDescription,"10")
		End With
	End Function
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Function fnAssignRoleLDAPuser(usrRole)
		arrusrRole = Split(usrRole,";")
		iRoleCount = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("ListRelatedRoles").RowCount
		For i = 0 To UBound(arrusrRole)
			For j = 1 To iRoleCount
				strRoleName = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("ListRelatedRoles").GetCellData(j,1)
				If arrusrRole(i) =  strRoleName Then
					Set chkBox =  Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("ListRelatedRoles").ChildItem(j,1,"WebCheckBox",0)
					chkBox.Set "ON"
				End If
			Next
		Next
	End Function
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Function fnUsesAttType(strUsesAttType)
		arruseTyp = Split(strUsesAttType,";")
		iuseCount = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("UsesAttType").RowCount
		For i = 0 To UBound(arruseTyp)
			For j = 1 To iuseCount
				strUseTypeName = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("UsesAttType").GetCellData(j,1)
				If arruseTyp(i) =  Trim(strUseTypeName) Then
					Set chkBox =  Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("UsesAttType").ChildItem(j,1,"WebCheckBox",0)
					chkBox.Set "ON"
				End If
			Next
		Next
	End Function
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Function fnAnswer(answerType)
		If answerType = "Required"  Then
			strAns = "xrdoAnsReq"
		ElseIf answerType = "Optional"  Then
			strAns = "xrdoAnsOpt"
		End If
		Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebRadioGroup("GrpAnswerOption").Select strAns
	End Function
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Function fnAttReadHidden(attReadHidden)
	   arrReadHiddenType = Split(attReadHidden,";")
	   For i = 0 To UBound(arrReadHiddenType)
			If arrReadHiddenType(i) = "Read Only" Then
				Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("chkbxAttrReadOnly").Set "On"
			ElseIf arrReadHiddenType(i) = "Hidden" Then
				Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox("chkbxAttrHidden").Set "On"
			End If
	   Next
	End Function
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Function fnAttLDAPUserDisplay(attusrDisplay)
		arrusrDisplay = Split(attusrDisplay,";")
		For i = 0 To UBound(arrusrDisplay)
			If arrusrDisplay(i) = "User Id" Then
				strchkbox = "xchkUserId"
			ElseIf arrusrDisplay(i) = "Name" Then
				strchkbox = "xchkName"
			ElseIf arrusrDisplay(i) = "eMail"  Then
				strchkbox = "xchkEmail"
			End If
		Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebCheckBox(strchkbox).Set "On"
		Next
	End Function
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Function fnSavedSearchList(strSavedSearchListType)
	   Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebList("xddlSearchTypes").Select strSavedSearchListType
	End Function
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Function fnSelectSavedSearches(strSavedSearches)
		arrSavedSearch = Split(strSavedSearches,";")
		iSearchesCount = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("SavedSearchTable").RowCount
        For i = 0 To UBound(arrSavedSearch)
			For j = 1 To iSearchesCount
				strSearchName = Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("SavedSearchTable").GetCellData(j,3)
				If arrSavedSearch(i) =  strSearchName Then
					Set chkBox =  Browser("RSAM").Page("RSAM Administration").Frame("AddAttribute").WebTable("SavedSearchTable").ChildItem(j,2,"WebCheckBox",0)
					chkBox.Set "ON"
				End If
			Next
		Next
	End Function
'-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------














































































