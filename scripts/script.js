"use strict";

module.exports = function(robot) {

	var playList = ["https://www.youtube.com/watch?v=0CFuCYNx-1g&list=RD0CFuCYNx-1g",
	"https://www.youtube.com/watch?v=6sIjSNTS7Fs",
	"https://www.youtube.com/watch?v=hYKYka-PNt0",
	"https://www.youtube.com/watch?v=K9KKBvWTdMQ",
	"https://www.youtube.com/watch?v=rc0XEw4m-3w"];

	function getRandSong(){
		var randNumber = Math.floor(Math.random() * playList.length);
		return playList[randNumber];
	}

  	robot.respond(/hi|hello/i, function(msg) {
    	return msg.send("Hello! I'm hear, but I prefer to just listen in.");
   	});
  	
	robot.hear(/sing|song|singing|voice/i, function(msg) {
		var songsSung, totalSongs;
		songsSung = robot.brain.get('totalSongs');
		if(songsSung){songsSung;
		} else {
			songsSung = 0;
		}
		if(songsSung < 5){
			msg.reply("Did somebody want me to sing? How about this: " + getRandSong() + " I'm just warming up!");
			return robot.brain.set('totalSongs', songsSung + 1);
		} else if (songsSung % 2  === 0 && songsSung % 3  === 0) {
			msg.reply("Did somebody want me to sing? How about this: " + getRandSong());
			return robot.brain.set('totalSongs', songsSung + 1);
		} else {
			msg.reply("I've sung too much, taking a break. Try again later.");
			return robot.brain.set('totalSongs', songsSung + 1);
		}

	});

	robot.respond(/add this to your playlist (.*)/i, function(msg) {
	  var newSong = msg.match[1];
	  playList.push(newSong);
	  return msg.reply("I've added " + newSong + " to my song list. You may get it next time!");
	});

	robot.respond(/what's my playlist/i, function(msg) {
		var playListUF = playList.join("\n");
		return msg.reply(playListUF);
	});

};