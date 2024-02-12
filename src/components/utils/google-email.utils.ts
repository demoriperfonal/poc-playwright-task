import { google } from 'googleapis';
import { readFile, writeFile } from 'fs/promises';
import readline from 'readline';
import getEnvProperty, { EnvProp } from './env.utils';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json';

export async function getConfirmationEmailToken(): Promise<string> {
    const credentials = JSON.parse(await readFile('./credentials.json', 'utf-8'));

    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    try {
        const token = JSON.parse(await readFile(TOKEN_PATH, 'utf-8'));
        oAuth2Client.setCredentials(token);
    } catch (err) {
        const token = await getNewToken(oAuth2Client);
        oAuth2Client.setCredentials(token);
        await writeFile(TOKEN_PATH, JSON.stringify(token));
    }

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    try {
        const response = await gmail.users.messages.list({
            userId: 'me',
            q: `from:${getEnvProperty(EnvProp.EMAIL_FROM)} has:html in:inbox`
        });

        const messages = response.data.messages;

        if (messages && messages.length > 0) {
            const messageId = messages[0].id;
            const msgResponse = await gmail.users.messages.get({ userId: 'me', id: messageId! });
            const href = extractHref(msgResponse.data);
            return href
        }
    } catch (err) {
        console.error('The API returned an error:', err);
    }
}

async function getNewToken(oAuth2Client: any): Promise<any> {
    const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve, reject) => {
        rl.question('Enter the code from that page here: ', async (code) => {
            rl.close();
            try {
                const { tokens } = await oAuth2Client.getToken(code);
                resolve(tokens);
            } catch (err) {
                reject(err);
            }
        });
    });
}

function extractHref(message: any): string | null {
    const parts = message.payload.parts;
    if (!parts) return null;

    for (const part of parts) {
        if (part.mimeType === 'text/html' && part.body && part.body.data) {
            const htmlBody = Buffer.from(part.body.data, 'base64').toString('utf-8');
            const match = htmlBody.match(/href="(.*?)"/);
            if (match) {
                return match[1];
            }
        }
    }
    return null;
}
