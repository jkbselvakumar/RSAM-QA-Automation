' ‘################################################################################################################
' #Script Name:	RSAM _Login_Suite
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
Dim pageFlag, counter, clrAttTyp
pageFlag =1
counter =1
Do While Browser("RSAM").Page("RSAM Administration").Frame("AttributeFrame").Link("Next").Exist or counter = 1
	rows = Browser("RSAM").Page("RSAM Administration").Frame("AttributeFrame").WebTable("AttributeTypeQuestions").RowCount
	For i=2 to rows
		strAttTypeName = Browser("RSAM").Page("RSAM Administration").Frame("AttributeFrame").WebTable("AttributeTypeQuestions").GetCellData(i,4)
		strAttResponseType = Browser("RSAM").Page("RSAM Administration").Frame("AttributeFrame").WebTable("AttributeTypeQuestions").GetCellData(i,7)
		If strAttTypeName = Parameter("attType_Name") Then
        	clrAttTyp  = Browser("RSAM").Page("RSAM Administration").Frame("AttributeFrame").WebTable("AttributeTypeQuestions").WebElement("innerhtml:="&strAttTypeName&"","innertext:="&strAttTypeName&"").Object.currentStyle.backgroundColor
			 iPosAtt = iPospage+(i-1)
			If clrAttTyp = "Yellow"  Then
                RSAM_Automation_Result_File_Update "Pagination_Search","The Color of the created/selected attribute type","Color of "&strAttTypeName&"=Yellow","Color of "&strAttTypeName&"="&clrAttTyp&"","Pass"
			Else
			    RSAM_Automation_Result_File_Update "Pagination_Search","The Color of the created/selected attribute type","Color of "&strAttTypeName&"=Yellow","Color of "&strAttTypeName&"="&clrAttTyp&"","Fail"
			End If
			RSAM_Automation_Result_File_Update "Pagination_Search","The Position of the created/selected attribute type","Position of "&strAttTypeName&"="&iPosAtt&"","Position of "&strAttTypeName&"="&iPosAtt&"","Pass"
        	Exit Do
		End If
    Next
	If  Browser("RSAM").Page("RSAM Administration").Frame("AttributeFrame").Link("Next").Exist Then
		Browser("RSAM").Page("RSAM Administration").Frame("AttributeFrame").Link("Next").Click
		iPospage = pageFlag*(rows-1)
		pageFlag = pageFlag + 1
		counter = 1
	Else
		Exit Do
	End If
Loop
'################################################################################################################## 







