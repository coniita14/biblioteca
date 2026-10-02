export type Libro = {
  id: number;
  titulo: string;
  autor: string;
  anio_publicacion?: number | null;
  disponible?: boolean;
};

const API_BASE_URL = process.env.BIBLIOTECA_API_URL
  ? process.env.BIBLIOTECA_API_URL.replace(/\/+$/, "")
  : "http://localhost:3000";

export function getLibrosApiUrl(id?: string) {
  const endpoint = id ? `/api/libros/${id}` : "/api/libros";
  return `${API_BASE_URL}${endpoint}`;
}

