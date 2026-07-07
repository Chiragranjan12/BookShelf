import { Clock, CheckCircle, Star, Edit, Trash, DollarSign } from 'lucide-react'

function BookCard({ book, onEdit, onDelete }) {
  const status = book.status?.toLowerCase()

  const getCurrencySymbol = (currency) => {
    const symbols = { USD: '$', INR: '₹', AED: 'د.إ', EUR: '€', GBP: '£', CAD: 'C$', AUD: 'A$', JPY: '¥', SAR: '﷼' }
    return symbols[currency] || currency || '$'
  }

  const statusConfig = {
    reading:   { icon: <Clock className="h-4 w-4 text-blue-600" />,        badge: 'bg-blue-100 text-blue-800',     label: 'Reading' },
    completed: { icon: <CheckCircle className="h-4 w-4 text-green-600" />, badge: 'bg-green-100 text-green-800',   label: 'Completed' },
    wishlist:  { icon: <Star className="h-4 w-4 text-yellow-600" />,       badge: 'bg-yellow-100 text-yellow-800', label: 'Wishlist' },
  }

  const { icon, badge, label } = statusConfig[status] ?? {}

  return (
    <div className="card flex flex-col overflow-hidden">
      {/* Cover image */}
      {book.coverUrl ? (
        <img src={book.coverUrl} alt={book.title}
          className="w-full h-40 object-cover"
          onError={(e) => { e.target.style.display = 'none' }} />
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
          <span className="text-5xl">📖</span>
        </div>
      )}

      <div className="p-5 flex flex-col gap-2 flex-1">
        {/* Status + actions */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5">
            {icon}
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge}`}>{label}</span>
          </div>
          <div className="flex gap-1">
            <button onClick={() => onEdit(book)} className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
              <Edit className="h-4 w-4" />
            </button>
            <button onClick={() => onDelete(book.id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
              <Trash className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Title + Author */}
        <div>
          <h3 className="font-bold text-gray-800 line-clamp-2 leading-snug">{book.title}</h3>
          <p className="text-gray-500 text-sm mt-0.5">by {book.author}</p>
        </div>

        {/* Genre */}
        {book.genre && (
          <span className="self-start text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {book.genre}
          </span>
        )}

        {/* Reading progress bar */}
        {book.readingProgressPercent != null && (
          <div className="mt-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{book.currentPage} / {book.totalPages} pages</span>
              <span>{book.readingProgressPercent}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all"
                style={{ width: `${book.readingProgressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Price */}
        {book.price && (
          <div className="flex items-center gap-1 text-green-600">
            <DollarSign className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">{getCurrencySymbol(book.currency)}{book.price}</span>
          </div>
        )}

        {/* Borrowed from */}
        {book.borrowedFrom && (
          <p className="text-xs text-blue-600">Borrowed from: {book.borrowedFrom}</p>
        )}

        {/* Notes */}
        {book.notes && (
          <p className="text-xs text-gray-400 line-clamp-2 italic mt-auto">{book.notes}</p>
        )}

        {/* Date */}
        {book.createdAt && (
          <p className="text-xs text-gray-300 mt-auto pt-1 border-t border-gray-50">
            Added {new Date(book.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default BookCard
