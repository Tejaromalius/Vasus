## Vasus VS Code Extension

`After ^1.0.5 update, Vasus relies on Asusctl ^6.11!`

### Introduction

Vasus extension that allows you to synchronize your Asus keyboard's static color with the color of the status bar in your VS Code workspace. With this extension, you can ensure that your keyboard lighting matches your coding environment, enhancing your productivity and aesthetic experience.

### Features

- **Keyboard Color Synchronization**: Automatically syncs your Asus keyboard's color with the status bar color.
- **Toggle Synchronization**: Easily enable or disable color synchronization with a single command.
- **Random Color Option**: If no status bar color is found, you can set a random color for your keyboard.

### Prerequisites

Before diving into the synchronization magic, ensure that you have the `asusctl` command-line tool installed on your system. If not, you can build and install from their **[main repository](https://gitlab.com/asus-linux/asusctl)**.

For an elevated experience, consider complementing Vasus with the [**Peacock extension**](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock). Peacock allows you to colorize your VS Code workspace, adding another layer of personalization to your development environment. Vasus seamlessly syncs your keyboard color with the active Peacock color, enhancing your coding ambiance.

### Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar or pressing `Ctrl+Shift+X`.
3. Search for `Vasus` and click on the `Install` button.

### Usage

- **Sync Keyboard Color**: Run the command `Vasus: Sync Keyboard Color` to synchronize the keyboard color with the status bar.
- **Toggle Color Sync**: Run the command `Vasus: Toggle Color Sync` to enable or disable keyboard color synchronization.

### Configuration

You can customize the extension settings by navigating to:

```
File > Preferences > Settings > Extensions > Vasus
```

- **Sync Enabled**: Enable or disable keyboard color synchronization (default: `true`).


### Troubleshooting

Should you encounter any hiccups along the way, double-check your VS Code color settings, ensuring they align with your preferences, especially the `statusBar.background` color is set.

### Feedback and Support
Your feedback is invaluable! If you have suggestions, feature requests, or encounter any issues while using the Vasus extension, please don't hesitate to reach out. Feel free to submit feedback or report bugs on our GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
