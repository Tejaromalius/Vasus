const vscode = require("vscode");
const child_process = require("child_process");

let warningDisplayed = false;

function getSyncState() {
  const config = vscode.workspace.getConfiguration("vasus");
  return config.get("syncEnabled", true);
}

async function setSyncState(setting, value) {
  const config = vscode.workspace.getConfiguration("vasus");
  await config.update(setting, value, vscode.ConfigurationTarget.Global);
}

async function syncKeyboardColor() {
  if (!getSyncState()) return;

  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) return;

  const workbenchConfig = vscode.workspace.getConfiguration("workbench");
  const color = workbenchConfig
    .get("colorCustomizations")
    ?.["statusBar.background"]?.slice(1);

  if (!color) return showWarningMessage();

  try {
    child_process.execSync(`asusctl led-mode static -c ${color}`);
    console.log(`Keyboard color updated to: #${color}`);
  } catch (error) {
    vscode.window.showErrorMessage("Error updating keyboard color");
    console.error(error);
  }
}

function showWarningMessage() {
  if (warningDisplayed) return;

  vscode.window
    .showWarningMessage("No status bar color found to sync", "Set random color")
    .then((action) => {
      if (action === "Set random color") {
        vscode.commands
          .executeCommand("peacock.changeColorToRandom")
          .then(syncKeyboardColor);
      }
    });

  warningDisplayed = true;
}

function toggleSync() {
  const currentState = getSyncState();
  setSyncState("syncEnabled", !currentState).then(() => {
    const message = currentState
      ? "Keyboard color synchronization disabled."
      : "Keyboard color synchronization enabled.";
    vscode.window.showInformationMessage(message);

    if (!currentState) {
      syncKeyboardColor();
    }
  });
}

function activate(context) {
  const config = vscode.workspace.getConfiguration("vasus");
  if (config.get("syncEnabled") === undefined) {
    config.update("syncEnabled", true, vscode.ConfigurationTarget.Global);
  }

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vasus.syncKeyboardColor",
      syncKeyboardColor
    ),
    vscode.commands.registerCommand(
      "vasus.toggleSyncKeyboardColor",
      toggleSync
    ),
    vscode.workspace.onDidChangeConfiguration(syncKeyboardColor),
    vscode.workspace.onDidChangeWorkspaceFolders(syncKeyboardColor),
    vscode.window.onDidChangeActiveColorTheme(syncKeyboardColor),
    // vscode.window.onDidChangeVisibleTextEditors(syncKeyboardColor),
    vscode.window.onDidChangeWindowState(syncKeyboardColor)
  );
}

module.exports = {
  activate,
};
