*** Settings ***
Documentation   Robot file belonging to the Delivery Access Suite with test cases
...             for accessing delivery features for the Delivery Manager Role
...
...             This set of tests was created using keywords from the SeleniumLibrary
Resource        resource.robot

*** Test Cases ***
[Delivery Manager] Viewing Transaction Information
    Open Deliveries Page as Delivery Manager

    # click on more info to access extra details
    Click Element   xpath=${FIRST DELIVERY PATH}
    Wait Until Ajax Complete

    # should be in the page containing detailed information on the first delivery
    More Info On Deliveries Page Should Be Open

    # return to home
    Click Element   link:Home
    Wait Until Ajax Complete

[Delivery Manager] Inputted Correct Delivery Details - Edit
    Edit First Delivery From Home
    Input Name Edit   Caltron
    Input Number Edit   09565522369
    Input Date Edit   25   02    2022
    Input Warehouse Edit    TheOneThat 560, Ina St.
    Input Drop-Off Edit  In SomeOtherLife St.
    Input Delivery Manager Edit  Mr. MD
    Input Driver Edit  Daht Ruc Drie Berr
    Wait Until Ajax Complete
    Wait Until Element Is Enabled   confirm-edit-delivery-btn
    Element Should Be Enabled   confirm-edit-delivery-btn
    Confirm Delivery Edit
    Wait Until Ajax Complete

    Deliveries Page Should Be Open
    Wait Until Ajax Complete

    Click Element   xpath=${FIRST DELIVERY PATH}
    Wait Until Ajax Complete
    Confirm Edited Delivery 2

    Click Element   link:Home
    Wait Until Ajax Complete

[Delivery Manager] Phone Number is not 10 digits - Edit
    Edit First Delivery From Home
    Input Name Edit   Caltron
    Input Number Edit   23
    Input Date Edit   25   02    2022
    Input Warehouse Edit    TheOneThat 560, Ina St.
    Input Drop-Off Edit  In SomeOtherLife St.
    Input Delivery Manager Edit  Mr. MD
    Input Driver Edit  Daht Ruc Drie Berr
    Wait Until Ajax Complete
    Page Should Contain   Invalid phone number (should have 7 to 15 digits) 
    
    Click Element   link:Home
    Wait Until Ajax Complete

[Delivery Manager] User attempts to input incorrect data - Edit
    Edit First Delivery From Home
    Input Name Edit   Caltron
    Input Number Edit   abc
    Input Date Edit   de   fg    hijk
    Input Warehouse Edit    TheOneThat 560, Ina St.
    Input Drop-Off Edit  In SomeOtherLife St.
    Input Delivery Manager Edit  Mr. MD
    Input Driver Edit  Daht Ruc Drie Berr
    Check Fields For Content Edit

    [Teardown]    Close Browser