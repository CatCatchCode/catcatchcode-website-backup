const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Payment = require('../models/Payment');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Export data to CSV
// @route   GET /api/admin/export/:type
// @access  Private/Admin
const exportData = async (req, res) => {
    try {
        const { type } = req.params;
        let data = [];
        let fields = [];
        let fileName = '';

        if (type === 'payments') {
            const payments = await Payment.find({})
                .populate('user', 'name email')
                .populate('course', 'title price');
            
            data = payments.map(p => ({
                id: p._id,
                user: p.user?.name || 'N/A',
                email: p.user?.email || 'N/A',
                course: p.course?.title || 'N/A',
                amount: p.amount,
                status: p.status,
                date: p.createdAt.toISOString().split('T')[0]
            }));

            fields = [
                { id: 'id', title: 'Payment ID' },
                { id: 'user', title: 'User Name' },
                { id: 'email', title: 'User Email' },
                { id: 'course', title: 'Course' },
                { id: 'amount', title: 'Amount' },
                { id: 'status', title: 'Status' },
                { id: 'date', title: 'Date' }
            ];
            fileName = 'payments_report.csv';

        } else if (type === 'users') {
            const users = await User.find({ role: 'user' });
            data = users.map(u => ({
                id: u._id,
                name: u.name,
                email: u.email,
                joined: u.createdAt.toISOString().split('T')[0],
                status: u.isBlocked ? 'Blocked' : 'Active'
            }));

            fields = [
                { id: 'id', title: 'User ID' },
                { id: 'name', title: 'Name' },
                { id: 'email', title: 'Email' },
                { id: 'joined', title: 'Joined Date' },
                { id: 'status', title: 'Status' }
            ];
            fileName = 'users_report.csv';
        } else {
            return res.status(400).json({ message: 'Invalid export type' });
        }

        const filePath = path.join(__dirname, `../${fileName}`);
        
        const csvWriter = createCsvWriter({
            path: filePath,
            header: fields
        });

        await csvWriter.writeRecords(data);

        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Download error:', err);
            }
            // Optional: Delete file after download
            // fs.unlinkSync(filePath); 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { exportData };
