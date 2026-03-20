import FundingCard from "../../ui/FundingCard/FundingCard";
/* IMAGE IMPORTS */
import seedWebp from "../../../assets/img/seed-stage.webp";
import seedPng from "../../../assets/img/seed-stage.png";
import growthWebp from "../../../assets/img/growth-capital.webp";
import growthPng from "../../../assets/img/growth-capital.png";
import bridgeWebp from "../../../assets/img/bridge-financing.webp";
import bridgePng from "../../../assets/img/bridge-financing.png";
import flexibleWebp from "../../../assets/img/flexible-instruments.webp";
import flexiblePng from "../../../assets/img/flexible-instruments.png";

function ComprehensiveFunding({ title, description, cards = [] }) {
    const icons = [
        { webp: seedWebp, png: seedPng },
        { webp: growthWebp, png: growthPng },
        { webp: bridgeWebp, png: bridgePng },
        { webp: flexibleWebp, png: flexiblePng },
    ];

    return (
        <section className="funding">
            <div className="container" >
                <div className="mb-8 max-w-3xl">
                    {/* Header Animations */}
                    <h2 className="font-secondary slide-right mb-4 text-2xl font-bold text-emerald-600 md:text-3xl">
                        {title}
                    </h2>
                    <p className="slide-right text-gray-600 delay-100">
                        {description}
                    </p>
                </div>

                {/* Grid Container */}
                <div className="mx-auto grid grid-cols-1 gap-4 overflow-hidden rounded-tl-[20px] rounded-br-[20px] lg:grid-cols-2">
                    {cards.map((card, index) => (
                        <FundingCard
                            key={index}
                            index={index}
                            title={card.title}
                            description={card.description}
                            iconWebp={icons[index]?.webp}
                            iconPng={icons[index]?.png}
                            /* ✅ Staggered delay call: 
                               Card 0 -> delay-150
                               Card 1 -> delay-200
                               Card 2 -> delay-250...
                            */
                            className={`slide-up delay-${(index + 3) * 50}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ComprehensiveFunding;