#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod clear_data;
mod error;
mod info;
mod os;
mod password_encryption;
mod warning;

use tauri::Manager;
use window_vibrancy::{apply_mica, apply_vibrancy, NSVisualEffectMaterial};

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
    .setup(|app| {
      let win = app.get_window("main").unwrap();

      #[cfg(target_os = "macos")]
      apply_vibrancy(&win, NSVisualEffectMaterial::AppearanceBased)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

      #[cfg(target_os = "windows")]
      apply_mica(&win).expect("Unsupported platform! 'apply_blur' is only supported on Windows");

      win
        .get_window("main")
        .unwrap()
        .set_decorations(true)
        .unwrap();

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
