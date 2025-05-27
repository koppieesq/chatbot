# Chatbot React Component

A reusable chatbot component for React projects.

## Usage

1. Install as a dependency:
   ```sh
   npm install @koppieesq/chatbot
   ```
2. Import in your project:
   ```js
   import Chatbot from 'chatbot';
   ```
3. Add environment variable to your project:
   ```dotenv
   REACT_APP_API_URL='https://0.0.0.0:8000'
   ```
3. Use the components:
   ```jsx
   <Chatbot greeting="Hello! How can I help you?" apiUrl={process.env.REACT_APP_API_URL} />
   ```

## Troubleshooting

If you experience CORS issues, add the following environment variables:

```dotenv
NODE_TLS_REJECT_UNAUTHORIZED=0
DANGEROUSLY_DISABLE_HOST_CHECK=true
REACT_APP_IGNORE_SSL=true
```