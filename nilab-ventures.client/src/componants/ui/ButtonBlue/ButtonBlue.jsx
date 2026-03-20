import { FiArrowUpRight } from "react-icons/fi";

function ButtonBlue({
    label,
    href,
    variant = "filled",
    newTab = false,
    className = "",
    onClick
}) {
    // base: relative aur overflow-hidden logic ko support karta hai
    const base = "group relative inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium w-fit cursor-pointer outline-none transition-all duration-1000 overflow-hidden z-0";

    const styles = {
        // ✅ Filled: (Unchanged)
        filled: `
             text-white 
            bg-gradient-to-r from-[#32BFC1] via-[#236D9A] to-[#32BFC1] 
            bg-[length:100%_100%] bg-center 
            hover:bg-[length:700%_100%] transition-[background-size] duration-700   rounded-tl-[16px] rounded-br-[16px]
        `,

        // ✅ Outline: Fixed with Gradient inside ::before
        outline: ` border-2
            border-[#236D9A] text-[#236D9A] hover:text-white bg-transparent
            /* Gradient Layer */
            before:content-[''] before:absolute before:inset-0 
            before:bg-gradient-to-r before:from-transparent before:via-[#236D9A] before:to-transparent
            before:bg-[length:100%_100%] before:bg-center 
            before:scale-x-0 before:opacity-0
            before:transition-all before:duration-700 before:ease-in-out
            before:-z-10 
            /* Hover: Scaling the gradient layer to look like a zoom-fill */
            hover:before:scale-x-[3.5] hover:before:opacity-100  rounded-tl-[16px] rounded-br-[16px]
        `,
    };
    const handleSubmit = (e) => {
        if (onClick) {
            e.preventDefault();   // 🔥 important
            onClick(e);
        }

        if (href.includes("#") && !newTab) {
            const targetId = href.split("#")[1];
            const element = document.getElementById(targetId);

            if (element) {
                e.preventDefault();
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    };
    //const handleSmoothScroll = (e) => {
    //    if (href.includes("#") && !newTab) {
    //        const targetId = href.split("#")[1];
    //        const element = document.getElementById(targetId);

    //        if (element) {
    //            e.preventDefault();
    //            const offset = 80;
    //            const bodyRect = document.body.getBoundingClientRect().top;
    //            const elementRect = element.getBoundingClientRect().top;
    //            const elementPosition = elementRect - bodyRect;
    //            const offsetPosition = elementPosition - offset;

    //            window.scrollTo({
    //                top: offsetPosition,
    //                behavior: "smooth"
    //            });
    //        }
    //    }
    //};

    return (
        <a
            href={href}
            onClick={handleSubmit}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noopener noreferrer" : undefined}
            className={`${base} ${styles[variant]} ${className}`}
        >
            <span className="relative z-10 flex items-center gap-2">
                {label}
                <FiArrowUpRight className="text-base transition-transform duration-500" />
            </span>
        </a>
    );
}

export default ButtonBlue;