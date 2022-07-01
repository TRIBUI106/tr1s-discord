var Discordie = require('discordie');
var config = require('./config.js');
const prefix = ">";
var client = new Discordie({
    autoReconnect  : true
});

client.connect({token: config.BotToken});
client.Dispatcher.on("GATEWAY_READY", e=>{
    console.log("Connected as : "+client.User.username);
})
client.Dispatcher.on("MESSAGE_CREATE", e=>{
    var content = e.message.content;
    if (e.message.author.bot) return;
    if (e.message.channel_id != config.channelId) return;
    if (content.indexOf(prefix) == 0){
        const args = content.slice(prefix.length).trim().split(/ +/g);
        const command = args[0]
        var playerId = parseInt(args[1]);
        var author = e.message.author.username;
        var playerName = GetPlayerName(playerId);
        switch (command){
            case 'revive':
                if (args[1] == undefined){
                    e.message.channel.sendMessage("```Invalid command \nUse >revive [id]```");
                    //e.message.channel.sendMessage(e.message.author.username);
                }else{
                    if (playerName == null){
                        e.message.channel.sendMessage("```This player is offline```");

                    }else{
                        emit('discord:server:command', author, command, playerId);
                        e.message.channel.sendMessage(`\`\`\`Revive player ${playerName}\`\`\``);
                    }
                }
                break;
            case 'slay':
                if (args[1] == undefined){
                    e.message.channel.sendMessage("```Unvalid command \nUse >slay [id]```");
                }else{
                    if (playerName == null){
                        e.message.channel.sendMessage("```This player is offline```");

                    }else{
                        emit('discord:server:command', author, command, playerId);
                        e.message.channel.sendMessage(`\`\`\`Slay player ${playerName}\`\`\``);
                    }                    
                }
                break;
            case 'tele':
                if (args[1] == undefined || args[2] == undefined || args[3] == undefined|| args[4] == undefined){
                    e.message.channel.sendMessage("```Invalid command \nUse >tele [id] [x] [y] [z]```");
                }else{
                    if (playerName == null){
                        e.message.channel.sendMessage("```This player is offline```");

                    }else{
                        emit('discord:server:command', author, command, playerId, {x:args[2], y:args[3], z:args[4]});
                        e.message.channel.sendMessage(`\`\`\`Teleport player ${playerName} to coords : x = ${args[2]}, y = ${args[3]}, z = ${args[4]}\`\`\``);
                    }
                }
                break;
            case 'teleto':
                if (args[1] == undefined){
                    e.message.channel.sendMessage("```Invalid command \nUse >teleto [id] [location]```");
                }else{
                    if (playerName == null){
                        e.message.channel.sendMessage("```This player is offline```");

                    }else{
                        emit('discord:server:checkPosName', args[2], function(result){
                            if (result == true){
                                emit('discord:server:command', author, command, playerId, args[2]);
                                e.message.channel.sendMessage(`\`\`\`Teleport player ${playerName} to ${args[2]}\`\`\``);
                            }else{
                                e.message.channel.sendMessage(`\`\`\`Location ${args[2]} not availble\`\`\``);
                                e.message.channel.sendMessage(`\`\`\`Location list : \`\`\``);
                                result.forEach(element => { 
                                    e.message.channel.sendMessage(`\`\`\`${element}\`\`\``);
                                }); 
                            }
                        })
                        
                    }  
                }
                break;
            case 'kick':
                if(args[1] == undefined){
                    e.message.channel.sendMessage("```Invalid command \nUse >kick [id]")
                }else{
                    if (playerName == null){
                        e.message.channel.sendMessage("```This player is offline```");

                    }else{
                        emit('discord:server:command', author, command, playerId);
                        e.message.channel.sendMessage(`\`\`\`Kicked player ${playerName} \`\`\``);
                    }
                }
                break;
            default:
        }
    }
});

