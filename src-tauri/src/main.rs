#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod about;
mod clear_data;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      clear_data::clear_data,
      about::about
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
