import BlackCard from "../../ui/BlackCard/BlackCard";

import philosophyWebp from "../../../assets/img/nilab-ventures-investment-philosophy.webp";
import philosophyPng from "../../../assets/img/nilab-ventures-investment-philosophy.png";

function InvestmentPhilosophy({
    title,
    subtitle,
    paragraphs = [],
    cards = [],
}) {
    return (
        <section className="bg-white">
            <div className="container py-10 sm:py-22">

                {/* TOP CONTENT */}
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">

                    {/* IMAGE (Desktop Only) */}
                    <div className="hidden lg:block">
                        <picture>
                            <source srcSet={philosophyWebp} type="image/webp" loading="lazy" />
                            <source srcSet={philosophyPng} type="image/png" loading="lazy"  />
                            <img
                                src={philosophyPng}
                                alt="Investment Philosophy"
                                loading="lazy"
                                className="slide-right w-full rounded-tl-[40px] rounded-br-[40px] object-cover"
                            />
                        </picture>
                    </div>

                    {/* TEXT */}
                    <div>
                        <h2 className="font-secondary slide-left mb-4 text-2xl font-bold text-emerald-700">
                            {title}
                        </h2>

                        {/* IMAGE (Mobile Only - Below Heading) */}
                        <div className="mb-6 lg:hidden">
                            <picture>
                                <source srcSet={philosophyWebp} type="image/webp" loading="lazy" />
                                <source srcSet={philosophyPng} type="image/png" loading="lazy" />
                                <img
                                    src={philosophyPng}
                                    alt="Investment Philosophy"
                                    loading="lazy"
                                    className="slide-left h-[350px] w-full rounded-tl-[40px] rounded-br-[40px] object-cover"
                                />
                            </picture>
                        </div>

                        <h2 className="slide-left slide-left mb-4 text-xl font-bold">
                            {subtitle}
                        </h2>

                        {paragraphs.map((text, index) => (
                            <p
                                key={index}
                                className="slide-left mb-4 leading-relaxed text-gray-600"
                            >
                                {text}
                            </p>
                        ))}
                    </div>
                </div>

                {/* BLACK CARDS */}
                <div className="slide-up mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card, index) => (
                        <BlackCard
                            key={index}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default InvestmentPhilosophy;