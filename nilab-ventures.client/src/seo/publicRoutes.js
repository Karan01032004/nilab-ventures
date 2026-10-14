export const SITE_ORIGIN = "https://www.nilabventures.com";

export const publicRoutes = [
    {
        path: "/",
        title: "Nilab Ventures Strategic Investment Partner",
        description:
            "We provide strategic capital, operational expertise and long-term partnership to help startups scale from seed to global impact.",
        keywords:
            "Nilab Ventures, strategic investment, startup funding, seed capital, growth capital, venture partnership",
        canonical: `${SITE_ORIGIN}/`,
        prerender: true,
        sitemap: true,
        heading: "Beyond Capital, We Provide the Foundation for Scale",
        summary:
            "Nilab Ventures is a strategic investment partner. The firm provides capital, operational expertise, and long-term support so startups can scale from seed toward global impact.",
    },
    {
        path: "/sitemap",
        title: "Nilab Ventures Sitemap | Strategic Investment Partner",
        description:
            "Browse Nilab Ventures pages and homepage sections, including investment philosophy, funding solutions, sectors, and the partnership application.",
        keywords:
            "Nilab Ventures sitemap, investment philosophy, funding solutions, target sectors, partnership application",
        canonical: `${SITE_ORIGIN}/sitemap`,
        prerender: true,
        sitemap: true,
        heading: "Sitemap",
        summary:
            "This sitemap lists the Nilab Ventures homepage sections and the funding application, including philosophy, sectors, support, and the partnership process.",
    },
    {
        path: "/funding-application",
        title: "Funding Application | Nilab Ventures",
        description:
            "Apply to Nilab Ventures for seed, growth, or bridge funding. Share your venture, milestones, and team so we can review a partnership.",
        keywords:
            "Nilab Ventures funding application, seed funding, growth capital, bridge financing, startup partnership",
        canonical: `${SITE_ORIGIN}/funding-application`,
        prerender: true,
        sitemap: true,
        heading: "Fund Application",
        summary:
            "Submit a funding application to Nilab Ventures. Describe your venture, the capital you need, and your team so the investment group can review a partnership.",
    },
];

export const notFoundRoute = {
    path: "/404",
    title: "Page Not Found | Nilab Ventures",
    description:
        "The page you requested is not available on Nilab Ventures. Return home or open the sitemap to find investment, funding, and partnership pages.",
    keywords: "Nilab Ventures, page not found",
    canonical: `${SITE_ORIGIN}/404`,
    prerender: false,
    sitemap: false,
    heading: "Page not found",
    summary:
        "That address is not a page on Nilab Ventures. Visit the homepage or the sitemap to find investment, funding, and partnership information.",
};
