/**
 * Welcome to source.js!
 * Created by CreaturePhil
 * 
 * source.js is a Pokemon Showdown modded API for custom servers.
 * Currently it holds modules* for Standard Streams,
 * Twitch Chat Implementation, and emoticons.
 * 
 * *Module - A portion of a program that carries out a specific function and 
 * may be used alone or combined with other modules of the same program.
 *
 * @license MIT license
 */
 
 var Source = {
 
	/* This is for standard input for the primitive type number in JavaScript. Standard input is data (often text) going into a program. 
	 * The program requests data transfers by use of the read operation.
	 * @param property is the user's property that will be set to info in the function,
	 * file is the storage for the data, and user is an object having its property modified.
	 * @return void
	 */
	stdinNumber: function(file, user, property){
		var info = 0;
		var match = false;
		
		var data = fs.readFileSync('config/'+file,'utf8');
		
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (user.userid === userid) {
				info = Number(parts[1]);
				match = true;
				if (match === true) {
					break;
				}
			}
		}
		Object.defineProperty(user, property, { value : info, writable : true });
	},
	
	/* This is for standard output for the primitive type number in JavaScript. 
	 * Standard output is the stream where a program writes its output data. 
	 * The program requests data transfer with the write operation.
	 * @param property is the user's property,
	 * file is the storage for the data, user is an object having its property modified,
	 * amount is how much you want to change the user's property,
	 * @return void, this function just writes the info into the file
	 */
	stdoutNumber: function(file, user, property, amount) {
		var data = fs.readFileSync('config/'+file,'utf8');
		var match = false;
		var info = 0;
		var row = (''+data).split("\n");
		var line = '';
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (user.userid === userid) {
				info = Number(parts[1]);
				match = true;
				if (match === true) {
					line = line + row[i];
					break;
				}
			}
		}
		var total = info + amount;
		Object.defineProperty(user, property, { value : total, writable : true });
		if (match === true) {
			var re = new RegExp(line,"g");
			fs.readFile('config/'+file, 'utf8', function(err, data) {
			if (err) {
				return console.log(err);
			}
			var result = data.replace(re, user.userid+','+total);
			fs.writeFile('config/'+file, result, 'utf8', function(err) {
				if (err) return console.log(err);
			});
			});
		} else {
			var log = fs.createWriteStream('config/'+file, {'flags': 'a'});
			log.write("\n"+user.userid+','+total);
		}
	},
	
	/* This is for standard input for the primitive type string in JavaScript. Standard input is data (often text) going into a program. 
	 * The program requests data transfers by use of the read operation.
	 * @param file is where the data is stored, user is the object having its property modified,
	 * and property is the user's property being modified.
	 * @return void
	 */
	stdinString: function(file, user, property) {
			var info = "";
			var match = false;
		
	    	var data = fs.readFileSync('config/'+file,'utf8');

	        var row = (''+data).split("\n");
	        for (var i = row.length; i > -1; i--) {
	                if (!row[i]) continue;
	                var parts = row[i].split(",");
	                var userid = toUserid(parts[0]);
	                if (user.userid == userid) {
	                	info = String(parts[1]);
	                    match = true;
	                    if (match === true) {
	                            break;
	                    }
	                }
	        }
			Object.defineProperty(user, property, { value : info, writable : true });
	},
	
	/* This is for standard output for the primitive type string in JavaScript. 
	 * Standard output is the stream where a program writes its output data. 
	 * The program requests data transfer with the write operation.
	 * @param file is where the data is stored, user is the object where it's parameter is being modified,
	 * property is the user's property being modified, and
	 * info is used to stored the new user's property and being written in the file.
	 * @return void, this function just writes the info into the file
	 */
	stdoutString: function(file, user, property, info) {
		var data = fs.readFileSync('config/'+file,'utf8');
		var match = false;
		var row = (''+data).split("\n");
		var line = '';
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (user.userid == userid) {
				match = true;
				if (match === true) {
					line = line + row[i];
					break;
				}
			}
		}
		Object.defineProperty(user, property, { value : info, writable : true });
		if (match === true) {
			var re = new RegExp(line,"g");
			fs.readFile('config/'+file, 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			var result = data.replace(re, user.userid+','+info);
			fs.writeFile('config/'+file, result, 'utf8', function (err) {
				if (err) return console.log(err);
			});
			});
		} else {
			var log = fs.createWriteStream('config/'+file, {'flags': 'a'});
			log.write("\n"+user.userid+','+info);
		}
	},
	
	escapeHTML: function(target) {
		if (!target) return false;
		target = target.replace(/&(?!\w+;)/g, '&amp;');
		target = target.replace(/</g, '&lt;');
		target = target.replace(/>/g, '&gt;');
		target = target.replace(/"/g, '&quot;');
		return target;
	},
	
	formatAMPM: function(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	},
	
	twitchChat: function(room, user, connection, cmd, message) {
		if (user.twitchAccess === true) {
			if (cmd.substr(1,2) === 'pm') return;
			if (cmd.charAt(0) === '!') {
				return CommandParser.parse(message, room, user, connection);
			}
			if (message.length > 300) {
				connection.popup("Your message is too long:\n\n"+message);
				return false;
			}
			message = Source.escapeHTML(message);
			message = Twitch.replaceEmoticons(message);
			
			room.add('|raw|<div class="chat">'+Twitch.readTwitchGroup(user) + '<strong><font color="'+Color.hashColor(user.name)+'"><span class="username" data-name="'+user.name+'">'+user.name+':</font></span></strong> <em class="mine">'+message+'</em></div>');
			return false;
		} else {
			if (cmd.substr(1,2) === 'pm') return;
			if (cmd.charAt(0) === '!') {
				return CommandParser.parse(message, room, user, connection);
			}
			if (message.length > 300) {
				connection.popup("Your message is too long:\n\n"+message);
				return false;
			}
			message = Source.escapeHTML(message);
			message = Twitch.replaceEmoticons(message);
			
			if(message.indexOf('static-cdn') >= 0 || message.indexOf('e.deviantart.net/emoticons') >= 0){
				room.add('|raw|<div class="chat"><strong><small>'+user.group+'</small><font color="'+Color.hashColor(user.name)+'"><span class="username" data-name="'+user.name+'">'+user.name+':</font></span></strong> <em class="mine">'+message+' </em></div>');
				return false;
			}
			return true;
		}
	}
	
};

