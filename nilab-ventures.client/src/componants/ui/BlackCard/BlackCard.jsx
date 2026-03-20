function BlackCard({ iconWebp, iconPng, title, description, className = "" }) {
    return (
        /* ✅ Template literals use karke className merge ki gayi hai */
        <div className={`h-full rounded-tl-[20px] rounded-br-[20px] bg-[#1e1e1e] p-10 text-white slide-up  ${className}`}>

            {(iconWebp || iconPng) && (
                <div className="mb-5">
                    <picture>
                        <source srcSet={iconWebp} type="image/webp" />
                        <source srcSet={iconPng} type="image/png" />
                        <img
                            src={iconPng}
                            alt={title}
                            className="h-10 w-10"
                        />
                    </picture>
                </div>
            )}

            <h4 className="font-secondary mb-3 text-xl font-bold text-[#8fd0ff]">
                {title}
            </h4>

            <p className="leading-relaxed text-gray-300">
                {description}
            </p>
        </div>
    );
}

export default BlackCard;