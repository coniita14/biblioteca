import Link from "next/link";
import { getLibrosApiUrl, type Libro } from "./api";

export default async function LibrosPage() {
  let libros: Libro[] = [];
  let error = false;

  try {
    const res = await fetch(getLibrosApiUrl(), { cache: "no-store" });
    if (!res.ok) {
      error = true;
    } else {
      libros = (await res.json()) as Libro[];
    }
  } catch (e) {
    error = true;
  }

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-500">
          No se pudieron cargar los libros. Intentá nuevamente más tarde.
        </p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Listado de Libros</h1>
      <ul className="space-y-4">
        {libros.map((libro) => (
          <li key={libro.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">
              <Link
                href={`/libros/${libro.id}`}
                className="text-blue-600 hover:underline"
              >
                {libro.titulo}
              </Link>
            </h2>
            <p className="text-gray-700">Autor: {libro.autor}</p>
            {libro.disponible === false && (
              <span className="text-red-500 text-sm font-semibold">
                (No disponible)
              </span>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
