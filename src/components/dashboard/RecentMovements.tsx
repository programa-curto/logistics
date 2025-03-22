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
import { StockMovement } from "@/types/inventory";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const recentMovements: StockMovement[] = [
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
];

export default function RecentMovements() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Movements</CardTitle>
        <CardDescription>Latest inventory transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="hidden md:table-cell">
                Source/Destination
              </TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentMovements.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell className="font-medium">
                  {movement.productName}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {movement.type === "incoming" ? (
                      <>
                        <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                        <span>Incoming</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="mr-2 h-4 w-4 text-blue-500" />
                        <span>Outgoing</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>{movement.quantity}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {movement.type === "incoming"
                    ? movement.source
                    : movement.destination}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(movement.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
