import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './table.css';

const Customers = (props) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/customer/all')
      .then(response => {
        const customerData = response.data;
        setCustomers(customerData);
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    deleteCustomer(id);
  };

  const deleteCustomer = (id) => {
    axios.delete(`https://8080-ddeceafadaabefbefebaadcfefeaeaadbdbabf.project.examly.io/customer/${id}`)
      .then(response => {
        console.log(`Customer with ID ${id} deleted successfully`);
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== id));
      })
      .catch(error => {
        console.error(`Error deleting customer with ID ${id}:`, error);
      });
  };

  return (
    props.currentUser ? (
      <div className="table-container">
        {customers.length === 0 ? (
          <h1 align="center" style={{ marginTop: "170px" }}>No customers found</h1>

        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User name</th>
                <th>Phone number</th>
                <th>City</th>
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.userName}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.city}</td>
                  <td>{customer.state}</td>
                  <td>
                    <button onClick={() => handleDelete(customer.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    ) : <div />
  );
};

export default Customers;
