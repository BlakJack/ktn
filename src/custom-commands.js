 var cmds = {
 	pm: 'msg',
	whisper: 'msg',
	w: 'msg',
	msg: function(target, room, user) {
		if (!target) return this.parse('/help msg');
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!target) {
			this.sendReply('You forgot the comma.');
			return this.parse('/help msg');
		}
		if (!targetUser || !targetUser.connected) {
			if (targetUser && !targetUser.connected) {
				this.popupReply('User '+this.targetUsername+' is offline.');
			} else if (!target) {
				this.popupReply('User '+this.targetUsername+' not found. Did you forget a comma?');
			} else {
				this.popupReply('User '+this.targetUsername+' not found. Did you misspell their name?');
			}
			return this.parse('/help msg');
		}

		if (config.pmmodchat) {
			var userGroup = user.group;
			if (config.groupsranking.indexOf(userGroup) < config.groupsranking.indexOf(config.pmmodchat)) {
				var groupName = config.groups[config.pmmodchat].name;
				if (!groupName) groupName = config.pmmodchat;
				this.popupReply('Because moderated chat is set, you must be of rank ' + groupName +' or higher to PM users.');
				return false;
			}
		}
            
		if (user.locked && !targetUser.can('lock', user)) {
			return this.popupReply('You can only private message members of the moderation team (users marked by %, @, &, or ~) when locked.');
		}
		if (targetUser.locked && !user.can('lock', targetUser)) {
			return this.popupReply('This user is locked and cannot PM.');
		}
		if (targetUser.ignorePMs && !user.can('lock')) {
			if (!targetUser.can('lock')) {
				return this.popupReply('This user is blocking Private Messages right now.');
			} else if (targetUser.can('hotpatch')) {
				return this.popupReply('This admin is too busy to answer Private Messages right now. Please contact a different staff member.');
			}
		}
                if(user.twitchAccess){
                	user.twitchAccess = false;
                	user.tp = true;
                }
		target = this.canTalk(target, null);
		if (!target) return false;

		var message = '|pm|'+user.getIdentity()+'|'+targetUser.getIdentity()+'|'+target;
		user.send(message);
		if (targetUser !== user) targetUser.send(message);
		targetUser.lastPM = user.userid;
		user.lastPM = targetUser.userid;
		if(user.tp){
		user.twitchAccess = true;
		user.tp = false;
		}
	},
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
			'/ignore <em>username</em> - Ignores a user<br/><br/>'+
                        '<b>For more commands or help:</b> Do /sc with either of the following categories: <em>tour</em>, <em>poll</em>, <em>hangman</em>, <em>profile</em>. Example - /sc <em>tour</em>');
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
	dice: function(target, room, user) {
		if (!this.canBroadcast()) return;
		var d = target.indexOf("d");
		if (d != -1) {
			var num = parseInt(target.substring(0,d));
			faces = NaN;
			if (target.length > d) var faces = parseInt(target.substring(d + 1));
			if (isNaN(num)) num = 1;
			if (isNaN(faces)) return this.sendReply("The number of faces must be a valid integer.");
			if (faces < 1 || faces > 1000) return this.sendReply("The number of faces must be between 1 and 1000");
			if (num < 1 || num > 20) return this.sendReply("The number of dice must be between 1 and 20");
			var rolls = new Array();
			var total = 0;
			for (var i=0; i < num; i++) {
				rolls[i] = (Math.floor(faces * Math.random()) + 1);
				total += rolls[i];
			}
			return this.sendReplyBox('Random number ' + num + 'x(1 - ' + faces + '): ' + rolls.join(', ') + '<br />Total: ' + total);
		}
		if (target && isNaN(target) || target.length > 21) return this.sendReply('The max roll must be a number under 21 digits.');
		var maxRoll = (target)? target : 6;
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


        this.add('|raw|<b>' + target + '</b>');
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

modmsg: 'declaremod',
	moddeclare: 'declaremod',
	declaremod: function(target, room, user) {
		if (!target) return this.sendReply('/declaremod [message] - Also /moddeclare and /modmsg');
		if (!this.can('declare', null, room)) return false;

		if (!this.canTalk()) return;

		this.privateModCommand('|raw|<div class="broadcast-red"><b><font size=1><i>Private Auth (Driver +) declare from '+user.name+'<br /></i></font size>'+target+'</b></div>');

		this.logModCommand(user.name+' mod declared '+target);
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
    	if(!user.can('broadcast')) return false;
    	if(!target){
    		user.hiding = true;
    		return user.hidesymbol = ' ';
    		user.updateIdentity()
    	}
    	if(config.groupsranking.indexOf(user.group) < config.groupsranking.indexOf(target.substr(0,1))){
    		return this.sendReply('No hiding as a group higher than yours');
    	} else {
		user.hidesymbol = target.substr(0,1);
		user.hiding = true
		user.updateIdentity();
		return this.sendReply('You have hidden your staff symbol.');
    	}
	},
	
	show: function(target, room, user) {
		if (user.hiding) {
			user.hiding = false
			user.updateIdentity();
			return this.sendReply('You have revealed your staff symbol');
		}
		return false
	},
	
	
//TRAINER CARDS
  ifaze: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/latias.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/lugia.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/latios.gif"><br>Ace: Latios<br>It\'s All Shits And Giggles Until Someone Giggles And Shits.');
                
        },
	
	critch: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('Trainer: Critch55 2<br \>' +
                'Ace: Jirachi<br \>' +
                'Catchphrase: Picture me winning because it is gonna happen.<br \>' +
        '<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/jirachi.gif">')
    },
	
	darknessreigns: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('Trainer: DarknessReigns<br \>' +
                'Ace: Darkrai<br \>' +
                'Catchphrase: Let the darkness reign.<br \>' +
        '<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/darkrai.gif">')
    },
	
	pokepat: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('Trainer: Pokepat<br \>' +
                'Ace: Azumarill<br \>' +
                'Catchphrase: Never give up,You should always try.<br \>' +
        '<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/azumarill-2.gif">')
    },
	
	groan: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('Trainer: Groan<br \>' +
                'Ace: Ho-Oh<br \>' +
                'Catchphrase: You wanna fuck with me ill do it for ya :P.<br \>' +
        '<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/ho-oh.gif">')
    },
	
	familyboy: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('Trainer: FamilyBoy<br \>' +
                'Ace: Lucario<br \>' +
                'Catchphrase: You say fuck me i say how hard.<br \>' +
        '<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/lucario-mega.gif">')
    },
	
	nolan: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('Trainer: E4 Aknolan<br \>' +
                'Ace: Tyranitar<br \>' +
                'Catchphrase: You wont know what happened.<br \>' +
        '<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/tyranitar.gif">')
    },
	
	ryan: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('Trainer: E4. Ryan1<br \>' +
                'Ace: Volcarona<br \>' +
                'Catchphrase: Like after this you will get bugged.<br \>' +
        '<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/volcarona-3.gif">')
    },
	
	 rhexx: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/garchomp.gif"><br>Ace: Garchomp<br>Hope is merely an illusion, You cannot win');
                
        },
	
	kishz: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('Trainer: Champion Kishz<br \>' +
                'Ace: Keldeo<br \>' +
                'Catchphrase:  I\'m the infamous Vestral Champion. You know wut that means son? You\'re in for a hellova ride!<br \>' +
        '<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/keldeo.gif">')
    },
	
	lazerbeam: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('Trainer: LazerBeam<br \>' +
                'Ace: Garchomp<br \>' +
                'Catchphrase: ""The cool thing about the internet is that you can make up quotes"-George Washington".<br \>' +
        '<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/garchomp-3.gif">')
    },
	
	 rain: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/phione.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/lugia.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/suicune.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/palkia.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/manaphy.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/keldeo.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/kyogre.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/politoed.gif"><br>Ace: Rain<br>The Legends Of Water And Rain All Came Together To Make This Server.');
                
        },
		
		
	 cithor: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/dragonite-5.gif"><br>Ace: Dragonite<br>Expect The Unexpected.');
                
        },
		
		 checkm8t: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/magikarp-2.gif"><br>Ace: Magikarp<br> Hide behind your legends cuz magikarp is coming to get cha.');
                
        },
	
	     rez: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/terrakion.gif"><br>Ace: Terrakion<br> You may think you have countered me, but think again. What do you see, NOTHING!');
                
        },
		
		dialga: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/dialga.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/giratina.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/palkia.gif"><br>Space Time Distorted World<br>');
                
        },
		
		palkia: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/dialga.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/giratina.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/palkia.gif"><br>Space Time Distorted World<br>');
                
        },
		
		giratina: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/dialga.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/giratina.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/palkia.gif"><br>Space Time Distorted World<br>');
                
        },
		
		kyogre: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/groudon.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/rayquaza.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/kyogre.gif"><br>Drought, Air Lock, Drizzle<br>');
                
        },
		
		groudon: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/groudon.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/rayquaza.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/kyogre.gif"><br>Drought, Air Lock, Drizzle<br>');
                
        },
		
		rayquaza: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/groudon.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/rayquaza.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/kyogre.gif"><br>Drought, Air Lock, Drizzle<br>');
                
        },
		
		zekrom: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/reshiram.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/kyurem.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/zekrom.gif"><br>Turboblaze, Pressure, Teravolt<br>');
                
        },
		reshiram: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/reshiram.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/kyurem.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/zekrom.gif"><br>Turboblaze, Pressure, Teravolt<br>');
                
        },
		kyurem: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/reshiram.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/kyurem.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/zekrom.gif"><br>Turboblaze, Pressure, Teravolt<br>');
                
        },	
		hooh: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/lugia.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/ho-oh.gif"><br>Multiscale, Regenerator<br>');
                
        },
        lugia: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/lugia.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/ho-oh.gif"><br>Multiscale, Regenerator<br>');
                
        },
        regis: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/regirock.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/regice.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/registeel.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/regigigas.gif"><br><br>');
                
        },
		terrakion: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/virizion.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/terrakion.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/keldeo.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/cobalion.gif"><br><br>');
                
        },	
		keldeo: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/virizion.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/terrakion.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/keldeo.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/cobalion.gif"><br><br>');
                
        },	
		cobalion: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/virizion.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/terrakion.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/keldeo.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/cobalion.gif"><br><br>');
                
        },	
		
		zapdos: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/moltres.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/zapdos.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/articuno.gif"><br><br>');
                
        },	
		moltres: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/moltres.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/zapdos.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/articuno.gif"><br><br>');
                
        },	
		articuno: function(target, room,user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox('<center><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/moltres.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/zapdos.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/articuno.gif"><br><br>');
                
        },
        	aananth: function(target, room, user) {
	    	if (!this.canBroadcast()) return;
	    	this.sendReplyBox('<center><img src=http://play.pokemonshowdown.com/sprites/xyani/charizard-mega-x.gif width="150" length="150"><img src=http://i.imgur.com/afSRAAO.png width="250"><img src=http://play.pokemonshowdown.com/sprites/xyani/charizard-mega-y.gif img width="150" length="150"></center>');
	},
        stein: function(target, room, user) {
	    	if (!this.canBroadcast()) return;
	    	this.sendReplyBox('<center><img src="http://play.pokemonshowdown.com/sprites/xyani-shiny/suicune.gif" width="100" height="80"><img src="http://192.184.93.156:8000/avatars/prfssrstein.png" width="96" height="96"><img src="http://play.pokemonshowdown.com/sprites/xyani-shiny/latios.gif" width="100" height="66"><br><font color="lightblue"> Ace: Suicune </font><br> Are you ready to fight against fear itself? Will you cross beyond that door? Let your souls make the decision for you.');
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
		if (!target) return this.sendReply('|raw|/pmall <em>message</em> - Sends a PM to every user in a room.');
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
			this.add('|raw|-- <b><font color="#4F86F7">' + user.name +'</font color></b> is now away. '+ (target ? " (" + target + ")" : ""));
			user.isAway = true;
			user.updateIdentity()
		}
		else {
			return this.sendReply('You are already set as away, type /back if you are now back');
		}

		user.updateIdentity();
	},

	back: function(target, room, user, connection) {
		if (!this.can('lock')) return false;

		if (user.isAway) {
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
    
      emoticons: function(target, room, user) {
        if (!this.canBroadcast()) return;

        return this.sendReplyBox(':) - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ebf60cd72f7aa600-24x18.png">'+
		':O - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ae4e17f5b9624e2f-24x18.png">'+
		':( - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d570c4b3b8d8fc4d-24x18.png">'+
		';) - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-cfaf6eac72fe4de6-24x18.png">'+
		':P - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e838e5e34d9f240c-24x18.png">'+
		':/ - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-374120835234cb29-24x18.png">'+
		';P - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3407bf911ad2fd4a-24x18.png">'+
		'B) - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2cde79cfe74c6169-24x18.png">'+
		'O_o - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-8e128fa8dc1de29c-24x18.png">'+
		'R) - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-0536d670860bf733-24x18.png">'+
		':D - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-9f2ac5d4b53913d7-24x18.png">'+
		':z - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b9cbb6884788aa62-24x18.png">'+
		'<3 - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-577ade91d46d7edc-24x18.png">'+
		'BloodTrail - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f124d3a96eff228a-41x28.png">'+
		'BibleThump - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f6c13c7fc0a5c93d-36x30.png">'+
		'4Head - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-76292ac622b0fc38-20x30.png">'+
		'Kappa - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png">'+
		'PogChamp - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-60aa1af305e32d49-23x30.png">'+
		'ResidentSleeper - <img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1ddcc54d77fc4a61-28x28.png">');
    },

    twitchgroups: function(target, room, user) {
    	if (!this.canBroadcast()) return;

    	return this.sendReplyBox('<img src="http://i.imgur.com/UEMY7N1.png" title="System Operator" height="14"><b>System Operator</b> - These are the people who make the server tick. Say hello!<br/><img src="http://i.imgur.com/mbdkl0w.png" title="Elite Moderator" height="14"><b>Elite Moderator</b> - Our most experienced and trustworthy moderator squad who help us keep the server safe and fun.<br/><img src="http://i.imgur.com/0IugM.png" title="Broadcaster" height="14"><b>Broadcaster</b> - This icon denotes the person whose room you\'re currently in.<br/><img src="http://i.imgur.com/Fqiyjil.png" title="Chat Moderator" height="14"><b>Chat Moderator</b> - Specifically appointed chat moderators for the server.<br/><img src="http://i.imgur.com/kZyJVgU.png" title="Turbo User" height="14"><b>Turbo User</b> - These are the people who donated or contributed to the server.');
    },
    
    twitchchat: function(target, room, user) {
		if (!this.can('mute')) return;
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

		var data = fs.readFileSync('config/profile/twitchgroups.csv','utf8')
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
				fs.readFile('config/profile/twitchgroups.csv', 'utf8', function (err,data) {
				if (err) {
					return console.log(err);
				}
				var result = data.replace(re, targetUser.userid+','+group);
				fs.writeFile('config/profile/twitchgroups.csv', result, 'utf8', function (err) {
					if (err) return console.log(err);
				});
				});
			} else {
				var log = fs.createWriteStream('config/profile/twitchgroups.csv', {'flags': 'a'});
				log.write("\n"+targetUser.userid+','+group);
			}

			this.sendReply(targetUser.name + '\'s twitch group rank was successfully replace with ' + group + '.');
			targetUser.send(user.name + ' has change your twitch group rank to ' + group + '.');
	},
	reload: function(target, room, user) {
		if (!this.can('hotpatch')) return false;

		 try {
			var path = require("path"),
    		fs = require("fs");

		 	this.sendReply('Reloading command-parser.js...');
            CommandParser.uncacheTree(path.join(__dirname, '../', 'command-parser.js'));
            CommandParser = require(path.join(__dirname, '../', 'command-parser.js'));

            this.sendReply('Reloading sysop.js...');
            CommandParser.uncacheTree('./src/sysop.js');
            sysop = require('./sysop.js').sysopOperation();
            
            this.sendReply('Reloading hangman.js...');
            CommandParser.uncacheTree(path.join(__dirname, '../', 'hangman.js'));
            hangman = require(path.join(__dirname, '../', 'hangman.js')).hangman();

            this.sendReply('Reloading custom-commands.js...');
            CommandParser.uncacheTree('./src/custom-commands.js');
            customcommands = require('./custom-commands.js');

            this.sendReply('Reloading profile.js...');
            CommandParser.uncacheTree('./src/profile.js');
            profile = require('./profile.js');
            return this.sendReply('Chat commands have been reloaded.');
	    } catch (e) {
			return this.sendReply('Something failed while trying to reload: \n' + e.stack);
	    }
	},
	setcustomavatar: 'giveavatar',
	setcustomavi: 'giveavatar',
	giveavatar: function(target, room, user, connection) {
        if (!this.can('giveavatar')) return this.sendReply('/giveavatar - Access denied.');
        try { 
            request = require('request');
        } catch (e) {
            return this.sendReply('/giveavatar requires the request module. Please run "npm install request" before using this command.');
        }
        if (!target) return this.sendReply('Usage: /giveavatar [username], [image] - Gives [username] the image specified as their avatar. -' +
            'Images are required to be .PNG or .GIF. Requires: & ~');
        parts = target.split(',');
        if (!parts[0] || !parts[1]) return this.sendReply('Usage: /giveavatar [username], [image] - Gives [username] the image specified as their avatar. -<br />' +
            'Images are required to be .PNG or .GIF. Requires: & ~');
        targetUser = Users.get(parts[0].trim());
        filename = parts[1].trim();
        uri = filename;
        filename = targetUser.userid + filename.slice(filename.toLowerCase().length - 4,filename.length);
        filetype = filename.slice(filename.toLowerCase().length - 4,filename.length);
        if (filetype != '.png' && filetype != '.gif') {
            return this.sendReply('/giveavatar - Invalid image format. Images are required to be in either PNG or GIF format.');
        }
        if (!targetUser) return this.sendReply('User '+target+' not found.');
        self = this;
        var download = function(uri, filename, callback) {
            request.head(uri, function(err, res, body) {
                var r = request(uri).pipe(fs.createWriteStream('config/avatars/'+filename));
                r.on('close', callback);
            });
        };
        download(uri, filename, function(err, res, body){
            if (err) return console.log('/giveavatar error: '+err);
            fs.readFile('config/avatars.csv','utf8',function(err, data) {
                if (err) return self.sendReply('/giveavatar erred: '+e.stack);
                match = false;
                var row = (''+data).split("\n");
                var line = '';
                for (var i = row.length; i > -1; i--) {
                    if (!row[i]) continue;
                    var parts = row[i].split(",");
                    if (targetUser.userid == parts[0]) {
                        match = true;
                        line = line + row[i];
                        break;
                    }
                }
                if (match === true) {
                    var re = new RegExp(line,"g");
                    var result = data.replace(re, targetUser.userid+','+filename);
                    fs.writeFile('config/avatars.csv', result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                } else {
                    fs.appendFile('config/avatars.csv','\n'+targetUser.userid+','+filename);
                }
                self.sendReply(targetUser.name+' has received a custom avatar.');
                targetUser.avatar = filename;
                targetUser.sendTo(room, 'You have received a custom avatar from ' + user.name + '.');
                for (var u in Users.users) {
                    if (Users.users[u].group == "~" || Users.users[u].group == "&") {
                        Users.users[u].send('|pm|~Server|'+Users.users[u].group+Users.users[u].name+'|'+targetUser.name+' has received a custom avatar from '+user.name+'.');
                    }
                }
                Rooms.rooms.staff.add(targetUser.name+' has received a custom avatar from '+user.name+'.');
                if (filetype == '.gif' && targetUser.canAnimatedAvatar) targetUser.canAnimatedAvatar = false;
                if (filetype == '.png' && targetUser.canCustomAvatar) targetUser.canCustomAvatar = false;
            });
        });
	},
	plaindeclare: 'pdeclare',
	pdeclare: function(target, room, user) {
		if (!this.can('pdeclare')) return;
		if (!target) return this.sendReply('|raw|/pdeclare <i>message</i> - Displays a message without the declare background');

		this.add('|raw|'+target);
		this.logModCommand(user.name+' declared '+target);
	},

};
Object.merge(CommandParser.commands, cmds);
exports.cmds = cmds;
