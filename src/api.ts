import * as vscode from 'vscode';

export async function printProblems(logger: vscode.OutputChannel) {
  const terminal = vscode.window.createTerminal(`Error fixer terminal`);
  return vscode.languages.onDidChangeDiagnostics(
    (e: vscode.DiagnosticChangeEvent) => {
      e.uris.forEach((uri) => {
        const diagnostics = vscode.languages.getDiagnostics(uri);
        diagnostics.forEach((d) => {
          if (d.source !== 'ngtsc') {
            return;
          }

          if (d.message.includes('is not a known element')) {
            d.code = 'NG8001';
            terminal.sendText(`echo "Error in ${uri.toString()}: error ${d.code}: ${d.message.replace('/n',' ')}" | ng-error-fixer -a`);
            logger.appendLine(JSON.stringify(d));
          } else if (d.message.includes(`since it isn't a known property of`)) {
            d.code = 'NG8002';
            terminal.sendText(`echo "Error in ${uri.toString()}: error ${d.code}: ${d.message.replace('/n',' ')}" | ng-error-fixer -a`);
            logger.appendLine(JSON.stringify(d));
          }
          logger.appendLine(JSON.stringify(d));
        });
      });
    }
  );
}
