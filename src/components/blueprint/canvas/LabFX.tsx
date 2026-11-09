import React, { useEffect, useMemo, useState } from 'react';

/**
 * LabFX – electronics + Python themed animated decorations for the Engineering Lab.
 * All pieces respect prefers-reduced-motion and are pointer-transparent where decorative.
 */

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener ? mq.addEventListener('change', fn) : mq.addListener(fn);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', fn) : mq.removeListener(fn);
    };
  }, []);
  return reduced;
};

/** Shared keyframes, injected once. */
const FXStyles: React.FC = () => (
  <style>{`
    @keyframes fxTrace { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
    @keyframes fxVia   { 0%,100% { opacity: .15; } 50% { opacity: .8; } }
    @keyframes fxScroll { from { transform: translateX(0); } to { transform: translateX(-300px); } }
    @keyframes fxFlowR { 0% { left: -6px; opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { left: calc(100% - 2px); opacity: 0; } }
    @keyframes fxFlowL { 0% { left: calc(100% - 2px); opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { left: -6px; opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .fx-anim { animation: none !important; }
    }
  `}</style>
);

/* ───────────────────────── Circuit traces backdrop ───────────────────────── */

const TRACES = [
  // Orthogonal PCB-style routes with 45° bends (viewBox 400x300)
  'M 0 30 H 120 L 150 60 H 240 L 270 30 H 400',
  'M 0 150 H 60 L 90 120 H 200 V 70 L 230 40 H 400',
  'M 0 250 H 100 L 140 210 H 310 L 340 240 H 400',
  'M 40 300 V 220 L 70 190 H 180 V 120',
  'M 400 200 H 320 L 290 170 H 180 L 150 200 V 300',
  'M 250 0 V 60 L 280 90 V 160 L 310 190 H 400',
];
const VIAS: Array<[number, number]> = [
  [120, 30], [240, 60], [90, 120], [200, 70], [140, 210], [310, 210],
  [70, 190], [180, 120], [290, 170], [280, 90], [150, 200], [230, 40],
];

