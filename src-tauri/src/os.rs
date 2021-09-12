use sysinfo::{ProcessorExt, System, SystemExt};

#[tauri::command]
pub fn os() -> String {
  let mut sys = System::new_all();

  sys.refresh_all();

  let cpu = sys.processors()[0].brand();
  let mem = sys.total_memory();

  let returning = format!("{}+{}", cpu, mem);

  returning.into()
}
