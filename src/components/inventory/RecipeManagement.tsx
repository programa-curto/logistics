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
import { Recipe, Product } from "@/types/inventory";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  FileDown,
  Calculator,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const recipes: Recipe[] = [
  {
    id: "r1",
    name: "Chocolate Chip Cookies",
    description:
      "Classic chocolate chip cookies with a crisp edge and chewy center",
    ingredients: [
      {
        productId: "p1",
        productName: "Flour (All Purpose)",
        quantity: 2.5,
        unitCost: 1.25,
        totalCost: 3.13,
      },
      {
        productId: "p2",
        productName: "Sugar (Granulated)",
        quantity: 1,
        unitCost: 0.85,
        totalCost: 0.85,
      },
      {
        productId: "p3",
        productName: "Chocolate Chips",
        quantity: 1.5,
        unitCost: 2.5,
        totalCost: 3.75,
      },
    ],
    sellingPrice: 12.99,
    totalCost: 7.73,
    profitMargin: 40.49,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-06-10T14:45:00Z",
  },
  {
    id: "r2",
    name: "Vanilla Cupcakes",
    description: "Light and fluffy vanilla cupcakes with buttercream frosting",
    ingredients: [
      {
        productId: "p1",
        productName: "Flour (All Purpose)",
        quantity: 1.5,
        unitCost: 1.25,
        totalCost: 1.88,
      },
      {
        productId: "p2",
        productName: "Sugar (Granulated)",
        quantity: 1.25,
        unitCost: 0.85,
        totalCost: 1.06,
      },
      {
        productId: "p4",
        productName: "Vanilla Extract",
        quantity: 0.25,
        unitCost: 4.75,
        totalCost: 1.19,
      },
    ],
    sellingPrice: 9.99,
    totalCost: 4.13,
    profitMargin: 58.66,
    createdAt: "2023-05-20T11:15:00Z",
    updatedAt: "2023-06-12T09:30:00Z",
  },
  {
    id: "r3",
    name: "Blueberry Muffins",
    description: "Moist blueberry muffins with a streusel topping",
    ingredients: [
      {
        productId: "p1",
        productName: "Flour (All Purpose)",
        quantity: 2,
        unitCost: 1.25,
        totalCost: 2.5,
      },
      {
        productId: "p2",
        productName: "Sugar (Granulated)",
        quantity: 0.75,
        unitCost: 0.85,
        totalCost: 0.64,
      },
      {
        productId: "p5",
        productName: "Baking Powder",
        quantity: 0.1,
        unitCost: 1.5,
        totalCost: 0.15,
      },
    ],
    sellingPrice: 8.49,
    totalCost: 3.29,
    profitMargin: 61.25,
    createdAt: "2023-06-01T09:00:00Z",
    updatedAt: "2023-06-14T10:20:00Z",
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

export default function RecipeManagement() {
  const {
    t,
    formatCurrency,
    ivaEnabled,
    ivaRate,
    setIvaRate,
    calculatePriceWithIVA,
  } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRecipeDialogOpen, setIsRecipeDialogOpen] = useState(false);
  const [isIngredientDialogOpen, setIsIngredientDialogOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<
    Recipe["ingredients"]
  >([]);

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleEditRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setSelectedIngredients([...recipe.ingredients]);
    setIsRecipeDialogOpen(true);
  };

  const handleAddIngredient = () => {
    setIsIngredientDialogOpen(true);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...selectedIngredients];
    newIngredients.splice(index, 1);
    setSelectedIngredients(newIngredients);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("recipeManagement")}
        </h2>
        <Dialog open={isRecipeDialogOpen} onOpenChange={setIsRecipeDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("addRecipe")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>
                {selectedRecipe ? t("editRecipe") : t("addRecipe")}
              </DialogTitle>
              <DialogDescription>
                {selectedRecipe
                  ? t("updateRecipeDetails")
                  : t("fillRecipeDetails")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t("recipeName")}
                  </label>
                  <Input
                    id="name"
                    defaultValue={selectedRecipe?.name}
                    placeholder={t("enterRecipeName")}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sellingPrice" className="text-sm font-medium">
                    {t("sellingPriceWithoutIVA")} (€)
                  </label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    step="0.01"
                    defaultValue={selectedRecipe?.sellingPrice.toString()}
                    placeholder={t("enterSellingPrice")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  {t("description")}
                </label>
                <Input
                  id="description"
                  defaultValue={selectedRecipe?.description}
                  placeholder={t("enterRecipeDescription")}
                />
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
                    htmlFor="sellingPriceWithIVA"
                    className="text-sm font-medium"
                  >
                    {t("sellingPriceWithIVA")} (€)
                  </label>
                  <Input
                    id="sellingPriceWithIVA"
                    type="number"
                    step="0.01"
                    value={
                      selectedRecipe
                        ? calculatePriceWithIVA(
                            selectedRecipe.sellingPrice,
                          ).toFixed(2)
                        : ""
                    }
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    {t("ingredients")}
                  </label>
                  <Dialog
                    open={isIngredientDialogOpen}
                    onOpenChange={setIsIngredientDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleAddIngredient}
                      >
                        <Plus className="mr-1 h-3 w-3" /> {t("addIngredient")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>{t("addIngredient")}</DialogTitle>
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
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder={t("selectProduct")} />
                            </SelectTrigger>
                            <SelectContent>
                              {products.map((product) => (
                                <SelectItem key={product.id} value={product.id}>
                                  {product.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
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
                            step="0.01"
                            placeholder={t("enterQuantity")}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsIngredientDialogOpen(false)}
                        >
                          {t("cancel")}
                        </Button>
                        <Button
                          onClick={() => setIsIngredientDialogOpen(false)}
                        >
                          {t("addIngredient")}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("product")}</TableHead>
                        <TableHead className="text-right">
                          {t("quantity")}
                        </TableHead>
                        <TableHead className="text-right">
                          {t("unitCost")}
                        </TableHead>
                        <TableHead className="text-right">
                          {t("totalCost")}
                        </TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedIngredients.map((ingredient, index) => (
                        <TableRow key={index}>
                          <TableCell>{ingredient.productName}</TableCell>
                          <TableCell className="text-right">
                            {ingredient.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(ingredient.unitCost)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(ingredient.totalCost)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveIngredient(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    {t("totalCost")}
                  </label>
                  <div className="text-xl font-bold">
                    {formatCurrency(
                      selectedIngredients.reduce(
                        (sum, ing) => sum + ing.totalCost,
                        0,
                      ),
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    {ivaEnabled
                      ? t("sellingPriceWithIVA")
                      : t("sellingPriceWithoutIVA")}
                  </label>
                  <div className="text-xl font-bold">
                    {selectedRecipe
                      ? ivaEnabled
                        ? formatCurrency(
                            calculatePriceWithIVA(selectedRecipe.sellingPrice),
                          )
                        : formatCurrency(selectedRecipe.sellingPrice)
                      : formatCurrency(0)}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    {t("profitMargin")}
                  </label>
                  <div className="text-xl font-bold text-green-600">
                    {selectedRecipe
                      ? selectedRecipe.profitMargin.toFixed(2)
                      : "0.00"}
                    %
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsRecipeDialogOpen(false)}
              >
                {t("cancel")}
              </Button>
              <Button onClick={() => setIsRecipeDialogOpen(false)}>
                {selectedRecipe ? t("updateRecipe") : t("addRecipe")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchRecipes")}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <FileDown className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Calculator className="mr-2 h-4 w-4" />
            {t("costAnalysis")}
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <div className="flex items-center space-x-1">
                  <span>{t("recipeName")}</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>{t("ingredients")}</TableHead>
              <TableHead className="text-right">{t("cost")}</TableHead>
              <TableHead className="text-right">{t("price")}</TableHead>
              <TableHead className="text-right">{t("margin")}</TableHead>
              <TableHead className="text-right">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell className="font-medium">{recipe.name}</TableCell>
                <TableCell>
                  {recipe.ingredients.length} {t("items")}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(recipe.totalCost)}
                </TableCell>
                <TableCell className="text-right">
                  {ivaEnabled
                    ? formatCurrency(calculatePriceWithIVA(recipe.sellingPrice))
                    : formatCurrency(recipe.sellingPrice)}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-green-600">
                    {recipe.profitMargin.toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditRecipe(recipe)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      {t("edit")}
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
