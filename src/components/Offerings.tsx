import { useState } from "react";
import { motion } from "motion/react";
import { Arrow, SectionLabel } from "./Shared";
const modes = ["Understand", "Reason", "Create"];
const descriptions = [
  "From scattered information to a clear point of view.",
  "Connect context. Surface patterns. Make the next decision clearer.",
  "Turn understanding into something entirely new.",
];
export function Offerings() {
  const [mode, setMode] = useState(0),
    [run, setRun] = useState(false),
    [compact, setCompact] = useState(false);
  return (
    <section id="offerings" className="offerings section-pad">
      <SectionLabel number="06" total="08">
        OUR CAPABILITIES
      </SectionLabel>
      <div className="offering-heading">
        <h2>
          Three disciplines.
          <br />
          One unfair advantage.
        </h2>
        <p>
          From the intelligence underneath
          <br />
          to the experience in your hands.
        </p>
      </div>
      <article className="intelligence offering">
        <div className="offering-copy">
          <span className="mono">01 / COGNITIVE TECHNOLOGY</span>
          <h3>
            VANTA
            <br />
            Intelligence<span className="orange">.</span>
          </h3>
          <p>
            Intelligence that understands your world.
            <br />
            Not just your instructions.
          </p>
          <a className="text-link" href="#contact">
            Build with intelligence <Arrow diagonal />
          </a>
        </div>
        <div className="intelligence-demo">
          <div className="demo-top mono">
            <span>
              <span className="status-dot" /> NEURAL ENGINE
            </span>
            <span>INTERACTIVE DEMO</span>
          </div>
          <div
            className={`neural-visual neural-mode-${mode}`}
            aria-hidden="true"
          >
            {Array.from({ length: 22 }, (_, i) => (
              <i
                key={i}
                style={{
                  transform: `translate(-50%,-50%) rotate(${i * (mode === 2 ? 21 : 8.18)}deg)`,
                  width: `${mode === 1 ? 42 : 65}%`,
                  height: `${mode === 2 ? 70 : 36}%`,
                }}
              />
            ))}
            <span className="neural-core">V</span>
          </div>
          <div className="mode-buttons" aria-label="Intelligence mode">
            {modes.map((label, i) => (
              <button
                key={label}
                aria-pressed={i === mode}
                onClick={() => setMode(i)}
              >
                {i === mode && (
                  <motion.span
                    className="mode-indicator"
                    layoutId="intelligence-mode"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="demo-caption" aria-live="polite">
            {descriptions[mode]}
          </div>
        </div>
      </article>
      <div className="offerings-pair">
        <article className="systems offering">
          <div className="mono flex justify-between">
            <span>02 / CONNECTED OPERATIONS</span>
            <span>↗</span>
          </div>
          <h3>VANTA Systems.</h3>
          <p>
            Less busywork. More momentum.
            <br />
            The invisible engine of your business.
          </p>
          <div className={`system-flow ${run ? "is-running" : ""}`}>
            <div className="flow-node">
              <span>01</span>Input
            </div>
            <div className="flow-connector" />
            <div className="flow-node flow-main">
              <span>02</span>
              {run ? "Connected" : "Orchestrate"}
            </div>
            <div className="flow-connector" />
            <div className="flow-node">
              <span>03</span>
              {run ? "Complete" : "Output"}
            </div>
          </div>
          <button
            className="text-link"
            onClick={() => setRun(!run)}
            aria-pressed={run}
          >
            {run ? "Reset workflow" : "Run the workflow"}{" "}
            <span>{run ? "↺" : "↗"}</span>
          </button>
          <span className="run-feedback mono" aria-live="polite">
            {run
              ? "3 STEPS CONNECTED. ZERO MANUAL HANDOFFS."
              : "A SIMPLE SIMULATION. A BIGGER POSSIBILITY."}
          </span>
        </article>
        <article className="interfaces offering">
          <div className="mono flex justify-between">
            <span>03 / HUMAN EXPERIENCE</span>
            <span>↗</span>
          </div>
          <h3>VANTA Interfaces.</h3>
          <p>
            The space between human and machine.
            <br />
            Redesigned around the human.
          </p>
          <div className={`interface-demo ${compact ? "compact" : ""}`}>
            <div className="interface-sidebar">
              V<span>⊞</span>
              <span>≡</span>
              <span>◌</span>
            </div>
            <div className="interface-body">
              <div className="interface-toolbar">
                <span>Your workspace</span>
                <button
                  onClick={() => setCompact(!compact)}
                  aria-pressed={compact}
                  title="Toggle workspace layout"
                >
                  {compact ? "Expand ↗" : "Focus ↙"}
                </button>
              </div>
              <div className="interface-widgets">
                {["Signal", "Activity", "Overview"].map((l, i) => (
                  <motion.div
                    layout
                    className={`widget widget-${i}`}
                    key={l}
                    transition={{ duration: 0.4 }}
                  >
                    <span>{l}</span>
                    <div className="mini-bars">
                      {Array.from({ length: 8 }, (_, j) => (
                        <i
                          style={{
                            height: `${20 + ((j * 17 + i * 13) % 70)}%`,
                          }}
                          key={j}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="mono interface-note">
            GOOD DESIGN IS NOT A LAYER. IT’S THE LOGIC.
          </div>
        </article>
      </div>
    </section>
  );
}
