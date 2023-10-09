exports.privateResults = true;
exports.usersWhitelist = ['dobby_slack_app'];
exports.pullRequestUrlRegex = /^https:\/\/github\.com\/([\w\d-_]+\/){2}pull\/\d+\/?$/;

exports.messageModes = Object.freeze({
    NORMAL: 'normal',
    HUMOR: 'humor'
});
exports.events = Object.freeze({
    APPROVE: 'APPROVE'
});
exports.responseTypes = Object.freeze({
    EPHEMERAL: 'ephemeral',
    IN_CHANNEL: 'in_channel'
});