import marketingWebp from "../../../assets/img/nilab-ventures-marketing-growth.webp";
import marketingPng from "../../../assets/img/nilab-ventures-marketing-growth.png";

function MarketingGrowth({
    title,
    subtitle,
    description,
    points = [],
}) {
    return (
        <section className="py-10 sm:py-22" >
            <div className="container">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

                    {/* LEFT COLUMN */}
                    <div>

                        {/* MAIN HEADING */}
                        <h2 className="font-secondary slide-right mb-6 text-2xl font-bold text-emer     ald-600 md:text-3xl">
                            {title}
                        </h2>

                        {/* IMAGE (Mobile Only - Below Heading) */}
                        <div className="slide-right mb-6 lg:hidden">
                            <picture>
                                <source srcSet={marketingWebp} type="image/webp" loading="lazy" />
                                <source srcSet={marketingPng} type="image/png" loading="lazy" />
                                <img
                                    src={marketingPng}
                                    alt="Marketing & Growth Acceleration"
                                    loading="lazy"
                                    className="h-[350px] w-full rounded-tl-[40px] rounded-br-[40px] object-cover"
                                />
                            </picture>
                        </div>

                        {/* SUBTITLE */}
                        <h3 className=" slide-right mb-4 text-xl font-bold text-gray-900">
                            {subtitle}
                        </h3>

                        {/* DESCRIPTION */}
                        <p className="slide-right mb-6 leading-relaxed text-gray-600">
                            {description}
                        </p>

                        {/* POINTS */}
                        <ul className="space-y-4">
                            {points.map((point, index) => (
                                <li key={index} className="slide-right flex items-start gap-3">

                                    {/* Arrow Bullet */}
                                    <span className="arrow-bullet mt-1 h-4 w-4 bg-gray-800"></span>

                                    <span className="text-gray-700">
                                        {point}
                                    </span>

                                </li>
                            ))}
                        </ul>   
                    </div> 
                    {/* RIGHT COLUMN (Desktop Only Image) */}
                    <div className="hidden lg:block">
                        <picture>
                            <source srcSet={marketingWebp} type="image/webp" loading="lazy" />
                            <source srcSet={marketingPng} type="image/png" loading="lazy" />
                            <img
                                src={marketingPng}
                                alt="Marketing & Growth Acceleration"
                                className="slide-left w-full rounded-tl-[40px] rounded-br-[40px] object-cover"
                                loading="lazy"
                            />
                        </picture>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default MarketingGrowth;