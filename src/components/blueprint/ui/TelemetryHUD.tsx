import React, { useState, useEffect, useRef } from 'react';
import { TelemetryGauge } from '../../common/TelemetryGauge';

export const TelemetryHUD: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const systems = ['CORE.PRC', 'SYS.SKILLS', 'SYS.PROJECTS', 'IO.BUS', 'DB.MYSQL', 'ML.CV'];
    const actions = ['FETCH', 'POLL_OK', 'SYNC', 'FLUSH', 'BOUNDS_RESOLVE', 'TELEMETRY_REFRESH'];

    const bootSequence = [
      '[SYS] INITIALIZING SYSTEM BOOT STRAP...',
      '[SYS] LOADING NORMALIZED DATABASES...',
      '[SYS] INDEXING GRAPH RELATIONSHIPS... OK',
      '[SYS] RESOLVING SCREEN PRESENTS LAYOUT...',
      '[SYS] SYSTEMS STABLE. SHIELD ACTIVE. ONLINE.',
    ];

    setLogs(bootSequence);

    const logTimer = setInterval(() => {
      const sys = systems[Math.floor(Math.random() * systems.length)];
      const act = actions[Math.floor(Math.random() * actions.length)];
      const num = Math.floor(Math.random() * 900) + 100;
      const newLog = `[${sys}] ${act} - ADDR:0x${num.toString(16).toUpperCase()} - STATUS:OK`;
      
      setLogs((prev) => [...prev.slice(-25), newLog]);
    }, 2000 + Math.random() * 1500);

    return () => clearInterval(logTimer);
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-blueprint-bg border border-blueprint-accent/20 p-4 font-blueprint text-left select-none rounded-sm">
      <div className="border-b border-blueprint-accent/15 pb-2 mb-3 text-[10px] uppercase font-bold tracking-widest text-blueprint-accent/70 flex justify-between">
        <span>CONSOLE_LOGS</span>
        <span className="animate-pulse">● TRANSMITTING</span>
      </div>

      <div className="flex-1 bg-black/40 border border-blueprint-accent/10 rounded-sm p-3 font-mono text-[9px] text-blueprint-accent/80 overflow-y-auto min-h-[140px] max-h-[180px] space-y-1 scrollbar-thin">
        {logs.map((log, idx) => (
          <div key={idx} className="leading-tight break-all">
            <span className="text-blueprint-accent/30 font-bold mr-1.5">&gt;</span>
            {log}
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-blueprint-accent/15 mt-3 pt-3">
        <TelemetryGauge label="CPU CORE LOAD" initialValue={42} />
        <TelemetryGauge label="MEM CACHE PARITY" initialValue={76} />
      </div>
    </div>
  );
};
