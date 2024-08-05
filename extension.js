const vscode = require('vscode');
const child_process = require('child_process');

let displayed = false;

async function syncKeyboardColor() {
  // Exit if no workspace folders are open
  if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
    return;
  }

  // Get the current workbench color customizations
  const workbenchConfig = vscode.workspace.getConfiguration().inspect('workbench.colorCustomizations');

  // Handle case when no color is found
  const handleNoColor = () => {
    // Show a warning message only once
    if (!displayed) {
      vscode.window.showWarningMessage(
        'No status bar color found to sync',
        'Set random color'
      ).then((action) => {
        if (action === 'Set random color') {
          vscode.commands.executeCommand('peacock.changeColorToRandom');
          syncKeyboardColor();
        }
      });
    }
    displayed = true;
  };

  // Exit if no valid color customization is found
  if (!workbenchConfig || typeof workbenchConfig.workspaceValue !== 'object') {
    handleNoColor();
    return;
  }

  // Extract the status bar background color
  const color = workbenchConfig.workspaceValue['statusBar.background']?.slice(1);

  // Handle case when color is not defined
  if (!color) {
    handleNoColor();
    return;
  }

  // Update the keyboard color
  try {
    child_process.execSync(`asusctl led-mode static -c ${color}`);
    console.log('Keyboard color updated to: #', color);
  } catch (error) {
    vscode.window.showErrorMessage('Error updating keyboard color').then(console.error);
  }
}

// Registers the command and event listeners for the extension
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('Vasus.SyncKeyboardColor', syncKeyboardColor),
    vscode.workspace.onDidChangeConfiguration(syncKeyboardColor),
    vscode.workspace.onDidChangeWorkspaceFolders(syncKeyboardColor),
    vscode.window.onDidChangeActiveColorTheme(syncKeyboardColor),
    vscode.window.onDidChangeVisibleTextEditors(syncKeyboardColor),
    vscode.window.onDidChangeWindowState(syncKeyboardColor),
  );
}

module.exports = {
  activate
};
