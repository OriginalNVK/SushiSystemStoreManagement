const sql = require('mssql');
const connectToDB = require('../db/dbConfig'); 

const OrderOffline = {
    async getAllOrders() {
        try {
            const pool = await connectToDB(); 
            const result = await pool.request().execute('GetOrderOffline'); 
            return result.recordset;
        } catch (error) {
            throw new Error('Lỗi khi lấy tất cả đơn hàng offline: ' + error.message);
        }
    },
    
    async addOrder(orderData) {
        try {
            const pool = await connectToDB(); ;
            const result = await pool.request()
                .input('OrderID', sql.Int, orderData.OrderID)
                .input('EmployeeID', sql.Int, orderData.EmployeeID)
                .input('NumberTable', sql.Int, orderData.NumberTable)
                .input('CardID', sql.Int, orderData.CardID)
                .input('DishName', sql.NVarChar, orderData.DishName)
                .input('AmountDish', sql.Int, orderData.AmountDish)
                .input('OrderEstablishDate', sql.NVarChar, orderData.OrderEstablishDate)
                .execute('AddNewOfflineOrder');
            return result.recordset;
        } catch (error) {
            throw new Error('Lỗi khi thêm đơn hàng offline: ' + error.message);
        }
    },
    
    async updateOrder(orderID, orderData) {
        try {
            const pool = await connectToDB(); 
            const result = await pool.request()
                .input('OrderID', sql.Int, orderID)
                .input('EmployeeID', sql.Int, orderData.EmployeeID)
                .input('NumberTable', sql.Int, orderData.NumberTable)
                .input('CardID', sql.Int, orderData.CardID)
                .input('DishName', sql.NVarChar, orderData.DishName)
                .input('AmountDish', sql.Int, orderData.AmountDish)
                .input('OrderEstablishDate', sql.NVarChar, orderData.OrderEstablishDate)
                .execute('UpdateOrderOffline'); 
            return result.recordset;
        } catch (error) {
            throw new Error('Lỗi khi cập nhật đơn hàng offline: ' + error.message);
        }
    },
    
    async deleteOrder(orderID) {
        try {
            const pool = await connectToDB(); 
            await pool.request()
                .input('OrderID', sql.Int, orderID)
                .execute('DeleteOrderOffline'); 
        } catch (error) {
            throw new Error('Lỗi khi xóa đơn hàng offline: ' + error.message);
        }
    }
};

module.exports = OrderOffline;