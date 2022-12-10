import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

import './listDetails.css';
import IDataList from '../model/IDataList';
import { getItems } from '../services/menu';
import { getIndividualAmountPaid, getSettlementPayee, persons } from '../utils/expenses';
import IIndividualData from '../model/IIndividualData';
import { ISettlementData } from '../model/ISettlementData';

function ListDetails() {
  const [expenses, setExpenses] = useState<IDataList[]>([]);
  const [individualsData, setIndividualsData] = useState<IIndividualData>({});
  const [settlementPayee, setSettlementPayee] = useState<ISettlementData | null>(null);
  useEffect(() => {
    getItems().then(resp => {
      setExpenses(resp)
      const individualAmounts = getIndividualAmountPaid(resp)
      setIndividualsData(individualAmounts);
      setSettlementPayee(getSettlementPayee(individualAmounts));
    }).catch(e => {
      alert(`Please check your json server: ${e.message}`)
    })
  }, [])
  const navigate = useNavigate();
  return (
    <div className="App">
      <h4>Expenses Tracker</h4>
      <div className="items-container">
        <Table  striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product Purchased</th>
              <th>Price</th>
              <th>Payee</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => {
              return <tr>
                <td>{expense['setDate']}</td>
                <td>{expense['product']}</td>
                <td>Rs. {expense['price']}</td>
                <td>{expense['payeeName']}</td>
            </tr>
            })}
          </tbody>
        </Table>
        <Button onClick={() => {
          navigate('add');
          }}>Add</Button>
      </div>
      <div className="items-container">
        <Table variant='success'>
            {Object.keys(individualsData).map(individualName => {
              return <tbody key={individualName}>
              <tr>
                  <td>{individualName} {persons.includes(individualName) && 'paid'}</td>
                  <td>Rs. {individualsData[individualName]}</td>
              </tr>
            </tbody>
            })}
            <tbody>
              <tr>
                  <td>{settlementPayee?.payor} will pay {settlementPayee?.payee}</td>
                  <td>Rs. {settlementPayee?.amount}</td>
              </tr>
            </tbody>
          </Table>
      </div>
    </div>
  );
}

export default ListDetails;
