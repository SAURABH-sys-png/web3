// Helper functions for Stream Chat operations

export async function createOrGetChannel(chatClient, members, channelName) {
  try {
    const channel = chatClient.channel('messaging', {
      members,
      name: channelName,
    });

    await channel.create();
    return channel;
  } catch (error) {
    // Channel might already exist
    if (error.message.includes('already exists')) {
      const channels = await chatClient.queryChannels({
        members: { $in: members },
        name: channelName,
      });
      if (channels.length > 0) {
        return channels[0];
      }
    }
    throw error;
  }
}

export async function startDirectMessage(chatClient, userId, userName) {
  try {
    const channel = chatClient.channel('messaging', {
      members: [chatClient.userID, userId],
    });

    await channel.create();
    return channel;
  } catch (error) {
    // Channel might already exist, query for it
    const channels = await chatClient.queryChannels({
      members: { $in: [chatClient.userID, userId] },
      type: 'messaging',
    });

    if (channels.length > 0) {
      return channels[0];
    }
    throw error;
  }
}

export function formatChannelName(channel) {
  return channel.data?.name || channel.id;
}

export function getChannelAvatar(channel) {
  return channel.data?.image || null;
}
