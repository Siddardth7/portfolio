// case-studies.jsx - full-page detail view for Lab projects, Code tools, and Experience
// Triggered via window.openDetail(id); renders as a full-screen page overlay with scroll

const useState = React.useState;
const useEffect = React.useEffect;

// ─── Global callback bridge ───────────────────────────────
let _detailCb = null;
window.registerDetailCallback = (fn) => { _detailCb = fn; };
window.openDetail = (id) => _detailCb && _detailCb(id);

// ─── Detail page content database ────────────────────────
const DETAIL_PAGES = {

  // ── LAB PROJECTS ──────────────────────────────────────

  'lab-sampe': {
    type: 'lab',
    tag: 'Competition',
    title: 'SAMPE Fuselage Competition',
    meta: 'Manufacturing: plan, PFMEA and hands-on build · University of Illinois Urbana-Champaign · Jan–May 2025',
    highlight: '~2,590 lbf peak vs a 1,000 lbf requirement · 0.575 in deflection at the required load · fiberglass sandwich, autoclave cured',
    accent: 'green',
    metrics: [
      { val: '~2,590 lbf', lbl: 'Peak Load' },
      { val: '0.575 in', lbl: 'Deflection @ 1,000 lbf' },
      { val: '28 inHg', lbl: 'Vacuum Hold Check' },
      { val: 'RPN 60', lbl: 'Top PFMEA Risk' },
    ],
    heroImage: { src: 'images/sampe/testing-mts.jpg', caption: 'Team with the finished fuselage at the MTS testing machine' },
    images: [],
    sections: [
      {
        title: 'What Was Built',
        body: "A 24-inch, 6-inch-diameter fuselage section for the SAMPE student competition: woven 7781 E-glass/epoxy prepreg skins over a Nomex honeycomb core (the rules allowed fiberglass only), with four door cut-outs. It had to carry 1,000 lbf in three-point bending with less than 1 inch of deflection. We were a four-person team, two on design and analysis and two on manufacturing. I wrote the manufacturing plan and the process FMEA, did most of the hands-on build, and helped with the layup code.",
        image: { src: 'images/sampe/cad-model-old.png', caption: 'CAD model - SolidWorks' },
      },
      {
        title: 'Planning the Risk First',
        body: "The professor required a full manufacturing plan before materials were ordered, so the plan and a process FMEA came first. Each failure mode was scored 1 to 5 for Severity, Occurrence and Detection. Vacuum-bag leaks scored highest (RPN 60), ahead of uneven pressure, environmental effects, ply staggering and resin pooling. The control that followed: before every cure, pull the bag to about 28 inHg, isolate it, hold 15 minutes, and accept a loss of 1 inHg or less.",
      },
      {
        title: 'How It Was Built',
        steps: [
          '01 - Cut prepreg plies, peel ply, release film, breather and bag film; cut the Nomex core',
          '02 - Layup on an aluminum mandrel, debulking under light vacuum every 4 to 6 plies',
          '03 - Bonded the core with film adhesive, then laid the outer skin',
          '04 - Vacuum bagged, then the 15-minute hold check (28 inHg, 1 inHg maximum loss) before cure',
          '05 - Autoclave cure at 275°F for 90 minutes, about 40 psi',
          '06 - Trimmed to length and cut the four door openings',
          '07 - Three-point bending test on an MTS frame',
        ],
        gallery: [
          { src: 'images/sampe/nomex-core.jpg', caption: 'Nomex honeycomb core wrapped on the aluminum mandrel' },
          { src: 'images/sampe/prepreg-layup.jpg', caption: 'Plies stacked into one blanket to close the wrap gap' },
          { src: 'images/sampe/autoclave.jpg', caption: 'Vacuum-bagged part loaded into the autoclave for cure' },
        ],
      },
      {
        title: 'What Went Wrong, and What We Did',
        body: "The first bag failed the hold check: the edges, especially the corners where the tape overlaps, were not sealed properly. After learning a corner-sealing technique and switching tape, it took four or five attempts to pass. During layup, the plies had been cut for the bare mandrel, but the release film and breather raised the diameter, so by the fourth or fifth ply the wrap would not close. With no prepreg left to recut, the team stacked the remaining plies into one blanket and wrapped it in a single pass. That closed the gap but increased wrinkling; next time, size the plies using the real consumable thickness. The autoclave also reached only about 40 psi against the material's 60 to 85 psi recommendation, so this was reviewed with the lab manager, recorded, and the cure went ahead.",
      },
      {
        title: 'Testing & Results',
        body: "Three-point bending on an MTS frame: 1,006 lbf at 0.575 in deflection, inside the 1-inch limit. We then loaded past the limit on purpose to see how it failed: cracking started around 1.2 in, the peak load was about 2,590 lbf (about 2.6 times the requirement), and we stopped at 1.5 in. Void content was not measured (no microscopy time was available), so the effect of the lower cure pressure is unknown.",
        gallery: [
          { src: 'images/sampe/finished-cylinder.jpg', caption: 'Finished composite cylinder - post-cure' },
          { src: 'images/sampe/utm-test.png', caption: 'MTS machine readout during structural testing' },
        ],
      },
    ],
    skills: ['Prepreg Layup', 'Vacuum Bagging', 'Vacuum Hold / Leak Check', 'Autoclave Cure', 'Process FMEA', 'Manufacturing Planning', 'Three-Point Bend Testing', 'Classical Lamination Theory'],
  },

  'lab-esvc': {
    type: 'lab',
    tag: 'Competition',
    title: 'Electric Solar Vehicle Championship',
    meta: 'Brakes & Suspension Lead, Manufacturing · Team Solarians, VNR VJIET · 2019–2023',
    highlight: '7th place nationally (608.8 pts) · dual-circuit hydraulic disc brakes · double-wishbone suspension',
    accent: 'green',
    metrics: [
      { val: '7th', lbl: 'National Rank' },
      { val: '608.8', lbl: 'Points' },
      { val: '2', lbl: 'Brake Circuits' },
      { val: '7 m', lbl: 'Brake-Test Stop Limit' },
    ],
    heroImage: { src: 'images/esvc/vehicle-competition.jpg', caption: "Team Solarians' solar electric vehicle at ESVC" },
    images: [],
    sections: [
      {
        title: 'What Was Built',
        body: "Team Solarians is VNR VJIET's team for the Electric Solar Vehicle Championship (ISIE India), building a single-seat, four-wheel solar electric car on a 4130 chromoly frame. The whole team was about 30 students. I joined in my first year on the brakes side, doing CATIA design work, and later became the brakes and suspension lead in the manufacturing team: coordinating that work on the car and checking it still met the current rulebook. The team placed 7th nationally.",
      },
      {
        title: 'Brake System',
        body: "The rulebook requires hydraulic brakes on all four wheels with two independent circuits, a pedal that survives 2,000 N, and a qualifying brake test: from a 50 m run, all four wheels must lock and the car must stop within 7 m. The car used two master cylinders on a balance bar, Royal Enfield calipers, Apache RTR 160 discs and DOT 4 fluid, with an over-travel switch on the pedal.",
      },
      {
        title: 'Suspension',
        body: "Double-wishbone suspension with eight A-arms made in-house from seamless 4130 tube (seamless tube is a rulebook requirement), coil-over shocks, and vendor-machined hubs and knuckles. The rules call for at least 4 inches of wheel travel and visible thread engagement on every rod end.",
      },
      {
        title: 'Getting Through Inspection',
        steps: [
          '01 - The team built a full-scale PVC pipe mockup to check driver ergonomics before metal fabrication',
          '02 - Seating position, pedal reach, steering and sightlines adjusted with the driver',
          '03 - Brakes bled and checked; suspension aligned before events',
          '04 - Technical inspection (scrutineering) against the rulebook, then the brake test',
        ],
        image: { src: 'images/esvc/pvc-prototype.jpg', caption: 'PVC pipe mockup for driver ergonomics' },
      },
      {
        title: 'Key Lesson',
        body: "A design that looks right in CATIA still has to pass scrutineering and the brake test before the car can run. Working to a rulebook taught me to treat every requirement as a check someone will actually perform.",
      },
    ],
    skills: ['Hydraulic Brake Systems', 'Double-Wishbone Suspension', 'CATIA V5', 'Rulebook Compliance', 'Brake Bleeding & Checks', 'Vehicle Integration', 'Manufacturing Coordination'],
  },

  'lab-borosilicate': {
    type: 'lab',
    tag: 'Academic',
    title: 'Borosilicate Glass-Ceramic Composites',
    meta: 'Undergraduate Thesis (team) · VNR VJIET · Aug 2022–Apr 2023',
    highlight: '+27% hardness (699 HV vs a 549 HV glass baseline) across 8 powder-metallurgy compositions',
    accent: 'green',
    metrics: [
      { val: '+27%', lbl: 'Hardness Improvement' },
      { val: '699 HV', lbl: 'Peak Hardness' },
      { val: '8', lbl: 'Compositions Tested' },
      { val: '850°C', lbl: 'Sintering Temperature' },
    ],
    heroImage: { src: 'images/borosilicate/poster-presentation.jpg', caption: 'Team presenting research findings at the departmental "Show and Tell" symposium' },
    images: [],
    sections: [
      {
        title: 'What Was Built',
        body: 'A team undergraduate thesis on borosilicate glass composites with alumina and nano copper oxide, aimed at reducing vial breakage in pharmaceutical packaging. We made 8 compositions (10 to 30 wt% additions) by powder metallurgy and measured how each changed hardness.',
      },
      {
        title: 'How It Was Built',
        steps: [
          '01 - Precision weighing (±0.01g) of borosilicate glass, Al₂O₃, and n-Cu₂O powders',
          '02 - Wet grinding with 2% PVA binder in ball mill to achieve homogeneous powder mix',
          '03 - Compaction at 50 kgf to form green pellets',
          '04 - Multi-stage sintering: 300°C (20 min binder burnout) → 5°C/min ramp → 850°C (30 min isothermal)',
          '05 - Micro Vickers hardness testing (ASTM E384) on every composition',
          '06 - XRD analysis to confirm amorphous structure preservation (no cristobalite formation)',
          '07 - SEM/EDS characterization of phase distribution and bonding quality',
        ],
        image: { src: 'images/borosilicate/pellet-samples.png', caption: 'Sintered pellets: (a) Pure BS, (b) BS+Al₂O₃, (c) BS+n-Cu₂O, (d) BS+Al₂O₃+n-Cu₂O' },
      },
      {
        title: 'Critical Challenge - Cristobalite Suppression',
        body: 'The primary risk in borosilicate sintering is cristobalite phase formation - a crystalline transformation that causes catastrophic volume changes and cracking on thermal cycling. Introduced alumina as a network modifier: Al³⁺ ions diffuse into the glass matrix, increasing viscosity and suppressing nucleation sites. XRD analysis confirmed amorphous structure preservation in alumina-containing compositions.',
      },
      {
        title: 'Characterization Results',
        body: 'Best result: 10 wt% alumina reached 699 HV against the 549 HV glass baseline, a 27% gain. More alumina reduced hardness (down to 331 HV). Copper oxide raised hardness as its content increased, and the 10/10 alumina and copper oxide blend gained 9%.',
        gallery: [
          { src: 'images/borosilicate/hardness-chart.png', caption: 'Micro Vickers Hardness: (a) BS/Al₂O₃ composites (b) BS/n-Cu₂O composites' },
          { src: 'images/borosilicate/xrd-analysis.png', caption: 'XRD patterns confirming amorphous structure across compositions' },
        ],
      },
    ],
    skills: ['Powder Metallurgy', 'Sintering Optimization', 'Micro Vickers Hardness (ASTM E384)', 'XRD Analysis', 'SEM/EDS Characterization', 'Technical Writing', 'Research Presentation'],
  },

  'lab-aero': {
    type: 'lab',
    tag: 'Competition',
    title: 'SAE Aero Design Challenge',
    meta: 'CFD & Build Planning · GHOST SQUADRONS · Mar 2022 – Oct 2022',
    highlight: '85% CFD-to-theory correlation · 92" tapered wingspan · SELIG 1223 selected',
    accent: 'green',
    metrics: [
      { val: '85%', lbl: 'CFD–Theory Correlation' },
      { val: '92"', lbl: 'Tapered Wingspan' },
      { val: '2.3', lbl: 'CL Max (SELIG 1223)' },
      { val: '385k', lbl: 'Reynolds Number' },
    ],
    heroImage: { src: 'images/aero/rc-aircraft.png', caption: 'Radio-controlled cargo aircraft designed for SAE Aero Design Challenge' },
    images: [],
    sections: [
      {
        title: 'What Was Built',
        body: 'Conducted comprehensive CFD analysis and build planning for a team designing a radio-controlled cargo aircraft for SAE Aero Design Challenge. The aircraft featured a 92-inch tapered wing optimized for maximum payload capacity under strict competition weight limits. Primary responsibility: airfoil selection and aerodynamic validation from theory to CFD to physical design.',
      },
      {
        title: 'Airfoil Selection',
        body: 'Compared five high-lift airfoils (SELIG 1223, E423, RG-15, CH10, FX74) using XFLR5 at Re = 385,000 - matching the expected flight speed and wing chord. Evaluated CL, CD, and L/D across the full angle-of-attack range. Selected SELIG 1223 for its superior CL max (~2.3) and favorable stall behavior: a gradual, benign stall onset that protects against pilot-induced tip stall at low-speed landing approaches.',
      },
      {
        title: 'CFD Validation',
        steps: [
          '01 - ANSYS Fluent model: tetrahedral mesh with 2mm elements near airfoil surface',
          '02 - k-epsilon turbulence model, 250 SIMPLE iterations to convergence',
          '03 - Cruise results: Lift = 66.7 N, Drag = 5.4 N; CL = 1.4, CD = 0.1004',
          '04 - Maximum Lift = 168.56 N at stall angle',
          '05 - 85% correlation with Prandtl lifting-line theory predictions across the AoA sweep',
        ],
      },
      {
        title: 'Manufacturing Plan',
        body: 'Developed complete balsa wood construction workflow: wing rib CNC cutting, main spar placement and bonding, leading/trailing edge assembly, servo bay integration, and MonoKote heat-shrink covering. Center-of-gravity analysis validated balance across three payload configurations (25%, 50%, 75% max payload).',
      },
      {
        title: 'Outcome & Lessons',
        body: 'Budget constraints (>$1,500 needed for materials and components) forced a pivot to the ESVC competition which had secured full sponsorship. This was a formative lesson in resource-securing and stakeholder alignment before deep technical investment. The CFD methodology, ANSYS Fluent skills, and manufacturing planning approach developed here transferred directly into graduate-level composites research at UIUC.',
      },
    ],
    skills: ['ANSYS Fluent', 'XFLR5', 'CFD Meshing', 'k-epsilon Turbulence Modeling', 'Airfoil Selection', 'Prandtl Lifting-Line Theory', 'Balsa Wood Construction', 'CG Analysis', 'Technical Documentation'],
  },

  // ── SOFTWARE TOOLS ────────────────────────────────────

  'code-platform': {
    type: 'code',
    tag: 'Python · MCP · Streamlit',
    title: 'Quality Platform',
    meta: 'AIAG core tools in one monorepo · FMEA, SPC, Control Plan, MSA · 2026',
    highlight: 'FMEA, SPC, Control Plan and MSA engines on one shared, tested core, usable in a browser or by an AI agent, and run end to end on real semiconductor data (SECOM)',
    accent: 'amber',
    metrics: [
      { val: '2,502', lbl: 'Tests Passing' },
      { val: '49', lbl: 'MCP Tools' },
      { val: '4', lbl: 'Core Tools' },
      { val: 'SECOM', lbl: 'Real Fab Data' },
    ],
    images: [],
    links: {
      demo: 'https://quality-platform-nplyhc6rvsd3bfw6q9vvkd.streamlit.app/',
      github: 'https://github.com/Siddardth7/quality-platform',
    },
    heroImage: { src: 'images/platform/platform-home.png', caption: 'One shell, every tool: FMEA, SPC, Control Plan and MSA under one URL' },
    sections: [
      {
        title: 'The Problem It Solves',
        body: "In most quality departments the AIAG core tools live in separate spreadsheets and one-off apps. A failure mode found in the FMEA never becomes a control on the Control Plan, and an out-of-control point on an SPC chart never makes it back to the FMEA's risk rating. The method describes a closed loop; the tooling almost never builds one. This platform builds it.",
      },
      {
        title: 'The Loop',
        steps: [
          '01 - FMEA scores each failure mode with RPN and AIAG-VDA Action Priority',
          '02 - High-priority failure modes become Control Plan rows: characteristic, spec, method, sample plan, recommended chart',
          '03 - The Control Plan configures the SPC chart',
          '04 - SPC evidence proposes an updated Occurrence rating for a person to review; it never overwrites one',
          '05 - MSA / Gage R&R checks the gauge before the chart is trusted',
        ],
        gallery: [
          { src: 'images/platform/fmea-risk-dashboard.png', caption: 'FMEA Risk Analyzer: Action Priority and risk tiers' },
          { src: 'images/platform/spc-control-chart.png', caption: 'SPC: Xbar-R chart with Western Electric rule overlays' },
        ],
      },
      {
        title: 'Real Semiconductor Data',
        body: "The SECOM case study runs the platform on real semiconductor process sensor data: control charts, yield and DPPM, and a Pareto of failing signals. It deliberately refuses Cp/Cpk (the dataset has no tolerances) and Gage R&R (it has no part, appraiser or trial structure) rather than inventing them.",
        image: { src: 'images/platform/capability-gauge.png', caption: 'Capability with a stability gate: no Cpk claim on an out-of-control process' },
      },
      {
        title: 'Built Like Production Software',
        body: "A uv workspace monorepo with one typed shared core (quality_core) used by every app and by the MCP server, so the UI and the agent tools cannot drift apart. Strict typing, lint and 100% coverage gates on the shared core run in CI on every push. The earlier FMEA Risk Analyzer and SPC Dashboard were merged in with their full commit history. Every AIAG constant is cited in an assumptions log.",
      },
      {
        title: 'What It Is Not',
        body: "On-demand analysis over files you supply. It is not real-time monitoring, not a data historian or EQMS, and not a replacement for engineering judgment: the tools compute, cite and refuse; the engineer decides. " + "Built with AI coding assistance (Claude Code). I set the scope, chose the methods and standards, checked the outputs and wrote the conclusions.",
      },
    ],
    skills: ['FMEA (AIAG-VDA)', 'SPC (AIAG 4th Ed.)', 'Control Plans', 'MSA / Gage R&R', 'Python', 'MCP Server', 'Streamlit', 'pytest / CI'],
  },

  'code-qes': {
    type: 'code',
    tag: 'Python · MCP · Agent Skills',
    title: 'Quality Engineering Skills',
    meta: 'AI agent skills backed by tested calculation engines · sister project to Quality Platform · 2026',
    highlight: 'The AI reasons about the method; a tested Python engine does the math, so Cp/Cpk, Gage R&R and Action Priority are never guessed',
    accent: 'amber',
    metrics: [
      { val: '9', lbl: 'Quality Domains' },
      { val: '100%', lbl: 'Branch Coverage (Core)' },
      { val: '11', lbl: 'Milestones Built' },
      { val: 'Local', lbl: 'No Cloud Backend' },
    ],
    images: [],
    links: {
      github: 'https://github.com/Siddardth7/quality-engineering-skills',
    },
    sections: [
      {
        title: 'The Problem It Solves',
        body: "AI assistants explain quality methods well, but asked to compute in their head they get the arithmetic wrong: control limits, Cp/Cpk, Action Priority. This project splits the work so the model never does the math.",
      },
      {
        title: 'How It Works',
        steps: [
          '01 - Agent Skills (markdown) guide the reasoning: structuring an FMEA, a reversible 5-Why chain, a nonconformance write-up',
          '02 - Deterministic engines in quality-core do every calculation',
          '03 - An MCP server exposes those engines to Claude Code, Cursor and Codex as tools the agent calls',
          '04 - A minimal local canvas renders the charts and grids; it works on local CSV, Excel and JSON files',
        ],
      },
      {
        title: 'What It Covers',
        steps: [
          'FMEA and Action Priority · SPC · MSA / Gage R&R · Control Plan (engines reused from Quality Platform)',
          'Root-cause suite: 5-Why, fishbone, Is/Is-Not',
          'Nonconformance (NCR) and cost of poor quality',
          'PPAP: the 18-element base standard',
          'Supplier corrective action (SCAR) and vendor rating',
          '8D problem-solving as a state machine',
        ],
      },
      {
        title: 'Standards & Testing',
        body: "Every AIAG, ISO and VDA constant is cited in that domain's assumptions log. Strict typing, lint, a dependency audit and 100% line-and-branch coverage gates run in CI, and the core may not depend on any UI code. " + "Built with AI coding assistance (Claude Code). I set the scope, chose the methods and standards, checked the outputs and wrote the conclusions.",
      },
    ],
    skills: ['FMEA', 'SPC', 'MSA', 'Control Plan', '8D / RCA', 'PPAP', 'Python', 'MCP', 'Agent Skills'],
  },

  'code-sentinel': {
    type: 'code',
    tag: 'Case Study · Python',
    title: 'Sentinel-8D: Root-Cause Traceback',
    meta: 'Statistical root cause and an AIAG 8D on public manufacturing data (CiP-DMD, TU Darmstadt) · Aug 2026',
    highlight: 'Traced 52 assembly rework failures across 802 cylinders back to an upstream station: lighter saw blanks, still in spec, were about twice as likely to need rework',
    accent: 'amber',
    metrics: [
      { val: '802', lbl: 'Parts Traced' },
      { val: '6.48%', lbl: 'Rework Rate' },
      { val: 'OR 0.50', lbl: 'Per 1 SD Heavier' },
      { val: '3 of 3', lbl: 'Models Agree' },
    ],
    images: [],
    links: {
      github: 'https://github.com/Siddardth7/sentinel-8d',
    },
    heroImage: { src: 'images/sentinel/weight-vs-failure.png', caption: 'Failing parts skew lighter at the saw (left); rework rate by blank-weight band (right)' },
    sections: [
      {
        title: 'The Question',
        body: "A defect found at final assembly is rarely created at the last step. The dataset follows small pneumatic cylinders through a saw, a CNC mill and a CNC lathe to assembly, and every part is traceable. 52 of 802 needed rework. Which upstream station and measurement drives that?",
      },
      {
        title: 'What I Did',
        steps: [
          "01 - Joined every station's data into one row per assembled part using the traceability IDs",
          '02 - Screened every measurement with Welch t-tests and chi-square, corrected for multiple testing (Benjamini-Hochberg)',
          '03 - Checked the shortlist for overlap (VIF 1.02 to 1.09), then fitted a multivariate logistic regression',
          '04 - Cross-checked with random forest and gradient boosting: all three ranked saw blank weight first',
          '05 - Wrote it up as an AIAG 8D, with an I-MR chart on blank weight as the proposed control at the source',
        ],
      },
      {
        title: 'The Finding',
        body: "Each standard deviation lighter (about 24.5 g) roughly doubles the odds of rework (odds ratio 0.503 per SD heavier, 95% CI 0.371 to 0.683). Blanks under 0.540 kg needed rework 15.6% of the time, against 4.9% above it. Every blank was still inside the saw spec, which suggests the spec is wider than the next step can tolerate.",
        image: { src: 'images/sentinel/imr-chart.png', caption: 'Blank weight in production order: the failures cluster in a few windows' },
      },
      {
        title: 'What the Data Does Not Prove',
        body: "This is an association, not a proven cause. The failures cluster in a few production windows, so batch, material or setup could be the real driver, and the parts the researchers deliberately sawed misaligned did not fail. The 8D's team, sign-offs and verification are illustrative, and the '36.5% of rework prevented' figure is a projection. On a real line the next step is a controlled trial before adding the check.",
      },
      {
        title: 'How It Was Built',
        body: "Python (pandas, SciPy, statsmodels, scikit-learn), Jupyter and Git, on a public CC-BY-4.0 dataset. " + "Built with AI coding assistance (Claude Code). I set the scope, chose the methods and standards, checked the outputs and wrote the conclusions.",
      },
    ],
    skills: ['Root Cause Analysis', 'AIAG 8D', 'Logistic Regression', 'Welch t-test / FDR', 'Random Forest', 'I-MR SPC', 'pandas / statsmodels', 'Traceability'],
  },

  'code-nexus': {
    type: 'code',
    tag: 'Case Study · Python',
    title: 'Nexus-FMEA: Data-Driven PFMEA',
    meta: 'AIAG-VDA PFMEA and Control Plan on the same 802-part dataset · Aug 2026',
    highlight: 'Occurrence ratings set from measured defect rates instead of meeting guesses, and a script that proves every high risk has a control',
    accent: 'amber',
    metrics: [
      { val: '9', lbl: 'Characteristics' },
      { val: '5', lbl: 'High-Priority Risks' },
      { val: '0', lbl: 'Orphan Risks' },
      { val: '95%', lbl: 'Wilson CIs' },
    ],
    images: [],
    links: {
      github: 'https://github.com/Siddardth7/nexus-fmea',
    },
    heroImage: { src: 'images/nexus/defect-rates.png', caption: 'Defect rate per characteristic with 95% Wilson confidence intervals' },
    sections: [
      {
        title: 'The Problem',
        body: "Two things go wrong with PFMEAs in practice: Occurrence is guessed in a meeting, and the Control Plan drifts away from the FMEA, so a high risk ends up with no control on the floor.",
      },
      {
        title: 'What I Did',
        steps: [
          '01 - Computed the defect rate for 9 characteristics across 4 operations (saw, mill, lathe, assembly), with 95% Wilson confidence intervals',
          '02 - Mapped each rate to an AIAG-VDA Occurrence rating using a documented band table',
          '03 - Built the PFMEA: failure modes, effects, causes, Severity, Detection, Action Priority, special characteristics',
          '04 - Built the matching Control Plan: gauge, sample size and frequency, control method, reaction plan',
          '05 - Wrote check_linkage.py: joins both Excel files on step and characteristic and fails on any orphan risk, orphan control or dropped special characteristic',
        ],
        gallery: [
          { src: 'images/nexus/process-flow.png', caption: 'Process flow: saw → mill, lathe → assembly' },
        ],
      },
      {
        title: 'Results',
        body: "5 High, 1 Medium and 3 Low Action Priority. The top risks were surface roughness at the mill (22.3% out of spec, High) and rod coaxiality at the lathe (12.9%, High, a critical characteristic). The linkage check found 0 orphan risks, 0 orphan controls and 0 special-characteristic mismatches.",
      },
      {
        title: 'Limits',
        body: "Only Occurrence is data-driven; Severity and Detection are my judgment. The Control Plan's gauges, sample plans and some spec values are illustrative. Occurrence used the point estimate, where the conservative choice is the upper confidence bound. And full coverage proves every risk has a control on paper, not that the control works.",
      },
      {
        title: 'How It Was Built',
        body: "Python (pandas, statsmodels, openpyxl), Jupyter and Git. " + "Built with AI coding assistance (Claude Code). I set the scope, chose the methods and standards, checked the outputs and wrote the conclusions.",
      },
    ],
    skills: ['PFMEA (AIAG-VDA)', 'Action Priority', 'Control Plan', 'Special Characteristics', 'Wilson Intervals', 'Python / openpyxl', 'Audit Readiness'],
  },

  // ── EXPERIENCE ROLES ──────────────────────────────────

  'exp-tata': {
    type: 'experience',
    tag: 'Industry',
    title: 'Quality Assurance & MRB Intern',
    meta: 'Tata Advanced Systems Limited · QA & MRB Intern · Oct 2022 - Mar 2023 · Hyderabad, India',
    highlight: '450+ CMM inspection reports reviewed for GE LEAP and Boeing parts · MRB support · root-cause team on a recurring CNC defect',
    accent: 'blue',
    metrics: [
      { val: '450+', lbl: 'Reports Reviewed' },
      { val: '15→3%', lbl: 'Defect Rate (one machine)' },
      { val: '2 mo', lbl: 'Quality Control' },
      { val: '4 mo', lbl: 'MRB' },
    ],
    images: [],
    sections: [
      {
        title: 'Role Progression',
        steps: [
          'QC (about 2 months): after 1 to 2 weeks learning drawings and GD&T, reviewed about 450 routine CMM inspection reports against the drawings, checking that every characteristic was reported and in tolerance, including form and orientation callouts such as flatness and perpendicularity. For out-of-tolerance parts, the QC coordinator and I wrote the NCR and sent it to MRB.',
          'MRB (about 4 months): assisted the MRB coordinator with meeting notes, signatures, tags and NCR paperwork; cleared a backlog of 8D and CAPA documentation; helped prepare NCR records for an audit.',
        ],
      },
      {
        title: 'Root Cause Analysis',
        body: "One CNC machine kept producing about 15% dimensional failures that had been closed again and again as operator error. I worked through the NCRs, inspection records and the machine's system-generated Xbar-R charts with the process engineer. The failures crossed operators, the material and tool lots showed no link, and they clustered near the end of the scheduled tool-change interval: tool wear. I recommended a machine-specific interval, the team set it, and the defect rate fell to about 3%. I followed up on the floor to confirm the revised SOP was being used.",
      },
      {
        title: 'Documentation & Disposition',
        body: "Kept NCR, 8D and CAPA records complete through disposition and chased signatures and tags. On the small set of cases I handled, NCR-to-disposition time ran about 22% below the department average: a small sample, so an indicator rather than a result.",
      },
      {
        title: 'Working with Aerospace Standards',
        body: "The parts were for the CFM LEAP engine (GE) and Boeing programs, under AS9100 quality requirements. The lesson that stuck: a missing measurement is not a pass. If the report doesn't prove the part is good, the part doesn't move.",
      },
    ],
    skills: ['Inspection Report Review', 'GD&T (ASME Y14.5)', 'NCR / MRB', '8D & CAPA Documentation', 'Xbar-R Charts', 'Root Cause Analysis', '5 Whys / Fishbone', 'AS9100'],
  },

  'exp-beckman': {
    type: 'experience',
    tag: 'Research',
    title: 'Graduate Research Assistant',
    meta: 'Beckman Institute, UIUC · Autonomous Materials Systems Lab · Aug 2024 - Dec 2024 · Urbana, IL',
    highlight: 'Compared three computational models of a frontal-polymerization cure front in MOOSE',
    accent: 'blue',
    metrics: [
      { val: '3', lbl: 'Models Compared' },
      { val: 'MOOSE', lbl: 'FE Framework' },
      { val: 'Level-set', lbl: 'Front Tracking' },
      { val: 'Coarser', lbl: 'Mesh, Same Front' },
    ],
    images: [],
    sections: [
      {
        title: 'Research Focus',
        body: "Frontal polymerization is a self-propagating reaction front that can cure a thermoset in minutes instead of hours in an oven or autoclave. My work at the Autonomous Materials Systems (AMS) Lab was computational: modelling how that cure front moves.",
      },
      {
        title: 'Computational Modeling',
        steps: [
          '01 - Built and compared three models of the moving cure front in the MOOSE finite-element framework',
          '02 - The level-set model tracked the front on coarser meshes, avoiding multi-day simulation runs',
        ],
      },
    ],
    skills: ['Frontal Polymerization', 'MOOSE Framework', 'Level-Set Methods', 'Finite Element Modeling', 'Python', 'Scientific Writing'],
  },

  'exp-eqic': {
    type: 'experience',
    tag: 'Industry',
    title: 'Manufacturing Intern',
    meta: 'EQIC Dies & Moulds Engineers Pvt. Ltd. · Dies & Moulds Division · Jun–Aug 2022 · Hyderabad, India',
    highlight: 'Documented a 12-stage HPDC die workflow from customer drawing to trial-0 · learned from the shop\'s BOMs, CMM reports and 3D scan data',
    accent: 'blue',
    metrics: [
      { val: '12-stage', lbl: 'Die Workflow' },
      { val: 'HPDC', lbl: 'Process' },
      { val: '100–1,200 t', lbl: 'Press Range' },
      { val: '100k', lbl: 'Shot Warranty' },
    ],
    images: [],
    sections: [
      {
        title: 'Company & Context',
        body: "EQIC (est. 1988) designs and builds high-pressure die-casting (HPDC) dies, mostly for aluminum automotive and aerospace parts, for presses from 100 to 1,200 tons. Its sister company, Tyche Diecast, is IATF 16949 certified.",
      },
      {
        title: 'The Assignment',
        body: "Five of us were placed in the dies and moulds division for three months. Our project was to follow one die, work order 10521, from the customer drawing to a production-ready tool and document every stage. I spent most of my time on the floor in inspection and assembly, plus time in design, where the BOMs and customer drawings were prepared. The engineers gave us their real documents (BOMs, GD&T drawings, inspection and CMM reports, 3D scan data) so we could learn how each is produced and what decision it supports. It was an observation and documentation role; I did not operate the machines or instruments.",
      },
      {
        title: '12-Stage Workflow Documented',
        steps: [
          '01 - Design review of the customer drawing',
          '02 - Bill of materials',
          '03 - Block-up (rough) milling',
          '04 - Drilling, boring and tapping',
          '05 - CNC machining',
          '06 - Vacuum hardening and tempering',
          '07 - Grinding, to bring heat-treated parts back to size and flatness',
          '08 - Sinker and wire EDM',
          '09 - Inspection, with a rework loop',
          '10 - Assembly: plates, cooling manifold, hydraulic cylinders',
          '11 - Blue matching on a hydraulic press to check the two halves seal',
          '12 - Trial-0: first shots cast and 3D-scanned against CAD',
        ],
      },
      {
        title: 'Key Takeaway',
        body: "A die isn't released because it's built. It's released because it passes qualification: blue matching, a trial, then a scan against CAD. A defect in the tool is copied into every part it makes, which is why the inspection gates sit before release.",
      },
    ],
    skills: ['HPDC Process', 'Process Mapping', 'Reading GD&T Drawings', 'CMM Report Review', 'EDM', 'Heat Treatment', 'Die Assembly & Blue Matching'],
  },
};

