const sql = require('mssql');
const config = require('../config');

const getDish = async (req, res) => {
    const { DishID } = req.params;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('DishID', sql.Int, DishID)
            .query('SELECT * FROM DISH WHERE DishID = @DishID');

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Dish not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addNewDish = async (req, res) => {
    const { BranchID, DirectoryName, DishID, DishName, Price } = req.body;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('BranchID', sql.Int, BranchID)
            .input('DirectoryName', sql.NVarChar, DirectoryName)
            .input('DishID', sql.Int, DishID)
            .input('DishName', sql.NVarChar, DishName)
            .input('Price', sql.Decimal, Price)
            .query('EXEC AddNewDish @BranchID, @DirectoryName,@DishID, @DishName, @Price');

        res.status(200).json({ message: 'Dish added successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteDish = async (req, res) => {
    const { DishID } = req.params;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('DishID', sql.Int, DishID)
            .query('EXEC DeleteDish @DishID');

        res.status(200).json({ message: 'Dish deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateDish = async (req, res) => {
    const { BranchID, DirectoryName, DishID, NewDishName, NewPrice } = req.body;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('BranchID', sql.Int, BranchID)
            .input('DirectoryName', sql.NVarChar, DirectoryName)
            .input('DishID', sql.Int, DishID)
            .input('NewDishName', sql.NVarChar, NewDishName)
            .input('NewPrice', sql.Int, NewPrice)
            .query('EXEC Update_Dish @BranchID, @DirectoryName, @DishID, @NewDishName, @NewPrice');

        res.status(200).json({ message: 'Dish updated successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getDish,
    addNewDish,
    deleteDish,
    updateDish
};