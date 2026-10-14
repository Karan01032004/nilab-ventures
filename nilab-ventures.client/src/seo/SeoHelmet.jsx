import { Helmet } from "react-helmet-async";
import { notFoundRoute, publicRoutes } from "./publicRoutes";

export default function SeoHelmet({ path, canonical, notFound = false }) {
    const route = notFound
        ? notFoundRoute
        : publicRoutes.find((entry) => entry.path === path) || notFoundRoute;
    const href = canonical || route.canonical;

    return (
        <Helmet>
            <title>{route.title}</title>
            <meta name="description" content={route.description} />
            <meta name="keywords" content={route.keywords} />
            <link rel="canonical" href={href} />
            <meta property="og:title" content={route.title} />
            <meta property="og:description" content={route.description} />
            <meta property="og:url" content={href} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={route.title} />
            <meta name="twitter:description" content={route.description} />
            {notFound ? <meta name="robots" content="noindex, nofollow" /> : null}
        </Helmet>
    );
}
