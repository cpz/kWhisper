# Key Whisper (short: kWhisper)

![kWhisper logo](https://raw.githubusercontent.com/cpz/kWhisper/master/images/extension-logo.png)

[kWhisper](https://marketplace.visualstudio.com/items?itemName=cpz.kWhisper "kWhisper on Visual Studio Marketplace") is extension for Azure DevOps Pipelines which gives you possibility to send messages about your build/release process or custom mesages to Keybase.io.

## Getting started

Only three steps to start receiving your notifications:

1. Create a bot
2. Create paper key for bot
3. Customize bot message

**Creating bot**: we just need to register account as default account. (e.g. kbot is just account used as bot)

## Customize your message

There are some basic predefined features both for build and release tasks.

**General**

- **Task Status** - Adds information about task status (e.g Failed, Succeeded)
- **Project** - Adds project URL (e.g <https://yourteam.visualstudio.com/>).
- **Release** - Adds release name to message.
- **Reason** - Adds information about event that caused the build to run to message.
- **Build Number** - Adds build number to message.
- **Queued by** - Adds info about who queued the build to message.
- **Message Text** - Adds custom message text to message.

**Misc**

- **Status React** - Adds task status react to message.
- **Custom React** - Adds your own react to mesage (e.g. :thinking_face:)

## Example

![example of message](https://raw.githubusercontent.com/cpz/kWhisper/master/images/example.png)

## License

[MIT](https://choosealicense.com/licenses/mit/)

### Copyright

Key Whisper not affiliated with Keybase.io and Keybase Logo rights belongs to them.

![kWhisper logo small](https://raw.githubusercontent.com/cpz/kWhisper/master/images/extension-logo-small.png)
