import ExerciseForm from './ExerciseForm'
import ExerciseList from './ExerciseList'

const DayContainer = ({
  day,
  dayIndex,
  exercises,
  exerciseToEdit,
  addExercise,
  editExercise,
  removeExercise,
  showExerciseForm,
  setShowExerciseForm
}) => {
  const handleAddExercise = () => {
    setShowExerciseForm((prevShow) => {
      const newShow = [...prevShow]
      newShow[dayIndex] = true
      return newShow
    })
  }

  const handleSubmit = (dayIndex, newExercise) => {
    addExercise(dayIndex, newExercise)
    setShowExerciseForm((prevShow) => {
      const newShow = [...prevShow]
      newShow[dayIndex] = false
      return newShow
    })
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <p className="text-xl text-gray-300 mb-2">{day}</p>
      {!showExerciseForm[dayIndex] && (
        <div className="flex right-10">
          <button
            className="bg-green-500 text-white p-2 m-4 rounded hover:bg-green-700"
            onClick={handleAddExercise}
          >
            Agregar ejercicio
          </button>
        </div>
      )}
      {showExerciseForm[dayIndex] && (
        <ExerciseForm
          dayIndex={dayIndex}
          handleSubmit={handleSubmit}
          setShowExerciseForm={setShowExerciseForm}
          exerciseToEdit={exerciseToEdit}
        />
      )}
      <ExerciseList
        exercises={exercises}
        editExercise={editExercise}
        removeExercise={removeExercise}
        dayIndex={dayIndex}
      />
    </div>
  )
}

export default DayContainer
