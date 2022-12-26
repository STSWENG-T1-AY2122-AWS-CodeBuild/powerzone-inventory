*** Settings ***
Documentation   Robot file belonging to the Login Test Suite with test cases
...             for accessing inventory features for the Administrator Role
...
...             This set of tests was created using keywords from the SeleniumLibrary
Resource        resource.robot

*** Test Cases ***
[Administrator] Viewing Inventory Stock Information
    # open browser, set window size, check if in login page
    Open Browser To Login Page
    # should be open in log in page
    Login Page Should Be Open
    Wait Until Ajax Complete
    # input invalid username with any password
    Input Username  ${ADMIN USERNAME}
    Input Password  ${ADMIN PASSWORD}
    Confirm Log In
    Wait Until Ajax Complete
    # should be open in home page
    Home Page Should Be Open

    # go to inventory page
    Click Image     ${INVENTORY BUTTON}
    # should be in inventory page
    Inventory Page Should Be Open
    Wait Until Ajax Complete
    # click on the more info button
    Click Element   xpath=${FIRST STOCK PATH}
    Wait Until Ajax Complete
    # should be in the page containing detailed information on the first stock
    More Info On Stock Page Should Be Open
    
    # return to inventory page using go back button for next test case
    Click Element    //*[@class="btn btn-primary fw-bold float-start px-5 rounded-pill shadow-sm text-white"]
    Wait Until Ajax Complete
    
[Administrator] Inputted Correct Inventory Details
    # should be in inventory page
    Inventory Page Should Be Open
    Wait Until Ajax Complete
    # click on the add stock button
    Click Element   //*[@class="btn btn-primary fw-bold float-end px-5 rounded-pill shadow-sm text-white"]
    Wait Until Ajax Complete
    # should be in add stock page
    Add Stock Page Should Be Open
    # input valid details
    Select Kerosene Name
    Click Element   add-stock-date-purchased
    Input Date  ${TEST DAY 1}  ${TEST MONTH 1}  ${TEST YEAR 1}
    Input Supplier  ${TEST SUPPLIER NAME 1}
    Input Location  ${TEST LOCATION 1}
    Input Quantity  ${TEST QUANTITY 1}
    Input Price  ${TEST PRICE 1}
    # confirm button should be enabled
    Wait Until Ajax Complete
    Wait Until Element Is Enabled   confirm-add-stock-btn
    Element Should Be Enabled   confirm-add-stock-btn
    # click on the confirm button
    Confirm Adding Stock
    Wait Until Ajax Complete
    Confirm Test Stock 1

[Administrator] Price Has More than 2 Decimal Places
    # should be in inventory page
    Inventory Page Should Be Open
    Wait Until Ajax Complete
    # click on the add stock button
    Click Element   //*[@class="btn btn-primary fw-bold float-end px-5 rounded-pill shadow-sm text-white"]
    Wait Until Ajax Complete
    # should be in add stock page
    Add Stock Page Should Be Open
    # input valid details
    Select Kerosene Name
    Click Element   add-stock-date-purchased
    Input Date  ${TEST DAY 1}  ${TEST MONTH 1}  ${TEST YEAR 1}
    Input Supplier  ${TEST SUPPLIER NAME 1}
    Input Location  ${TEST LOCATION 1}
    Input Quantity  ${TEST QUANTITY 1}
    # input invalid price
    Input Price  ${INVALID PRICE}
    Wait Until Ajax Complete
    # click the confirm button
    Confirm Adding Stock
    # should still be in add stock page
    Add Stock Page Should Be Open

    # return to inventory page using cancel button for next test case
    Click Element    //*[@class="btn btn-primary fw-bold float-start px-5 rounded-pill shadow-sm text-white"]
    Wait Until Ajax Complete

