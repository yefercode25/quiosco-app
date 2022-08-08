import { Producto as ProductoType } from "../types/api/categorias"
import Image from 'next/image';
import { formatearDinero } from '../helpers/intex';
import { useQuiosco } from '../hooks/useQuiosco';

interface ProductoProps { 
  producto: ProductoType
}

const Producto = ({ producto }: ProductoProps) => {
  const { handleSetProducto, handleOpenModal } = useQuiosco();
  const { nombre, imagen, precio } = producto;

  return (
    <div className="border p-3">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen de ${nombre}`}
        width={400}
        height={500}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
          onClick={() => {
            handleSetProducto(producto);
            handleOpenModal();
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  )
}

export default Producto;