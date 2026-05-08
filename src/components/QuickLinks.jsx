import  { Book, Search, Plus } from 'lucide-react'

function QuickLinks() {
  const quickLinks = [
    { 
      icon: <Plus className="h-5 w-5" />, 
      text: "Add New Book", 
      action: () => {
        const addButton = document.querySelector('button[data-action="add-book"]');
        if (addButton) addButton.click();
      }
    },
    { 
      icon: <Search className="h-5 w-5" />, 
      text: "Search Library", 
      action: () => {
        const searchInput = document.querySelector('input[placeholder="Search books..."]');
        if (searchInput) searchInput.focus();
      }
    },
    { 
      icon: <Book className="h-5 w-5" />, 
      text: "View All Books", 
      action: () => {
        const filterSelect = document.querySelector('select');
        if (filterSelect) filterSelect.value = 'all';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  ] 

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Quick Links</h3>
          <p className="text-gray-600">Easy access to your most used features</p>
        </div>
        
               <div className="grid grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              onClick={link.action}
              className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-center group cursor-pointer"
            >
              <div className="text-purple-600 group-hover:text-purple-700 mb-2">
                {link.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {link.text}
              </span>
            </button>
          ))} 
        </div>
      </div>
    </section>
  )
}

export default QuickLinks
 