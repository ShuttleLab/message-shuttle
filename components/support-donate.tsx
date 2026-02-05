"use client";

import Image from "next/image";
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
        <Button variant="secondary" className="bg-background text-foreground hover:bg-muted">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
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
