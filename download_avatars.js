var request = require('request');
var fs = require('fs');
var ownerRepo = process.argv[2];
var nameRepo = process.argv[3];

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
  for (var i in obj){
    downloadImageByURL(obj[i].avatar_url, "avatars/"+obj[i].login+".jpg")
  }
}

function downloadImageByURL(url, filePath){
  request.get(url)
  .on('error', function(err){
    throw err;
  })
  .on('response', function(response){
    console.log("Downloading Avatar...");
  })
  .pipe(fs.createWriteStream(filePath));
}
if (process.argv[2] === undefined || process.argv[3] === undefined){
  console.log("You must enter both the repo's owner and name!");
} else {getRepoContributors(ownerRepo, nameRepo, getURLs);
}