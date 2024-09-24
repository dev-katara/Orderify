# Orderify

Orderify is a web application designed to allow users to order food from restaurants, cafes, and other venues by scanning a QR code. The app provides a frontend for users to browse products, add items to their cart, and proceed to checkout using various payment options. There's also an admin panel for restaurant owners to manage orders and product categories.

## Features

- QR code integration for easy access to the restaurant's menu
- Browse products (categorized) and add them to a cart
- Product quantity adjustment
- Admin panel for managing products and categories
- Payment options (Cash, Credit Card, Apple Pay, Google Pay)
- Real-time order notifications for restaurant admins

## Tech Stack

- **Frontend**: React, React Router DOM, React Toastify, Material UI
- **Backend**: Django, Django REST framework
- **Database**: SQLite (default for Django)
- **Authentication**: Django AllAuth, dj-rest-auth
- **Deployment**: (add if any cloud hosting, Docker, etc.)

## Setup Instructions

### Prerequisites

- Node.js and npm/yarn installed
- Python 3.x installed

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/orderify.git
   ``` 
2. **Make the installation**:
   
   ```bash
   cd orderify
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```
   2.1 install frontent dependencies
