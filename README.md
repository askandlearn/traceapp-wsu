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

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This project is built on top of the React Native framework. 
* React Native - https://reactnative.dev/

To set up the developement environment in order to run a React Native project, please following the instructions on the official React Native at the link below:

Setting up the development environment -----> https://reactnative.dev/docs/environment-setup

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/askandlearn/traceapp-wsu
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
### Running on Android
1. In a terminal, make sure the directory matches the full path to the root of the project and start the metro bundler
   ```sh
   npx react-native start
    ```
2. Open another terminal to your root project directory and launch the Android emulator
   ```sh
    npx react-native run-android
   ```
3. The project wil begin to build. This may take serval minutes.

* If any build errors occur regarding gradle, open a new terminal to the root directory
    ```sh
     cd android
    ```

    ```sh
    gradlew clean
    ```

### Running on iOS

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

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

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/askandlearn/traceapp-wsu](https://github.com/askandlearn/traceapp-wsu)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
