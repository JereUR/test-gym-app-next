import Image from 'next/image'

import { updateUser } from '@/app/services/actions'
import { fetchUser } from '@/app/services'

const SingleUserPage = async ({ params }) => {
  const { id } = params
  const { user } = await fetchUser(id)
  const { username, email, password, img, phone, address, isAdmin, isActive } =
    user
  return (
    <div className="flex gap-12 mt-5">
      <div className="w-1/4 bg-gray-800 p-5 rounded-lg font-bold text-gray-300 h-max">
        <div className="w-full h-80 relative rounded-lg overflow-hidden mb-5">
          <Image
            src={img ? img : '/noavatar.png'}
            alt={`${username} image`}
            fill
          />
        </div>
        {username}
      </div>
      <div className="w-3/4 bg-gray-800 p-5 rounded-lg">
        <form action={updateUser} className="user-form flex flex-col">
          <input type="hidden" name="id" value={id} />
          <label>Nombre</label>
          <input
            type="text"
            name="username"
            placeholder={username}
            defaultValue={username}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder={email}
            defaultValue={email}
          />
          <label>Contraseña</label>
          <input type="password" name="password" defaultValue={password} />
          <input type="hidden" name="originalPassword" value={password} />
          <label>Teléfono</label>
          <input
            type="text"
            name="phone"
            placeholder={phone}
            defaultValue={phone}
          />
          <label>Dirección</label>
          <textarea
            name="address"
            placeholder={address}
            defaultValue={address}
          ></textarea>
          <label>Es Admin?</label>
          <select
            name="isAdmin"
            id="isAdmin"
            className="cursor-pointer"
            defaultValue={isAdmin}
          >
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </select>
          <label>Está Activo?</label>
          <select
            name="isActive"
            id="isActive"
            className="cursor-pointer"
            defaultValue={isActive}
          >
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </select>
          <button className="w-full p-5 bg-teal-700 text-white border-none rounded-md cursor-pointer mt-5">
            Actualizar
          </button>
        </form>
      </div>
    </div>
  )
}

export default SingleUserPage
