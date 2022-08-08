import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

type Data = {
  productos: any[]
}

const prisma = new PrismaClient();

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
  const productos = await prisma.producto.findMany({
    include: {
      categoria: true,
    }
  });
  
  res.status(200).json({ productos });
}