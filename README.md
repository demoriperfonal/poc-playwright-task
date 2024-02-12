
# POC for the testing project

Simple POC for the TS - Playwright Testing framework




## Used tools

- TS as a main programming language
- Playwrightt as a test skeleton




## Local usage

To run these tests make sure you did the following steps:

to install dependencies
```bash
    npm install
```

set env properties in .env file
```bash
    BASE_URL=''
    ACTIVE_USER_EMAIL=''
    INNACTIVE_USER_ACCOUNT=''
    DEFAULT_PASS=''
    SOLVER_API_KEY=''
    ASSIGNED_DEFAULT_MEMBER=''
    EMAIL_FROM=''
```
set credentials.json properties (need for gmail account)
```bash
  {
    "installed": {
        "client_id": "",
        "project_id": "",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "",
        "redirect_uris": [
            "urn:ietf:wg:oauth:2.0:oob",
            "http://localhost"
        ]
    }
}
```