var Twitch = {

	readTwitchGroup: function(user) {
		/*
		Key:
		-----------
		S - <img src="http://i.imgur.com/UEMY7N1.png" title="System Operator" height="14">
		E - <img src="http://i.imgur.com/mbdkl0w.png" title="Elite Moderator" height="14">
		B - <img src="http://i.imgur.com/0IugM.png" title="Broadcaster" height="14">
		C - <img src="http://i.imgur.com/Fqiyjil.png" title="Chat Moderator" height="14">
		T - <img src="http://i.imgur.com/kZyJVgU.png" title="Turbo User" height="14">
		*/
		var twitchGroup = '';
		var key = '';
		var match = false;
		
		var data = fs.readFileSync('config/source-data/twitchgroups.csv','utf8');
		
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var parts = row[i].split(",");
				var userid = toUserid(parts[0]);
				if (user.userid == userid) {
					key = String(parts[1]);
					if (key.indexOf('S') >= 0) {
						twitchGroup += '<img src="http://i.imgur.com/UEMY7N1.png" title="System Operator" height="14">';
					}
					if (key.indexOf('E') >= 0) {
						twitchGroup += '<img src="http://i.imgur.com/mbdkl0w.png" title="Elite Moderator" height="14">';
					}
					if (key.indexOf('B') >= 0) {
						twitchGroup += '<img src="http://i.imgur.com/0IugM.png" title="Broadcaster" height="14">'; 
					}
					if (key.indexOf('C') >= 0) {
						twitchGroup += '<img src="http://i.imgur.com/Fqiyjil.png" title="Chat Moderator" height="14">';
					}
					if (key.indexOf('T') >= 0) {
						twitchGroup += ' <img src="http://i.imgur.com/kZyJVgU.png" title="Turbo User" height="14">';
					}
					match = true;
					if (match === true) {
						break;
					}
				}
		}
		user.twitchGroup = twitchGroup;
		return user.twitchGroup;
	},
	
	replaceEmoticons: function(text) {
		var emoticons = {
				':)': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ebf60cd72f7aa600-24x18.png',
				':O': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ae4e17f5b9624e2f-24x18.png',
				':(': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d570c4b3b8d8fc4d-24x18.png',
				';)': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-cfaf6eac72fe4de6-24x18.png',
				':P': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e838e5e34d9f240c-24x18.png',
				';P': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3407bf911ad2fd4a-24x18.png',
				'B)': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2cde79cfe74c6169-24x18.png',
				'O_o': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-8e128fa8dc1de29c-24x18.png',
				'R)': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-0536d670860bf733-24x18.png',
				':D': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-9f2ac5d4b53913d7-24x18.png',
				':z': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b9cbb6884788aa62-24x18.png',
				'BloodTrail': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f124d3a96eff228a-41x28.png',
				'BibleThump': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f6c13c7fc0a5c93d-36x30.png',
				'4Head': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-76292ac622b0fc38-20x30.png',
				'Kappa': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png',
				'PogChamp': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-60aa1af305e32d49-23x30.png',
				'ResidentSleeper': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1ddcc54d77fc4a61-28x28.png',
				'crtNova': 'http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3227-src-77d12eca2603dde0-28x28.png',
				'crtSSoH': 'http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3228-src-d4b613767d7259c4-28x28.png',
				'SSSsss': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5d019b356bd38360-24x24.png',
				'SwiftRage': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-680b6b3887ef0d17-21x28.png',
				'DansGame': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce52b18fccf73b29-25x32.png',
				'Kreygasm': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a624954918104fe-19x27.png',
				'FailFish': 'http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-c8a77ec0c49976d3-22x30.png',
				'pikaQQ': 'http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-10413-src-9e30fb4e8b42c21a-28x28.png',
				':ninja:': 'http://e.deviantart.net/emoticons/n/ninja.gif',
				':katana:': 'http://e.deviantart.net/emoticons/k/katana.gif',
				':ninjabattle:': 'http://e.deviantart.net/emoticons/n/ninjabattle.gif',
				':meditate:': 'http://e.deviantart.net/emoticons/n/ninjameditate.gif',
				':hump:': 'http://e.deviantart.net/emoticons/h/hump.gif'
			}, patterns = [], metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

			// build a regex pattern for each defined property
			for (var i in emoticons) {
				if (emoticons.hasOwnProperty(i)){ // escape metacharacters
				  patterns.push('('+i.replace(metachars, "\\$&")+')');
				}
			}

			// build the regular expression and replace
			return text.replace(new RegExp(patterns.join('|'),'g'), function (match) {
				return typeof emoticons[match] != 'undefined' ?
					   '<img src="'+emoticons[match]+'"/>' :
					   match;
			});
	}
	
};

