var request = require('request');
var fs = require('fs');
require('dotenv').config()
var ownerRepo = process.argv[2];
var nameRepo = process.argv[3];
GITHUB_USER = process.env.GITHUB_USER;
GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function getRepoContributors(repoOwner, repoName, cb){
  var requestURL = "https://"+ GITHUB_USER + ":" + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + "/" + repoName + "/contributors";
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'AvatarProject'
    }
  };
  if (!checkCredentials(GITHUB_USER, requestURL, options)){
    return
  }
  request(options, function(err, res, body){
    cb(err, res, body)
  });
}

function getAvatars(err, res, body){
  loopThroughContributors(err, res, body, downloadImageByURL);
}

function loopThroughContributors(err, res, body, cb) {
  if (err) throw err;
  var obj = JSON.parse(body)
  if (obj.message === "Not Found"){
    console.log("The Owner or Repo you specified do not exist");
    return
  }
  for (var i in obj){
    cb(obj[i]);
  }
}
function downloadImageByURL(obj){
  var url = obj.avatar_url;
  var filePath = "avatars/"+obj.login+".jpg"
  request.get(url)
  .on('error', function(err){
    throw err;
  })
  .on('response', function(response){
    console.log("Downloading Avatar...");
  })
  .pipe(fs.createWriteStream(filePath));
}

function checkCredentials(user, token, options){
  var urlUser = "https://github.com/"+user;
  request(urlUser, function(error, response, body){
    if (error) console.log("error:", error);
    if (response.statusCode == 404){
      console.log("You've put in an invalid User in your .env!");
      return false;
    }
  });
  request(options, function(error, response, body){
    if (error) console.log("error:", error);
    if (response.statusCode != 200){
      console.log("You entered an incorrect token in .env!")
      return false;
    }

  });
  return true

}
if (ownerRepo === undefined || nameRepo === undefined || process.argv[4] != undefined){
  console.log("You must enter both the repo's owner and name but nothing else!");
} else if (!fs.existsSync("avatars/")){
  console.log("The path avatars/ does not exist!")
  console.log("Creating it now...");
  fs.mkdirSync("avatars/");
  console.log("Done! Please run me again!")
} else if (!fs.existsSync(".env")){
  console.log("You must posess the .env file!");
  fs.writeFile(".env", "GITHUB_USER = \nGITHUB_TOKEN = ");
  console.log("Created it for you, please fill it out.")
} else if (GITHUB_USER == "" || GITHUB_TOKEN == ""){
  console.log("Please add your information to the .env file")
} else  {getRepoContributors(ownerRepo, nameRepo, getAvatars);
}