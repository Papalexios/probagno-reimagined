import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Euro, 
  Eye, 
  FolderTree, 
  ArrowUpRight,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useProductStore } from '@/store/productStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function AdminDashboard() {
  const { products, categories } = useProductStore();
  const featuredCount = products.filter((p) => p.featured).length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const totalValue = products.reduce((sum, p) => sum + p.basePrice, 0);

  const stats = [
    {
      name: 'Σύνολο Προϊόντων',
      value: products.length,
      icon: Package,
      change: '+12%',
      changeType: 'positive' as const,
      color: 'bg-blue-500',
    },
    {
      name: 'Κατηγορίες',
      value: categories.length,
      icon: FolderTree,
      change: '4 ενεργές',
      changeType: 'neutral' as const,
      color: 'bg-purple-500',
    },
    {
      name: 'Αξία Καταλόγου',
      value: `€${totalValue.toLocaleString()}`,
      icon: Euro,
      change: '+8%',
      changeType: 'positive' as const,
      color: 'bg-emerald-500',
    },
    {
      name: 'Featured',
      value: featuredCount,
      icon: TrendingUp,
      change: `${Math.round((featuredCount / products.length) * 100)}% του συνόλου`,
      changeType: 'neutral' as const,
      color: 'bg-amber-500',
    },
  ];

  // Mock orders for dashboard
  const recentOrders = [
    { id: 'ORD-001', customer: 'Γιώργος Παπαδόπουλος', total: 1790, status: 'pending' },
    { id: 'ORD-002', customer: 'Μαρία Νικολάου', total: 2675, status: 'processing' },
    { id: 'ORD-003', customer: 'Κώστας Αλεξίου', total: 586, status: 'shipped' },
  ];

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const categoryStats = categories.map(cat => ({
    name: cat.name,
    count: products.filter(p => p.category === cat.slug).length,
    percentage: Math.round((products.filter(p => p.category === cat.slug).length / products.length) * 100),
  }));

  const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string }> = {
    pending: { label: 'Αναμονή', icon: Clock, color: 'text-yellow-600' },
    processing: { label: 'Επεξεργασία', icon: AlertCircle, color: 'text-blue-600' },
    shipped: { label: 'Απεστάλη', icon: CheckCircle, color: 'text-green-600' },
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Καλωσήρθατε στο Admin Panel της PROBAGNO</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/products">
            <Button variant="outline" className="gap-2">
              <Package className="w-4 h-4" />
              Προϊόντα
            </Button>
          </Link>
          <Link to="/" target="_blank">
            <Button className="gap-2">
              <Eye className="w-4 h-4" />
              Προβολή Shop
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-10 rounded-bl-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500`} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                    <p className="text-3xl font-display font-semibold mt-1">{stat.value}</p>
                    <p
                      className={`text-sm mt-1 ${
                        stat.changeType === 'positive'
                          ? 'text-emerald-600'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Products */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">Πρόσφατα Προϊόντα</CardTitle>
            <Link to="/admin/products">
              <Button variant="ghost" size="sm" className="gap-1">
                Όλα <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{product.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">
                      {product.category} • {product.dimensions.length} παραλλαγές
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">€{product.basePrice.toLocaleString()}</p>
                    {product.featured && (
                      <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">Featured</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Κατανομή Κατηγοριών</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {categoryStats.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-muted-foreground">{cat.count} προϊόντα</span>
                </div>
                <Progress value={cat.percentage} className="h-2" />
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">Πρόσφατες Παραγγελίες</CardTitle>
            <Link to="/admin/orders">
              <Button variant="ghost" size="sm" className="gap-1">
                Όλες <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order, index) => {
                const status = statusConfig[order.status];
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${status.color}`}>
                        <status.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">€{order.total.toLocaleString()}</p>
                      <p className={`text-sm ${status.color}`}>{status.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Γρήγορες Ενέργειες</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Package, label: 'Νέο Προϊόν', href: '/admin/products', color: 'bg-blue-500' },
                { icon: FolderTree, label: 'Κατηγορίες', href: '/admin/categories', color: 'bg-purple-500' },
                { icon: ShoppingCart, label: 'Παραγγελίες', href: '/admin/orders', color: 'bg-emerald-500' },
                { icon: Users, label: 'Πελάτες', href: '/admin/customers', color: 'bg-amber-500' },
              ].map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={action.href}>
                    <div className="group p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all text-center cursor-pointer">
                      <div className={`w-12 h-12 mx-auto rounded-xl ${action.color} bg-opacity-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <action.icon className={`w-6 h-6 ${action.color.replace('bg-', 'text-')}`} />
                      </div>
                      <h3 className="font-medium">{action.label}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Επισκόπηση Αποθέματος</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20">
              <CheckCircle className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
              <p className="text-2xl font-bold text-emerald-600">{inStockCount}</p>
              <p className="text-sm text-muted-foreground">Σε Απόθεμα</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-red-50 dark:bg-red-950/20">
              <AlertCircle className="w-8 h-8 mx-auto text-red-600 mb-2" />
              <p className="text-2xl font-bold text-red-600">{products.length - inStockCount}</p>
              <p className="text-sm text-muted-foreground">Εξαντλημένα</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20">
              <TrendingUp className="w-8 h-8 mx-auto text-amber-600 mb-2" />
              <p className="text-2xl font-bold text-amber-600">{featuredCount}</p>
              <p className="text-sm text-muted-foreground">Featured</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20">
              <BarChart3 className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-blue-600">{products.filter(p => p.bestSeller).length}</p>
              <p className="text-sm text-muted-foreground">Best Sellers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
