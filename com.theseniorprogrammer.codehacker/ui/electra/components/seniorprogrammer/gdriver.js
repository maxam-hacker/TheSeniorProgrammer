import {google} from 'googleapis';

class GoogleDriver {

    constructor() {

        this.credentials =
        {
            client_id                     : "322452255850-nehb1hgac93q42l8sj0j174n0mj8v7hf.apps.googleusercontent.com",
            project_id                    : "theseniorprogrammer-265209",
            auth_uri                      : "https://accounts.google.com/o/oauth2/auth",
            token_uri                     : "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url   : "https://www.googleapis.com/oauth2/v1/certs",
            client_secret                 : "q5MiXRojX46IlfaiHAzyh9iE",
            redirect_uris                 : ["urn:ietf:wg:oauth:2.0:oob","http://localhost"]
        };

        this.tokens = {
            "access_token":"ya29.Il-6B2nfE_sASb_OQexv_t0AxzTsTo-WqgyPHQB7KrXPWOJxkHWtNc6s-KZmtJlnhnv_SyxlnbqAHuU-coL-1E5SUl6g2nvDMLKYW0Stnen94RO3mWZVxjCXpC3A1dpnFg",
            "refresh_token":"1//0c3_fYeYhgqGRCgYIARAAGAwSNwF-L9IriXHA0x31SoxakNjQnkoMFBoCOvO8af_0dsfIr_DIr8pj9BYFw_gd0p8Hhai-GYWud_A",
            "scope":"https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file",
            "token_type":"Bearer",
            "expiry_date":1579200734358
        };

        this.authorize();
    }

    authorize() {

        const {client_secret, client_id, redirect_uris} = this.credentials;
        this.client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        this.client.setCredentials(this.tokens);
        console.log(this.client);
        this.listFiles();
    }

    listFiles() {

        const drive = google.drive({version: 'v3'});

        console.log(drive);

        drive.files.list(
        {
            auth: this.client,
            pageSize: 100,
            q: "mimeType = 'application/vnd.google-apps.folder'"
            //fields: 'files(name, originalFilename, description, iconLink, webViewLink, properties)'
        }, 
        
        (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            if (files.length) {
                console.log('Files:');
                files.map((file) => {
                    console.log(file);
                });
            } else {
                console.log('No files found.');
          }
        });
    }
}

const Googler = new GoogleDriver();

export {Googler}