# Turi

The guarnice project is about the FESTIVAL GUARNICÊ DE CINEMA.

## Getting Started
These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. See deployment for notes
on how to deploy the project on a live system

### You have to install
#### Linux
  ```
  sudo apt install curl
  ```
  ```
  curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
  ```
  ```
  sudo apt install nodejs
  ```
  ```
  sudo npm install -g @angular/cli
  ```
  ```
  sudo npm install -g ionic
  ```
#### Windows


### Firebase

In that project we are using the firebase database.

#### You have to install

  ```
  npm install firebase @angular/fire --save
  ```
## DON'T FORGET
After you clone the repository you need to purposes

  ```
  npm install
  ```
## To run
To run in smartphone you need before to install the android studio,
or just the SDK

  ```
  sudo apt install grandle

  ```
  ```
  export ANDROID_HOME=~/Android/Sdk/

  ```
  ```
  export PATH="$PATH:~/Android/Sdk/platform-tools/"
  ```
## ERROR


### ERROR 1

  | Low           | Insecure Default Configuration                               |
  |---------------|--------------------------------------------------------------|
  | Package       | finalhandler                                                 |
  |               |                                                              |
  | Patched in    | No patch available                                           |
  |               |                                                              |
  | Dependency of | finalhandler                                                 |
  |               |                                                              |
  | Path          | finalhandler                                                 |
  |               |                                                              |
  | More info     | https://nodesecurity.io/advisories/836                       |

  ┌───────────────┬──────────────────────────────────────────────────────────────┐
  │ Low           │ Insecure Default Configuration                               │
  ├───────────────┼──────────────────────────────────────────────────────────────┤
  │ Package       │ finalhandler                                                 │
  ├───────────────┼──────────────────────────────────────────────────────────────┤
  │ Patched in    │ No patch available                                           │
  ├───────────────┼──────────────────────────────────────────────────────────────┤
  │ Dependency of │ karma [dev]                                                  │
  ├───────────────┼──────────────────────────────────────────────────────────────┤
  │ Path          │ karma > connect > finalhandler                               │
  ├───────────────┼──────────────────────────────────────────────────────────────┤
  │ More info     │ https://nodesecurity.io/advisories/836                       |
  └───────────────┴──────────────────────────────────────────────────────────────┘

#### to solve the error 1

  ```
  npm install --save-dev @angular-devkit/build-angular
  ```

### ERROR 2

┌───────────────┬──────────────────────────────────────────────────────────────┐
│ High          │ Arbitrary File Overwrite                                     │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ tar                                                          │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Patched in    │ >=4.4.2                                                      │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ @angular-devkit/build-angular [dev]                          │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ @angular-devkit/build-angular > node-sass > node-gyp > tar   │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://nodesecurity.io/advisories/803                       │
└───────────────┴──────────────────────────────────────────────────────────────┘

you need to open /node_modules/node-gyp/package.json and change

>"tar": "^2.0.0"

to

>"tar": "^4.4.8"

after you need to run

  ```
  npm audit fix
  ```
  ```
  npm install
  ```
