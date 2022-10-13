const Twitter = require('twitter-lite');

const user = new Twitter ({
  consumer_key: 'eY21UZ10W9KLycM3BZu8y7mFJ',
  consumer_secret: 'RdrjCKwfLfowfHJryh5OyRQQtu3s1pB0fvDWE0HsieVJxJhtlU',
});


module.exports = {
  gatherTweet (req, res) {
    const sentiment = async () => {
      try {
          // Retrieve the bearer token from twitter.
          let response = await user.getBearerToken();
          console.log(`Got the following Bearer token from Twitter: ${response.access_token}`);

          // Construct our API client with the bearer token.
          const App = new Twitter({
              bearer_token: response.access_token,
          });

          response = await App.get(`/search/tweets`, {
            q: req.query.crypto, // The search term
            lang: "en",        // Let's only get English tweets
            count: 10,        // Limit the results to 10 tweets
          });

          // Loop over all the tweets and print the text
          for (tweet of response.statuses) {
              console.dir(tweet.text);
          }
          res.sendStatus(200)
      } catch(e) {
          console.log("There was an error calling the Twitter API.");
          console.dir(e);
          res.sendStatus(400)
      }
  };
  console.log(req.query.crypto)
  sentiment();
  }
}