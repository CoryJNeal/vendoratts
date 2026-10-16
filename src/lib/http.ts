const USER_AGENT =
  "VendorCatalogDiscovery/0.1 (internal screening; website-derived drafts only)";

export type FetchedPage = {
  url: string;
  status: number;
  ok: boolean;
  contentType: string;
  body: string;
  error?: string;
};

export function hostnameKey(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www./, "").toLowerCase();
  } catch {
    return "";
  }
}

export function sameVendorHost(pageUrl: string, originUrl: string): boolean {
  const a = hostnameKey(pageUrl);
  const b = hostnameKey(originUrl);
  return Boolean(a && b && a === b);
}

export function absolutize(href: string, base: string): string | null {
  try {
    const url = new URL(href, base);
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

export async function fetchPage(url: string, timeoutMs = 12000): Promise<FetchedPage> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent": USER_AGENT,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    const contentType = response.headers.get("content-type") ?? "";
    const body = await response.text();
    return {
      url: response.url || url,
      status: response.status,
      ok: response.ok,
      contentType,
      body,
    };
  } catch (error) {
    return {
      url,
      status: 0,
      ok: false,
      contentType: "",
      body: "",
      error: error instanceof Error ? error.message : "Fetch failed",
    };
  } finally {
    clearTimeout(timer);
  }
}
