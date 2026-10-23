import { useEffect, useState } from 'react'
import './App.css'
const API = 'http://127.0.0.1:8000/api/v1'
export default function App() {
  const [logged, setLogged] = useState(false), [books, setBooks] = useState([]), [q, setQ] = useState('')
  async function loadBooks(search = '') { const r = await fetch(`${API}/books?q=${encodeURIComponent(search)}`); const d = await r.json(); setBooks(d.data || d.items || []) }
  useEffect(() => { if (logged) loadBooks() }, [logged])
  if (!logged) return <main className="login"><h1>Manager Library</h1><p>Gestión de biblioteca</p><button onClick={() => setLogged(true)}>Entrar como administrador</button></main>
  return <main><header><h1>Manager Library</h1><button onClick={() => setLogged(false)}>Salir</button></header><section className="toolbar"><input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por título o autor" /><button onClick={() => loadBooks(q)}>Buscar</button></section><h2>Catálogo</h2><div className="grid">{books.map(b => <article key={b.id}><h3>{b.title}</h3><p>{b.author}</p><small>{b.category?.name || 'Sin categoría'} · Disponibles: {b.available_copies}</small></article>)}{!books.length && <p>No hay libros registrados.</p>}</div></main>
}
