#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod password_encryption;
mod clear_data;
mod error;
mod info;
mod os;
mod warning;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      password_encryption::password_encryption,
      clear_data::clear_data,
      warning::warning,
      error::error,
      info::info,
      os::os
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
