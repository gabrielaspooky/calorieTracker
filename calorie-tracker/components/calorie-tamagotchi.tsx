"'use client'"

import { useState, useEffect } from "'react'"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, MinusCircle, Upload, Calendar as CalendarIcon } from "'lucide-react'"

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
  mealType: "'breakfast'" | "'lunch'" | "'dinner'" | "'snack'"
}

const mealTypeColors = {
  breakfast: "'bg-orange-200'",
  lunch: "'bg-green-200'",
  dinner: "'bg-blue-200'",
  snack: "'bg-pink-200'"
}

const PixelTamagotchi = ({ mood }: { mood: "'happy'" | "'neutral'" | "'sad'" }) => {
  const [frame, setFrame] = useState(0)
  const size = 10
  const grid = Array(size).fill(null).map(() => Array(size).fill(0))

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % 2)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const happyFace = [
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
  ]

  const sadFace = [
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
  ]

  const neutralFace = [
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

  const face = mood === "'happy'" ? happyFace : mood === "'sad'" ? sadFace : neutralFace

  return (
    <div className="grid grid-cols-10 gap-0.5 w-40 h-40 mx-auto mb-4">
      {grid.map((row, i) =>
        row.map((_, j) => (
          <div
            key={`${i}-${j}`}
            className={`w-full h-full ${face[i][j] ? "'bg-primary'" : "'bg-background'"} 
                        ${frame === 1 && (i === 0 || i === size - 1 || j === 0 || j === size - 1) ? "'bg-secondary'" : "''"}`}
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
    id: "''",
    date: new Date(),
    name: "''",
    kcal: 0,
    kJ: 0,
    fat: 0,
    saturatedFat: 0,
    carbohydrates: 0,
    sugars: 0,
    protein: 0,
    salt: 0,
    tags: [],
    mealType: "'breakfast'"
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [newTag, setNewTag] = useState("''")

  useEffect(() => {
    // Cargar datos de ejemplo
    const exampleData: NutritionInfo[] = [
      { id: "'1'", date: new Date(2024, 9, 16), name: "'Desayuno'", kcal: 408, kJ: 1707, fat: 12, saturatedFat: 5, carbohydrates: 60, sugars: 10, protein: 15, salt: 1, tags: ["'saludable'"], mealType: "'breakfast'" },
      { id: "'2'", date: new Date(2024, 9, 16), name: "'Almuerzo'", kcal: 654, kJ: 2736, fat: 25, saturatedFat: 8, carbohydrates: 80, sugars: 15, protein: 30, salt: 2, tags: ["'proteína'"], mealType: "'lunch'" },
      { id: "'3'", date: new Date(2024, 9, 16), name: "'Cena'", kcal: 1108, kJ: 4636, fat: 40, saturatedFat: 12, carbohydrates: 120, sugars: 20, protein: 50, salt: 3, tags: ["'carbohidratos'"], mealType: "'dinner'" },
      { id: "'4'", date: new Date(2024, 9, 15), name: "'Desayuno'", kcal: 408, kJ: 1707, fat: 12, saturatedFat: 5, carbohydrates: 60, sugars: 10, protein: 15, salt: 1, tags: ["'rápido'"], mealType: "'breakfast'" },
      { id: "'5'", date: new Date(2024, 9, 15), name: "'Almuerzo'", kcal: 455, kJ: 1903, fat: 18, saturatedFat: 6, carbohydrates: 55, sugars: 12, protein: 25, salt: 1.5, tags: ["'vegetariano'"], mealType: "'lunch'" },
      { id: "'6'", date: new Date(2024, 9, 15), name: "'Cena'", kcal: 1401, kJ: 5860, fat: 50, saturatedFat: 15, carbohydrates: 150, sugars: 25, protein: 70, salt: 4, tags: ["'festivo'"], mealType: "'dinner'" },
    ]
    setMeals(exampleData)
  }, [])

  const caloriesConsumed = meals.filter(meal => meal.date.toDateString() === selectedDate?.toDateString()).reduce((sum, meal) => sum + meal.kcal, 0)
  const calorieDeficit = calorieGoal - caloriesConsumed

  const addMeal = () => {
    if (newMeal.name && newMeal.kcal > 0) {
      setMeals([...meals, { ...newMeal, id: Date.now().toString(), date: selectedDate || new Date() }])
      setNewMeal({
        id: "''",
        date: new Date(),
        name: "''",
        kcal: 0,
        kJ: 0,
        fat: 0,
        saturatedFat: 0,
        carbohydrates: 0,
        sugars: 0,
        protein: 0,
        salt: 0,
        tags: [],
        mealType: "'breakfast'"
      })
    }
  }

  const removeMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id))
  }

  const getTamagotchiMood = () => {
    const percentageConsumed = (caloriesConsumed / calorieGoal) * 100
    if (percentageConsumed < 80) return "'sad'"
    if (percentageConsumed > 120) return "'sad'"
    return "'happy'"
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Simulamos el procesamiento de la imagen
      setTimeout(() => {
        setNewMeal({
          ...newMeal,
          name: file.name.split("'.'")[0],
          kcal: Math.floor(Math.random() * 500) + 100,
          kJ: Math.floor(Math.random() * 2000) + 400,
          fat: Math.floor(Math.random() * 20) + 1,
          saturatedFat: Math.floor(Math.random() * 10) + 1,
          carbohydrates: Math.floor(Math.random() * 50) + 10,
          sugars: Math.floor(Math.random() * 20) + 1,
          protein: Math.floor(Math.random() * 20) + 5,
          salt: Number(Math.random().toFixed(2))
        })
        setIsDialogOpen(true)
      }, 1000)
    }
  }

  const confirmUpload = () => {
    addMeal()
    setIsDialogOpen(false)
    setImagePreview(null)
  }

  const cancelUpload = () => {
    setIsDialogOpen(false)
    setImagePreview(null)
    setNewMeal({
      id: "''",
      date: new Date(),
      name: "''",
      kcal: 0,
      kJ: 0,
      fat: 0,
      saturatedFat: 0,
      carbohydrates: 0,
      sugars: 0,
      protein: 0,
      salt: 0,
      tags: [],
      mealType: "'breakfast'"
    })
  }

  const addTag = () => {
    if (newTag && !newMeal.tags.includes(newTag)) {
      setNewMeal({ ...newMeal, tags: [...newMeal.tags, newTag] })
      setNewTag("''")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewMeal({ ...newMeal, tags: newMeal.tags.filter(tag => tag !== tagToRemove) })
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center text-neutral-900 dark:text-neutral-50">Calorie Tamagotchi</h1>
      
      <div className="flex flex-wrap justify-between items-start">
        <div className="w-full md:w-1/2 pr-4">
          <PixelTamagotchi mood={getTamagotchiMood()} />

          <div className="mb-4">
            <Label htmlFor="calorieGoal">Objetivo de calorías diarias</Label>
            <Input
              id="calorieGoal"
              type="number"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <Progress value={(caloriesConsumed / calorieGoal) * 100} className="h-2" />
            <p className="text-sm text-gray-600 mt-1">
              Calorías consumidas: {caloriesConsumed} / {calorieGoal}
            </p>
            <p className="text-sm font-semibold mt-1">
              Déficit calórico: {calorieDeficit}
            </p>
          </div>

          <div className="mb-4">
            <Label htmlFor="mealName">Nombre de la comida</Label>
            <Input
              id="mealName"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              className="mt-1"
            />
          </div>

          

          <div className="mb-4">
            <Label htmlFor="mealKcal">Calorías (kcal)</Label>
            <Input
              id="mealKcal"
              type="number"
              value={newMeal.kcal}
              onChange={(e) => setNewMeal({ ...newMeal, kcal: Number(e.target.value) })}
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="mealType">Tipo de comida</Label>
            <select
              id="mealType"
              value={newMeal.mealType}
              onChange={(e) => setNewMeal({ ...newMeal, mealType: e.target.value as NutritionInfo["'mealType'"] })}
              className="w-full mt-1 p-2 border border-neutral-200 rounded dark:border-neutral-800"
            >
              <option value="breakfast">Desayuno</option>
              <option value="lunch">Almuerzo</option>
              <option value="dinner">Cena</option>
              <option value="snack">Merienda</option>
            </select>
          </div>

          <div className="mb-4">
            <Label htmlFor="newTag">Añadir etiqueta</Label>
            <div className="flex mt-1">
              <Input
                id="newTag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={addTag} className="ml-2">Añadir</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {newMeal.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="px-2 py-1">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-2 text-xs">&times;</button>
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={addMeal} className="w-full mb-4">Agregar comida</Button>

          <div className="mb-4">
            <Label htmlFor="imageUpload" className="cursor-pointer">
              <div className="flex items-center justify-center w-full p-2 border-2 border-dashed rounded-md">
                <Upload className="w-6 h-6 mr-2" />
                <span>Subir foto de etiqueta nutricional</span>
              </div>
            </Label>
            <Input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 pl-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border border-neutral-200 shadow dark:border-neutral-800"
          />

          <div className="mt-4 space-y-2">
            {meals
              .filter(meal => meal.date.toDateString() === selectedDate?.toDateString())
              .map((meal) => (
                <div key={meal.id} className={`flex justify-between items-center p-2 rounded ${mealTypeColors[meal.mealType]}`}>
                  <span>{meal.name} - {meal.kcal} kcal</span>
                  <div>
                    {meal.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="mr-1">
                        {tag}
                      </Badge>
                    ))}
                    <Button variant="ghost" size="icon" onClick={() => removeMeal(meal.id)}>
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar información nutricional</DialogTitle>
          </DialogHeader>
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="max-w-full h-auto" />
            </div>
          )}
          {newMeal && (
            <div className="mt-4 grid gap-4">
              <div>
                <Label htmlFor="processedMealName">Nombre de la comida</Label>
                <Input
                  id="processedMealName"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="processedMealKcal">Calorías (kcal)</Label>
                <Input
                  id="processedMealKcal"
                  type="number"
                  value={newMeal.kcal}
                  onChange={(e) => setNewMeal({ ...newMeal, kcal: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="processedMealKJ">Energía (kJ)</Label>
                <Input
                  id="processedMealKJ"
                  type="number"
                  value={newMeal.kJ}
                  onChange={(e) => setNewMeal({ ...newMeal, kJ: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="processedMealFat">Grasas (g)</Label>
                <Input
                  id="processedMealFat"
                  type="number"
                  value={newMeal.fat}
                  onChange={(e) => setNewMeal({ ...newMeal, fat: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="processedMealSaturatedFat">de las cuales saturadas (g)</Label>
                <Input
                  id="processedMealSaturatedFat"
                  type="number"
                  value={newMeal.saturatedFat}
                  onChange={(e) => setNewMeal({ ...newMeal, saturatedFat: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="processedMealCarbohydrates">Hidratos de carbono (g)</Label>
                <Input
                  id="processedMealCarbohydrates"
                  type="number"
                  value={newMeal.carbohydrates}
                  onChange={(e) => setNewMeal({ ...newMeal, carbohydrates: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="processedMealSugars">de los cuales azúcares (g)</Label>
                <Input
                  id="processedMealSugars"
                  type="number"
                  value={newMeal.sugars}
                  onChange={(e) => setNewMeal({ ...newMeal, sugars: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="processedMealProtein">Proteínas (g)</Label>
                <Input
                  id="processedMealProtein"
                  type="number"
                  value={newMeal.protein}
                  onChange={(e) => setNewMeal({ ...newMeal, protein: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="processedMealSalt">Sal (g)</Label>
                <Input
                  id="processedMealSalt"
                  type="number"
                  value={newMeal.salt}
                  onChange={(e) => setNewMeal({ ...newMeal, salt: Number(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={cancelUpload} variant="outline">Cancelar</Button>
            <Button onClick={confirmUpload}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}