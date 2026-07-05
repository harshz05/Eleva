import Container from "../ui/Container";

import {
  quickLinks,
  resources,
} from "@/constants/footerLinks";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-black py-16 text-white">
      <Container>
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold">Eleva</h2>

            <p className="mt-4 text-slate-400">
              AI-powered placement preparation platform helping students crack
              technical interviews with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 transition-colors duration-300 hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Resources
            </h3>

            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 transition-colors duration-300 hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Connect
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  GitHub
                </a>
              </li>

              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-8">
          <p className="text-center text-sm text-slate-500">
            © 2026 Eleva. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}