import React from 'react';
import { Dialog } from './ui/Dialog'; // Asegúrate de crear este componente de diálogo.

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
        <select className="block border rounded p-2 mb-4" value={newMeal.mealType} onChange={e => setNewMeal({ ...newMeal, mealType: e.target.value })}>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-auto mt-4 rounded-md" />}
      </div>
      <div className="flex justify-end">
        <button onClick={addMeal} className="bg-blue-500 text-white rounded p-2">Add Meal</button>
      </div>
    </Dialog>
  );
}
