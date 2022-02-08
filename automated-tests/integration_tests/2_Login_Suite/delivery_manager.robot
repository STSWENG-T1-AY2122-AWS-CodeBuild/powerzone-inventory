*** Settings ***
Documentation   Robot file belonging to the Login Test Suite with test cases
...             for valid and invalid logins for the Delivery Manager Role
...
...             This set of tests was created using keywords from the SeleniumLibrary
Resource        resource.robot

*** Test Cases ***
[Delivery Manager] Invalid Login
    # open browser, set window size, check if in login page
    Open Browser To Login Page
    # should be open in log in page
    Login Page Should Be Open
    Wait Until Ajax Complete
    # input invalid username with any password
    Input Username  ${INVALID USER}
    Input Password  ${VALID PASSWORD}
    Confirm Log In
    # Error message is "Invalid credentials"
    Wait Until Element Is Visible   invalid-login
    Wait Until Ajax Complete
    Element Text Should Be    invalid-login    Invalid credentials
    
    # reload page
    Reload Page
    # input valid username with invalid password
    Input Username  ${DM USERNAME}
    Input Password  ${INVALID PASSWORD}
    Confirm Log In
    # Error message is "Invalid credentials"
    Wait Until Element Is Visible   invalid-login
    Wait Until Ajax Complete
    Element Text Should Be    invalid-login    Invalid credentials
    # reload page for next test case
    Reload Page

[Delivery Manager] Valid Login
    # should be open in log in page
    Login Page Should Be Open
    Wait Until Ajax Complete
    # input invalid username with any password
    Input Username  ${DM USERNAME}
    Input Password  ${VALID PASSWORD}
    Confirm Log In
    Wait Until Ajax Complete
    # should be open in home page
    Home Page Should Be Open

[Delivery Manager] Role-Specific Feature Presence
    # should be open in home page
    Home Page Should Be Open

    # go to transactions page
    Click Image     ${TRANSACTIONS BUTTON}
    # should be in transactions page
    Transactions Page Should Be Open
    Wait Until Ajax Complete
    # verify role access in page
    Page Should Not Contain    + Add Transaction
    Page Should Not Contain    EDIT
    Page Should Contain    MORE INFO
    # return to home page using powerzone logo
    Click Element   link:POWERZONE
    Wait Until Ajax Complete
    # should be open in home page
    Home Page Should Be Open

    # go to deliveries page
    Click Image     ${DELIVERIES BUTTON}
    Wait Until Ajax Complete
    # should be in deliveries page
    Deliveries Page Should Be Open
    Wait Until Ajax Complete
    # verify role access in page
    Page Should Contain    EDIT
    Page Should Contain    MORE INFO
    # return to home page using home button
    Click Element   link:Home
    Wait Until Ajax Complete
    # should be open in home page
    Home Page Should Be Open

    # go to inventory page
    Click Image     ${INVENTORY BUTTON}
    Wait Until Ajax Complete
    # should be in inventory page
    Inventory Page Should Be Open
    Wait Until Ajax Complete
    # verify role access in page
    Page Should Not Contain    + Add Stock
    Page Should Not Contain    EDIT
    Page Should Contain    MORE INFO
    # return to home page using powerzone logo
    Click Element   link:POWERZONE
    Wait Until Ajax Complete
    # should be open in home page
    Home Page Should Be Open
    Wait Until Ajax Complete
    Element Text Should Not Be    edit-price-btn    Edit

    # close browser
    [Teardown]    Close Browser