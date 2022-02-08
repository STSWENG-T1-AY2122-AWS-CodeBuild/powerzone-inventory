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
${ADMIN PASSWORD}       password123
${LOGIN URL}            http://${SERVER}/
${HOME URL}             http://${SERVER}/getHome
${IS AJAX COMPLETE}     ${EMPTY}

${ST EMAIL}             smoketest@gmail.com
${ST FIRST NAME}        Smoke
${ST LAST NAME}         Test
${ST USERNAME}          Stest
${VALID PASSWORD}       Password123!

${DELIVERIES BUTTON}    /assets/fast.png
${TRANSACTIONS BUTTON}  /assets/transaction.png
${INVENTORY BUTTON}     /assets/inventory.png

${ACCOUNT STATUS BUTTON PATH}   /html/body/div[5]/table/tbody/tr[1]/td[4]/button/img
${ACCOUNT EDIT BUTTON PATH}     /html/body/div[5]/table/tbody/tr[1]/td[5]/button/img
${ACCOUNT DELETE BUTTON PATH}   /html/body/div[5]/table/tbody/tr[1]/td[6]/button/img

${FIRST STOCK PATH}     /html/body/div[2]/div[1]/div[2]/div[2]/div/table/tbody/tr[1]/td[6]/a/img
${FIRST STOCK EDIT}     /html/body/div[2]/div[1]/div[2]/div[2]/div/table/tbody/tr[1]/td[7]/a/img
${SECOND TRANSACTION PATH}    /html/body/div[3]/div/div[2]/div/div/table/tbody/tr[2]/td[6]/a/img
${SECOND TRANSACTION EDIT PATH}    /html/body/div[3]/div/div[2]/div/div/table/tbody/tr[2]/td[7]/a/img
${FIRST DELIVERY PATH}         /html/body/div[3]/div/div[2]/div/div/table/tbody/tr/td[6]/a/img
${FIRST DELIVERY EDIT PATH}    /html/body/div[3]/div/div[2]/div/div/table/tbody/tr/td[7]/a/img

${ST DAY}               31
${ST MONTH}             01
${ST YEAR}              2023
${ST SUPPLIER NAME}     ST Supplier 1
${ST LOCATION}          ST Storage Location 1
${ST QUANTITY}          4
${ST PRICE}             0.44
${ST DATE}              01/31/2023

${NEW NAME}             Kerosene
${NEW DAY}              12
${NEW MONTH}            05
${NEW YEAR}             2022
${NEW SUPPLIER NAME}    Changed Supplier
${NEW LOCATION}         Changed Storage Location
${NEW QUANTITY}         111
${NEW PRICE}            45.54
${NEW DATE VALUE}       2022-05-12

${VALID GASOLINE}       2
${VALID P95}            2
${VALID DIESEL}         2
${VALID P97}            2
${VALID KEROSENE}       2

${DAILY GASOLINE}       43.21
${DAILY P95}            55.97
${DAILY DIESEL}         53.10
${DAILY P97}            49.71
${DAILY KEROSENE}       64.22


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

Select Transaction Cashier Role
    Select From List By Value   id:signup-role   transaction-cashier

Home Page Should Be Open
    Page Should Contain Image     ${DELIVERIES BUTTON} 
    Page Should Contain Image     ${TRANSACTIONS BUTTON}
    Page Should Contain Image     ${INVENTORY BUTTON}

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

Login As Administrator
    Input Login Username  ${ADMIN USERNAME}
    Input Login Password  ${ADMIN PASSWORD}
    Confirm Log In
    Wait Until Ajax Complete
    Home Page Should Be Open
    Wait Until Ajax Complete

Go Back To Log In
    Click Button    go-back-to-login-btn

Success Page Should Be Open
    Page Should Contain Element     go-back-to-login-btn

Log Out User
    Click Element   link:Log Out
    Login Page Should Be Open
    Wait Until Ajax Complete

Load Sign Up Page
    Go To Sign Up
    Sign Up Page Should Be Open
    Wait Until AjaxComplete

Sign Up For Smoke Testing Purposes
    Select Transaction Cashier Role
    Input Email  ${ST EMAIL}
    Input First Name  ${ST FIRST NAME}
    Input Last Name  ${ST LAST NAME}
    Input Username  ${ST USERNAME}
    Input Password  ${VALID PASSWORD}
    Input Confirm Password  ${VALID PASSWORD}
    Click Element   signup-fname
    Confirm Sign Up

Wait Until AjaxComplete
    FOR    ${INDEX}    IN RANGE    1    100000
        ${IS AJAX COMPLETE}    Execute JavaScript    return window.jQuery!=undefined && jQuery.active==0
        Log     ${INDEX}
        Log     ${IS AJAX COMPLETE}
        Run Keyword If      ${IS AJAX COMPLETE}==True    Exit For Loop
    END
    Execute Async JavaScript	var callback = arguments[arguments.length - 1]; window.setTimeout(callback, 1000)

Manage Accounts Page Should Be Open
    Page Should Contain     STATUS
    Page Should Contain     EDIT
    Page Should Contain     DELETE

Set First Account To Accepted
    Click Element   xpath=${ACCOUNT STATUS BUTTON PATH}
    Click Element   accept-account-btn

Inventory Page Should Be Open
    Page Should Contain     INVENTORY

Add Stock Page Should Be Open
    Page Should Contain     ADD STOCK

Edit Stock Page Should Be Open
    Page Should Contain     EDIT STOCK

Select Diesel Name
    Select From List By Value   id:add-stock-name   diesel

Input Date
    [Arguments]     ${day}   ${month}    ${year}
    Press Keys      add-stock-date-purchased    ${day}  ${month}    ${year}

Input Supplier
    [Arguments]     ${supplier}
    Input Text      add-stock-supplier    ${Supplier}

Input Location
    [Arguments]     ${location}
    Input Text      add-stock-storage    ${location}

Input Quantity
    [Arguments]     ${quantity}  
    Input Text      add-stock-quantity    ${quantity}

Input Price
    [Arguments]     ${price}
    Input Text      add-stock-price-purchased    ${price}

Confirm Adding Stock
    Click Button    confirm-add-stock-btn

Confirm Test Stock
    Page Should Contain     ${ST SUPPLIER NAME}
    Page Should Contain     ${ST PRICE}
    Page Should Contain     ${ST DATE}

Edit Kerosene Name
    Select From List By Value   id:edit-stock-name   kerosene

Edit Diesel Name
    Select From List By Value   id:edit-stock-name   diesel

Edit Date
    [Arguments]     ${day}   ${month}    ${year}
    Press Keys      edit-stock-date-purchased    ${day}  ${month}    ${year}

Edit Supplier
    [Arguments]     ${supplier}
    Input Text      edit-stock-supplier    ${Supplier}

Edit Location
    [Arguments]     ${location}
    Input Text      edit-stock-storage    ${location}

Edit Quantity
    [Arguments]     ${quantity}  
    Input Text      edit-stock-quantity-purchased    ${quantity}

Edit Price
    [Arguments]     ${price}
    Input Text      edit-stock-price-purchased    ${price}

Confirm Editing Stock
    Click Button    confirm-edit-stock-btn

Confirm Edited Stock
    Element Attribute Value Should Be   more-info-stock-name    value   ${NEW NAME}
    Element Attribute Value Should Be   more-info-stock-date-purchased      value   ${NEW DATE VALUE}
    Element Attribute Value Should Be   more-info-stock-supplier    value   ${NEW SUPPLIER NAME}
    Element Attribute Value Should Be   more-info-stock-storage     value   ${NEW LOCATION}
    Element Attribute Value Should Be   more-info-stock-quantity    value   61
    Element Attribute Value Should Be   more-info-stock-price-purchased     value   ${NEW PRICE}

