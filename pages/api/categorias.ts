import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

type Data = {
  categorias: any[]
}

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true,
    }
  });
  res.status(200).json({ categorias });
}