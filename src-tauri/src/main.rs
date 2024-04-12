// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn reverse_text_input(input: String) -> String {
  input.chars().rev().collect()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![reverse_text_input])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