More Info On Stock Page Should Be Open
    Page Should Contain     Name
    Page Should Contain     Supplier
    Page Should Contain     Storage Location
    Page Should Contain     Quantity (L)
    Page Should Contain     Price Purchased (₱)
    Page Should Contain     Date Purchased

Transactions Page Should Be Open
    Wait Until Ajax Complete
    Page Should Contain     TRANSACTIONS

Add Transactions Page Should Be Open
    Wait Until Ajax Complete
    Page Should Contain   ADD TRANSACTION

Open Transactions Page as Administrator
    Home Page Should Be Open
    Click Image   ${TRANSACTIONS BUTTON}
    Transactions Page Should Be Open
    Wait Until Ajax Complete

Open Add Transactions Page as Administrator
    Open Transactions Page as Administrator
    Click Element   //*[@href="/getAddTransaction"]
    Add Transactions Page Should Be Open
    Wait Until Ajax Complete

Input Transaction Name
    [Arguments]   ${name}
    Input Text    add-transaction-customer-name   ${name}

Input Transaction Number
    [Arguments]   ${number}
    Input Text    add-transaction-customer-number   ${number}

Input Transaction Date
    [Arguments]   ${month}    ${day}    ${year}
    Press Keys    add-transaction-date    ${month}    ${day}    ${year}

Input Transaction Quantity
    [Arguments]   ${gasoline}   ${p95}    ${diesel}   ${p97}    ${kerosene}
    Input Text    add-transaction-gasoline-liters   ${gasoline}
    Input Text    add-transaction-premium-gasoline-95-liters    ${p95}
    Input Text    add-transaction-diesel-liters   ${diesel}
    Input Text    add-transaction-premium-gasoline-97-liters    ${p97}
    Input Text    add-transaction-kerosene-liters   ${kerosene}

Confirm Transaction
    Click Element   confirm-add-transaction-btn

Edit Transactions Page Should Be Open
    Wait Until Ajax Complete
    Page Should Contain   EDIT TRANSACTION

Edit Second Transaction as Administrator
    Click Element   xpath=${SECOND TRANSACTION EDIT PATH}
    Edit Transactions Page Should Be Open

Input Transaction Name Edit
    [Arguments]   ${name}
    Input Text    edit-transaction-customer-name   ${name}

Input Transaction Number Edit
    [Arguments]   ${number}
    Input Text    edit-transaction-customer-number   ${number}

Input Transaction Date Edit
    [Arguments]   ${day}    ${month}    ${year}
    Press Keys    edit-transaction-date    ${day}    ${month}    ${year}

Input Transaction Quantity Edit
    [Arguments]   ${gasoline}   ${p95}    ${diesel}   ${p97}    ${kerosene}
    Input Text    edit-transaction-gasoline-liters   ${gasoline}
    Input Text    edit-transaction-premium-gasoline-95-liters    ${p95}
    Input Text    edit-transaction-diesel-liters   ${diesel}
    Input Text    edit-transaction-premium-gasoline-97-liters    ${p97}
    Input Text    edit-transaction-kerosene-liters   ${kerosene}

Confirm Transaction Edit
    Click Element   confirm-edit-transaction-btn

Confirm Edited Transaction
    Element Attribute Value Should Be   more-info-transaction-customer-name    value   Palshell
    Element Attribute Value Should Be   more-info-transaction-customer-number      value   8888888
    Element Attribute Value Should Be   more-info-transaction-date    value   2022-03-15
    Element Attribute Value Should Be   more-info-transaction-gasoline-liters    value   ${VALID GASOLINE} 
    Element Attribute Value Should Be   more-info-transaction-premium-gasoline-95-liters     value   ${VALID P95}
    Element Attribute Value Should Be   more-info-transaction-diesel-liters     value   ${VALID DIESEL} 
    Element Attribute Value Should Be   more-info-transaction-premium-gasoline-97-liters     value   ${VALID P97} 
    Element Attribute Value Should Be   more-info-transaction-kerosene-liters     value   ${VALID KEROSENE} 

