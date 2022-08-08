import axios from "axios";
import { createContext, useEffect, useState, FormEvent } from 'react';
import { toast } from "react-toastify";
import { Categoria, CategoriasAPI, Producto, PedidoItem } from '../types/api/categorias';
import { useRouter } from 'next/router';

interface IQuioscoContext {
  categorias: Categoria[];
  categoriaActual: Categoria;
  handleClickCategoria: (id: number) => void;
  modal: boolean;
  handleOpenModal: () => void;
  producto: Producto;
  handleSetProducto: (id: Producto) => void;
  handleAgregarPedido: (item: PedidoItem) => void;
  pedido: PedidoItem[];
  handleSetCantidad: (id: number) => void;
  handleEliminarItem: (id: number) => void;
  nombre: string;
  setNombre: (nombre: string) => void;
  colocarOrden: (e: FormEvent) => Promise<void>;
  total: number;
}

export const QuioscoContext = createContext<IQuioscoContext>({} as IQuioscoContext);

export const QuioscoProvider = ({ children }: { children: React.ReactNode }) => { 
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaActual, setCategoriaActual] = useState<Categoria>({} as Categoria);
  const [producto, setProducto] = useState<Producto>({} as Producto);
  const [modal, setModal] = useState<boolean>(false);
  const [pedido, setPedido] = useState<PedidoItem[]>([]);
  const [nombre, setNombre] = useState<string>('');
  const [total, setTotal] = useState<number>(0);

  const router = useRouter();

  const obeterCategorias = async () => { 
    const { data } = await axios.get<CategoriasAPI>('/api/categorias');
    setCategorias(data.categorias);
  }

  useEffect(() => {
    obeterCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => { 
    setTotal(pedido.reduce((tot, item) => tot + (item.cantidad * item.producto.precio), 0));
  }, [pedido]);

  const handleClickCategoria = (id: number) => { 
    const categoria = categorias.filter((c) => c.id === id)[0];
    setCategoriaActual(categoria);
    router.push('/');
  }

  const handleOpenModal = () => { 
    setModal(!modal);
  }

  const handleSetProducto = (prod: Producto) => {
    setProducto(prod);
  }

  const handleAgregarPedido = (item: PedidoItem) => { 
    if (pedido.some((i) => i.producto.id === item.producto.id)) {
      setPedido(pedido.map((i) => {
        if (i.producto.id === item.producto.id) {
          i.cantidad = item.cantidad;
        }
        return i;
      }));
      toast.success('Se actualizó la cantidad del producto');
    } else {
      setPedido([...pedido, item]);
      toast.success('Agregado al pedido correctamente');
    }

    setModal(false);
  }
  
  const handleSetCantidad = (id: number) => {
    handleSetProducto(pedido.filter((i) => i.producto.id === id)[0].producto);
    handleOpenModal();
  }

  const handleEliminarItem = (id: number) => {
    setPedido(pedido.filter((i) => i.producto.id !== id));
    toast.success('Se eliminó el producto del pedido');
  }

  const colocarOrden = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/ordenes', {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString()
      });

      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre('');
      setTotal(0);

      toast.success('Orden enviada correctamente');

      setTimeout(() => {  
        router.push('/');
      }, 2000);
    } catch (error) { 
      console.log(error);
      toast.error('Error al colocar la orden');
    }
  }

  return (
    <QuioscoContext.Provider
      value={
        {
          categorias,
          categoriaActual,
          handleClickCategoria,
          handleOpenModal,
          modal,
          producto,
          handleSetProducto,
          handleAgregarPedido,
          pedido,
          handleSetCantidad,
          handleEliminarItem,
          nombre,
          setNombre,
          colocarOrden,
          total
        }
      }
    >
      {children}
    </QuioscoContext.Provider>
  )
};