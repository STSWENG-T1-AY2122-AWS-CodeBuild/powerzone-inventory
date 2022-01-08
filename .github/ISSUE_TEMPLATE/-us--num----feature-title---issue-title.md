---
name: "[US <num>: <feature title>] Issue Title"
about: ''
title: ''
labels: ''
assignees: ''

---

**Defect ID # 001**

**Description:**
When signing up for a new account, the system allows the user to input a username that does not contain at least one of the following characters: lower case letters, upper case letters, numbers, and punctuations.

**Build/Platform:** Google Chrome

**Steps to Reproduce:**
1. Click "Sign Up" from the welcome page.
2. Enter "@@@#@$#@" as the username.
3. Enter accepted inputs for the remaining input fields.

**Actual Results:**
The system does not display any error messages and allows the user to submit the registration details.

**Expected Results:**
An error message stating "Should contain at least one lowercase letter, uppercase letter, number, or punctuation" should be displayed below the username input field, and the user should not be allowed to sign up.
