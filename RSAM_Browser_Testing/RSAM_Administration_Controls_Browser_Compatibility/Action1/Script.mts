'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'To verify the presence of the controls in the control types of the RSAM Web Admin
'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Browser("RSAM Administration").Page("RSAM Administration").WebElement("Controls").Click
Browser("RSAM Administration").Page("RSAM Administration").Check CheckPoint("RSAM Controls") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration")_;_script infofile_;_ZIP::ssf1.xml_;_
strControlType =  Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").WebTable("ControlTypes").GetCellData(2,4)
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").WebElement("innertext:="&strControlType&"").Click
Browser("RSAM Administration").Page("RSAM Administration").Check CheckPoint("RSAM ControlLevel") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration")_;_script infofile_;_ZIP::ssf2.xml_;_
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").Link("Add").Click @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").Link("Add")_;_script infofile_;_ZIP::ssf3.xml_;_
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame_2").WebElement("Add Control Type FontSizeForma").Check CheckPoint("Add Control Type") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame 2").WebElement("Add Control Type FontSizeForma")_;_script infofile_;_ZIP::ssf4.xml_;_
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame_2").WebButton("Close").Click @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame 2").WebButton("Close")_;_script infofile_;_ZIP::ssf5.xml_;_
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").Link("Search").Click @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").Link("Search")_;_script infofile_;_ZIP::ssf6.xml_;_
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").WebElement("Find Control Element Search").Check CheckPoint("Find Control Element") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").WebElement("Find Control Element Search")_;_script infofile_;_ZIP::ssf7.xml_;_
Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").Link("Close").Click @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration").Frame("Frame").Link("Close")_;_script infofile_;_ZIP::ssf8.xml_;_
'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
'To verify the presence of the controls in the Domains and Control types of the RSAM Web Admin
'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Browser("RSAM Administration").Page("RSAM Administration_2").WebElement("Domains").Click
Browser("RSAM Administration").Page("RSAM Administration_2").Check CheckPoint("RSAM Domains") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration_2")_;_script infofile_;_ZIP::ssf9.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame").WebList("xddlDomainTypes").Select "11" @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame").WebList("xddlDomainTypes")_;_script infofile_;_ZIP::ssf10.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame").WebTable("913").Check CheckPoint("913") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame").WebTable("913")_;_script infofile_;_ZIP::ssf11.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame").Link("Add").Click @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame").Link("Add")_;_script infofile_;_ZIP::ssf12.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame_2").WebElement("Add Control Class/ Domain").Check CheckPoint("Add Control Class") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame 2").WebElement("Add Control Class/ Domain")_;_script infofile_;_ZIP::ssf13.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame_2").WebButton("Close").Click @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame 2").WebButton("Close")_;_script infofile_;_ZIP::ssf14.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame").Link("Edit").Click @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame").Link("Edit")_;_script infofile_;_ZIP::ssf15.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame_2").WebElement("Update Control Class/").Check CheckPoint("Update Control Class") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame 2").WebElement("Update Control Class/")_;_script infofile_;_ZIP::ssf17.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame_2").WebButton("Close").Click @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame 2").WebButton("Close")_;_script infofile_;_ZIP::ssf18.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame").Link("Delete").Click @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame").Link("Delete")_;_script infofile_;_ZIP::ssf19.xml_;_
Browser("RSAM Administration").Dialog("Microsoft Internet Explorer").WinButton("OK").Check CheckPoint("OK") @@ hightlight id_;_4132076_;_script infofile_;_ZIP::ssf20.xml_;_
Browser("RSAM Administration").Dialog("Microsoft Internet Explorer").WinButton("Cancel").Click @@ hightlight id_;_3542350_;_script infofile_;_ZIP::ssf21.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame").Link("Add_2").Click @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame").Link("Add 2")_;_script infofile_;_ZIP::ssf22.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame_2").WebElement("Add Control Class/ Domain").Check CheckPoint("Add Control Class/Domain") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame 2").WebElement("Add Control Class/ Domain")_;_script infofile_;_ZIP::ssf23.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame_2").WebEdit("xtxtName").Set "Test" @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame 2").WebEdit("xtxtName")_;_script infofile_;_ZIP::ssf24.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame_2").WebEdit("Hello").Set "Hello" @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame 2").WebEdit("Hello")_;_script infofile_;_ZIP::ssf25.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame_2").WebButton("Update").Click @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame 2").WebButton("Update")_;_script infofile_;_ZIP::ssf26.xml_;_
Browser("RSAM Administration").Page("RSAM Administration_2").Frame("Frame").WebTable("Domain Types").Check CheckPoint("Domain Types") @@ hightlight id_;_Browser("RSAM Administration").Page("RSAM Administration 2").Frame("Frame").WebTable("Domain Types")_;_script infofile_;_ZIP::ssf27.xml_;_
'---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------










