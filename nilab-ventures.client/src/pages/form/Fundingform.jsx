import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ButtonBlue from "../../componants/ui/ButtonBlue/ButtonBlue";
import bannerImgPng from "../../assets/img/nilab-ventures-funding-application-sm.png";
import bannerImgWebp from "../../assets/img/nilab-ventures-funding-application.webp";
import logoPng from "../../assets/img/nilab-ventures-brand.png";
import logoWebp from "../../assets/img/nilab-ventures-brand.webp";
import axios from "../../poweradmin/api/axios";
// ── Section Divider ───────────────────────────────────────────
function SectionDivider({ label }) {
    return (
        <div className="mb-6 flex items-center gap-3">
            <div className="h-6 w-1 shrink-0 rounded-full bg-[#00957A]" />
            <h3 className="text-xl leading-snug font-bold text-[#00957A]">{label}</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00957A33] to-transparent" />
        </div>
    );
}

// ── Field wrapper ─────────────────────────────────────────────
function Field({ children }) {
    return <div className="mb-6 last:mb-0">{children}</div>;

}
 
// ── Text Input ────────────────────────────────────────────────
function FloatInput({ label, required, type = "text", value, onChange, error, autoComplete, ...rest }) {
    const [focused, setFocused] = useState(false);

  
    return (
        <Field>
            <label
                className={[
                    "block text-base leading-relaxed mb-1 transition-colors duration-200",
                    focused ? "text-[#00957A]" : error ? "text-red-500" : "text-gray-500",
                ].join(" ")}
            >
                {label}
                {required && <span className="ml-0.5 text-[#00957A]">*</span>}
            </label>
            <input
                type={type}
                value={value}
                autoComplete={autoComplete}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}

                onChange={e => onChange(e.target.value)}
                {...rest}
                placeholder="Your answer"
                className={[
                    "w-full bg-transparent pb-2 text-base text-[#3A3B3C] leading-relaxed",
                    "border-b outline-none transition-colors duration-200",
                    focused ? "border-[#00957A]" : error ? "border-red-500" : "border-gray-300",
                ].join(" ")}
            />
            {error && (
                <p className="mt-1.5 text-sm leading-relaxed text-red-500">This field is required</p>
            )}
        </Field>
    );
}
// ── Textarea ──────────────────────────────────────────────────
function FloatTextarea({ label, required, value, onChange, error }) {
    const [focused, setFocused] = useState(false);

    return (
        <Field>
            <label
                className={[
                    "block text-base leading-relaxed mb-1 transition-colors duration-200",
                    focused ? "text-[#00957A]" : error ? "text-red-500" : "text-gray-500",
                ].join(" ")}
            >
                {label}
                {required && <span className="ml-0.5 text-[#00957A]">*</span>}
            </label>
            <textarea
                rows={3}
                value={value}
                placeholder="Your answer"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={e => onChange(e.target.value)}
                className={[
                    "w-full bg-transparent pb-2 text-base text-[#3A3B3C] leading-relaxed",
                    "border-b outline-none resize-none transition-colors duration-200",
                    focused ? "border-[#00957A]" : error ? "border-red-500" : "border-gray-300",
                ].join(" ")}
            />
            {error && (
                <p className="mt-1.5 text-sm leading-relaxed text-red-500">This field is required</p>
            )}
        </Field>
    );
}

// ── Sub-question label ────────────────────────────────────────
function SubLabel({ children }) {
    return (
        <p className="mb-3 text-base leading-relaxed text-gray-500">
            {children}
        </p>
    );
}

// ── Radio Card ────────────────────────────────────────────────
function RadioCard({ label, selected, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
                "border transition-all duration-150 text-left cursor-pointer outline-none",
                selected
                    ? "border-[#00957A]/40 bg-[#00957A]/8"
                    : "border-gray-200 bg-white hover:border-gray-300",
            ].join(" ")}
        >
            <span
                className={[
                    "w-[18px] h-[18px] rounded-full shrink-0 flex items-center justify-center border-2 transition-all duration-150",
                    selected ? "border-[#00957A] bg-[#00957A]" : "border-gray-300",
                ].join(" ")}
            >
                {selected && <span className="block h-[6px] w-[6px] rounded-full bg-white" />}
            </span>
            <span className={`text-base leading-relaxed ${selected ? "text-[#3A3B3C] font-medium" : "text-gray-500"}`}>
                {label}
            </span>
        </button>
    );
}

