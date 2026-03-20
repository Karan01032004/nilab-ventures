function FundingCard({ iconWebp, iconPng, title, description, index, className = "" }) {

    const initialSize = "90px";

    const configs = [
        {
            container: "-bottom-[2px] -right-[2px]",
            svgClass: "",
            flexAlign: "lg:items-start",
            numTranslate: "translate-x-[18%] translate-y-[18%]",
            origin: "origin-bottom-right"
        },
        {
            container: "-bottom-[2px] -right-[2px] lg:-left-[2px] lg:right-auto",
            svgClass: "lg:scale-x-[-1]",
            flexAlign: "lg:items-end",
            numTranslate: "translate-x-[18%] translate-y-[18%] lg:translate-x-[-18%]",
            origin: "origin-bottom-right lg:origin-bottom-left"
        },
        {
            container: "-bottom-[2px] -right-[2px] lg:-top-[2px] lg:bottom-auto",
            svgClass: "lg:scale-y-[-1]",
            flexAlign: "lg:items-start",
            numTranslate: "translate-x-[18%] translate-y-[18%] lg:translate-y-[-18%]",
            origin: "origin-bottom-right lg:origin-top-right"
        },
        {
            container: "-bottom-[2px] -right-[2px] lg:-top-[2px] lg:bottom-auto lg:-left-[2px] lg:right-auto",
            svgClass: "lg:scale-x-[-1] lg:scale-y-[-1]",
            flexAlign: "lg:items-end",
            numTranslate: "translate-x-[18%] translate-y-[18%] lg:translate-x-[-18%] lg:translate-y-[-18%]",
            origin: "origin-bottom-right lg:origin-top-left"
        }
    ];

    const current = configs[index];

    return (
        /* ✅ className prop added here to merge external classes */
        <div className={`group relative flex h-full flex-col justify-center overflow-hidden bg-[#1e1e1e] p-8 text-white md:p-12 ${className}`}>

            {/* THE HUB */}
            <div
                style={{ width: initialSize, height: initialSize }}
                className={`absolute z-10 transition-transform duration-500 ease-in-out group-hover:scale-[1.2] ${current.container} ${current.origin}`}
            >
                {/* SVG Background */}
                <div className={`absolute inset-0 ${current.svgClass}`}>
                    <svg className="h-full w-full" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 104C0 90.3425 2.69005 76.8188 7.91653 64.2009C13.143 51.5831 20.8036 40.1182 30.4609 30.4609C40.1182 20.8036 51.5831 13.143 64.2009 7.91653C76.8188 2.69005 90.3425 -5.96987e-07 104 0L104 104H0Z" fill="#F0F0F0" />
                        <path d="M104 62C76.8 69.6 64.6667 93.1667 62 104H104V62Z" fill="white" />
                    </svg>
                </div>

                {/* THE NUMBER */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`font-bold text-[#1e1e1e] text-lg md:text-xl leading-none ${current.numTranslate}`}>
                        0{index + 1}
                    </span>
                </div>
            </div>

            {/* CONTENT LAYER */}
            <div className={`relative z-30 flex flex-col items-start ${current.flexAlign}`}>
                <div className="max-w-[80%] lg:max-w-[85%]">
                    <div className="mb-6 flex items-center gap-4">
                        <picture className="flex-shrink-0">
                            <source srcSet={iconWebp} type="image/webp" loading="lazy" />
                            <source srcSet={iconPng} type="image/png" loading="lazy" />
                            <img src={iconPng} alt={title} className="h-10 w-10 object-contain md:h-12 md:w-12" loading="lazy"  />
                        </picture>
                        <h4 className="font-secondary text-xl leading-tight font-bold text-[#8fd0ff]">
                            {title}
                        </h4>
                    </div>
                    <p className=" leading-relaxed text-gray-300">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FundingCard;