import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, Instagram } from "lucide-react";
import luxlifeWhiteLogo from "@/assets/luxlife-logo-white.png";

export function Footer() {
  return (
    <footer className="border-t border-concrete/20 bg-ink text-bone">
      <div className="edge py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand Col with Logo */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <img
                src={luxlifeWhiteLogo}
                alt="Luxlife Mattresses"
                className="h-10 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <p className="mt-3 text-xs uppercase tracking-widest text-volt">Sleep Better · Live Better</p>
            <p className="mt-4 text-xs leading-relaxed text-concrete">
              Manufacturer of premium orthopedic, memory foam, pocket spring, and natural latex mattresses. Direct from
              Salem factory to your home.
            </p>
          </div>

          {/* Mattresses Col */}
          <div>
            <h4 className="label-xs text-bone">Mattresses</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-concrete">
              <li>
                <Link to="/shop" search={{ c: "Orthopedic" }} className="hover:text-bone">
                  Orthopedic Range
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ c: "Memory Foam" }} className="hover:text-bone">
                  Memory Foam
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ c: "Pocket Spring" }} className="hover:text-bone">
                  Pocket Spring
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ c: "Natural Latex" }} className="hover:text-bone">
                  100% Natural Latex
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ c: "Cooling Gel" }} className="hover:text-bone">
                  Cooling Hybrid
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="label-xs text-bone">Support & Custom</h4>
            <ul className="mt-4 space-y-2.5 text-xs text-concrete">
              <li>
                <Link to="/shop" className="hover:text-bone">
                  All Mattresses
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-bone">
                  My Orders
                </Link>
              </li>
              <li>
                <span className="text-bone/80">100-Night Sleep Trial</span>
              </li>
              <li>
                <span className="text-bone/80">10-Year Factory Warranty</span>
              </li>
              <li>
                <span className="text-bone/80">Free Delivery across Salem</span>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="label-xs text-bone">Factory & Showroom</h4>
            <div className="mt-4 space-y-3 text-xs text-concrete">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
                <span>R.S.NO.78/3D, Mariamman Kovil Street, Seelanaickenpatti, Salem – 636201</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-volt" />
                <a href="tel:+916382654934" className="hover:text-bone">
                  +91 63826 54934 (T. Karthikeyan, MD)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 shrink-0 text-volt" />
                <a
                  href="https://wa.me/916382654934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone"
                >
                  Chat on WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-volt" />
                <a href="mailto:luxlifemattresses@gmail.com" className="hover:text-bone">
                  luxlifemattresses@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="h-4 w-4 shrink-0 text-volt" />
                <a
                  href="https://instagram.com/luxlife_mattresses_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-bone"
                >
                  @luxlife_mattresses_
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Foundif Innovations */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-concrete/10 pt-8 text-xs text-concrete sm:flex-row">
          <p>© 2026 Luxlife Mattresses. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="tracking-wide">Engineered in Salem, Tamil Nadu</span>
            <span className="text-concrete/40">•</span>
            <a
              href="https://foundif.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-concrete transition-colors hover:text-volt"
            >
              Designed by <span className="font-semibold text-bone hover:text-volt">Foundif Innovations</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
