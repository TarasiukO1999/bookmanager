# Django Vue Book Management App Documentation

![Vue Logo](/src/assets/logo.png "Vue Logo")
![Django Logo](/src/assets/logo-django.png "Django Logo")

Welcome to the documentation for the Django Vue Book Management App – an exemplary application that demonstrates the seamless integration of Vue.js and Django Rest Framework. This professionally crafted app is renowned for its sleek design and responsiveness, achieved through the implementation of Vuetify.


## Technologies Used

### Django
- Django
- Django REST Framework
- Django REST Framework Simple JWT
- SQLITE

### Vue
- Vue
- Vue Router
- Vuex
- Vuetify
- Axios

## Installation Prerequisites

Ensure you have the following installed on your system:

- Python `v3.12.1`
- Node `v21.5.0`
- NPM `v10.2.4`

## Project Structure

| Location             |  Content                                   |
|----------------------|--------------------------------------------|
| `/backend`           | Django Project & Backend Configuration    |
| `/apps`              | Django Apps (`/user`, `/books`)            |
| `/src`               | Vue App                                    |
| `/src/main.js`       | JS Application Entry Point                 |
| `/public/index.html` | [HTML Application Entry Point](https://cli.vuejs.org/guide/html-and-static-assets.html) (`/`) |
| `/upload`            | Uploaded Images                            |
| `/dist/`             | Bundled Assets Output (generated at `yarn build`) |

## Project Setup

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:elitesuper/bookmanagementapp.git
   cd bookmanagementapp
   ```
2. **Backend Setup**
- Create and activate a Python virtual environment:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Linux
    venv\Scripts\activate     # On Windows
    ```

- Install required Python packages and set up the server:

    ```bash
    pip install -r requirement.txt
    py manage.py makemigrations # On Linux please use python instead py
    py manage.py migrate # On Linux please use python instead py
    py manage.py createsuperuser # On Linux please use python instead py
    py manage.py runserver # On Linux please use python instead py
    ```

3. **Frontend Setup**
- Install Vue packages and start the development server:

    ```bash
    npm i -g yarn
    yarn add
    yarn serve
    ```

## Project Overview

In the `src/router.js` file, the router is configured with various routes to manage the navigation flow of the Django Vue Book Management App. Here's an overview of the configured routes:

```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/signin', component: SignIn, meta: { requiresAuth: false } },
  { path: '/signup', component: SignUp, meta: { requiresAuth: false } },
  {
    path: '/books',
    children: [
      { path: '', component: BookList, meta: { requiresAuth: true } },
      { path: 'new', component: BookEdit, meta: { requiresAuth: true } },
      { path: ':slug', component: BookDetail, meta: { requiresAuth: true } },
      { path: ':slug/edit', component: BookEdit, meta: { requiresAuth: true } },
    ]
  },
  { path: '/:catchAll(.*)', component: NotFound }
];
```

- **User Routes**

    - **SignUp (`/signup`)**

        This route allows users to create their credentials, including username, email, and password.

    - **SignIn (`/signin`)**

        Users can log in to the application using their credentials, either username or email, along with their password.

- **Books Routes**
    - **Book List (`/books`)**

        When a user is logged in, they are redirected to the book list page.
        Users can search for books by name and description, and the results are displayed in a paginated list.
        Users have the option to delete, edit, or create a book, as well as view the details of each book.

    - **Edit Book (`/books`)**

        Users can edit the title, description, and upload a different image for a specific book.

    - **Create Book (`/books/new`)**

        Users can create a new book by providing a title, description, and uploading an image.

    - **View Book (`/books/:slug`)**

        Users can view the details of a specific book, including its title, description, and image.
    
    - **Delete Book**

      When a user wants to delete a book, they click the "Delete Book" button. A message pops up asking if they're sure. If they say yes, the book gets deleted. This extra step avoids accidental deletions and makes sure users really want to remove the book.


This router configuration provides a seamless and intuitive navigation experience for users interacting with the Django Vue Book Management App.









