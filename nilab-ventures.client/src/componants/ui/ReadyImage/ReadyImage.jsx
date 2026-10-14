import { useEffect, useState } from "react";

const hiddenAltStyle = { color: "transparent", fontSize: 0 };

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.fetchPriority = "high";
        image.onload = () => resolve(url);
        image.onerror = () => reject(new Error("image failed"));
        image.src = url;
    });
}

export default function ReadyImage({
    src,
    fallbackSrc,
    alt,
    className = "",
    reserveClassName,
}) {
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setCurrent(null);

        const preferred = src || fallbackSrc;
        if (!preferred) return undefined;

        loadImage(preferred)
            .catch(() => (fallbackSrc && fallbackSrc !== preferred ? loadImage(fallbackSrc) : Promise.reject()))
            .then((url) => {
                if (!cancelled) setCurrent(url);
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, [src, fallbackSrc]);

    if (!current) {
        return <div className={reserveClassName || className} aria-hidden="true" />;
    }

    return (
        <img
            src={current}
            alt={alt}
            className={className}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={hiddenAltStyle}
        />
    );
}
