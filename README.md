

https://github.com/user-attachments/assets/de172bdc-f99e-4fac-b983-4c788e0fdd70

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Setup Instructions</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            color: #333;
        }
        h2 {
            color: #444;
        }
        pre {
            background-color: #eee;
            padding: 10px;
            border-radius: 5px;
            font-family: Consolas, monospace;
        }
        ul {
            margin: 10px 0;
        }
        li {
            margin-bottom: 5px;
        }
        code {
            font-size: 1.1em;
        }
    </style>
</head>
<body>

    <h1>Project Setup Instructions</h1>
    <p>Follow the steps below to set up the project locally. Ensure that both the <strong>server</strong> and <strong>client</strong> are configured properly for the project to work.</p>

    <h2>1. Setting up the Server</h2>
    <ul>
        <li>Navigate to the <strong>server folder</strong> of the project.</li>
        <li>Create a <code>.env</code> file in the server folder and paste the following values:</li>
    </ul>
    <pre>
TOKEN_KEY=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJIYXppcSIsIlVzZXJuYW1lIjoiaGF6aXFhbGkiLCJleHAiOjE2ODQ2MDk4MDksImlhdCI6MTY4NDYwOTgwOX0.JBP_fB4iea02VGoXJTIFS_sDhIhLbQLv15OhjkFTXuc
MONGO_DB_URL=mongodb+srv://Rishiv:1221@cluster0.wux8rdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    </pre>
    <ul>
        <li>Install the required dependencies by running the following command:</li>
    </ul>
    <pre>npm install</pre>
    <ul>
        <li>Start the server by running:</li>
    </ul>
    <pre>npm run dev</pre>

    <h2>2. Setting up the Client</h2>
    <ul>
        <li>Navigate to the <strong>client folder</strong> of the project.</li>
        <li>Create a <code>.env</code> file in the client folder and paste the following values:</li>
    </ul>
    <pre>
URL=http://localhost:3000
PORT=3000
API_BASE_URL=http://localhost:8080/api/
    </pre>
    <ul>
        <li>Install the required dependencies by running:</li>
    </ul>
    <pre>npm install</pre>
    <ul>
        <li>Start the client by running:</li>
    </ul>
    <pre>npm start</pre>

    <h2>3. Check the Application</h2>
    <p>After running both the server and client, visit <a href="http://localhost:3000/login" target="_blank">http://localhost:3000/login</a> to check if everything is working.</p>

</body>
</html>





Please follow the steps below to set up the project locally.

IN SERVER FOLDER  - 

1. create (.env) file in server folder and paste the below values-

TOKEN_KEY=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJIYXppcSIsIlVzZXJuYW1lIjoiaGF6aXFhbGkiLCJleHAiOjE2ODQ2MDk4MDksImlhdCI6MTY4NDYwOTgwOX0.JBP_fB4iea02VGoXJTIFS_sDhIhLbQLv15OhjkFTXuc
MONGO_DB_URL=mongodb+srv://Rishiv:1221@cluster0.wux8rdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 
2. npm install
3. npm run dev

--------------------------------------------------------------------------------------------------------------

IN CLIENT FOLDER -

1. create (.env) file in client folder and paste the below values-
   
URL= http://localhost:3000
PORT=3000
API_BASE_URL= http://localhost:8080/api/

2. npm install
3. npm start

check ---- http://localhost:3000/login