Deliveries Page Should Be Open
    Wait Until Ajax Complete
    Page Should Contain     DELIVERIES

Edit Deliveries Page Should Be Open
    Wait Until Ajax Complete
    Page Should Contain   EDIT DELIVERY

Edit First Delivery As Administrator
    Click Element   xpath=${FIRST DELIVERY EDIT PATH}
    Edit Deliveries Page Should Be Open
    Wait Until Ajax Complete

Input Delivery Name Edit
    [Arguments]   ${name}
    Input Text    edit-delivery-customer-name   ${name}

Input Delivery Number Edit
    [Arguments]   ${number}
    Input Text    edit-delivery-customer-number   ${number}

Input Delivery Warehouse Edit
    [Arguments]   ${warehouse}
    Input Text    edit-delivery-warehouse   ${warehouse}

Input Delivery Drop-Off Edit
    [Arguments]   ${dropoff}
    Input Text    edit-delivery-dropoff   ${dropoff}

Input Delivery Delivery Manager Edit
    [Arguments]   ${dm}
    Input Text    edit-delivery-manager   ${dm}

Input Delivery Driver Edit
    [Arguments]   ${driver}
    Input Text    edit-delivery-driver   ${driver}

Input Delivery Date Edit
    [Arguments]   ${day}    ${month}    ${year}
    Press Keys    edit-delivery-date    ${day}    ${month}    ${year}

Confirm Delivery Edit
    Click Element   confirm-edit-delivery-btn
    Wait Until AjaxComplete

Confirm Edited Delivery
    Element Attribute Value Should Be   more-info-delivery-customer-name    value   Caltex
    Element Attribute Value Should Be   more-info-delivery-customer-number      value   9175548663
    Element Attribute Value Should Be   more-info-delivery-date    value   2022-03-15
    Element Attribute Value Should Be   more-info-delivery-warehouse    value   Somewhere 560, Ina St. 
    Element Attribute Value Should Be   more-info-delivery-dropoff     value   In AnotherLife St.
    Element Attribute Value Should Be   more-info-delivery-manager     value   Mr. DM
    Element Attribute Value Should Be   more-info-delivery-driver     value   Dabus Drib Err

Click Daily Edit Prices Button
    Click Element   edit-price-btn

Confirm Daily Price
    Click Element   confirm-edit-price
    Wait Until AjaxComplete

Input DP Gasoline
    [Arguments]   ${gasprice}
    Input Text    edit-gasoline-price   ${gasprice}

Input DP Premium 95
    [Arguments]   ${prem95price}
    Input Text    edit-premium-gasoline-95-price   ${prem95price}

Input DP Diesel
    [Arguments]   ${dieselprice}
    Input Text    edit-diesel-price   ${dieselprice}

Input DP Premium 97
    [Arguments]   ${prem97price}
    Input Text    edit-premium-gasoline-97-price   ${prem97price}

Input DP Kerosene
    [Arguments]   ${keroseneprice}
    Input Text    edit-kerosene-price   ${keroseneprice}

Check Daily Price Match
    Element Text Should Be   gasoline-price                    ${DAILY GASOLINE}
    Element Text Should Be   premium-gasoline-95-price         ${DAILY P95}
    Element Text Should Be   diesel-price                      ${DAILY DIESEL}
    Element Text Should Be   premium-gasoline-97-price         ${DAILY P97}
    Element Text Should Be   kerosene-price                    ${DAILY KEROSENE}

Edit First Account Role To Delivery Manager
    Click Element   xpath=${ACCOUNT EDIT BUTTON PATH}
    Select From List By Value   id:edit-account-role   delivery-manager
    Click Element   confirm-edit-account-role-btn

Delete First Account
    Click Element   xpath=${ACCOUNT DELETE BUTTON PATH}
    Click Element   confirm-delete-account-btn