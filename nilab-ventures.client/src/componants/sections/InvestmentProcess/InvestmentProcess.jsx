function InvestmentProcess({
    title,
    description,
    steps = [],
}) {
    return (
        <section className="bg-white py-10 sm:py-22" >
            <div className="container ">

                {/* HEADER */}
                <div className="mb-6 max-w-3xl">
                    <h2 className="font-secondary slide-right mb-4 text-2xl font-bold text-emerald-600 md:text-3xl">
                        {title}
                    </h2>

                    <p className="slide-right text-gray-600">
                        {description}
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

                    {steps.map((step, index) => (
                        <div key={index} className="slide-up relative h-fit">

                            {/* BIG NUMBER (CUT EFFECT) */}
                            <span
                                className="absolute bottom-0 left-0 z-10 h-fit
             bg-white py-4 pr-4 leading-none font-bold
           text-[80px]
           text-[#00957A]
             select-none lg:bottom-[10%] lg:py-0
             lg:pr-0 lg:text-[100px]
             xl:bottom-0"
                            >
                                {step.number}
                            </span>

                            {/* MOBILE BORDER VERSION */}
                            <div
                                className="relative rounded-[40px]
                           border-[13px] border-[#00957A] bg-white py-8 pr-8 pl-16
                           lg:hidden"
                            >
                                <div className=" mb-4 text-xl font-bold text-gray-900">
                                    {step.title}
                                </div>

                                <p className="leading-relaxed text-gray-600 xl:text-[18px]">
                                    {step.description}
                                </p>
                            </div>

                            {/* DESKTOP SVG VERSION */}
                            <div
                                className="relative   pl-20 lg:pr-10 lg:py-10
                           hidden lg:flex flex-col justify-center 
                           h-fit xl:min-h-[240px]
                           bg-[url('/nilab-ventures-investment-process.svg')]
                           bg-no-repeat bg-contain bg-center"
                            >
                                <h3 className=" mb-4 text-xl font-bold text-gray-900">
                                    {step.title}
                                </h3>

                                <p className="leading-relaxed text-gray-600">
                                    {step.description}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default InvestmentProcess;