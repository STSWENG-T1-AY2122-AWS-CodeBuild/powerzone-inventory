*** Settings ***
Documentation   Robot file belonging to the Delivery Access Suite with test cases
...             for accessing delivery features for the Inventory Manager Role
...
...             This set of tests was created using keywords from the SeleniumLibrary
Resource        resource.robot

*** Test Cases ***
[Inventory Manager] Viewing Transaction Information
    Open Deliveries Page as Inventory Manager

    # click on more info to access extra details
    Click Element   xpath=${FIRST DELIVERY PATH}
    Wait Until AjaxComplete

    # should be in the page containing detailed information on the first delivery
    More Info On Deliveries Page Should Be Open

    # close browser
    [Teardown]    Close Browser