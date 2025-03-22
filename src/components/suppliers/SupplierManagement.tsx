import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Supplier, SupplierProduct, PurchaseHistory } from "@/types/inventory";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  FileDown,
  Package,
  History,
  Phone,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

// Mock data for suppliers
const suppliers: Supplier[] = [
  {
    id: "s1",
    name: "Global Foods Supply",
    contactPerson: "João Silva",
    email: "joao.silva@globalfoods.pt",
    phone: "+351 912 345 678",
    address: "Rua da Indústria, 123, Lisboa",
    products: [
      {
        productId: "p1",
        productName: "Farinha (Uso Geral)",
        price: 1.25,
        lastUpdated: "2023-06-10T14:30:00Z",
      },
      {
        productId: "p5",
        productName: "Fermento em Pó",
        price: 1.5,
        lastUpdated: "2023-06-08T10:10:00Z",
      },
    ],
    purchaseHistory: [
      {
        id: "ph1",
        date: "2023-06-10T14:30:00Z",
        products: [
          {
            productId: "p1",
            productName: "Farinha (Uso Geral)",
            quantity: 50,
            unitPrice: 1.25,
            totalPrice: 62.5,
          },
        ],
        totalAmount: 62.5,
        notes: "Entrega regular mensal",
      },
    ],
  },
  {
    id: "s2",
    name: "Sweet Ingredients Co.",
    contactPerson: "Ana Ferreira",
    email: "ana.ferreira@sweetingredients.pt",
    phone: "+351 923 456 789",
    address: "Avenida do Comércio, 456, Porto",
    products: [
      {
        productId: "p2",
        productName: "Açúcar (Granulado)",
        price: 0.85,
        lastUpdated: "2023-06-12T09:15:00Z",
      },
    ],
    purchaseHistory: [
      {
        id: "ph2",
        date: "2023-06-12T09:15:00Z",
        products: [
          {
            productId: "p2",
            productName: "Açúcar (Granulado)",
            quantity: 25,
            unitPrice: 0.85,
            totalPrice: 21.25,
          },
        ],
        totalAmount: 21.25,
        notes: "Pedido urgente",
      },
    ],
  },
  {
    id: "s3",
    name: "Cocoa Delights Inc.",
    contactPerson: "Miguel Costa",
    email: "miguel.costa@cocoadelights.pt",
    phone: "+351 934 567 890",
    address: "Praça do Cacau, 789, Braga",
    products: [
      {
        productId: "p3",
        productName: "Gotas de Chocolate",
        price: 2.5,
        lastUpdated: "2023-06-11T11:45:00Z",
      },
    ],
    purchaseHistory: [
      {
        id: "ph3",
        date: "2023-06-11T11:45:00Z",
        products: [
          {
            productId: "p3",
            productName: "Gotas de Chocolate",
            quantity: 30,
            unitPrice: 2.5,
            totalPrice: 75.0,
          },
        ],
        totalAmount: 75.0,
      },
    ],
  },
];

