-- Nyota Funds Phase III Database Schema

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20),
    user_type ENUM('client', 'admin', 'support'),
    status ENUM('active', 'inactive', 'suspended'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Clients Table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    company_name VARCHAR(255),
    account_number VARCHAR(50) UNIQUE,
    kyc_status ENUM('pending', 'verified', 'rejected'),
    kyc_document_url VARCHAR(500),
    account_balance DECIMAL(15, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    account_status ENUM('active', 'frozen', 'closed'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Funds Table
CREATE TABLE funds (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    fund_amount DECIMAL(15, 2) NOT NULL,
    fund_type VARCHAR(100),
    deposit_date TIMESTAMP,
    maturity_date TIMESTAMP,
    interest_rate DECIMAL(5, 2),
    status ENUM('active', 'matured', 'withdrawn'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    INDEX (client_id)
);

-- Fund Requests Table
CREATE TABLE fund_requests (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    request_amount DECIMAL(15, 2) NOT NULL,
    request_type ENUM('withdrawal', 'transfer', 'advance'),
    status ENUM('pending', 'approved', 'rejected', 'completed'),
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_date TIMESTAMP,
    approved_by INT,
    rejection_reason TEXT,
    notes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id),
    INDEX (client_id, status),
    INDEX (request_date)
);

-- Transactions Table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL,
    transaction_type ENUM('deposit', 'withdrawal', 'transfer', 'interest', 'fee'),
    amount DECIMAL(15, 2) NOT NULL,
    reference_number VARCHAR(100) UNIQUE,
    description TEXT,
    balance_before DECIMAL(15, 2),
    balance_after DECIMAL(15, 2),
    status ENUM('pending', 'completed', 'failed'),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    INDEX (client_id, transaction_date),
    INDEX (status)
);

-- Notifications Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    notification_type VARCHAR(100),
    title VARCHAR(255),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX (user_id, is_read)
);

-- Audit Logs Table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INT,
    action VARCHAR(255),
    resource_type VARCHAR(100),
    resource_id INT,
    changes JSON,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX (resource_type, resource_id),
    INDEX (created_at)
);

-- Create Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_status ON clients(account_status);
CREATE INDEX idx_funds_client_id ON funds(client_id);
CREATE INDEX idx_transactions_client_id ON transactions(client_id);
