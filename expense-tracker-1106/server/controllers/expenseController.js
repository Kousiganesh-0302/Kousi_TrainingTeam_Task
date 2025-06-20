// controllers/expenseController.js
const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
    try {
        const { _page = 1, _limit = 5, q, status, _sort, _order = 'asc', date_gte,
            date_lte } = req.query;

        const filter = {};
        if (status) filter.status = status;

        if (date_gte && date_lte) {
            filter.date = {
                $gte: date_gte,
                $lte: date_lte
            };
        }
        // Search across multiple fields if q parameter exists
        if (q) {
            filter.$or = [
                { vendor: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } },
                { status: { $regex: q, $options: 'i' } },
                { id: { $regex: q, $options: 'i' } },
                { date: { $regex: q, $options: 'i' } }
            ];

            if (!isNaN(q)) {
                filter.$or.push({ amount: parseFloat(q) });
            }
        }

        const totalCount = await Expense.countDocuments(filter);

        let query = Expense.find(filter);
        if (_sort) {
            const sortOrder = _order === 'asc' ? 1 : -1;
            query = query.sort({ [_sort]: sortOrder });
        }

        // Apply pagination
        const pageNum = parseInt(_page, 10);
        const pageSize = parseInt(_limit, 10);
        query = query.skip((pageNum - 1) * pageSize).limit(pageSize);

        // Execute query
        const items = await query.exec();

        // Set headers and return response
        res.set('X-Total-Count', totalCount);
        return res.json(items);

    } catch (err) {
        console.error('Error fetching expenses:', err);
        return res.status(500).json({ error: 'Server error while fetching expenses' });
    }
  };

