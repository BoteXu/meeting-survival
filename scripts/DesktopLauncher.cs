using System;
using System.IO;
using System.Diagnostics;
using System.Windows.Forms;
class DesktopLauncher {
  [STAThread] static void Main() {
    string root=AppDomain.CurrentDomain.BaseDirectory;
    string page=Path.Combine(root,"组会求生_直接玩.html");
    string[] browsers={Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),"Microsoft","Edge","Application","msedge.exe"),Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),"Microsoft","Edge","Application","msedge.exe"),Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),"Google","Chrome","Application","chrome.exe"),Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),"Google","Chrome","Application","chrome.exe")};
    string profile=Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),"MeetingSurvival","DesktopProfile");
    if(!File.Exists(page)){MessageBox.Show("请先完整解压应用包，保持程序与离线游戏文件位于同一文件夹。","组会求生");return;}
    Directory.CreateDirectory(profile);string runtime=Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),"MeetingSurvival","Runtime");Directory.CreateDirectory(runtime);string stable=Path.Combine(runtime,"组会求生.html");File.Copy(page,stable,true);page=stable;
    foreach(string exe in browsers)if(File.Exists(exe)){try{Process.Start(new ProcessStartInfo(exe,"--user-data-dir=\""+profile+"\" --app=\""+new Uri(page).AbsoluteUri+"\""){UseShellExecute=false});return;}catch{}}
    MessageBox.Show("没有找到 Edge 或 Chrome。现在用默认浏览器打开离线游戏，存档与安装菜单可导出备份。","组会求生");Process.Start(new ProcessStartInfo(page){UseShellExecute=true});
  }
}
