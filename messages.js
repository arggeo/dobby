const dobbyMessages = {
    normal: {
        header: "Approval requested for\n{pullRequestUrl}",
        body: "Pull request approved"
    },
    humor: {
        header: "*Master @{master} commanded Dobby to approve his pull request immediately...*\n<{pullRequestUrl}|{pullRequestUrl}>",
        body: "Dobby approved it! Go go merget it! :rocket:"
    }
};

const messagesConfig = (mode) => {
    mode = mode.trim().toLowerCase();
    
    if (!Object.keys(dobbyMessages).includes(mode)) {
        throw new Error('Please provide a valid mode: normal | humor');
    }

    return (messagePart, pullRequestUrl, masterName) => {
        messagePart = messagePart.trim().toLowerCase();
        pullRequestUrl ? pullRequestUrl.trim().toLowerCase() : null;
        masterName ? masterName.trim().toLowerCase(): null;

        if (!messagePart || !Object.keys(dobbyMessages[mode]).includes(messagePart)) {
            throw new Error('Please provide a message part: header | body')
        }

        if (messagePart === 'header') {
            dobbyMessages[mode][messagePart] = dobbyMessages[mode][messagePart].replace(/{pullRequestUrl}/g, pullRequestUrl);

            if (masterName) {
                dobbyMessages[mode][messagePart] = dobbyMessages[mode][messagePart].replace('{master}', masterName);
            } else {
                dobbyMessages[mode][messagePart] = dobbyMessages[mode][messagePart].replace('@{master} ', '');
            }
        }
        
        return dobbyMessages[mode][messagePart];
    };
};

module.exports = messagesConfig;