# Contributing to the Repository

Before submitting a pull request, contributors are requested to observe the following procedure:

1. **Documents**. Read the following documents and comply with the guidelines stated therein:
   - [Project Proposal and Standards](https://drive.google.com/file/d/1M4Yia4GSVdtk8iS_J5kjrANo8KcG4avp/view?usp=sharing) - Refer to this document for the coding standards and the team workflow.
   - [Continuous Integration Plan](https://drive.google.com/file/d/17Da54zUm8k1dcB4syzvPqWraSlaZumCS/view?usp=sharing) - Refer to this document for the updated team workflow with the addition of the CI/CD pipeline.

2. **`.env`**. Secure a copy of the `.env` file from the developers. 

   **IMPORTANT:** Make sure that the `testing-mode` variable is set to `on`. This directs all the database operations to the test database (leaving the production database unaffected).

   On the off chance that it is assigned a different value:
   - Set `testing-mode` to `on`;
   - Kill all `node` processes;
   - Restart the server; and
   - Verify that you are working with the test database before proceeding.

3. **Linting**. This project uses ESLint for linting and enforcing uniform and consistent coding style. Run the following command to flag issues:
   ```
   npm run lint
   ```
   
   To automatically fix *some* of the issues (namely those that can be resolved by ESLint), run the following command:
   ```
   npm run lint-fix
   ```

   If ESLint is already globally installed in your system, verify that it uses this project's configuration file: [`.eslintrc.json`](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/blob/main/.eslintrc.json). 
   
   The linter also flags missing and invalid JSDoc documentation as errors. Hence, it is imperative to properly document additional methods and update the documentation of modified functions, especially if the changes are substantial.
   
4. **Unit Testing**. Write unit tests for additional methods and maintain a code coverage of least 80%. Note that unit tests should **not** include any database connections (even to mock databases) since these already fall under the purview of integration tests (performed by the Quality Assurance team). To test controller methods, use spying, stubbing, or mocking instead. 

   The command to run the unit tests is as follows:
   ```
   npm run test
   ```

   To generate HTML reports for the unit test and code coverage (which may be helpful for visualizing failed test cases or uncovered code), run the following command:
   ```
   npm run test-report
   ```

**IMPORTANT:**
The workflow currently includes three pull request-triggered checks:
- Node.js CI / build
- Node.js CI / test
- GitGuardian security checks

Failing any one of these three checks will result in the rejection of the pull request.
