use native_dialog::{MessageDialog, MessageType};

#[tauri::command]
pub fn warning(invoke_message: &str) {
  MessageDialog::new()
    .set_type(MessageType::Warning)
    .set_title("Authme Lite")
    .set_text(invoke_message)
    .show_alert()
    .unwrap();
}
