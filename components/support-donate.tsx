"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SupportDonateButton() {
  const { t } = useI18n();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
          className="bg-background text-foreground hover:bg-muted text-base font-semibold transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-100"
        >
          <Heart className="size-5 mr-2" />
          {t.donate.donate}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t.donate.title}</DialogTitle>
          <DialogDescription>{t.donate.desc}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border rounded-lg p-3">
            <p className="font-medium text-foreground mb-2 text-sm">
              {t.donate.wechat}
            </p>
            <div className="relative mx-auto h-40 w-40">
              <Image
                src="/wechat-qr.png"
                alt="微信收款码"
                fill
                sizes="160px"
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="border rounded-lg p-3">
            <p className="font-medium text-foreground mb-2 text-sm">
              {t.donate.alipay}
            </p>
            <div className="relative mx-auto h-40 w-40">
              <Image
                src="/alipay-qr.png"
                alt="支付宝收款码"
                fill
                sizes="160px"
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="border rounded-lg p-3">
            <p className="font-medium text-foreground mb-2 text-sm">
              {t.donate.paypal}
            </p>
            <div className="relative mx-auto h-40 w-40">
              <Image
                src="/paypal-qr.png"
                alt="PayPal 收款码"
                fill
                sizes="160px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">{t.donate.close}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
