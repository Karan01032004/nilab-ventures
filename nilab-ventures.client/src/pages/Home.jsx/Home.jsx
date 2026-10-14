import { Link } from "react-router-dom"; // Link import karein
import SeoHelmet from "../../seo/SeoHelmet"; 

import Banner from "../../componants/sections/Banner/Banner";
import ComprehensiveFunding from "../../componants/sections/ComprehensiveFunding/ComprehensiveFunding";
import FoundationalSupport from "../../componants/sections/FoundationalSupport/FoundationalSupport";
import InvestedSectors from "../../componants/sections/InvestedSectors/InvestedSectors";
import InvestmentPhilosophy from "../../componants/sections/InvestmentPhilosophy/InvestmentPhilosophy";
import InvestmentProcess from "../../componants/sections/InvestmentProcess/InvestmentProcess";
import MarketingGrowth from "../../componants/sections/MarketingJourney/MarketingJourney";
import PartnershipJourney from "../../componants/sections/PartnershipJourney/PartnershipJourney";
import ScaleYourVision from "../../componants/sections/ScaleYourVision/ScaleYourVision";
import SuccessStories from "../../componants/sections/SuccessStories/SuccessStories";
 

function Home() {

    return (
        <div className="scroll-smooth">
            <SeoHelmet path="/" />
            {/* 1. Banner Section */}
            <section id="home" >
                <Banner
                    title="Beyond Capital, We Provide the Foundation for Scale"
                    description="We're more than investors — we're your strategic partners in building tomorrow's entrepreneurs & industry leaders. From seed to scale, we provide comprehensive capital solutions and hands-on operational expertise if you need them."
                    primaryBtn={{
                        label: "Explore Funding",
                        href: "#Funding",
                    }}
                    secondaryBtn={{
                        label: "Partner With Us",
                        href: "#PartnershipJourney",
                    }}
                />
            </section>

            {/* 2. Philosophy Section */}
            <section id="InvestmentPhilosophy" >
                <InvestmentPhilosophy
                    title="Our Investment Philosophy"
                    subtitle="Visionary Partnership"
                    paragraphs={[
                        `We invest in founders who are not only willing to lead but are driven by a profound vision to create lasting impact. For us, "lasting impact" means fostering innovations that solve critical societal problems, drive economic growth, and create sustainable value for communities, extending far beyond financial returns. Our approach combines strategic capital deployment with truly comprehensive operational support, going beyond mere funding. We offer hands-on expertise in areas such as strategic planning, talent acquisition, market penetration, and technology development, ensuring our portfolio companies are equipped with every necessary tool for sustainable and impactful growth.`,
                        `Our core belief is that a founder's success is inextricably linked to our own success. We commit to being active partners, sharing in both the challenges and triumphs, and aligning our incentives completely with the long-term vision of the entrepreneurs we back.`,
                    ]}
                    cards={[
                        {
                            title: "Mission-Driven",
                            description: "Backing visionary founders solving tomorrow's challenges",
                        },
                        {
                            title: "Hands-On Support",
                            description: "Providing operational expertise beyond traditional funding",
                        },
                        {
                            title: "Long-Term Focus",
                            description: "Building sustainable value through strategic partnerships",
                        },
                    ]}
                />
            </section>

            {/* 3. Funding Section */}
            <section id="Funding" >
                <ComprehensiveFunding
                    title="Comprehensive Funding Solutions"
                    description="We offer flexible capital structures tailored to your company's unique growth trajectory and strategic objectives."
                    cards={[
                        {
                            number: "01",
                            title: "Seed Stage",
                            description: "Early-stage equity and convertible instruments for pre-revenue and early-revenue companies with proven market traction.",
                        },
                        {
                            number: "02",
                            title: "Growth Capital",
                            description: "Series A through C funding scaling operations, market expansion, and strategic acquisitions with established revenue streams.",
                        },
                        {
                            number: "03",
                            title: "Bridge Financing",
                            description: "Short-term funding solutions for companies between major funding rounds or preparing for strategic transitions.",
                        },
                        {
                            number: "04",
                            title: "Flexible Instruments",
                            description: "SAFEs, convertible notes, and hybrid securities designed to align investor and founder interests across all growth phases.",
                        },
                    ]}
                />
            </section>

            {/* 4. Sectors Section */}
            <section id="InvestedSectors" >
                <InvestedSectors
                    title="Target Investment Sectors"
                    sectors={[
                        {
                            title: "Retail, Food & Beverage and Hospitality",
                            description: "Innovative solutions for consumer experiences, supply chain optimization, and operational efficiency within the retail, food & beverage, and hospitality sectors.",
                        },
                        {
                            title: "Deep Tech & AI",
                            description: "Artificial intelligence, machine learning, and breakthrough technologies reshaping industries from healthcare to manufacturing.",
                        },
                        {
                            title: "Healthcare Innovation",
                            description: "Digital health solutions, biotech advances, and medical devices improving patient outcomes and healthcare accessibility.",
                        },
                        {
                            title: "Financial Technology",
                            description: "Next-generation payment systems, digital banking platforms, and innovative financial services transforming commerce.",
                        },
                    ]}
                />
            </section>

            {/* 5. Support Section */}
            <section id="FoundationalSupport" >
                <FoundationalSupport />
            </section>

            {/* 6. Marketing Section */}
            <section id="MarketingJourney" >
                <MarketingGrowth
                    title="Marketing & Growth Acceleration"
                    subtitle="Brand Building Excellence"
                    description="Our experienced marketing team helps portfolio companies develop compelling brand narratives, execute go-to-market strategies, and accelerate customer acquisition through data-driven campaigns."
                    points={[
                        "Strategic brand positioning and messaging",
                        "Digital marketing and customer acquisition",
                        "PR and thought leadership development",
                        "Partnership and channel development",
                    ]}
                />
            </section>

            {/* 7. Success Stories Section */}
            <section id="SuccessStories">
                <SuccessStories
                    title="Portfolio Success Stories"
                    stats={[

                        {
                            value: "150%",
                            subtitle: "Average Revenue Growth",
                            description: "Annual growth rate across our portfolio companies in their first two years post-investment.",

                        },
                        {
                            value: "85%",
                            subtitle: "Success Rate",
                            description: "Portfolio companies achieving Series A or profitability milestones within 18 months.",
                        },
                        {
                            value: "12",
                            subtitle: "Successful Exits",
                            description: "Portfolio companies achieving successful acquisitions in the past three years.",
                        },
                    ]}
                />
            </section>

            {/* 8. Process Section */}
            <section id="InvestmentProcess" >
                <InvestmentProcess
                    title="Our Investment Process"
                    description="We've streamlined our investment process to move quickly while ensuring thorough due diligence and strategic alignment."
                    steps={[
                        {
                            number: "1",
                            title: "Initial Review",
                            description: "Comprehensive evaluation of your business model, market opportunity, and team within 10 business days of application submission.",
                        },
                        {
                            number: "2",
                            title: "Deep Dive Analysis",
                            description: "Financial review, market validation, and strategic fit assessment with our investment committee and sector experts.",
                        },
                        {
                            number: "3",
                            title: "Partnership Decision",
                            description: "Final investment decision and term sheet negotiation, typically completed within 30 days of initial application.",
                        },
                        {
                            number: "4",
                            title: "Onboarding & Support",
                            description: "Immediate integration with our support services and strategic planning for accelerated growth implementation.",
                        },
                    ]}
                />
            </section>

            {/* 9. Vision Section */}
            <section id="ScaleYourVision" >
                <ScaleYourVision
                    title="Ready to Scale Your Vision?"
                    subtitle="Investment Criteria"
                    points={[
                        "Experienced founding team with industry expertise & executional capability",
                        "Proven market traction with early revenues",
                        "Scalable business model and clear growth strategy",
                        "Addressable market with competitive advantage",
                    ]}
                />
            </section>

            {/* 10. Partnership Journey Section */}
            <section id="PartnershipJourney" >
                <PartnershipJourney
                    title="Start Your Partnership Journey"
                    description="Ready to transform your startup into an industry leader? Connect with our investment team at Nilab Ventures to explore how our comprehensive support can accelerate your growth trajectory."
                    email="partner@nilabventures.com"
                    buttonLabel="Apply for Funding"
                    buttonLink="funding-application"
                    footerText="Building the future, one partnership at a time."
                />

            </section>
        </div>
    );
}

export default Home;