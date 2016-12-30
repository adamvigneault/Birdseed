var request = require("request");

module.exports = function(callback) {
    if (process.env.TWITTER_BEARER_TOKEN) {callback(true); return;}

    process.env.TWITTER_CONSUMER_KEY = '';
    process.env.TWITTER_CONSUMER_SECRET = '';

    request("https://api.twitter.com/oauth2/token",{
            method : "POST",
            auth: {
                user: process.env.TWITTER_CONSUMER_KEY,
                pass: process.env.TWITTER_CONSUMER_SECRET
            },
            form: {
                "grant_type" : "client_credentials"
            }
        },
        function(error,res) {
            var json = JSON.parse(res.body);
            if (json.token_type === "bearer") {
                process.env.TWITTER_BEARER_TOKEN = json.access_token;
                callback(true);
            } else callback(false, error);
        }
    );
};