# ErrorBlog

**A blog website for DEVELOPERS**

### Project Setup with [ vite + react ]

### Installation [ Important dependencies ]

1. **Redux Toolkit**

The **Redux Toolkit** package is intended to be the standard way to write [Redux](https://redux.js.org/) logic. It was originally created to help address three common concerns about Redux:

- "Configuring a Redux store is too complicated"
- "I have to add a lot of packages to get Redux to do anything useful"
- "Redux requires too much boilerplate code"

```jsx
npm i @reduxjs/toolkit
```

2. **React Redux**

[React Redux](https://github.com/reduxjs/react-redux) is the official [React](https://react.dev/) UI bindings layer for [Redux](https://redux.js.org/). It lets your React components read data from a Redux store, and dispatch actions to the store to update state.

```jsx
npm i react-redux
```

3. **React Router DOM**

To add React Router in your application, run this in the terminal from the root directory of the application:

```jsx
npm i react-router-dom
```

4. **Appwrite Web SDK**

**Appwrite helps you build secure and scalable apps, faster. Leverage Appwrite's powerful APIs to stop fighting technologies and start delivering value.**

```jsx
npm i appwrite
```

5. **Official TinyMCE React component**

TinyMCE is a rich-text editor that allows users to create formatted content within a user-friendly interface.

```jsx
npm i @tinymce/tinymce-react
```

6. **html-react-parser**

`html-react-parser` is a library that allows you to parse HTML strings and convert them into React elements. It's particularly useful when you need to dynamically render HTML content within a React application.

```jsx
npm i html-react-parser
```

7. React Hook Form

Performant, flexible and extensible forms with easy-to-use validation.

```jsx
npm i react-hook-form
```

### Environment variables

Environment variables are a way to store configuration data outside of your codebase. They are often used to manage settings that can vary between different environments, such as development, testing, and production.

- Vite exposes env variables on the special **`import.meta.env`** object, which are statically replaced at build time. Some built-in variables are available in all cases:

```jsx
VITE_APPWRITE_URL = "test environment";
VITE_APPWRITE_PROJECT = "test project";
VITE_APPWRITE_DATABASE_ID = "test database";
VITE_APPWRITE_COLLECTION_ID = "test collection";
VITE_APPWRITE_BUCKET_ID = "test bucket";
```

### **Appwrite [ Backend Setup ]**

1. create project [ErrorBlog]
2. Go to setting

- find API Endpoint
- find Project ID
  And Past in env file

3. Go to Databases → create new DB [EBlog] & copy db id and past in env file
4. Go to collection → create the new collection[articles] & find and copy the collection id and past in env file
5. articles **Permissions → give the Permissions of all users to apply CRUD operation**
6. Go to **articles → create the Attributes**

- title
- content
- featuredImage
- status
- userId

7. Go to **articles → create Indexes**

- status

8. Go to storage → find **BUCKET ID**
9. Go to images → give the **Permissions of all users to apply the CRUD operation**
