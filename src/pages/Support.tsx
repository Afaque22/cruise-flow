import { ArrowRight, HelpCircle, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const supportTopics = [
  "Finding the right cruise",
  "Cruise and cabin information",
  "Booking and checkout",
  "Payment questions",
];

export default function Support() {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <main className="mx-auto max-w-[900px] px-5 py-14 sm:px-8 lg:py-20">
        <section className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <HelpCircle size={24} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            Support
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            How can we help?
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-500">
            Have a question about finding a cruise, selecting a cabin, or
            completing your booking? We're here to help.
          </p>
        </section>

        <section className="mt-10 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <MessageCircle size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                What can we help with?
              </h2>

              <p className="mt-1 text-xs text-slate-400">Common topics</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {supportTopics.map((topic) => (
              <div
                key={topic}
                className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
              >
                {topic}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[28px] bg-slate-950 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Contact support
              </p>

              <h2 className="mt-2 text-xl font-bold">Still need help?</h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                Send us your question and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <a
              href="mailto:afaque.memon22@gmail.com"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              <Mail size={16} />
              Email support
            </a>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            Browse cruises
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
}
