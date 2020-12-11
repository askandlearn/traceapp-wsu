<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/askandlearn/traceapp-wsu">
    <img src="src/images/TraceBio-Black.png" alt="Logo">
  </a>

  <h3 align="center">TRACE App</h3>

  <p align="center">
    Companion app to the TRACE biosensor
    <br />
    <br />
    <a href="https://github.com/askandlearn/traceapp-wsu/issues">Report Bug</a>
    ·
    <a href="https://github.com/askandlearn/traceapp-wsu/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-on-android">Running on Android</a></li>
        <li><a href="#running-on-ios">Running on iOS</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is a project that was proposed by Dr. Amar Basu, a faculty advisor for Electrical and Biomedical Engineering department of Wayne State University. The objetive of this project was to develop a cross platform app that will be used to perform at-home medical diagnostics with the TRACE wearable biosensor. 

More information about the TRACE wearable biosensor can be found at: https://microfluidics.wayne.edu/index.html


### Built With

In order to ensure that this application runs on both Android and iOS, it was built upon React Native and the following libraries:
* [React Native v.0.63.3 ](https://reactnative.dev/)
* [React Native BLE PLX v.2.0.2](https://github.com/Polidea/react-native-ble-plx)
* [Redux v.4.0.5](https://redux.js.org/introduction/getting-started)
* [Plotly JS](https://plotly.com/javascript/)

<!-- FEATURES -->




<!-- GETTING STARTED -->
## Getting Started

To get started, follow the instructions below which detail the necessary stack required to run the application on your local machine.

### Prerequisites

This project is built on top of the React Native framework. 
* React Native - https://reactnative.dev/

To set up the React Native developement environment, please follow the instructions on the official React Native website at the link below:

Setting up the development environment -----> https://reactnative.dev/docs/environment-setup

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/askandlearn/traceapp-wsu
   ```
2. Install the NPM packages after navigating to the project directory
   ```sh
   npm install
   ```
### Running on Android
1. In a terminal, make sure the directory matches the full path to the root of the project, then start the metro bundler using the following command
   ```sh
   npx react-native start
    ```
2. Open another terminal to your root project directory and launch the Android emulator
   ```sh
    npx react-native run-android
   ```
3. The project will begin to build. This may take serval minutes.

* If any build errors occur regarding gradle, open a new terminal to the root directory and navigate to the Android folder within the project by doing the following
    ```sh
     cd android
    ```
Next, run the command below
    ```sh
    gradlew clean
    ```

### Running on iOS
1. In a terminal, make sure the directory matches the full path to the root of the project, then start the metro bundler using the following command
   ```sh
   npm react-native start
    ```
2. Open another terminal to your root project directory and launch the iOS emulator
   ```sh
    npm react-native run-ios
   ```
3. The project will begin to build. This may take serval minutes.

* If any build errors occur, open a new terminal to the root directory and navigate to the iOS folder within the project by doing the following
    ```sh
     cd ios
    ```
Next, run the command below
    ```sh
    pod install
    ```
<!-- USAGE EXAMPLES -->
## Usage

The TRACE app has three distinct features that allow users to interact with the TRACE biosensor. 

1. Active Stand Up Test
2. Heart-Rate Variability
3. Real-Time Data

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Zack Taylor - [@zacktaylor12359](https://github.com/zacktaylor12359)
Brianna Nurmi - [@brinurmi](https://github.com/brinurmi)
Dana Abuqalbain - [@DanaAbuqalbain](https://github.com/DanaAbuqalbain)
Mohammed Hamza - [@mo-schmo](https://github.com/mo-schmo)


Project Link: [https://github.com/askandlearn/traceapp-wsu](https://github.com/askandlearn/traceapp-wsu)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

Thanks and appreciation to Dr. Amar Basu of Wayne State who proposed the idea to the WSU Fall 2020 Senior Capstone class.





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
