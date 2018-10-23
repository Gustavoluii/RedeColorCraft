console.log("Conectando...")
const Discord = require('discord.js');
const bot = new Discord.Client({fetchAllMembers: true});

const PREFIX = "!";

bot.login(process.env.TOKEN);

//ready & Gamer bot//
bot.on("ready", async => {
    console.log(`${bot.user.username} Conectado com sucesso!`)
    console.log(`${bot.user.id}`)
    bot.user.setPresence({ status: 'PLAYING', game: { name: `redecolorcraft`}});
});

bot.on("guildMemberAdd", async (member) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL)
    .addField(":fire: Seja muito bem-vindo(a)!", `${member}, Seja bem-vindo ao **Rede Color Craft**!\n\n📋 Leia as <#503776227346219009> e os <#503776308522778626> do servidor!`)
    .setFooter("RedeColorCraft © Todos direitos reservados.")
    .setColor("#b70f0f")
    bot.channels.get("503775413256847363").send(embed);

});

bot.on("guildMemberAdd", member => {
    console.log(`${member.user.username} entrou no servidor.`);
    var role = member.guild.roles.find("name", "🎮 Membro");
    member.addRole(role)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;


    let prefix = PREFIX;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}limpar`){

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
        if(!args[0]) return message.channel.send("Especifique quantas linhas.").then(msg => msg.delete(5000));
          message.channel.bulkDelete(args[0]).then(() => {
          message.channel.send(`Limpei ${args[0]} mensagens.`).then(msg => msg.delete(5000));
        });
        }

    if(cmd === `${prefix}testewelcome`){
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .addField(":fire: Seja muito bem-vindo(a)!", `${message.author}, Seja bem-vindo ao **Rede Color Craft**!\n\n📋 Leia as ${message.channel} e as ${message.channel} do servidor!`)
        .setFooter("RedeColorCraft © Todos direitos reservados.")
        .setColor("#b70f0f")
        message.channel.send(embed);
    }

    if(cmd === `${prefix}mute`){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("❌ | Você não tem permissão!")
        
        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!toMute) return message.channel.sendMessage("Você não especificou o membro.");
    
        let role = message.guild.roles.find(r => r.name === "🔇 Mutado");
        if(!role) {
          try{
            role = await message.guild.createRole({
              name: "🔇 Mutado",
              color: "#030303",
              permissions: []
            });
    
            message.guild.channels.forEach(async (channel, id) => {
              await channel.overwritePermissions(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
               });
            });
          } catch(e) {
              console.log(e.stack);
          }
        }
      if(toMute.roles.has(role.id)) return message.channel.sendMessage("Membro mutado com sucesso.");
      
      await toMute.addRole(role);
      message.channel.sendMessage("🔇 | Membro Mutado!");
      
        return;
    }

    if(cmd === `${prefix}ban`){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("`❌ Membro não encontrado`").then(msg => msg.delete(10000));
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("`❌ Você não tem permissão!`");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("`❌ Eu não posso banir essa pessoa.`");
     
        let banEmbed = new Discord.RichEmbed()
        .setThumbnail(bUser.user.displayAvatarURL)
        .addField("`👤 | Membro Banido:`", `${bUser}`, true)
        .addField("`👨‍💼 | Banido por:`", `<@${message.author.id}>`, true)
        .addField("`📦 | Membro ID:`", `${bUser.id}`, true)
        .addField("`📋 | Banido no canal:`", `${message.channel}`, true)
        .addField("`📂 | Motivo:`", `${bReason}`, true)
        .setColor("#b70f0f")
     
        let incidentchannel = message.guild.channels.find(c => c.name == "📖puniçoes📖");
        if(!incidentchannel) return message.channel.send("`❌ Não foi possível encontrar o canal de punições.`");
        
        message.delete();
        message.guild.member(bUser).ban(bReason);
        incidentchannel.send(banEmbed);
        message.channel.send("`🔴 Membro Banido!`").then(msg => msg.delete(10000));
        return;
      }

    if(cmd === `${prefix}testeban`){
        if(message.author.id !== "231611977053503488") return;
        let testeban = new Discord.RichEmbed()
        .setThumbnail(message.author.displayAvatarURL)
        .addField("`👤 | Membro Banido:`", `<@231611977053503488>`, true)
        .addField("`👨‍💼 | Banido por:`", `<@231611977053503488>`, true)
        .addField("`📦 | Membro ID:`", `231611977053503488`, true)
        .addField("`📋 | Banido no canal:`", `${message.channel}`, true)
        .addField("`📂 | Motivo:`", `Estou testando! isso é apenas uma mensagem de teste.`, true)
        .setColor("#b70f0f")
        message.channel.send(testeban);
    
    }


});
