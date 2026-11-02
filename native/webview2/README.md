# WebView2 SDK (vendored)

These assemblies are extracted from the official NuGet package
[`Microsoft.Web.WebView2`](https://www.nuget.org/packages/Microsoft.Web.WebView2)
version **1.0.4314.35** (`lib/net462` + `runtimes/win-x64/native`).

They let `native/ball.ps1` host the quick-chat page in a WebView2 control
without requiring the SDK to be installed on the user's machine. The machine
still needs the **WebView2 Evergreen Runtime**, which ships with Microsoft Edge
on Windows 10/11 (or can be installed from Microsoft).

| File | Purpose |
| --- | --- |
| `Microsoft.Web.WebView2.Core.dll` | Core WebView2 API |
| `Microsoft.Web.WebView2.WinForms.dll` | WinForms control used by the chat window |
| `WebView2Loader.dll` | x64 native loader (must stay next to the managed DLLs) |
| `LICENSE.txt` / `NOTICE.txt` | license files from the NuGet package |

Do not edit these files by hand. To update, download a newer NuGet package and
replace the `lib/net462` and `runtimes/win-x64/native` files together.
