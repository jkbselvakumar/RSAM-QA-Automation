'################################################################################################################
' #Script Name:	RSAM_Create_ObjectType
'# Description:	 This script does the following
'							1. It will load the environment variable file during run time
'							2. Navigate to the Administration page and validate the existence on object types element
'							3. Adds the object type
'							4. Get s the type information from the data table and accordingly creates the object ltype ike aspect or container
'							
'# Input Parameters: 
'# Return Values:
' # Dependencies: 1. The Environment XML File should be present, 
'								2. The framework folder structures should not be modified.
'								3. Object Reporsitory should be associated
'								4. RSAM_Function_Library should be associated
'#Author: Selva	
'#Date Created: July 02, 2010
'#Date Modified
'#
'# 
'Date		Name					Description
'# ------		--------					---------------
'################################################################################################################## 
	Dim dtFileName,strObjTypName, strObjTypDescription, strObjTyp

    Load_RSAM_Env_XML_File	
	dtFileName = Environment("RSAM_DataTable_Path")&"\RSAM_Object_Types.xls"
'----------------------------------------------------------------------------------------------------
    DataTable.ImportSheet dtFileName,1,"RSAM_Add_ObjectTypes"
'----------------------------------------------------------------------------------------------------
	strObjTypName = DataTable("Object_Name","RSAM_Add_ObjectTypes")
	strObjTypDescription = DataTable("Object_Description","RSAM_Add_Attribute")
	strObjTyp = DataTable("Object_Type","RSAM_Add_Attribute")
'----------------------------------------------------------------------------------------------------
'Navigating to the search page 
'----------------------------------------------------------------------------------------------------
	fNavigateUsingTopMenu"RSAM","RSAM Home","Manage>Administration"

'----------------------------------------------------------------------------------------------------
''Validate the existence of object types Grid
'----------------------------------------------------------------------------------------------------
	Browser("RSAM Administration").Page("RSAM Administration").WebElement("Object Types").Click

	If Browser("RSAM Administration").Page("RSAM Administration").Frame("Object Types Frame").WebElement("Object Types").Exist Then
        RSAM_Automation_Result_File_Update "Object Types Grid","Object Types Grid","The object types grid should be present","The object types grid is present","Pass"
	Else
		RSAM_Automation_Result_File_Update "Object Types Grid","Object Types Grid","The object types grid should be present","The object types grid is not present","Fail"
	End If

'----------------------------------------------------------------------------------------------------
''Add s an object types 
'1. Check the value in the data tabke based on that it creates the respective object type like aspect or container.
'----------------------------------------------------------------------------------------------------
	Browser("RSAM Administration").Page("RSAM Administration").Frame("Object Types Frame").Link("Add").Click
	Browser("RSAM Administration").Page("RSAM Administration").Frame("Add or Modify Object Types").WebEdit("Object Type Name").Set strObjTypName
	Browser("RSAM Administration").Page("RSAM Administration").Frame("Add or Modify Object Types").WebEdit("Object Type Description").Set strObjTypDescription

	If strObjTyp = "Aspect" Then
		Browser("RSAM Administration").Page("RSAM Administration").Frame("Add or Modify Object Types").WebCheckBox("AspectType").Set "ON"
	ElseIf strObjTyp = "Container" Then
		Browser("RSAM Administration").Page("RSAM Administration").Frame("Add or Modify Object Types").WebCheckBox("ContainerType").Set "ON"		
	End If
	Browser("RSAM Administration").Page("RSAM Administration").Frame("Add or Modify Object Types").WebButton("Update").Click

'-------------------------------------------------------------------------------------------------------