// ── Checkbox Card ─────────────────────────────────────────────
function CheckCard({ label, checked, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
                "border transition-all duration-150 text-left cursor-pointer outline-none",
                checked
                    ? "border-[#00957A]/40 bg-[#00957A]/8"
                    : "border-gray-200 bg-white hover:border-gray-300",
            ].join(" ")}
        >
            <span
                className={[
                    "w-[18px] h-[18px] rounded-md shrink-0 flex items-center justify-center border-2 transition-all duration-150",
                    checked ? "border-[#00957A] bg-[#00957A]" : "border-gray-300",
                ].join(" ")}
            >
                {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <polyline points="1 4 4 7 9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </span>
            <span className={`text-base leading-relaxed ${checked ? "text-[#3A3B3C] font-medium" : "text-gray-500"}`}>
                {label}
            </span>
        </button>
    );
}

// ── Grid Matrix ───────────────────────────────────────────────
const EXP_LEVELS = ["Limited Experience", "Some Experience", "Experienced", "Highly Experienced"];

function GridMatrix({ rows, values, onChange }) {
    return (
        <>
            {/* Mobile: stacked rows */}
            <div className="space-y-3 sm:hidden">
                {rows.map(row => (
                    <div key={row} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <p className="mb-3 text-base font-medium text-[#3A3B3C]">{row}</p>
                        <div className="grid grid-cols-2 gap-2">
                            {EXP_LEVELS.map(col => (
                                <button
                                    key={col}
                                    type="button"
                                    onClick={() => onChange(row, col)}
                                    className={[
                                        "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all duration-150 cursor-pointer outline-none",
                                        values[row] === col
                                            ? "border-[#00957A]/40 bg-[#00957A]/8 text-[#3A3B3C] font-medium"
                                            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300",
                                    ].join(" ")}
                                >
                                    <span
                                        className={[
                                            "w-3.5 h-3.5 rounded-full shrink-0 border-2 flex items-center justify-center transition-all duration-150",
                                            values[row] === col ? "border-[#00957A] bg-[#00957A]" : "border-gray-300",
                                        ].join(" ")}
                                    >
                                        {values[row] === col && <span className="block h-[4px] w-[4px] rounded-full bg-white" />}
                                    </span>
                                    {col}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden overflow-x-auto sm:block">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="w-[28%] pb-3 text-left" />
                            {EXP_LEVELS.map(col => (
                                <th key={col} className="px-2 pb-3 text-center text-base font-medium text-[#00957A]">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row => (
                            <tr key={row} className="border-t border-gray-200">
                                <td className="py-3 pr-4 text-base leading-relaxed text-gray-600">{row}</td>
                                {EXP_LEVELS.map(col => (
                                    <td key={col} className="px-2 py-3 text-center">
                                        <button
                                            type="button"
                                            onClick={() => onChange(row, col)}
                                            className={[
                                                "mx-auto flex h-5 w-5 items-center justify-center rounded-full border-2 cursor-pointer outline-none transition-all duration-150",
                                                values[row] === col
                                                    ? "border-[#00957A] bg-[#00957A]"
                                                    : "border-gray-300 hover:border-[#00957A]/50",
                                            ].join(" ")}
                                        >
                                            {values[row] === col && <span className="block h-[5px] w-[5px] rounded-full bg-white" />}
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
// ── Scale Selector ────────────────────────────────────────────
function ScaleSelector({ value, onChange }) {
    return (
        <div className="w-full">
            <div className="mb-2 flex justify-between">
                <span className="text-base leading-relaxed text-gray-500">Low Competition</span>
                <span className="text-base leading-relaxed text-gray-500">High Competition</span>
            </div>
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                    <button
                        key={n}
                        type="button"
                        onClick={() => onChange(n)}
                        className={[
                            "flex-1 py-3 rounded-xl border text-base font-bold transition-all duration-150 cursor-pointer outline-none",
                            value === n
                                ? "border-[#00957A]/50 bg-[#00957A]/10 text-[#00957A]"
                                : "border-gray-200 bg-white text-gray-400 hover:border-gray-300",
                        ].join(" ")}
                    >
                        {n}
                    </button>
                ))}
            </div>
        </div>
    );
}
// ─────────────────────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────────────────────
const STAGES = ["Idea Stage", "Seed Stage", "Early Traction", "Growth Stage"];
const FUND_TYPES = ["Equity Investment", "Debt Funding", "Convertible Note", "Other (Please specify)"];
const MILESTONES = ["Launch", "Product Development", "Market Expansion", "Team Growth", "Customer Acquisition", "Profitability"];
const TIMELINES = ["Less than 6 months", "6-12 months", "1-2 years", "2-3 years", "More than 3 years"];
const TEAM = ["Founder 1", "Founder 2", "Key Team Member 1", "Key Team Member 2"];

const BLANK = {
    name: "", email: "", linkedin: "", description: "",
    stage: "", funding_types: [], problem: "", amount: "",
    milestones: [], market_size: "", revenue: "", team_exp: {},
    competitive_advantage: "", equity: "",
    profitability_timeline: "", competitive_landscape: null, roi: "",
};

// ─────────────────────────────────────────────────────────────
//  MAIN FORM
// ─────────────────────────────────────────────────────────────
export default function FundingApplication() {
    const [form, setForm] = useState(BLANK);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const getRandom = () => Math.floor(Math.random() * 10) + 1;
    const [loading, setLoading] = useState(false);
    const API_URL = "https://www.nilabventures.com/api/Funding/submit";
    //const API_URL = "https://localhost:7047/api/Funding/submit";
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const toggleArr = (k, v) => setForm(f => ({
        ...f,
        [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v],
    }));
    const setExp = (m, v) => setForm(f => ({ ...f, team_exp: { ...f.team_exp, [m]: v } }));

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = true;
        if (!form.email.trim()) e.email = true;
        if (!form.description.trim()) e.description = true;
        if (!form.captcha) e.captcha = true;
        setErrors(e);
        return !Object.keys(e).length;
    };
    const handleSubmit = async () => {
        if (!validate()) return;
        const correctAnswer = captchaData.num1 + captchaData.num2;

        if (parseInt(form.captcha) !== correctAnswer) {
            toast.error("Captcha incorrect ❌");
            generateCaptcha();
            return;
        }
        try {
            setLoading(true);

            const payload = {
                name: form.name,
                email: form.email,
                linkedin: form.linkedin,
                description: form.description,
                stage: form.stage,
                funding_types: form.funding_types,
                problem: form.problem,
                amount: form.amount ? parseFloat(form.amount) : null,
                milestones: form.milestones,
                market_size: form.market_size,
                revenue: form.revenue,
                team_exp: form.team_exp,
                competitive_advantage: form.competitive_advantage,
                equity: form.equity,
                profitability_timeline: form.profitability_timeline,
                competitive_landscape: form.competitive_landscape,
                roi: form.roi
            };  
            setSubmitted(true)
            const res = await axios.post(API_URL, payload);

            console.log("Response:", res.data);

            //setSubmitted(true);
            handleClear();

        } catch (err) {
            console.error(err);
            alert("Something went wrong ❌");
        } finally {
            setLoading(false);
        }
    };


    const [captchaData, setCaptchaData] = useState(() => {
        const n1 = getRandom();
        const n2 = getRandom();
        return { num1: n1, num2: n2, question: `${n1} + ${n2} = ?` };
    });

    const generateCaptcha = useCallback(() => {
        const num1 = getRandom();
        const num2 = getRandom();
        setCaptchaData({
            num1,
            num2,
            question: `${num1} + ${num2} = ?`
        });
    }, []);

    const handlePhoneKeyDown = (e) => {
        const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    //const handleSubmit = () => { if (validate()) setSubmitted(true); };
    const handleClear = () => { setForm(BLANK); setErrors({}); };

    // ── Success screen ────────────────────────────────────────
    if (submitted) return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
            <div className="mx-auto w-full max-w-sm text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#00957A] bg-[#00957A]/10">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00957A" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h2 className="mb-3 text-2xl font-bold text-emerald-700">Application Received</h2>
                <p className="mb-8 leading-relaxed text-gray-600">
                    Thank you for applying to Nilab Ventures. Our team will review your submission and reach out shortly.
                </p>
                <ButtonBlue label="Submit Another" href="#" variant="outline" onClick={() => setSubmitted(false)} />
            </div>
        </div>
    );

    const card = "bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 mb-3 shadow-sm";

    return (
        <div className="min-h-screen bg-gray-50">
            <ToastContainer position="top-right" autoClose={2500} />
            {/* ── Hero Banner — untouched ───────────────────────── */}
            <section
                className="banner relative mb-10 flex items-center overflow-hidden bg-cover bg-center bg-no-repeat py-16 md:py-24"
                style={{
                    backgroundImage: `image-set(
                        url(${bannerImgWebp}) type("image/webp"),
                        url(${bannerImgPng}) type("image/png")
                    )`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/80 to-transparent" />
                <div className="relative container mx-auto px-4">
                    <div className="flex max-w-lg flex-col justify-center gap-3">
                        <Link to="/" className="inline-block w-fit">
                            <picture>
                                <source srcSet={logoWebp} type="image/webp" />
                                <source srcSet={logoPng} type="image/png" />
                                <img src={logoPng} alt="Nilab Ventures" className="mb-2 w-[160px]" />
                            </picture>
                        </Link>
                        <h1 className="text-3xl leading-tight font-bold text-[#8fd0ff] sm:text-4xl lg:text-5xl">
                            Fund <br className="sm:hidden" /> Application
                        </h1>
                    </div>
                </div>
            </section>

            <div className="container mx-auto pb-12">

                {/* ══ SECTION 1 — Contact ══════════════════════════════ */}
                <div className={card}>
                    <SectionDivider label="Contact Information" />
                    <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
                        <FloatInput label="Name" required value={form.name} onChange={v => set("name", v)} error={errors.name} />
                        <FloatInput label="Email" required type="email" value={form.email} onChange={v => set("email", v)} error={errors.email} autoComplete="email" />
                    </div>
                    <FloatInput label="LinkedIn Profile" value={form.linkedin} onChange={v => set("linkedin", v)} />
                </div>

                {/* ══ SECTION 2 — Venture ══════════════════════════════ */}
                <div className={card}>
                    <SectionDivider label="Your Venture" />
                    <FloatTextarea
                        label="Describe your business or venture" required
                        value={form.description} onChange={v => set("description", v)} error={errors.description}
                    />
                    <div className="mt-2">
                        <SubLabel>What stage is your venture currently in?</SubLabel>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {STAGES.map(s => (
                                <RadioCard key={s} label={s} selected={form.stage === s} onClick={() => set("stage", s)} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ══ SECTION 3 — Funding ══════════════════════════════ */}
                <div className={card}>
                    <SectionDivider label="Funding Details" />

                    <SubLabel>Type of funding sought</SubLabel>
                    <div className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {FUND_TYPES.map(f => (
                            <CheckCard key={f} label={f} checked={form.funding_types.includes(f)} onClick={() => toggleArr("funding_types", f)} />
                        ))}
                    </div>

                    <FloatInput label="Primary problem your venture aims to solve?" value={form.problem} onChange={v => set("problem", v)} />
                    <FloatInput label="Total amount of funding you are seeking?" value={form.amount} onKeyDown={handlePhoneKeyDown}  onChange={v => set("amount", v)} />

                    <SubLabel>Key milestones to achieve with this funding?</SubLabel>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {MILESTONES.map(m => (
                            <CheckCard key={m} label={m} checked={form.milestones.includes(m)} onClick={() => toggleArr("milestones", m)} />
                        ))}
                    </div>
                </div>
                {/* ══ SECTION 4 — Market & Team ════════════════════════ */}
                <div className={card}>
                    <SectionDivider label="Market & Team" />
                    <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
                        <FloatInput label="Target market size (e.g. number of customers, market value)?" value={form.market_size} onChange={v => set("market_size", v)} />
                        <FloatInput label="Projected revenue for the next 1–3 years?" value={form.revenue} onChange={v => set("revenue", v)} />
                    </div>
                    <SubLabel>Core team experience in relevant industry sectors</SubLabel>
                    <GridMatrix rows={TEAM} values={form.team_exp} onChange={setExp} />
                </div>

                {/* ══ SECTION 5 — Competitive & Financial ══════════════ */}
                <div className={card}>
                    <SectionDivider label="Competitive & Financial" />

                    <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
                        <FloatInput label="What is your competitive advantage?" value={form.competitive_advantage} onChange={v => set("competitive_advantage", v)} />
                        <FloatInput label="Percentage of equity willing to offer?" value={form.equity} onChange={v => set("equity", v)} />
                    </div>
                    <FloatInput label="Expected ROI for Nilab Ventures?" value={form.roi} onChange={v => set("roi", v)} />

                    {/* Timeline + Landscape side by side */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div>
                            <SubLabel>Estimated timeline for achieving profitability?</SubLabel>
                            <div className="flex flex-wrap gap-2">
                                {TIMELINES.map(t => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => set("profitability_timeline", t)}
                                        className={[
                                            "px-4 py-2 rounded-full text-base leading-relaxed font-medium",
                                            "border transition-all duration-150 cursor-pointer outline-none",
                                            form.profitability_timeline === t
                                                ? "border-[#00957A]/40 bg-[#00957A]/10 text-[#3A3B3C] font-semibold"
                                                : "border-gray-200 bg-white text-gray-500 hover:border-gray-300",
                                        ].join(" ")}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <SubLabel>Current competitive landscape rating</SubLabel>
                            <ScaleSelector value={form.competitive_landscape} onChange={v => set("competitive_landscape", v)} />
                        </div>
                        {/* Grid ko 3 columns mein divide kiya (2 hisse input ke, 1 hissa captcha ka) */}
                        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 lg:gap-6 items-end">

                            {/* Input Field (Zyada jagah lega) */}
                            <FloatInput
                                label="Enter Captcha"
                                required
                                value={form.captcha}
                                onChange={v => set("captcha", v)}
                                error={errors.captcha}
                                placeholder="Enter result"
                            />

                            {/* Captcha Question Box (Chota aur Centered) */}
                            <div className="mb-6">
                                <div className="flex items-center justify-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl min-h-[46px]">
                                    {/* items-center aur justify-center se text ekdam beech mein aayega */}
                                    <span className="text-lg font-bold tracking-[0.2em] text-[#00957A] select-none italic">
                                        {captchaData.question}
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                        {/*<div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-end">*/}
                         
                        {/*    <FloatInput*/}
                        {/*        label="Enter Captcha"*/}
                        {/*        required*/}
                        {/*        value={form.captcha}*/}
                        {/*        onChange={v => set("captcha", v)}*/}
                        {/*        error={errors.captcha}*/}
                        {/*        placeholder="Enter result"*/}
                        {/*    />*/}

                            
                        {/*    <div className="mb-6">  */}
                        {/*        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">*/}
                                    
                        {/*            <span className="text-lg font-bold tracking-widest text-[#00957A] select-none italic">*/}
                        {/*                {captchaData.question}*/}
                        {/*            </span>*/}
                                     
                        {/*        </div>*/}
                                 
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                {/* ══ CTA ══════════════════════════════════════════════ */}
                <div className="mt-3 flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-6 shadow-sm sm:px-8">
                    {/*<ButtonBlue label="Submit Application" href="#" variant="outline" onClick={handleSubmit} />*/}
                    <ButtonBlue
                        label={loading ? "Submitting..." : "Submit Application"}
                        href="#"
                        variant="outline"
                        onClick={handleSubmit}
                    />
                    <ButtonBlue label="Clear Form" href="#" variant="outline" onClick={handleClear} />
                </div>

            </div>
        </div>
    );
}