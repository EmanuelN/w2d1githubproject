var request = require('request');

const GITHUB_USER = "EmanuelN";
const GITHUB_TOKEN = "36412cc8405fa83d470e87a3c1324504524a98b4";

function getRepoContributors(repoOwner, repoName, cb){
  var requestURL = "https://"+ GITHUB_USER + ":" + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + "/" + repoName + "/contributors";
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'AvatarProject'
    }
  };

  request(options, function(err, res, body){
    if (err) throw err;
    var obj = JSON.parse(body)
    console.log(obj);
  });
}
getRepoContributors('jquery', 'jquery', 'cb');
