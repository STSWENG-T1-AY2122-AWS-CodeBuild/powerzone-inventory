*** Settings ***
Documentation   A test suite with tests for a valid and invalid login
...
...             This test follows the example using keywords from
...             the SeleniumLibrary
Resource         resource.robot

*** Test Cases ***
Valid login
    # open browser, set window size, check if in login page
    Open Browser To Login Page
    # input username
    Input Username    ${VALID USER}
    # input password
    Input Pass    ${VALID PASSWORD}
    # click login button
    Submit Credentials
    # should be open in products page
    Home Page Should Be Open
    # close browser
    [Teardown]    Close Browser

Invalid Login
    Open Browser To Login Page
    # input username
    Input Username    ${INVALID USER}
    # input password
    Input Pass    ${VALID PASSWORD}
    # click login button
    Submit Credentials
    # Error message is "Invalid credentials"
    Element Text Should Be    invalid-login    Invalid credentials
    # close browser
    [Teardown]    Close Browser
