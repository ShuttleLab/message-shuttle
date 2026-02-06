"use client";

import { useI18n } from "@/components/i18n-provider";
import { SupportDonateButton } from "@/components/support-donate";
import { ShareButton } from "@/components/share-button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutContent() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t.about.heroTitle}
        </h1>
        <p className="text-xl text-muted-foreground">{t.about.heroSubtitle}</p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            {t.about.serviceTitle}
          </h2>
          <p className="text-muted-foreground mb-4">{t.about.serviceP1}</p>
          <p className="text-muted-foreground">{t.about.serviceP2}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-chart-1/30 bg-chart-1/5">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-chart-1/15 text-chart-1">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground ml-4">
                {t.about.fast}
              </h3>
            </div>
            <p className="text-muted-foreground">{t.about.fastDesc}</p>
          </CardContent>
        </Card>

        <Card className="border-chart-2/30 bg-chart-2/5">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-chart-2/15 text-chart-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground ml-4">
                {t.about.safe}
              </h3>
            </div>
            <p className="text-muted-foreground">{t.about.safeDesc}</p>
          </CardContent>
        </Card>

        <Card className="border-chart-3/30 bg-chart-3/5">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-chart-3/15 text-chart-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground ml-4">
                {t.about.privacy}
              </h3>
            </div>
            <p className="text-muted-foreground">{t.about.privacyDesc}</p>
          </CardContent>
        </Card>

        <Card className="border-chart-4/30 bg-chart-4/5">
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-chart-4/15 text-chart-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground ml-4">
                {t.about.ttl}
              </h3>
            </div>
            <p className="text-muted-foreground">{t.about.ttlDesc}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            {t.about.useCases}
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-chart-1 mr-3">✓</span>
              {t.about.use1}
            </li>
            <li className="flex items-start">
              <span className="text-chart-2 mr-3">✓</span>
              {t.about.use2}
            </li>
            <li className="flex items-start">
              <span className="text-chart-3 mr-3">✓</span>
              {t.about.use3}
            </li>
            <li className="flex items-start">
              <span className="text-chart-4 mr-3">✓</span>
              {t.about.use4}
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-primary via-primary to-chart-5 text-primary-foreground rounded-xl p-8 mb-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">{t.about.supportTitle}</h2>
        <p className="mb-6 opacity-90">{t.about.supportDesc}</p>
        <div className="flex flex-wrap gap-4">
          <SupportDonateButton />
          <ShareButton />
        </div>
      </div>

      <div className="mt-8 text-center text-muted-foreground">
        <p>{t.about.contactDesc}</p>
        <p className="mt-2">
          {t.about.contactEmail}：
          <a
            href="mailto:shuttlelab.org@gmail.com"
            className="text-primary hover:underline underline-offset-4"
          >
            shuttlelab.org@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
