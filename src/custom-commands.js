 var cmds = {

 	sh: 'servercommands',
	serverhelp: 'servercommands',
	sc: 'servercommands',
	servercommand: 'servercommands',
	servercommands: function (target, room, user) {
	    if (!this.canBroadcast()) return;

	    if (!target) {
	        return this.sendReplyBox(
	        '/profile - See user\'s profile with infomation about money, status, location, etc. <br/>' +
	        '/stafflist - List of staff members. <br/>' +
	        '/regdate <i>name</i> - Displays registration date of a user. <br/>' +
	        '/twitchchat <i>on/off</i> - Enables Twitch Chat integration. <br/>' +
	        '/twitchgroup - Shows info about twitch groups. <br/>' +
	        '/poke <i>name</i> - Pokes a users. <br/>' +
	        '/pickrandom <i>options...</i> - Randomly picks one from the options <br/>' +
	        '/emoticons - View list of emoticons <br/>' +
	        '/earnmoney - Find out more ways to earn money <br/>' +
	        '<br/> For more help use /serverhelp <i>hangman</i>'
	        );
	    }

	    if (target.toLowerCase() === 'hangman') {
	        return this.sendReplyBox('<font size = 2>A brief introduction to </font><font size = 3>Hangman:</font><br />' +
	            'The classic game, the basic idea of hangman is to guess the word that someone is thinking of before the man is "hanged." Players are given 8 guesses before this happens.<br />' +
	            'Games can be started by any of the rank Voice or higher, including Room Voice, Room Mod, and Room Owner.<br />' +
	            'The commands are:<br />' +
	            '<ul><li>/hangman <em>word</em>, <em>description</em> - Starts the game of hangman, with a specified word and a general category. Requires: + % @ & ~</li>' +
	            '<li>/guess <em>letter</em> - Guesses a letter.</li>' +
	            '<li>/guessword <em>word</em> - Guesses a word.</li>' +
	            '<li>/viewhangman - Shows the current status of hangman. Can be broadcasted.</li>' +
	            '<li>/word - Allows the person running hangman to view the word.</li>' +
	            '<li>/category <em>description</em> OR /topic <em>description</em> - Allows the person running hangman to changed the topic.</li>' +
	            '<li>/endhangman - Ends the game of hangman in the room. Requires: + % @ & ~</li></ul>');
	    }

	    return this.sendReply('Could not find' + target + '.');
	},

	emoticons: function (target, room, user) {
	    if (!this.canBroadcast()) return;
	    return this.sendReplyBox(
	    	'<b><u>Emoticons are case-sensitive:</b></u> <br/>' +
	    	'<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ebf60cd72f7aa600-24x18.png">:) ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ae4e17f5b9624e2f-24x18.png">:O ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d570c4b3b8d8fc4d-24x18.png">:( ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-cfaf6eac72fe4de6-24x18.png">;) ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e838e5e34d9f240c-24x18.png">:P ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-374120835234cb29-24x18.png">:/ ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3407bf911ad2fd4a-24x18.png">;P ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2cde79cfe74c6169-24x18.png">B) ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-8e128fa8dc1de29c-24x18.png">O_o ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-0536d670860bf733-24x18.png">R) ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-9f2ac5d4b53913d7-24x18.png">:D ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b9cbb6884788aa62-24x18.png">:z ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f124d3a96eff228a-41x28.png">BloodTrail ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f6c13c7fc0a5c93d-36x30.png">BibleThump ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-76292ac622b0fc38-20x30.png"> 4Head ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png">Kappa ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-60aa1af305e32d49-23x30.png">PogChamp ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1ddcc54d77fc4a61-28x28.png">ResidentSleeper ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3227-src-77d12eca2603dde0-28x28.png">crtNova ' + 
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3228-src-d4b613767d7259c4-28x28.png">crtSSoH ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2867-src-f02f9d40f66f0840-28x28.png">KappaHD ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5d019b356bd38360-24x24.png">SSSsss ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-680b6b3887ef0d17-21x28.png">SwiftRage ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce52b18fccf73b29-25x32.png">DansGame ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a624954918104fe-19x27.png">Kreygasm ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-c8a77ec0c49976d3-22x30.png">FailFish ' +
	        '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-10413-src-9e30fb4e8b42c21a-28x28.png">pikaQQ ' +
	        '<img src="http://e.deviantart.net/emoticons/n/ninja.gif">:ninja: ' +
	        '<img src="http://e.deviantart.net/emoticons/k/katana.gif">:katana: ' +
	        '<img src="http://e.deviantart.net/emoticons/n/ninjabattle.gif">:ninjabattle: ' +
	        '<img src="http://e.deviantart.net/emoticons/n/ninjameditate.gif">:meditate: ' +
	        '<img src="http://e.deviantart.net/emoticons/h/hump.gif">:hump:'
	        );
	},

 	reload: function(target, room, user) {
		if (!this.can('hotpatch')) return false;

		 try {
			var path = require("path"),
    		fs = require("fs");

		 	this.sendReply('Reloading command-parser.js...');
            CommandParser.uncacheTree(path.join(__dirname, '../', 'command-parser.js'));
            CommandParser = require(path.join(__dirname, '../', 'command-parser.js'));
            
            this.sendReply('Reloading hangman.js...');
            CommandParser.uncacheTree(path.join(__dirname, '../', 'hangman.js'));
            hangman = require(path.join(__dirname, '../', 'hangman.js')).hangman();
            
            this.sendReply('Reloading sysop.js...');
            CommandParser.uncacheTree('./src/sysop.js');
            sysop = require('./sysop.js').sysopOperation();
            
            this.sendReply('Reloading source.js...');
            CommandParser.uncacheTree('./src/source.js');
            source = require('./source.js');
            
            this.sendReply('Reloading edits.js...');
            CommandParser.uncacheTree('./src/edits.js');
            edits = require('./edits.js').edits();
            
            this.sendReply('Reloading custom-commands.js...');
            CommandParser.uncacheTree('./src/custom-commands.js');
            customcommands = require('./custom-commands.js');
            CommandParser.uncacheTree('./src/trainer-cards.js');
            trainercards = require('./trainer-cards.js');
            
            return this.sendReply('All files have been reloaded.');
	    } catch (e) {
			return this.sendReply('Something failed while trying to reload: \n' + e.stack);
	    }
	},
	
 	imgdeclare: function(target, room, user) {
		if (!target) return this.sendReply('|raw|Correct Syntax: /imgdeclare <i>insert img url here</i>');
		if (!this.can('imgdeclare')) return;

		if (!this.canTalk(target)) {
			return false;
		} else {
			this.add('|raw|'+'<img width="100%" src="'+target+'" >');
			this.logModCommand(user.name+' declared '+target);
		}
		this.logModCommand(user.name+' image declared '+target);
	},

	stafflist: function(target, room, user, connection) {
        var buffer = [];
        var admins = [];
        var leaders = [];
        var mods = [];
        var drivers = [];
        var voices = [];
        
        admins2 = ''; leaders2 = ''; mods2 = ''; drivers2 = ''; voices2 = ''; 
        stafflist = fs.readFileSync('config/usergroups.csv','utf8');
        stafflist = stafflist.split('\n');
        for (var u in stafflist) {
            line = stafflist[u].split(',');
			if (line[1] == '~') { 
                admins2 = admins2 +line[0]+',';
            } 
            if (line[1] == '&') { 
                leaders2 = leaders2 +line[0]+',';
            }
            if (line[1] == '@') { 
                mods2 = mods2 +line[0]+',';
            } 
            if (line[1] == '%') { 
                drivers2 = drivers2 +line[0]+',';
            } 
            if (line[1] == '+') { 
                voices2 = voices2 +line[0]+',';
             } 
        }
        admins2 = admins2.split(',');
        leaders2 = leaders2.split(',');
        mods2 = mods2.split(',');
        drivers2 = drivers2.split(',');
        voices2 = voices2.split(',');
        for (var u in admins2) {
            if (admins2[u] != '') admins.push(admins2[u]);
        }
        for (var u in leaders2) {
            if (leaders2[u] != '') leaders.push(leaders2[u]);
        }
        for (var u in mods2) {
            if (mods2[u] != '') mods.push(mods2[u]);
        }
        for (var u in drivers2) {
            if (drivers2[u] != '') drivers.push(drivers2[u]);
        }
        for (var u in voices2) {
            if (voices2[u] != '') voices.push(voices2[u]);
        }
        if (admins.length > 0) {
            admins = admins.join(', ');
        }
        if (leaders.length > 0) {
            leaders = leaders.join(', ');
        }
        if (mods.length > 0) {
            mods = mods.join(', ');
        }
        if (drivers.length > 0) {
            drivers = drivers.join(', ');
        }
        if (voices.length > 0) {
            voices = voices.join(', ');
        }
        connection.popup('Administrators: \n--------------------\n'+admins+'\n\nLeaders:\n-------------------- \n'+leaders+'\n\nModerators:\n-------------------- \n'+mods+'\n\nDrivers: \n--------------------\n'+drivers+'\n\nVoices:\n-------------------- \n'+voices);
    },

	masspm: 'pmall',
	pmall: function(target, room, user) {
		if (!target) return this.sendReply('|raw|/pmall <em>message</em> - Sends a PM to every user in a room.');
		if (!this.can('pmall')) return false;

		var pmName = '~Server PM [Do not reply]';

		for (var i in Users.users) {
			var message = '|pm|'+pmName+'|'+Users.users[i].getIdentity()+'|'+target;
			Users.users[i].send(message);
		}
	},
	
	kick: function(target, room, user){
		if (!this.can('declare')) return this.sendReply('/kick - Access Denied');
		if (!target) return this.sendReply('|raw|/kick <em>username</em> - kicks the user from the room.');
		var targetUser = Users.get(target);
		if (!targetUser) return this.sendReply('User '+target+' not found.');
		if (targetUser.group === '~') {
			return this.sendReply('Administrators can\'t be room kicked.');
		}
		if (!Rooms.rooms[room.id].users[targetUser.userid]) return this.sendReply(target+' is not in this room.');
		targetUser.popup('You have been kicked from room '+ room.title +' by '+user.name+'.');
		targetUser.leaveRoom(room);
		room.add('|raw|'+ targetUser.name + ' has been kicked from room by '+ user.name + '.');
		this.logModCommand(user.name+' kicked '+targetUser.name+' from ' +room.id);
	},

	frt: 'forcerenameto',
	forcerenameto: function(target, room, user) {
		if (!target) return this.parse('/help forcerenameto');
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}
		if (!target) {
			return this.sendReply('No new name was specified.');
		}
		if (!this.can('forcerenameto', targetUser)) return false;

		if (targetUser.userid === toUserid(this.targetUser)) {
			var entry = ''+targetUser.name+' was forcibly renamed to '+target+' by '+user.name+'.';
			this.privateModCommand('(' + entry + ')');
			targetUser.forceRename(target, undefined, true);
		} else {
			this.sendReply("User "+targetUser.name+" is no longer using that name.");
		}
	},

	regdate: function(target, room, user, connection) { 
		if (!this.canBroadcast()) return;
		if (!target || target == "." || target == "," || target == "'") return this.sendReply('/regdate - Please specify a valid username.');
		var username = target;
		target = target.replace(/\s+/g, '');
		var util = require("util"),
    	http = require("http");

		var options = {
    		host: "www.pokemonshowdown.com",
    		port: 80,
    		path: "/forum/~"+target
		};

		var content = "";   
		var self = this;
		var req = http.request(options, function(res) {

		    res.setEncoding("utf8");
		    res.on("data", function (chunk) {
	        content += chunk;
    		});
	    	res.on("end", function () {
			content = content.split("<em");
			if (content[1]) {
				content = content[1].split("</p>");
				if (content[0]) {
					content = content[0].split("</em>");
					if (content[1]) {
						regdate = content[1];
						data = username+' was registered on'+regdate+'.';
					}
				}
			}
			else {
				data = username+' is not registered.';
			}
			self.sendReplyBox(data);
			room.update();
		    });
		});
		req.end();
	},
	
	afk: function(target, room, user, connection) {
		if (!this.canTalk()) return false;
		if (!this.can('warn')) return false;
		if (!user.isAfk) {
			user.realName = user.name
			var afkName = user.name + ' - afk';
			delete Users.get(afkName);
			user.forceRename(afkName, undefined, true);
			this.send('|html|<b>'+user.realName+'</b> is now Away ('+target+').');
			user.isAfk = true;
			user.blockChallenges = true;
		}
		else {
			return this.sendReply('You are already AFK, type /unafk');
		}
		user.updateIdentity();
	},

	unafk: function(target, room, user, connection) {
		if (!user.isAfk) {
			return this.sendReply('You are not AFK.');
		}
		else {
			if (user.name.slice(-6) !== ' - afk') {
				user.isAfk = false;
				return this.sendReply('You are no longer AFK!');
			}
			var newName = user.realName;
			delete Users.get(newName);
			user.forceRename(newName, undefined, true);
			user.authenticated = true;
			this.send('|html|<b>' + newName + '</b> is back');
			user.isAfk = false;
			user.blockChallenges = false;
		}
		user.updateIdentity();
	},

    poke: function (target, room, user) {
        if (!target) return this.sendReply('/poke needs a target.');
        return this.parse('/me pokes ' + target + '.');
    },

	twitchgroups: function (target, room, user) {
	    if (!this.canBroadcast()) return;

	    return this.sendReplyBox('<img src="http://i.imgur.com/UEMY7N1.png" title="System Operator" height="14"><b>System Operator</b> - These are the people who make the server tick. Say hello!<br/><img src="http://i.imgur.com/mbdkl0w.png" title="Elite Moderator" height="14"><b>Elite Moderator</b> - Our most experienced and trustworthy moderator squad who help us keep the server safe and fun.<br/><img src="http://i.imgur.com/0IugM.png" title="Broadcaster" height="14"><b>Broadcaster</b> - This icon denotes the person whose room you\'re currently in.<br/><img src="http://i.imgur.com/Fqiyjil.png" title="Chat Moderator" height="14"><b>Chat Moderator</b> - Specifically appointed chat moderators for the server.<br/><img src="http://i.imgur.com/kZyJVgU.png" title="Turbo User" height="14"><b>Turbo User</b> - These are the people who donated or contributed to the server.');
	},

	twitchchat: function (target, room, user) {
	    if (!target) return this.sendReply('|raw|/twitchchat <i>on</i> OR <i>off</i> - Enables or disenables twitch chat');

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

	twitchreplace: function (target, room, user) {
	    if (!this.can('twitchreplace')) return;
	    if (!target) return this.sendReply('|raw|/twitchreplace <i>username</i>, <i>group</i> - Replaces the user\'s twitch group<br/>' + 'S - <img src="http://i.imgur.com/UEMY7N1.png" title="System Operator" height="14">System Operator<br/>' + 'E - <img src="http://i.imgur.com/mbdkl0w.png" title="Elite Moderator" height="14">Elite Moderator<br/>' + 'B - <img src="http://i.imgur.com/0IugM.png" title="Broadcaster" height="14">Broadcaster<br/>' + 'C - <img src="http://i.imgur.com/Fqiyjil.png" title="Chat Moderator" height="14">Chat Moderator<br/>' + 'T - <img src="http://i.imgur.com/kZyJVgU.png" title="Turbo User" height="14">Turbo User');

	    if (target.indexOf(',') >= 0) {
	        var parts = target.split(',');
	        parts[0] = this.splitTarget(parts[0]);
	        var targetUser = this.targetUser;
	    }

	    if (!targetUser) {
	        return this.sendReply('User ' + this.targetUsername + ' not found.');
	    }

	    var data = fs.readFileSync('config/profile/twitchgroups.csv', 'utf8')
	    var group = parts[1].trim();
	    var match = false;
	    var status = '';
	    var row = ('' + data).split("\n");
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
	        var re = new RegExp(line, "g");
	        fs.readFile('config/profile/twitchgroups.csv', 'utf8', function (err, data) {
	            if (err) {
	                return console.log(err);
	            }
	            var result = data.replace(re, targetUser.userid + ',' + group);
	            fs.writeFile('config/profile/twitchgroups.csv', result, 'utf8', function (err) {
	                if (err) return console.log(err);
	            });
	        });
	    } else {
	        var log = fs.createWriteStream('config/profile/twitchgroups.csv', {
	            'flags': 'a'
	        });
	        log.write("\n" + targetUser.userid + ',' + group);
	    }

	    this.sendReply(targetUser.name + '\'s twitch group rank was successfully replace with ' + group + '.');
	    targetUser.send(user.name + ' has change your twitch group rank to ' + group + '.');
	},   

	plaindeclare: 'pdeclare',
	pdeclare: function(target, room, user) {
		if (!this.can('pdeclare')) return;
		if (!target) return this.sendReply('|raw|/pdeclare <i>message</i> - Displays a message without the declare background');

		this.add('|raw|'+target);
	},

	ip: 'whois',
	getip: 'whois',
	rooms: 'whois',
	altcheck: 'whois',
	alt: 'whois',
	alts: 'whois',
	getalts: 'whois',
	whois: function (target, room, user) {
	    var targetUser = this.targetUserOrSelf(target);
	    if (!targetUser) {
	        return this.sendReply('User ' + this.targetUsername + ' not found.');
	    }

	    this.sendReply('User: ' + targetUser.name);
	    if (user.can('alts', targetUser)) {
	        var alts = targetUser.getAlts();
	        var output = '';
	        for (var i in targetUser.prevNames) {
	            if (output) output += ", ";
	            output += targetUser.prevNames[i];
	        }
	        if (output) this.sendReply('Previous names: ' + output);

	        for (var j = 0; j < alts.length; j++) {
	            var targetAlt = Users.get(alts[j]);
	            if (!targetAlt.named && !targetAlt.connected) continue;
	            if (targetAlt.group === '~' && user.group !== '~') continue;

	            this.sendReply('Alt: ' + targetAlt.name);
	            output = '';
	            for (var i in targetAlt.prevNames) {
	                if (output) output += ", ";
	                output += targetAlt.prevNames[i];
	            }
	            if (output) this.sendReply('Previous names: ' + output);
	        }
	    }
	    if (config.groups[targetUser.group] && config.groups[targetUser.group].name) {
	        this.sendReply('Group: ' + config.groups[targetUser.group].name + ' (' + targetUser.group + ')');
	    }
	    if (targetUser.isSysop) {
	        this.sendReply('(Pok\xE9mon Showdown System Operator)');
	    }
	    if (targetUser.sysOp) {
	        this.sendReply('(Nova System Operator)');
	    }

	    if (!targetUser.authenticated) {
	        this.sendReply('(Unregistered)');
	    }
	    if (!this.broadcasting && (user.can('ip', targetUser) || user === targetUser)) {
	        var ips = Object.keys(targetUser.ips);
	        this.sendReply('IP' + ((ips.length > 1) ? 's' : '') + ': ' + ips.join(', '));
	    }
	    var output = 'In rooms: ';
	    var first = true;
	    for (var i in targetUser.roomCount) {
	        if (i === 'global' || Rooms.get(i).isPrivate) continue;
	        if (!first) output += ' | ';
	        first = false;

	        output += '<a href="/' + i + '" room="' + i + '">' + i + '</a>';
	    }
	    this.sendReply('|raw|' + output);
	},

	groups: function (target, room, user) {
	    if (!this.canBroadcast()) return;
	    this.sendReplyBox('+ <b>Voice</b> - They can use ! commands like !groups, and talk during moderated chat<br />' +
	        '% <b>Driver</b> - The above, and they can mute. Global % can also lock users and check for alts<br />' +
	        '@ <b>Moderator</b> - The above, and they can ban users<br />' +
	        '&amp; <b>Leader</b> - The above, and they can promote to moderator and force ties<br />' +
	        '~ <b>Administrator</b> - They can do anything, like change what this message says<br />' +
	        '± <b>Nova Bot</b> - This is the server itself that auto moderates chats and tells jokes<br />' +
	        '# <b>Room Owner</b> - They are administrators of the room and can almost totally control it');
	},

	tourpoll: function (target, room, user) {
	    return this.parse('/poll Which tournament should we do?,' + tour.tiers);
	},


	unstuck: function (target, room, user) {

	    for (var i in Users.users) {
	        Users.users[i].chatQueue = null;
	        Users.users[i].chatQueueTimeout = null;
	    }
	},

	pickrandom: function (target, room, user) {
	    if (!target) return this.sendReply('/pickrandom [option 1], [option 2], ... - Randomly chooses one of the given options.');
	    if (!this.canBroadcast()) return;
	    var targets;
	    if (target.indexOf(',') === -1) {
	        targets = target.split(' ');
	    } else {
	        targets = target.split(',');
	    };
	    var result = Math.floor(Math.random() * targets.length);
	    return this.sendReplyBox(targets[result].trim());
	},

	roll: 'dice',
	dice: function (target, room, user) {
	    if (!this.canBroadcast()) return;
	    var d = target.indexOf("d");
	    if (d != -1) {
	        var num = parseInt(target.substring(0, d));
	        faces = NaN;
	        if (target.length > d) var faces = parseInt(target.substring(d + 1));
	        if (isNaN(num)) num = 1;
	        if (isNaN(faces)) return this.sendReply("The number of faces must be a valid integer.");
	        if (faces < 1 || faces > 1000) return this.sendReply("The number of faces must be between 1 and 1000");
	        if (num < 1 || num > 20) return this.sendReply("The number of dice must be between 1 and 20");
	        var rolls = new Array();
	        var total = 0;
	        for (var i = 0; i < num; i++) {
	            rolls[i] = (Math.floor(faces * Math.random()) + 1);
	            total += rolls[i];
	        }
	        return this.sendReplyBox('Random number ' + num + 'x(1 - ' + faces + '): ' + rolls.join(', ') + '<br />Total: ' + total);
	    }
	    if (target && isNaN(target) || target.length > 21) return this.sendReply('The max roll must be a number under 21 digits.');
	    var maxRoll = (target) ? target : 6;
	    var rand = Math.floor(maxRoll * Math.random()) + 1;
	    return this.sendReplyBox('Random number (1 - ' + maxRoll + '): ' + rand);
	},

	derpray: function (target, room, user) {
	    if (!target) return this.parse('/help ban');


	    target = this.splitTarget(target);
	    var targetUser = this.targetUser;
	    if (!targetUser) {
	        return this.sendReply('User ' + this.targetUsername + ' not found.');
	    }
	    if (target.length > 30) {
	        return this.sendReply('The reason is too long. It cannot exceed ' + 30 + ' characters.');
	    }
	    if (!this.can('ban', targetUser)) return false;


	    if (Users.checkBanned(targetUser.latestIp) && !target && !targetUser.connected) {
	        var problem = ' but was already derp rayed';
	        return this.privateModCommand('(' + targetUser.name + ' would be hit by ' + user.name + '\'s derp ray' + problem + '.)');
	    }


	    targetUser.popup(user.name + " has hit you with his/her derp ray." + (config.appealurl ? ("  If you feel that your banning was unjustified you can appeal the ban:\n" + config.appealurl) : "") + "\n\n" + target);


	    this.addModCommand("" + targetUser.name + " derp rayed by " + user.name + "." + (target ? " (" + target + ")" : ""), ' (' + targetUser.latestIp + ')');
	    var alts = targetUser.getAlts();
	    if (alts.length) {
	        this.addModCommand("" + targetUser.name + "'s alts were also derp rayed: " + alts.join(", "));
	        for (var i = 0; i < alts.length; ++i) {
	            this.add('|unlink|' + toId(alts[i]));
	        }
	    }


	    this.add('|unlink|' + targetUser.userid);
	    targetUser.ban();
	},

	gdeclarered: 'gdeclare',
	gdeclaregreen: 'gdeclare',
	gdeclare: function (target, room, user, connection, cmd) {
	    if (!target) return this.parse('/help gdeclare');
	    if (!this.can('lockdown')) return false;


	    var roomName = (room.isPrivate) ? 'a private room' : room.id;


	    if (cmd === 'gdeclare') {
	        for (var id in Rooms.rooms) {
	            if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
	        }
	    }
	    if (cmd === 'gdeclarered') {
	        for (var id in Rooms.rooms) {
	            if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-red"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
	        }
	    } else if (cmd === 'gdeclaregreen') {
	        for (var id in Rooms.rooms) {
	            if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-green"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
	        }
	    }
	    this.logEntry(user.name + ' used /gdeclare');
	},

	modmsg: 'declaremod',
	moddeclare: 'declaremod',
	declaremod: function (target, room, user) {
	    if (!target) return this.sendReply('/declaremod [message] - Also /moddeclare and /modmsg');
	    if (!this.can('declare', null, room)) return false;

	    if (!this.canTalk()) return;

	    this.privateModCommand('|raw|<div class="broadcast-red"><b><font size=1><i>Private Auth (Driver +) declare from ' + user.name + '<br /></i></font size>' + target + '</b></div>');

	    this.logModCommand(user.name + ' mod declared ' + target);
	},

	hide: function (target, room, user) {
	    if (!user.can('broadcast')) return false;
	    if (!target) {
	        user.hideo3o = true;
	        user.updateIdentity();
	    }
	    var eo3o = false;
	    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	    if (letters.indexOf(target.substr(0, 1).toLowerCase()) > -1) {
	        this.sendReply('No letters allowed in your hide symbol.')
	        eo3o = true;
	    }
	    if (eo3o) {
	        return false;
	    }
	    if (config.groupsranking.indexOf(user.group) < config.groupsranking.indexOf(target.substr(0, 1))) {
	        return this.sendReply('No hiding as a group higher than yours');
	    } else {
	        user.hidesymbol = target.substr(0, 1);
	        user.hiding = true
	        user.updateIdentity();
	        return this.sendReply('You have hidden your staff symbol.');
	    }
	},

	show: function (target, room, user) {
	    if (user.hiding) {
	        user.hiding = false
	        user.updateIdentity();
	        return this.sendReply('You have revealed your staff symbol');
	    }
	    return false
	},

	// @Override declare command becuase of the canTalk function prevents user from declaring
	declare: function(target, room, user) {
		if (!target) return this.parse('/help declare');
		if (!this.can('declare', null, room)) return false;
		this.add('|raw|<div class="broadcast-blue"><b>'+target+'</b></div>');
		this.logModCommand(user.name+' declared '+target);	
	},

	earnmoney: function (target, room, user) {
	    if (!this.canBroadcast()) return;
	    return this.sendReplyBox('Earn 5 money by making an account on github and following us: <br><a href="https://github.com/bandihub">bandi</a><br/><a href="https://github.com/CreaturePhil">CreaturePhil</a><br/><br/>Also earn another 5 money by starring our repository: <br/><a href="https://github.com/Nova-Team/Nova-Server">Nova-Server</a>');

	},
	
};


Object.merge(CommandParser.commands, cmds);
exports.cmds = cmds;
