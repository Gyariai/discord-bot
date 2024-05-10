module.exports.payloadOne = (token) => {
    return {
        op: 2,
        d: {
            capabilities: 253,
            client_state: {
                guild_hashes: {},
                highest_last_message_id: "0",
                read_state_version: 0,
                user_guild_settings_version: -1,
                user_settings_version: -1,
            },
            compress: false,
            presence: {
                activities: [],
                afk: false,
                since: 0,
                status: "online",
            },
            properties: {
                browser: "Chrome",
                browser_user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
                browser_version: "96.0.4664.110",
                client_build_number: 110451,
                client_event_source: null,
                device: "",
                os: "Windows",
                os_version: "10",
                referrer: "https://discord.com/",
                referrer_current: "https://discord.com/",
                referring_domain: "discord.com",
                referring_domain_current: "discord.com",
                release_channel: "stable",
                system_locale: "ru-RU",
            },
            token: token
        }
    }
}

module.exports.payloadTwo= (setting) => {
    return {
        op: 14,
        d: {
            activities: true,
            channels: { [setting.channel]: [[0, 99]]},
            guild_id: setting.guild,
            members: [],
            thread_member_lists: [],
            threads: true,
            typing: true,  
        }
    }
}