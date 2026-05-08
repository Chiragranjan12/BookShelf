import  { Book, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github, Youtube } from 'lucide-react'

function Footer() {
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#facebook", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#twitter", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#instagram", label: "Instagram" },
    { icon: <Github className="h-5 w-5" />, href: "#github", label: "GitHub" },
    { icon: <Youtube className="h-5 w-5" />, href: "#youtube", label: "YouTube" }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Book className="h-8 w-8 text-purple-400" />
              <h3 className="text-xl font-bold">BookShelf Manager</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your personal digital library management solution. Organize, track, and discover your next great read.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#help" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#support" className="text-gray-400 hover:text-white transition-colors">Customer Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-400" />
                <span className="text-gray-400">support@bookshelfmanager.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-purple-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span className="text-gray-400">123 Library St, Book City, BC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 BookShelf Manager. All rights reserved. Built with jdoodle.ai - Empowering readers worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
 