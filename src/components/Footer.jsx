import { Book, Github, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Book className="h-7 w-7 text-purple-400" />
              <h3 className="text-lg font-bold">BookShelf Manager</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A full-stack personal library management app built with Spring Boot 3, React 18, and MySQL.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Tech Stack</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Spring Boot 3 · Spring Security · JPA</li>
              <li>React 18 · Tailwind CSS · Vite</li>
              <li>H2 (dev) · MySQL 8 (prod)</li>
              <li>Docker · GitHub Actions CI/CD</li>
              <li>OpenAPI / Swagger UI</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Links</h4>
            <div className="space-y-2">
              <a
                href="https://github.com/<your-username>/BookShelf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" /> GitHub Repository
              </a>
              <a
                href="/swagger-ui.html"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-xs font-mono bg-gray-700 px-1.5 py-0.5 rounded">API</span>
                Swagger UI Docs
              </a>
              <a
                href="mailto:<your-email>"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" /> Contact
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BookShelf Manager — Built with Spring Boot & React
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
