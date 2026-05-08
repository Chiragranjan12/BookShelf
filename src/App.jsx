import  { useState, useEffect } from 'react'
import  { Book, Search, Plus } from 'lucide-react' 
import Header from './components/Header'
import BookCard from './components/BookCard'
import BookForm from './components/BookForm'
import FeaturesSection from './components/FeaturesSection'
import QuickLinks from './components/QuickLinks'
import Footer from './components/Footer' 

function App() {
  const [books, setBooks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    const savedBooks = localStorage.getItem('books')
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks))
    } else {
      const sampleBooks = [
        { 
          id: 1, 
          title: 'The Great Gatsby', 
          author: 'F. Scott Fitzgerald', 
          status: 'completed',
          source: 'purchased',
          price: '15.99',
          notes: 'Classic American literature'
        },
        { 
          id: 2, 
          title: 'To Kill a Mockingbird', 
          author: 'Harper Lee', 
          status: 'reading',
          source: 'borrowed',
          borrowedFrom: 'City Library',
          notes: 'Great character development'
        },
        { 
          id: 3, 
          title: '1984', 
          author: 'George Orwell', 
          status: 'wishlist',
          source: 'purchased',
          price: '12.50',
          notes: 'Must read dystopian novel'
        }
      ]
      setBooks(sampleBooks)
      localStorage.setItem('books', JSON.stringify(sampleBooks))
    }
  }, [])

  const saveBooks = (updatedBooks) => {
    setBooks(updatedBooks)
    localStorage.setItem('books', JSON.stringify(updatedBooks))
  }

  const handleAddBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: Date.now()
    }
    const updatedBooks = [...books, newBook]
    saveBooks(updatedBooks)
    setShowForm(false)
  }

  const handleEditBook = (bookData) => {
    const updatedBooks = books.map(book => 
      book.id === editingBook.id ? { ...bookData, id: editingBook.id } : book
    )
    saveBooks(updatedBooks)
    setEditingBook(null)
    setShowForm(false)
  }

  const handleDeleteBook = (bookId) => {
    const updatedBooks = books.filter(book => book.id !== bookId)
    saveBooks(updatedBooks)
  }

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || book.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: books.length,
    reading: books.filter(book => book.status === 'reading').length,
    completed: books.filter(book => book.status === 'completed').length,
    wishlist: books.filter(book => book.status === 'wishlist').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header stats={stats} />
      
      {/* Navigation & Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
              <option value="wishlist">Wishlist</option>
            </select>
          </div>
          
                   <div className="flex gap-3">
                       <button
              onClick={() => {
                setEditingBook(null)
                setShowForm(true)
              }}
              className="btn-primary flex items-center gap-2"
              data-action="add-book"
            >
              <Plus className="h-4 w-4" />
              Add Book
            </button> 
          </div> 
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={(book) => {
                setEditingBook(book)
                setShowForm(true)
              }}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search or add a new book</p>
          </div>
        )}
      </div>

           {/* Book Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <BookForm
              book={editingBook}
              onSave={editingBook ? handleEditBook : handleAddBook}
              onClose={() => {
                setShowForm(false)
                setEditingBook(null)
              }}
            />
          </div>
        </div>
      )}
      
      <FeaturesSection />
      <QuickLinks />
      <Footer />
    </div>
  )
} 

export default App
 