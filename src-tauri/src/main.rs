// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::{thread, time};
use discord_rpc_client::{Client, Event};
use serde::Deserialize;
use std::sync::atomic::{AtomicBool, Ordering};
use tauri::State;
#[derive(Deserialize)]
struct MyInputData {
    variable1: String,
    variable2: String,
    variable3: String,
    variable4: String,
    variable5: String,
}
#[derive(Deserialize)]
struct RpcState {
    running: AtomicBool,
}

fn discord_rpc_main(input_data: &MyInputData,  state: State<'_, RpcState>) {
    let end_timestamps:u64 = input_data.variable4.trim().parse().unwrap_or(1);
    let start_timestamp: u64 = input_data.variable5.trim().parse().unwrap_or(1);
    let details = &input_data.variable3;
    let state_message = &input_data.variable2;
    let client_id_str = &input_data.variable1;

    // Trim whitespace and newlines
    let client_id_str = client_id_str.trim();

    // Parse the client ID into a u64
    let client_id: u64 =  client_id_str.parse().unwrap_or(425407036495495169);
    let mut drpc = Client::new(client_id);   

    drpc.on_event(Event::Ready, |ctx| {});

    drpc.start();

    while state.running.load(Ordering::SeqCst) {
        // Set the activity
        drpc.set_activity(|act| act
            .state(state_message.clone())
            .details(details)
            .instance(true)
            .timestamps(|time| time.end(end_timestamps.clone()).start(start_timestamp.clone()))
            .secrets(|mode| mode.join("025ed05c71f639de8bfaa0d679d7c94b2fdce12f")
            .spectate("e7eb30d2ee025ed05c71ea495f770b76454ee4e0")
            .game("4b2fdce12f639de8bfa7e3591b71a0d679d7c93f")))
            .expect("Failed to set activity");

        println!("Updated activity: {}", state_message);

        // Wait for 10 seconds before updating again
        thread::sleep(time::Duration::from_secs(10));
    }
    drpc.clear_activity().expect("clear error");
}


#[tauri::command]
async fn recive_input_data(data: MyInputData,  state: State<'_, RpcState>) -> Result<(), String> {
  println!("Variable 1: {}", data.variable1);
  println!("Variable 2: {}", data.variable2);
  println!("Variable 3: {}", data.variable3);
  println!("Variable 4: {}", data.variable4);
  discord_rpc_main(&data, state);
  Ok(())
}

#[tauri::command]
fn stop_rpc(state: State<'_, RpcState>) {
    state.running.store(false, Ordering::SeqCst);
}

fn main() {
  tauri::Builder::default()
    .manage(RpcState {
        running: AtomicBool::new(true),
    })
    .invoke_handler(tauri::generate_handler![recive_input_data, stop_rpc])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}