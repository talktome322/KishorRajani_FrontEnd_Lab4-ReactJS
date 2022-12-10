import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { addNewItem } from '../services/menu';
import { persons } from '../utils/expenses';
import './addItem.css';

function AddItem() {
  const [product, setProduct] = useState('');
  const [payee, setPayee] = useState('');
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const onSubmit = () => {
    if(!product || !payee || !price || !date) {
        alert('All the Fields are mandatory');
    } else {
        addNewItem({
            setDate: date,
            price: price,
            payeeName: payee,
            product: product
        }).then(_resp => {
            navigate('/')
        }).catch(e => {
            alert(`Please check your json server: ${e.message}`)
        })
    }
  }
  const validateAndSetDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const todayDate = new Date();
    const date = todayDate.getDate();
    const month = todayDate.getMonth() + 1;
    const year = todayDate.getFullYear();
    if(new Date(e.target.value) <= new Date(`${year}-${month}-${date}`)) {
        setDate(e.target.value)
    } else {
        alert('Future Purchases are not valid. Please select a valid date.')
    }
  }
  return (
    <div className='form-container'>
        <div className='header'>
            <h4>Add New Item</h4>
            <p className='important'>Read the below instructions before proceeding:</p>
            <p>Make sure you fill all the fields where * is provided</p>
        </div>
        <Form onSubmit={(e) => {
            e.preventDefault();
            onSubmit()}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name*</Form.Label>
            <Form.Select onChange={(e) => setPayee(e.target.value)} aria-label="Default select example">
                <option>Please select a person</option>
                {persons.map(person => <option value={person}>{person}</option>)}
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Product Purchased*</Form.Label>
            <Form.Control onChange={(e) => setProduct(e.target.value)} type="input" placeholder="Enter Product Purchased" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control onChange={(e) => setPrice(+e.target.value)} type="number" placeholder="Price" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date*</Form.Label>
            <Form.Control  onChange={validateAndSetDate} value={date} type="date" placeholder="Password" />
        </Form.Group>
        <div className='action-buttons'>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Button variant="primary" onClick={() => navigate('/')}>
                Close
            </Button>
        </div>
        </Form>
    </div>
  );
}

export default AddItem;