function initClient() {
    const API_KEY = '';
    const CLIENT_ID = '';
    const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}