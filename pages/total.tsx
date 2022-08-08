import { NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import Layout from '../layout/Layout';
import { useQuiosco } from '../hooks/useQuiosco';
import { formatearDinero } from '../helpers/intex';

const Total: NextPage = () => {
  const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();
 
  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === '' || nombre.length <= 3;
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido])

  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
      <p className="text-2xl my-5">Confirma tu pedido a continuación:</p>

      <form onSubmit={colocarOrden}>
        <div>
          <label className="block uppercase text-slate-800 font-bold text-xl" htmlFor="nombre">Nombre: </label>
          <input
            className="border border-gray-300 p-2 w-full lg:w-1/3 mt-3 rounded"
            id="nombre"
            type="text"
            placeholder="Nombre del cliente"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mt-10">
          <p className="text-2xl">Total a pagar {''} <span className="font-bold">{formatearDinero(total)}</span></p>
        </div>
        <div className="mt-10">
          <input
            type="submit"
            value="Confirmar Pedido"
            className={`${(comprobarPedido()) ? 'bg-indigo-200' : 'bg-indigo-600 hover:bg-indigo-800' } hover:cursor-pointer w-full lg:w-1/3 px-5 py-2 rounded uppercase font-bold text-white`}
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  )
}

export default Total;