var Color = {

	HueToRgb: function(m1, m2, hue) {
		var v;
		if (hue < 0)
			hue += 1;
		else if (hue > 1)
			hue -= 1;

		if (6 * hue < 1)
			v = m1 + (m2 - m1) * hue * 6;
		else if (2 * hue < 1)
			v = m2;
		else if (3 * hue < 2)
			v = m1 + (m2 - m1) * (2/3 - hue) * 6;
		else
			v = m1;

		return (255 * v).toString(16);
	},
	
	hashColor: function(name) {
		var crypto = require('crypto');
		var hash = crypto.createHash('md5').update(name).digest('hex');
		var H = parseInt(hash.substr(4, 4), 16) % 360;
		var S = parseInt(hash.substr(0, 4), 16) % 50 + 50;
		var L = parseInt(hash.substr(8, 4), 16) % 20 + 25;
		
		var m1, m2, hue;
		var r, g, b
		S /=100;
		L /= 100;
		if (S == 0)
			r = g = b = (L * 255).toString(16);
		else {
			if (L <= 0.5)
				m2 = L * (S + 1);
			else
				m2 = L + S - L * S;
				m1 = L * 2 - m2;
				hue = H / 360;
				r = this.HueToRgb(m1, m2, hue + 1/3);
				g = this.HueToRgb(m1, m2, hue);
				b = this.HueToRgb(m1, m2, hue - 1/3);
		}

		return 'rgb(' + r + ', ' + g + ', ' + b + ');';
	},
	customcolor: {}

};

