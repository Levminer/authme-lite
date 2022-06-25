use native_dialog::{MessageDialog, MessageType};

#[tauri::command]
pub fn error(invoke_message: &str) {
  MessageDialog::new()
    .set_type(MessageType::Error)
    .set_title("Authme Lite")
    .set_text(invoke_message)
    .show_alert()
    .unwrap();
}
