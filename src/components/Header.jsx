import  { Book, Clock, CheckCircle, Star, DollarSign } from 'lucide-react'

function Header({ stats }) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Book className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              BookShelf Manager
            </h1>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass p-4 rounded-lg text-center">
            <Book className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Books</p>
          </div>
          
          <div className="glass p-4 rounded-lg text-center">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{stats.reading}</p>
            <p className="text-sm text-gray-600">Reading</p>
          </div>
          
          <div className="glass p-4 rounded-lg text-center">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          
          <div className="glass p-4 rounded-lg text-center">
            <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{stats.wishlist}</p>
            <p className="text-sm text-gray-600">Wishlist</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
 