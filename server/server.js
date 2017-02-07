var http = require('http');
var md5 = require('MD5');

httpServer = http.createServer(function(req, res){
    console.log('Un utilisateur a affiché la page');
});

httpServer.listen(2412);
var io = require('socket.io').listen(httpServer);
var users = {};
var messages = [];
var history = 5; // max de message dans lhistorique
var me;

io.sockets.on('connection', function(socket){
    var me = false;
    console.log('Nouveau utilisateur');
    
    for(var k in users){
        socket.emit('newUsr', users[k]);
    }
    for(var k in messages){
        socket.emit('newMsg', messages[k]);
    }
    
    /***
    ** Je me connecte
    **/
    socket.on('login', function(user){
        console.log(user);
        me = user;
        console.log(me);
        me.id = user.mail.replace('@', '-').replace('.', '-');
        me.avatar = 'https://gravatar.com/avatar/'+ md5(user.mail) +'?s=50';
        //socket.broadcast.emit('newUsr'); // envoyer seulement à tous les autres
        socket.emit('logged');
        users[me.id] = me;
        io.sockets.emit('newUsr', me); // envoyer à tous les autres et la page responsable aussi
    });
    
    /***
    ** On recoit un message
    **/
    socket.on('newMsg', function(message){
        console.log(me);
        message.user = me;
        date = new Date();
        message.h = date.getHours();
        message.m = date.getMinutes();
        messages.push(message);
        if(messages.length > history){
            messages.shift();
        }
        console.log(messages);
        io.sockets.emit('newMsg', message);
    });
    
    /***
    ** Je quitte le chat
    **/
    socket.on('disconnect', function(){
        if(!me){
            return false;
        }
        delete users[me.id];
        io.sockets.emit('disUsr', me);
    });
});