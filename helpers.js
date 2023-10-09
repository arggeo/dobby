exports.pullRequestUrlParser = (url) => {
    const urlSegments = url.split('/');

    return {
        repo: urlSegments[4],
        pull_number: urlSegments[6]
    };
};