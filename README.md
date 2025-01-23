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

## Documentation
The API documentation is available through Swagger UI at http://localhost:3000/api-docs.