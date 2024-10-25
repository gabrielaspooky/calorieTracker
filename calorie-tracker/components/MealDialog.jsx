import React from 'react';
import { Dialog } from './ui/Dialog'; 
import { Select, SelectItem } from "@nextui-org/react";

const mealTypes = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snack", label: "Snack" },
  ];

export default function MealDialog({ isOpen, onClose, newMeal, setNewMeal, addMeal, setImagePreview, imagePreview }) {
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-4">Add a New Meal</h3>
        <label>Name</label>
        <input className="block border rounded p-2 mb-4" placeholder="Meal Name" value={newMeal.name} onChange={e => setNewMeal({ ...newMeal, name: e.target.value })} />
        <label>Calories</label>
        <input type="number" className="block border rounded p-2 mb-4" placeholder="Calories (kcal)" value={newMeal.kcal} onChange={e => setNewMeal({ ...newMeal, kcal: parseFloat(e.target.value) || 0 })} />
        
        
        <label>Meal Type</label>


        <Select
  value={newMeal.mealType}
  onChange={(value) => setNewMeal({ ...newMeal, mealType: value })}
  className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 mb-4 max-w-xs transition duration-200 ease-in-out"
>
  {mealTypes.map((mealType) => (
    <SelectItem className="cursor:pointer" key={mealType.value} value={mealType.value}>
      {mealType.label}
    </SelectItem>
  ))}
</Select>

<br />


<div className="mb-6">
  <label className="block text-gray-700 font-semibold mb-2">
Sube la etiqueta nutricional
  </label>
  <input
    type="file"
    accept=".png, .jpg, .jpeg"
    onChange={handleImageUpload}
    className="block w-full text-sm text-gray-500 
               file:mr-4 file:py-2 file:px-4 
               file:rounded-md file:border-0 
               file:text-sm file:font-semibold 
               file:bg-blue-100 file:text-blue-700 
               hover:file:bg-blue-200 transition duration-200"
  />
  {imagePreview && (
    <img
      src={imagePreview}
      alt="Preview"
      className="mt-4 w-full h-auto rounded-md shadow-lg"
    />
  )}
</div>
<div className="flex justify-end">

</div>
       
       
        <button onClick={addMeal} className="bg-blue-500 text-white rounded p-2">Añadir comida</button>
      </div>
    </Dialog>
  );
}
