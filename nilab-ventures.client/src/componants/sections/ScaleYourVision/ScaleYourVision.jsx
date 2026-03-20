function ScaleYourVision({
    title,
    subtitle,
    points = [],
}) {
    return (
        <section className="bg-white">
            <div className="container">

                {/* MAIN TITLE */}
                <h2 className="font-secondary slide-right mb-2 text-2xl font-bold text-emerald-600 md:text-3xl">
                    {title}
                </h2>

                {/* SUB TITLE */}
                <h3 className="slide-right mb-6 text-xl font-semibold text-gray-900">
                    {subtitle}
                </h3>

                {/* POINTS */}
                <ul className="space-y-4">
                    {points.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">

                            {/* ARROW BULLET */}
                            <span className="arrow-bullet slide-right mt-1 h-4 w-4 bg-gray-800"></span>

                            <span className="slide-right leading-relaxed text-gray-600">
                                {point}
                            </span>

                        </li>
                    ))}
                </ul>

            </div>
        </section>
    );
}

export default ScaleYourVision;
