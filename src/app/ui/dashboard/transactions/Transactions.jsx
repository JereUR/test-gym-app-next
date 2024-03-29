import Image from 'next/image'

const users = [
  {
    name: 'John Doe',
    imgSrc: '/noavatar.png',
    status: 'Pendiente',
    date: '14.02.2023',
    amount: '$3100'
  },
  {
    name: 'Jane Smith',
    imgSrc: '/noavatar.png',
    status: 'Completado',
    date: '16.05.2023',
    amount: '$1500'
  },
  {
    name: 'John Smith',
    imgSrc: '/noavatar.png',
    status: 'Cancelado',
    date: '26.04.2023',
    amount: '$2300'
  },
  {
    name: 'John Smith',
    imgSrc: '/noavatar.png',
    status: 'Completado',
    date: '16.05.2023',
    amount: '$1500'
  },
  {
    name: 'Jane Smith',
    imgSrc: '/noavatar.png',
    status: 'Completado',
    date: '16.05.2023',
    amount: '$1500'
  }
]

const Transactions = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-lg">
      <h1 className="mb-5 font-extralight text-gray-300 text-xl">
        Últimas Transacciones
      </h1>
      <table className="transactions-table w-full">
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Esatdo</td>
            <td>Fecha</td>
            <td>Cantidad</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <div className="flex gap-3 items-center">
                  <Image
                    className="object-cover rounded-full"
                    src={user.imgSrc}
                    alt={`${index} photo`}
                    width={40}
                    height={40}
                  />
                  {user.name}
                </div>
              </td>
              <td>
                <span
                  className={`rounded-md p-1 text-sm text-white ${
                    user.status === 'Pendiente' && 'bg-yellow-300 bg-opacity-45'
                  } ${
                    user.status === 'Completado' && 'bg-blue-100 bg-opacity-55'
                  } ${
                    user.status === 'Cancelado' && 'bg-red-400 bg-opacity-55'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>{user.date}</td>
              <td>{user.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions
