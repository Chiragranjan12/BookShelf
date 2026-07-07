import { useState, useEffect, useCallback, useRef } from 'react'
import { Book, Search, Plus, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react'
import Header from './components/Header'
import BookCard from './components/BookCard'
import BookForm from './components/BookForm'
import FeaturesSection from './components/FeaturesSection'
import QuickLinks from './components/QuickLinks'
import Footer from './components/Footer'
import Toast from './components/Toast'
import { api } from './api'

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

function App() {
  const [books, setBooks] = useState([])
  const [stats, setStats] = useState({ total: 0, READING: 0, COMPLETED: 0, WISHLIST: 0 })
  const [pagination, setPagination] = useState({ page: 0, totalPages: 1 })
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDir, setSortDir] = useState('desc')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const debouncedSearch = useDebounce(searchTerm)
  const isFirstRender = useRef(true)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchBooks = useCallback(async (page = 0) => {
    setLoading(true)
    try {
      const data = await api.getBooks(debouncedSearch, filterStatus, page, 20, sortBy, sortDir)
      setBooks(data.content)
      setPagination({ page: data.number, totalPages: data.totalPages })
    } catch {
      showToast('Failed to load books', 'error')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, filterStatus, sortBy, sortDir])

  const fetchStats = useCallback(async () => {
    try {
      const data = await api.getStats()
      setStats(data)
    } catch { /* non-critical */ }
  }, [])

  // Reset to page 0 when filters change
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return }
    fetchBooks(0)
  }, [debouncedSearch, filterStatus, sortBy, sortDir])

  // Initial load
  useEffect(() => {
    fetchBooks(0)
    fetchStats()
  }, [fetchBooks, fetchStats])

  const handleAddBook = async (bookData) => {
    try {
      await api.createBook(bookData)
      showToast('Book added successfully!')
      setShowForm(false)
      fetchBooks(0)
      fetchStats()
    } catch (e) {
      showToast(e.message || 'Failed to add book', 'error')
    }
  }

  const handleEditBook = async (bookData) => {
    try {
      await api.updateBook(editingBook.id, bookData)
      showToast('Book updated successfully!')
      setEditingBook(null)
      setShowForm(false)
      fetchBooks(pagination.page)
      fetchStats()
    } catch (e) {
      showToast(e.message || 'Failed to update book', 'error')
    }
  }

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return
    try {
      await api.deleteBook(bookId)
      showToast('Book deleted')
      fetchBooks(pagination.page)
      fetchStats()
    } catch {
      showToast('Failed to delete book', 'error')
    }
  }

  const uiStats = {
    total: stats.total ?? 0,
    reading: stats.READING ?? 0,
    completed: stats.COMPLETED ?? 0,
    wishlist: stats.WISHLIST ?? 0,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header stats={uiStats} />

      <div className="container mx-auto px-4 py-6">
        {/* Controls bar */}
        <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center mb-8">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-52"
              />
            </div>

            {/* Status filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
              <option value="wishlist">Wishlist</option>
            </select>

            {/* Sort */}
            <div className="flex items-center gap-1">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="createdAt">Date Added</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="status">Status</option>
              </select>
              <select
                value={sortDir}
                onChange={(e) => setSortDir(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="desc">↓ Desc</option>
                <option value="asc">↑ Asc</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => { setEditingBook(null); setShowForm(true) }}
            className="btn-primary flex items-center gap-2 shrink-0"
            data-action="add-book"
          >
            <Plus className="h-4 w-4" />
            Add Book
          </button>
        </div>

        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent" />
          </div>
        )}

        {/* Books grid */}
        {!loading && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={(b) => { setEditingBook(b); setShowForm(true) }}
                  onDelete={handleDeleteBook}
                />
              ))}
            </div>

            {books.length === 0 && (
              <div className="text-center py-20">
                <Book className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No books found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or add a new book</p>
                <button
                  onClick={() => { setEditingBook(null); setShowForm(true) }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Add your first book
                </button>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={() => fetchBooks(pagination.page - 1)}
                  disabled={pagination.page === 0}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm text-gray-600">
                  Page {pagination.page + 1} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => fetchBooks(pagination.page + 1)}
                  disabled={pagination.page + 1 >= pagination.totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <BookForm
              book={editingBook}
              onSave={editingBook ? handleEditBook : handleAddBook}
              onClose={() => { setShowForm(false); setEditingBook(null) }}
            />
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}

      <FeaturesSection />
      <QuickLinks />
      <Footer />
    </div>
  )
}

export default App
