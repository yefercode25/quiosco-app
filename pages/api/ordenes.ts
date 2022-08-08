import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

type Data = any;

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const orden = await prisma.orden.create({
      data: {
        nombre: req.body.nombre,
        total: req.body.total,
        pedidos: req.body.pedido,
        fecha: req.body.fecha,
      }      
    });
    res.status(200).json(orden);
  }
}