export interface CategoriasAPI {
  categorias: Categoria[];
}

export interface Categoria {
  id: number;
  nombre: string;
  icono: string;
  productos?: Producto[];
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoriaId: number;
}

export interface PedidoItem {
  producto: Producto;
  cantidad: number;
}