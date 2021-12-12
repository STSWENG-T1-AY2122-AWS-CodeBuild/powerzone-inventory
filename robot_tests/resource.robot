*** Settings ***
Documentation   A resource file with reusable keywords and variables
...
...             Creating system specific keywords from default keywords
...             from SeleniumLibrary
Library         SeleniumLibrary

*** Variables ***
${SERVER}           localhost:3000
${BROWSER}          headlesschrome
${DELAY}            0.5
${VALID USER}       powerzoneadmin
${INVALID USER}  powerzone
${VALID PASSWORD}   password123
${LOGIN URL}        http://${SERVER}/
${HOME URL}         http://${SERVER}/getHome

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Login Page Should Be Open

Login Page Should Be Open
    Page Should Contain Element    login-btn

Home Page Should Be Open
    Element Text Should Be    edit-price-btn    Edit

Input Username
    [Arguments]    ${username}
    Input Text    login-username    ${username}

Input Pass
    [Arguments]    ${password}
    Input Password    login-password    ${password}

Submit Credentials
    Click Button    login-btn
