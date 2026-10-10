import { useEffect, useState } from "react";
import { Building2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function BulkOfferPopup() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("luxlife.bulk-offer.dismissed")) return;
    } catch { /* storage may be unavailable */ }
    const timer = window.setTimeout(() => setOpen(true), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  const changeOpen = (value: boolean) => {
    setOpen(value);
    if (!value) {
      try { sessionStorage.setItem("luxlife.bulk-offer.dismissed", "1"); } catch { /* optional persistence */ }
    }
  };
  const message = encodeURIComponent("Hello Luxlife! I would like a bulk-order offer. Quantity: ___ mattresses. Sizes: ___. Delivery location: ___. Please share your factory quote and payment details.");

  return (
    <>
      <Button variant="outline" className="mt-5 border-ink text-ink" onClick={() => setOpen(true)}>
        <Building2 /> Bulk customer offer
      </Button>
      <Dialog open={open} onOpenChange={changeOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-lg p-7">
          <Building2 className="size-8 text-foreground" strokeWidth={1.5} />
          <DialogHeader className="text-left">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Factory direct · Bulk orders</p>
            <DialogTitle className="text-3xl leading-tight">More comfort.<br />A quote made for you.</DialogTitle>
            <DialogDescription className="pt-3 leading-relaxed">
              Buying for a hotel, business, or multiple homes? Ask our Salem factory for a personalised bulk-order offer.
            </DialogDescription>
          </DialogHeader>
          <p className="border-y border-border py-4 text-sm">50% advance, remaining 50% later — or choose full payment.</p>
          <Button asChild className="h-auto min-h-11 whitespace-normal py-3">
            <a href={`https://wa.me/916382654934?text=${message}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> Get my bulk quote
            </a>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}