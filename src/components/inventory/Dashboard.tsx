import StockSummary from "@/components/dashboard/StockSummary";
import RecentMovements from "@/components/dashboard/RecentMovements";
import LowStockAlerts from "@/components/dashboard/LowStockAlerts";

import { useLocale } from "@/contexts/LocaleContext";

export default function Dashboard() {
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {t("lastUpdated")} {new Date().toLocaleString()}
          </span>
        </div>
      </div>

      <StockSummary />

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-4">
        <RecentMovements />
        <LowStockAlerts />
      </div>
    </div>
  );
}
