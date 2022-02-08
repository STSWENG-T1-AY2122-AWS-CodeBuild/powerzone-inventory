*** Settings ***
Documentation   Robot file belonging to the Smoke Test Suite with test cases
...             for testing critical functionalities of the web application
...
...             This set of tests was created using keywords from the SeleniumLibrary
Resource        resource.robot

*** Test Cases ***
Register An Account
    # open browser, set window size, check if in login page
    Open Browser To Login Page
    # go to sign up page
    Load Sign Up Page

    # Create a temporary account
    Sign Up For Smoke Testing Purposes
    # should be open in success page
    Wait Until Page Contains    Kindly wait for the admin to validate the application.
    Success Page Should Be Open

    # click ok button
    Go Back To Log In
    Login Page Should Be Open
    Wait Until Ajax Complete

Administrator Approves Registered Account
    # input invalid username with any password
    Login As Administrator

    # go to accounts page
    Click Element   link:Account
    Wait Until Ajax Complete
    # should be at manage accounts page
    Manage Accounts Page Should Be Open
    # accept account populated in the previous test case
    Set First Account To Accepted

    # log out
    Log Out User

Login Using Newly Approved Account
    # try to login while account is still "Pending" for approval
    Input Login Username  ${ST USERNAME}
    Input Login Password  ${VALID PASSWORD}
    Confirm Log In
    Wait Until Ajax Complete
    # Error message is "Invalid credentials"
    Home Page Should Be Open
    Wait Until Ajax Complete

    # log out
    Log Out User

Add Stock Using Administrator Account
    # input invalid username with any password
    Login As Administrator

    # go to inventory page
    Click Image     ${INVENTORY BUTTON}
    # should be in inventory page
    Inventory Page Should Be Open
    Wait Until Ajax Complete

    # click on the add stock button
    Click Element   //*[@class="btn btn-primary fw-bold float-end px-5 rounded-pill shadow-sm text-white"]
    # should be in add stock page
    Add Stock Page Should Be Open
    # input valid details
    Select Diesel Name
    Click Element   add-stock-date-purchased
    Input Date  ${ST DAY}  ${ST MONTH}  ${ST YEAR}
    Input Supplier  ${ST SUPPLIER NAME}
    Input Location  ${ST LOCATION}
    Input Quantity  ${ST QUANTITY}
    Input Price  ${ST PRICE}
    # confirm button should be enabled
    Wait Until Element Is Enabled   confirm-add-stock-btn
    Element Should Be Enabled   confirm-add-stock-btn
    # click on the confirm button
    Confirm Adding Stock
    Wait Until Ajax Complete
    Confirm Test Stock

Edit Stock Using Administrator
    # click on the edit stock button
    Click Element   xpath=${FIRST STOCK EDIT}
    # should be in edit stock page
    Edit Stock Page Should Be Open
    # input valid details
    Edit Kerosene Name
    Click Element   edit-stock-date-purchased
    Edit Date  ${NEW DAY}  ${NEW MONTH}  ${NEW YEAR}
    Edit Supplier  ${NEW SUPPLIER NAME}
    Edit Location  ${NEW LOCATION}
    Edit Quantity  ${NEW QUANTITY}
    Edit Price  ${NEW PRICE}
    # confirm button should be enabled
    Wait Until Element Is Enabled   confirm-edit-stock-btn
    Element Should Be Enabled   confirm-edit-stock-btn
    # click on the confirm button
    Confirm Editing Stock
    Wait Until Ajax Complete
    
    # should be in inventory page
    Inventory Page Should Be Open
    Wait Until Ajax Complete
    # click on the more info button
    Click Element   xpath=${FIRST STOCK PATH}
    Wait Until Ajax Complete
    # should be in the page containing detailed information on the stock
    More Info On Stock Page Should Be Open
    # check if changes were made
    Confirm Edited Stock

    # go to home
    Click Element   link:Home

