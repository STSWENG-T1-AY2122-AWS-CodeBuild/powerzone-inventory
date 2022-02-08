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

${FIRST TRANSACTION PATH}         /html/body/div[3]/div/div[2]/div/div/table/tbody/tr[1]/td[6]/a/img
${SECOND TRANSACTION PATH}    /html/body/div[3]/div/div[2]/div/div/table/tbody/tr[2]/td[6]/a/img
${SECOND TRANSACTION EDIT PATH}    /html/body/div[3]/div/div[2]/div/div/table/tbody/tr[2]/td[7]/a/img

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

${TEST DATE MONTH}      02
${TEST DATE DAY}        01
${TEST DATE YEAR}       2022

${VALID GASOLINE}       1
${VALID P95}            1
${VALID DIESEL}         1
${VALID P97}            1
${VALID KEROSENE}       1

${INVALID GASOLINE}       99999
${INVALID P95}            99999
${INVALID DIESEL}         99999
${INVALID P97}            99999
${INVALID KEROSENE}       99999


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

Confirm Log In
    Click Button    login-btn

Home Page Should Be Open
    Page Should Contain Image     ${DELIVERIES BUTTON} 
    Page Should Contain Image     ${TRANSACTIONS BUTTON}
    Page Should Contain Image     ${INVENTORY BUTTON}

Transactions Page Should Be Open
    Wait Until Ajax Complete
    Page Should Contain     TRANSACTIONS

More Info On Transactions Page Should Be Open
    Page Should Contain     Transaction ID
    Page Should Contain     Status
    Page Should Contain     Customer Name
    Page Should Contain     Customer Phone Number
    Page Should Contain     Transaction Date
    Page Should Contain     Amount

Wait Until Ajax Complete
    FOR    ${INDEX}    IN RANGE    1    100000
        ${IS AJAX COMPLETE}    Execute JavaScript    return window.jQuery!=undefined && jQuery.active==0
        Log     ${INDEX}
        Log     ${IS AJAX COMPLETE}
        Run Keyword If      ${IS AJAX COMPLETE}==True    Exit For Loop
    END
    Execute Async JavaScript	var callback = arguments[arguments.length - 1]; window.setTimeout(callback, 2500)

Open Transactions Page as Transaction Cashier
    Open Browser To Login Page
    Login Page Should Be Open
    Wait Until Ajax Complete
    Input Username  ${TC USERNAME}
    Input Password  ${VALID PASSWORD}
    Confirm Log In
    Wait Until Ajax Complete
    Home Page Should Be Open
    Click Image   ${TRANSACTIONS BUTTON}
    Wait Until Ajax Complete
    Transactions Page Should Be Open
    Wait Until Ajax Complete

Open Transactions Page as Administrator
    Open Browser To Login Page
    Login Page Should Be Open
    Wait Until Ajax Complete
    Input Username  ${ADMIN USERNAME}
    Input Password  ${ADMIN PASSWORD}
    Confirm Log In
    Wait Until Ajax Complete
    Home Page Should Be Open
    Click Image   ${TRANSACTIONS BUTTON}
    Wait Until Ajax Complete
    Transactions Page Should Be Open
    Wait Until Ajax Complete

Open Transactions Page as Inventory Manager
    Open Browser To Login Page
    Login Page Should Be Open
    Wait Until Ajax Complete
    Input Username  ${IM USERNAME}
    Input Password  ${VALID PASSWORD}
    Confirm Log In
    Wait Until Ajax Complete
    Home Page Should Be Open
    Click Image   ${TRANSACTIONS BUTTON}
    Wait Until Ajax Complete
    Transactions Page Should Be Open
    Wait Until Ajax Complete

Open Transactions Page as Delivery Manager
    Open Browser To Login Page
    Login Page Should Be Open
    Wait Until Ajax Complete
    Input Username  ${DM USERNAME}
    Input Password  ${VALID PASSWORD}
    Confirm Log In
    Wait Until Ajax Complete
    Home Page Should Be Open
    Click Image   ${TRANSACTIONS BUTTON}
    Wait Until Ajax Complete
    Transactions Page Should Be Open
    Wait Until Ajax Complete

Add Transactions Page Should Be Open
    Wait Until Ajax Complete
    Page Should Contain   ADD TRANSACTION

Edit Transactions Page Should Be Open
    Wait Until Ajax Complete
    Page Should Contain   EDIT TRANSACTION

Open Add Transactions Page as Transaction Cashier
    Open Transactions Page as Transaction Cashier
    Click Element   //*[@href="/getAddTransaction"]
    Add Transactions Page Should Be Open
    Wait Until Ajax Complete

Open Add Transactions Page as Administrator
    Open Transactions Page as Administrator
    Click Element   //*[@href="/getAddTransaction"]
    Add Transactions Page Should Be Open
    Wait Until Ajax Complete

Input Name
    [Arguments]   ${name}
    Input Text    add-transaction-customer-name   ${name}

Input Number
    [Arguments]   ${number}
    Input Text    add-transaction-customer-number   ${number}

Input Date
    [Arguments]   ${month}    ${day}    ${year}
    Press Keys    add-transaction-date    ${month}    ${day}    ${year}

