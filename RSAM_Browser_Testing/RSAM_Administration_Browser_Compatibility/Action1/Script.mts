'---------------------------------------------------------------------------------------------------------------------------------------------------------
'The Application should be in the Administration page "Structures & Elements"
'---------------------------------------------------------------------------------------------------------------------------------------------------------
' RSAM Administration Home Page
'---------------------------------------------------------------------------------------------------------------------------------------------------------
Browser("RSAM Administration").Page("RSAM Administration_2").Check CheckPoint("RSAM Administration_2") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration_2")_;_script infofile_;_ZIP::ssf7.xml_;_
'---------------------------------------------------------------------------------------------------------------------------------------------------------
' RSAM Administration Attributes Home Page
'---------------------------------------------------------------------------------------------------------------------------------------------------------
Browser("RSAM Administration").Page("RSAM Administration").WebElement("Attributes").Click
Browser("RSAM Administration").Page("RSAM Administration").Check CheckPoint("RSAM Attribute Home Page") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration_2")_;_script infofile_;_ZIP::ssf3.xml_;_
'---------------------------------------------------------------------------------------------------------------------------------------------------------
' RSAM Administration select an attribute and click finding types tab
'---------------------------------------------------------------------------------------------------------------------------------------------------------
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").WebElement("Attribute_Type").Click
Browser("RSAM Administration").Page("RSAM Administration").Check CheckPoint("RSAM_AttribuetType_Selection") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration_2")_;_script infofile_;_ZIP::ssf4.xml_;_
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").WebElement("Finding Types Tab").Click
Browser("RSAM Administration").Page("RSAM Administration").Check CheckPoint("RSAM Attributes_FindingTypes_Tab") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration_2")_;_script infofile_;_ZIP::ssf5.xml_;_
'---------------------------------------------------------------------------------------------------------------------------------------------------------
' RSAM Administration Add Attribute
'---------------------------------------------------------------------------------------------------------------------------------------------------------
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").Link("Add").Click
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").WebElement("Add Attribute Type").Check CheckPoint("Add Attribute Type    FontSizeFormattingStyleAttribute Type Name: Description/Question: Response Type: Text Number List Box Multi-Select Date Picker Dynamic SP LDAP User Search Saved RSAM Search Cosmetic File Attachment # of Lines MultiSelect  User Display Information: User Id Name eMail   Object Search Finding Search Log Search        Answer is Required Answer is Optional 'Make Attribute Read Only'(can only be modified by import or administrator)Hidden Attribute(can only be seen by administrators or in reports) Stored Procedure to use for possible responses:  Uses for this Attribute Type Object Attribute Finding Attribute Dashboard Parameter Finding Identifier Enable Rich Text(HTML) Editing for this Attribute Type when in Findings     25%    50%    75%    100%    200%    300%    400%    500%    600% Find what:Replace with:Match caseMatch whole wordArialVerdanaTahomaCourier NewGeorgia1234567Heading 1Heading 2Heading 3Heading 4Heading 5NormalBlue UnderlineRed BoldALL CAPSall lowercaseReset   Add Multiple") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame").WebElement("Add Attribute Type")_;_script infofile_;_ZIP::ssf6.xml_;_
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").WebButton("Close").Click
'---------------------------------------------------------------------------------------------------------------------------------------------------------



