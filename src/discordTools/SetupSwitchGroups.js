const DiscordMessages = require('./discordMessages.js');

module.exports = async (client, rustplus) => {
    let instance = client.readInstanceFile(rustplus.guildId);

    for (const [groupName, content] of Object.entries(instance.serverList[rustplus.serverId].switchGroups)) {
        await DiscordMessages.sendSmartSwitchGroupMessage(rustplus.guildId, rustplus.serverId, groupName);
    }
};
