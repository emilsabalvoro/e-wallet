# Sample Digital Wallet System

## Overview
A simple Digital Wallet System built using Node.js. This application provides APIs for balance inquiry, cash-in, and debit operations.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Documentation](#documentation)

## Features
- Balance Inquiry
- Cash-in
- Debit
- Basic Authentication
- Input Validation and Sanitization
- Rate Limiting
- Swagger API Documentation

## Requirements
- Node.js
- npm (Node Package Manager)
- SQLite

## Installation
1. Clone the repository:
   git clone https://github.com/emilsabalvoro/e-wallet.git
2. Navigate to project directory:
   cd e-wallet
3. Install dependencies:
   npm install

## Usage
1. Start the server:
   npm start
2. The server will run on http://localhost:3000. You can access the Swagger API documentation at http://localhost:3000/api-docs.

## API Endpoints

Balance Inquiry

Endpoint: /api/wallet/balance

Method: GET

Request: No body required

Response:
{
  "success": true,
  "balance": 1000
}



Cash-in

Endpoint: /api/wallet/cash-in

Method: POST

Request:
{
  "amount": 500
}

Response:
{
  "success": true,
  "balance": 1500
}



Debit

Endpoint: /api/wallet/debit

Method: POST

Request:
{
  "amount": 200
}

Response:
{
  "success": true,
  "balance": 1300
}

## Testing
To test the APIs, you can use Swagger UI. The Swagger UI is available at http://localhost:3000/api-docs.

IMPORTANT: make sure to Authorize and use the credentials provided in the .env before testing

Authorize
1. <img width="131" alt="{C44BA2D8-CA21-4B17-BF02-AC4E63A939E9}" src="https://github.com/user-attachments/assets/d98b7e18-f683-411c-9a18-41d4ede7d942" />
2. <img width="493" alt="{9E342000-41D7-4606-9C53-4269FFA625D6}" src="https://github.com/user-attachments/assets/82982bbb-cb37-4a42-9fd1-d005598f496e" />
3. <img width="492" alt="{72B971D8-B90A-43FD-9C2F-8660F406AB4D}" src="https://github.com/user-attachments/assets/90429903-fa5e-48b4-8624-7574758a7dbf" />
4. <img width="683" alt="{27B8D663-DCA0-426C-820D-7C5B70BDC2EC}" src="https://github.com/user-attachments/assets/8c21ba9e-edfd-4c65-9600-6b84e7383ef2" />

Testing
1. For GET, click the Try it out button and then press Execute.
   <img width="649" alt="{2612D927-45BF-4066-B4B8-7E7C80384D82}" src="https://github.com/user-attachments/assets/d1aac580-7a83-4897-a5dc-e731a66f3b1c" />
2. For POST, click the Try it out button and modify the body. NOTE: just change the value of the number, otherwise you'll encounter an error.
   <img width="651" alt="{E7999071-47BE-474E-BC25-318B5E626607}" src="https://github.com/user-attachments/assets/ae60401b-1c8f-4bea-bfac-997593b9afea" />
   <img width="650" alt="{961F6FEF-8AD4-4FB9-8117-FC75EF8B048C}" src="https://github.com/user-attachments/assets/3c8fc71c-a08d-4ecf-bc5b-98cf72b45f6d" />




## Documentation
The API documentation is available through Swagger UI at http://localhost:3000/api-docs.
