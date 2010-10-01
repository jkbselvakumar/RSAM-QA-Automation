'----------------------------------------------------------------------------------------------------
	Parameter("strAttributeTypeName") = "Saved_RSAM_Search_aixd"
	Load_RSAM_Env_XML_File	
	dtFileName = Environment("RSAM_DataTable_Path")&"\RSAM_Attribute_Type.xls"
'----------------------------------------------------------------------------------------------------
    If Parameter("strAttributeTypeName")<>"" Then
		RunAction "RSAM_AttributeType [RSAM_Attribute_Suite]", oneIteration
    	RunAction "RSAM_Attribute_Pagination_Search", oneIteration, Parameter("strAttributeTypeName")
		Browser("RSAM").Page("RSAM Administration").Frame("AttributeFrame").Link("Edit").Click
		RunAction "RSAM_Add_Attribute [RSAM_Attribute_Suite]", oneIteration
	End If


