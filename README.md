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

### **Build authentication service with appwrite**

1. create appwrite folder in src
2. create [ auth.service.js ] file in appwrite folder
3. code

- import a configuration file in JavaScript

```jsx
import config from "../config/config.js";
```

- importing specific modules from the Appwrite SDK in JavaScript, which is commonly used for interacting with Appwrite's backend services.

```jsx
import { Client, Account, ID } from "appwrite";
```

- Defining the `AuthService` Class

```jsx
export class AuthService {
  // Define methods and properties here
}
```

- **`export`**: This keyword makes the `AuthService` class available for import in other files.
- **`class AuthService {}`**: This defines a class named `AuthService`. Inside the curly braces, you can define methods and properties that belong to this class.

- Creating an Instance of `AuthService`

```jsx
const authservice = new AuthService();
```

- **`const authservice`**: This declares a constant variable named `authservice`.
- **`new AuthService()`**: This creates a new instance of the `AuthService` class. The `new` keyword is used to instantiate objects from a class, meaning `authservice` is an object that follows the blueprint of the `AuthService` class.

- Exporting the Instance

```jsx
export default authservice;
```

- **`export default`**: This keyword is used to specify the default export from the module. In this case, it's exporting the `authservice` instance.
- **`authservice`**: This is the instance of the `AuthService` class that was created earlier.

- Define properties

```jsx
export class AuthService {
  client = new Client();
  account;
}

const authservice = new AuthService();

export default authservice;
```

- create a constructor → constructor is setting up the Appwrite client and initializing the account management functionality.

```jsx
   constructor() {
          this.client
               .setEndpoint(config.appwriteUrl)
               .setProject(config.appwriteProjectId);
          this.account = new Account(this.client);

     }
```

- The `createAccount` method you've provided is part of an `AuthService` class and is designed to create a new user account using the Appwrite service.

```jsx
   async createAccount({ email, password, name }) {
          const userAccount = await this.account.create(ID.unique(), email, password, name);
          if (userAccount) {
               // call another method
               return this.login({ email, password });
          } else {
               return userAccount;
          }

     }
```

- **`async`**: This keyword makes the function asynchronous, allowing you to use `await` inside it. It will return a promise.
- **`createAccount({ email, password, name })`**: This method takes an object with `email`, `password`, and `name` as properties. These are the details required to create a new user account.
- **`await`**: Pauses the execution of the function until the promise is resolved. In this case, it waits for the account creation process to complete.
- **`this.account.create(ID.unique(), email, password, name)`**: Calls the `create` method on the `Account` instance. This method creates a new user account with:
  - **`ID.unique()`**: Generates a unique ID for the user account.
  - **`email`**: The email address of the user.
  - **`password`**: The user's password.
  - **`name`**: The user's name.
- **`if (userAccount)`**: Checks if the `userAccount` object was successfully created.
- **`this.login({ email, password })`**: If the account creation is successful, the method calls `login` (presumably another method within the same `AuthService` class) to log the user in automatically. This ensures that the user is immediately authenticated after account creation.
- **`return this.login({ email, password })`**: The method returns the result of the login process, which could include the user's session or authentication details.
- **`else { return userAccount; }`**: If account creation fails for any reason, it returns the `userAccount` object, which could include error information.

- The `login` method you've provided is part of the `AuthService` class and is designed to log in a user using their email and password.

```jsx
 async login(email, password) {
          return await this.account.createEmailPasswordSession(email, password);
     }
```

- **`async`**: The method is marked as asynchronous, which allows you to use the `await` keyword inside the method. It will return a promise.
- **`login(email, password)`**: The method takes two parameters, `email` and `password`, which are the credentials the user provides to log in
- **`await`**: Pauses the execution of the function until the promise returned by `createEmailPasswordSession` is resolved.
- **`this.account.createEmailPasswordSession(email, password)`**: This line calls the `createEmailPasswordSession` method from the Appwrite SDK’s `Account` service. This method:

  - **`email`**: The user's email address.
  - **`password`**: The user's password.
  - If the credentials are correct, Appwrite will create a new session for the user, effectively logging them in

- The `getCurrentUser` method in your `AuthService` class is designed to retrieve the currently authenticated user's information.

```jsx
 async getCurrentUser() {
          const currentUser = await this.account.get();
          if (currentUser) {
               return currentUser;
          } else {
               return null;
          }
     }
```

- **`async`**: This keyword indicates that the method is asynchronous, meaning it will return a promise and allows you to use `await` within the function.
- **`getCurrentUser()`**: This method does not take any parameters and is meant to fetch the details of the currently logged-in user
- **`await`**: This pauses the execution of the function until the promise returned by `this.account.get()` is resolved.
- **`this.account.get()`**: Calls the `get` method from the Appwrite SDK’s `Account` service. This method retrieves the currently authenticated user's details, such as their ID, email, name, and other metadata.
- **`if (currentUser)`**: This checks if the `currentUser` object was successfully retrieved.
- **`return currentUser;`**: If `currentUser` is not null or undefined, the method returns the user's information.
- **`else { return null; }`**: If there is no currently authenticated user, the method returns `null`

- The `logout` method in your `AuthService` class is designed to log out the currently authenticated user by deleting their session(s).

```jsx
 async logout() {
          return await this.account.deleteSessions();
     }
```

- **`async`**: The method is asynchronous, meaning it will return a promise and allows the use of `await` within the method.
- **`logout()`**: The method doesn't take any parameters and is meant to handle the logout process for the user
- **`await`**: Pauses the function's execution until the promise returned by `deleteSessions()` is resolved.
- **`this.account.deleteSessions()`**: This calls the `deleteSessions` method from the Appwrite SDK’s `Account` service. This method deletes all active sessions for the user, effectively logging them out from all devices or platforms where they were logged in.

### Final code

```jsx
import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );
    if (userAccount) {
      // call another method
      return this.login({ email, password });
    } else {
      return userAccount;
    }
  }

  async login(email, password) {
    return await this.account.createEmailPasswordSession(email, password);
  }

  async getCurrentUser() {
    const currentUser = await this.account.get();
    if (currentUser) {
      return currentUser;
    } else {
      return null;
    }
  }

  async logout() {
    return await this.account.deleteSessions();
  }
}

const authservice = new AuthService();

export default authservice;
```

### **Appwrite database, file upload and custom queries**

1. create file [ appwrite/config.service.js ]
2. code

```jsx
import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, userId, slug, status }) {
    return await this.databases.createDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      slug,
      {
        userId,
        title,
        featuredImage,
        content,
        status,
      }
    );
  }

  async updatePost(slug, { title, content, status, featuredImage }) {
    return await this.databases.updateDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      slug,

      {
        title,
        content,
        featuredImage,
        status,
      }
    );
  }

  async deletePost(slug) {
    await this.databases.deleteDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      slug
    );
    return true;
  }

  async getSinglePost(slug) {
    return await this.databases.getDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      slug
    );
  }

  async getActivePosts(queries = [Query.equal("status", "active")]) {
    return await this.databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId,
      queries
    );
  }

  // file upload service
  async uploadFile(file) {
    return await this.storage.createFile(
      config.appwriteBucketId,
      ID.unique(),
      file
    );
  }

  async deleteFile(filedId) {
    await this.storage.deleteFile(config.appwriteBucketId, filedId);
    return true;
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
```
