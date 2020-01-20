import {google} from 'googleapis';

//https://github.com/googleapis/google-api-nodejs-client/tree/master/samples/drive

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

        this.result = [];

        this.authorize();
    }

    authorize() {
        const {client_secret, client_id, redirect_uris} = this.credentials;
        this.client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        this.client.setCredentials(this.tokens);
        this.drive = google.drive({version: 'v3', auth: this.client});
    }

    listFiles(fileId, callback, onerror, nextPageToken, result) {

        this.drive.files.list(
            {
                auth: this.client,
                q: `('${fileId}' in parents)`,
                fields: 'nextPageToken, files(name, id, mimeType)',
                orderBy: 'folder, name',
                pageSize: 1000,
                pageToken: nextPageToken != null ? nextPageToken : ''
            }, 
            (error, response) => {

                if (error && onerror) {
                    onerror(error);
                }

                if (response && response.data) {

                    var files = response.data.files;
                    var token = response.data.nextPageToken;

                    if (result == null)
                        result = [];

                    if (files.length) {
                        files.map((file) => {
                            result.push(file);
                        });
                    }

                    if (token) {
                        this.listFiles(fileId, callback, onerror, token, result);
                        return;
                    }

                    if (callback) {
                        callback(result);
                    }
                }
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

    updateFile(fileId, content, callback, onerror) {

        this.drive.files.update(
            {
                "auth": this.client,
                "fileId": fileId,
                "media": {
                    "body": `${content}`
                }
            },
            {
                mimeType: 'application/vnd.google-apps.file',
                uploadType: 'media',
                fields: 'id'
            },
            (error, file) => {

                console.log(error, file);

                if (onerror)
                    onerror(error);

                if (callback)
                    callback(file);
            }
        );   
    }

    createFile(fileName, content, parent, callback, onerror) {

        this.drive.files.create(
            {
                requestBody: {
                    name: `${fileName}`,
                    parents: [`${parent}`],
                    mimeType: 'text/plain'
                },
                media: {
                    body: `${content}`,
                    mimeType: 'text/plain'
                },
            },
            (error, file) => {

                if (onerror)
                    onerror(error);

                if (callback)
                    callback(file);
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

    isFolder(file) {
        return file.mimeType === 'application/vnd.google-apps.folder';
    }
}

const Googler = new GoogleDriver();

export {Googler}

/*

    googleapis-commons/build/src/apirequest.js

        - create

            ...
            if (resource) {
                // gaxios doesn't support multipart/related uploads, so it has to
                // be implemented here.
                params.uploadType = 'multipart';
                const multipart = [
                    { 'Content-Type': 'application/json; charset=UTF-8', body: JSON.stringify(resource) }, {
                        'Content-Type': media.mimeType || (resource && resource.mimeType) || defaultMime,
                        body: media.body // can be a readable stream or raw string!
                    }
                ];
                const boundary = uuid.v4();
                const finale = `--${boundary}--`;
                headers['Content-Type'] = `multipart/related; boundary=${boundary}`;

                let data = '';
                for (const part of multipart) {
                    const preamble = `--${boundary}\r\nContent-Type: ${part['Content-Type']}\r\n\r\n`;
                    data += preamble;
                    data += part.body;
                    data += '\r\n';
                }
                data += finale;

                options.data = data;
            }
            ...
*/