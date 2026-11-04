param(
  [Parameter(Mandatory=$true)][int]$HelperPid,
  [Parameter(Mandatory=$true)][string]$HelperScript,
  [Parameter(Mandatory=$true)][string]$StateFile,
  [switch]$Terminate
)
$ErrorActionPreference = 'Stop'
$target = $null
try {
  if ($HelperPid -le 0 -or $HelperPid -eq $PID) { exit 1 }
  $target = [System.Diagnostics.Process]::GetProcessById($HelperPid)
  # Pin the process object before inspection; do not kill a later PID reuse.
  $null = $target.Handle
  $expectedExe = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
  if ($target.MainModule.FileName -ine $expectedExe) { throw 'Helper executable does not match' }
  $info = Get-CimInstance Win32_Process -Filter "ProcessId = $HelperPid"
  if (-not $info -or $target.HasExited) { throw 'Helper is no longer running' }
  $command = [string]$info.CommandLine
  foreach ($pair in @(@('-File', $HelperScript), @('-StatePath', $StateFile))) {
    $path = [regex]::Escape([IO.Path]::GetFullPath($pair[1]))
    $pattern = '(?i)(?:^|\s)' + [regex]::Escape($pair[0]) + '\s+(?:"' + $path + '"|' + $path + ')(?=\s|$)'
    if ($command -notmatch $pattern) { throw ('Helper argument does not match: ' + $pair[0]) }
  }
  if ($Terminate) {
    $target.Kill()
    if (-not $target.WaitForExit(3000)) { exit 1 }
  }
  Write-Output 'verified'
} catch {
  # Fail closed on denied inspection, stale PIDs, or unexpected process state.
  [Console]::Error.WriteLine($_.Exception.Message)
  exit 1
} finally {
  if ($target) { $target.Dispose() }
}