var Profile = {

	avatar: function(user, height) {
		return '<img src="http://play.pokemonshowdown.com/sprites/trainers/' + user.avatar + '.png' + '" align="left" height="' + height + '">';
	},

	customAvatar: function(user, height) {
		return '<img src="http://192.184.93.98:5000/avatars/' + user.avatar + '" align="left" height="' + height + '"><br/>';
	},

	name: function(user) {
		return '<b><font size="2" color="' + Color.hashColor(user.name) + '">' + user.name + '</font></b><br/>';
	},

	unregisteredName: function(user) {
		return '<b><font size="2" color="' + Color.hashColor(user.name) + '">' + user.name + ' </b></font><font color="2">(Unregistered)</font><br/>';
	},

	group: function(config, user) {
		if (config.groups[user.group] && config.groups[user.group].name) {
			return config.groups[user.group].name + ' (' + user.group + ')<br/>';
		} else {
			return 'Regular User<br/>';
		}
	},
	
	views: function(user) {
		Source.stdinNumber('source-data/views.csv', user, 'views');
		return 'Views: ' + user.views + ' | ';
	},
	
	location: function(user) {
		Source.stdinString('source-data/location.csv', user, 'location');
		if (user.location === '') {
			user.location = 'Unknown';
		}
		return 'Location: ' + user.location + '<br/>';
	},

	money: function(user) {
		Source.stdinNumber('usermoney.csv', user, 'dollars');
		return '<i>Money:</i> ' + '<img src="http://cdn.bulbagarden.net/upload/8/8c/Pok%C3%A9monDollar.png" title="PokeDollar">' + user.dollars + '<br/>';
	},
	
	status: function(user) {
		Source.stdinString('source-data/status.csv', user, 'status');
		if (user.status === '') {
			user.status = 'This user hasn\'t set their status yet.';
		}
		return 'Status: "' + user.status + '"';
	},
	
	statusTime: function(user) {
		Source.stdinString('source-data/statusTime.csv', user, 'statusTime');
		return ' <font color="gray">' + user.statusTime + '</font>';
	}

};

