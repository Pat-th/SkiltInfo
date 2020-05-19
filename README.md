# SkiltInfo
[![Build Status](https://travis-ci.org/Patrickthork/SkiltInfo.svg?branch=master)](https://travis-ci.org/Patrickthork/SkiltInfo)  
SkiltInfo is a bachelor project from the computer engineering study-programme at NTNU, created by Patrick Thorkildsen and Quan Tran.

The application is used to retrieve information from Nasjonal Vegdatabank(NVDB) about road signs located nearby.  
The goal is to simplify and streamline how workers in the road sector find necessary information about road signs. The application is divided into a server and a client. The server is written in Java and is the connection between NVDB and the client. The client is written in JavaScript with React and React Native in the Expo CLI.

## Installation
1. Download and install Node.js from https://nodejs.org/en/
2. Download Ngrok from https://dashboard.ngrok.com/get-started
3. Clone this repository (https://github.com/Patrickthork/SkiltInfo.git)
4. Run *Server.java*
5. Open ngrok and run the command *ngrok http 8080*
6. Copy one of the two URLs (http or https)
7. Paste the url into the URL variable located in *skilt-info/screens/CameraScreen.js*
8. Run *npm install* in */skilt-info* and wait for the packages to download and install
9. Run *npm start* in */skilt-info*

## Running the application
### Running on an Android Emulator
1. Download and install Android Studio from https://developer.android.com/studio
2. Go to AVD manager and download a *Virtual Device*
3. Start the emulator
4. Go back to the console window where the application is running and type *a* to open the application on the emulator

### Running on an Android phone
1. Download Expo from the Play store (https://play.google.com/store/apps/details?id=host.exp.exponent&hl=no)
2. Open Expo and scan the QR-code from the console window where the application is running
