import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Shell } from "@/components/site/Shell";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const title = "Sign In or Join Luxlife — Member Access";
const description =
  "Sign in to track orders, save favourites and receive Luxlife comfort offers. Join free with email or Google.";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/account", replace: true });
  }, [user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) toast.error(error);
        else {
          toast.success("Welcome back");
          navigate({ to: "/account" });
        }
      } else {
        const { error, needsConfirmation } = await signUp(email, password, fullName);
        if (error) toast.error(error);
        else if (needsConfirmation) toast.success("Check your email to confirm your account");
        else {
          toast.success("Account created");
          navigate({ to: "/account" });
        }
      }
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setBusy(true);
    const { error } = await signInWithGoogle();
    if (error) toast.error(error);
    setBusy(false);
  }

  return (
    <Shell>
      <div className="edge grid gap-10 py-8 sm:py-12 md:py-20 lg:grid-cols-2 lg:gap-24">
        {/* Form Container: First on mobile (order-1), right column on desktop (lg:order-2) */}
        <div className="order-1 lg:order-2 lg:max-w-md">
          <div className="flex border border-border">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "label-xs flex-1 py-3.5 transition-colors",
                  mode === m ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-secondary",
                )}
              >
                {m === "login" ? "Sign in" : "Join us"}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {mode === "register" && (
              <label className="block">
                <span className="label-xs">Full name</span>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  placeholder="Enter your name"
                  className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
                />
              </label>
            )}
            <label className="block">
              <span className="label-xs">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="name@example.com"
                className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
              />
            </label>
            <label className="block">
              <span className="label-xs">Password</span>
              <input
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder="••••••••"
                className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="label-xs w-full bg-primary py-4 text-primary-foreground font-semibold transition-colors duration-300 hover:opacity-90 disabled:opacity-50"
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="label-xs text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            onClick={onGoogle}
            disabled={busy}
            className="label-xs flex w-full items-center justify-center gap-3 border border-border py-4 transition-colors hover:bg-secondary disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.27-4.74 3.27-8.09Z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.29-2.66l-3.57-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
              />
              <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z" />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.29 9.14 5.38 12 5.38Z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-xs text-muted-foreground">
            By continuing you agree to the Luxlife terms of use and privacy policy.{" "}
            <Link to="/shop" search={{}} className="underline underline-offset-4">
              Keep shopping
            </Link>
          </p>
        </div>

        {/* Member Benefits Block: Bottom on mobile (order-2), left column on desktop (lg:order-1) */}
        <div className="order-2 lg:order-1 border-t border-border pt-8 lg:border-t-0 lg:pt-0">
          <p className="label-xs text-muted-foreground">Member access</p>
          <h1 className="display-md mt-3 max-w-[18ch]">
            {mode === "login" ? "Welcome back to Luxlife" : "Become a Luxlife member"}
          </h1>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Members get order tracking, faster checkout, early access to new launches, and free delivery on orders above
            ₹999.
          </p>
          <ul className="mt-6 divide-y divide-border border-y border-border text-sm">
            {[
              "Track every mattress order live",
              "Save delivery addresses for quick re-order",
              "Priority customer care via WhatsApp",
              "Member-exclusive discounts & seasonal offers",
            ].map((t) => (
              <li key={t} className="py-3 text-muted-foreground">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Shell>
  );
}
