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
  $actualExe = ''
  try { $actualExe = [string]$target.MainModule.FileName } catch { }
  if ($actualExe -and $actualExe -ine $expectedExe) { throw 'Helper executable does not match' }
  $info = $null
  try {
    $info = Get-CimInstance Win32_Process -Filter "ProcessId = $HelperPid"
  } catch {
    try { $info = Get-WmiObject Win32_Process -Filter "ProcessId = $HelperPid" } catch { }
  }
  if (-not $info -or $target.HasExited) { throw 'Helper is no longer running' }
  $command = [string]$info.CommandLine
  $mismatched = @()
  if ($command) {
    foreach ($pair in @(@('-File', $HelperScript), @('-StatePath', $StateFile))) {
      $path = [regex]::Escape([IO.Path]::GetFullPath($pair[1]))
      $leaf = [regex]::Escape([IO.Path]::GetFileName([IO.Path]::GetFullPath($pair[1])))
      $fullPattern = '(?i)(?:^|\s)' + [regex]::Escape($pair[0]) + '\s+(?:"' + $path + '"|' + $path + ')(?=\s|$)'
      $leafPattern = '(?i)(?:^|\s)' + [regex]::Escape($pair[0]) + '\s+(?:"[^"]*' + $leaf + '"|[^\s"]*' + $leaf + ')(?=\s|$)'
      if ($command -notmatch $fullPattern -and $command -notmatch $leafPattern) {
        $mismatched += [string]$pair[0]
      }
    }
  }
  if ($mismatched.Count -gt 0) {
    # GitHub's WMI may hide CommandLine or normalize the temp path. Fall back
    # to the two paths the Host itself wrote, while still rejecting wrong ones.
    if (-not (Test-Path -LiteralPath $HelperScript) -or -not (Test-Path -LiteralPath $StateFile)) {
      throw ('Helper argument does not match: ' + ($mismatched -join ', '))
    }
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
