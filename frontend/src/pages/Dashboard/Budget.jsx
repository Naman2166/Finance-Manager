import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { LuUtensils, LuPlane, LuFilm, LuPlus, LuTrash2 } from 'react-icons/lu'
import { useBudget } from '../../context/BudgetContext'



const iconMap = {
  Food: <LuUtensils className="text-3xl text-orange-500" />,
  Travel: <LuPlane className="text-3xl text-blue-500" />,
  Movie: <LuFilm className="text-3xl text-purple-500" />,
}

const Budget = () => {
  const { budgets, loading, addBudget, deleteBudget } = useBudget();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    budget: '',
  });
  
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!formData.category.trim() || !formData.budget) return;
    await addBudget(formData.category, Number(formData.budget));
    setFormData({ category: '', budget: '' });
    setShowForm(false);
  };
  

  return (
    <DashboardLayout activeMenu="Budget Manager">
      <div className="my-8 mx-8">
        
        <h2 className="text-2xl font-bold mb-6 text-center">Category-wise Budget Manager</h2>
        
        <div className="flex justify-end mb-6">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-medium text-base hover:bg-purple-700 transition"
            onClick={() => setShowForm((v) => !v)}
          >
            <LuPlus className="text-lg" /> Add Category
          </button>
        </div>

        <div></div>

        {showForm && (
          <form onSubmit={handleAddCategory} className="bg-white shadow-md rounded-lg p-5 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Category Name (e.g. Food)"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                required
                className="text-sm border-2 border-gray-400 p-2 px-3 rounded-xl"
              />
              <input
                type="number"
                placeholder="Budget"
                value={formData.budget}
                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                required
                className="text-sm border-2 border-gray-400 p-2 px-3 rounded-xl"
              />
              
             </div>

            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-4 py-1.5 rounded-xl hover:bg-green-700"
            >
              Save Category
            </button>
          </form>
        )}

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : Array.isArray(budgets) && budgets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 ">
            {budgets.map((item) => {
              const percent = Math.min(100, Math.round((item.expense / item.budget) * 100))
              return (
                <div key={item.category} className="bg-white rounded-xl shadow-lg shadow-gray-500 p-4 flex flex-col items-center relative">
                  <button
                    onClick={() => deleteBudget(item.category)}
                    className="absolute top-3 right-3 text-red-600 hover:text-red-800"
                    title="Delete Category"
                  >
                    <LuTrash2 className='text-2xl cursor-pointer' />
                  </button>
                  
                  <h3 className="text-lg font-semibold mb-2">{item.category}</h3>
                  <div className="w-full mb-2">
                    
                    <div className='text-sm mb-1 text-gray-500 font-medium'>Budget : <span className='text-gray-600 ml-0.5'>₹{item.budget}</span> </div>
                    <div className='text-sm mb-4 text-gray-500 font-medium'>Spent : <span className='text-gray-600 ml-0.5'>₹{item.expense}</span></div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                      <div
                        className={`h-3 rounded-full ${percent < 80 ? 'bg-green-400' : percent < 100 ? 'bg-yellow-400' : 'bg-red-500'}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right mt-1 font-medium text-gray-600">{percent}% used</div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500">No budgets found.</div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default Budget
