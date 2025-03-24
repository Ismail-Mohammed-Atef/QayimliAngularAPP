# Rating Web Application

## Overview
This is an Angular-based web application designed for rating various items, products, or services. It consumes APIs built with .NET for data management and authentication. The system includes role-based access control, dynamic UI interactions, and a smooth user experience.

## Features
- **User Ratings**: Users can rate different items and leave reviews.
- **Authentication & Authorization**: Secure login and role-based access control (RBAC).
- **API Consumption**: Fetches and updates data from a .NET backend.
- **AJAX & Dynamic UI**: Provides seamless interactions without page reloads.
- **Sorting & Filtering**: Users can search and filter ratings by category, date, or popularity.
- **User Profiles**: View user activity and rating history.
- **Responsive Design**: Fully functional across desktop and mobile devices.

## Installation
1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure API endpoint in `environment.ts`:
   ```ts
   export const environment = {
     production: false,
     apiUrl: 'https://your-api-url.com/api'
   };
   ```
4. Run the application:
   ```sh
   ng serve
   ```

## Usage
1. **Sign Up & Login**: Users create accounts and log in securely.
2. **Rate & Review**: Users rate items and leave feedback.
3. **Filter & Sort**: Browse ratings by category, date, or highest-rated.
4. **Admin Panel**: Manage users, categories, and reviews.

## Requirements
- **Frontend**: Angular 15 or later
- **Backend**: .NET 8 API
- **Authentication**: JWT-based authentication
- **Styling**: Bootstrap or Material UI for a modern look

## License
This project is licensed under the MIT License.

## Contact
For support or inquiries, reach out via email at ismail.mohammed.atef@gmail.com.


