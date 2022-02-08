*** Settings ***
Documentation   Robot file belonging to the Transaction Access Suite with test cases
...             for accessing delivery features for the Delivery Manager Role
...
...             This set of tests was created using keywords from the SeleniumLibrary
Resource        resource.robot

*** Test Cases ***
[Delivery Manager] Viewing Transaction Information
    Open Transactions Page as Delivery Manager

    # click on more info to access extra details
    Click Element   xpath=${FIRST TRANSACTION PATH}
    Wait Until Ajax Complete

    # should be in the page containing detailed information on the first delivery
    More Info On Transactions Page Should Be Open

    # close browser
    [Teardown]    Close Browser