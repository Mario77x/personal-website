import { useState, useRef, useEffect, useCallback } from "react";
import { Briefcase, Building, ChevronDown, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const Experience = () => {
  const isMobile = useIsMobile();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const collapseSource = useRef<"explicit" | "auto">("auto");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const toggleButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Global click listener: auto-collapse when clicking outside toggle buttons
  useEffect(() => {
    if (!isMobile) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (expandedIndex === null) return;

      // Check if click is on any toggle button
      const isToggleButton = toggleButtonRefs.current.some(
        (btn) => btn && btn.contains(e.target as Node)
      );
      if (!isToggleButton) {
        collapseSource.current = "auto";
        setExpandedIndex(null);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isMobile, expandedIndex]);

  const handleToggle = useCallback(
    (index: number) => {
      if (expandedIndex === index) {
        // Explicit close
        collapseSource.current = "explicit";
        setExpandedIndex(null);

        // Scroll to card title after collapse
        requestAnimationFrame(() => {
          const card = cardRefs.current[index];
          if (card) {
            const navbar = document.querySelector("nav");
            const navbarHeight =
              navbar instanceof HTMLElement ? navbar.offsetHeight : 0;
            const top =
              card.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
            window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
          }
        });
      } else {
        // Opening a new one (auto-collapses previous silently)
        collapseSource.current = "auto";
        setExpandedIndex(index);
      }
    },
    [expandedIndex]
  );

  const experiences: ExperienceItem[] = [
    {
      title: "Group Product Manager",
      company: "Factor Eleven",
      location: "Gießen (DE, Remote)",
      period: "September 2022 - August 2025",
      description: [
        "Managed main workflows for a complex Ad Tech platform with multiple use cases.",
        "Led a tribe of three cross-functional teams and two Senior PMs, managing one team as an individual contributor, partnering closely with Engineers, Designers, and stakeholders.",
        "Implemented continuous discovery practices and telemetry, crafting specific KPIs to measure success, helping shifting towards a modern data-driven and outcome-based product management culture.",
        "Improved cross-functional alignment with C-level and other company-wide stakeholders.",
        "Reduced user pain points and increased customer satisfaction, retention and revenue by focusing sharply on UX/UI workflow improvements, architectural redesign (multi-tenancy, microservices), performance improvements, and reduction of tech debt.",
        "Contributed to the successful opening of new markets in Europe.",
        "Pioneered use of AI tools such as vibe-coding, and created a strategy to incorporate GenAI capabilities to tackle user problems that classical approaches could not resolve.",
      ],
    },
    {
      title: "Product Owner",
      company: "VCSW",
      location: "The Hague (NL)",
      period: "February 2022 - August 2022",
      description: [
        "Owned the strategy and execution of a SaaS platform and the launch of an API connector in a highly regulated environment, at the intersection of payroll, legal and insurance.",
        "Led two cross-functional teams as an individual contributor.",
        "Drove change management practices, leading the adoption of Scrum methodologies, product discovery, and data-driven practices, bringing the organization closer to a modern product operating model.",
        "Partnered closely with Sales, Marketing, Engineering and C-level to shape pricing, packaging, launches and strategy.",
        "Improved market position and drove customer satisfaction and revenue growth.",
        "Increased platform scalability and improved user experience by reducing tech debt, improving architecture, and simplifying usability.",
        "Successfully negotiated with Insurance companies to unblock the MVP of the API connector, which brought Payroll data to legacy insurance systems.",
        "Reporting to the COO, implemented proactive communication strategies with company-wide stakeholders that improved internal alignment.",
      ],
    },
    {
      title: "Product Owner",
      company: "Spaces (sister company of Regus)",
      location: "Amsterdam (NL)",
      period: "January 2020 - December 2021",
      description: [
        "Managed the spacesworks.com e-commerce platform offering +400 coworking and office space locations worldwide in more than 30 languages.",
        "Led growth strategies through CRO, A/B testing, and overall content and UI improvements.",
        "Led an external development team as the only in-house member, running workshops and prioritization ceremonies.",
        "Coordinated content production and localisation at scale through internal teams and external vendors.",
        "Increased ~20% conversion during my 2-year tenure.",
        "Helped launch a new family of products as a response to a drop in revenue due to the Covid-19 pandemic.",
        "Managed stakeholders across several teams and departments, from building managers to directors at the parent company IWG plc.",
      ],
    },
    {
      title: "Customer Experience Team Lead",
      company: "DoubleDutch mobile app by Cvent",
      location: "Amsterdam (NL)",
      period: "January 2018 - December 2019",
      description: [
        "Onboarded and provided strategic advice to large Enterprise accounts collaborating closely with Account Managers, often visiting customers' offices in Europe.",
        "Managed a Support team, ensuring timely and effective resolution of customer issues and acting as second line of support for complex technical issues.",
        "Drove improvements in adoption, retention and customer satisfaction across our customer base in EMEA + APAC.",
        "Collaborated with cross-functional teams to translate customer insights into tangible improvements that drove business outcomes.",
      ],
    },
    {
      title: "Junior Product Owner",
      company: "Booking.com",
      location: "Amsterdam (NL)",
      period: "August 2015 - July 2017",
      description: [
        "Partially managed a product across two cross-functional teams (desktop and mobile apps) successfully increasing downloads, active users, opening rates, engagement, loyalty, and conversion, all of it through hypothesis-based A/B tests.",
        "Was directly involved in product and feature launches working with two cross-functional teams (desktop and mobile apps).",
        "Learned the craft of user research and data analysis through techniques such as SQL querying, user interviews, online targeted surveys, on-site product testing, etc.",
      ],
    },
    {
      title: "Project Manager",
      company: "Booking.com",
      location: "Amsterdam (NL)",
      period: "December 2013 - July 2015",
      description: [
        "Successfully coordinated the production of content at scale for dozens of content projects aimed at A/B testing new features and launching new products that drove tangible learnings and conversion increases.",
        "Managed project contributors worldwide and collaborated closely with product teams.",
        "Managed translation/internationalization of copy.",
        "Took part in several crucial product launches (including entire new products already retired, such as the non-hotel rental website villas.com).",
      ],
    },
    {
      title: "Content Projects Editor",
      company: "Booking.com",
      location: "Amsterdam (NL)",
      period: "June 2011 - December 2013",
      description: [
        "Produced, curated and delivered uncountable pieces of content (copy, photos, user generated content) aimed at A/B testing new features and products that drove both learnings and conversion increases.",
        "Managed translation/internationalization of copy.",
        "Collaborated with product teams in several launches.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-dark-surface relative">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-accent/5 blur-[120px] rounded-full -z-10" />

      <div className="section-container">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-gradient-blue mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-accent via-blue-accent/50 to-transparent transform md:-translate-x-0.5"></div>

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative reveal-on-scroll">
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-dark-bg rounded-full border-2 border-blue-accent transform -translate-x-1/2 md:-translate-x-4 flex items-center justify-center shadow-blue-glow">
                  <Briefcase size={16} className="text-blue-accent" />
                </div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 ${index % 2 === 0 ? "md:mr-[50%] md:pr-12" : "md:ml-[50%] md:pl-12"}`}
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="glass-card p-6 rounded-lg hover:shadow-blue-glow transition-shadow duration-300"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center text-lg text-blue-accent">
                        <Building size={16} className="mr-2" />
                        {exp.company}
                      </div>
                      <div className="flex ml-6">
                        <div className="text-sm text-gray-400">
                          {exp.location}
                        </div>
                        <div className="text-sm text-gray-400 ml-2">
                          | {exp.period}
                        </div>
                      </div>
                    </div>

                    {/* Desktop: always show description */}
                    {!isMobile && (
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-accent mr-2">•</span>
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Mobile: expand/collapse */}
                    {isMobile && (
                      <>
                        <div
                          className="overflow-hidden transition-all duration-300 ease-in-out"
                          style={{
                            maxHeight:
                              expandedIndex === index ? "2000px" : "0px",
                            opacity: expandedIndex === index ? 1 : 0,
                          }}
                        >
                          <ul className="space-y-2">
                            {exp.description.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-blue-accent mr-2">
                                  •
                                </span>
                                <span className="text-gray-300">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          ref={(el) => {
                            toggleButtonRefs.current[index] = el;
                          }}
                          onClick={() => handleToggle(index)}
                          className="text-blue-accent hover:text-muted-foreground transition-colors text-sm flex items-center gap-1 mt-3"
                        >
                          {expandedIndex === index ? (
                            <>
                              Close <X size={14} />
                            </>
                          ) : (
                            <>
                              Read more <ChevronDown size={14} />
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
