const API = "http://localhost:3000/api";

// ── Utilidad genérica ──────────────────────────────────────────────────────
const request = (url, options = {}) =>
  fetch(url, { headers: { "Content-Type": "application/json" }, ...options })
    .then((res) => {
      if (!res.ok) return res.json().then((e) => Promise.reject(e));
      return res.json();
    });

// ── Películas ──────────────────────────────────────────────────────────────
export const peliculaService = {
  listar: () => request(`${API}/peliculas`),
  obtener: (id) => request(`${API}/peliculas/${id}`),
  crear: (data) => request(`${API}/peliculas`, { method: "POST", body: JSON.stringify(data) }),
  actualizar: (id, data) => request(`${API}/peliculas/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  eliminar: (id) => request(`${API}/peliculas/${id}`, { method: "DELETE" }),
};

// ── Salas ──────────────────────────────────────────────────────────────────
export const salaService = {
  listar: () => request(`${API}/salas`),
  obtener: (id) => request(`${API}/salas/${id}`),
  crear: (data) => request(`${API}/salas`, { method: "POST", body: JSON.stringify(data) }),
  actualizar: (id, data) => request(`${API}/salas/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  eliminar: (id) => request(`${API}/salas/${id}`, { method: "DELETE" }),
};

// ── Horarios ───────────────────────────────────────────────────────────────
export const horarioService = {
  listar: () => request(`${API}/horarios`),
  obtener: (id) => request(`${API}/horarios/${id}`),
  crear: (data) => request(`${API}/horarios`, { method: "POST", body: JSON.stringify(data) }),
  actualizar: (id, data) => request(`${API}/horarios/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  eliminar: (id) => request(`${API}/horarios/${id}`, { method: "DELETE" }),
};

// ── Clientes ───────────────────────────────────────────────────────────────
export const clienteService = {
  listar: () => request(`${API}/clientes`),
  obtener: (id) => request(`${API}/clientes/${id}`),
  crear: (data) => request(`${API}/clientes`, { method: "POST", body: JSON.stringify(data) }),
  actualizar: (id, data) => request(`${API}/clientes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  eliminar: (id) => request(`${API}/clientes/${id}`, { method: "DELETE" }),
};

// ── Boletos ────────────────────────────────────────────────────────────────
export const boletoService = {
  listar: () => request(`${API}/boletos`),
  obtener: (id) => request(`${API}/boletos/${id}`),
  crear: (data) => request(`${API}/boletos`, { method: "POST", body: JSON.stringify(data) }),
  actualizar: (id, data) => request(`${API}/boletos/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  eliminar: (id) => request(`${API}/boletos/${id}`, { method: "DELETE" }),
};
