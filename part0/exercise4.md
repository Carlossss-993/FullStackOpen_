sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user writes something on text field and presses the send button.
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    
    activate server
    Note left of server: The server receives the note and saves it in the server.
    server->>browser: the main page link
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JS code which fetches the JSON from the server.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: the JSON file
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes.