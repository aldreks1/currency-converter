# Currency Converter Application

This is a Currency Converter application built with React, Redux Toolkit, and TypeScript. The application allows users to convert between different currencies, starting with USD and EUR in the main branch. In a separate branch, there is additional functionality to fetch and use real-time exchange rates from an API.

## Installation and Setup

Follow these steps to download, install, and run the application:

1. **Clone the Repository**:
<<<<<<< feature/add-new-currencies

   ```bash
   git clone git@github.com:aldreks1/currency-converter.git
   cd currency-converter
   ```

2. **Install Dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the project dependencies:

   ```bash
   npm install
   ```

3. **Run the Application**:
   To start the application in development mode:

   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000`.

## Switching Between Branches

The repository contains two branches:

1. **master**: The master branch contains the basic currency converter functionality, allowing conversions between USD and EUR with EUR/USD equal 1.07 rate.

   To switch to the master branch:

   ```bash
   git checkout master
   ```

2. **feature/add-new-currencies**: This branch contains additional functionality to fetch real-time exchange rates from an API, allowing the addition of more currencies dynamically.

   To switch to the feature branch:

   ```bash
   git checkout feature/add-new-currencies
   ```

## Features

### Main Branch

- Basic currency converter between USD and EUR.
- User-friendly interface.
- Basic validation for input fields.

### Feature Branch (API Integration)

- Fetches real-time exchange rates from an API.
- Allows adding new currencies dynamically from a dropdown list.
- Ability to remove added currencies.
- Persists the conversion rates and values across multiple conversions.

## Usage

### Main Branch

1. **Convert Currencies**:
   - Enter an amount in either the USD or EUR input field.
   - The equivalent amount in the other currency will be automatically calculated and displayed.
=======
    ```bash
    git clone git@github.com:aldreks1/currency-converter.git
    cd currency-converter
    ```

2. **Install Dependencies**:
    Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the project dependencies:
    ```bash
    npm install
    ```

3. **Run the Application**:
    To start the application in development mode:
    ```bash
    npm start
    ```

    The application will run on `http://localhost:3000`.

## Switching Between Branches

The repository contains two branches:

1. **master**: The master branch contains the basic currency converter functionality, allowing conversions between USD and EUR with EUR/USD equal 1.07 rate.

    To switch to the master branch:
    ```bash
    git checkout master
    ```

2. **feature/add-new-currencies**: This branch contains additional functionality to fetch real-time exchange rates from an API, allowing the addition of more currencies dynamically.

    To switch to the feature branch:
    ```bash
    git checkout feature/add-new-currencies
    ```

## Features

### Main Branch

- Basic currency converter between USD and EUR.
- User-friendly interface.
- Basic validation for input fields.

### Feature Branch (API Integration)

- Fetches real-time exchange rates from an API.
- Allows adding new currencies dynamically from a dropdown list.
- Ability to remove added currencies.
- Persists the conversion rates and values across multiple conversions.

## Usage

### Main Branch

1. **Convert Currencies**:
    - Enter an amount in either the USD or EUR input field.
    - The equivalent amount in the other currency will be automatically calculated and displayed.
>>>>>>> master

### Feature Branch

1. **Fetch Exchange Rates**:
<<<<<<< feature/add-new-currencies

   - On application start, the current exchange rates are fetched from an API.

2. **Add New Currency**:

   - Select a new currency from the dropdown list and click "Add Currency".
   - A new input field will appear for the added currency, allowing conversions.

3. **Remove Currency**:
   - Click the cross icon next to the currency input field to remove that currency from the converter.
=======
    - On application start, the current exchange rates are fetched from an API.

2. **Add New Currency**:
    - Select a new currency from the dropdown list and click "Add Currency".
    - A new input field will appear for the added currency, allowing conversions.

3. **Remove Currency**:
    - Click the cross icon next to the currency input field to remove that currency from the converter.
>>>>>>> master

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any features, bug fixes, or enhancements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
