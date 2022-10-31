import { Injectable } from '@angular/core';
import { Client, Account, ID, Functions } from 'appwrite';


@Injectable({
    providedIn: 'root',
})
export class AppwriteService {
    client: Client = new Client();
    functions: Functions = new Functions(this.client);

    TOPIC_FUNCTION_ID = "63601a3e0848b4d5b762";
    APPWRITE_PROJECT_ID = "63590f0f0d50b6613f0a";
    APPWRITE_ENDPOINT = "http://192.168.1.11/v1";

    setupSDK(): void {
        this.client
            .setEndpoint(this.APPWRITE_ENDPOINT) // Your API Endpoint
            .setProject(this.APPWRITE_PROJECT_ID);               // Your project ID
    }

    topicFunction(url: string): any {
        //this.setupSDK();
        const req = { videoUrl: url }
        const promise = this.functions.createExecution(this.TOPIC_FUNCTION_ID,JSON.stringify(req));

        return promise;
    }

}