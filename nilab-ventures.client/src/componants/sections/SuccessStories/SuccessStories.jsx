import BlackCard from "../../ui/BlackCard/BlackCard";


function SuccessStories({ title, stats = [] }) {
    return (
        <section className="bg-white">
            <div className="container">

                {/* SECTION HEADING */}
                <h2 className="font-secondary slide-right mb-10 text-2xl font-bold text-emerald-600 md:text-3xl">
                    {title}
                </h2>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {stats.map((item, index) => (
                        <BlackCard
                            key={index}
                            title={
                                <div className="mb-4">
                                    <div className="font-figtree mb-2 text-2xl font-bold text-white xl:text-3xl">
                                        {item.value}
                                    </div>
                                    <div className="font-secondary text-xl font-bold text-[#8fd0ff]">
                                        {item.subtitle}
                                    </div>
                                </div>
                            }
                            description={item.description}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
export default SuccessStories;
