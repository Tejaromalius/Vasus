const vscode = require('vscode');
const child_process = require('child_process');

async function syncKeyboardColor() {
  const workbenchConfig = vscode.workspace.getConfiguration().inspect('workbench.colorCustomizations');

  if (!workbenchConfig || typeof workbenchConfig.workspaceValue !== 'object') {
    vscode.window.showWarningMessage('No status bar color found to sync');
    return;
  }

  const color = workbenchConfig.workspaceValue['statusBar.background'].slice(1);

  if (!color) {
    vscode.window.showWarningMessage('No status bar color found to sync');
    return;
  }

  try {
    child_process.execSync(`asusctl led-mode static -c ${color}`);
    console.log('Keyboard color updated to: #', color);
  } catch (error) {
    vscode.window.showErrorMessage('Error updating keyboard color').then(console.error);
  }
}

module.exports.activate = (context) => context.subscriptions.push(
  vscode.commands.registerCommand('Vasus.SyncKeyboardColor', syncKeyboardColor),
  vscode.workspace.onDidChangeConfiguration(syncKeyboardColor),
  vscode.workspace.onDidChangeWorkspaceFolders(syncKeyboardColor),
  vscode.window.onDidChangeActiveColorTheme(syncKeyboardColor),
  vscode.window.onDidChangeVisibleTextEditors(syncKeyboardColor),
  vscode.window.onDidChangeWindowState(syncKeyboardColor),
);