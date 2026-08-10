sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user writes something on text field and presses the send button.
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    
    activate server
    Note left of server: The server receives the note, saves it in the server and render the ul element with the new note on it.
    server->>browser: 201 created
    deactivate server