var cmds = {

	profile: function(target, room, user, connection) {
		if (!this.canBroadcast()) return;

		var targetUser = this.targetUserOrSelf(target);
		
		if (!targetUser) return this.sendReply('User '+this.targetUsername+' not found.');
        
        var height = 85;
		
		Source.stdoutNumber('source-data/views.csv', user, 'views', 1);
		
		var display = Profile.avatar(targetUser, height) + Profile.name(targetUser) + '<hr>' + Profile.group(config, targetUser) + Profile.views(targetUser) + Profile.location(targetUser) + Profile.money(targetUser) + Profile.status(targetUser) + Profile.statusTime(targetUser);
		
		//fix these when done
		if (!targetUser.authenticated) {
			display = Profile.avatar(targetUser, height) + Profile.unregisteredName(targetUser) + '<hr>' + Profile.group(config, targetUser) + Profile.views(targetUser) + Profile.location(targetUser) + Profile.money(targetUser) + Profile.status(targetUser) + Profile.statusTime(targetUser);
			return this.sendReplyBox(display);
		} else if (typeof(targetUser.avatar) === typeof('')) { //checks for custom avatar
			display = Profile.customAvatar(targetUser, height) + Profile.name(targetUser) + '<hr>' + Profile.group(config, targetUser) + Profile.views(targetUser) + Profile.location(targetUser) + Profile.money(targetUser) + Profile.status(targetUser) + Profile.statusTime(targetUser);
			return this.sendReplyBox(display);
		} else {
			return this.sendReplyBox(display);
		}
	},
	
	setlocation: 'location',
	location: function(target, room, user){
		if (!target) return this.sendReply('|raw|Set your location for profile. Usage: /location <i>location information</i>');
		if (target.length > 10) return this.sendReply('Location is too long.');
		if (target.indexOf(',') >= 1) return this.sendReply('Unforunately, your location cannot contain a comma.');
		var escapeHTML = Source.escapeHTML(target);
		Source.stdoutString('source-data/location.csv', user, 'location', escapeHTML);
		this.sendReply('Your location is now: ' + target);
	},
	
	setstatus: 'status',
	status: function(target, room, user){
		if (!target) return this.sendReply('|raw|Set your status for profile. Usage: /status <i>status information</i>');
		if (target.length > 30) return this.sendReply('Location is too long.');
		if (target.indexOf(',') >= 1) return this.sendReply('Unforunately, your status cannot contain a comma.');
		var escapeHTML = Source.escapeHTML(target);
		Source.stdoutString('source-data/status.csv', user, 'status', escapeHTML);
		setTimeout(function(){
			var currentdate = new Date(); 
			var datetime = "Last Updated: " + (currentdate.getMonth()+1) + "/"+currentdate.getDate() + "/" + currentdate.getFullYear() + " @ "  + Source.formatAMPM(currentdate);
			Source.stdoutString('source-data/statusTime.csv', user, 'statusTime', datetime);
		},1000);
		this.sendReply('Your status is now: "' + target + '"');
		if('+%@&~'.indexOf(user.group) >= 0) {
			room.add('|raw|<b> * <font color="' + Color.hashColor(user.name) + '">' + user.name + '</font> set their status to: </b>"' + escapeHTML + '"');
		}
	},
	
	twitchchat: function(target, room, user) {
		if (!this.can('mute')) return;
		if (!target) return this.sendReply('|raw|Enables or disenables twitch chat. Usage: /twitchchat <i>on</i> or <i>off</i>');

		if (target.toLowerCase() === 'on') {
			user.twitchAccess = true;
			this.sendReply('Twitch chat activated');
		} else if (target.toLowerCase() === 'off') {
			user.twitchAccess = false;
			this.sendReply('Twitch chat deactivated');
		} else {
			return this.sendReply('|raw|/twitchchat <i>on</i> OR <i>off</i>');
		}
	},

	twitchreplace: function(target, room, user) {
		if (!this.can('twitchreplace')) return;
		if (!target) return this.sendReply('|raw|/twitchreplace <i>username</i>, <i>group</i> - Replaces the user\'s twitch group<br/>' + 'S - <img src="http://i.imgur.com/UEMY7N1.png" title="System Operator" height="14">System Operator<br/>' + 'E - <img src="http://i.imgur.com/mbdkl0w.png" title="Elite Moderator" height="14">Elite Moderator<br/>' + 'B - <img src="http://i.imgur.com/0IugM.png" title="Broadcaster" height="14">Broadcaster<br/>'+'C - <img src="http://i.imgur.com/Fqiyjil.png" title="Chat Moderator" height="14">Chat Moderator<br/>'+'T - <img src="http://i.imgur.com/kZyJVgU.png" title="Turbo User" height="14">Turbo User');

		if (target.indexOf(',') >= 0) {
			var parts = target.split(',');
			parts[0] = this.splitTarget(parts[0]);
			var targetUser = this.targetUser;
		}

		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}

		var data = fs.readFileSync('config/source-data/twitchgroups.csv','utf8')
			var group = parts[1].trim();
			var match = false;
			var status = '';
			var row = (''+data).split("\n");
			var line = '';
			for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var parts = row[i].split(",");
				var userid = toUserid(parts[0]);
				if (targetUser.userid == userid) {
					match = true;
					if (match === true) {
						line = line + row[i];
						break;
					}
				}
			}
			if (match === true) {
				var re = new RegExp(line,"g");
				fs.readFile('config/source-data/twitchgroups.csv', 'utf8', function (err,data) {
				if (err) {
					return console.log(err);
				}
				var result = data.replace(re, targetUser.userid+','+group);
				fs.writeFile('config/source-data/twitchgroups.csv', result, 'utf8', function (err) {
					if (err) return console.log(err);
				});
				});
			} else {
				var log = fs.createWriteStream('config/source-data/twitchgroups.csv', {'flags': 'a'});
				log.write("\n"+targetUser.userid+','+group);
			}

			this.sendReply(targetUser.name + '\'s twitch group rank was successfully replace with ' + group + '.');
			targetUser.send(user.name + ' has change your twitch group rank to ' + group + '.');
	},
	
};

for (var i in cmds) CommandParser.commands[i] = cmds[i];

exports.Source = Source;
exports.Profile = Profile;
exports.Twitch = Twitch;
exports.Color = Color;
