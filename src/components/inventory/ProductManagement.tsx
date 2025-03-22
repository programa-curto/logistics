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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/inventory";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  FileDown,
  FileUp,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const products: Product[] = [
  {
    id: "p1",
    name: "Flour (All Purpose)",
    sku: "FL-001",
    category: "Baking Essentials",
    currentStock: 35,
    minStockLevel: 20,
    unitCost: 1.25,
    unitPrice: 2.5,
    supplier: "Global Foods Supply",
    location: "Shelf A1",
    lastUpdated: "2023-06-10T14:30:00Z",
  },
  {
    id: "p2",
    name: "Sugar (Granulated)",
    sku: "SG-002",
    category: "Baking Essentials",
    currentStock: 42,
    minStockLevel: 15,
    unitCost: 0.85,
    unitPrice: 1.75,
    supplier: "Sweet Ingredients Co.",
    location: "Shelf A2",
    lastUpdated: "2023-06-12T09:15:00Z",
  },
  {
    id: "p3",
    name: "Chocolate Chips",
    sku: "CC-003",
    category: "Baking Additives",
    currentStock: 28,
    minStockLevel: 10,
    unitCost: 2.5,
    unitPrice: 4.25,
    supplier: "Cocoa Delights Inc.",
    location: "Shelf B1",
    lastUpdated: "2023-06-11T11:45:00Z",
  },
  {
    id: "p4",
    name: "Vanilla Extract",
    sku: "VE-004",
    category: "Flavorings",
    currentStock: 15,
    minStockLevel: 5,
    unitCost: 4.75,
    unitPrice: 8.99,
    supplier: "Flavor Essentials Inc.",
    location: "Shelf C3",
    lastUpdated: "2023-06-09T16:20:00Z",
  },
  {
    id: "p5",
    name: "Baking Powder",
    sku: "BP-005",
    category: "Baking Essentials",
    currentStock: 3,
    minStockLevel: 10,
    unitCost: 1.5,
    unitPrice: 2.99,
    supplier: "Baking Supplies Co.",
    location: "Shelf A3",
    lastUpdated: "2023-06-08T10:10:00Z",
  },
];

const categories = [
  "All Categories",
  "Baking Essentials",
  "Baking Additives",
  "Flavorings",
  "Dairy",
  "Nuts & Seeds",
  "Packaging",
];

