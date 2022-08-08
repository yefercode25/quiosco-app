import type { GetServerSideProps, NextPage } from 'next';
import { PrismaClient } from '@prisma/client';
import Layout from '../layout/Layout';
import { useQuiosco } from '../hooks/useQuiosco';
import ProductoType from '../components/Producto';

interface IHomeProps { }

const Home: NextPage<IHomeProps> = () => {
  const { categoriaActual } = useQuiosco();

  return (
    <>
      <Layout pagina={`Menú ${categoriaActual?.nombre || 'Inicio'}`}>
        <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
        <p className="text-2xl my-5">
          Elije y personaliza tu pedido a continuación.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:col-span-4">
          {categoriaActual?.productos?.map((producto) => (
            <ProductoType key={producto.id} producto={producto} />
          ))}
        </div>
      </Layout>
    </>
  )
}

export default Home;