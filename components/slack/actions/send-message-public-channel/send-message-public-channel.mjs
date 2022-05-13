import common from "../common/send-message.mjs";

export default {
  ...common,
  key: "slack-send-message-public-channel",
  name: "Send Message to a Public Channel",
  description: "Send a message to a public channel and customize the name and avatar of the bot that posts the message",
  version: "0.2.4",
  type: "action",
  props: {
    ...common.props,
    conversation: {
      propDefinition: [
        common.props.slack,
        "publicChannel",
      ],
    },
    text: {
      propDefinition: [
        common.props.slack,
        "text",
      ],
    },
    username: {
      propDefinition: [
        common.props.slack,
        "username",
      ],
      description: "Optionally customize your bot's username (default is `Pipedream`).",
    },
    icon_emoji: {
      propDefinition: [
        common.props.slack,
        "icon_emoji",
      ],
      description: "Optionally use an emoji as the bot icon for this message (e.g., `:fire:`). This value overrides `icon_url` if both are provided.",
    },
    icon_url: {
      propDefinition: [
        common.props.slack,
        "icon_url",
      ],
      description: "Optionally provide an image URL to use as the bot icon for this message.",
    },
  },
};
