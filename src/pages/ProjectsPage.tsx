import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { ArrowRight, MapPin, Calendar, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import heroImage from '@/assets/hero-bathroom.jpg';

const projects = [
  {
    id: 1,
    title: 'Πολυτελές Penthouse Γλυφάδα',
    location: 'Γλυφάδα, Αθήνα',
    year: '2024',
    description: 'Ολοκληρωμένη ανακαίνιση 3 μπάνιων με έπιπλα της σειράς 963 και 975. Μασίφ δρυς και Swiss Krono φινιρίσματα.',
    category: 'Κατοικία',
    image: heroImage,
    products: ['963-963Κ', '975', 'Square Sink'],
  },
  {
    id: 2,
    title: 'Boutique Hotel Μύκονος',
    location: 'Μύκονος',
    year: '2024',
    description: 'Εξοπλισμός 12 δωματίων με έπιπλα μπάνιου της σειράς 970-972. Λευκό γυαλιστερό φινίρισμα.',
    category: 'Ξενοδοχείο',
    image: heroImage,
    products: ['970-971-972', 'Chic Sink', 'LED Mirrors'],
  },
  {
    id: 3,
    title: 'Μοντέρνα Κατοικία Κηφισιά',
    location: 'Κηφισιά, Αθήνα',
    year: '2023',
    description: 'Master bathroom με έπιπλο 973 σε ανθρακί και δευτερεύον μπάνιο με 978.',
    category: 'Κατοικία',
    image: heroImage,
    products: ['973', '978', 'Square Sink Black'],
  },
  {
    id: 4,
    title: 'Spa Resort Χαλκιδική',
    location: 'Χαλκιδική',
    year: '2023',
    description: 'Εξοπλισμός χώρων spa με έπιπλα από μασίφ δρυς. 8 μονάδες 975 και custom καθρέπτες.',
    category: 'Spa',
    image: heroImage,
    products: ['975', 'Custom Mirrors', 'Vega Sinks'],
  },
  {
    id: 5,
    title: 'Διαμέρισμα Airbnb Πλάκα',
    location: 'Πλάκα, Αθήνα',
    year: '2023',
    description: 'Compact λύση με έπιπλο 969 για μικρό χώρο. Μέγιστη αξιοποίηση με minimal budget.',
    category: 'Airbnb',
    image: heroImage,
    products: ['969', 'Suite Sink'],
  },
  {
    id: 6,
    title: 'Villa Σαντορίνη',
    location: 'Σαντορίνη',
    year: '2024',
    description: 'Πλήρης εξοπλισμός 5 μπάνιων luxury villa. Λευκά φινιρίσματα σε αρμονία με την κυκλαδίτικη αρχιτεκτονική.',
    category: 'Villa',
    image: heroImage,
    products: ['950', '951-942Κ', 'Hera Sinks'],
  },
];

const categories = ['Όλα', 'Κατοικία', 'Ξενοδοχείο', 'Spa', 'Villa', 'Airbnb'];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Όλα');

  const filteredProjects = selectedCategory === 'Όλα' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <Layout>
      <Helmet>
        <title>Έργα | PROBAGNO - Έπιπλα Μπάνιου</title>
        <meta name="description" content="Δείτε τα έργα μας σε ξενοδοχεία, κατοικίες, spa και villas σε όλη την Ελλάδα. Ποιοτικές λύσεις επίπλων μπάνιου." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="PROBAGNO Projects" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6"
          >
            Τα Έργα μας
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            50 χρόνια εμπειρίας σε κατοικίες, ξενοδοχεία και επαγγελματικούς χώρους
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer mb-4">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <Button variant="secondary" size="sm" className="gap-2">
                          <Maximize2 className="w-4 h-4" />
                          Περισσότερα
                        </Button>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <div className="grid md:grid-cols-2 gap-6">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-64 md:h-full object-cover rounded-lg"
                      />
                      <div className="space-y-4">
                        <h3 className="font-display text-2xl font-bold">{project.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {project.year}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{project.description}</p>
                        <div>
                          <h4 className="font-semibold mb-2">Προϊόντα που χρησιμοποιήθηκαν:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.products.map((product) => (
                              <span key={product} className="px-3 py-1 bg-muted rounded-full text-sm">
                                {product}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Έχετε ένα project;
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Επικοινωνήστε μαζί μας για εξατομικευμένη προσφορά για το δικό σας έργο.
            </p>
            <Button variant="secondary" size="lg" className="gap-2">
              Επικοινωνία <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
