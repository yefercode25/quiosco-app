import Image from 'next/image';
import { PedidoItem } from '../types/api/categorias';
import { formatearDinero } from '../helpers/intex';
import { useQuiosco } from '../hooks/useQuiosco';

interface IResumenProducto {
  item: PedidoItem
}

const ResumenProducto = ({ item }: IResumenProducto) => {
  const { handleSetCantidad, handleEliminarItem } = useQuiosco();

  return (
    <div className="shadow p-5 mb-3 flex gap-10 items-center rounded">
      <div className="md:w-1/6">
        <Image
          className="rounded"
          width={300}
          height={400}
          alt={`Imagen del producto ${item.producto.nombre}`}
          src={`/assets/img/${item.producto.imagen}.jpg`}
        />
      </div>
      <div className="md:w-4/6">
        <p className="text-3xl font-bold">{item.producto.nombre}</p>
        <p className="text-xl font-bold">Cantidad: {item.cantidad}</p>
        <p className="text-xl font-bold text-amber-500">Precio: {formatearDinero(item.producto.precio)}</p>
        <p className="text-sm text-gray-600 font-bold">Subtotal: {formatearDinero(item.producto.precio * item.cantidad)}</p>
      </div>
      <div>
        <button
          type="button"
          className="bg-sky-700 hover:bg-sky-900 flex justify-center px-5 py-2 text-white rounded font-bold uppercase shadow w-full"
          onClick={() => handleSetCantidad(item.producto.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Editar
        </button>
        <button
          type="button"
          className="bg-red-700 hover:bg-red-900 flex justify-center px-5 py-2 text-white rounded font-bold uppercase shadow w-full text-center mt-3"
          onClick={() => handleEliminarItem(item.producto.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default ResumenProducto;