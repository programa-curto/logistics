import { Link, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  FileSpreadsheet,
  BarChart3,
  LogOut,
  Menu,
  X,
  Store,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const getNavItems = (t: (key: string) => string): NavItem[] => [
  {
    title: t("dashboard"),
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: t("productManagement"),
    href: "/products",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: t("recipeManagement"),
    href: "/recipes",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    title: t("supplierManagement"),
    href: "/suppliers",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: t("salesAuditing"),
    href: "/sales",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    title: t("reports"),
    href: "/reports",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLocale();
  const navItems = getNavItems(t);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card">
        <div className="p-6">
          <h1 className="text-2xl font-bold">{t("inventoryManagement")}</h1>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              )}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link to="/login">
              <LogOut className="mr-2 h-4 w-4" />
              {t("logout")}
            </Link>
          </Button>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden border-b bg-card p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">{t("inventoryManagement")}</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-b">
            <nav className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
              <Button
                variant="outline"
                className="w-full justify-start mt-4"
                asChild
              >
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout")}
                </Link>
              </Button>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
