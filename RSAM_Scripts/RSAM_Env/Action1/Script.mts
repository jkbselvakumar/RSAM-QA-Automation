	Dim currTestPath, prntfolder, rtFolder, RSAM_Automation_Documentation_Path,  RSAM_DataTable_Path, RSAM_Object_Repository_Path, RSAM_Results_Path, RSAM_Scripts_Path, RSAM_Library_Path
	Set fso = CreateObject("Scripting.FileSystemObject")
	currTestPath = Environment.Value("TestDir")
	prntfolder = fso.GetParentFolderName(currTestPath)
	rtFolder = fso.GetParentFolderName(prntfolder)
	RSAM_Pwd_Encryptor = rtFolder&"\"&"RSAM_Library\RSAM Password Encryptor.html"
	RSAM_Automation_Documentation_Path = rtFolder&"\"&"RSAM_Automation_Documentation"
	RSAM_DataTable_Path = rtFolder&"\"&"RSAM_DataTable"
	RSAM_Object_Repository_Path =  rtFolder&"\"&"RSAM_Object_Repository"
	RSAM_Results_Path = rtFolder&"\"&"RSAM_Results"
	RSAM_Scripts_Path = rtFolder&"\"&"RSAM_Scripts_Path"
	RSAM_Library_Path = rtFolder&"\"&"RSAM_Library"
	RSAM_Recovery_Path = rtFolder&"\"&"RSAM_Recovery"
	
'--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'To set the result file as a Global Variable
'--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 XMLEnvFile = RSAM_Library_Path&"\"&"RSAM_Environment.xml"
	Set xmlDoc = CreateObject("Microsoft.XMLDOM")
	xmlDoc.Async = False 
	xmlDoc.Load(XMLEnvFile)
	' update the title of the first book
	Set node = xmlDoc.SelectSingleNode("/RSAM_Environment/Variable[3]/Value")
	node.Text = RSAM_Pwd_Encryptor
	Set node = xmlDoc.SelectSingleNode("/RSAM_Environment/Variable[4]/Value")
	node.Text = RSAM_Automation_Documentation_Path
	Set node = xmlDoc.SelectSingleNode("/RSAM_Environment/Variable[5]/Value")
	node.Text = RSAM_DataTable_Path
	Set node = xmlDoc.SelectSingleNode("/RSAM_Environment/Variable[6]/Value")
	node.Text = RSAM_Object_Repository_Path
	Set node = xmlDoc.SelectSingleNode("/RSAM_Environment/Variable[7]/Value")
	node.Text = RSAM_Results_Path
	Set node = xmlDoc.SelectSingleNode("/RSAM_Environment/Variable[8]/Value")
	node.Text = RSAM_Scripts_Path
	Set node = xmlDoc.SelectSingleNode("/RSAM_Environment/Variable[9]/Value")
	node.Text = RSAM_Library_Path
	Set node = xmlDoc.SelectSingleNode("/RSAM_Environment/Variable[10]/Value")
	node.Text = RSAM_Recovery_Path
	Set node = xmlDoc.SelectSingleNode("/RSAM_Environment/Variable[11]/Value")
	node.Text = RSAM_Automation_Result_File_Create

	' save changes 
	xmlDoc.Save(XMLEnvFile)
'--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





