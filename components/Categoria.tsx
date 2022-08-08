import React from 'react'
import { Categoria as CategoriaType } from '../types/api/categorias';
import Image from 'next/image';
import { useQuiosco } from '../hooks/useQuiosco';

interface CategoriaProps { 
  categoria: CategoriaType
}

const Categoria = ({ categoria }: CategoriaProps) => {
  const { categoriaActual, handleClickCategoria } = useQuiosco();
  const { nombre, icono, id } = categoria;

  return (
    <div
      className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:cursor-pointer`}
      onClick={() => handleClickCategoria(id)}
    >
      <Image
        width={70}
        height={70}
        src={`/assets/img/icono_${icono}.svg`}
        alt={`Icono de la categoría ${nombre}`}
      />
      <button
        type="button"
        className="text-2xl font-bold hover:cursor-pointer"
      >
        {nombre}
      </button>
    </div>
  )
}

export default Categoria;