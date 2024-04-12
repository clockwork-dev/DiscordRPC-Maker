// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::{env, error::Error, io, thread, time};
use discord_rpc_client::{error, Client, Event};
use serde::Deserialize;
#[derive(Deserialize)]
struct MyInputData {
    variable1: String,
    variable2: String,
    variable3: String,
    variable4: String,
}

fn discord_rpc_main(input_data: &MyInputData) {
    let mut state_message = &input_data.variable2;
    let mut client_id_str = &input_data.variable1;

    // Trim whitespace and newlines
    let client_id_str = client_id_str.trim();

    // Parse the client ID into a u64
    let client_id: u64 =  client_id_str.parse().unwrap_or(425407036495495169);
    let mut drpc = Client::new(client_id);   

    drpc.on_event(Event::Ready, |ctx| {});

    drpc.start();

    loop {
        // Set the activity
        drpc.set_activity(|act| act.state(state_message.clone()))
            .expect("Failed to set activity");

        println!("Updated activity: {}", state_message);

        // Wait for 10 seconds before updating again
        thread::sleep(time::Duration::from_secs(10));
    }
}


#[tauri::command]
async fn recive_input_data(data: MyInputData) -> Result<(), String> {
  println!("Variable 1: {}", data.variable1);
  println!("Variable 2: {}", data.variable2);
  println!("Variable 3: {}", data.variable3);
  println!("Variable 4: {}", data.variable4);
  discord_rpc_main(&data);
  Ok(())
}
fn stop_rpc() {
  
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![recive_input_data])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}