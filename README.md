# Weather onScroll

This React application provides a dynamic way to view and interact with weather data based on the user's IP location or a searched city. The app facilitates smooth navigation between different sections of the page using both vertical and horizontal scrolling, optimized for both desktop and touch devices.

## Features

- **Dynamic Weather Display**: Shows weather data for the user's current IP location or a searched city.
- **Smooth Scrolling**: Implements custom smooth scrolling vertically to navigate different sections and horizontally within the weather section.
- **Search Functionality**: Allows users to search for cities and view weather forecasts for different locations.
- **Responsive and Interactive UI**: Provides a responsive layout that adjusts to various devices and screen sizes.

## Components

### `App`

The main component that orchestrates all other components. It handles the state for scroll indices and switches between vertical and horizontal scrolling logic based on user interaction.

### `Main`

Displays the main content including the weather forecast and search functionality. It uses several hooks to fetch geolocation data, weather data, and handles search queries.

- **Custom hooks**:
  - `useGeo`: Fetches geographical and weather data based on the user's IP.
  - `useSearch`: Manages the search functionality and stores search queries.
  - `useNewCityWeather`: Fetches weather data for a selected city from the search results.
  - `useQueryStore`: Manages the search query state.
  - `useSelectedCityStore`: Manages the state of the selected city from search results.

## Utilities

### `debounce`

A utility function to limit the rate at which a function can fire. This is particularly used for handling scroll events to enhance performance and user experience.

## Styles

Styling is handled via CSS modules that correspond to each component, ensuring that the styling is scoped and does not leak across components.
