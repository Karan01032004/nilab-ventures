import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SeoHelmet from "../../seo/SeoHelmet";
import ReadyImage from "../../componants/ui/ReadyImage/ReadyImage";
import { SITE_ORIGIN } from "../../seo/publicRoutes";
import logoWebp from "../../assets/img/nilab-ventures-brand.webp";
import logoPng from "../../assets/img/nilab-ventures-brand.png";
import bannerImageWebp from "../../assets/img/nilab-ventures-foundation-investment-provider.webp";
import bannerImagePng from "../../assets/img/nilab-ventures-foundation-investment-provider.png";

const NotFound = () => {
    const { hash, pathname } = useLocation();

    // ✅ Smooth Scroll Logic for Hash Links
    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    const sitemapData = [
        {
            id: "home",
            title: "Home",
            desc: "Beyond Capital, We Provide the Foundation for Scale. We're more than investors — we're your strategic partners in building tomorrow's entrepreneurs & industry leaders."
        },
        {
            id: "InvestmentPhilosophy",
            title: "Our Investment Philosophy",
            desc: "Visionary Partnership: We invest in founders driven by a profound vision to create lasting impact, fostering innovations that solve critical societal problems and drive economic growth."
        },
        {
            id: "Funding",
            title: "Comprehensive Funding Solutions",
            desc: "Flexible capital structures: Seed Stage funding for early equity, Growth Capital (Series A-C), Bridge Financing for transitions, and Flexible Instruments (SAFEs/Notes)."
        },
        {
            id: "InvestedSectors",
            title: "Target Investment Sectors",
            desc: "Focused on Retail, Food & Beverage, Hospitality, Deep Tech & AI, Healthcare Innovation, and Financial Technology transforming global commerce."
        },
        {
            id: "FoundationalSupport",
            title: "Foundational Support Services",
            desc: "Going beyond mere funding with strategic planning, talent acquisition, market penetration, and technology development expertise."
        },
        {
            id: "MarketingJourney",
            title: "Marketing & Growth Acceleration",
            desc: "Brand Building Excellence: Compelling narratives, go-to-market strategies, and data-driven customer acquisition campaigns."
        },
        {
            id: "SuccessStories",
            title: "Portfolio Success Stories",
            desc: "Demonstrated impact with 150% average revenue growth, 85% success rate in achieving milestones, and 12 successful acquisitions."
        },
        {
            id: "InvestmentProcess",
            title: "Our Investment Process",
            desc: "A streamlined four-step journey: Initial Review (10 days), Deep Dive Analysis, Partnership Decision (within 30 days), and Onboarding."
        },
        {
            id: "ScaleYourVision",
            title: "Scale Your Vision",
            desc: "Our investment criteria looks for experienced founding teams, proven market traction, scalable business models, and addressable markets."
        },
        {
            id: "PartnershipJourney",
            title: "Start Your Partnership Journey",
            desc: "Connect with Nilab Ventures to transform your startup into an industry leader through our comprehensive growth support.",
            email: "partner@nilabventures.com"
        }
    ];

    return (
        <main className="notfound-wrapper bg-white">
            <SeoHelmet notFound canonical={`${SITE_ORIGIN}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "") || "/"}`} />
            {/* Banner - Heading changed to 404, rest same as requested */}
            <section
                className="banner relative flex items-center bg-cover bg-center bg-no-repeat py-16 md:py-24"
                style={{
                    backgroundImage: `image-set(
                        url(${bannerImageWebp}) type("image/webp"),
                        url(${bannerImagePng}) type("image/png")
                    )`
                }}
            >
                <div className="relative container mx-auto px-4">
                    <div className="flex flex-col justify-center gap-2">
                        <Link to="/" className="inline-block w-fit">
                            <ReadyImage
                                src={logoWebp}
                                fallbackSrc={logoPng}
                                alt="Nilab Ventures"
                                className="mb-4 w-[160px]"
                                reserveClassName="mb-4 h-10 w-[160px]"
                            />
                        </Link>
                        <h1 className=" text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            404
                        </h1>
                    </div>
                </div>
            </section>

            {/* Sitemap Content replicated for 404 navigation */}
            <section className="py-10 text-gray-900 sm:py-22">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl">

                        <h2 className="font-secondary mb-4 text-2xl font-bold text-emerald-600 md:text-3xl">
                            404 - Page Not Found
                        </h2>
                        {sitemapData.map((item, index) => (
                            <div key={index} className="py-2">
                                <Link to={`/#${item.id}`} className="group inline-block">
                                    <h3 className="font-secondary text-xl font-bold text-emerald-600 capitalize transition-colors group-hover:text-emerald-700">
                                        {item.title}
                                    </h3>
                                </Link>

                                <p className="leading-relaxed text-gray-600">
                                    {item.desc}
                                </p>

                                {item.email && (
                                    <div className="mt-1">
                                        <p className="text-gray-600">
                                            Email:{" "}
                                            <a href={`mailto:${item.email}`} className="hover:underline">
                                                {item.email}
                                            </a>
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}; 
export default NotFound;