[Administrator] User Attempts to Type Wrong Data in Data Fields
    # should be in inventory page
    Inventory Page Should Be Open
    Wait Until Ajax Complete
    # click on the add stock button
    Click Element   //*[@class="btn btn-primary fw-bold float-end px-5 rounded-pill shadow-sm text-white"]
    Wait Until Ajax Complete
    # should be in add stock page
    Add Stock Page Should Be Open
    # input valid details for all fields except date
    Select Kerosene Name
    Input Supplier  ${TEST SUPPLIER NAME 1}
    Input Location  ${TEST LOCATION 1}
    Input Quantity  ${TEST QUANTITY 1}
    Input Price  ${TEST PRICE 1}
    Click Element   add-stock-date-purchased
    Input Date  ${INVALID DATA TYPE}  ${INVALID DATA TYPE}  ${INVALID DATA TYPE}
    Wait Until Ajax Complete
    # confirm button should still be disabled
    Element Should Be Disabled   confirm-add-stock-btn

    # input a valid date then an invalid quantity
    Click Element   add-stock-date-purchased
    Input Date  ${TEST DAY 1}  ${TEST MONTH 1}  ${TEST YEAR 1}
    Input Quantity  ${INVALID DATA TYPE}
    # confirm button should become disabled
    Wait Until Ajax Complete
    Element Should Be Disabled   confirm-add-stock-btn

    # input a valid quantity then an invalid price
    Input Quantity  ${TEST QUANTITY 1}
    Input Price  ${INVALID DATA TYPE}
    # confirm button should become disabled
    Wait Until Ajax Complete
    Element Should Be Disabled   confirm-add-stock-btn

    # return to inventory page using cancel button for next test case
    Click Element    //*[@class="btn btn-primary fw-bold float-start px-5 rounded-pill shadow-sm text-white"]
    Wait Until Ajax Complete

[Administrator] Inputted Correct Inventory Edit Details
    # should be in inventory page
    Inventory Page Should Be Open
    Wait Until Ajax Complete
    # click on the edit stock button
    Click Element   xpath=${FIRST STOCK EDIT}
    Wait Until Ajax Complete
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
    Wait Until Ajax Complete
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
    # should be in the page containing detailed information on the first stock
    More Info On Stock Page Should Be Open
    # check if changes were made
    Confirm Edited Stock 1

    # return to inventory page using go back button for next test case
    Click Element    //*[@class="btn btn-primary fw-bold float-start px-5 rounded-pill shadow-sm text-white"]
    Wait Until Ajax Complete
    
[Administrator] Edited Price Has More than 2 Decimal Places
    # should be in inventory page
    Inventory Page Should Be Open
    Wait Until Ajax Complete
    # click on the edit stock button
    Click Element   xpath=${FIRST STOCK EDIT}
    Wait Until Ajax Complete
    # should be in edit stock page
    Edit Stock Page Should Be Open
    # input valid details
    Edit Diesel Name
    Click Element   edit-stock-date-purchased
    Edit Date  ${ORIG DAY}  ${ORIG MONTH}  ${ORIG YEAR}
    Edit Supplier  ${ORIG SUPPLIER NAME}
    Edit Location  ${ORIG LOCATION}
    Edit Quantity  ${ORIG QUANTITY}
    # input invalid price
    Edit Price  ${INVALID PRICE}
    Wait Until Ajax Complete
    # click the confirm button
    Confirm Editing Stock
    Wait Until Ajax Complete
    # should still be in add stock page
    Edit Stock Page Should Be Open

    # return to inventory page using cancel button for next test case
    Click Element    //*[@class="btn btn-primary fw-bold float-start px-5 rounded-pill shadow-sm text-white"]
    Wait Until Ajax Complete

[Administrator] User Attempts to Type Wrong Data to Edit Data Fields
    # should be in inventory page
    Inventory Page Should Be Open
    Wait Until Ajax Complete
    # click on the edit stock button
    Click Element   xpath=${FIRST STOCK EDIT}
    Wait Until Ajax Complete
    # should be in edit stock page
    Edit Stock Page Should Be Open
    # input valid details for all fields except quantity
    Edit Diesel Name
    Edit Supplier  ${ORIG SUPPLIER NAME}
    Edit Location  ${ORIG LOCATION}
    Edit Quantity  ${ORIG QUANTITY}
    Edit Price  ${ORIG PRICE}
    Click Element   edit-stock-date-purchased
    Edit Date  ${ORIG DAY}  ${ORIG MONTH}  ${ORIG YEAR}
    Edit Quantity  ${INVALID DATA TYPE}
    # confirm button should become disabled
    Wait Until Ajax Complete
    Element Should Be Disabled   confirm-edit-stock-btn

    # input a valid quantity then an invalid price
    Edit Quantity  ${ORIG QUANTITY}
    Edit Price  ${INVALID DATA TYPE}
    # confirm button should become disabled
    Wait Until Ajax Complete
    Element Should Be Disabled   confirm-edit-stock-btn

    # close browser
    [Teardown]    Close Browser