Input Quantity
    [Arguments]   ${gasoline}   ${p95}    ${diesel}   ${p97}    ${kerosene}
    Input Text    add-transaction-gasoline-liters   ${gasoline}
    Input Text    add-transaction-premium-gasoline-95-liters    ${p95}
    Input Text    add-transaction-diesel-liters   ${diesel}
    Input Text    add-transaction-premium-gasoline-97-liters    ${p97}
    Input Text    add-transaction-kerosene-liters   ${kerosene}

Confirm Transaction
    Click Element   confirm-add-transaction-btn
    Wait Until Ajax Complete

Check Fields for Content
    Element Text Should Be   add-transaction-customer-number   \
    Element Text Should Be   add-transaction-premium-gasoline-95-liters   \
    Element Text Should Be   add-transaction-diesel-liters   \
    Element Text Should Be   add-transaction-premium-gasoline-97-liters   \
    Element Text Should Be   add-transaction-kerosene-liters   \

Edit Second Transaction as Transaction Cashier
    Open Transactions Page as Transaction Cashier
    Click Element   xpath=${SECOND TRANSACTION EDIT PATH}
    Edit Transactions Page Should Be Open

Edit Second Transaction as Administrator
    Open Transactions Page as Administrator
    Click Element   xpath=${SECOND TRANSACTION EDIT PATH}
    Edit Transactions Page Should Be Open

Input Name Edit
    [Arguments]   ${name}
    Input Text    edit-transaction-customer-name   ${name}

Input Number Edit
    [Arguments]   ${number}
    Input Text    edit-transaction-customer-number   ${number}

Input Date Edit
    [Arguments]   ${day}    ${month}    ${year}
    Press Keys    edit-transaction-date    ${day}    ${month}    ${year}

Input Quantity Edit
    [Arguments]   ${gasoline}   ${p95}    ${diesel}   ${p97}    ${kerosene}
    Input Text    edit-transaction-gasoline-liters   ${gasoline}
    Input Text    edit-transaction-premium-gasoline-95-liters    ${p95}
    Input Text    edit-transaction-diesel-liters   ${diesel}
    Input Text    edit-transaction-premium-gasoline-97-liters    ${p97}
    Input Text    edit-transaction-kerosene-liters   ${kerosene}

Confirm Transaction Edit
    Click Element   confirm-edit-transaction-btn
    Wait Until Ajax Complete

Check Fields for Content Edit
    Element Text Should Be   edit-transaction-customer-number   \
    Element Text Should Be   edit-transaction-premium-gasoline-95-liters   \
    Element Text Should Be   edit-transaction-diesel-liters   \
    Element Text Should Be   edit-transaction-premium-gasoline-97-liters   \
    Element Text Should Be   edit-transaction-kerosene-liters   \

Add Transaction From Home
    Home Page Should Be Open
    Click Image   ${TRANSACTIONS BUTTON}
    Transactions Page Should Be Open
    Wait Until Ajax Complete
    Click Element   //*[@href="/getAddTransaction"]
    Wait Until Ajax Complete
    Add Transactions Page Should Be Open
    Wait Until Ajax Complete

Edit Second Transaction From Home
    Home Page Should Be Open
    Click Image   ${TRANSACTIONS BUTTON}
    Transactions Page Should Be Open
    Wait Until Ajax Complete
    Click Element   xpath=${SECOND TRANSACTION EDIT PATH}
    Wait Until Ajax Complete
    Edit Transactions Page Should Be Open
    Wait Until Ajax Complete

Confirm Edited Transaction 1
    Element Attribute Value Should Be   more-info-transaction-customer-name    value   Palshell
    Element Attribute Value Should Be   more-info-transaction-customer-number      value   9175548663
    Element Attribute Value Should Be   more-info-transaction-date    value   2022-03-15
    Element Attribute Value Should Be   more-info-transaction-gasoline-liters    value   ${VALID GASOLINE} 
    Element Attribute Value Should Be   more-info-transaction-premium-gasoline-95-liters     value   ${VALID P95}
    Element Attribute Value Should Be   more-info-transaction-diesel-liters     value   ${VALID DIESEL} 
    Element Attribute Value Should Be   more-info-transaction-premium-gasoline-97-liters     value   ${VALID P97} 
    Element Attribute Value Should Be   more-info-transaction-kerosene-liters     value   ${VALID KEROSENE} 

Confirm Edited Transaction 2
    Element Attribute Value Should Be   more-info-transaction-customer-name    value   Paltex
    Element Attribute Value Should Be   more-info-transaction-customer-number      value   9175548663
    Element Attribute Value Should Be   more-info-transaction-date    value   2022-03-15
    Element Attribute Value Should Be   more-info-transaction-gasoline-liters    value   ${VALID GASOLINE} 
    Element Attribute Value Should Be   more-info-transaction-premium-gasoline-95-liters     value   ${VALID P95}
    Element Attribute Value Should Be   more-info-transaction-diesel-liters     value   ${VALID DIESEL} 
    Element Attribute Value Should Be   more-info-transaction-premium-gasoline-97-liters     value   ${VALID P97} 
    Element Attribute Value Should Be   more-info-transaction-kerosene-liters     value   ${VALID KEROSENE} 