' â€˜################################################################################################################
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

	Dim strDatabaseFullPwd, strEncryptedPwd, strDatabaseUsername,strDatabasePwd, blCompPwd,strLoginMsg

'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'Creates the Result File, Loads the Env File, Imports the DataTable
'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load_RSAM_Env_XML_File
	dtTable = Environment("RSAM_DataTable_Path")&"\RSAM_Login_Validation.xls"
    DataTable.ImportSheet dtTable,"RSAM_Login_Validation","RSAM_Login_Suite"
	strServer = DataTable.Value("Server",dtLocalSheet)
	strDBName= DataTable.Value("DBName",dtLocalSheet)
	strUsr = DataTable.Value("User",dtLocalSheet)
	strPwd = DataTable.Value("Pwd",dtLocalSheet)
	strUsrQuery = DataTable.Value("UID_Query",dtLocalSheet)
	strPwdQuery = DataTable.Value("Pwd_Query",dtLocalSheet)
	strURL = DataTable.Value("URL",dtLocalSheet)

'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'The following code encrypts the password using the password utility and fetches the username and password from the database and compares them.
'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	strEncryptedPwd = RSAM_Password_Encrypt(Environment("pwd"))
	strDatabaseUsername = Get_Value_From_DB (strServer,strDBName,strUsr,strPwd,strUsrQuery)
	strDatabaseFullPwd = Get_Value_From_DB (strServer,strDBName,strUsr,strPwd,strPwdQuery)
	iUsrLen = Len(Environment("Username"))
	iPwdLen = Len(strEncryptedPwd)
	strDatabasePwd = Trim(Mid(strDatabaseFullPwd,2,iPwdLen))
	blCompUsr = strComp(Environment("Username"),Mid(strDatabaseUsername,1,iUsrLen),1)
	blCompPwd = strComp(strEncryptedPwd,strDatabasePwd,1)

'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'The following will launch the application and enter the login credentials and clicks on the login button
'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	RSAM_Launch "name:=RSAM Login","title:=RSAM Login"
	If Browser("RSAM").Dialog("Message from webpage").Exist = TRUE then
		Browser("RSAM").Dialog("Message from webpage").WinButton("OK").Click
	Else
		Browser("RSAM").Dialog("Microsoft Internet Explorer").WinButton("text:=OK").Click
	End If
	RSAM_Login	"name:=RSAM Login","title:=RSAM Login"

'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'The following will condition will validate for the invalid username or passwords and also blank username and password
'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	If strDatabaseUsername="Data NOT FOUND for SQLQuery Specified" or strDatabaseFullPwd = "Data NOT FOUND for SQLQuery Specified" or blCompUsr<>0 or  blCompPwd <> 0 Then
		strLoginMsg = Browser("name:=RSAM Login").Dialog("regexpwndtitle:=Message from webpage","nativeclass:=#32770").WinButton("regexpwndtitle:=OK","nativeclass:=Button").GetROProperty("attached text")
		If strLoginMsg = "User ID or Password invalid - please try again"  Then
			RSAM_Automation_Result_File_Update "Login","When username or Password is invalid","User ID or Password invalid - please try again",strLoginMsg,"Pass"
			Browser("name:=RSAM Login").Dialog("regexpwndtitle:=Message from webpage","nativeclass:=#32770").WinButton("regexpwndtitle:=OK","nativeclass:=Button").Click
		Else
			RSAM_Automation_Result_File_Update "Login","When username or Password is invalid","User ID or Password invalid - please try again",strLoginMsg,"Fail"
		End If
	Else
		RSAM_Login_Validation
	End If

'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



























