import React, { useState } from 'react'
import Input from '../Inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'


const AddIncomeForm = ({ onAddIncome }) => {

  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    icon: '',
  })

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value })
  }

  return (
    <div>
    
      <EmojiPickerPopup                  //defined in /components/EmojiPickerPopup.jsx
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />



      <Input
        value={income.source}
        onChange={(e) => handleChange('source', e.target.value)}           //defined above
        label="Income Source"
        placeholder="Freelance, Salary, etc."
        type="text"
      />

      <Input
        value={income.amount}
        onChange={(e) => handleChange('amount', e.target.value)}           //defined above
        label="Amount"
        placeholder="Amount"
        type="number"
      />

      <Input
        value={income.date}
        onChange={(e) => handleChange('date', e.target.value)}           //defined above
        label="Date"
        placeholder="Select Date"
        type="date"
      />

      <div className='flex justify-end mt-6'>
        <button type='button' onClick={() => onAddIncome(income)} className='bg-primary text-white px-3 text-md py-2 rounded-md hover:bg-purple-600'>
          Add Income
        </button>
      </div>

    </div>

  )
}

export default AddIncomeForm