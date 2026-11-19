"use client";

import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Clarity from "@microsoft/clarity";
import posthog from "posthog-js";

export function Analytics() {
  useEffect(() => {
    // Evita registrar visitas de desarrollo local
    if (process.env.NODE_ENV !== "production") return;

    // 1. Inicializar Microsoft Clarity
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
    if (clarityId) {
      Clarity.init(clarityId);
    }

    // 2. Inicializar PostHog (con captura automática de pageviews en App Router)
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (posthogKey && posthogHost) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        defaults: "2026-08-30",
        person_profiles: "identified_only",
      });
    }
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return <>{gaId && <GoogleAnalytics gaId={gaId} />}</>;
}
