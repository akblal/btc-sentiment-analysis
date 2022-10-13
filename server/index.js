const express = require('express');
const cors = require('cors');

const controllerTweet = require ('./controller/gatherTweet.js')

const path = require("path");
const app = express();

app.post('/sentiment', controllerTweet.gatherTweet);
// const sentiment = async () => {
//     try {
//         // Retrieve the bearer token from twitter.
//         let response = await user.getBearerToken();
//         console.log(`Got the following Bearer token from Twitter: ${response.access_token}`);

//         // Construct our API client with the bearer token.
//         const app = new Twitter({
//             bearer_token: response.access_token,
//         });

//         response = await app.get(`/search/tweets`, {
//           q: "Bitcoin", // The search term
//           lang: "en",        // Let's only get English tweets
//           count: 1,        // Limit the results to 100 tweets
//         });

//         // Loop over all the tweets and print the text
//         for (tweet of response.statuses) {
//             console.dir(tweet.text);
//         }
//     } catch(e) {
//         console.log("There was an error calling the Twitter API.");
//         console.dir(e);
//     }
// };

// sentiment();


//middleware
app.use(express.json());
app.use(express.static('client/dist'));
app.use(cors());

app.listen(3000,()=>{
  console.log('listening on port 3000');
})

