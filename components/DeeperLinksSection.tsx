"use client";

import Link from "next/link";

export default function DeeperLinksSection() {
  const links = [
    {
      href: "/about",
      title: "About / Manifesto",
      description: "Our design philosophy",
    },
    {
      href: "/symi-os",
      title: "Explore SYMI OS",
      description: "The operating system for business",
    },
    {
      href: "/collaborate",
      title: "Propose Collaboration",
      description: "Join the ecosystem",
    },
    {
      href: "/pricing",
      title: "Pricing",
      description: "Simple, transparent plans",
    },
  ];

  return (
    <section className="deeper-links py-14 bg-gradient-to-r from-purple-100 via-white to-purple-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="group border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600">
                {link.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{link.description}</p>
              <span className="text-purple-500 text-3xl mt-4 inline-block group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