// ─── Full-Page Detail Component ────────────────────────────
function DetailModal({ id, onClose }) {
  const page = DETAIL_PAGES[id];

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!page) return null;

  return (
    <div className="dp-page" role="dialog" aria-modal="true" aria-label={page.title}>

      {/* Sticky top nav */}
      <div className="dp-nav">
        <button className="dp-nav__back" onClick={onClose} aria-label="Back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <span className="mono dp-nav__id">{page.type === 'lab' ? 'LAB PROJECT' : page.type === 'code' ? 'SOFTWARE TOOL' : 'EXPERIENCE'}</span>
        <button className="dp-nav__close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="dp-scroll">
        <div className="dp-container">

          {/* Header */}
          <div className="dp-header">
            <div className="dp-header__meta">
              <span className={`chip chip--${page.tag.split('·')[0].trim().toLowerCase().replace(/\s+/g,'-')}`}>{page.tag}</span>
              {'links' in page && (
                <div className="dp-header__links">
                  {page.links.demo && (
                    <a href={page.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn--amber btn--sm">
                      <span className="btn__pulse" aria-hidden="true"></span>
                      Live Demo
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M4 7l3-3M7 4H4.5M7 4v2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>
                    </a>
                  )}
                  {page.links.github && (
                    <a href={page.links.github} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 0a6 6 0 0 0-1.9 11.7c.3.05.4-.13.4-.29v-1c-1.66.36-2-.8-2-.8-.27-.69-.66-.87-.66-.87-.55-.37.04-.36.04-.36.6.04.92.62.92.62.54.92 1.4.65 1.74.5.05-.39.21-.65.38-.8-1.32-.15-2.71-.66-2.71-2.94 0-.65.23-1.18.62-1.6-.06-.15-.27-.76.06-1.59 0 0 .5-.16 1.65.61a5.7 5.7 0 0 1 3 0c1.14-.77 1.65-.61 1.65-.61.33.83.12 1.44.06 1.59.38.42.62.95.62 1.6 0 2.29-1.4 2.79-2.72 2.94.21.18.4.54.4 1.09v1.62c0 .16.1.34.4.28A6 6 0 0 0 6 0Z"/></svg>
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
            <h1 className="dp-header__title">{page.title}</h1>
            <p className="dp-header__meta-txt mono">{page.meta}</p>
            <p className={`dp-header__highlight dp-header__highlight--${page.accent}`}>→ {page.highlight}</p>
          </div>

          {/* Metrics bar */}
          <div className={`dp-metrics dp-metrics--${page.accent}`}>
            {page.metrics.map((m, i) => (
              <div key={i} className="dp-metric">
                <span className="dp-metric__val">{m.val}</span>
                <span className="mono dp-metric__lbl">{m.lbl}</span>
              </div>
            ))}
          </div>

          {/* Hero image - full width, no thumbnails */}
          {page.heroImage && (
            <div className="dp-gallery">
              <div className="dp-gallery__hero">
                <img
                  src={page.heroImage.src}
                  alt={page.heroImage.caption}
                  className="dp-gallery__hero-img"
                  onError={(e) => { e.target.style.display='none'; }}
                />
              </div>
              <p className="mono dp-gallery__caption">{page.heroImage.caption}</p>
            </div>
          )}

          {/* Content sections - images placed contextually within each section */}
          <div className="dp-sections">
            {page.sections.map((s, i) => (
              <div key={i} className="dp-section">
                <h3 className={`dp-section__title dp-section__title--${page.accent}`}>{s.title}</h3>

                {/* If section has an inline image: text left, image right */}
                {s.image ? (
                  <div className="dp-section__with-img">
                    <div className="dp-section__with-img-text">
                      {s.body && <p className="dp-section__body">{s.body}</p>}
                      {s.steps && (
                        <ul className="dp-steps">
                          {s.steps.map((step, j) => (
                            <li key={j} className={`dp-step dp-step--${page.accent}`}>{step}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <figure className="dp-section__inline-img">
                      <img src={s.image.src} alt={s.image.caption} onError={(e) => { e.target.parentElement.style.display='none'; }} />
                      <figcaption className="mono">{s.image.caption}</figcaption>
                    </figure>
                  </div>
                ) : (
                  <>
                    {s.body && <p className="dp-section__body">{s.body}</p>}
                    {s.steps && (
                      <ul className="dp-steps">
                        {s.steps.map((step, j) => (
                          <li key={j} className={`dp-step dp-step--${page.accent}`}>{step}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}

                {/* Section gallery - row of images below section content */}
                {s.gallery && s.gallery.length > 0 && (
                  <div className="dp-section__gallery">
                    {s.gallery.map((img, j) => (
                      <figure key={j} className="dp-section__gallery-item">
                        <img src={img.src} alt={img.caption} onError={(e) => { e.target.parentElement.style.display='none'; }} />
                        <figcaption className="mono">{img.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="dp-skills">
            <p className={`mono dp-skills__lbl dp-skills__lbl--${page.accent}`}>▸ SKILLS APPLIED</p>
            <div className="dp-skills__chips">
              {page.skills.map((s) => (
                <span key={s} className={`stack-chip stack-chip--${page.accent} mono`}>{s}</span>
              ))}
            </div>
          </div>

          {/* Bottom back link */}
          <div className="dp-footer">
            <button className="link link--btn dp-footer__back" onClick={onClose}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Portfolio
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DetailModal });
