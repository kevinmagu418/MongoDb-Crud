# Sign-up Workflow

```mermaid
graph TD;
    A[User Submits Sign-up Form] -->|Validate Input Fields| B{Are all fields provided?};
    B -- No --> C[Return Error: All Fields Required];
    B -- Yes --> D[Check if User Exists];

    D -- Exists --> E[Return Error: User Already Exists];
    D -- Doesn't Exist --> F[Hash Password];

    F --> G[Generate Verification Code];
    
    G --> H{Is the User a Driver?};
    H -- Yes --> I[Check for Vehicle Details];
    I -- Missing Details --> J[Return Error: Vehicle Type & License Required];
    I -- Details Provided --> K[Create Driver User];

    H -- No --> L[Create Passenger User];

    K & L --> M[Save User to Database];
    M --> N[Generate Token & Set Cookie];
    N --> O[Send Verification Email];
    O --> P[Return Success: User Created];

    C & E & J --> X[End];
    P --> X;



#verify email

sequenceDiagram
    participant User
    participant API
    participant Database
    participant EmailService

    User->>API: Sends verification code
    API->>Database: Checks if code exists and is valid
    alt Code is valid
        API->>Database: Updates user as verified
        API->>EmailService: Sends welcome email
        EmailService-->>User: Receives welcome email
        API->>User: Responds with success message
    else Code is invalid or expired
        API->>User: Responds with error message
    end
