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

${FIRST STOCK PATH}     /html/body/div[2]/div[1]/div[2]/div[2]/div/table/tbody/tr[1]/td[6]/a/img
${FIRST STOCK EDIT}     /html/body/div[2]/div[1]/div[2]/div[2]/div/table/tbody/tr[1]/td[7]/a/img

${TEST DAY 1}               31
${TEST MONTH 1}             01
${TEST YEAR 1}              2022
${TEST SUPPLIER NAME 1}     Test Supplier 1
${TEST LOCATION 1}          Test Storage Location 1
${TEST QUANTITY 1}          9
${TEST PRICE 1}             0.99

${TEST DAY 2}               15
${TEST MONTH 2}             6
${TEST YEAR 2}              2022
${TEST SUPPLIER NAME 2}     Test Supplier 2
${TEST LOCATION 2}          Test Storage Location 2
${TEST QUANTITY 2}          1
${TEST PRICE 2}             1.01

${INVALID PRICE}            22.23244324
${INVALID DATA TYPE}        asdfghjkl

${NEW NAME}                 Kerosene
${NEW DAY}                  01
${NEW MONTH}                12
${NEW YEAR}                 2022
${NEW SUPPLIER NAME}        Changed Supplier 1
${NEW LOCATION}             Changed Storage Location 1
${NEW QUANTITY}             150
${NEW PRICE}                70.00
${NEW DATE VALUE}           2022-12-01

${ORIG NAME}                Diesel
${ORIG DAY}                 01
${ORIG MONTH}               01
${ORIG YEAR}                2022
${ORIG SUPPLIER NAME}       Supplier One
${ORIG LOCATION}            2401 Taft Ave., Manila
${ORIG QUANTITY}            100
${ORIG PRICE}               60.00
${ORIG DATE VALUE}          2022-01-01

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

Inventory Page Should Be Open
    Page Should Contain     INVENTORY

Add Stock Page Should Be Open
    Page Should Contain     ADD STOCK

Edit Stock Page Should Be Open
    Page Should Contain     EDIT STOCK

More Info On Stock Page Should Be Open
    Page Should Contain     Name
    Page Should Contain     Supplier
    Page Should Contain     Storage Location
    Page Should Contain     Quantity (L)
    Page Should Contain     Price Purchased (₱)
    Page Should Contain     Date Purchased

Wait Until Ajax Complete
    FOR    ${INDEX}    IN RANGE    1    100000
        ${IS AJAX COMPLETE}    Execute JavaScript    return window.jQuery!=undefined && jQuery.active==0
        Log     ${INDEX}
        Log     ${IS AJAX COMPLETE}
        Run Keyword If      ${IS AJAX COMPLETE}==True    Exit For Loop
    END
    Execute Async JavaScript	var callback = arguments[arguments.length - 1]; window.setTimeout(callback, 2500)

Select Kerosene Name
    Select From List By Value   id:add-stock-name   kerosene

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

Confirm Test Stock 1
    Page Should Contain     ${TEST SUPPLIER NAME 1}
    Page Should Contain     ${TEST PRICE 1}

Confirm Test Stock 2
    Page Should Contain     ${TEST SUPPLIER NAME 2}
    Page Should Contain     ${TEST PRICE 2}

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

Confirm Edited Stock 1
    Element Attribute Value Should Be   more-info-stock-name    value   ${NEW NAME}
    Element Attribute Value Should Be   more-info-stock-date-purchased      value   ${NEW DATE VALUE}
    Element Attribute Value Should Be   more-info-stock-supplier    value   ${NEW SUPPLIER NAME}
    Element Attribute Value Should Be   more-info-stock-storage     value   ${NEW LOCATION}
    Element Attribute Value Should Be   more-info-stock-quantity    value   100
    Element Attribute Value Should Be   more-info-stock-price-purchased     value   70
    
Confirm Edited Stock 2
    Element Attribute Value Should Be   more-info-stock-name    value   ${ORIG NAME}
    Element Attribute Value Should Be   more-info-stock-date-purchased      value   ${ORIG DATE VALUE}
    Element Attribute Value Should Be   more-info-stock-supplier    value   ${ORIG SUPPLIER NAME}
    Element Attribute Value Should Be   more-info-stock-storage     value   ${ORIG LOCATION}
    Element Attribute Value Should Be   more-info-stock-quantity    value   50
    Element Attribute Value Should Be   more-info-stock-price-purchased     value   60