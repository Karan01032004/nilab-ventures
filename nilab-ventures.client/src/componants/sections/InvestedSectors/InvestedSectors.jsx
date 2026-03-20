import sectorsWebp from "../../../assets/img/nilab-ventures-target-investment-sectors.webp";
import sectorsPng from "../../../assets/img/nilab-ventures-target-investment-sectors.png";

function InvestedSectors({
    title,
    sectors = [],
}) {
    return (
        <section className="bg-white py-10 sm:py-22">
            <div className="container">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">

                    {/* LEFT CONTENT */}
                    <div>

                        {/* HEADING */}
                        <h2 className="slide-right mb-8 text-2xl font-bold text-emerald-600 lg:text-3xl">
                            {title}
                        </h2>

                        {/* IMAGE (Mobile Only - Below Heading) */}
                        <div className="slide-right mb-8 lg:hidden">
                            <picture>
                                <source srcSet={sectorsWebp} type="image/webp" loading="lazy" />
                                <source srcSet={sectorsPng} type="image/png" loading="lazy" />
                                <img
                                    src={sectorsPng}
                                    alt="Target Investment Sectors"
                                    loading="lazy"
                                    className="h-[350px] w-full rounded-tl-[40px] rounded-br-[40px] object-cover"
                                />
                            </picture>
                        </div>

                        {/* SECTORS LIST */}
                        <div className="space-y-6">
                            {sectors.map((sector, index) => (
                                <div key={index}>
                                    <h3 className=" slide-right mb-2 text-xl font-bold text-gray-900">
                                        {sector.title}
                                    </h3>
                                    <p className="slide-right leading-relaxed text-gray-600">
                                        {sector.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT IMAGE (Desktop Only) */}
                    <div className="slide-left hidden lg:block" >
                        <picture>
                            <source srcSet={sectorsWebp} type="image/webp" loading="lazy" />
                            <source srcSet={sectorsPng} type="image/png" loading="lazy" />
                            <img
                                src={sectorsPng}
                                alt="Target Investment Sectors"
                                className="h-full w-full rounded-tl-[40px] rounded-br-[40px] object-cover"
                                loading="lazy"
                            />
                        </picture>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default InvestedSectors;