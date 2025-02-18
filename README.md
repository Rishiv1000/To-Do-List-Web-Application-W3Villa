

https://github.com/user-attachments/assets/de172bdc-f99e-4fac-b983-4c788e0fdd70




Please follow the steps below to set up the project locally.

IN SERVER FOLDER  - 

1. 📄 create (.env) file in server folder and paste the below values -

TOKEN_KEY = eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJIYXppcSIsIlVzZXJuYW1lIjoiaGF6aXFhbGkiLCJleHAiOjE2ODQ2MDk4MDksImlhdCI6MTY4NDYwOTgwOX0.JBP_fB4iea02VGoXJTIFS_sDhIhLbQLv15OhjkFTXuc

MONGO_DB_URL = mongodb+srv://Rishiv:1221@cluster0.wux8rdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 
2. 🚀 npm install
3. 🚀 npm run dev

--------------------------------------------------------------------------------------------------------------

IN CLIENT FOLDER -

1. 📄 create (.env) file in client folder and paste the below values-
   
URL = http://localhost:3000

PORT = 3000

API_BASE_URL = http://localhost:8080/api/

2. 🚀 npm install
3. 🚀 npm start

check ---- http://localhost:3000/login
