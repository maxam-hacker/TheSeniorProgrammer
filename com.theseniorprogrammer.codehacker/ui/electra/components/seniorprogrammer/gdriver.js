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

        this.tokens = {"access_token":"ya29.Il-6B6N4CQAovtLHRlYrnFvGKlHb5qony_X-Q3_RStExfaWqfPrYT5MpGKpqxmXTA5xUqC_HL4vu2zvrVlHhjuQYEaCS3lHhgP5b6z0QcGKYBPTDK537xlw7-mvyhvJNbg","refresh_token":"1//0ce3-B2PtUfPWCgYIARAAGAwSNwF-L9IrIhmgA4nk2cVp9jXhxVFPo_oZD-xw3D_1IksduJozAsblo_LVU74DFCeOEy63cgsyxDQ","scope":"https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata.readonly","token_type":"Bearer","expiry_date":1579209726381};

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
            //q: "('root' in parents)",
            //q: "parents in '116ayPbVCrjGo8SLQ1EzPqxsb2FdRrpTZ'",
            //q: "parents in '1qt46NBhtmm8FmklwzXYhlRvV4GZR_dCD'",
            q: "('1qt46NBhtmm8FmklwzXYhlRvV4GZR_dCD' in parents)",
            //q: "('1eKQikx1bRoQDUC3YmrK_NQo53WExzAxR' in parents)",
            fields: 'files(name, id)',
            orderBy: 'folder, name'
        }, 
        
        (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            if (files.length) {
                console.log('Files:');
                files.map((file) => {
                    console.log(file.name);
                });
            } else {
                console.log('No files found.');
          }
        });
    }
}

const Googler = new GoogleDriver();

export {Googler}