Add Transaction Using Administrator
    # open transactions page and add a transaction
    Open Add Transactions Page as Administrator
    Input Transaction Name    Petron
    Input Transaction Number  09175442636
    Input Transaction Date    01    01    2022
    Input Transaction Quantity    ${VALID GASOLINE}   ${VALID P95}    ${VALID DIESEL}   ${VALID P97}    ${VALID KEROSENE}
    Wait Until Element Is Enabled   confirm-add-transaction-btn
    Element Should Be Enabled   confirm-add-transaction-btn
    Confirm Transaction

    # return to transactions page
    Transactions Page Should Be Open
    Wait Until Ajax Complete

    # check if newly added details 
    Page Should Contain   01/01/2022
    Page Should Contain   Petron

Edit Transaction Using Administrator
    # edit the details of the second transaction
    Edit Second Transaction as Administrator
    Input Transaction Name Edit    Palshell
    Input Transaction Number Edit  8888888
    Input Transaction Date Edit    15   03    2022
    Input Transaction Quantity Edit    ${VALID GASOLINE}   ${VALID P95}    ${VALID DIESEL}   ${VALID P97}    ${VALID KEROSENE}
    Wait Until Element Is Enabled   confirm-edit-transaction-btn
    Element Should Be Enabled   confirm-edit-transaction-btn
    Confirm Transaction Edit

    # should be in the transactions page
    Transactions Page Should Be Open
    Wait Until Ajax Complete

    # click on the more info button of the second transaction
    Click Element   xpath=${SECOND TRANSACTION PATH}
    # check if the changed details match
    Confirm Edited Transaction

    # go to home
    Click Element   link:Home
    Home Page Should Be Open
    Wait Until Ajax Complete

Check Delivery Linked to Added Transaction Using Administrator
    # open deliveries page
    Click Image   ${DELIVERIES BUTTON}
    Deliveries Page Should Be Open
    Wait Until Ajax Complete
    # check if name of indicated customer name in added transaction is in the deliveries list
    Page Should Contain   Petron

Edit Delivery Using Administrator
    # edit the details of the first delivery
    Edit First Delivery As Administrator
    Input Delivery Name Edit   Caltex
    Input Delivery Number Edit   09175548663
    Input Delivery Date Edit   15   03    2022
    Input Delivery Warehouse Edit    Somewhere 560, Ina St.
    Input Delivery Drop-Off Edit  In AnotherLife St.
    Input Delivery Delivery Manager Edit  Mr. DM
    Input Delivery Driver Edit  Dabus Drib Err
    Wait Until Element Is Enabled   confirm-edit-delivery-btn
    Element Should Be Enabled   confirm-edit-delivery-btn
    Confirm Delivery Edit

    # should be in deliveries page
    Deliveries Page Should Be Open
    Wait Until Ajax Complete

    # click on the more info button of the first delivery
    Click Element   xpath=${FIRST DELIVERY PATH}
    # check if the changed details match
    Confirm Edited Delivery

    # go to home
    Click Element   link:Home
    Home Page Should Be Open
    Wait Until Ajax Complete

Edit Daily Prices Using Administrator
    # access the editing of daily product prices
    Click Daily Edit Prices Button
    # edit the daily product prices
    Input DP Gasoline  ${DAILY GASOLINE}
    Input DP Premium 95  ${DAILY P95}
    Input DP Diesel  ${DAILY DIESEL}
    Input DP Premium 97  ${DAILY P97}
    Input DP Kerosene  ${DAILY KEROSENE}
    Wait Until AjaxComplete
    Confirm Daily Price

    # check if modified values for product prices match the submitted changes
    Check Daily Price Match
    Wait Until AjaxComplete

Edit Non-Administrator Role
    Home Page Should Be Open
    # go to accounts page
    Click Element   link:Account
    # change role of user to delivery manager
    Edit First Account Role To Delivery Manager
    Wait Until AjaxComplete
    Element Text Should Be      xpath=/html/body/div[5]/table/tbody/tr/td[3]    Delivery Manager

Delete Non-Administrator Role
    # click the delete button and confirm it
    Delete First Account
    Wait Until AjaxComplete
    Reload Page
    Wait Until AjaxComplete
    Page Should Not Contain     Smoke Test
    Page Should Not Contain     Stest
    # close browser
    [Teardown]    Close Browser