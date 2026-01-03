import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-foreground text-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold">🐔</span>
              </div>
              <span className="font-bold text-lg">Ternak Ayam rendi</span>
            </div>
            <p className="text-secondary/80 text-sm">
              Penyedia ayam dan telur segar berkualitas premium dari peternakan terpercaya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-secondary/80 hover:text-secondary transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#products" className="text-secondary/80 hover:text-secondary transition-colors">
                  Produk
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-secondary/80 hover:text-secondary transition-colors">
                  Galeri
                </a>
              </li>
              <li>
                <a href="#contact" className="text-secondary/80 hover:text-secondary transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Produk</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#products" className="text-secondary/80 hover:text-secondary transition-colors">
                  Ayam Kampung
                </a>
              </li>
              <li>
                <a href="#products" className="text-secondary/80 hover:text-secondary transition-colors">
                  Telur Segar
                </a>
              </li>
              <li>
                <a href="#products" className="text-secondary/80 hover:text-secondary transition-colors">
                  Paket Combo
                </a>
              </li>
              <li>
                <a href="#products" className="text-secondary/80 hover:text-secondary transition-colors">
                  Daging Potong
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hubungi Kami</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-secondary/80">(+62) 843-8732-878</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-secondary/80">renditest@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-secondary/80">Jl. Kp Cigore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary/20 pt-8">
          <p className="text-center text-secondary/60 text-sm">© {currentYear} Ternak Ayam. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
