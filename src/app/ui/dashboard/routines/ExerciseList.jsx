import React from 'react'
import Image from 'next/image'

const ExerciseList = ({
  exercises,
  editExercise,
  removeExercise,
  dayIndex
}) => {
  // Handle empty exercise list gracefully
  if (!exercises || exercises.length === 0) {
    return (
      <div className="text-center">
        <p className="italic font-extralight">Sin ejercicios.</p>
      </div>
    )
  }

  return (
    <ul className="">
      {exercises.map((exercise, index) => {
        return (
          <li
            key={exercise.id}
            className="rounded p-3 m-3 w-full bg-gray-700" // Adjust width as needed
          >
            <div className="flex justify-between items-end m-3 mb-5">
              <div className="text-center p-2">
                <p className="text-xl font-bold text-orange-600">
                  {index + 1} - {exercise.name}
                </p>
              </div>
              <div className="flex items-end">
                <button
                  className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-600 hover:text-gray-200 transition-all duration-200 ease-out"
                  onClick={() => editExercise(dayIndex, exercise)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded ml-2 hover:bg-red-600 hover:text-gray-200 transition-all duration-200 ease-out"
                  onClick={() => removeExercise(dayIndex, exercise.id)}
                >
                  Borrar
                </button>
              </div>
            </div>
            <div className="flex justify-between mx-5 my-2">
              <div className="p-2">
                <p className="font-bold text-gray-300">Serie</p>
                <p className="font-extralight">
                  {exercise.series} x {exercise.count} {exercise.measure}
                </p>
              </div>
              <div className="p-2">
                <p className="font-bold text-gray-300">Descanso</p>
                <p className="font-extralight">{exercise.rest}</p>
              </div>
              <div className="p-2">
                <p className="font-bold text-gray-300">Descripción</p>
                <p className="font-extralight">{exercise.description}</p>
              </div>
              <div className="p-2">
                <Image
                  width={80}
                  height={60}
                  src={exercise.photo}
                  alt={`Image for ${exercise.name} exercise`}
                />
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ExerciseList
