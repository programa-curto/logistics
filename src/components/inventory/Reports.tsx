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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { StockMovement, Product } from "@/types/inventory";
import {
  FileDown,
  Filter,
  BarChart,
  ArrowUpDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const stockMovements: StockMovement[] = [
  {
    id: "1",
    productId: "p1",
    productName: "Flour (All Purpose)",
    type: "incoming",
    quantity: 50,
    source: "Global Foods Supply",
    destination: "Main Warehouse",
    date: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    productId: "p2",
    productName: "Sugar (Granulated)",
    type: "incoming",
    quantity: 25,
    source: "Sweet Ingredients Co.",
    destination: "Main Warehouse",
    date: "2023-06-15T11:45:00Z",
  },
  {
    id: "3",
    productId: "p3",
    productName: "Chocolate Chips",
    type: "outgoing",
    quantity: 10,
    source: "Main Warehouse",
    destination: "Bakery Department",
    date: "2023-06-15T13:15:00Z",
  },
  {
    id: "4",
    productId: "p1",
    productName: "Flour (All Purpose)",
    type: "outgoing",
    quantity: 15,
    source: "Main Warehouse",
    destination: "Bakery Department",
    date: "2023-06-15T14:30:00Z",
  },
  {
    id: "5",
    productId: "p4",
    productName: "Vanilla Extract",
    type: "incoming",
    quantity: 12,
    source: "Flavor Essentials Inc.",
    destination: "Main Warehouse",
    date: "2023-06-15T15:45:00Z",
  },
  {
    id: "6",
    productId: "p2",
    productName: "Sugar (Granulated)",
    type: "outgoing",
    quantity: 8,
    source: "Main Warehouse",
    destination: "Bakery Department",
    date: "2023-06-16T09:30:00Z",
  },
  {
    id: "7",
    productId: "p5",
    productName: "Baking Powder",
    type: "incoming",
    quantity: 15,
    source: "Baking Supplies Co.",
    destination: "Main Warehouse",
    date: "2023-06-16T11:15:00Z",
  },
  {
    id: "8",
    productId: "p3",
    productName: "Chocolate Chips",
    type: "outgoing",
    quantity: 5,
    source: "Main Warehouse",
    destination: "Bakery Department",
    date: "2023-06-16T14:00:00Z",
  },
];

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

export default function Reports() {
  const { t, formatCurrency, ivaEnabled, calculatePriceWithIVA } = useLocale();
  const [selectedTab, setSelectedTab] = useState("inventory");
  const [selectedCategory, setSelectedCategory] = useState(t("allCategories"));
  const [selectedMovementType, setSelectedMovementType] = useState("all");

  const filteredMovements = stockMovements.filter((movement) => {
    if (selectedMovementType === "all") return true;
    return movement.type === selectedMovementType;
  });

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === t("allCategories")) return true;
    return product.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{t("reports")}</h2>
        <Button>
          <FileDown className="mr-2 h-4 w-4" />
          {t("exportReport")}
        </Button>
      </div>

      <Tabs
        defaultValue="inventory"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">{t("inventoryMovement")}</TabsTrigger>
          <TabsTrigger value="loss">{t("lossReport")}</TabsTrigger>
          <TabsTrigger value="cost">{t("costAnalysis")}</TabsTrigger>
        </TabsList>

        {/* Inventory Movement Report */}
        <TabsContent value="inventory" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <DatePickerWithRange className="w-full" />
            </div>
            <Select
              value={selectedMovementType}
              onValueChange={setSelectedMovementType}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("movementType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allMovements")}</SelectItem>
                <SelectItem value="incoming">{t("incoming")}</SelectItem>
                <SelectItem value="outgoing">{t("outgoing")}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {t("moreFilters")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2 space-y-4">
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
                      <TableHead>{t("product")}</TableHead>
                      <TableHead>{t("type")}</TableHead>
                      <TableHead className="text-right">
                        {t("quantity")}
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        {t("sourceDestination")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>
                          {new Date(movement.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          {movement.productName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {movement.type === "incoming" ? (
                              <>
                                <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                                <span>{t("incoming")}</span>
                              </>
                            ) : (
                              <>
                                <ArrowDownRight className="mr-2 h-4 w-4 text-blue-500" />
                                <span>{t("outgoing")}</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {movement.quantity}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {movement.type === "incoming"
                            ? movement.source
                            : movement.destination}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="col-span-1 space-y-4">
              <div className="rounded-md border bg-card p-4">
                <h3 className="text-lg font-medium mb-4">{t("summary")}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("totalMovements")}</span>
                    <span className="font-bold">
                      {filteredMovements.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("incoming")}:</span>
                    <span className="font-bold text-green-600">
                      {
                        filteredMovements.filter((m) => m.type === "incoming")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("outgoing")}:</span>
                    <span className="font-bold text-blue-600">
                      {
                        filteredMovements.filter((m) => m.type === "outgoing")
                          .length
                      }
                    </span>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">
                      {t("topProducts")}
                    </h4>
                    <div className="space-y-2">
                      {Array.from(
                        new Set(filteredMovements.map((m) => m.productId)),
                      )
                        .slice(0, 3)
                        .map((productId) => {
                          const product = products.find(
                            (p) => p.id === productId,
                          );
                          const count = filteredMovements.filter(
                            (m) => m.productId === productId,
                          ).length;
                          return (
                            <div
                              key={productId}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm truncate">
                                {product?.name}
                              </span>
                              <span className="font-medium">{count}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border bg-card p-4">
                <h3 className="text-lg font-medium mb-2">{t("chart")}</h3>
                <div className="flex items-center justify-center h-40 bg-muted/30 rounded-md">
                  <BarChart className="h-10 w-10 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {t("movementChart")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Loss Report */}
        <TabsContent value="loss" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <DatePickerWithRange className="w-full" />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("category")} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {t("moreFilters")}
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("product")}</TableHead>
                  <TableHead>{t("category")}</TableHead>
                  <TableHead className="text-right">
                    {t("lostQuantity")}
                  </TableHead>
                  <TableHead className="text-right">{t("unitCost")}</TableHead>
                  <TableHead className="text-right">{t("totalLoss")}</TableHead>
                  <TableHead>{t("reason")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    {t("noLossData")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Cost Analysis */}
        <TabsContent value="cost" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <DatePickerWithRange className="w-full" />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("category")} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {t("moreFilters")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center space-x-1">
                          <span>{t("product")}</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>{t("category")}</TableHead>
                      <TableHead className="text-right">
                        {t("unitCost")}
                      </TableHead>
                      <TableHead className="text-right">
                        {ivaEnabled
                          ? t("unitPriceWithIVA")
                          : t("unitPriceWithoutIVA")}
                      </TableHead>
                      <TableHead className="text-right">
                        {t("margin")}
                      </TableHead>
                      <TableHead className="text-right">
                        {t("stockValue")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => {
                      const margin =
                        ((product.unitPrice - product.unitCost) /
                          product.unitPrice) *
                        100;
                      const stockValue =
                        product.currentStock * product.unitCost;

                      return (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(product.unitCost)}
                          </TableCell>
                          <TableCell className="text-right">
                            {ivaEnabled
                              ? formatCurrency(
                                  calculatePriceWithIVA(product.unitPrice),
                                )
                              : formatCurrency(product.unitPrice)}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-green-600">
                              {margin.toFixed(2)}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(stockValue)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="col-span-1 space-y-4">
              <div className="rounded-md border bg-card p-4">
                <h3 className="text-lg font-medium mb-4">{t("costSummary")}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("totalProducts")}</span>
                    <span className="font-bold">{filteredProducts.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("totalStockValue")}</span>
                    <span className="font-bold">
                      {formatCurrency(
                        filteredProducts.reduce(
                          (sum, product) =>
                            sum + product.currentStock * product.unitCost,
                          0,
                        ),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("avgProfitMargin")}</span>
                    <span className="font-bold text-green-600">
                      {(
                        filteredProducts.reduce((sum, product) => {
                          const margin =
                            ((product.unitPrice - product.unitCost) /
                              product.unitPrice) *
                            100;
                          return sum + margin;
                        }, 0) / filteredProducts.length
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">
                      {t("highestValueProducts")}
                    </h4>
                    <div className="space-y-2">
                      {[...filteredProducts]
                        .sort(
                          (a, b) =>
                            b.currentStock * b.unitCost -
                            a.currentStock * a.unitCost,
                        )
                        .slice(0, 3)
                        .map((product) => {
                          const stockValue =
                            product.currentStock * product.unitCost;
                          return (
                            <div
                              key={product.id}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm truncate">
                                {product.name}
                              </span>
                              <span className="font-medium">
                                {formatCurrency(stockValue)}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border bg-card p-4">
                <h3 className="text-lg font-medium mb-2">{t("chart")}</h3>
                <div className="flex items-center justify-center h-40 bg-muted/30 rounded-md">
                  <BarChart className="h-10 w-10 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {t("costAnalysisChart")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
