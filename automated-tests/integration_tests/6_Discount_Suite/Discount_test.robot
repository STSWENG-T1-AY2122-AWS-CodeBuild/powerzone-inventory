*** Settings ***
Documentation   Robot file belonging to the Discount Suite with test cases
...             for checking whether the discounts for transactions
...             are correctly computed
...
...             This set of tests was created using keywords from the SeleniumLibrary
Resource        resource.robot

*** Test Cases ***

[Delivery Suite] Total Quantity for Transaction is Less than 50,000

    Open Inventories Page as Inventory Manager
    Buy Gasoline Stock  Petron  Warehouse A  25  01  2022  10000  20
    Buy Premium Gasoline 95 Stock  Caltex  Warehouse B  16  12  2021  5000  30
    Buy Diesel Stock  Shell  Warehouse C  19  11  2021  5000  20
    Buy Premium Gasoline 97 Stock  Unioil  Warehouse D  30  01  2022  500  20
    Buy Kerosene Stock  Phoenix  Warehouse E  06  12  2021  10000  15

    Log Out

    Login as Transaction Cashier to Add Transactions
    Input Name    Marco
    Input Number    09053462142
    Input Date    03    02    2022
    Input Quantity    10000   5000    5000    500   10000
    Confirm Transaction

    Page Should Contain   ₱ 1800720.00

    [Teardown]    Close Browser

[Delivery Suite] Total Quantity for Transaction is greater than or equal to 50,000 but less than 150,000

    Open Inventories Page as Inventory Manager
    Buy Gasoline Stock  Shell  Warehouse A  15  01  2022  30000  15
    Buy Premium Gasoline 95 Stock  Seaoil  Warehouse B  02  06  2021  25000  90
    Buy Diesel Stock  Phoenix  Warehouse C  29  12  2021  1000  60
    Buy Premium Gasoline 97 Stock  Petron  Warehouse D  16  01  2022  3000  25
    Buy Kerosene Stock  Phoenix  Warehouse E  13  12  2021  7000  13

    Log Out

    Login as Transaction Cashier to Add Transactions
    Input Name    Righto
    Input Number    09176362992
    Input Date    31    01    2022
    Input Quantity    30000   25000    1000    3000   7000
    Confirm Transaction

    Wait Until Ajax Complete
    Page Should Contain   ₱ 3818707.20


    [Teardown]    Close Browser

[Delivery Suite] Total Quantity for Transaction is 150,000 or higher

    Open Inventories Page as Inventory Manager
    Buy Gasoline Stock  Petron  Warehouse A  26  10  2021  40000  10
    Buy Premium Gasoline 95 Stock  Caltex  Warehouse B  18  09  2021  75000  30
    Buy Diesel Stock  Shell  Warehouse C  01  12  2021  10  80
    Buy Premium Gasoline 97 Stock  Phoenix  Warehouse D  07  01  2022  60000  35
    Buy Kerosene Stock  Caltex  Warehouse E  05  02  2022  25000  10

    Log Out

    Login as Transaction Cashier to Add Transactions
    Input Name    Polo
    Input Number    09054425632
    Input Date    02    02    2022
    Input Quantity    40000   75000    10    60000   25000
    Confirm Transaction

    Wait Until Ajax Complete
    Page Should Contain   ₱ 11218160.88

    [Teardown]    Close Browser