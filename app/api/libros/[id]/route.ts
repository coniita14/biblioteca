import { NextResponse } from 'next/server';

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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const libro = librosMock.find((l) => l.id === Number(params.id));
  if (!libro) {
    return NextResponse.json({ error: 'Libro no encontrado' }, { status: 404 });
  }
  return NextResponse.json(libro);
}
