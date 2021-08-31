import * as vscode from 'vscode';
import { printProblems } from './api';

let logger = vscode.window.createOutputChannel('ng-error-fixer-vscode');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  logger.appendLine(
    'Congratulations, your extension "ng-error-fixer-vscode" is now active!'
  );

  const printDiagnostics = vscode.commands.registerCommand(
    'ng-error-fixer.background',
    async () => await printProblems(logger)
  );

  // Register subscriptions
  context.subscriptions.push(printDiagnostics);
}

// this method is called when your extension is deactivated
export function deactivate() {}
