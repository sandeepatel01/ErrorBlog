import config from '../config/config.js';
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
          )
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
          )
     }

     async deletePost(slug) {
          await this.databases.deleteDocument(
               config.appwriteDatabaseId,
               config.appwriteCollectionId,
               slug,
          )
          return true
     }

     async getSinglePost(slug) {
          return await this.databases.getDocument(
               config.appwriteDatabaseId,
               config.appwriteCollectionId,
               slug,
          )
     }

     async getActivePosts(queries = [Query.equal("status", "active")]) {
          return await this.databases.listDocuments(
               config.appwriteDatabaseId,
               config.appwriteCollectionId,
               queries,

          )
     }

}


const service = new Service();

export default service;