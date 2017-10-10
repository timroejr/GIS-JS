
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

const Files = Parse.Object.extend("files");

Parse.Cloud.afterSave("files", function(request) {
	console.log(request);	
	var json = request.object.get('file');
	Parse.Cloud.httpRequest({ url: json.url() }).then(function(response) {
  // The file contents are in response.buffer.
  		var data = response.text.split("\n");
  		console.log("Data Length:" + data.length);
  		//var jsonConverted = JSON.parse("[" + response.text + "]");
  		var Tweets = Parse.Object.extend("tweets");
  		//console.log(jsonConverted.length);
  		for (i = 0; i < data.length; i++) {
  			var json = JSON.parse(data[i]);
  			console.log("dataString: " + data[i]);
  			console.log("JSON: " + json);
  			console.log("JSON: " + JSON.stringify(json));
  			console.log("data" + i);
			var tweet = new Tweets();
			console.log("tweetId: " + json.id);
			tweet.set("createdAtStr", json.created_at);
			tweet.set("in_reply_to_status_id_str", json.in_reply_to_status_id_str);
			tweet.set("in_reply_to_screen_name", json.in_reply_to_screen_name);
			tweet.set("in_reply_to_user_id_str", json.in_reply_to_user_id_str);
			tweet.set("tweetId", json.id);
			tweet.set("text", json.text);
			tweet.set("in_reply_to_status_id", json.in_reply_to_status_id);
			tweet.set("in_reply_to_user_id", json.in_reply_to_user_id);
			tweet.set("source", json.source);
			tweet.set("tweetIdString", json.id_str);
			tweet.set("truncated", json.truncated);
			if (json.geo == null) {
			
			} else {
				var point = new Parse.GeoPoint({latitude: json.geo.coordinates[0], longitude: json.geo.coordinates[1]});
				tweet.set("coord", point);
			}
			
			/*var p = new Persons();
			
			var u = json.user;
			
			p.set("id", u.id_str);
			p.set("name", u.name);
			p.set("screen_name", u.sceen_name);
			p.set("location", u.location);
			p.set("url", u.url);
			p.set("description", u.description);
			p.set("protected", u.protected);
			p.set("verified", u.verified);
			p.set("followers_count", u.followers_count);
			p.set("friends_count", u.friends_count);
			p.set("listed_count", u.listed_count);
			p.set("favourites_count", u.favourites_count);
			p.set("statuses_count", u.statuses_count);
			//p.save();
			
			var userid;
			p.save(null, {
			success: function(obj) {
				userid = obj.id;
				console.log("User Saved: " + obj.id);
			}, error: function(obj, error){
				console.log("ERROR! " + error.code + error.message);
			}
			});*/
						
			tweet.save(null, {
			success: function(obj) {
				console.log(obj.id);
			}, error: function(obj, error) {
			console.log("ERROR " + error.code + error.message);
			}
			});
  		}
	});
	

	
	
	
	/*Parse.Cloud.useMasterKey();    
	const query = Parse.Query(Files);
	query.get(request.object.id).then(function(object) {
		var Tweets = Parse.Object.extend("tweets");
		var tweet = new Tweets();
		console.log(object);
		tweet.set("text", "test");
		tweet.save();
		
	}).catch(function(error) {
		console.error("ERROR: " + error.code + ": " + error.message);
	});*/
});