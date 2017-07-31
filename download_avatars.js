var request = require('request');

console.log("Welcome to the GitHub Avatar Downloader!");

const GITHUB_USER = "EmanuelN";
const GITHUB_TOKEN = "36412cc8405fa83d470e87a3c1324504524a98b4";

function getRepoContributors(repoOwner, repoName, cb){
  var requestURL = "https://"+ GITHUB_USER + ":" + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + "/" + repoName + "/contributors";
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors: ", err);
  console.log("Results:", result);
})

getRepoContributors('jquery', 'jquery', 'cb');