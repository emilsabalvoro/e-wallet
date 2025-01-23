const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../utils/db');
const basicAuth = require('../middlewares/auth');
const router = express.Router();

// Balance Inquiry
/**
 * @swagger
 * /api/wallet/balance:
 *   get:
 *     summary: Get wallet balance
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 balance:
 *                   type: number
 */
router.get('/balance', basicAuth, (req, res) => {
  db.get(`SELECT balance FROM wallet WHERE userId = ?`, [req.userId], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, balance: row.balance });
  });
});

// Cash-in
/**
 * @swagger
 * /api/wallet/cash-in:
 *   post:
 *     summary: Cash-in to wallet
 *     security:
 *       - BasicAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 balance:
 *                   type: number
 */
router.post(
  '/cash-in',
  basicAuth,
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { amount } = req.body;
    db.run(`UPDATE wallet SET balance = balance + ? WHERE userId = ?`, [amount, req.userId], function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      db.get(`SELECT balance FROM wallet WHERE userId = ?`, [req.userId], (err, row) => {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, balance: row.balance });
      });
    });
  }
);

// Debit
/**
 * @swagger
 * /api/wallet/debit:
 *   post:
 *     summary: Debit from wallet
 *     security:
 *       - BasicAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 balance:
 *                   type: number
 */
router.post(
  '/debit',
  basicAuth,
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { amount } = req.body;
    db.get(`SELECT balance FROM wallet WHERE userId = ?`, [req.userId], (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      if (amount > row.balance) {
        return res.status(400).json({ success: false, message: 'Insufficient funds' });
      }
      db.run(`UPDATE wallet SET balance = balance - ? WHERE userId = ?`, [amount, req.userId], function(err) {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }
        db.get(`SELECT balance FROM wallet WHERE userId = ?`, [req.userId], (err, row) => {
          if (err) {
            return res.status(500).json({ success: false, message: err.message });
          }
          res.json({ success: true, balance: row.balance });
        });
      });
    });
  }
);

module.exports = router;
