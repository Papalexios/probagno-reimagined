import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'el' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  el: {
    // Navigation
    'nav.home': 'Αρχική',
    'nav.products': 'Προϊόντα',
    'nav.projects': 'Έργα',
    'nav.catalog': 'Κατάλογος',
    'nav.about': 'Probagno',
    'nav.contact': 'Επικοινωνία',
    'nav.menu': 'Μενού',
    'nav.admin': 'Διαχείριση',
    
    // Header
    'header.search': 'Αναζήτηση',
    'header.cart': 'Καλάθι',
    
    // Footer
    'footer.navigation': 'Πλοήγηση',
    'footer.categories': 'Κατηγορίες',
    'footer.contact': 'Επικοινωνία',
    'footer.description': 'Με συνεχή πορεία 50 ετών στο χώρο σχεδιασμού & κατασκευής επίπλων μπάνιου, αποτελούμε συνώνυμο υψηλής ποιότητας και αισθητικής.',
    'footer.company': 'Η Εταιρεία',
    'footer.privacy': 'Πολιτική Απορρήτου',
    'footer.terms': 'Όροι Χρήσης',
    'footer.rights': 'Με επιφύλαξη παντός δικαιώματος.',
    
    // Categories
    'category.vanities': 'Έπιπλα Μπάνιου',
    'category.mirrors': 'Καθρέπτες',
    'category.sinks': 'Νιπτήρες',
    'category.cabinets': 'Κολώνες & Ντουλάπια',
    'category.all': 'Όλα τα Προϊόντα',
    
    // Products Page
    'products.title': 'Προϊόντα',
    'products.subtitle': 'Ανακαλύψτε τη συλλογή μας',
    'products.filter': 'Φίλτρα',
    'products.sort': 'Ταξινόμηση',
    'products.sort.newest': 'Νεότερα',
    'products.sort.price_asc': 'Τιμή: Χαμηλή → Υψηλή',
    'products.sort.price_desc': 'Τιμή: Υψηλή → Χαμηλή',
    'products.sort.name': 'Όνομα',
    'products.no_results': 'Δεν βρέθηκαν προϊόντα',
    'products.clear_filters': 'Καθαρισμός Φίλτρων',
    'products.apply_filters': 'Εφαρμογή Φίλτρων',
    'products.price_range': 'Εύρος Τιμής',
    'products.materials': 'Υλικά',
    'products.colors': 'Χρώματα',
    'products.in_stock': 'Διαθέσιμο',
    'products.out_of_stock': 'Μη Διαθέσιμο',
    'products.add_to_cart': 'Προσθήκη στο Καλάθι',
    'products.view_details': 'Λεπτομέρειες',
    
    // Product Detail
    'product.description': 'Περιγραφή',
    'product.specifications': 'Προδιαγραφές',
    'product.dimensions': 'Διαστάσεις',
    'product.materials': 'Υλικά',
    'product.features': 'Χαρακτηριστικά',
    'product.related': 'Σχετικά Προϊόντα',
    'product.width': 'Πλάτος',
    'product.height': 'Ύψος',
    'product.depth': 'Βάθος',
    
    // Home Page
    'home.hero.title': 'Πολυτελή Έπιπλα Μπάνιου',
    'home.hero.subtitle': 'Από το 1974',
    'home.hero.description': 'Ανακαλύψτε τη συλλογή μας με έπιπλα μπάνιου υψηλής ποιότητας, σχεδιασμένα για να μεταμορφώσουν τον χώρο σας.',
    'home.hero.cta': 'Δείτε τη Συλλογή',
    'home.featured.title': 'Επιλεγμένα Προϊόντα',
    'home.featured.subtitle': 'Η τελευταία συλλογή μας',
    'home.projects.title': 'Τα Έργα μας',
    'home.projects.subtitle': 'Ολοκληρωμένες εγκαταστάσεις',
    'home.brand.title': 'Η Ιστορία μας',
    'home.brand.subtitle': '50 χρόνια αριστείας',
    
    // About Page
    'about.title': 'Η Εταιρεία',
    'about.subtitle': 'Από το 1974',
    'about.history': 'Η Ιστορία μας',
    'about.values': 'Οι Αξίες μας',
    'about.team': 'Η Ομάδα μας',
    
    // Contact Page
    'contact.title': 'Επικοινωνία',
    'contact.subtitle': 'Επικοινωνήστε μαζί μας',
    'contact.form.name': 'Όνομα',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Τηλέφωνο',
    'contact.form.message': 'Μήνυμα',
    'contact.form.submit': 'Αποστολή',
    'contact.info.title': 'Στοιχεία Επικοινωνίας',
    'contact.info.address': 'Διεύθυνση',
    'contact.info.phone': 'Τηλέφωνο',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Ωράριο',
    
    // Projects Page
    'projects.title': 'Τα Έργα μας',
    'projects.subtitle': 'Ολοκληρωμένες εγκαταστάσεις σε όλη την Ελλάδα',
    
    // Catalog Page
    'catalog.title': 'Κατάλογος',
    'catalog.subtitle': 'Κατεβάστε τον κατάλογό μας',
    'catalog.download': 'Λήψη PDF',
    
    // Common
    'common.loading': 'Φόρτωση...',
    'common.error': 'Σφάλμα',
    'common.success': 'Επιτυχία',
    'common.cancel': 'Ακύρωση',
    'common.save': 'Αποθήκευση',
    'common.delete': 'Διαγραφή',
    'common.edit': 'Επεξεργασία',
    'common.view_all': 'Δείτε Όλα',
    'common.learn_more': 'Μάθετε Περισσότερα',
    'common.back': 'Πίσω',
    'common.next': 'Επόμενο',
    'common.previous': 'Προηγούμενο',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.projects': 'Projects',
    'nav.catalog': 'Catalog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.admin': 'Admin',
    
    // Header
    'header.search': 'Search',
    'header.cart': 'Cart',
    
    // Footer
    'footer.navigation': 'Navigation',
    'footer.categories': 'Categories',
    'footer.contact': 'Contact',
    'footer.description': 'With a continuous journey of 50 years in bathroom furniture design & manufacturing, we are synonymous with high quality and aesthetics.',
    'footer.company': 'The Company',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.rights': 'All rights reserved.',
    
    // Categories
    'category.vanities': 'Bathroom Vanities',
    'category.mirrors': 'Mirrors',
    'category.sinks': 'Sinks',
    'category.cabinets': 'Columns & Cabinets',
    'category.all': 'All Products',
    
    // Products Page
    'products.title': 'Products',
    'products.subtitle': 'Discover our collection',
    'products.filter': 'Filters',
    'products.sort': 'Sort',
    'products.sort.newest': 'Newest',
    'products.sort.price_asc': 'Price: Low → High',
    'products.sort.price_desc': 'Price: High → Low',
    'products.sort.name': 'Name',
    'products.no_results': 'No products found',
    'products.clear_filters': 'Clear Filters',
    'products.apply_filters': 'Apply Filters',
    'products.price_range': 'Price Range',
    'products.materials': 'Materials',
    'products.colors': 'Colors',
    'products.in_stock': 'In Stock',
    'products.out_of_stock': 'Out of Stock',
    'products.add_to_cart': 'Add to Cart',
    'products.view_details': 'View Details',
    
    // Product Detail
    'product.description': 'Description',
    'product.specifications': 'Specifications',
    'product.dimensions': 'Dimensions',
    'product.materials': 'Materials',
    'product.features': 'Features',
    'product.related': 'Related Products',
    'product.width': 'Width',
    'product.height': 'Height',
    'product.depth': 'Depth',
    
    // Home Page
    'home.hero.title': 'Luxury Bathroom Furniture',
    'home.hero.subtitle': 'Since 1974',
    'home.hero.description': 'Discover our collection of high-quality bathroom furniture, designed to transform your space.',
    'home.hero.cta': 'View Collection',
    'home.featured.title': 'Featured Products',
    'home.featured.subtitle': 'Our latest collection',
    'home.projects.title': 'Our Projects',
    'home.projects.subtitle': 'Completed installations',
    'home.brand.title': 'Our Story',
    'home.brand.subtitle': '50 years of excellence',
    
    // About Page
    'about.title': 'About Us',
    'about.subtitle': 'Since 1974',
    'about.history': 'Our History',
    'about.values': 'Our Values',
    'about.team': 'Our Team',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in touch with us',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Hours',
    
    // Projects Page
    'projects.title': 'Our Projects',
    'projects.subtitle': 'Completed installations across Greece',
    
    // Catalog Page
    'catalog.title': 'Catalog',
    'catalog.subtitle': 'Download our catalog',
    'catalog.download': 'Download PDF',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view_all': 'View All',
    'common.learn_more': 'Learn More',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('probagno-language');
    return (saved === 'en' ? 'en' : 'el') as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('probagno-language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
