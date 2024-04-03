import Image from 'next/image'
import MenuLink from './menuLink/MenuLink'
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout
} from 'react-icons/md'
import { GiAbdominalArmor, GiMeal, GiProfit } from 'react-icons/gi'
import { FaRegFilePdf } from 'react-icons/fa6'

const menuItems = [
  {
    title: 'Pages',
    list: [
      {
        title: 'Panel',
        path: '/dashboard',
        icon: <MdDashboard />
      },
      {
        title: 'Usuarios',
        path: '/dashboard/users',
        icon: <MdSupervisedUserCircle />
      },
      {
        title: 'Rutinas',
        path: '/dashboard/routines',
        icon: <GiAbdominalArmor />
      },
      {
        title: 'Planes Nutricionales',
        path: '/dashboard/nutricional-planning',
        icon: <GiMeal />
      },
      {
        title: 'Productos',
        path: '/dashboard/products',
        icon: <MdShoppingBag />
      },
      {
        title: 'Generador de PDF',
        path: '/dashboard/pdf-generator',
        icon: <FaRegFilePdf />
      }
    ]
  },
  {
    title: 'Analítica',
    list: [
      {
        title: 'Ganancias',
        path: '/dashboard/revenue',
        icon: <GiProfit />
      },
      {
        title: 'Reportes',
        path: '/dashboard/reports',
        icon: <MdAnalytics />
      },
      {
        title: 'Equipo',
        path: '/dashboard/teams',
        icon: <MdPeople />
      }
    ]
  },
  {
    title: 'Usuario',
    list: [
      {
        title: 'Configuraciones',
        path: '/dashboard/settings',
        icon: <MdOutlineSettings />
      },
      {
        title: 'Ayuda',
        path: '/dashboard/help',
        icon: <MdHelpCenter />
      }
    ]
  }
]

const SideBar = async () => {
  return (
    <div className="sticky top-10">
      <div className="flex items-center gap-5 mb-5">
        <Image
          className="rounded-full object-cover"
          src="/noavatar.png"
          alt="avatar-img"
          width="50"
          height="50"
        />
        <div className="flex flex-col">
          <span className="font-medium">Username</span>
          <span className="text-xs text-gray-300">Administrator</span>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="text-gray-300 font-bold text-sm my-10 mx-0">
              {cat.title}
            </span>
            {cat.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button className="p-5 flex items-center gap-2 my-1 mx-0 rounded-lg hover:bg-gray-700 bg-none border-none w-full text-white cursor-pointer">
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  )
}

export default SideBar
