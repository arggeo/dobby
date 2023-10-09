# Dobby
## Approves github pull requests
A Slack app for approving your github pull requests as a third person directly from the messaging app.

## About the app
This app was created out of neccessity and to cover my own needs. I am sharing it in case someone else needs to use something like this. There are a lot of potential improvements but I am not planning to do so in the near future. If interested, feel free to collaborate or send me an email if you need a particular addition/modification which makes sense and it will not fit your needs only but will benefit others too.

## How it works
1. Copy the pull request url from the url bar
2. In any slack channel/user group/dm type: `/dobby your-pull-request-url` and hit enter
3. Approved (feedback is provided)

## How to setup
1. Create a slack app via importing the manifest.yml (replace *https://example.com* with your server url -> **features/slash_commands/command/url**)
2. Generate a github access token of the person who is going to be the approver used by the app (I would suggest creating a separate user for this purpose with limited permissions):
   - **Metadata**      -> *Access: Read-only*
   - **Pull requests** -> *Access: Read and write*
3. Add the following *environment variables* (create .env file) and spin up the nodejs app (**node v16**):
   - SLACK_SIGNING_SECRET -> https://api.slack.com/apps/your-app-id/general
   - SLACK_APP_TOKEN -> https://api.slack.com/apps/your-app-id/general (App-Level Tokens section)
   - SLACK_BOT_TOKEN -> https://api.slack.com/apps/your-app-id/oauth
   - GITHUB_ACCESS_TOKEN -> https://github.com/settings/tokens?type=beta
   - GITHUB_OWNER

## Configuration
1. Humor/Normal mode       -> app.js:14 `const message = messagesConfig(messageModes.HUMOR);` options: NORMAL | HUMOR
2. Private/Public feedback -> settings.js:1 `exports.privateResults = true;` options: true | false

## Disclaimer
*Dobby images displayed in the app are not mine, I just found the urls on google.com. If it happens you are the owner and you wish I remove them please contact me and I will do so if proof is provided.*