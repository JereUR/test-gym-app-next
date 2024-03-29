import Link from 'next/link'

import Search from '@/app/ui/dashboard/search/Search'
import Pagination from '@/app/ui/dashboard/pagination/Pagination'
import DeleteForm from '@/app/ui/dashboard/users/DeleteForm'
import { fetchCustomRoutines } from '../../services'
import { deleteCustomRoutine } from '../../services/actions'

const RoutinesPage = async ({ searchParams }) => {
  const q = searchParams?.q || ''
  const page = searchParams?.page || 1
  const { customRoutines, count } = await fetchCustomRoutines(q, page)

  return (
    <div className="bg-gray-800 p-5 rounded-lg mt-5 h-screen">
      <div className="flex items-center justify-between">
        <Search placeholder="Buscar una rutina..." />
        <Link href="/dashboard/routines/add">
          <button className="p-2 bg-purple-800 text-white border-none rounded-md cursor-pointer">
            Agregar Nueva
          </button>
        </Link>
      </div>
      <table className="transactions-table w-full my-6">
        <thead>
          <tr className="border-b border-gray-700">
            <td>Nombre de Rutina</td>
            <td>Descripción</td>
            <td>Creada</td>
            <td>Acción</td>
          </tr>
        </thead>
        {customRoutines.length > 0 ? (
          <tbody>
            {customRoutines.map((routine) => (
              <tr className="my-4" key={routine.id}>
                <td>
                  <div className="flex items-center gap-2">{routine.name}</div>
                </td>
                <td>{routine.description ? routine.description : '-'}</td>
                <td>
                  {routine.created_at &&
                    new Date(routine.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                </td>
                <td>
                  <div className="flex gap-2">
                    <div>
                      <Link href={`/dashboard/routines/${routine.id}`}>
                        <button className="py-1 px-2 rounded-md text-white border-none cursor-pointer bg-teal-700">
                          Ver/Editar
                        </button>
                      </Link>
                    </div>
                    <DeleteForm
                      item={routine.id}
                      onDelete={deleteCustomRoutine}
                      text={`la rutina '${routine.name}'`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="4" className="text-center italic text-2xl">
                Sin Rutinas
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <Pagination count={count} />
    </div>
  )
}

export default RoutinesPage
