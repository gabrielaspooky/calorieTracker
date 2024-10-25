"use client"
import React, { useState, useEffect } from 'react';
import CalorieDisplay from '../components/CalorieDisplay';
import MealDialog from '../components/MealDialog';
import MealList from '../components/MealList';
import Button from "../components/ui/Button"; 

export default function CalorieTamagotchi() {
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({
    id: "",
    name: "",
    kcal: 0,
    mealType: "breakfast",
    tags: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Datos de ejemplo
    const exampleData = [
      { id: "1", name: "Desayuno", kcal: 408, mealType: "breakfast" },
      { id: "2", name: "Almuerzo", kcal: 654, mealType: "lunch" },
      { id: "3", name: "Cena", kcal: 1108, mealType: "dinner" },
    ];
    setMeals(exampleData);
  }, []);

  const caloriesConsumed = meals.reduce((sum, meal) => sum + meal.kcal, 0);
  const calorieDeficit = calorieGoal - caloriesConsumed;

  const addMeal = () => {
    if (newMeal.name && newMeal.kcal > 0) {
      setMeals([...meals, { ...newMeal, id: Date.now().toString() }]);
      setNewMeal({ id: "", name: "", kcal: 0, mealType: "breakfast", tags: [] });
      setIsDialogOpen(false);
    }
  };

  const removeMeal = (id) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  return (
    <div className="p-6">
      <CalorieDisplay calorieGoal={calorieGoal} caloriesConsumed={caloriesConsumed} calorieDeficit={calorieDeficit} />
      <div className="mt-4">
        <Button onClick={() => setIsDialogOpen(true)}>Add Meal</Button>
      </div>
      <MealDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        newMeal={newMeal}
        setNewMeal={setNewMeal}
        addMeal={addMeal}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
      />
      <MealList meals={meals} removeMeal={removeMeal} />
      <div className="mt-4">
        <label className="block">Daily Calorie Goal</label>
        <input
          type="number"
          value={calorieGoal}
          onChange={(e) => setCalorieGoal(Number(e.target.value) || 2000)}
          className="input-class" // Asegúrate de definir estilos para esta clase.
        />
      </div>
    </div>
  );
}
