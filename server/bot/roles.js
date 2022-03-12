
if (GetConvar("ea_botToken", "") != "") {


    async function syncDiscordRoles(player) {
        if (!EasyAdmin) {return} // bot is down
        var src = player
        var member = undefined
        try {
            var botGuild = await client.guilds.cache.get(guild)
            var user = await getDiscordAccountFromPlayer(src)
            member = await botGuild.members.fetch(user.id)
        } catch (error) {
            return
        }

        var roles = await member.roles.cache.keys()

        for (var role of roles) {
            ExecuteCommand(`add_principal identifier.discord:${member.id} role:${role}`)
        }
    }
    exports('syncDiscordRoles', syncDiscordRoles)

    client.on("guildMemberUpdate", async function(oldMember, newMember){
        var player = await getPlayerFromDiscordAccount(newMember)
        if (player) {
            oldRoles = await oldMember.roles.cache.keys()

            for (var role of oldRoles) {
                ExecuteCommand(`remove_principal identifier.discord:${oldMember.id} role:${role}`)
            }
    
            newRoles = await newMember.roles.cache.keys()
    
            for (var role of newRoles) {
                ExecuteCommand(`add_principal identifier.discord:${newMember.id} role:${role}`)
            }
        }
    });

}