export const CircuitTraces: React.FC = () => {
  const reduced = useReducedMotion();
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <FXStyles />
      <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
        {/* static copper */}
        {TRACES.map((d, i) => (
          <path key={`t${i}`} d={d} fill="none" stroke="#00f0ff" strokeOpacity="0.10" strokeWidth="1" />
        ))}
        {/* travelling signal pulses */}
        {!reduced && TRACES.map((d, i) => (
          <path
            key={`p${i}`}
            d={d}
            fill="none"
            stroke={i % 3 === 2 ? '#ffad00' : '#00f0ff'}
            strokeOpacity="0.55"
            strokeWidth="1.4"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="7 93"
            className="fx-anim"
            style={{ animation: `fxTrace ${5 + i * 1.3}s linear ${i * 0.9}s infinite` }}
          />
        ))}
        {/* vias */}
        {VIAS.map(([x, y], i) => (
          <circle
            key={`v${i}`}
            cx={x} cy={y} r="2.2"
            fill="none" stroke="#00f0ff" strokeWidth="1"
            className="fx-anim"
            style={{ animation: reduced ? undefined : `fxVia ${2.4 + (i % 5) * 0.7}s ease-in-out ${i * 0.35}s infinite`, opacity: 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
};

/* ───────────────────── Hardware ⇄ Python ⇄ Web signal bridge ─────────────── */

const FlowLine: React.FC<{ dir: 'r' | 'l'; color: string; delay: number }> = ({ dir, color, delay }) => (
  <span
    className="fx-anim absolute top-1/2 -mt-[2px] w-[5px] h-[5px] rounded-full"
    style={{
      background: color,
      boxShadow: `0 0 6px ${color}`,
      animation: `${dir === 'r' ? 'fxFlowR' : 'fxFlowL'} 2.6s linear ${delay}s infinite`,
    }}
  />
);

const BridgeNode: React.FC<{ title: string; sub: string; icon: React.ReactNode }> = ({ title, sub, icon }) => (
  <div className="flex flex-col items-center gap-1 px-2 py-2 border border-[#00f0ff]/30 bg-black/45 rounded-sm min-w-[86px]">
    {icon}
    <span className="text-[9px] font-black tracking-widest text-white uppercase">{title}</span>
    <span className="text-[7px] text-[#00f0ff]/60 tracking-wider uppercase text-center leading-tight">{sub}</span>
  </div>
);

export const HwSwBridge: React.FC = () => {
  const reduced = useReducedMotion();
  const Connector: React.FC<{ label: string }> = ({ label }) => (
    <div className="relative flex-1 h-8 min-w-[48px]" aria-hidden="true">
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#00f0ff]/30" />
      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[6.5px] text-[#00f0ff]/50 tracking-widest uppercase whitespace-nowrap">{label}</span>
      {!reduced && (
        <>
          <FlowLine dir="r" color="#00f0ff" delay={0} />
          <FlowLine dir="r" color="#00f0ff" delay={1.3} />
          <FlowLine dir="l" color="#ffad00" delay={0.7} />
        </>
      )}
    </div>
  );
  return (
    <div className="w-full max-w-md">
      <FXStyles />
      <div className="flex items-center gap-1.5">
        <BridgeNode
          title="Hardware"
          sub="RPi · GPIO · I2C · PWM"
          icon={(
            <svg className="w-6 h-6 text-[#00f0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <rect x="5" y="5" width="14" height="14" rx="1.5" />
              <rect x="9.5" y="9.5" width="5" height="5" fill="currentColor" fillOpacity="0.25" />
              {[8, 12, 16].map(p => (
                <g key={p}>
                  <line x1={p} y1="2.5" x2={p} y2="5" /><line x1={p} y1="19" x2={p} y2="21.5" />
                  <line x1="2.5" y1={p} x2="5" y2={p} /><line x1="19" y1={p} x2="21.5" y2={p} />
                </g>
              ))}
            </svg>
          )}
        />
        <Connector label="sensor data" />
        <BridgeNode
          title="Python"
          sub="OpenCV · Ollama · FastAPI"
          icon={(
            <svg className="w-6 h-6 text-[#00f0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M12 3c-3 0-4 1.4-4 3v2.5h8V10c0 1.5-1 3-4 3H9c-3 0-4 1.5-4 3.5S6 21 9 21h3c3 0 4-1.4 4-3v-2.5H8V14c0-1.5 1-3 4-3h3c3 0 4-1.5 4-3.5S18 3 15 3h-3z" opacity="0.9" />
              <circle cx="10" cy="5.6" r="0.9" fill="currentColor" stroke="none" />
              <circle cx="14" cy="18.4" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          )}
        />
        <Connector label="commands" />
        <BridgeNode
          title="Web"
          sub="React · Node · APIs"
          icon={(
            <svg className="w-6 h-6 text-[#00f0ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="12" cy="12" r="9" />
              <ellipse cx="12" cy="12" rx="4" ry="9" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          )}
        />
      </div>
      <p className="text-[7.5px] text-white/40 tracking-widest uppercase text-center mt-1.5">
        Circuit to code: every project runs this full loop
      </p>
    </div>
  );
};

/* ─────────────────────────── Oscilloscope strip ──────────────────────────── */

const sinePath = (w: number, h: number, amp: number, period: number, mid: number) => {
  let d = `M 0 ${mid}`;
  for (let x = 0; x <= w; x += 4) {
    d += ` L ${x} ${(mid - Math.sin((x / period) * Math.PI * 2) * amp).toFixed(1)}`;
  }
  return d;
};

const pwmPath = (w: number, period: number, duty: number, hi: number, lo: number) => {
  let d = `M 0 ${lo}`;
  for (let x = 0; x < w; x += period) {
    const on = period * duty;
    d += ` L ${x} ${lo} L ${x} ${hi} L ${x + on} ${hi} L ${x + on} ${lo} L ${x + period} ${lo}`;
  }
  return d;
};

export const ScopeStrip: React.FC = () => {
  const reduced = useReducedMotion();
  const sine = useMemo(() => sinePath(600, 60, 11, 75, 18), []);
  const pwm = useMemo(() => pwmPath(600, 60, 0.25, 36, 52), []);
  return (
    <div className="w-full max-w-md border border-[#00f0ff]/20 bg-black/50 rounded-sm overflow-hidden" aria-hidden="true">
      <FXStyles />
      <div className="flex items-center justify-between px-2 py-1 border-b border-[#00f0ff]/15 text-[7px] tracking-widest uppercase">
        <span className="text-[#00f0ff]/70 font-bold">SIG_MONITOR</span>
        <span className="text-[#00f0ff]/60">CH1: IMX_SENSOR</span>
        <span className="text-[#ffad00]/70">CH2: SERVO_PWM · 50Hz · 7.5% DUTY</span>
      </div>
      <div className="relative h-[60px]">
        {/* graticule */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 60">
          {[15, 30, 45].map(y => <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#00f0ff" strokeOpacity="0.08" strokeWidth="0.5" />)}
          {Array.from({ length: 10 }, (_, i) => (i + 1) * 30).map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="60" stroke="#00f0ff" strokeOpacity="0.08" strokeWidth="0.5" />
          ))}
        </svg>
        {/* scrolling traces: 600 wide content shifted left by 300 for a seamless loop */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            width="600" height="60" viewBox="0 0 600 60"
            className="fx-anim absolute top-0 left-0"
            style={{ animation: reduced ? undefined : 'fxScroll 6s linear infinite' }}
          >
            <path d={sine} fill="none" stroke="#00f0ff" strokeOpacity="0.85" strokeWidth="1.2" />
            <path d={pwm} fill="none" stroke="#ffad00" strokeOpacity="0.8" strokeWidth="1.1" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── Python terminal ticker ────────────────────────── */

const PY_LINES = [
  'servo.set_angle(pan=32)                 # Omni Room PTZ tracking',
  'encs = face_recognition.face_encodings(frame)   # 128-D embeddings',
  'ollama.chat(model="llama3", messages=lecture)   # Echo Minds, offline',
  'bus.read_i2c_block_data(0x68, 0x3B, 6)  # reading the IMU over I2C',
  'clf.predict(window_features)            # motor anomaly @ 0.88 precision',
  'picam2.capture_array()                  # IMX708 NoIR frame grab',
  'app.post("/orders")                     # PulseX API — live in production',
  'GPIO.output(STATUS_LED, GPIO.HIGH)      # PiPilot heartbeat',
];

export const PyTicker: React.FC = () => {
  const reduced = useReducedMotion();
  const [lineIdx, setLineIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const line = PY_LINES[lineIdx];

  useEffect(() => {
    if (reduced) {
      const t = setInterval(() => setLineIdx(i => (i + 1) % PY_LINES.length), 4000);
      return () => clearInterval(t);
    }
    if (chars < line.length) {
      const t = setTimeout(() => setChars(c => c + 1), 28);
      return () => clearTimeout(t);
    }
    const hold = setTimeout(() => { setChars(0); setLineIdx(i => (i + 1) % PY_LINES.length); }, 2200);
    return () => clearTimeout(hold);
  }, [chars, line, reduced]);

  return (
    <div className="mt-2 flex items-center gap-2 border border-[#00f0ff]/20 bg-black/55 rounded-sm px-2.5 py-1.5 overflow-hidden" aria-hidden="true">
      <span className="text-[8px] font-black text-[#ffad00] tracking-widest shrink-0">PY&gt;&gt;&gt;</span>
      <code className="text-[9px] text-[#00f0ff]/90 whitespace-pre overflow-hidden text-ellipsis">
        {reduced ? line : line.slice(0, chars)}
        <span className="inline-block w-[6px] h-[10px] bg-[#00f0ff]/80 align-middle ml-0.5 animate-pulse" />
      </code>
    </div>
  );
};
