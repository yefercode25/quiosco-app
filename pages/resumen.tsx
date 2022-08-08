import { NextPage } from 'next';
import React from 'react'
import Layout from '../layout/Layout';
import { useQuiosco } from '../hooks/useQuiosco';
import ResumenProducto from '../components/ResumenProducto';

const Resumen: NextPage = () => {
  const { pedido } = useQuiosco();

  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-5">Revisa tu pedido</p>

      {pedido.length === 0 ? (
        <p className="text-center text-2xl">No hay elemetos en tú pedido</p>
      ) : (
        pedido.map((producto) => (
          <ResumenProducto key={producto.producto.id} item={producto} />
        ))
      )}
    </Layout>
  )
}

export default Resumen;