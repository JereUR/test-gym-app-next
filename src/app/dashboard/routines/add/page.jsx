'use client'
import { useState } from 'react'

import DayContainer from '../../../ui/dashboard/routines/DayContainer'
import { addCustomRoutine } from '@/app/services/actions'

const AddCustomRoutinePage = () => {
  const [days, setDays] = useState([
    { day: 'Lunes', exercises: [] },
    { day: 'Martes', exercises: [] },
    { day: 'Miércoles', exercises: [] },
    { day: 'Jueves', exercises: [] },
    { day: 'Viernes', exercises: [] },
    { day: 'Sábado', exercises: [] },
    { day: 'Domingo', exercises: [] }
  ])
  const [showExerciseForm, setShowExerciseForm] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [exerciseToEdit, setExerciseToEdit] = useState(null)

  const addExercise = (dayIndex, newExercise) => {
    const newDays = [...days]
    const dayExercises = newDays[dayIndex].exercises
    newDays[dayIndex].exercises = [...dayExercises, newExercise]
    setDays(newDays)
  }

  const editExercise = (dayIndex, exercise) => {
    removeExercise(dayIndex, exercise.id)
    setExerciseToEdit(exercise)
    setShowExerciseForm((prevShow) => {
      const newShow = [...prevShow]
      newShow[dayIndex] = true
      return newShow
    })
  }

  const removeExercise = (dayIndex, id) => {
    const newDays = [...days]
    const newDayExercises = days[dayIndex].exercises.filter(
      (ex) => ex.id !== id
    )
    newDays[dayIndex].exercises = newDayExercises
    setDays(newDays)
  }

  const createRoutine = (event) => {
    event.preventDefault()
    const id = Math.random().toString(36).substring(2, 15)
    const routineData = {
      id,
      name,
      days,
      description
    }
    addCustomRoutine(routineData)
  }

  return (
    <div className="container mx-auto my-3">
      <p className="text-2xl p-2 text-gray-300">Crear rutina</p>
      <form onSubmit={createRoutine} className="form-custom-routine px-2 py-6">
        <input
          type="text"
          placeholder="Nombre de la rutina"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button className="p-4 absolute top-45 right-10 bg-purple-800 hover:bg-purple-900 text-white border-none rounded-md cursor-pointer">
          Crear rutina
        </button>
      </form>
      <div className=" flex flex-col">
        {days.map((day, dayIndex) => (
          <DayContainer
            key={day.day}
            day={day.day}
            dayIndex={dayIndex}
            exercises={day.exercises}
            addExercise={addExercise}
            editExercise={editExercise}
            removeExercise={removeExercise}
            showExerciseForm={showExerciseForm}
            setShowExerciseForm={setShowExerciseForm}
            exerciseToEdit={exerciseToEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default AddCustomRoutinePage
