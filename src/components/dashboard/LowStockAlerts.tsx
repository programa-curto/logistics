import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StockAlert } from "@/types/inventory";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const lowStockItems: StockAlert[] = [
  {
    productId: "p5",
    productName: "Baking Powder",
    currentStock: 3,
    minStockLevel: 10,
    deficit: 7,
  },
  {
    productId: "p8",
    productName: "Cocoa Powder",
    currentStock: 2,
    minStockLevel: 8,
    deficit: 6,
  },
  {
    productId: "p12",
    productName: "Almond Extract",
    currentStock: 4,
    minStockLevel: 6,
    deficit: 2,
  },
  {
    productId: "p15",
    productName: "Brown Sugar",
    currentStock: 5,
    minStockLevel: 15,
    deficit: 10,
  },
];

export default function LowStockAlerts() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Low Stock Alerts</CardTitle>
          <CardDescription>Items below minimum threshold</CardDescription>
        </div>
        <Button size="sm">Order All</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Min Level</TableHead>
              <TableHead>Deficit</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockItems.map((item) => (
              <TableRow key={item.productId}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                    {item.productName}
                  </div>
                </TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>{item.minStockLevel}</TableCell>
                <TableCell className="text-destructive">
                  {item.deficit}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
