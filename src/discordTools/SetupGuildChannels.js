const DiscordTools = require('../discordTools/discordTools.js');

module.exports = (client, guild) => {
    let instance = client.readInstanceFile(guild.id);

    let category = undefined;
    if (instance.channelId.category !== null) {
        category = DiscordTools.getCategoryById(guild.id, instance.channelId.category);
    }
    if (category === undefined) {
        DiscordTools.addCategory(guild.id, 'rustPlusPlus').then(cat => {
            instance.channelId.category = cat.id;
            client.writeInstanceFile(guild.id, instance);

            addMissingTextChannels(client, guild.id, cat);
        });
    }
    else {
        addMissingTextChannels(client, guild.id, category);
    }
};


function addMissingTextChannels(client, guildId, parent) {
    let instance = client.readInstanceFile(guildId);

    let servers = undefined;
    if (instance.channelId.servers !== null) {
        servers = DiscordTools.getTextChannelById(guildId, instance.channelId.servers);
    }
    if (servers === undefined) {
        DiscordTools.addTextChannel(guildId, 'servers').then(channel => {
            channel.setParent(parent.id);
            instance.channelId.servers = channel.id;
            client.writeInstanceFile(guildId, instance);
        });
    }
    else {
        servers.setParent(parent.id);
    }

    let settings = undefined;
    if (instance.channelId.settings !== null) {
        settings = DiscordTools.getTextChannelById(guildId, instance.channelId.settings);
    }
    if (settings === undefined) {
        DiscordTools.addTextChannel(guildId, 'settings').then(channel => {
            channel.setParent(parent.id);
            instance.channelId.settings = channel.id;
            client.writeInstanceFile(guildId, instance);
        });
    }
    else {
        settings.setParent(parent.id);
    }

    let events = undefined;
    if (instance.channelId.events !== null) {
        events = DiscordTools.getTextChannelById(guildId, instance.channelId.events);
    }
    if (events === undefined) {
        DiscordTools.addTextChannel(guildId, 'events').then(channel => {
            channel.setParent(parent.id);
            instance.channelId.events = channel.id;
            client.writeInstanceFile(guildId, instance);
        });
    }
    else {
        events.setParent(parent.id);
    }
}