# Ecomzy - An E-Commerce Store 

An e-commerce store built using **React**, **Tailwind CSS**, **Redux**, and **React Router**. It features dark mode, pagination (loading products in batches of 10), category filtering, and a search functionality.

## Features

- **Category Filtering**: Display all categories and allow users to select a single category. Products are shown for the selected category or all products if no category is selected.
- **Search Functionality**: Users can search for products, with results filtered based on the title and description.
- **Pagination**: Products are fetched in batches of 10 (without UI pagination). As the user scrolls, more products are fetched and displayed.
- **Dark Mode**: Toggle between light and dark themes with a responsive button.
- **Cart Functionality**: Add and remove products from the cart, with a cart summary showing the total items and amount.

## Technologies Used

- **React**: Frontend framework
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Redux**: State management for cart
- **React Router**: Navigation between home and cart pages
- **React Hot Toast**: Notification system for cart actions (add/remove)
- **FakeStore API**: API used for fetching product data
- **FontAwesome Icons**: Used for cart and other UI elements

## API Used

Products are fetched from the [FakeStore API](https://fakestoreapi.com/), with categories being filtered using:

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>

- cd your-project-directory

- npm install

- npm start
