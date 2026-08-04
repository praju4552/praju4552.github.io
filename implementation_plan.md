# Implementation Plan - Engineering Blueprint

The **Engineering Blueprint** is a flagship interactive visualization feature for Prajwal's portfolio. It presents his resume as a highly detailed, exploded-view engineered system, drawing inspiration from NASA schematics, automotive manuals, Apple hardware teardowns, and CAD interfaces. 

This document defines the software architecture, folder structure, component specifications, and a phased execution roadmap.

---

## Architectural Philosophy

To build a premium, visually stunning, and highly responsive engineering visualization while preserving the existing codebase, we adhere to the following principles:

1. **Non-Invasive Integration**: The existing layout, CSS, and animations will remain fully intact. The Engineering Blueprint will be introduced as an immersive overlay/mode (activated via a prominent `[ACTIVATE BLUEPRINT MODE]` tactical button).
2. **Exploded-View Mechanics**: In **Assembled Mode**, the resume modules stack together in the center as a unified core. In **Exploded Mode**, the modules glide outward along 2D/3D axes, connected by animated technical SVG callout lines that animate on hover and selection.
3. **JSON-Driven Schema**: Every project detail, skill category, and metric is stored in a clean JSON format. This makes the system scalable for unlimited future projects and data updates.
4. **Aesthetic Excellence (NASA/CAD Theme)**: High-contrast blueprint blue/dark theme (`#081220` body, `#00f0ff` cyan accent, `#ffad00` warning orange), technical measurement lines, coordinate grids, telemetry gauges, and code-based terminal output scrolling in real-time.
5. **Hybrid SVG & Framer Motion Core**: SVG viewport combined with Framer Motion coordinates provides high-performance, pixel-perfect responsiveness across mobile and desktop devices. React Three Fiber (R3F) is leveraged for optional, localized 3D components (like a spinning 3D PCB for the Prototyping Services Platform or a 3D PTZ camera module).

---

## Proposed Folder Structure

A scalable, clean-architecture directory layout under `src/` to support TypeScript, Tailwind CSS, and the Engineering Blueprint.

```
src/
├── components/
│   └── blueprint/                    # ALL Engineering Blueprint modules
│       ├── canvas/                   # Rendering viewports (SVG / WebGL)
│       │   ├── BlueprintCanvas.tsx   # Interactive layout container (pan/zoom viewport)
│       │   ├── TechnicalGrid.tsx     # Coordinate grid lines & rulers
│       │   └── CalloutLines.tsx      # SVG-based dynamic connection lines
│       ├── core/                     # Center assembled core modules
│       │   ├── CentralCore.tsx       # Miniaturized assembled resume core
│       │   └── CoreStatusPanel.tsx   # Telemetry & system status panel
│       ├── modules/                  # Individual exploded subsystem modules
│       │   ├── ModuleWrapper.tsx     # CAD-frame wrapper (borders, title, coordinates)
│       │   ├── AboutSubsystem.tsx    # Details on bio, education, and location
│       │   ├── ExperienceTimeline.tsx# Timeline register (PulsewriteX Intern)
│       │   ├── ProjectsEngine.tsx    # Exploded project viewer (JSON-driven)
│       │   └── SkillsMatrix.tsx      # Grid of capabilities, categorised
│       ├── ui/                       # Reusable tactical blueprint UI controls
│       │   ├── TelemetryGauge.tsx    # Visual telemetry dial or bars
│       │   ├── SystemLogger.tsx      # Terminal-style event logger
│       │   └── TacticalButton.tsx    # Sci-fi themed button
│       └── BlueprintOverlay.tsx      # Entrypoint manager (mode toggles, states)
├── data/
│   └── resume.json                   # Structured source-of-truth for all resume contents
├── hooks/
│   ├── useBlueprint.ts               # Local viewport zoom/pan and explosion calculations
│   └── useTypewriter.ts              # Sci-fi text-scrolling animation hook
├── types/
│   └── blueprint.ts                  # TypeScript definitions for the blueprint schema
└── utils/
    ├── math.ts                       # Coordinate translations and offset math
    └── telemetryGenerator.ts         # Generates randomized sci-fi log inputs
```

### Folder Explanations
*   `components/blueprint/canvas/`: Manages the interactive viewport workspace. This includes rendering background grid axes, mouse coordinates, and drawing paths between elements.
*   `components/blueprint/core/`: Manages the central engine representation of the resume. When assembled, all data paths lead here.
*   `components/blueprint/modules/`: Houses each individual resume section redesigned as an engineering subsystem. Each module has defined coordinate offsets and sub-component specs.
*   `components/blueprint/ui/`: Contains atomic, reusable UI assets that maintain a cohesive CAD aesthetic (e.g., technical borders, flashing status indicators, and custom controls).
*   `data/`: Houses the unified JSON dataset, ensuring that we never hardcode information.
*   `hooks/`: Reusable react hooks for math, scrolling terminal logs, or mouse pointer telemetry tracking.
*   `types/`: Centralized interfaces for strict compilation checks.

---

## Component Inventory & Specifications

### 1. BlueprintOverlay (`src/components/blueprint/BlueprintOverlay.tsx`)
*   **Role**: The container wrapper injected into the root level of `App.jsx`. Coordinates transitions between standard portfolio view and Blueprint mode.
*   **Props**: `onClose: () => void`
*   **State**: `isExploded: boolean`, `zoom: number`, `selectedModuleId: string | null`, `systemStatus: "INIT" | "ONLINE" | "DIAGNOSTIC"`.
*   **Why it exists**: Manages the overarching view state and global control configurations.

### 2. BlueprintCanvas (`src/components/blueprint/canvas/BlueprintCanvas.tsx`)
*   **Role**: Responsive wrapper utilizing Framer Motion's `drag` behaviors to allow users to pan and zoom around the workspace.
*   **Why it exists**: Large-scale exploded views can exceed standard screen bounds. A zoomable/pannable infinite canvas is essential for the CAD/NASA-blueprint aesthetic.

### 3. TechnicalGrid (`src/components/blueprint/canvas/TechnicalGrid.tsx`)
*   **Role**: Draws background coordinate grid lines, coordinate labels (e.g., `[X: 120, Y: -240]`), dynamic scale rulers, and cursor tracking.
*   **Why it exists**: Solidifies the engineering CAD visual style.

### 4. CalloutLines (`src/components/blueprint/canvas/CalloutLines.tsx`)
*   **Role**: SVG overlay rendering path vectors between the `CentralCore` and exploded modules.
*   **Features**: Uses Framer Motion's path drawing animations (`pathLength`) to make wires "pulse" or flow when a system is active or clicked.
*   **Why it exists**: The literal connections representing the data bus/control lines of the exploded architecture.

### 5. ModuleWrapper (`src/components/blueprint/modules/ModuleWrapper.tsx`)
*   **Role**: Reusable layout container for all exploded subsystems. Includes:
    *   Technical corner brackets.
    *   Coordinate readouts based on its position in the grid.
    *   System warning/status labels (e.g., `SYS.OK`, `TEMP: 32°C`).
*   **Why it exists**: Ensures visual consistency across the subsystems (About, Experience, Projects, Skills).

### 6. ProjectsEngine (`src/components/blueprint/modules/ProjectsEngine.tsx`)
*   **Role**: The subsystem representing projects. Reads from `resume.json`. Renders projects as "micro-processors" or "expansion cards". Clicking an expansion card reveals:
    *   A technical block diagram.
    *   An interactive Gerber viewer concept or 3D mesh (via React Three Fiber).
    *   System parameters (stack tags, performance metrics).
*   **Why it exists**: Represents the core output features in a schematic, data-driven way.

---

## Reusable Blueprint UI Primitives

To prevent code duplication, we identify the following reusable components:
*   **`TechBorder`**: Renders SVG corners, alignment crosshairs, and a coordinate overlay.
*   **`TelemetryGauge`**: Small visual dials indicating mock CPU/RAM load, signal strength, or sensor telemetry.
*   **`SystemLogger`**: Small scrolling list that logs automated diagnostic messages (e.g., `[SYS] Mounting Project: Omni Room System... OK`).
*   **`TacticalButton`**: Command-line style button with sound triggers and glitch effects.

