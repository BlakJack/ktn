				function setAvatar(data, self) {
				    var line = data.split('\n');
				    for (var u in line) {
				        var row = line[u].split(',');
				        if (row[0] == userid) {
				            self.avatar = row[1];
				            break;
				        }
				    }
				    return self.avatar;
				}

				function getAv(user) {
				    delete user.avatar;
				    if (config.customavatars[user.userid]) {
				        return config.customavatars[user.userid];
				    }
				    avatar = fs.readFile('config/avatars.csv', 'utf8', function read(err, data) {
				        if (err) data = '';
				        return setAvatar(data, user);
				    });
				    else {
				        var trainersprites = [1, 2, 101, 102, 169, 170, 265, 266];
				        var avatar = trainersprites[Math.floor(Math.random() * trainersprites.length)];
				        return avatar;
				    }
				}
				exports.edits = function () {
				    Users.User.prototype.avatar = getAv(this);
				    Users.User.prototype.numMessages = 0;
				    Users.User.prototype.warnCounters = 0;
				    Users.User.prototype.o3omessagetime = today.getMinutes();
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
				        if (this.isAway) {
				            return this.group + this.name + '(Away)';
				        }
				        if (this.hiding) {
				            return this.hidesymbol + this.name;
				        }
				        return this.group + this.name;
				    }
				    //global.money = require('./money/money.js').money();
				    config.serverId = 'Nova';
				};
