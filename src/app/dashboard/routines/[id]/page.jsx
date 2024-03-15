import { fetchCustomRoutine } from '@/app/services'
import UpdateCustomRoutine from './../../../ui/dashboard/routines/UpdateRoutine'

const SingleCustomRoutinePage = async ({ params }) => {
  const { id } = params
  const { customRoutine } = await fetchCustomRoutine(id)
  console.log(customRoutine)

  return (
    <div>
      <UpdateCustomRoutine data={customRoutine} />
    </div>
  )
}
export default SingleCustomRoutinePage
