import supportWebp from "../../../assets/img/nilab-ventures-foundational-support.webp";
import supportPng from "../../../assets/img/nilab-ventures-foundational-support.png";

import marketingWebp from "../../../assets/img/marketing.webp";
import marketingPng from "../../../assets/img/marketing.png";

import financeWebp from "../../../assets/img/finance.webp";
import financePng from "../../../assets/img/finance.png";

import strategicWebp from "../../../assets/img/strategic-operations.webp";
import strategicPng from "../../../assets/img/strategic-operations.png";

import hrWebp from "../../../assets/img/hr-and-administration.webp";
import hrPng from "../../../assets/img/hr-and-administration.png";

import legalWebp from "../../../assets/img/legal-and-compliance.webp";
import legalPng from "../../../assets/img/legal-and-compliance.png";

function FoundationalSupport() {
    const services = [
        {
            iconWebp: marketingWebp,
            iconPng: marketingPng,
            title: "Marketing",
            description:
                "Complete talent acquisition, payroll management, benefits administration, and HR compliance support.",
        },
        {
            iconWebp: financeWebp,
            iconPng: financePng,
            title: "Finance",
            description:
                "Complete talent acquisition, payroll management, benefits administration, and HR compliance support.",
        },
        {
            iconWebp: strategicWebp,
            iconPng: strategicPng,
            title: "Strategic Operations",
            description:
                "Process optimization, systems implementation, and operational scaling strategies for sustainable growth.",
        },
        {
            iconWebp: hrWebp,
            iconPng: hrPng,
            title: "HR & Administration",
            description:
                "Complete talent acquisition, payroll management, benefits administration, and HR compliance support.",
        },
        {
            iconWebp: legalWebp,
            iconPng: legalPng,
            title: "Legal & Compliance",
            description:
                "Regulatory guidance, contract negotiations, intellectual property protection, and ongoing legal advisory services.",
        },
    ];

    return (
        <section className="bg-white" >
            <div className="container">

                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

                    {/* LEFT IMAGE (Desktop) */}
                    <div className="slide-right hidden lg:block">
                        <picture>
                            <source srcSet={supportWebp} type="image/webp" loading="lazy" />
                            <source srcSet={supportPng} type="image/png" loading="lazy" />
                            <img
                                src={supportPng}
                                alt="Foundational Support Services"
                                loading="lazy"
                                className="w-full rounded-tl-[40px] rounded-br-[40px] object-cover"
                            />
                        </picture>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div>

                        <h2 className="font-secondary slide-left mb-6 text-2xl font-bold text-emerald-600 md:text-3xl">
                            Foundational Support Services
                        </h2>

                        {/* IMAGE (Mobile) */}
                        <div className="slide-left mb-8 lg:hidden">
                            <picture>
                                <source srcSet={supportWebp} type="image/webp" loading="lazy" />
                                <source srcSet={supportPng} type="image/png" loading="lazy" />
                                <img
                                    src={supportPng}
                                    alt="Foundational Support Services"
                                    loading="lazy"
                                    className="h-[350px] w-full rounded-tl-[40px] rounded-br-[40px] object-cover"
                                />
                            </picture>
                        </div>

                        <p className="slide-left mb-10 text-gray-600">
                            Our comprehensive support ecosystem goes far beyond capital,
                            providing the operational backbone your startup needs to scale efficiently.
                        </p>

                        <div className="space-y-10">
                            {services.map((service, index) => (
                                <div key={index} className="group slide-left flex items-center gap-4">

                                    {/* INLINE SVG RIBBON */}
                                    <div className="relative h-auto w-[80px] flex-shrink-0">

                                        <svg
                                            viewBox="0 0 90 128"
                                            className="absolute inset-0 h-full w-full transition-colors duration-300"
                                        >
                                            <path
                                                d="M0 10C0 4.47715 4.47715 0 10 0H80C85.5228 0 90 4.47715 90 10V122.562C90 126.113 86.401 128.533 83.1123 127.192L49.7478 113.589C45.7529 111.96 41.2696 112.014 37.3148 113.737L6.99764 126.95C3.69495 128.39 0 125.969 0 122.367V10Z"
                                                className="fill-black"
                                            />
                                        </svg>

                                        {/* ICON CENTER */}
                                        <div className="relative z-10 flex h-full items-center justify-center p-4">

                                            <picture className="w-full">
                                                <source srcSet={service.iconWebp} type="image/webp" loading="lazy" />
                                                <source srcSet={service.iconPng} type="image/png" loading="lazy" />
                                                <img
                                                    src={service.iconPng}
                                                    loading="lazy"
                                                    alt={service.title}
                                                    className="h-auto w-full p-1"
                                                />
                                            </picture>

                                        </div>

                                    </div>

                                    {/* TEXT */}
                                    <div>
                                        <h3 className=" mb-2 text-xl font-bold text-gray-900">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {service.description}
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default FoundationalSupport;