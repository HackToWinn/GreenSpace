# 🌳 GreenSpace: Report, Predict, Protect

Welcome to **GreenSpace**, an innovative digital platform that empowers communities to report environmental issues, predict potential disasters, and get rewarded for their contributions to protecting our planet.

## ✨ Key Features

* **Report & Earn**: Snap a photo of an environmental issue (like a pile of garbage or a potential flood hazard), report it through our app, and earn *GreenSpace Points* (GSP) as a reward.
* **AI-Powered Disaster Alerts**: Our intelligent system analyzes reports, weather data, and satellite imagery to predict potential disasters like floods and forest fires in *real-time*.
* **Decentralized Ecosystem**: Built on the *Internet Computer Protocol* (ICP), all reports and transactions are recorded transparently and securely on the blockchain.
* **Modern Interface**: From the mobile app to the landing page, we've designed a user-friendly and visually engaging experience.

## 🔗 Production Links

* **🌐 Landing Page**: [**Visit Our GreenSpace Landing Page**](https://greenspace.hacktowin.systems/)
* **📱 Download APK**: [**Download GreenSpace Application**](https://expo.dev/artifacts/eas/nvq4YYjVSVinucW1F5bVxt.apk)
* **⚙️ API Endpoint**: `https://api.hacktowin.systems`


## 🛠️ Technology Stack

The GreenSpace platform is built using modern, cutting-edge technologies at every layer.

| Component         | Technology            | Description                                                                                             |
| :---------------- | :-------------------- | :------------------------------------------------------------------------------------------------------ |
| 📱 **Mobile App** | `React Native (Expo)` | An intuitive and responsive cross-platform application for both Android and iOS.                        |
| 🌐 **Landing Page** | `Next.js`             | A fast, SEO-friendly, and informative homepage.                                                         |
| ⚙️ **API Server** | `Express.js`          | A reliable backend to handle requests, authentication, and business logic.                              |
| ⛓️ **Web3 Backend** | `Motoko (ICP)`        | *Canisters* (smart contracts) on the Internet Computer to manage report data, users, and GSP tokens decentrally. |

## 🤖 AI & Data for Disaster Prediction

We integrate several AI and data services to provide accurate and rapid predictions:

1.  **[Groq](https://groq.com/)**: Used to generate predictive analyses and narratives from collected environmental data. Its speed allows us to deliver warnings in *real-time*.
2.  **[Azure AI Vision](https://azure.microsoft.com/en-us/products/ai-services/ai-vision)**: Analyzes user-uploaded images to identify objects, severity levels, and the context of environmental reports.
3.  **[WeatherAPI.com](https://www.weatherapi.com/)**: Provides up-to-date weather data, including precipitation, wind speed, and humidity, to enhance the accuracy of our disaster prediction models.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)
* [DFINITY Canister SDK](https://internetcomputer.org/docs/current/developer-docs/getting-started/install/)

### Installation & Running Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/greenspace.git](https://github.com/your-username/greenspace.git)
    cd greenspace
    npm i
    ```

2.  **Deploy Canisters (Motoko):**
    ```bash
    dfx start --background
    dfx generate
    dfx deploy
    ```
    
3. **Run The Landing Page & API**
     ```bash
    npm run dev
    ```

4.  **Run the Mobile App (React Native Expo):**
    ```bash
    cd mobile
    npm install
    npx expo start/npm run android
    ```

---

*Created with a passion for a greener and safer Earth.*