export default function SupplierManagement() {
  const { t, formatCurrency } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const [selectedTab, setSelectedTab] = useState("details");

  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsAddDialogOpen(true);
  };

  const handleViewSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setSelectedTab("details");
  };

  const handleAddProduct = () => {
    setIsProductDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("supplierManagement")}
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("addSupplier")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedSupplier ? t("editSupplier") : t("addSupplier")}
              </DialogTitle>
              <DialogDescription>
                {selectedSupplier
                  ? t("updateSupplierDetails")
                  : t("fillSupplierDetails")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t("supplierName")}
                  </label>
                  <Input
                    id="name"
                    defaultValue={selectedSupplier?.name}
                    placeholder={t("enterSupplierName")}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contactPerson"
                    className="text-sm font-medium"
                  >
                    {t("contactPerson")}
                  </label>
                  <Input
                    id="contactPerson"
                    defaultValue={selectedSupplier?.contactPerson}
                    placeholder={t("enterContactPerson")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t("email")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={selectedSupplier?.email}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    {t("phone")}
                  </label>
                  <Input
                    id="phone"
                    defaultValue={selectedSupplier?.phone}
                    placeholder={t("enterPhone")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  {t("address")}
                </label>
                <Input
                  id="address"
                  defaultValue={selectedSupplier?.address}
                  placeholder={t("enterAddress")}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                {t("cancel")}
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                {selectedSupplier ? t("updateSupplier") : t("addSupplier")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchSuppliers")}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <FileDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {selectedSupplier ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{selectedSupplier.name}</h3>
              <p className="text-muted-foreground">
                {t("contactPerson")}: {selectedSupplier.contactPerson}
              </p>
            </div>
            <Button variant="outline" onClick={() => setSelectedSupplier(null)}>
              {t("back")}
            </Button>
          </div>

          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">{t("details")}</TabsTrigger>
              <TabsTrigger value="products">
                {t("supplierProducts")}
              </TabsTrigger>
              <TabsTrigger value="history">{t("purchaseHistory")}</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {t("contactPerson")}
                      </p>
                      <p>{selectedSupplier.contactPerson}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{t("email")}</p>
                      <p>{selectedSupplier.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{t("phone")}</p>
                      <p>{selectedSupplier.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{t("address")}</p>
                      <p>{selectedSupplier.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {t("supplierProducts")}
                      </p>
                      <p>
                        {selectedSupplier.products.length} {t("items")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <History className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {t("totalPurchases")}
                      </p>
                      <p>
                        {formatCurrency(
                          selectedSupplier.purchaseHistory.reduce(
                            (sum, purchase) => sum + purchase.totalAmount,
                            0,
                          ),
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{t("supplierProducts")}</h3>
                <Dialog
                  open={isProductDialogOpen}
                  onOpenChange={setIsProductDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={handleAddProduct}>
                      <Plus className="mr-2 h-4 w-4" />
                      {t("addSupplierProduct")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>{t("addSupplierProduct")}</DialogTitle>
                      <DialogDescription>
                        {t("selectProductAndQuantity")}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="product"
                          className="text-sm font-medium"
                        >
                          {t("product")}
                        </label>
                        <Input
                          id="product"
                          placeholder={t("enterProductName")}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="price" className="text-sm font-medium">
                          {t("supplierProductPrice")}
                        </label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          placeholder={t("enterSupplierProductPrice")}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsProductDialogOpen(false)}
                      >
                        {t("cancel")}
                      </Button>
                      <Button onClick={() => setIsProductDialogOpen(false)}>
                        {t("add")}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">
                        <div className="flex items-center space-x-1">
                          <span>{t("product")}</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="text-right">{t("price")}</TableHead>
                      <TableHead className="text-right">
                        {t("lastUpdated")}
                      </TableHead>
                      <TableHead className="text-right">
                        {t("actions")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSupplier.products.map((product) => (
                      <TableRow key={product.productId}>
                        <TableCell className="font-medium">
                          {product.productName}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(product.price)}
                        </TableCell>
                        <TableCell className="text-right">
                          {new Date(product.lastUpdated).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <h3 className="text-lg font-medium">{t("purchaseHistory")}</h3>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center space-x-1">
                          <span>{t("date")}</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>{t("products")}</TableHead>
                      <TableHead className="text-right">
                        {t("totalAmount")}
                      </TableHead>
                      <TableHead>{t("notes")}</TableHead>
                      <TableHead className="text-right">
                        {t("actions")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSupplier.purchaseHistory.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell>
                          {new Date(purchase.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {purchase.products.length} {t("items")}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(purchase.totalAmount)}
                        </TableCell>
                        <TableCell>{purchase.notes || "-"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              {t("view")}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <div className="flex items-center space-x-1">
                    <span>{t("supplierName")}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>{t("contactPerson")}</TableHead>
                <TableHead className="hidden md:table-cell">
                  {t("email")}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {t("phone")}
                </TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contactPerson}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {supplier.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {supplier.phone}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewSupplier(supplier)}
                      >
                        {t("view")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditSupplier(supplier)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
