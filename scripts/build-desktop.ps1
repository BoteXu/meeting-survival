$ErrorActionPreference = 'Stop'
$gameRoot = Split-Path -Parent $PSScriptRoot
$packagePath = Join-Path $gameRoot '.publish\应用版'
New-Item -ItemType Directory -Force -Path $packagePath | Out-Null
$compilerPath = Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
if (!(Test-Path -LiteralPath $compilerPath)) { throw 'The .NET Framework C# compiler is required to build the Windows launcher.' }
$sourcePath = Join-Path $PSScriptRoot 'DesktopLauncher.cs'
$exePath = Join-Path $packagePath '组会求生.exe'
$iconPath = Join-Path $gameRoot 'icons\app.ico'
& $compilerPath /nologo /target:winexe /r:System.Windows.Forms.dll "/win32icon:$iconPath" "/out:$exePath" $sourcePath
if ($LASTEXITCODE -ne 0) { throw 'Desktop launcher compilation failed.' }
Copy-Item -LiteralPath (Join-Path $gameRoot '组会求生_直接玩.html') -Destination $packagePath
Copy-Item -LiteralPath (Join-Path $gameRoot '世界设定集.html') -Destination $packagePath
Copy-Item -LiteralPath (Join-Path $gameRoot 'docs\APPS.md') -Destination (Join-Path $packagePath '安装与存档说明.md')
$zipPath = Join-Path $gameRoot '.publish\meeting-survival-windows-v0.14.8.zip'
Compress-Archive -LiteralPath $exePath,(Join-Path $packagePath '组会求生_直接玩.html'),(Join-Path $packagePath '安装与存档说明.md'),(Join-Path $packagePath '世界设定集.html') -DestinationPath $zipPath -Force
Write-Output $zipPath
