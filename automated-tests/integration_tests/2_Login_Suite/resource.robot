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
${LOGIN URL}            http://${SERVER}/
${IS AJAX COMPLETE}     ${EMPTY}

${INVALID USER}         powerzone
${INVALID PASSWORD}     Password1234
${VALID PASSWORD}       Password123!

${IM USERNAME}          Imanager
${DM USERNAME}          Dmanager
${TC USERNAME}          Tcashier

${ADMIN USERNAME}       powerzoneadmin
${ADMIN PASSWORD}       password123

${DELIVERIES BUTTON}    /assets/fast.png
${TRANSACTIONS BUTTON}  /assets/transaction.png
${INVENTORY BUTTON}     /assets/inventory.png


*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Login Page Should Be Open

Login Page Should Be Open
    Page Should Contain Element    login-btn

Input Username
    [Arguments]    ${username}
    Input Text    login-username    ${username}

Input Password
    [Arguments]    ${pass}
    Input Text    login-password    ${pass}

Input Confirm Password
    [Arguments]    ${cpass}
    Input Text    signup-confirm-password    ${cpass}

Confirm Log In
    Click Button    login-btn

Home Page Should Be Open
    Page Should Contain Image     ${DELIVERIES BUTTON} 
    Page Should Contain Image     ${TRANSACTIONS BUTTON}
    Page Should Contain Image     ${INVENTORY BUTTON}

Deliveries Page Should Be Open
    Page Should Contain     DELIVERIES

Transactions Page Should Be Open
    Page Should Contain     TRANSACTIONS

Inventory Page Should Be Open
    Page Should Contain     INVENTORY

Wait Until Ajax Complete
    FOR    ${INDEX}    IN RANGE    1    100000
        ${IS AJAX COMPLETE}    Execute JavaScript    return window.jQuery!=undefined && jQuery.active==0
        Log     ${INDEX}
        Log     ${IS AJAX COMPLETE}
        Run Keyword If      ${IS AJAX COMPLETE}==True    Exit For Loop
    END
    Execute Async JavaScript	var callback = arguments[arguments.length - 1]; window.setTimeout(callback, 2500)

Manage Accounts Page Should Be Open
    Page Should Contain     STATUS
    Page Should Contain     EDIT
    Page Should Contain     DELETE

Set First Three Accounts To Accepted
    Click Element   xpath=/html/body/div[5]/table/tbody/tr[1]/td[4]/button/img
    Click Element   accept-account-btn
    Click Element   xpath=/html/body/div[5]/table/tbody/tr[2]/td[4]/button/img
    Click Element   accept-account-btn
    Click Element   xpath=/html/body/div[5]/table/tbody/tr[3]/td[4]/button/img
    Click Element   accept-account-btn