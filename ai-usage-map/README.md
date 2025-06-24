# AI Usage Map

This project visualizes AI platform usage across the United States using a React application. It provides an interactive map that displays estimated usage patterns based on market share data and regional tech adoption factors.

## Project Structure

```
ai-usage-map
├── public
│   └── index.html          # Main HTML file serving as the entry point for the application
├── src
│   ├── US_map.js          # Contains the AIUsageMap component for visualizing AI usage
│   ├── App.js             # Main application component that renders AIUsageMap
│   └── index.js           # Entry point for the React application
├── package.json            # Configuration for npm, including dependencies and scripts
└── README.md               # Documentation for the project
```

## Setup Instructions

To run this project, ensure you have Node.js and npm installed. Then, follow these steps:

1. Navigate to the project directory in your terminal.
2. Run `npm install` to install the necessary dependencies.
3. Run `npm start` to start the development server.

## Dependencies

Make sure to include the necessary dependencies in `package.json`, such as `react`, `react-dom`, and `react-scripts`. If they are not already present, you can add them using the following command:

```
npm install react react-dom react-scripts
```

## Usage

Once the development server is running, open your browser and navigate to `http://localhost:3000` to view the AI usage map. You can interact with the map to see usage intensity and estimated users for different AI platforms across various states.

## License

This project is licensed under the MIT License.