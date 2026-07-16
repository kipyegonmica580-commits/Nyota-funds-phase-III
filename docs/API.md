# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "+1234567890"
}
```

**Response (201):**
```json
{
  "message": "Registration successful"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userType": "client",
    "status": "active"
  }
}
```

---

### 2. Client Operations

#### Get Client Profile
```http
GET /clients/profile
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "user_id": 1,
  "company_name": "Acme Corp",
  "account_number": "ACC12345",
  "kyc_status": "verified",
  "account_balance": 50000.00,
  "currency": "USD",
  "account_status": "active"
}
```

---

### 3. Fund Operations

#### Request Funds
```http
POST /funds/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 5000,
  "requestType": "withdrawal",
  "notes": "Urgent withdrawal needed"
}
```

**Response (201):**
```json
{
  "message": "Fund request submitted"
}
```

---

### 4. Transaction Operations

#### Get Transactions
```http
GET /transactions
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "client_id": 1,
    "transaction_type": "withdrawal",
    "amount": 1000.00,
    "reference_number": "TXN001",
    "description": "Withdrawal",
    "status": "completed",
    "transaction_date": "2024-07-15T10:30:00"
  }
]
```

---

### 5. Admin Operations

#### Get All Users
```http
GET /admin/users
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userType": "client",
    "status": "active"
  }
]
```

#### Get All Transactions
```http
GET /admin/transactions
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "client_id": 1,
    "transaction_type": "withdrawal",
    "amount": 1000.00,
    "reference_number": "TXN001",
    "status": "completed",
    "transaction_date": "2024-07-15T10:30:00"
  }
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently no rate limiting is implemented. Please implement in production.

## Security Notes

- Always use HTTPS in production
- Keep JWT_SECRET_KEY secure
- Implement request validation
- Use environment variables for sensitive data
- Implement logging for audit trails
