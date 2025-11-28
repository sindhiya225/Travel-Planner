# Travel Planner

A web application that allows users to organize their travel plans, explore nearby places, and manage trips efficiently.

<img width="1896" height="859" alt="Screenshot 2025-11-28 124534" src="https://github.com/user-attachments/assets/0924d8cb-98ba-482a-8798-3987d5e4d86d" />

## Table of Contents
* Description
* Features
* Technologies Used
* Installation
* Usage
* API Keys
* Contributors

## Description
Planning a trip can be overwhelming with so many options and recommendations. Travel Planner helps you organize your trips, add plans, explore nearby places, and keep track of important details in one place. Whether it's a restaurant recommendation or a must-visit tourist spot, this app ensures you never miss out.

## Features
* **User Authentication**: Sign up, log in, and manage your profile securely.
* **Trip Management**: Create, edit, and delete trips with details like name, description, location, and dates.
* **Plan Categories**: Add plans categorized as "Eat", "Visit", or "Activity".
* **Explore Nearby Places**: Use Google Maps and Geoapify APIs to find nearby restaurants, hotels, and attractions.
* **Fact Management**: Add interesting facts or notes to your trips.
* **Image Uploads**: Upload and manage images for your trips.
* **Downloadable Travel Manual**: Export a list of nearby places as a text file.
* **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used
### Frontend:
* **React.js**: For building the user interface.
* **React Router**: For client-side routing.
* **Apollo Client**: For interacting with the GraphQL API.
* **Bootstrap**: For responsive design and styling.
* **Day.js**: For date manipulation.
* **React Modal**: For modal dialogs.
* **Validator.js**: For form validation.
* **Google Maps API**: For map rendering and geolocation.
* **Geoapify API**: For fetching nearby places.

### Backend:
* **Node.js**: For the server runtime environment.
* **Express.js**: For building the server and handling routes.
* **Apollo Server**: For creating the GraphQL API.
* **GraphQL**: For API queries and mutations.
* **MongoDB**: As the database.
* **Mongoose**: For database modeling.
* **Bcrypt**: For password hashing.
* **JSON Web Token (JWT)**: For authentication.
* **Dotenv**: For managing environment variables.

### Deployment:
* **Heroku**: For deploying the application.

## Installation

```bash
# Clone the repository
git clone https://github.com/Shyam-GK/travel-planner.git

# Navigate to the project directory
cd travel-planner

# Install dependencies for server
npm install

# Navigate to the client directory
cd client

# Install dependencies for client
npm install

# Return to the main directory
cd ..
```

## Usage

```bash
# Run the server and client concurrently
npm run develop

# Just the server
npm run server

# Just the client
npm run client
```

## API Keys
This application requires the following API keys:
* Google Maps API key
* Geoapify API key

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GEOAPIFY_API_KEY=your_geoapify_api_key
```
