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
            "access_token":"ya29.Il-6By1MRfn3EbByHOebO-BJVRNhFOOUynxaVI94dV89Oa8xM3BIcJvDjdF9z-xC8ygEfH4K4me6-jhzCueCEtscOTyRR1R2z6Y6XgMZ5VD9N7QCYJmHVohXa8Zn3iMGBg",
            "refresh_token":"1//0cpyai5ZgLQs7CgYIARAAGAwSNwF-L9IrACBOKafHxqfD_1gG6mHjud9TZIdAs3zTDOA0o-VHer3lA4C3-Vg6jJ7sxeSDe_DmrFY",
            "scope":"https://www.googleapis.com/auth/drive.metadata.readonly",
            "token_type":"Bearer",
            "expiry_date":1579197722094};

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

        drive.files.list(
        {
            auth: this.client,
            pageSize: 100,
            fields: 'files(name)'
        }, 
        
        (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            if (files.length) {
                console.log('Files:');
                files.map((file) => {
                    console.log(`${file.name} (${file.id})`);
                });
            } else {
                console.log('No files found.');
          }
        });
    }
}

const Googler = new GoogleDriver();

export {Googler}