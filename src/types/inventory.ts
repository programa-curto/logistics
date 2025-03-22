export type StockLocationType =
  | "sala"
  | "bar"
  | "cozinha"
  | "eventos"
  | "discoteca"
  | "armazem";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStockLevel: number;
  unitCost: number;
  unitPrice: number;
  supplierId: string;
  supplier: string;
  location: string;
  stockLocation: StockLocationType;
  lastUpdated: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: "incoming" | "outgoing";
  quantity: number;
  source: string; // supplier or internal location
  destination: string; // customer or internal location
  stockLocation: StockLocationType;
  date: string;
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  products: SupplierProduct[];
  purchaseHistory: PurchaseHistory[];
}

export interface SupplierProduct {
  productId: string;
  productName: string;
  price: number;
  lastUpdated: string;
}

export interface PurchaseHistory {
  id: string;
  date: string;
  products: PurchaseProduct[];
  totalAmount: number;
  notes?: string;
}

export interface PurchaseProduct {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
  sellingPrice: number;
  totalCost: number;
  profitMargin: number;
  preparationMethod?: string;
  preparationTime?: number; // in minutes
  portionSize?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeIngredient {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface StockAlert {
  productId: string;
  productName: string;
  currentStock: number;
  minStockLevel: number;
  deficit: number;
  stockLocation: StockLocationType;
}

export interface ReportFilter {
  dateRange: {
    from: Date;
    to: Date;
  };
  products?: string[];
  categories?: string[];
  movementTypes?: ("incoming" | "outgoing")[];
  stockLocations?: StockLocationType[];
}

export interface SalesData {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  stockLocation: StockLocationType;
  recipeId?: string; // If the sale is for a recipe product
}

export interface SalesAuditResult {
  productId: string;
  productName: string;
  expectedStock: number;
  actualStock: number;
  difference: number;
  stockLocation: StockLocationType;
  remainingAmount: number;
}

export interface IngredientUsage {
  productId: string;
  productName: string;
  totalUsed: number;
  stockLocation: StockLocationType;
  packageSize: number;
  wholeUnitsToDeduct: number;
  remainingAmount: number;
}

export interface StockAdjustment {
  productId: string;
  productName: string;
  expectedDeduction: number;
  remainingAmount: number;
  currentStock: number;
  stockLocation: StockLocationType;
}

export type UserRole = "admin" | "manager" | "staff";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
