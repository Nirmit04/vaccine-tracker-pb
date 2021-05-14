## vaccine-slot-tracker
This React Web Apps tracks the corona vaccine availability across all the disctricts of India, the slots **availabilty is refreshed every 5 minutes** and if the slots availabilty changes then a **notification sound** is played.

The APIs consumed for the data regarding states, districts, slots availability are the [PUBLIC COWIN APIs](https://apisetu.gov.in/public/api/cowin#/) provided by the government.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
Use of **yarn** is preffered over npm.


## Table of Contents
- Pre-requisites
- Getting Started
- File and Directories
- Contributing guidelines

**Pre-requisites**
 1. Nodejs version 14.15.5
 2. Yarn version 1.22.10

**Getting Started(Local)**
1. Download the zip or clone the Git repository.
2. Open the terminal and Change directory to the project folder
3. Install the dependencies using the command **yarn**
4. Start the application using the command **yarn start**
5. Check localhost:3000 for the Application

**Files and directories**
```
vaccine-slot-tracker
│   .gitignore
│   package.json
│   README.md
│   tsconfig.json
│   yarn.lock
│
│
├───public
│       favicon.ico
│       index.html
│       logo192.png
│       logo512.png
│       manifest.json
│       robots.txt
│
└───src
    │   App.css
    │   App.test.tsx
    │   App.tsx
    │   index.css
    │   index.tsx
    │   react-app-env.d.ts
    │   reportWebVitals.ts
    │   setupTests.ts
    │
    ├───assets
    │       sound.mp3
    │
    └───home
            Home.scss
            Home.tsx

```
            
**Contributing Guidelines**
 - Files and foler names have to camelCased

