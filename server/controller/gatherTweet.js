const Twitter = require('twitter-lite');
const deepai = require('deepai');
const config = require('../../config.js');

const user = new Twitter ({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
});
deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');

module.exports = {
  gatherTweet (req, res) {
    let tweetList = [];

    const sentiment = async () => {
      try {
          // Retrieve the bearer token from twitter.
          let response = await user.getBearerToken();

          // Construct our API client with the bearer token.
          const App = new Twitter({
              bearer_token: response.access_token,
          });

          response = await App.get(`/search/tweets`, {
            q: req.query.crypto, // The search term
            lang: "en",        // Let's only get English tweets
            count: 10,        // Limit the results to 10 tweets
            src: 'typed_query',
            f: 'top'
          });

          // Loop over all the tweets and print the text
          for (tweet of response.statuses) {
              tweetList.push(tweet.text)
          }

        res.send(tweetList).status(200);

      } catch(e) {
        console.log("There was an error calling the Twitter API.");
        console.dir(e);
        res.sendStatus(400)
      }
    };
    sentiment();
  }
}
