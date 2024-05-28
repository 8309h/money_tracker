const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRoutes = require('./auth');
const transactionRoutes = require('./transactions');
const budgetRoutes = require('./budgets');
const reportRoutes = require('./reports');
const categoriesRoutes = require('./categories');
const currencyRoutes = require('./currency');
require('dotenv').config()


const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT;
// const JWT_SECRET = process.env.JWT_SECRET;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);
app.use('/budgets', budgetRoutes);
app.use('/report', reportRoutes);
app.use('/categories', categoriesRoutes);
app.use('/currency', currencyRoutes);

// Health Check Route
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`; 
        res.status(200).send('Database connection is healthy');
        console.log("Conneted to the Database")
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).send('Database connection error');
    }
});


// Function to check database connection
async function checkDatabaseConnection() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        console.log('Connected to the Database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

// Check database connection at startup
checkDatabaseConnection();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
