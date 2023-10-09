// package imports
const dotenv = require('dotenv');
dotenv.config();

const { App } = require('@slack/bolt');
const { Octokit } = require('@octokit/core');

// custom imports
const { usersWhitelist, pullRequestUrlRegex, privateResults, events, responseTypes, messageModes } = require('./settings');
const AuthorizationError = require('./classes/Errors/AuthorizationError');
const { pullRequestUrlParser } = require('./helpers');

const messagesConfig = require('./messages');
const message = messagesConfig(messageModes.HUMOR);

// global constants/variables
const response_type = privateResults ? responseTypes.EPHEMERAL : responseTypes.IN_CHANNEL;

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    port: process.env.PORT
});

const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
});

// commands
app.command('/dobby', async ({ command, ack, respond }) => {
    try {
        await ack({ response_type });

        const { text: content, user_name } = command;

        if (!usersWhitelist.includes(command.user_name)) {
            throw new AuthorizationError('You are not allowed to command Dobby');
        }

        let pullRequestUrl = content.split(' ').find(part => pullRequestUrlRegex.test(part));

        if (!pullRequestUrl) {
            throw new Error('Invalid pull request url\nExample: `/dobby https://github.com/owner/repo/pull/0/`');
        }

        const { repo, pull_number } = pullRequestUrlParser(pullRequestUrl);

        await octokit.request('POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
            owner: process.env.GITHUB_OWNER,
            repo,
            pull_number,
            event: events.APPROVE
        });

        await respond({
            response_type,
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `${message('header', content, user_name)}\n\n${message('body')}`
                    },
                    accessory: {
                        type: 'image',
                        image_url: 'https://i.ibb.co/LhTvXxD/dobby-fingersnap.png',
                        alt_text: 'dobby fingersnap'
                    }
                }
            ]
        });
    } catch (e) {
        const response = {
            blocks: [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Dobby is confused?!*\n\n${e.message}`
                    },
                    accessory: {
                        type: 'image',
                        image_url: 'https://i.ibb.co/tmf9hns/dobby-confused.png',
                        alt_text: 'dobby confused'
                    }
                }
            ]
        };

        switch (e.name) {
            case 'AuthorizationError':
                response.blocks[0].text.text = `*Who are you?*\n\n${e.message}`;
                response.blocks[0].accessory.image_url = 'https://i.ibb.co/P9sHPxv/dobby-thumbs-up.png';
                response.blocks[0].accessory.alt_text = 'dobby thumbs up';
            default:
                break;
        }

        await respond(response);
    }
});

// start app
(async () => {
    await app.start();
    console.log('Dobby app is running!');
})();