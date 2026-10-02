import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import { getLibrosApiUrl, type Libro } from "../api";

export default async function LibroDetallePage({
  params,
}: {
  params: { id: string };
}) {
  let libro: Libro | null = null;
  let error = false;

  try {
    const res = await fetch(getLibrosApiUrl(params.id), { cache: "no-store" });
    if (!res.ok) {
      error = true;
    } else {
      libro = (await res.json()) as Libro;
    }
  } catch (e) {
    error = true;
  }

  if (error || !libro) {
    return (
      <main className="p-8">
        <p className="text-red-500">
          No se pudo cargar el detalle del libro. Intentá nuevamente más tarde.
        </p>
        <Link
          href="/libros"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          &larr; Volver al listado
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8">
      <Link
        href="/libros"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Volver al listado
      </Link>
      <div className="border p-6 rounded shadow max-w-xl">
        <h1 className="text-3xl font-bold mb-2">{libro.titulo}</h1>
        <p className="text-lg text-gray-700 mb-1">
          <strong>Autor:</strong> {libro.autor}
        </p>
        <p className="text-lg text-gray-700 mb-1">
          <strong>Año de publicación:</strong>{" "}
          {libro.anio_publicacion || "No especificado"}
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <strong>Estado:</strong>{" "}
          {libro.disponible !== false ? (
            <span className="text-green-600 font-semibold">Disponible</span>
          ) : (
            <span className="text-red-600 font-semibold">No disponible</span>
          )}
        </p>

        <FavoriteButton />
      </div>
    </main>
  );
}
