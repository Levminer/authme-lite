use native_dialog::{MessageDialog, MessageType};

#[tauri::command]
pub fn password_encryption() -> String {
  let dialog0 = MessageDialog::new()
    .set_type(MessageType::Info)
    .set_title("Authme Lite")
    .set_text("Do you want to create a password to protect the code(s)?\n\nBy selecting no nothing will protect your code(s)!")
    .show_confirm()
    .unwrap();

  if dialog0 == true {
    "true".into()
  } else {
    "false".into()
  }
}
