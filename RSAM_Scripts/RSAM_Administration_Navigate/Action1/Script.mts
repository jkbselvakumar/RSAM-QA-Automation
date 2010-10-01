' ‘################################################################################################################
' #Script Name:	RSAM _Administrate_Navigate
'# Description:	 This script does the following
'							1. It will  go to the administration page from the Home Pagescreen
'							2. Verify the administration page "Structures & Elements" header
'# Input Parameters: 
'# Return Values:
' # Dependencies: 1. Application should be logged on and the home page should be displayed
'#Author: Selva	
'#Date Created: Feb 02, 2010
'#Date Modified
'#
'# 
'Date		Name					Description
'# ------		--------					---------------
' #
' #
' #
'‘################################################################################################################## 
Function Navigate_Administration()
   With Browser("RSAM Home").Page("RSAM Home")
		.WebElement("Manage").Click
		.WebElement("Administration").Click
   End With
	With Browser("RSAM Home").Page("RSAM Administration")
		.Sync
		If .WebElement("Structures & Elements").Exist Then
            RSAM_Automation_Result_File_Update ResFile_Name,"WA_ADMN_01","To Verify the Administrator Page","Structure & Elements Header should be present","Structure & Elements Header is present","Pass"
		Else
			RSAM_Automation_Result_File_Update ResFile_Name,"WA_ADMN_01","To Verify the Administrator Page","Structure & Elements Header should be present","Structure & Elements Header is not present","Fail"
		End If
	End With
End Function
'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'Calling the function
'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Navigate_Administration

'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------