var request = require('request');
var fs = require('fs');

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
    cb(err, res, body)
  });
}

function getURLs(err, res, body) {
  if (err) throw err;
    var obj = JSON.parse(body)
    var avatarURLS = []
    for (var i in obj){
      avatarURLS.push(obj[i].avatar_url);
    }
}

function downloadImageByURL(url, filePath){
  request.get(url)
  .on('error', function(err){
    throw err;
  })
  .on('response', function(response){
    console.log("Response Status Code: ", response.statusCode);
  })
  .pipe(fs.createWriteStream(filePath));
}
getRepoContributors('jquery', 'jquery', getURLs);

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg")