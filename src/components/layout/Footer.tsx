import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6 [&_span]:!text-stone-100 [&_a]:pointer-events-none">
              <Logo size="lg" showTagline />
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.navigation')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  {t('nav.catalog')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  {t('footer.company')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.categories')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=vanities" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  {t('category.vanities')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=mirrors" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  {t('category.mirrors')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=sinks" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  {t('category.sinks')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=cabinets" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  {t('category.cabinets')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-gold" />
                <div className="text-sm">
                  <p className="text-primary-foreground/70">210 6622215</p>
                  <p className="text-primary-foreground/70">210 6622218</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-gold" />
                <a href="mailto:info@probagno.gr" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  info@probagno.gr
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-gold" />
                <p className="text-primary-foreground/70 text-sm">
                  2ο χλμ Λεωφόρος Κορωπίου-Βάρης<br />
                  Κορωπί 194 00
                </p>
              </li>
            </ul>
            
            <div className="flex items-center gap-4 mt-6">
              <a 
                href="https://www.facebook.com/Probagno" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/probagno" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <LanguageSwitcher variant="footer" />
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} PROBAGNO - STEFANOS PANOUSSOS & CO E.E. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-primary-foreground/50 hover:text-primary-foreground/70 text-sm transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-primary-foreground/50 hover:text-primary-foreground/70 text-sm transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
