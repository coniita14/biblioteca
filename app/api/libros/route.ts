import { NextResponse } from 'next/server';

export async function GET() {
  const librosMock = [
    {
      id: 1,
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      anio_publicacion: 1967,
      disponible: true,
    },
    {
      id: 2,
      titulo: 'Rayuela',
      autor: 'Julio Cortázar',
      anio_publicacion: 1963,
      disponible: true,
    },
    {
      id: 3,
      titulo: 'El Aleph',
      autor: 'Jorge Luis Borges',
      anio_publicacion: 1949,
      disponible: false,
    },
  ];

  return NextResponse.json(librosMock);
}
