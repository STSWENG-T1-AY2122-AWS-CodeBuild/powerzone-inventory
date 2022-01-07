# Powerzone Inventory
![badge][badge-html5]
![badge][badge-bootstrap]
![badge][badge-handlebars]
![badge][badge-js]
![badge][badge-jquery]
![badge][badge-mongodb]
![badge][badge-express]
![badge][badge-nodejs] <br/>
![badge][badge-eslint]
![badge][badge-mocha]
![badge][badge-chai]
![badge][badge-selenium]
![badge][badge-heroku] 

[![Actions Status](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/workflows/Node.js%20CI/badge.svg)](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/actions)
![badge][badge-github-actions]

***--- THIS PROJECT IS A WORK IN PROGRESS ---***

This project is a software solution for **Powerzone Inventory**, a fuel company based in Catanduanes, Bicol. This web application seeks to serve as an all-in-one management system for tracking the three major components handled by Powerzone: inventory, transactions, and deliveries. The inventory management system in the application will log all products that come in and out the inventory of the company. This includes both the purchasing of products from suppliers and the selling of products through transactions.

This is the major course output in an advanced software engineering class:
- **Deployed Website**:
- **Video Walkthrough**: 

## Project Structure
The project consists of the following folders:
| Folder | Description |
| --- | --- |
[<code>.github/workflows</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/tree/main/.github/workflows) | Contains the YML file for the continuous integration/continuous delivery (CI/CD) pipeline
| [<code>controllers</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/tree/main/controllers) | Contains the JavaScript files that define callback functions for client-side requests |
| [<code>helpers</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/tree/main/helpers) | Contains the JavaScript files that define helper functions for server-side validation | 
| [<code>misc</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/tree/main/misc) | Contains the JavaScript files for initial database population |
| [<code>models</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/tree/main/models) | Contains the JavaScript files for database modeling (schemas) and access | 
| [<code>public</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/tree/main/public) | Contains the static CSS and JavaScript files, as well as the project assets (image files), for front-end display |
| [<code>routes</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/tree/main/routes) | Contains the JavaScript file that defines the server response to each HTTP method request |
| [<code>test</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/tree/main/test) | Contains the JavaScript files that define the unit tests |
| [<code>views</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/tree/main/views) | Contains the Handlebars template files to be rendered and displayed upon request |

It also includes the following files:

| File | Description |
| --- | --- |
| [<code>.eslintrc.json</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/blob/main/.eslintrc.json) | Specifies the environment and rules for configuring the linter (ESLint) |
| [<code>package-lock.json</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/blob/main/package-lock.json) and [<code>package.json</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/blob/main/package.json) | Store information on the project dependencies |
| [<code>index.js</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/blob/main/index.js) | Entry point of the web application |
| [<code>Procfile</code>]| Specifies the commands run by the application's dynos on Heroku

## Entity Relationship Diagram

The entity relationship diagram to illustrate the schemas can be viewed here [INSERT ERD HERE].

## Running the Application

### Running on the Web

Open the following website: [INSERT LINK HERE].

### Running Locally

