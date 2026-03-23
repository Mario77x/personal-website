import { Check } from "lucide-react";
const About = () => {
  // Key points about Mario Savi
  const keyPoints = [
    "15 years working in tech, 8 directly in product management.",
    "Experienced in creating exceptional user experiences across industries and domains.",
    "Strong track record in optimizing product lifecycles and revenue growth.",
    "Experienced in bridging technical and business stakeholders.",
    "Seasoned in driving data-driven approaches, and taking decissions even when data is limited.",
    "Consistent record of applying Agile methodologies to unlock team potential.",
  ];
  return (
    <section id="about" className="py-20 relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-accent/5 blur-[120px] rounded-full -z-10" />

      <div className="section-container">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient">About</span> Me
          </h2>
          <div className="mt-2 h-1 w-20 bg-gradient-blue mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile image */}
          <div className="flex justify-center lg:justify-end reveal-on-scroll">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glass-card p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/lovable-uploads/5c29f974-6720-46cc-af28-4c8cd4b1f7a4.png"
                    alt="Mario Savi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -z-10 inset-0 blur-xl bg-blue-accent/20 rounded-full"></div>
            </div>
          </div>

          {/* About text */}
          <div className="space-y-6 reveal-on-scroll">
            <h3 className="text-2xl md:text-3xl font-bold">Why should you pick me?</h3>

            <p className="text-gray-300 text-balance">
              I'm a product leader with broad product, commercial, technical, and operational knowledge across SaaS and
              E-commerce products.
            </p>

            <p className="text-gray-300 text-balance">
              I apply data-driven decision-making to empower teams and drive growth, but my experience allows me to make
              the call when data is not available.
            </p>

            <p className="text-gray-300 text-balance">
              I see the problems and the opportunities, I take initiative, bring clarity, drive change, and deliver
              results.
            </p>

            <p className="text-gray-300 text-balance">
              As a generalist PM, I bring a fresh look to any new domain, I learn fast any new technology, and I'm able
              to deliver value from day one.
            </p>

            <ul className="space-y-3 mt-6">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-accent/20 text-blue-accent mr-3 mt-0.5">
                    <Check size={14} />
                  </span>
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
