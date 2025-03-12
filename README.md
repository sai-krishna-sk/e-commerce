# E-Commerce Application


## Live Link
[Link](https://e-commerce-six-swart-86.vercel.app/)


## Overview
This is a full-fledged e-commerce application designed to facilitate online shopping. Users can browse products, manage their shopping carts, and complete purchases seamlessly.

## Features
- **User Authentication**: Secure registration and login for users.
- **Product Management**: Browse products dynamically.
- **Shopping Cart**: Add or remove items from the cart with local storage support to track cart data across sessions.
- **Admin Dashboard**: Manage products through the admin panel.
  
## Technical Requirements

### Frontend
- **Framework**: Built using [Next.js](https://nextjs.org/) for server-side rendering and improved performance.
- **Dynamic Product List**: Display a list of available products retrieved from the backend.
- **Basic Validation**: Implemented validation to prevent adding empty products to the cart.
- **AJAX/Fetch API**: Uses Fetch API to interact with the backend without reloading the page.
- **Responsive UI/UX**: The application is user-friendly and responsive across devices.

### Backend
- **Framework**: Developed using [Flask](https://flask.palletsprojects.com/) to create RESTful APIs.
- **API Endpoints**:
  - **Add a Product**: Endpoint to add new products to the database.
  - **Delete a Product**: Endpoint to remove products from the database.
  - **Retrieve Product List**: Endpoint to fetch the list of available products.
  - **Add/Remove Products from Cart**: Endpoints to manage cart items.
- **Database**: Using [MongoDB(atlas)](https://www.mongodb.com/) for data storage.

## Bonus (Optional Enhancements)
- **Local Storage**: Implement local storage or user authentication to track cart data across sessions.
- **Admin Panel**: A basic admin panel to manage products efficiently.
- **Deployment**: Deploy the application on a cloud platform such as AWS, Heroku, or Vercel.

## Installation

To run this application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sai-krishna-sk/e-commerce.git
   ```
   
2. **Navigate to the project directory**:
   ```bash
   cd e-commerce
   ```

3. **Install frontend dependencies**:
   ```bash
   cd frontend  # Navigate to the frontend directory
   npm install  
   ```

4. **Install backend dependencies**:
   ```bash
   cd ../backend  # Navigate to the backend directory
   pip install -r requirements.txt  # For Flask
   ```

5. **Run the backend server**:
   ```bash
   python app.py  # or the appropriate command for your setup
   ```

6. **Run the frontend application**:
   ```bash
   cd ../frontend
   npm run dev  
   ```

7. **Open your browser** and go to `http://localhost:3000`.

## Usage

- Register a new account or log in to an existing one.
- Browse through the product catalog.
- Add items to your shopping cart with validation.



## Contact

For any inquiries, please reach out to [Terli Sai Krishna](mailto:terlisai45@gmail.com).


