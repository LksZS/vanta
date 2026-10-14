import { useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP, SplitText, NO_REDUCE } from "../lib/motion";
import { Arrow, Magnetic, SectionLabel } from "./Shared";
export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false),
    [brief, setBrief] = useState("");
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCE, () => {
        SplitText.create(".contact-title", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria: "auto",
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 105,
              duration: 0.8,
              stagger: 0.06,
              ease: "expo.out",
              scrollTrigger: {
                trigger: root.current,
                start: "top 80%",
                once: true,
              },
            });
          },
        });
      });
    },
    { scope: root },
  );
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `VANTA — Project inquiry\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nInterest: ${data.get("interest")}\n\nVision:\n${data.get("message")}\n\nPrepared locally. No information has been sent. VANTA is a fictional studio.`;
    setBrief(text);
    setReady(true);
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "VANTA-project-brief.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <section id="contact" className="contact section-pad" ref={root}>
      <SectionLabel number="08" total="08">
        YOUR NEXT STARTS HERE
      </SectionLabel>
      <div className="contact-grid">
        <div>
          <h2 className="contact-title">
            Let’s make
            <br />
            what’s next<span className="orange">.</span>
          </h2>
          <p>
            Bring your impossible.
            <br />
            We’ll bring a different way of thinking.
          </p>
          <span className="mono contact-availability">
            <span className="status-dot" /> OPEN FOR AMBITIOUS CONVERSATIONS
          </span>
        </div>
        <form onSubmit={submit} className="contact-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label>
              Your name
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Alex Morgan"
                maxLength={100}
              />
            </label>
            <label>
              Email address
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="alex@company.com"
                maxLength={150}
              />
            </label>
          </div>
          <label>
            What are you exploring?
            <select name="interest" defaultValue="An ambitious idea">
              <option>An ambitious idea</option>
              <option>VANTA Intelligence</option>
              <option>VANTA Systems</option>
              <option>VANTA Interfaces</option>
            </select>
          </label>
          <label>
            Tell us about your next
            <textarea
              required
              name="message"
              placeholder="We want to change the way…"
              rows={2}
              minLength={10}
              maxLength={3000}
            />
          </label>
          <Magnetic>
            <button type="submit" className="submit-button">
              Prepare your project brief <Arrow diagonal />
            </button>
          </Magnetic>
          <p className="form-note">
            An independent concept, not a real agency. Your details stay in your
            browser. Create a brief to download—nothing is sent.
          </p>
          {ready && (
            <div className="form-success" role="status">
              <strong>Your next is taking shape.</strong>
              <p>
                Your project brief is ready. No information has been submitted.
              </p>
              <button type="button" onClick={download}>
                Download your brief ↓
              </button>
            </div>
          )}
        </form>
      </div>
      <footer>
        <div className="footer-top">
          <a className="wordmark" href="#home">
            VANTA<sup>®</sup>
          </a>
          <div>
            <a href="#approach">Approach</a>
            <a href="#offerings">Capabilities</a>
            <a href="#playground">Playground</a>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          VANTA<span>®</span>
        </div>
        <div className="footer-bottom mono">
          <span>© 2026 VANTA. A FICTIONAL EXPERIMENTAL TECHNOLOGY STUDIO.</span>
          <span>INDEPENDENT BY DESIGN. INEVITABLE BY NATURE.</span>
        </div>
      </footer>
    </section>
  );
}
