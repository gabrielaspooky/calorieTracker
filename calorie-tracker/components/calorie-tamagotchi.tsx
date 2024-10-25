'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MinusCircle } from 'lucide-react'

interface NutritionInfo {
  id: string
  date: Date
  name: string
  kcal: number
  kJ: number
  fat: number
  saturatedFat: number
  carbohydrates: number
  sugars: number
  protein: number
  salt: number
  tags: string[]
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
}

const mealTypeColors: Record<NutritionInfo["mealType"], string> = {
  breakfast: "bg-orange-200",
  lunch: "bg-green-200",
  dinner: "bg-blue-200",
  snack: "bg-pink-200"
}

const PixelTamagotchi = ({ mood }: { mood: "happy" | "neutral" | "sad" }) => {
  const [frame, setFrame] = useState(0)
  const size = 10
  const grid = Array(size).fill(null).map(() => Array(size).fill(0))

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % 2)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const faces = {
    happy: [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,0,0,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,0],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,0,1,1,0,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,0,1,1,1,1,1,1,0,1],
      [0,0,0,1,1,1,1,0,0,0],
      [0,0,0,0,1,1,0,0,0,0],
    ],
    sad: [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,0,0,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,0],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,0,1,1,0,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [0,0,0,1,1,1,1,0,0,0],
      [0,0,1,1,1,1,1,1,0,0],
      [0,1,1,1,0,0,1,1,1,0],
    ],
    neutral: [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,0,0,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,0],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,0,1,1,0,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [0,1,1,1,1,1,1,1,1,0],
      [0,0,1,1,1,1,1,1,0,0],
    ]
  }

  const face = faces[mood]

  return (
    <div className="grid grid-cols-10 gap-0.5 w-40 h-40 mx-auto mb-4">
      {grid.map((row, i) =>
        row.map((_, j) => (
          <div
            key={`${i}-${j}`}
            className={`w-full h-full ${face[i][j] ? "bg-primary" : "bg-background"} 
                        ${frame === 1 && (i === 0 || i === size - 1 || j === 0 || j === size - 1) ? "bg-secondary" : ""}`}
          />
        ))
      )}
    </div>
  )
}

export function CalorieTamagotchiComponent() {
  const [calorieGoal, setCalorieGoal] = useState(2000)
  const [meals, setMeals] = useState<NutritionInfo[]>([])
  const [newMeal, setNewMeal] = useState<NutritionInfo>({
    id: "",
    date: new Date(),
    name: "",
    kcal: 0,
    kJ: 0,
    fat: 0,
    saturatedFat: 0,
    carbohydrates: 0,
    sugars: 0,
    protein: 0,
    salt: 0,
    tags: [],
    mealType: "breakfast"
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate] = useState<Date | undefined>(new Date())
  const [newTag, setNewTag] = useState("")



  useEffect(() => {
    const exampleData: NutritionInfo[] = [
      { id: "1", date: new Date(2024, 9, 16), name: "Desayuno", kcal: 408, kJ: 1707, fat: 12, saturatedFat: 5, carbohydrates: 60, sugars: 10, protein: 15, salt: 1, tags: ["saludable"], mealType: "breakfast" },
      { id: "2", date: new Date(2024, 9, 16), name: "Almuerzo", kcal: 654, kJ: 2736, fat: 25, saturatedFat: 8, carbohydrates: 80, sugars: 15, protein: 30, salt: 2, tags: ["proteína"], mealType: "lunch" },
      { id: "3", date: new Date(2024, 9, 16), name: "Cena", kcal: 1108, kJ: 4636, fat: 40, saturatedFat: 12, carbohydrates: 120, sugars: 20, protein: 50, salt: 3, tags: ["carbohidratos"], mealType: "dinner" }
    ]
    setMeals(exampleData)
  }, [])

  const caloriesConsumed = meals.filter(meal => meal.date.toDateString() === selectedDate?.toDateString()).reduce((sum, meal) => sum + meal.kcal, 0)
  const calorieDeficit = calorieGoal - caloriesConsumed

  const addMeal = () => {
    if (newMeal.name && newMeal.kcal > 0) {
      setMeals([...meals, { ...newMeal, id: Date.now().toString(), date: selectedDate || new Date() }])
      setNewMeal({
        id: "",
        date: new Date(),
        name: "",
        kcal: 0,
        kJ: 0,
        fat: 0,
        saturatedFat: 0,
        carbohydrates: 0,
        sugars: 0,
        protein: 0,
        salt: 0,
        tags: [],
        mealType: "breakfast"
      })
    }
  }

  const removeMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id))
  }

  const getTamagotchiMood = () => {
    const percentageConsumed = (caloriesConsumed / calorieGoal) * 100
    if (percentageConsumed < 80 || percentageConsumed > 120) return "sad"
    return "happy"
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const addTag = () => {
    if (newTag && !newMeal.tags.includes(newTag)) {
      setNewMeal({ ...newMeal, tags: [...newMeal.tags, newTag] })
      setNewTag("")
    }
  }

  return (
    <div>
      <div className="bg-secondary p-6 rounded-md shadow-lg">
        <h2 className="text-center text-lg font-bold mb-2">Daily Calorie Goal: {calorieGoal} kcal</h2>
        <PixelTamagotchi mood={getTamagotchiMood()} />
        <Progress value={(caloriesConsumed / calorieGoal) * 100} className="mb-4" />
        <p className="text-center text-sm">{calorieDeficit >= 0 ? `Remaining: ${calorieDeficit} kcal` : `Surplus: ${-calorieDeficit} kcal`}</p>
      </div>

      <div className="mt-4">
        <Button onClick={() => setIsDialogOpen(true)}>Add Meal</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Meal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Name</Label>
            <Input placeholder="Meal Name" value={newMeal.name} onChange={e => setNewMeal({ ...newMeal, name: e.target.value })} />
            
            <Label>Calories</Label>
            <Input type="number" placeholder="Calories (kcal)" value={newMeal.kcal} onChange={e => setNewMeal({ ...newMeal, kcal: parseFloat(e.target.value) })} />
            
            <Label>Meal Type</Label>
            <select value={newMeal.mealType} onChange={e => setNewMeal({ ...newMeal, mealType: e.target.value as NutritionInfo["mealType"] })}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>

            <Label>Tags</Label>
            <div className="flex">
              <Input placeholder="Add tag" value={newTag} onChange={e => setNewTag(e.target.value)} />
              <Button onClick={addTag} className="ml-2">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {newMeal.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="flex items-center space-x-2">
                  {tag}
                  <MinusCircle size={16} className="cursor-pointer" onClick={() => setNewMeal({ ...newMeal, tags: newMeal.tags.filter(t => t !== tag) })} />
                </Badge>
              ))}
            </div>

            <Label>Upload Image</Label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-auto mt-4 rounded-md shadow" />}
          </div>
          <DialogFooter>
            <Button onClick={() => { addMeal(); setIsDialogOpen(false) }}>Add Meal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-6 space-y-2">
        {meals.map(meal => (
          <div key={meal.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className={`${mealTypeColors[meal.mealType]} px-2 py-1 rounded`}>{meal.mealType}</span>
              <div>
                <h3 className="text-md font-semibold">{meal.name}</h3>
                <p className="text-sm text-gray-600">{meal.kcal} kcal</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => removeMeal(meal.id)}>Remove</Button>
            <Label>Daily Calorie Goal</Label>
<Input
  type="number"
  value={calorieGoal}
  onChange={(e) => setCalorieGoal(Number(e.target.value))}
/>

          </div>
        ))}
      </div>
    </div>
  )
}
