import ButtonBlue from "../../ui/ButtonBlue/ButtonBlue";

import journeyWebp from "../../../assets/img/nilab-ventures-brand-partnership-journey.webp";
import journeyPng from "../../../assets/img/nilab-ventures-brand-partnership-journey.png";

function PartnershipJourney({
    title,
    description,
    email,
    buttonLabel,
    buttonLink,
    footerText,
}) {
    return (
        <section className="bg-white pt-10 sm:pt-22" >
            <div className="container">
                <div className="mb-8 grid grid-cols-1 items-center gap-12 lg:mb-6 lg:grid-cols-2">

                    {/* LEFT COLUMN */}
                    <div>

                        {/* HEADING */}
                        <h2 className="font-secondary slide-right mb-6 text-2xl font-bold text-emerald-600 md:text-3xl">
                            {title}
                        </h2>

                        {/* IMAGE (Mobile Only) */}
                        <div className="mb-6 lg:hidden">
                            <picture>
                                <source srcSet={journeyWebp} type="image/webp" loading="lazy" />
                                <source srcSet={journeyPng} type="image/png" loading="lazy" />
                                <img
                                    src={journeyPng}
                                    alt="Partnership Journey"
                                    loading="lazy"
                                    className="slide-right h-[350px] w-full rounded-tl-[40px] rounded-br-[40px] object-cover"
                                />
                            </picture>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="slide-right mb-8 leading-relaxed text-gray-600 lg:max-w-lg">
                            {description}
                        </p>

                        {/* CONTACT */}
                        <div className="mt-8 lg:max-w-lg">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                                <div className="w-fit">
                                    <h3 className="slide-right text-xl font-semibold text-emerald-600">
                                        Get In Touch
                                    </h3>
                                    <div className="  slide-right">
                                    
                                    <a
                                        href={`mailto:${email}`}
                                        className="text-gray-600 transition hover:text-emerald-600"
                                    >
                                        {email}
                                    </a></div>
                                </div>
                                <div className="slide-right">

                                <ButtonBlue
                                    label={buttonLabel}
                                    href={buttonLink}
                                    variant="filled"
                                    newTab   // ✅ only here
                                /></div>
                            </div>
                        </div>

                        <hr className="slide-right my-8 h-[2px] w-full border-0 bg-[#3A3B3C] lg:max-w-lg" />

                        {/* FOOTER ROW (Mobile Only - Flex Between) */}
                        <div className="flex flex-wrap items-center justify-between gap-4 lg:max-w-lg">

                            {/* LEFT TEXT */}
                            <p className="slide-right text-gray-600">
                                {footerText}
                            </p>

                            {/* RIGHT CREDIT */}
                            <p className="slide-right text-gray-600 lg:hidden">
                                Website Design by{" "}
                                <a
                                    href="https://www.dotsandcoms.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition hover:text-emerald-600"
                                >
                                    D&C
                                </a> |   <a
                                    href="/sitemap"
                                    className="transition hover:text-emerald-600"
                                >
                                    Sitemap
                                </a>
                            </p>

                        </div>

                    </div>

                    {/* RIGHT COLUMN (Desktop Image + D&C) */}
                    <div className=" hidden flex-col lg:flex">

                        <picture>
                            <source srcSet={journeyWebp} type="image/webp" loading="lazy" />
                            <source srcSet={journeyPng} type="image/png" loading="lazy" />
                            <img
                                src={journeyPng}
                                alt="Partnership Journey"
                                loading="lazy"
                                className="slide-left w-full rounded-tl-[40px] rounded-br-[40px] object-cover"
                            />
                        </picture>

                        {/* D&C (Desktop Only - Below Image) */}
                        <p className="slide-left mt-6 text-center text-gray-600">
                            Website Design by{" "}
                            <a
                                href="https://www.dotsandcoms.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition hover:text-emerald-600"
                            >
                                D&C
                            </a>  |   <a
                                href="/sitemap"
                                className="transition hover:text-emerald-600"
                            >
                               Sitemap
                            </a>
                        </p>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default PartnershipJourney;