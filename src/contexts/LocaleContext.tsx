import { createContext, useContext, useState, ReactNode } from "react";
import { ptBR } from "@/locales/pt";

type LocaleContextType = {
  t: (key: string) => string;
  currency: string;
  ivaEnabled: boolean;
  ivaRate: number;
  setIvaEnabled: (enabled: boolean) => void;
  setIvaRate: (rate: number) => void;
  formatCurrency: (value: number) => string;
  calculatePriceWithIVA: (price: number) => number;
  calculatePriceWithoutIVA: (price: number) => number;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [ivaEnabled, setIvaEnabled] = useState(true);
  const [ivaRate, setIvaRate] = useState(23); // Default IVA rate in Portugal is 23%

  // Translation function
  const t = (key: string): string => {
    return ptBR[key as keyof typeof ptBR] || key;
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-PT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Calculate price with IVA
  const calculatePriceWithIVA = (price: number): number => {
    return price * (1 + ivaRate / 100);
  };

  // Calculate price without IVA
  const calculatePriceWithoutIVA = (price: number): number => {
    return price / (1 + ivaRate / 100);
  };

  return (
    <LocaleContext.Provider
      value={{
        t,
        currency: "€",
        ivaEnabled,
        ivaRate,
        setIvaEnabled,
        setIvaRate,
        formatCurrency,
        calculatePriceWithIVA,
        calculatePriceWithoutIVA,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
