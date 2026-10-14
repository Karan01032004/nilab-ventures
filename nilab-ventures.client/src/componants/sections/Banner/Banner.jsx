import ButtonBlue from "../../ui/ButtonBlue/ButtonBlue";
import ReadyImage from "../../ui/ReadyImage/ReadyImage";

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
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-0">

                    {/* LEFT CONTENT */}
                    <div className="order-1 px-4 pt-10 sm:pt-14 lg:col-start-1 lg:row-start-1">
                        <ReadyImage
                            src={logoWebp}
                            fallbackSrc={logoPng}
                            alt="Nilab Ventures"
                            className="slide-right mb-6 w-[160px]"
                            reserveClassName="slide-right mb-6 h-10 w-[160px]"
                        />

                        <h1 className="slide-right mb-6 text-3xl leading-tight font-semibold text-[#8fd0ff] sm:text-4xl lg:mb-0">
                            {title}
                        </h1>
                    </div>

                    {/* ONE HERO — mobile sits under the title, desktop fills the right column */}
                    <div className="order-2 px-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-full lg:self-stretch lg:px-0">
                        <ReadyImage
                            src={bannerWebp}
                            fallbackSrc={bannerPng}
                            alt=""
                            className="slide-right h-[350px] w-full rounded-xl object-cover lg:h-full lg:min-h-[520px] lg:rounded-none"
                            reserveClassName="h-[350px] w-full lg:h-full lg:min-h-[520px]"
                        />
                    </div>

                    <div className="order-3 px-4 pb-10 sm:pb-14 lg:col-start-1 lg:row-start-2">
                        <p className="slide-right mb-6 max-w-xl leading-relaxed text-gray-300">
                            {description}
                        </p>

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

                </div>
            </div>
        </section>
    );
}

export default Banner;
