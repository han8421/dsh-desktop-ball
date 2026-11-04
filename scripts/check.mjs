import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root=fileURLToPath(new URL('../',import.meta.url))
for(const file of ['index.js','client.js','lib/reliability.js']) {
  const result=spawnSync(process.execPath,['--check',join(root,file)],{stdio:'inherit'})
  if(result.status!==0) process.exit(result.status || 1)
}
if(process.platform==='win32') {
  const ps=join(process.env.SystemRoot,'System32/WindowsPowerShell/v1.0/powershell.exe')
  const result=spawnSync(ps,['-NoProfile','-NonInteractive','-Command',
    "$failed=$false; Get-ChildItem -LiteralPath './native' -Filter '*.ps1' | ForEach-Object { $tokens=$null; $errors=$null; [void][System.Management.Automation.Language.Parser]::ParseFile($_.FullName,[ref]$tokens,[ref]$errors); if($errors.Count) { $errors | ForEach-Object { Write-Error $_.Message }; $failed=$true } }; if($failed) { exit 1 }"],
    {cwd:root,stdio:'inherit',windowsHide:true})
  if(result.status!==0) process.exit(result.status || 1)
}
