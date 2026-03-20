import ButtonBlue from "../../ui/ButtonBlue/ButtonBlue";

import logoWebp from "../../../assets/img/nilab-ventures-brand.webp";
import logoPng from "../../../assets/img/nilab-ventures-brand.png";

import bannerWebp from "../../../assets/img/nilab-ventures-foundation-for-scale.webp";
import bannerPng from "../../../assets/img/nilab-ventures-foundation-for-scale.png";

function Banner({
    title,
    description,
    primaryBtn,
    secondaryBtn,
}) {
    return (
        /* FULL-WIDTH BACKGROUND */
        <section className="bg-[#0f0f0f] text-white">

            {/* CONTAINER */}   
            <div className="container ">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">

                    {/* LEFT CONTENT */}
                    <div className="order-1 px-4 py-10 sm:py-14">
                        <picture>
                            <source srcSet={logoWebp} type="image/webp" loading="lazy" />
                            <source srcSet={logoPng} type="image/png" loading="lazy" />
                            <img
                                src={logoPng}
                                alt="Nilab Ventures"
                                className="slide-right mb-6 w-[160px]"
                                loading="lazy"
                            />
                        </picture>

                        <h1 className="slide-right mb-6 text-3xl leading-tight font-semibold text-[#8fd0ff] sm:text-4xl">
                            {title}
                        </h1>

                        {/* IMAGE BELOW TITLE ( < 1024px ) */}
                        <div className="slide-right mb-6 lg:hidden">
                            <picture>
                                <source srcSet={bannerWebp} type="image/webp" loading="lazy" />
                                <source srcSet={bannerPng} type="image/png" loading="lazy"  />
                                <img
                                    src={bannerPng}
                                    alt="Nilab Ventures – Foundation for Scale"
                                    className="h-[350px] w-full rounded-xl object-cover"
                                    loading="lazy"
                                />
                            </picture>
                        </div>

                        <p className="slide-right mb-6 max-w-xl leading-relaxed text-gray-300">
                            {description}
                        </p>

                        {/* ✅ BUTTONS (ButtonBlue applied) */}
                        <div className="slide-right flex flex-wrap gap-4">
                            {primaryBtn && (
                                <ButtonBlue
                                    label={primaryBtn.label}
                                    href={primaryBtn.href}
                                />
                            )}

                            {secondaryBtn && (
                                <ButtonBlue
                                    label={secondaryBtn.label}
                                    href={secondaryBtn.href}
                                    variant="outline"
                                />
                            )}
                        </div>
                    </div>

                    {/* RIGHT IMAGE ( ≥ 1024px ) */}
                    <div className="order-2 hidden h-full lg:block">
                        <picture>
                            <source srcSet={bannerWebp} type="image/webp" loading="lazy"  />
                            <source srcSet={bannerPng} type="image/png" loading="lazy"  />
                            <img
                                src={bannerPng}
                                alt="Nilab Ventures – Foundation for Scale"
                                className="slide-left h-full w-full object-cover"
                                loading="lazy"
                            />
                        </picture>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Banner;