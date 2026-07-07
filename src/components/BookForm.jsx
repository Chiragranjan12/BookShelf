import { useState } from 'react'
import { X, Save } from 'lucide-react'

const GENRES = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery',
  'Thriller', 'Biography', 'History', 'Self-Help', 'Technology', 'Philosophy', 'Other']

function BookForm({ book, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    status: book?.status?.toLowerCase() || 'wishlist',
    source: book?.source?.toLowerCase() || 'purchased',
    genre: book?.genre || '',
    coverUrl: book?.coverUrl || '',
    price: book?.price || '',
    currency: book?.currency || 'USD',
    borrowedFrom: book?.borrowedFrom || '',
    notes: book?.notes || '',
    currentPage: book?.currentPage ?? '',
    totalPages: book?.totalPages ?? '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!formData.title.trim()) errs.title = 'Title is required'
    if (!formData.author.trim()) errs.author = 'Author is required'
    if (formData.currentPage !== '' && formData.totalPages !== '') {
      if (Number(formData.currentPage) > Number(formData.totalPages)) {
        errs.currentPage = 'Current page cannot exceed total pages'
      }
    }
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSave({
      ...formData,
      status: formData.status.toUpperCase(),
      source: formData.source.toUpperCase(),
      price: formData.price !== '' ? formData.price : null,
      currentPage: formData.currentPage !== '' ? Number(formData.currentPage) : 0,
      totalPages: formData.totalPages !== '' ? Number(formData.totalPages) : null,
    })
  }

  const inputClass = (field) =>
    `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors[field] ? 'border-red-500' : 'border-gray-300'}`

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{book ? 'Edit Book' : 'Add New Book'}</h2>
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange}
            className={inputClass('title')} placeholder="Enter book title" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange}
            className={inputClass('author')} placeholder="Enter author name" />
          {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
        </div>

        {/* Genre + Status row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
            <select name="genre" value={formData.genre} onChange={handleChange} className={inputClass('genre')}>
              <option value="">Select genre</option>
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className={inputClass('status')}>
              <option value="wishlist">Wishlist</option>
              <option value="reading">Currently Reading</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
          <select name="source" value={formData.source} onChange={handleChange} className={inputClass('source')}>
            <option value="purchased">Purchased</option>
            <option value="borrowed">Borrowed</option>
            <option value="gift">Gift</option>
          </select>
        </div>

        {/* Price + Currency (purchased only) */}
        {formData.source === 'purchased' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input type="number" step="0.01" min="0" name="price" value={formData.price}
                onChange={handleChange} className={inputClass('price')} placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select name="currency" value={formData.currency} onChange={handleChange} className={inputClass('currency')}>
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="SAR">SAR (﷼)</option>
              </select>
            </div>
          </div>
        )}

        {/* Borrowed From */}
        {formData.source === 'borrowed' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Borrowed From</label>
            <input type="text" name="borrowedFrom" value={formData.borrowedFrom} onChange={handleChange}
              className={inputClass('borrowedFrom')} placeholder="Person or library name" />
          </div>
        )}

        {/* Cover URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
          <input type="url" name="coverUrl" value={formData.coverUrl} onChange={handleChange}
            className={inputClass('coverUrl')} placeholder="https://..." />
        </div>

        {/* Reading Progress (reading status only) */}
        {formData.status === 'reading' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Page</label>
              <input type="number" min="0" name="currentPage" value={formData.currentPage}
                onChange={handleChange} className={inputClass('currentPage')} placeholder="0" />
              {errors.currentPage && <p className="text-red-500 text-xs mt-1">{errors.currentPage}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Pages</label>
              <input type="number" min="1" name="totalPages" value={formData.totalPages}
                onChange={handleChange} className={inputClass('totalPages')} placeholder="300" />
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3}
            className={inputClass('notes')} placeholder="Your thoughts about this book..." />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary flex items-center gap-2 flex-1">
            <Save className="h-4 w-4" />
            {book ? 'Update Book' : 'Add Book'}
          </button>
          <button type="button" onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookForm
