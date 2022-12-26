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


***Keywords***
Go to Home
    Click Element   //*[@href="/getHome"]

Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Login Page Should Be Open

Login Page Should Be Open
    Wait Until Ajax Complete
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


Wait Until Ajax Complete
    FOR    ${INDEX}    IN RANGE    1    100000
        ${IS AJAX COMPLETE}    Execute JavaScript    return window.jQuery!=undefined && jQuery.active==0
        Log     ${INDEX}
        Log     ${IS AJAX COMPLETE}
        Run Keyword If      ${IS AJAX COMPLETE}==True    Exit For Loop
    END
    Execute Async JavaScript	var callback = arguments[arguments.length - 1]; window.setTimeout(callback, 2500)

Open Inventories Page as Inventory Manager
    Open Browser To Login Page
    Login Page Should Be Open
    Input Username  ${IM USERNAME}
    Input Password  ${VALID PASSWORD}
    Confirm Log In
    Wait Until Ajax Complete
    Home Page Should Be Open
    Click Image   ${INVENTORY BUTTON}
    Wait Until Ajax Complete
    Inventories Page Should Be Open
    Wait Until Ajax Complete

Inventories Page Should Be Open
    Page Should Contain   Inventory

Open Add Stock Page
    Click Element   //*[@href="/getAddStock"]
    Wait Until Ajax Complete
    Add Stock Page Should Be Open
    Wait Until Ajax Complete

Add Stock Page Should Be Open
    Page Should Contain   ADD STOCK

Select Fuel Type
    [Arguments]   ${fuel}
    Select From List By Value   id:add-stock-name   ${fuel}

Fill Supplier
    [Arguments]   ${supplier}
    Input Text    add-stock-supplier    ${supplier}

Fill Storage Location
    [Arguments]   ${storage}
    Input Text    add-stock-storage   Warehouse A   ${storage}

Fill Date Purchased
    [Arguments]   ${day}    ${month}    ${year}
    Press Keys    add-stock-date-purchased    ${day}    ${month}    ${year}

Fill Quantity Purchased
    [Arguments]   ${quantity}
    Input Text    add-stock-quantity    ${quantity}

Fill Price Purchased
    [Arguments]   ${price}
    Input Text    add-stock-price-purchased   ${price}

Buy Gasoline Stock
    [Arguments]   ${supplier}   ${storage}    ${day}    ${month}    ${year}   ${quantity}   ${price}
    Open Add Stock Page
    Select Fuel Type  gasoline
    Fill Supplier  ${supplier}
    Fill Storage Location  ${storage}
    Fill Date Purchased  ${day}  ${month}  ${year}
    Fill Quantity Purchased  ${quantity}
    Fill Price Purchased  ${price}
    Wait Until Ajax Complete
    Click Element   confirm-add-stock-btn
    Wait Until Ajax Complete

Buy Premium Gasoline 95 Stock
    [Arguments]   ${supplier}   ${storage}    ${day}    ${month}    ${year}   ${quantity}   ${price}
    Open Add Stock Page
    Select Fuel Type    premium-gasoline-95
    Fill Supplier  ${supplier}
    Fill Storage Location  ${storage}
    Fill Date Purchased  ${day}  ${month}  ${year}
    Fill Quantity Purchased  ${quantity}
    Fill Price Purchased  ${price}
    Wait Until Ajax Complete
    Click Element   confirm-add-stock-btn
    Wait Until Ajax Complete

Buy Diesel Stock
    [Arguments]   ${supplier}   ${storage}    ${day}    ${month}    ${year}   ${quantity}   ${price}
    Open Add Stock Page
    Select Fuel Type    diesel
    Fill Supplier  ${supplier}
    Fill Storage Location  ${storage}
    Fill Date Purchased  ${day}  ${month}  ${year}
    Fill Quantity Purchased  ${quantity}
    Fill Price Purchased  ${price}
    Wait Until Ajax Complete
    Click Element   confirm-add-stock-btn
    Wait Until Ajax Complete

Buy Premium Gasoline 97 Stock
    [Arguments]   ${supplier}   ${storage}    ${day}    ${month}    ${year}   ${quantity}   ${price}
    Open Add Stock Page
    Select Fuel Type    premium-gasoline-97
    Fill Supplier  ${supplier}
    Fill Storage Location  ${storage}
    Fill Date Purchased  ${day}  ${month}  ${year}
    Fill Quantity Purchased  ${quantity}
    Fill Price Purchased  ${price}
    Wait Until Ajax Complete
    Click Element   confirm-add-stock-btn
    Wait Until Ajax Complete

Buy Kerosene Stock
    [Arguments]   ${supplier}   ${storage}    ${day}    ${month}    ${year}   ${quantity}   ${price}
    Open Add Stock Page
    Select Fuel Type    kerosene
    Fill Supplier  ${supplier}
    Fill Storage Location  ${storage}
    Fill Date Purchased  ${day}  ${month}  ${year}
    Fill Quantity Purchased  ${quantity}
    Fill Price Purchased  ${price}
    Wait Until Ajax Complete
    Click Element   confirm-add-stock-btn
    Wait Until Ajax Complete

Log Out
    Click Element   //*[@href="/getLogOut"]
    Wait Until Ajax Complete

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
    Transactions Page Should Be Open
    Wait Until Ajax Complete

Open Add Transactions Page as Transaction Cashier
    Open Transactions Page as Transaction Cashier
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

Transactions Page Should Be Open
    Wait Until Ajax Complete
    Page Should Contain     TRANSACTIONS

Add Transactions Page Should Be Open
    Wait Until Ajax Complete
    Page Should Contain   ADD TRANSACTION

Login as Transaction Cashier to Add Transactions
    Input Username  ${TC USERNAME}
    Input Password  ${VALID PASSWORD}
    Confirm Log In
    Wait Until Ajax Complete
    Home Page Should Be Open
    Click Image   ${TRANSACTIONS BUTTON}
    Transactions Page Should Be Open
    Wait Until Ajax Complete
    Click Element   //*[@href="/getAddTransaction"]
    Add Transactions Page Should Be Open
    Wait Until Ajax Complete