export default function ProductManagement() {
  const {
    t,
    formatCurrency,
    ivaEnabled,
    ivaRate,
    setIvaRate,
    calculatePriceWithIVA,
  } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t("allCategories"));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === t("allCategories") ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddStock = (product: Product) => {
    setSelectedProduct(product);
    setIsStockDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("productManagement")}
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("addProduct")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? t("editProduct") : t("addProduct")}
              </DialogTitle>
              <DialogDescription>
                {selectedProduct
                  ? t("updateProductDetails")
                  : t("fillProductDetails")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t("productName")}
                  </label>
                  <Input
                    id="name"
                    defaultValue={selectedProduct?.name}
                    placeholder={t("enterProductName")}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sku" className="text-sm font-medium">
                    {t("sku")}
                  </label>
                  <Input
                    id="sku"
                    defaultValue={selectedProduct?.sku}
                    placeholder={t("enterSKU")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    {t("category")}
                  </label>
                  <Select defaultValue={selectedProduct?.category}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectCategory")} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    {t("location")}
                  </label>
                  <Input
                    id="location"
                    defaultValue={selectedProduct?.location}
                    placeholder={t("enterLocation")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="minStock" className="text-sm font-medium">
                    {t("minStockLevel")}
                  </label>
                  <Input
                    id="minStock"
                    type="number"
                    defaultValue={selectedProduct?.minStockLevel.toString()}
                    placeholder={t("enterMinStockLevel")}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="supplier" className="text-sm font-medium">
                    {t("supplier")}
                  </label>
                  <Input
                    id="supplier"
                    defaultValue={selectedProduct?.supplier}
                    placeholder={t("enterSupplier")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="unitCost" className="text-sm font-medium">
                    {t("unitCost")} (€)
                  </label>
                  <Input
                    id="unitCost"
                    type="number"
                    step="0.01"
                    defaultValue={selectedProduct?.unitCost.toString()}
                    placeholder={t("enterUnitCost")}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="unitPrice" className="text-sm font-medium">
                    {t("unitPriceWithoutIVA")} (€)
                  </label>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    defaultValue={selectedProduct?.unitPrice.toString()}
                    placeholder={t("enterUnitPrice")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="ivaRate" className="text-sm font-medium">
                    {t("enterIVARate")}
                  </label>
                  <Input
                    id="ivaRate"
                    type="number"
                    step="0.1"
                    defaultValue={ivaRate.toString()}
                    onChange={(e) =>
                      setIvaRate(parseFloat(e.target.value) || 0)
                    }
                    placeholder={t("enterIVARate")}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="unitPriceWithIVA"
                    className="text-sm font-medium"
                  >
                    {t("unitPriceWithIVA")} (€)
                  </label>
                  <Input
                    id="unitPriceWithIVA"
                    type="number"
                    step="0.01"
                    value={
                      selectedProduct
                        ? calculatePriceWithIVA(
                            selectedProduct.unitPrice,
                          ).toFixed(2)
                        : ""
                    }
                    readOnly
                    className="bg-muted"
                  />
                </div>
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
                {selectedProduct ? t("updateProduct") : t("addProduct")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchProducts")}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder={t("selectCategory")} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <FileDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <FileUp className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <div className="flex items-center space-x-1">
                  <span>{t("productName")}</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>{t("sku")}</TableHead>
              <TableHead>{t("category")}</TableHead>
              <TableHead className="text-right">{t("stock")}</TableHead>
              <TableHead className="text-right">
                {ivaEnabled ? t("unitPriceWithIVA") : t("unitPriceWithoutIVA")}
              </TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      product.currentStock < product.minStockLevel
                        ? "text-destructive font-medium"
                        : ""
                    }
                  >
                    {product.currentStock}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {ivaEnabled
                    ? formatCurrency(calculatePriceWithIVA(product.unitPrice))
                    : formatCurrency(product.unitPrice)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog
                      open={isStockDialogOpen}
                      onOpenChange={setIsStockDialogOpen}
                    >
                      {selectedProduct?.id === product.id && (
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{t("updateStock")}</DialogTitle>
                            <DialogDescription>
                              {t("updateStockFor")} {selectedProduct.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                {t("currentStockLabel")}{" "}
                                {selectedProduct.currentStock}
                              </label>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label
                                  htmlFor="quantity"
                                  className="text-sm font-medium"
                                >
                                  {t("quantity")}
                                </label>
                                <Input
                                  id="quantity"
                                  type="number"
                                  placeholder={t("enterQuantity")}
                                />
                              </div>
                              <div className="space-y-2">
                                <label
                                  htmlFor="type"
                                  className="text-sm font-medium"
                                >
                                  {t("type")}
                                </label>
                                <Select defaultValue="incoming">
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={t("selectType")}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="incoming">
                                      {t("incoming")}
                                    </SelectItem>
                                    <SelectItem value="outgoing">
                                      {t("outgoing")}
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label
                                htmlFor="source"
                                className="text-sm font-medium"
                              >
                                {t("sourceDestination")}
                              </label>
                              <Input
                                id="source"
                                placeholder={t("enterSourceDestination")}
                              />
                            </div>
                            <div className="space-y-2">
                              <label
                                htmlFor="notes"
                                className="text-sm font-medium"
                              >
                                {t("notes")}
                              </label>
                              <Input id="notes" placeholder={t("enterNotes")} />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsStockDialogOpen(false)}
                            >
                              {t("cancel")}
                            </Button>
                            <Button onClick={() => setIsStockDialogOpen(false)}>
                              {t("updateStock")}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddStock(product)}
                    >
                      {t("updateStock")}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditProduct(product)}
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
    </div>
  );
}
