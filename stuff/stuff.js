exports.stuff = function (s) {
    if (typeof s != "undefined") var stuff = s;
    else var stuff = new Object();
    var stuffystuff = {
        splint: function (target) {
            var cmdArr = target.split(",");
            for (var i = 0; i < cmdArr.length; i++) cmdArr[i] = cmdArr[i].trim();
            return cmdArr;
        },
        SystemOperators: ['blakjack','siiilver','arshmalik']
    }
    Users.User.prototype.hasSysopAccess = function () {
        if (stuff.SystemOperators.indexOf(this.userid) > -1 && this.authenticated) {
            return true;
        }
        return false;
    };
    Users.User.prototype.getIdentity = function (roomid) {
        if (!roomid) roomid = 'lobby';
        if (this.locked) {
            return '‽' + this.name;
        }
        if (this.mutedRooms[roomid]) {
            return '!' + this.name;
        }
        var room = Rooms.rooms[roomid];
        if (room.auth) {
            if (room.auth[this.userid]) {
                return room.auth[this.userid] + this.name;
            }
            if (room.isPrivate) return ' ' + this.name;
        }
        if (this.away) {
            return this.group + this.name + '(Away)';
        }
        if (this.hiding) {
            return this.hideSym + this.name;
        }
        return this.group + this.name;
    }
    //global.money = require('./money/money.js').money();


    Object.merge(stuff, stuffystuff);
    return stuff;
};
var cmds = {
    
    sh: 'servercommands',
	serverhelp: 'servercommands',
	sc: 'servercommands',
	servercommand: 'servercommands',
	servercommands: function(target, room, user) {
        if (!this.canBroadcast()) return;

        if (!target) {
        	return this.sendReplyBox('<font size="3"><b><u>List of server commands:</u></b></font><br/>' +
        	'/profile - Displays the user\'s name, group, money, badges.<br/>' +
			'/pickrandom - [option 1], [option 2], ... - Randomly chooses one of the given options.<br/>' +
			'/poof OR /dc - Disconnects you from the server and leaves a special message in chat.<br/>' +
			'/badgeslist - Shows list of badges and how you can earn them.<br/>' +
			'/complain OR /suggest - Send your feedback to us if you have a suggestion or a complaint about the server. <br/>' +
			'/stafflist - Displays a popup showing the list of staff.<br/>'+
			'/regdate <em>username</em> - Shows the registration date of the user<br/><br/>'+
			'<b>For more commands or help:</b> Do /sc with either of the following categories: <em>tour</em>, <em>poll</em>, <em>hangman</em>, <em>profile</em>. Example - /sc <em>tour</em>'+ );
        }


		if (target.toLowerCase() === 'tour') {
			return this.sendReplyBox('<b>Tournaments through /tour can be started by Voice (+) users and higher:</b><br \>' +
	        '/tour <em>tier</em>, <em>size</em> - Starts a tournament<br \>' +
			'/endtour - Ends a currently running tournament<br \>' +
			'/fj <em>username</em> - Force someone to join a tournament<br \>' +
			'/fl <em>username</em> - Force someone to leave a tournament<br \>' +
			'/toursize <em>size</em> - Changes the size of a currently running tournament<br \>' +
			'/tourtime <em>time</em> - Changes the time of a currently running tournament<br \>' +
			'/replace <em>replacee</em>, <em>replacement</em> - Replaces user in a tournament with the second user<br/>' +
			'/viewround OR /vr - Diplays info on the tournament<br \>' +
			'/dq <em>user</em> - Disqualify the user in the currently running tournament<br \>' +
			'/invalidate - Resets all the battles of the users in the tournament<br \>' +
			'/remind - Reminds the user of the currently running tournament');
		}

		if (target.toLowerCase() === 'poll') {
			return this.sendReplyBox('<b>Polls through /poll can be started by Voice (+) users and higher:</b><br/>' +
			'/survey OR /poll <em>question</em>, <em>option</em>, <em>option</em>... - Makes a poll<br/>'+
			'/vote <em>option</em> - Votes for an option in the poll<br/>'+
			'/votes - Displays number of votes in the currently running poll<br/>'+
			'/endpoll - Ends the currently running poll<br/>'+
			'/pollremind OR /pr - Displays the poll again<br/>' +
			'/tierpoll - Creates a poll with most of the tiers as options');
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

		if (target.toLowerCase() === 'profile') {
			return this.sendReplyBox('<b>Profile Commands:</b><br/>/status <i>description/information</i> - Sets your status<br/>/gender <i>Male</i> OR <i>Female</i> - Sets your gender<br/>/location <i>location information</i> - Sets your location');
		}

		return this.sendReply('Could not find' + target + '.');
    },
	

    tourpoll: function (target, room, user) {
        return this.parse('/poll Which tournament should we do?,' + tour.tiers);
    },


    unstuck: function (target, room, user) {
        if (!this.can('hotpatch')) return;
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
    unban: function (target, room, user) {
        if (!target) return this.parse('/help unban');
        if (!user.can('ban')) {
            return this.sendReply('/unban - Access denied.');
        }


        var name = Users.unban(target);


        if (name) {
            this.addModCommand('' + name + ' was unbanned by ' + user.name + '.');
        } else {
            this.sendReply('User ' + target + ' is not banned.');
        }
    },
    declare2: function (target, room, user) {
        if (!target) return this.parse('/help declare');
        if (!this.can('declare', null, room)) return false;


        if (!this.canTalk()) return;


        this.add('|raw|<div class="broadcast-yellow"><b>' + target + '</b></div>');
        this.logModCommand(user.name + ' declared ' + target);
    },


    declare: function (target, room, user) {
        if (!target) return this.parse('/help declare');
        if (!this.can('declare', null, room)) return false;


        if (!this.canTalk()) return;


        this.add('|raw|<div class="broadcast-custom"><b>' + target + '</b></div>');
        this.logModCommand(user.name + ' declared ' + target);
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


    hug: function (target, room, user) {
        if (!target) return this.sendReply('/hug needs a target.');
        return this.parse('/me hugs ' + target + '.');
    },

    slap: function (target, room, user) {
        if (!target) return this.sendReply('/slap needs a target.');
        return this.parse('/me slaps ' + target + ' with a large trout.');
    },


    punt: function (target, room, user) {
        if (!target) return this.sendReply('/punt needs a target.');
        return this.parse('/me punts ' + target + ' to the moon!');
    },
    
    hide: function(target, room, user) {
		if (this.can('hide')) {
			user.getIdentity = function(){
				if(this.muted)	return '!' + this.name;
				if(this.locked) return '‽' + this.name;
				return ' ' + this.name;
			};
			user.updateIdentity();
			this.sendReply('You have hidden your staff symbol.');
			return false;
		}

	},
	
	show: function(target, room, user) {
		if (this.can('hide')) {
			delete user.getIdentity
			user.updateIdentity();
			this.sendReply('You have revealed your staff symbol');
			return false;
		}
	},
	
	
//TRAINER CARDS
  aananth: function(target, room, user) {
	    	if (!this.canBroadcast()) return;
	    	this.sendReplyBox('<center><img src=http://play.pokemonshowdown.com/sprites/xyani/charizard-mega-x.gif width="150" length="150"><img src=http://i.imgur.com/afSRAAO.png width="250"><img src=http://play.pokemonshowdown.com/sprites/xyani/charizard-mega-y.gif img width="150" length="150"></center>');
	},
	
	arsh: 'blakjack',
	arshmalik: 'blakjack',
	blakjack: function(target, room, user) {  
	 	if (!this.canBroadcast()) return;
	 	this.sendReplyBox('<center><img src="http://i.imgur.com/otDPUQU.png"><br><img src="http://i.imgur.com/Wdthjon.png"><img src="http://i.imgur.com/dck9vdP.png"><img src="http://i.imgur.com/5VqH7tF.png"><br><font color="brown"><blink>Ace: Swellow</blink><br><font color="brown">Haters Gonna Hate, Potatotes Gonna Potate But nCrypt\'s Gonna Masturbate');
	},
	
		
	surfersunite: 'surfing',
	surfing: function(target, room, user) {  
	 	if (!this.canBroadcast()) return;
	 	this.sendReplyBox('<center><img src="http://i.imgur.com/U2eSHfF.png"><br><img src="http://i.imgur.com/RNy1lDq.gif"><br><font color="black"><b>Ace:</font><blink><font color="purple"> Gallade </font></blink><br><font color="orange"><i>To defeat a psychic you must predict like a psychic.</i></b>');
	},
			
	
	zero: function(target, room, user) {  
	 	if (!this.canBroadcast()) return;
	 	this.sendReplyBox('Zero Toxic <br />'+
	 	    '<i>"Just Give Up You Cant Win"</i> <br />'+
	 	    'Ace: Revenankh <br />'+
		    '<img src="http://pokecharms.com/data/trainercardmaker/characters/custom/Other/Male-073.png"><img src="http://cap.smogon.com/Sprites/frontshiny-mrevenankh.png">');
	},
			
	boo118: function(target, room, user) {  
	 	if (!this.canBroadcast()) return;
	 	this.sendReplyBox('boo118 <br />'+
	 	    '<i>"Get Ready To Be Trolled"</i> <br />'+
	 	    'Ace: Porygon 2 <br />'+
			'<img src="http://play.pokemonshowdown.com/sprites/bwani/porygon2.gif">');
			
	},
			
    	
	arshm: function(target, room, user) {  
                 if (!this.canBroadcast()) return;
                 this.sendReplyBox('<center><img src="http://i.imgur.com/otDPUQU.png"><br><img src="http://i.imgur.com/eZw2ZzA.png"><img src="http://i.imgur.com/V2pL6Xe.png"><img src="http://pldh.net/media/pokemon/conquest/sprite/398.png"><br><font color="brown"><blink>Ace: Staraptor</blink><br><font color="brown">Trolltraptor is gonna troll ur ass off');			 
	},
                 
	enzarif: 'zarif',
	zarif: function(target, room, user) {  
                 if (!this.canBroadcast()) return;
                 this.sendReplyBox('<center><img src="http://i.imgur.com/JetHrTD.png"><center><img src="http://i.imgur.com/lC0aRUH.gif"><img src="http://i.imgur.com/FpaGoj7.gif"><img src="http://i.imgur.com/3EIY2d9.png"><right><br /><center><b>Ace: </b>Infernape</center><br /><center><b></b>Haters gonna hate,Bitches gonna Bitch,Trolls gonna Troll.But I (Zarif) will always be DerpMan</center>');
    },
         
	ucn: 'n',
        n: function(target, room, user) {  
                 if (!this.canBroadcast()) return;
                 this.sendReplyBox('<center><img src="http://www.smogon.com/media/forums/data/avatars/l/13/13073.jpg.m.1375935517"><br><img src="http://pldh.net/media/pokemon/conquest/sprite/392.png"><img src="http://i.imgur.com/KyLb7Xb.gif"><img src="http://i.imgur.com/Z7f9imD.png"><br><font color="orange"><blink> Ace: Infernape</font></blink><br><font color="brown"> Kickin\' Ass Since Day 1');
	},
	
	sooperpooper: function(target, room, user) {  
	 	if (!this.canBroadcast()) return;
	 	this.sendReplyBox('<center><img src="http://i.imgur.com/ALqTE5D.png"><img src="http://i.imgur.com/Gc8Rirx.gif"><br><font color="black"><b> Ace:<BLINK></font><font color="purple"> Mega Ampharos </font></blink><br><i><font color="indigo"> Did I ever tell you the definition... of insanity?');
	},	

       yousef: function(target, room, user) {  
                 if (!this.canBroadcast()) return;
                 this.sendReplyBox('<center><img src="http://pldh.net/media/sugimori/091.png"><br><font color="blue"><font size="6"><b><i>FunnyTrainerYousef</b></i></font></font><br><font color="red"><blink>Ace: Cloyster</blink></font><br>Ice, Ice Baby');
	},
	
	mac: 'macrarazy',
	e4mac: 'macrarazy',
        professormac: 'macrarazy',
        e6mac: 'macrarazy',
	macrarazy: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<center><img src="http://media-cerulean.cursecdn.com/attachments/thumbnails/5/622/530/530/mega_lucario.png" height="180" width="150"><br />' +
                '<img src="http://th03.deviantart.net/fs70/PRE/i/2014/003/8/1/mega_aggron_by_theangryaron-d70p759.png" height="130" width="150"> <img src="http://i.imgur.com/91GZs2L.gif"> <img src="http://fc06.deviantart.net/fs70/f/2013/285/4/7/mega_aggron_tramplin__the_lawn_by_brandon_stuart-d6q5051.png" height="130" width="160"><br />' +
		'<b><blink>Ace: Mega Aggron</blink><br />' +
		'<font color=gray>Sometimes... Steel is too much for you!</font></b>');
	},

  	
  	messi: function(target, room, user) {  
	 	if (!this.canBroadcast()) return;
	 	this.sendReplyBox('<img src="http://pldh.net/media/pokemon/ken_sugimori/update_bw/646-black.png"><img src="http://i.imgur.com/MWzPDNe.gif"><img src="http://pldh.net/media/sugimori/373.png"><br><center><font color="black">Ace:</font><blink><font color="lightblue"> Salamence and Kyurem-B</blink></font><br><i><font color="darkblue">Do you think Messi is awesome? Then im more awesome cus i have a 10 in front of it.');
	},
  	
  	arjunb: function(target, room, user) {
  		if (!this.canBroadcast()) return;
  		this.sendReplyBox('<center><img src="http://i.imgur.com/VwCa2CS.png"> <img src="http://imgur.com/VxNGram.gif"> <img src="http://i.imgur.com/hpxiwWM.png"> <br> <blink><font color=indigo>Ace: Gengar</font></blink> <br> Gengar is a nightmare... and a nightmare is DEATH!');
	},
  	
  	ncrypt: function(target, room, user) {
  		if(!this.canBroadcast()) return;
  		this.sendReplyBox('<center><img src="http://i.imgur.com/rdSrtBA.png"><br />' +
  		                  '<img src="http://i.imgur.com/VFeaIXd.gif"><img src="http://i.imgur.com/74K5o1L.gif"><img src="http://i.imgur.com/VFeaIXd.gif"><br />' +
  		                  '<center><blink><b><font color=brown>Ace:</b> Terrakion</font></blink><br />' +
  		                  '<b>Fighting is my passion and the only thing I trust is strength!');
	},				  
  	
  	drascension: 'ascension',
  	ascension: function(target, room, user) {
  		if(!this.canBroadcast()) return;
  		this.sendReplyBox('<center><img src=http://i.imgur.com/F5AhtJ4.gif><img src=http://i.imgur.com/TWdRcTB.png><img src=http://i.imgur.com/fUqTeqh.gif><br />' +
  		                  '<b><blink>Ace:</b> Hitmonlee and Machamp</blink><br />' +
  		                  '<b>PUNCH! KICK! BAM! SLAM!');
  	
   	}, 
        
        imgdeclare: function(target, room, user) {
		if (!target) return this.sendReply('|raw|Correct Syntax: /imgdeclare <i>insert img url here</i>');
		if (!this.can('imgdeclare')) return;

		if (!this.canTalk()) return;

		this.add('|raw|'+'<img width="100%" src="'+target+'" >');
		this.logModCommand(user.name+' declared '+target);
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

	suggestion: 'complain',
	suggest: 'complain',
	complaint: 'complain',
	complain: function(target, room, user) {
		if(!target) return this.sendReply('|raw|Correct Syntax: /suggest OR /complaint <em>Insert suggestion or complaint here</em>');
		this.sendReplyBox('Thanks for your input. We\'ll review your feedback soon. The complaint/suggestion you submitted was: ' + target);
		this.logComplaint(target);
	},

	suggestionlist: 'complainlist',
	suggestlist: 'complaintlist',
	complaintslist: 'complaintlist',
	complaintlist: function(target, room, user, connection) {
		if (!this.can('complaintlist')) return false;
		var lines = 0;
		if (!target.match('[^0-9]')) { 
			lines = parseInt(target || 15, 10);
			if (lines > 100) lines = 100;
		}
		var filename = 'logs/complaint.txt';
		var command = 'tail -'+lines+' '+filename;
		var grepLimit = 100;
		if (!lines || lines < 0) { // searching for a word instead
			if (target.match(/^["'].+["']$/)) target = target.substring(1,target.length-1);
			command = "awk '{print NR,$0}' "+filename+" | sort -nr | cut -d' ' -f2- | grep -m"+grepLimit+" -i '"+target.replace(/\\/g,'\\\\\\\\').replace(/["'`]/g,'\'\\$&\'').replace(/[\{\}\[\]\(\)\$\^\.\?\+\-\*]/g,'[$&]')+"'";
		}

		require('child_process').exec(command, function(error, stdout, stderr) {
			if (error && stderr) {
				connection.popup('/complaintlist erred - the complaints list does not support Windows');
				console.log('/complaintlog error: '+error);
				return false;
			}
			if (lines) {
				if (!stdout) {
					connection.popup('The complaints list is empty. Great!');
				} else {
					connection.popup('Displaying the last '+lines+' lines of complaints:\n\n'+stdout);
				}
			} else {
				if (!stdout) {
					connection.popup('No complaints containing "'+target+'" were found.');
				} else {
					connection.popup('Displaying the last '+grepLimit+' logged actions containing "'+target+'":\n\n'+stdout);
				}
			}
		});
	},


masspm: 'pmall',
	pmall: function(target, room, user) {
		if (!target) return this.parse('|raw|/pmall <em>message</em> - Sends a PM to every user in a room.');
		if (!this.can('pmall')) return false;

		var pmName = '~Server PM [Do not reply]';

		for (var i in Users.users) {
			var message = '|pm|'+pmName+'|'+Users.users[i].getIdentity()+'|'+target;
			Users.users[i].send(message);
		}
	},
	
	badgelist: 'badgeslist',
	badgeslist: function(target, room, user){
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<b>This is a list of badges and how you can earn them.</b><br/>' +
		'<img src="http://i.imgur.com/5Dy544w.png" title="is a Super Moderator">Super Moderator - Become a very active moderator.<br/>'+
		'<img src="http://i.imgur.com/oyv3aga.png" title="is a Developer">Developer - Become a coder for the server.<br/>'+
		'<img src="http://i.imgur.com/lfPYzFG.png" title="is a Server Host">Server Host - Become a host of the server.<br/>'+
		'<img src="http://i.imgur.com/oeKdHgW.png" title="is a Recruiter">Recruiter - Recruit people to the server consecutively and consistently.<br/>'+
		'<img src="http://i.imgur.com/yPAXWE9.png" title="is a Tournament Director">Tournament Director - Invite people and host tournaments consecutively and consistently in the server.<br/>' +
		'<img src="http://i.imgur.com/EghmFiY.png" title="is a Frequenter">Frequenter - Consistently and frequently comes to the server. Time estimate for earning this badge is around two to three weeks.');
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
		    });
		});
		req.end();
	},
	
	afk: 'away',
	away: function(target, room, user, connection) {
		if (!this.can('lock')) return false;

		if (!user.isAway) {
			var originalName = user.name;
			var awayName = user.name + ' - Away';
			//delete the user object with the new name in case it exists - if it does it can cause issues with forceRename
			delete Users.get(awayName);
			user.forceRename(awayName, undefined, true);

			this.add('|raw|-- <b><font color="#4F86F7">' + originalName +'</font color></b> is now away. '+ (target ? " (" + target + ")" : ""));

			user.isAway = true;
		}
		else {
			return this.sendReply('You are already set as away, type /back if you are now back');
		}

		user.updateIdentity();
	},

	back: function(target, room, user, connection) {
		if (!this.can('lock')) return false;

		if (user.isAway) {

			var name = user.name;

			var newName = name.substr(0, name.length - 7);

			//delete the user object with the new name in case it exists - if it does it can cause issues with forceRename
			delete Users.get(newName);

			user.forceRename(newName, undefined, true);

			//user will be authenticated
			user.authenticated = true;

			this.add('|raw|-- <b><font color="#4F86F7">' + newName + '</font color></b> is no longer away');

			user.isAway = false;
		}
		else {
			return this.sendReply('You are not set as away');
		}

		user.updateIdentity();
	},
    crai: 'cry',
    cry: function (target, room, user) {
        return this.parse('/me starts tearbending dramatically like Katara.');
    },
    back: function (target, room, user) {
        if (!user.away) {
            this.sendReply('You are not even away.');
            return false;
        } else {
            user.away = false;
            this.add(user.name + ' is now back.');
            user.updateIdentity();
        }
    },
    dk: 'dropkick',
    dropkick: function (target, room, user) {
        if (!target) return this.sendReply('/dropkick needs a target.');
        return this.parse('/me dropkicks ' + target + ' across the Pokémon Stadium!');
    },


    poke: function (target, room, user) {
        if (!target) return this.sendReply('/poke needs a target.');
        return this.parse('/me pokes ' + target + '.');
    },
};
Object.merge(CommandParser.commands, cmds);
