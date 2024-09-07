import config from '../config/config.js';
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

          const userAccount = await this.account.create(ID.unique(), email, password, name);
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