1. Before running the application locally, the following software have to be installed:

   | Software | Description | License |
   | --- | --- | --- |
   | [Node.js](https://nodejs.org/en/download/) | JavaScript runtime built on Chrome's V8 JavaScript engine | MIT License |
   | [git](https://git-scm.com/downloads) *(optional)* | Distributed version control system |  GNU General Public License v2.0 |
   
   **Download [Node.js v12.16.3](https://nodejs.org/dist/v12.16.3/) to ensure compatibility with dependencies.**

2. Create a copy of this repository:
   - If git is installed, type the following command on the terminal:
   
     ```
     git clone https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory
     ```
      
   - If git is not installed, click the green `Code` button near the top right of the repository and choose [`Download ZIP`](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/archive/refs/heads/main.zip). Once the zipped folder has been downloaded, extract its contents.

3. On the main project directory, run the following command to **install the dependencies**: 

   ```
   npm install
   ```

   If the command is executed successfully, the dependencies will be installed into the folder <code>node_modules</code> following the dependency tree found in [<code>package-lock.json</code>](https://github.com/STSWENG-T1-AY2122-AWS-CodeBuild/powerzone-inventory/blob/main/package-lock.json).

###
   **The project uses a pre-populated remote database. DO STEP 4 ONLY AFTER A DATABASE RESET OR FOR TESTING PURPOSES.**

4. Run the following commands to populate the database with the necessary collections:

   ```
   node misc/populate_account.js
   node misc/populate_inventory.js
   node misc/populate_price.js
   ```
   
5. Run the following command to run the server: 
   ```
   node index.js
   ```

6. Open the web application by accessing the following link on a browser:
   ```
   http://localhost:3000
   ```
   
[ADD IMAGE HERE]

### Credentials (For Testing Only)
To log in as an administrator, enter the following credentials:
- **Username:** `powerzoneadmin`
- **Email Address:** `administrator@gmail.com`
- **Password:** `password123`

## Dependencies
This project uses the following production dependencies:

| Package | Version | Description | License |
| --- | --- | --- | --- |
| [<code>@babel/eslint-parser</code>](https://www.npmjs.com/package/@babel/eslint-parser) | 7.16.5 | Package for allowing the linting of all valid Babel code with ESLint | Apache License 2.0 |
| [<code>bcrypt</code>](https://www.npmjs.com/package/bcrypt) | 5.0.1 | Package for hashing passwords | Apache License 2.0 |
| [<code>connect-mongo</code>](https://www.npmjs.com/package/connect-mongo) | 3.2.0 | MongoDB session store for Connect and Express | MIT License |
| [<code>dotenv</code>](https://www.npmjs.com/package/dotenv) | 10.0.0 | Package for loading environment variables from an <code>.env</code> file | BSD 2-Clause "Simplified" License |
| [<code>express</code>](https://www.npmjs.com/package/express) | 4.17.1 | Unopinionated and minimalist framework for Node.js | MIT License | 
| [<code>express-handlebars</code>](https://www.npmjs.com/package/express-handlebars) | 6.0.1 | Handlebars view engine for Express | BSD 3-Clause "New" or "Revised" License
| [<code>express-session</code>](https://www.npmjs.com/package/express-session) | 1.17.2 | Session middleware for Express | MIT License |
| [<code>express-validator</code>](https://www.npmjs.com/package/express-validator) | 6.13.0 | Express middleware for validator, a library of string validators and sanitizers | MIT License |
| [<code>gridfs-stream</code>](https://www.npmjs.com/package/gridfs-stream) | 1.1.1 | Package for streaming files to and from MongoDB GridFS | MIT License |
| [<code>hbs</code>](https://www.npmjs.com/package/hbs) | 4.2.0 | Express view engine for Handlebars | MIT License |
| [<code>jquery</code>](https://www.npmjs.com/package/jquery) | 3.6.0 | Fast, small, and feature-rich JavaScript library | MIT License
| [<code>mongodb</code>](https://www.npmjs.com/package/mongodb) | 4.2.0 | Official MongoDB driver for Node.js | Apache License 2.0 |
| [<code>mongoose</code>](https://www.npmjs.com/package/mongoose) | 6.0.13 | MongoDB object modeling tool designed to work in an asynchronous environment | MIT License |
| [<code>multer</code>](https://www.npmjs.com/package/multer) | 1.4.3 | Middleware for handling <code>multipart/form-data</code>, primarily used for file uploads | MIT License |
| [<code>multer-gridfs-storage</code>](https://www.npmjs.com/package/multer-gridfs-storage) | 5.0.2 | GridFS storage engine for Multer to store uploaded files directly to MongoDB | MIT License |
| [<code>nocache</code>](https://www.npmjs.com/package/nocache) | 3.0.1 | Middleware for setting some HTTP response headers to try to disable client-side caching | MIT License
| [<code>nodemailer</code>](https://www.npmjs.com/package/nodemailer) | 6.7.1 | Package for sending emails with Node.js | MIT License | 

The following table lists the development dependencies:

| Package | Version | Description | License |
| --- | --- | --- | --- |
| [<code>chai</code>](https://www.npmjs.com/package/chai) | 4.3.4 | Behavior- and test-driven development assertion library for Node.js | MIT License |
| [<code>chai-jquery</code>](https://www.npmjs.com/package/chai-jquery) | 2.1.0 | Extension to the chai assertion library that provides a set of jQuery-specific assertions | MIT License |
| [<code>deep-equal-in-any-order</code>](https://www.npmjs.com/package/deep-equal-in-any-order) | 1.1.15 | Chai plugin to match objects and arrays deep equality with arrays (including nested ones) being in any order | MIT License |
| [<code>eslint</code>](https://www.npmjs.com/package/eslint) | 8.6.0 | Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code | MIT License
| [<code>eslint-config-google</code>](https://www.npmjs.com/package/eslint-config-google) | 0.14.0 | ESLint shareable config for the Google JavaScript style guide (ES2015+ version) | Apache License 2.0
| [<code>esm</code>](https://www.npmjs.com/package/esm) | 3.2.25 | Babel-less, bundle-less ECMAScript module loader | MIT License
| [<code>jsdom</code>](https://www.npmjs.com/package/jsdom) | 18.1.1 | Pure-JavaScript implementation of many web standards, notably the WHATWG DOM and HTML Standards, for use with Node.js |  MIT License |
| [<code>mocha</code>](https://www.npmjs.com/package/mocha) | 9.1.3 | Simple and flexible JavaScript test framework for Node.js and the browser | MIT License  |
| [<code>mocha-jsdom</code>](https://www.npmjs.com/package/mocha-jsdom) | 2.0.0 | Test frontend libraries in the console using Node.js, Mocha and JSDom. | MIT License  |
| [<code>nyc</code>](https://www.npmjs.com/package/nyc) | 15.1.0 | Istanbul's state of the art command line interface with support for applications that spawn subprocesses | ISC License |
| [<code>sinon</code>](https://www.npmjs.com/package/nyc) | 12.0.1 | Standalone and test framework agnostic JavaScript test spies, stubs, and mocks | BSD-3-Clause License |

*The descriptions are taken from their respective websites.*

## Built Using
This project follows the Model-View-Controller (MVC) architectural pattern. In light of separation of concerns, the key technologies used are:
- **Database**: <a href = "https://www.mongodb.com/">MongoDB</a> as the database program and <a href = "https://mongoosejs.com/">Mongoose</a> as the object data modeling tool
- **Back-end**: <a href = "https://nodejs.org/en/">Node.js</a> as the server environment and <a href = "https://expressjs.com/">Express.js</a> as the back-end framework
- **Front-end**: <a href = "https://handlebarsjs.com/">Handlebars</a> as the template engine 

To implement continuous integration and continuous delivery (CI/CD), the following technologies are also included:
- **Unit Testing**: <a href = "https://mochajs.org/">Mocha</a> as the primary test framework, <a href = "https://www.chaijs.com/">Chai</a> as the assertion library, Sinon as the test framework for spies, stubs, and mocks, and <a href = "https://istanbul.js.org/">Istanbul</a> as the code coverage tool
- **Task Runner**: <a href = "https://docs.github.com/en/actions">GitHub Actions</a> as the CI/CD platform
- **Automated Testing**: <a href = "http://selenium.dev/">Selenium</a> as an automated testing tool and <a href = "https://robotframework.org/">Robot Framework</a> as the automtion framework

<a href = "https://eslint.org/">ESLint</a> is used for linting and enforcing uniform and consistent coding style. 

This web application is deployed on <a href = "https://dashboard.heroku.com/">Heroku</a>, a cloud platform as a service (PaaS).
   
## Contributing
Kindly refer to this page [INSERT LINK HERE] for the documents and guidelines on contributing to this repository. 

## Software Development Team
- <b>Sandra Angela E. Berjamin</b>, Analyst<br/>
- <b>Lander Peter E. Cua</b>, Analyst <br/>
- <b>Jacob Bryan B. Gaba</b>, Quality Assurance <br/>
- <b>Mark Edward M. Gonzales</b>, Developer <br/>
- <b>Hylene Jules G. Lee</b>, Developer <br/>
- <b>Angeli Dianne F. Mata</b>, Designer <br/>
- <b>Phoebe Clare L. Ong</b>, Designer <br/>
- <b>Ian Angelo T. Racoma</b>, Quality Assurance <br/>

[badge-html5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white
[badge-bootstrap]: https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=flat&logo=bootstrap&logoColor=white
[badge-handlebars]: https://img.shields.io/badge/Handlebars.js-f0772b?style=flat&logo=handlebarsdotjs&logoColor=black
[badge-js]: https://img.shields.io/badge/javascript-%23323330.svg?style=flate&logo=javascript&logoColor=%23F7DF1E
[badge-jquery]: https://img.shields.io/badge/jquery-%230769AD.svg?style=flat&logo=jquery&logoColor=white
[badge-mongodb]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white
[badge-express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB
[badge-nodejs]: https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white
[badge-eslint]: https://img.shields.io/badge/eslint-3A33D1?style=flat&logo=eslint&logoColor=white
[badge-mocha]: https://img.shields.io/badge/-mocha-%238D6748?style=flat&logo=mocha&logoColor=white
[badge-chai]: https://img.shields.io/badge/chai-A30701?style=flat&logo=chai&logoColor=white
[badge-selenium]: https://img.shields.io/badge/Selenium-43B02A?style=flat&logo=Selenium&logoColor=white
[badge-github-actions]: https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white
[badge-heroku]: https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white
