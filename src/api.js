const BASE = '/api/v1/books'

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || 'Request failed')
  }
  return res.status === 204 ? null : res.json()
}

export const api = {
  getBooks: (search = '', status = 'all', page = 0, size = 20, sortBy = 'createdAt', sortDir = 'desc') => {
    const params = new URLSearchParams({ page, size, sortBy, sortDir })
    if (search) params.set('search', search)
    if (status && status !== 'all') params.set('status', status)
    return request(`${BASE}?${params}`)
  },

  getStats: () => request(`${BASE}/stats`),

  createBook: (data) => request(BASE, { method: 'POST', body: JSON.stringify(data) }),

  updateBook: (id, data) => request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  updateStatus: (id, status) => request(`${BASE}/${id}/status?status=${status}`, { method: 'PATCH' }),

  deleteBook: (id) => request(`${BASE}/${id}`, { method: 'DELETE' }),
}
