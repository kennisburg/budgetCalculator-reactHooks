import React, {useState} from 'react';

import uuid from 'uuid/v4';

import './App.css';

import Alert from './components/Alert'
import Form from './components/ExpenseForm'
import List from './components/ExpenseList'




const initialExpenses = [
  {id:uuid(), charge:'rent', amount:1200},
  {id:uuid(), charge:'car insurance', amount:300},
  {id:uuid(), charge:'credit card bill', amount:500}
];



function App() {

  const [expenses, setExpenses] = useState(initialExpenses)

  const [charge, setCharge] = useState('');

  const [amount, setAmount] = useState('');

  const [alert, setAlert] = useState({show:false});

  const [edit, setEdit] = useState(false);

  const [id, setId] = useState(0);


  const handleCharge = e => {
    setCharge(e.target.value);
  }

  const handleAmount = e => {
    setAmount(e.target.value);
  }

  const handleAlert = ({type, text}) => {
    setAlert({show:true, type, text});
    setTimeout(() => {setAlert({show:false})}, 5000)
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0) {

      if(edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({type: 'success', text: 'Item edited'})
      } else {
        const singleExpense = {id: uuid(), charge, amount}
        setExpenses([...expenses, singleExpense])
        handleAlert({type:'success', text:'Item Added'});
      }

      setCharge('');
      setAmount('');
      
    } else {
      handleAlert({type:'danger', text:'Charge cannot be empty and Amount must be greater than 0'})
    }
  }

  const clearItems = () => {
    setExpenses([])
    handleAlert({type: 'success', text: 'All items cleared'})
  }

  const handleDelete = id => {
    let tempExpenses = expenses.filter(item => item.id !== id)
    setExpenses(tempExpenses)
    handleAlert({type: 'success', text: 'Item deleted'})

  }

  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id)
  }



  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
    <Alert/>

    <h1>Budget Calculator</h1>

    <main className='App'>
      <Form charge={charge} amount={amount} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit} edit={edit}/>
      <List expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems}/>
    </main>
    <h1>
      Total: <span className='total'>${expenses.reduce((acc, curr) => {
        return (acc += parseInt(curr.amount))
      }, 0)}
      </span>
    </h1>
    </>
  )
}

export default App;
