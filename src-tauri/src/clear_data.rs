use native_dialog::{MessageDialog, MessageType};

#[tauri::command]
pub fn clear_data() -> String {
  let dialog0 = MessageDialog::new()
    .set_type(MessageType::Warning)
    .set_title("Authme Lite")
    .set_text("Are you sure you want to clear all data?\n\nThis cannot be undone!")
    .show_confirm()
    .unwrap();

  if dialog0 == true {
    let dialog1 = MessageDialog::new()
      .set_type(MessageType::Warning)
      .set_title("Authme Lite")
      .set_text("Are you absolutely sure?\n\nThere is no way back!")
      .show_confirm()
      .unwrap();

    if dialog1 == true {
      "true".into()
    } else {
      "false".into()
    }
  } else {
    "false".into()
  }
}
