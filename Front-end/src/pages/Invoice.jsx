import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Decorate from '../components/Decorate';
import Footer from '../components/Footer';
import { invoiceList } from '../constants';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
  const [filterInvoice, setFilterInvoice] = useState([]);
  const [searchInvoice, setSearchInvoice] = useState('');

  const searchInvoices = (e) => {
    let filtered = invoiceList;

    if (searchInvoice) {
      filtered = filtered.filter((invoice) =>
        invoice.CustomerName.toLowerCase().includes(searchInvoice.toLowerCase())
      );
    }
    setFilterInvoice(filtered);
  };

  useEffect(() => {
    searchInvoices();
  }, [searchInvoice]);
    
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleSelect = (invoiceId) => {
      setSelectedInvoice(invoiceId);
  };

    const navigate = useNavigate();
  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!selectedInvoice)
      {
          alert("Please select at least 1 invoice");
          return;
      }
      navigate(`/invoice/detail`);
    };


  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='flex flex-col'>
        <div className='flex flex-col items-center justify-center mt-5'>
          <p className='font-play text-4xl text-yellow font-bold'>INVOICE LIST</p>
          <Decorate />
        </div>
        <div className="flex flex-col lg:text-xl text-base font-play px-4 sm:px-[50px] md:px-[100px] lg:px-[450px] xl:px-[1000px] py-4">
          <input
            type="text"
            placeholder="🔍 Customer Name"
            className="border rounded-md px-2 font-bold lg:w-52 w-full sm:w-[150px] md:w-[200px]"
            value={searchInvoice}
            onChange={(e) => setSearchInvoice(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-center justify-center mt-5'>
          <table className='table text-center px-2 w-11/12 font-play shadow-lg py-4'>
            <thead className='table-header-group md:text-xl text-lg text-white bg-red'>
              <tr className='table-row'>
                <th className='table-cell border px-1'>No.</th>
                <th className='table-cell border px-1'>Customer name</th>
                <th className='table-cell border px-1'>Discount money</th>
                <th className='table-cell border px-1'>Sub total</th>
                <th className='table-cell border px-1'>Total Money</th>
                <th className='table-cell border px-1'>ACTION</th>
              </tr>
            </thead>
            <tbody className='md:text-lg text-base'>
              {filterInvoice.map((invoice, index) => {
                return (
                  <tr key={invoice.invoiceId    }>
                    <td className='border px-1'>{index + 1}</td>
                    <td className='border px-1'>{invoice.CustomerName}</td>
                    <td className='border px-1'>{invoice.DiscountMoney}</td>
                    <td className='border px-1'>{invoice.SubTotal}</td>
                    <td className='border px-1'>{invoice.SubTotal - invoice.DiscountMoney}</td>
                    <td className='border px-1'>
                      <input
                                type="radio"
                                checked={selectedInvoice === invoice.invoiceId}
                                onChange={() => handleSelect(invoice.invoiceId)}
                                className='cursor-pointer w-5 h-5 appearance-none border border-gray rounded-md checked:bg-green checked:border-transparent mt-1'
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='flex items-center m-5'>
            <button className='text-white bg-red border border-2 p-2 px-5 mt-3 rounded-lg font-play font-bold hover:text-red hover:bg-white hover:transition-all duration-300' type='submit' onClick={handleSubmit}>Create Invoice</button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Invoice;