import   { Clock, CheckCircle, Star, Edit, Trash, DollarSign } from 'lucide-react'

function BookCard({ book, onEdit, onDelete }) {
  const getCurrencySymbol = (currency) => {
    const symbols = {
      USD: '$', INR: '₹', AED: 'د.إ', EUR: '€', GBP: '£',
      CAD: 'C$', AUD: 'A$', JPY: '¥', CNY: '¥', SAR: '﷼'
    }
    return symbols[currency] || '$'
  } 
  const statusIcons = {
    reading: <Clock className="h-4 w-4 text-blue-600" />,
    completed: <CheckCircle className="h-4 w-4 text-green-600" />,
    wishlist: <Star className="h-4 w-4 text-yellow-600" />
  }

  const statusColors = {
    reading: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    wishlist: 'bg-yellow-100 text-yellow-800'
  }

  const statusLabels = {
    reading: 'Reading',
    completed: 'Completed',
    wishlist: 'Wishlist'
  }

  return (
    <div className="card p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          {statusIcons[book.status]}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[book.status]}`}>
            {statusLabels[book.status]}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>

      <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{book.title}</h3>
      <p className="text-gray-600 mb-4">by {book.author}</p>

           {book.price && (
        <div className="flex items-center gap-1 text-green-600 mb-2">
          <DollarSign className="h-4 w-4" />
          <span className="text-sm font-medium">
            {getCurrencySymbol(book.currency)}{book.price}
          </span>
        </div>
      )} 

      {book.borrowedFrom && (
        <p className="text-sm text-blue-600 mb-2">
          Borrowed from: {book.borrowedFrom}
        </p>
      )}

      {book.notes && (
        <p className="text-sm text-gray-500 line-clamp-2">{book.notes}</p>
      )}
    </div>
  )
}

export default BookCard
 