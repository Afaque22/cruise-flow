import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
  Phone,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Navbar } from "../components/layout/Navbar";

const skills = [
  "React Native",
  "React.js",
  "Next.js",
  "Node.js",
  "JavaScript",
  "TypeScript",
  "Firebase",
  "REST APIs",
];

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      {content}
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" />

          <div className="absolute -bottom-48 right-0 h-[500px] w-[500px] rounded-full bg-slate-700/20 blur-3xl" />

          <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                About the developer
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Built by <span className="text-slate-300">Afaque Ahmed.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                I'm a React Native and Full-Stack JavaScript Developer focused
                on building reliable, responsive, and production-ready web and
                mobile applications.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/search"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Explore CruiseFlow
                  <ArrowRight size={17} />
                </Link>

                <a
                  href="https://afaque22.github.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View portfolio
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                About me
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Building products across web and mobile.
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  I'm Afaque Ahmed, a React Native and Full-Stack JavaScript
                  Developer based in Karachi, Pakistan. I have 3+ years of
                  professional experience building and maintaining web and
                  mobile applications.
                </p>

                <p>
                  My primary technologies include React Native, React.js,
                  Next.js, Node.js, JavaScript, and TypeScript. I've also worked
                  with Firebase and REST APIs as part of production application
                  development.
                </p>

                <p>
                  I've worked across a diverse range of applications, including
                  mobile and web products, with experience taking products
                  through development, deployment, and ongoing maintenance.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-xl font-bold text-white">
                  AA
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-950">
                    Afaque Ahmed
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    React Native • Full-Stack JavaScript Developer
                  </p>
                </div>
              </div>

              <div className="mt-6 h-px bg-slate-100" />

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin size={17} className="text-slate-400" />
                  Karachi, Pakistan
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <BriefcaseBusiness size={17} className="text-slate-400" />
                  3+ years professional experience
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Code2 size={17} className="text-slate-400" />
                  Web & mobile development
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <GraduationCap size={17} className="text-slate-400" />
                  BS Computer Science
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Technology
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Tools I work with.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                A practical JavaScript-focused stack for building modern web and
                mobile products.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 lg:py-20">
          <div className="overflow-hidden rounded-[28px] bg-slate-950 text-white">
            <div className="grid lg:grid-cols-[1fr_0.8fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-950">
                  <Rocket size={20} />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  The project
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Why CruiseFlow?
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-400">
                  CruiseFlow is a frontend cruise search and booking experience
                  created as a demonstration of modern React development.
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  The project focuses on a complete customer journey from
                  searching for a cruise and selecting a sailing date to
                  choosing a cabin and completing a multi-step checkout.
                </p>

                <Link
                  to="/search"
                  className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Explore the experience
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="border-t border-white/10 bg-white/[0.03] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Project highlights
                </p>

                <div className="mt-6 space-y-5">
                  {[
                    "Multi-parametric cruise search",
                    "Dependent search filters",
                    "Interactive cabin selection",
                    "Multi-step checkout",
                    "Responsive design",
                    "Mock booking confirmation",
                  ].map((item, index) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                        {index + 1}
                      </div>

                      <p className="pt-0.5 text-sm text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Get in touch
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Let's connect.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                For professional opportunities, collaborations, or questions
                about the project, you can reach me through the channels below.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ContactItem
                icon={<Mail size={18} />}
                label="Email"
                value="afaque.memon22@gmail.com"
                href="mailto:afaque.memon22@gmail.com"
              />

              <ContactItem
                icon={<Phone size={18} />}
                label="Phone"
                value="+92 315 7111838"
                href="tel:+923157111838"
              />

              <ContactItem
                icon={<Link2 size={18} />}
                label="LinkedIn"
                value="linkedin.com/in/afaque-memon-7271aa1b"
                href="https://linkedin.com/in/afaque-memon-7271aa1b"
              />

              <ContactItem
                icon={<ExternalLink size={18} />}
                label="Portfolio"
                value="afaque22.github.io"
                href="https://afaque22.github.io/"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#f7f8fa]">
          <div className="mx-auto max-w-[1100px] px-5 py-12 text-center sm:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Ready to explore CruiseFlow?
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Start with a cruise search and follow the complete booking
              experience.
            </p>

            <Link
              to="/search"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Explore cruises
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
