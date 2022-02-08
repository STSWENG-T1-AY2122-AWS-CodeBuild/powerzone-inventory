*** Settings ***
Documentation   A resource file with reusable keywords and variables
...
...             Creating system specific keywords from default keywords
...             from SeleniumLibrary
Library         SeleniumLibrary

*** Variables ***
${SERVER}               powerzone-inventory.herokuapp.com
${BROWSER}              chrome
${DELAY}                0.1
${ADMIN USERNAME}       powerzoneadmin
${INVALID USER}         powerzone
${ADMIN PASSWORD}       password123
${LOGIN URL}            http://${SERVER}/
${HOME URL}             http://${SERVER}/getHome
${EXISTING EMAIL}       administrator@gmail.com
${EXISTING USERNAME}    powerzoneadmin
${INVALID USERNAME}     !@#$
${EMPTY USERNAME}       ${SPACE}
${IS AJAX COMPLETE}     ${EMPTY}

${SHORT PASSWORD}       Password123
${INVALID PASSWORD}     Password1234
${VALID PASSWORD}       Password123!

${IM EMAIL}             inventorymanager@gmail.com
${IM FIRST NAME}        Inventory
${IM LAST NAME}         Manager
${IM USERNAME}          Imanager

${DM EMAIL}             deliverymanager@gmail.com
${DM FIRST NAME}        Delivery
${DM LAST NAME}         Manager
${DM USERNAME}          Dmanager

${TC EMAIL}             transactioncashier@gmail.com
${TC FIRST NAME}        Transaction
${TC LAST NAME}         Cashier
${TC USERNAME}          Tcashier


*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Login Page Should Be Open

Login Page Should Be Open
    Page Should Contain Element    login-btn

Sign Up Page Should Be Open
    Page Should Contain Element    signup-btn

Select Delivery Manager Role
    Select From List By Value   id:signup-role   delivery-manager

Select Inventory Manager Role
    Select From List By Value   id:signup-role   inventory-manager

Select Transaction Cashier Role
    Select From List By Value   id:signup-role   transaction-cashier

Input Email
    [Arguments]    ${email}
    Input Text    signup-email    ${email}

Input First Name
    [Arguments]    ${fname}
    Input Text    signup-fname    ${fname}

Input Last Name
    [Arguments]    ${lname}
    Input Text    signup-lname    ${lname}

Input Username
    [Arguments]    ${username}
    Input Text    signup-username    ${username}

Input Password
    [Arguments]    ${pass}
    Input Text    signup-password    ${pass}

Input Login Username
    [Arguments]    ${username}
    Input Text    login-username    ${username}

Input Login Password
    [Arguments]    ${pass}
    Input Text    login-password    ${pass}

Input Confirm Password
    [Arguments]    ${cpass}
    Input Text    signup-confirm-password    ${cpass}

Go To Sign Up
    Click Link    Sign Up

Confirm Sign Up
    Click Button    signup-btn

Confirm Log In
    Click Button    login-btn

Go Back To Log In
    Click Button    go-back-to-login-btn

Success Page Should Be Open
    Page Should Contain Element     go-back-to-login-btn

Wait Until Ajax Complete
    FOR    ${INDEX}    IN RANGE    1    100000
        ${IS AJAX COMPLETE}    Execute JavaScript    return window.jQuery!=undefined && jQuery.active==0
        Log     ${INDEX}
        Log     ${IS AJAX COMPLETE}
        Run Keyword If      ${IS AJAX COMPLETE}==True    Exit For Loop
    END
    Execute Async JavaScript	var callback = arguments[arguments.length - 1]; window.setTimeout(callback, 2500)