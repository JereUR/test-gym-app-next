'use client'
import { useState } from 'react'
import Image from 'next/image'
import { IoCloseCircleSharp } from 'react-icons/io5'

import dbLocal from '../../../localdb/db_local.json'

const ExerciseForm = ({
  dayIndex,
  handleSubmit,
  setShowExerciseForm,
  exerciseToEdit = null
}) => {
  const [formData, setFormData] = useState({
    zone: exerciseToEdit?.zone || '',
    name: exerciseToEdit?.name || '',
    series: exerciseToEdit?.series || '',
    count: exerciseToEdit?.count || '',
    measure: exerciseToEdit?.measure || '',
    photo: exerciseToEdit?.photo || '',
    rest: exerciseToEdit?.rest || '',
    description: exerciseToEdit?.description || ''
  })

  const handleCloseForm = () => {
    setShowExerciseForm((prevShow) => {
      const newShow = [...prevShow]
      newShow[dayIndex] = false
      return newShow
    })
  }

  const handleName = (e) => {
    const p = dbLocal.exercises[formData.zone].find(
      (ex) => ex.exercise === e.target.value
    ).photo

    setFormData({ ...formData, name: e.target.value, photo: p })
  }

  const handleSubmitExercise = (e) => {
    e.preventDefault()
    const { name, zone, series, count, measure, photo, rest, description } =
      formData

    const id = Math.random().toString(36).substring(2, 15)
    const newExercise = {
      id,
      name,
      zone,
      series: parseInt(series),
      count: parseInt(count),
      measure,
      photo,
      rest,
      description
    }
    handleSubmit(dayIndex, newExercise)
  }

  return (
    <div className="bg-gray-800 border border-gray-700 p-5 rounded-lg my-6 mx-3">
      <div className="flex justify-between mt-2 mb-5 mr-3">
        <div></div>
        <div>
          <button type="button" onClick={handleCloseForm}>
            <IoCloseCircleSharp size={32} />
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmitExercise}
        className="form-routine flex flex-wrap justify-between"
      >
        <select
          id="zone"
          name="zone"
          value={formData.zone}
          onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
        >
          <option value={null}>Seleccione una zona</option>
          {dbLocal.exercises.Zonas.map((el, index) => (
            <option value={el} key={index}>
              {el}
            </option>
          ))}
        </select>
        <select
          className="text-gray-300"
          onChange={handleName}
          id="name"
          value={formData.name}
          name="name"
        >
          <option value={null}>Seleccione un ejercicio</option>
          {formData.zone &&
            dbLocal.exercises[formData.zone].map((el, index) => (
              <option value={el.exercise} key={index}>
                {el.exercise}
              </option>
            ))}
        </select>

        {formData.photo && (
          <div className="border border-gray-700 rounded-lg p-5 mb-5 mx-auto flex items-center justify-center flex-col">
            <p>Foto ejercicio {formData.name}:</p>
            <Image
              className="mt-5"
              width={150}
              height={120}
              src={formData.photo}
              alt={`Image for ${formData.name} exercise`}
            />
          </div>
        )}
        <div className="flex flex-wrap justify-between">
          <input
            type="number"
            id="series"
            value={formData.series}
            name="series"
            placeholder="Series"
            onChange={(e) =>
              setFormData({ ...formData, series: e.target.value })
            }
          />
          <input
            type="number"
            id="count"
            value={formData.count}
            name="count"
            placeholder="Repeticiones/Segundos"
            onChange={(e) =>
              setFormData({ ...formData, count: e.target.value })
            }
          />
          <input
            type="text"
            id="measure"
            name="measure"
            value={formData.measure}
            placeholder="Medida"
            onChange={(e) =>
              setFormData({ ...formData, measure: e.target.value })
            }
          />
          <input
            type="text"
            id="rest"
            name="rest"
            value={formData.rest}
            placeholder="Descanso"
            onChange={(e) => setFormData({ ...formData, rest: e.target.value })}
          />
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            placeholder="Descripcion"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <button
          className="p-3 w-full mx-5 rounded-lg bg-purple-800 hover:bg-purple-900 transition-all duration-200 ease-in-out"
          type="submit"
        >
          Agregar
        </button>
      </form>
    </div>
  )
}

export default ExerciseForm
