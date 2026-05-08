import  { Book, Clock, Search } from 'lucide-react'

function FeaturesSection() {
  const features = [
    {
      icon: <Book className="h-8 w-8 text-purple-600" />,
      title: "Personal Library Management",
      description: "Keep track of all your books in one organized digital library. Never forget what you've read or what's on your wishlist."
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Reading Progress Tracking",
      description: "Monitor your reading journey with status updates - from wishlist to currently reading to completed."
    },
    {
      icon: <Search className="h-8 w-8 text-orange-600" />,
      title: "Smart Search & Filter",
      description: "Quickly find any book in your collection with powerful search and filtering options by title, author, or status."
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose BookShelf Manager?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform the way you manage your personal library with our comprehensive book management solution.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
 