import {google} from 'googleapis';

class GoogleDriver {

    constructor() {

        this.credentials = {
            client_id                     : "322452255850-nehb1hgac93q42l8sj0j174n0mj8v7hf.apps.googleusercontent.com",
            project_id                    : "theseniorprogrammer-265209",
            auth_uri                      : "https://accounts.google.com/o/oauth2/auth",
            token_uri                     : "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url   : "https://www.googleapis.com/oauth2/v1/certs",
            client_secret                 : "q5MiXRojX46IlfaiHAzyh9iE",
            redirect_uris                 : ["urn:ietf:wg:oauth:2.0:oob","http://localhost"]
        };

        this.tokens = {"access_token":"ya29.Il-6B_n0f2PUmIvBwSYZ2qnFmuRrmbwrfrqc1aCr2S4EG9XXqR23t29c4v6hw1-i3o4pBT1t6IENvrB4HDKWVmnZB4HDt1K2jcuXD54LoUtfzYsTQ1-BozGHCKKvllDFgA","refresh_token":"1//0cGa43Zd4Ye0NCgYIARAAGAwSNwF-L9IrZjvEz8LHXu_gp7wtzaNVqvm4_QTOP1ke11pjgdDPQPeVVZ5rBAbxQAWj8G8LgnZwSAg","scope":"https://www.googleapis.com/auth/drive","token_type":"Bearer","expiry_date":1579274595840};

        this.topicsFolderId = "1h2Wd36x-0Hn1v5s0EKLTSS2ni9-gjZNx";

        this.authorize();
    }

    authorize() {
        const {client_secret, client_id, redirect_uris} = this.credentials;
        this.client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        this.client.setCredentials(this.tokens);
        this.drive = google.drive({version: 'v3'});
    }

    listFiles(fileId, callback, onerror) {

        this.drive.files.list(
            {
                auth: this.client,
                q: `('${fileId}' in parents)`,
                fields: 'files(name, id)',
                orderBy: 'folder, name'
            }, 
            (error, response) => {

                if (error && onerror) 
                    onerror(error);

                var files = response.data.files;
                var result = [];

                if (files.length) {
                    files.map((file) => {
                        result.push(file);
                    });
                }

                if (callback) 
                    callback(result);
            }
        );
    }

    downloadFile(fileId, callback, onerror) {

        this.drive.files.get(
            {
                auth: this.client,
                fileId: fileId, 
                alt: 'media'
            },
            (error, response) => {

                if (onerror)
                    onerror(error);

                if (response && response.status == '200') {
                    if (callback)
                        callback(response.data);
                } 
            }
        );    
    }

    getTopics(callback, onerror) {

        this.listFiles(
            this.topicsFolderId, 

            files => {
                files.forEach(file => {
                    this.downloadFile(file.id, data => {
                        if (callback) 
                            callback(data, file.id);
                    });
                });
            }, 
        );
    }

    getPathsForTopic(topicDescriptor, callback, onerror) {
        
        this.listFiles(
            topicDescriptor, 

            files => {
                files.forEach(file => {
                    this.downloadFile(file.id, data => {
                        if (callback) 
                            callback(data, file.id);
                    });
                });
            }, 
        );
    }

    getPathContent(pathId) {

    }
}

const Googler = new GoogleDriver();

export {Googler}