---

## Technical Specifications (JSON Schema)

The architecture is driven by a single unified `resume.json` schema:

```json
{
  "profile": {
    "name": "Prajwal A",
    "role": "AI Systems Builder & Full Stack Developer",
    "location": "Bengaluru, India",
    "metrics": [
      { "label": "Production Uptime", "value": "4+ Months" },
      { "label": "Inference Models Evaluated", "value": "5" }
    ]
  },
  "about": {
    "text": "...",
    "subsystems": [
      { "label": "Compute Hub", "title": "B.Tech ECE", "details": "Dayananda Sagar University · 2026" }
    ]
  },
  "experience": [
    {
      "id": "exp_pulsewrite",
      "company": "PulsewriteX Solutions Pvt. Ltd.",
      "role": "Full Stack Developer — Intern",
      "period": "Feb 2026 – Present",
      "points": [
        "Sole developer — designed, built, deployed, and maintain a live production platform end-to-end",
        "Built custom Gerber file viewer rendering PCB designs with 0.1mm dimension accuracy"
      ],
      "stack": ["React", "TypeScript", "Node.js", "MySQL", "Razorpay"]
    }
  ],
  "projects": [
    {
      "id": "proj_omni",
      "title": "Omni Room Management System",
      "category": "AI / Hardware / LLM",
      "description": "AI-powered smart classroom platform with custom PTZ hardware.",
      "stack": ["Python", "React", "Node.js", "OpenCV", "Ollama", "RPi 4"],
      "schematicUrl": "/assets/schematics/omni_ptz.svg"
    }
  ],
  "skills": [
    {
      "category": "AI / ML Core",
      "items": ["Python", "Machine Learning", "Deep Learning", "Computer Vision"]
    }
  ]
}
```

---

## Phased Implementation Roadmap

We propose an iterative, low-risk sequence of implementation:

### Phase 1: Environment & Setup
*   Install TypeScript and configure compiler settings (`tsconfig.json`).
*   Verify existing portfolio compiles successfully in standard JS/TS mixed mode.
*   Install core libraries: `framer-motion`, `@types/react`, and configure Tailwind CSS integration alongside existing portfolio CSS.
*   Migrate existing static data array in `App.jsx` into the consolidated JSON schema (`src/data/resume.json`).

### Phase 2: Blueprint Core Layout & Canvas
*   Build the `BlueprintOverlay` entrypoint and the tactical toggle button.
*   Implement `BlueprintCanvas` with pan, drag, and zoom capabilities.
*   Develop `TechnicalGrid` for CAD coordinates and background alignments.
*   Design the central `CentralCore` component representing the unified resume.

### Phase 3: Exploded Modules & Callout System
*   Build the reusable `ModuleWrapper` framework with technical SVG borders.
*   Implement the individual subsystems: `AboutSubsystem`, `ExperienceTimeline`, `SkillsMatrix`.
*   Develop the coordinate translation math to position modules outwards in a radial layout.
*   Integrate `CalloutLines` to dynamic-draw and animate wires connecting the modules to the center core.

### Phase 4: Dynamic Interactive Engine & Visuals
*   Build `ProjectsEngine` loading dynamically from JSON, allowing navigation between projects.
*   Implement decorative sci-fi UI elements: `TelemetryGauge`, `SystemLogger`.
*   Add hover state transitions, callout pulsing effects, and sound triggers (optional).
*   Add a subtle 3D rotating canvas overlay (R3F) for specific complex schematics (e.g., PTZ assembly mockup or PCB preview).

### Phase 5: Verification & Accessibility
*   Audit performance on desktop and mobile viewports. Implement a flat 2D layout fallback for mobile devices (removing heavy canvas-drag and 3D overlays if performance demands it).
*   Add accessibility tags (`aria-label`, focus loops for panels).
*   Execute build pipelines and verify 100% compatibility with the production target.
