// case-studies.jsx — detail modal for Lab projects, Code tools, and Experience roles
// Opens as a slide-over panel from the right; triggered via window.openDetail(id)

const useState = React.useState;
const useEffect = React.useEffect;
const useRef = React.useRef;

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
    meta: 'Manufacturing Lead · UIUC · Jan–May 2025',
    accent: 'green',
    metrics: [
      { val: '2,700 lbf', lbl: 'Structural Load' },
      { val: '38%', lbl: 'Deflection ↓' },
      { val: '0', lbl: 'Failures' },
      { val: '20 psi', lbl: 'Pressure Hold' },
    ],
    images: [
      { src: 'images/sampe/cad-model.png', caption: 'SolidWorks CAD model — fuselage cylinder' },
      { src: 'images/sampe/fabrication-1.jpg', caption: 'Prepreg layup on aluminum mandrel' },
      { src: 'images/sampe/fabrication-2.jpg', caption: 'Vacuum bag setup before autoclave' },
      { src: 'images/sampe/fabrication-3.jpg', caption: 'Final fuselage section post-cure' },
      { src: 'images/sampe/testing.jpg', caption: 'Pressurized hold test at 20 psi' },
    ],
    sections: [
      {
        title: 'What Was Built',
        body: 'Manufactured a CFRP composite fuselage cylinder (24"×6" OD) capable of withstanding 2,700 lbf in three-point bending using vacuum bagging and autoclave cure. Stacking sequence was optimized via Python simulated annealing and validated in ABAQUS FEA — achieving 38% deflection reduction versus the baseline [0/90]s schedule. Final build achieved first-article structural acceptance on the first attempt.',
      },
      {
        title: 'The Challenge',
        body: 'Meet aerospace-grade quality with university lab constraints, prepreg-only materials, four structural cutouts, and no room for iteration — all in one semester. The 8D risk register identified vacuum bag leak (RPN 60) as the highest-priority failure mode. The pressurized hold test at 20 psi (24-hour hold) was the acceptance gate before cure.',
      },
      {
        title: 'Process',
        steps: [
          '01 — Prepreg layup on aluminum mandrel with debulking every 4–6 plies',
          '02 — Two-stage autoclave cure (275°F, 40 psi, 90 min dwell)',
          '03 — Pressurized hold test at 20 psi — 24-hour leak check',
          '04 — Waterjet cutouts and surface finishing',
          '05 — Three-point bending test on MTS machine',
        ],
      },
      {
        title: 'The Crisis & Solution',
        body: 'At ply 10 of 14, discovered a 3-inch gap — the composite wouldn\'t close. All plies had been cut to identical length, but we had failed to account for increasing circumference as wall thickness built up. The all-nighter redesign: abandoned 14 individual wraps → created one continuous prepreg blanket with progressive ply lengths → single-roll application onto mandrel. This eliminated delamination risk, maintained fiber continuity, and achieved perfect fit on the first re-attempt. The dual-blanket concept (7 inner + 7 outer plies) became the team\'s signature manufacturing innovation.',
      },
    ],
    skills: ['Prepreg Layup', 'Vacuum Bagging', 'Autoclave Operation', 'pFMEA', 'ABAQUS FEA', 'CLT', 'Python Simulated Annealing', 'ASME GD&T', 'Process Documentation'],
  },

  'lab-esvc': {
    type: 'lab',
    tag: 'Competition',
    title: 'Electric Solar Vehicle Championship',
    meta: 'Manufacturing Lead & Brake/Suspension Specialist · Team Solarians · 2019–2023',
    accent: 'green',
    metrics: [
      { val: '7th', lbl: 'Nationally' },
      { val: '180.43', lbl: '/ 200 Cross Pad' },
      { val: '0', lbl: 'Mechanical Failures' },
      { val: '30', lbl: 'Team Members' },
    ],
    images: [],
    sections: [
      {
        title: 'What Was Built',
        body: 'Led manufacturing and brake/suspension systems for a 30-member team building a solar-electric three-wheeler for the national Electric Solar Vehicle Championship. Over four years, progressed from team member to Manufacturing Lead — coordinating the complete fabrication workflow: chassis welding, hydraulic brake integration, suspension mounting, and final vehicle assembly.',
      },
      {
        title: 'Brake System',
        body: 'Adapted motorcycle disc brake components (203mm rotors, twin-piston calipers) with custom mounting brackets. Implemented 70/30 front/rear pressure distribution for optimal stopping power across all course configurations.',
      },
      {
        title: 'Suspension Engineering',
        body: '2023 rulebook changes required a full redesign of the suspension mounting brackets. Preserved 100mm wheel travel while meeting new compliance requirements — delivered the revised brackets within one week to avoid competition eligibility risk.',
      },
      {
        title: 'Prototype Method',
        body: 'Before committing to metal fabrication, built a full-scale PVC pipe mockup to validate driver ergonomics. Iteratively adjusted seating, pedal reach, steering placement, and sightlines with the actual competition driver — preventing costly rework during metal fabrication.',
      },
      {
        title: 'Key Lesson',
        body: 'Zero mechanical failures during competition was not luck — it was the result of a three-stage inspection protocol I implemented across all 30 team members\' workstations. The protocol caught three pre-competition issues (loose wheel bearing, brake bleed air pocket, wiring chafe) before they could become race-day failures.',
      },
    ],
    skills: ['Chassis Welding (TIG/MIG)', 'Hydraulic Brake Systems', 'Suspension Design', 'Team Leadership', 'Quality Control Protocol', 'Prototype Testing', 'Vehicle Dynamics'],
  },

  'lab-borosilicate': {
    type: 'lab',
    tag: 'Academic',
    title: 'Borosilicate Glass-Ceramic Composites',
    meta: 'Project Lead (Undergraduate Thesis) · VNR VJIET · Aug 2022–Apr 2023',
    accent: 'green',
    metrics: [
      { val: '+27%', lbl: 'Hardness Improvement' },
      { val: '699 HV', lbl: 'Peak Hardness' },
      { val: '24', lbl: 'Formulations Tested' },
      { val: '850°C', lbl: 'Sintering Temperature' },
    ],
    images: [],
    sections: [
      {
        title: 'What Was Built',
        body: 'Developed borosilicate-alumina-copper oxide glass-ceramic composites to address vial breakage in pharmaceutical packaging. As Project Lead, designed, fabricated, and characterized 24 composite formulations using powder metallurgy techniques — achieving up to 27% hardness improvement (548 → 699 HV) while maintaining commercial viability. The work resulted in a 52-page technical thesis and a departmental research symposium presentation.',
      },
      {
        title: 'Process',
        steps: [
          '01 — Precision weighing (±0.01g) of BS glass, Al₂O₃, n-Cu₂O powders',
          '02 — Wet grinding with 2% PVA binder in ball mill',
          '03 — Hydraulic compaction at 50 kgf',
          '04 — Multi-stage sintering: 300°C binder burnout → 5°C/min ramp → 850°C, 30 min',
          '05 — Micro Vickers Hardness (ASTM E384), XRD, and SEM/EDS characterization',
        ],
      },
      {
        title: 'Critical Challenge — Cristobalite Suppression',
        body: 'The primary risk in borosilicate sintering is cristobalite phase formation — a crystalline transformation that causes catastrophic volume changes and cracking on thermal cycling. Introduced alumina as a network modifier: Al³⁺ ions diffuse into the glass matrix, increasing viscosity and suppressing nucleation sites. XRD analysis across all 24 formulations confirmed amorphous structure preservation in the alumina-containing compositions.',
      },
      {
        title: 'Optimal Composition',
        body: 'Best-performing formulation: 90% borosilicate glass + 10% Al₂O₃ at 850°C — achieving 698.66 HV versus the 548 HV baseline. Copper oxide additions improved density but introduced crystallinity risk at higher concentrations; the alumina-only route produced more consistent results across the 24-sample matrix.',
      },
    ],
    skills: ['Powder Metallurgy', 'Sintering Optimization', 'Micro Vickers Hardness (ASTM E384)', 'XRD Analysis', 'SEM/EDS', 'Design of Experiments', 'Technical Writing', 'Research Presentation'],
  },

  'lab-aero': {
    type: 'lab',
    tag: 'Competition',
    title: 'SAE Aero Design Challenge',
    meta: 'CFD Analysis Specialist & Manufacturing Planner · Team Ethereal Predators · Aug 2021–Mar 2022',
    accent: 'green',
    metrics: [
      { val: '85%', lbl: 'CFD–Theory Correlation' },
      { val: '92"', lbl: 'Tapered Wingspan' },
      { val: '2.3', lbl: 'CL Max (SELIG 1223)' },
      { val: '385k', lbl: 'Reynolds Number' },
    ],
    images: [],
    sections: [
      {
        title: 'What Was Built',
        body: 'Conducted comprehensive CFD analysis and developed manufacturing plans for a 7-member team designing a radio-controlled cargo aircraft. The aircraft featured a 92" tapered wing optimized for maximum payload capacity under strict competition weight constraints. Primary responsibility: airfoil selection and aerodynamic validation.',
      },
      {
        title: 'Airfoil Selection Process',
        body: 'Compared five high-lift airfoils (SELIG 1223, E423, RG-15, CH10, FX74) using XFLR5 at Re = 385,000. Evaluated CL, CD, and L/D across the full angle-of-attack range. Selected SELIG 1223 for its superior CL max (~2.3) and favorable stall behavior — a gradual, benign stall onset that protects against pilot-induced tip stall at landing.',
      },
      {
        title: 'CFD Validation',
        steps: [
          '01 — ANSYS Fluent model: tetrahedral mesh, 2mm elements near airfoil surface',
          '02 — k-epsilon turbulence model, 250 SIMPLE iterations to convergence',
          '03 — Lift = 66.7 N, Drag = 5.4 N at cruise; Max Lift = 168.56 N',
          '04 — 85% correlation with Prandtl lifting-line theory predictions',
        ],
      },
      {
        title: 'Manufacturing Plan',
        body: 'Developed complete balsa wood construction workflow: wing rib CNC cutting, main spar placement and bonding, leading/trailing edge assembly, servo bay integration, and MonoKote heat-shrink covering process. CG analysis validated balance across three payload configurations.',
      },
      {
        title: 'Outcome',
        body: 'Budget constraints (>$1,500 for materials) forced a pivot to the ESVC competition which had secured sponsorship. The CFD and manufacturing methodology skills developed here were carried directly into graduate-level composites research at UIUC.',
      },
    ],
    skills: ['ANSYS Fluent', 'XFLR5', 'CFD Meshing', 'k-epsilon Turbulence Modeling', 'Airfoil Selection', 'Prandtl Lifting-Line Theory', 'Balsa Construction', 'CG Analysis'],
  },

  // ── SOFTWARE TOOLS ────────────────────────────────────

  'code-fmea': {
    type: 'code',
    tag: 'Python · Streamlit',
    title: 'FMEA Risk Analyzer',
    meta: 'Quality Engineering Tool · 78 Unit Tests · Live on Streamlit Cloud',
    accent: 'amber',
    metrics: [
      { val: '78', lbl: 'Unit Tests' },
      { val: 'AIAG', lbl: 'FMEA-4 Compliant' },
      { val: '80/20', lbl: 'Pareto Ranking' },
      { val: 'PDF+XLS', lbl: 'Export Formats' },
    ],
    images: [],
    links: {
      demo: 'https://fmea-risk-analyzer-mhwzcki9sdzfz5d8rbzsdn.streamlit.app/',
      github: 'https://github.com/Siddardth7/fmea-risk-analyzer',
    },
    sections: [
      {
        title: 'The Problem It Solves',
        body: 'Process FMEA risk analysis is mandatory in aerospace (AS9100) and automotive (IATF 16949) manufacturing. In practice, engineers manage pFMEA tables in sprawling Excel spreadsheets with no automation — RPN scores are calculated manually, Pareto ranking is done by hand, and AIAG criticality flags are missed. This tool replaces that workflow with a live, interactive application.',
      },
      {
        title: 'How It Works',
        steps: [
          '01 — Upload pFMEA CSV/Excel or click "Use Demo Dataset" (30-row composite panel FMEA)',
          '02 — Engine computes RPN = Severity × Occurrence × Detection for all failure modes',
          '03 — AIAG FMEA-4 flags applied: Severity ≥ 9 auto-flags regardless of RPN',
          '04 — Interactive Pareto chart identifies the 20% of modes causing 80% of risk',
          '05 — Heatmap visualization maps severity vs detection across the full risk matrix',
          '06 — Export publication-ready PDF report or ranked Excel file',
        ],
      },
      {
        title: 'Stack',
        body: 'Python 3.10+ · Streamlit 1.56 · Plotly 6.6 for interactive charts · Pandas for data processing · ReportLab for PDF generation · openpyxl for Excel export · pytest for 78 unit tests with GitHub Actions CI.',
      },
      {
        title: 'Engineering Reference',
        body: 'Built against AIAG FMEA-4 (4th Edition, 2008) and the AIAG/VDA FMEA Handbook (5th Edition, 2019). Criticality flag logic, severity table, and occurrence rating definitions match the AIAG standard directly. The 30-row demo dataset is a realistic composite panel pFMEA with autoclave cure deviations, vacuum bag leaks, and ply misalignment failure modes.',
      },
    ],
    skills: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'pFMEA', 'AIAG FMEA-4', 'RPN Calculation', 'Pareto Analysis', 'PDF Generation', 'GitHub Actions CI'],
  },

  'code-spc': {
    type: 'code',
    tag: 'Python · Streamlit',
    title: 'SPC Manufacturing Dashboard',
    meta: 'Process Control Tool · 83 Unit Tests · Live on Streamlit Cloud',
    accent: 'amber',
    metrics: [
      { val: '83', lbl: 'Unit Tests' },
      { val: '5', lbl: 'Chart Types' },
      { val: 'Cp/Cpk', lbl: 'Capability Indices' },
      { val: 'Live', lbl: 'Disturbance Sim' },
    ],
    images: [],
    links: {
      demo: 'https://manufacturing-spc-dashboard-k8hyyj2fylnvjfrpcgqhyr.streamlit.app',
      github: 'https://github.com/Siddardth7/manufacturing-spc-dashboard',
    },
    sections: [
      {
        title: 'The Problem It Solves',
        body: 'SPC charts are the standard tool for separating common-cause from special-cause variation in manufacturing processes. Most production environments either track SPC in Excel (limited rule detection) or use expensive commercial MES software. This dashboard provides full-featured SPC analysis — five chart types, Western Electric and Nelson rule detection, Cp/Cpk/Pp/Ppk — in a free, open-source Python application.',
      },
      {
        title: 'Pages & Features',
        steps: [
          'Control Charts — X̄-R, X̄-S, I-MR, p, and u charts for five aerospace process streams',
          'Rule Overlay — Western Electric (8 rules) and Nelson (10 rules) violation markers',
          'Capability — Cp, Cpk, Pp, Ppk with distribution histogram and Shapiro-Wilk normality test',
          'Live Simulation — real-time subgroup generation with injected mean shift / variance increase disturbances',
          'Demo Dataset — 370-row committed CSV covering five process streams (deterministic seed=42)',
        ],
      },
      {
        title: 'Stack',
        body: 'Python 3.11+ · Streamlit 1.50+ · Plotly for interactive charts · Pandas + NumPy for SPC math · SciPy for Shapiro-Wilk normality test · pytest for 83 unit tests · GitHub Actions CI for automated testing on every push.',
      },
      {
        title: 'Why 83 Tests?',
        body: 'SPC math has well-defined correct answers — a test suite that covers every control limit formula, every rule detection case, and every capability index calculation guarantees the charts are numerically correct. Western Electric Rule 2 (2 of 3 beyond 2σ) and Nelson Rule 7 (15 in a row within 1σ) are the trickiest to get right; both have explicit test cases.',
      },
    ],
    skills: ['Python', 'Streamlit', 'Plotly', 'SPC', 'Control Charts', 'Cp/Cpk', 'Western Electric Rules', 'Nelson Rules', 'Pandas', 'NumPy', 'SciPy'],
  },

  'code-composite': {
    type: 'code',
    tag: 'Python · CLT · FEA',
    title: 'Virtual Composite Design Toolkit',
    meta: 'Composites Analysis Engine · CLT + Simulated Annealing + CalculiX FEA · Open Source',
    accent: 'amber',
    metrics: [
      { val: '<1%', lbl: 'Deflection Error vs FEA' },
      { val: '<3%', lbl: 'Stress Error (IM7/8552)' },
      { val: 'SA', lbl: 'Stacking Optimizer' },
      { val: 'ABD', lbl: 'Full Matrix Output' },
    ],
    images: [
      { src: 'images/composite/laminate-stack.png', caption: 'ABD matrix stiffness visualization by ply angle' },
      { src: 'images/composite/fea-comparison.png', caption: 'CLT vs CalculiX FEA deflection comparison' },
      { src: 'images/composite/failure-indices.png', caption: 'Tsai-Wu and Hashin failure index map' },
      { src: 'images/composite/angle-sweep.png', caption: 'Angle sweep — Ex vs θ for IM7/8552' },
    ],
    links: {
      github: 'https://github.com/Siddardth7/Virtual-Composite-Design-Optimization',
    },
    sections: [
      {
        title: 'What It Does',
        body: 'A complete engineering toolkit for analysing, validating, and optimizing composite laminate structures — built from first principles for the 2024–25 SAMPE Fuselage Competition, then extended into a fully validated open-source composites library. Computes full [A],[B],[D] stiffness matrices, recovers ply-level stresses and strains, evaluates Tsai-Wu and Hashin failure indices, predicts SSSS plate deflection via Navier series, and optimizes stacking sequences using Simulated Annealing.',
      },
      {
        title: 'Validation Results',
        steps: [
          'CLT vs CalculiX FEA deflection: <1% error on IM7/8552 SSSS plate (verified 3 configurations)',
          'CLT vs FEA max principal stress: <3% error at plate centre and edges',
          'SA optimizer: [0/±45/90]s schedule found in <10 minutes — matches analytical optimum',
          'Angle sweep: Ex vs θ curves match CFRP handbook data for all standard material systems',
        ],
      },
      {
        title: 'Engineering Theory',
        body: 'Built on Classical Laminate Theory under Kirchhoff-Love plate kinematics (small deflections, perfect bonding, plane stress per ply). The ABD constitutive system relates force/moment resultants to mid-plane strains and curvatures. Failure criteria: Tsai-Wu (quadratic tensor polynomial) and Hashin 1980 (physically-motivated fiber/matrix splitting modes). Simulated Annealing drives the stacking sequence optimizer — accepts worse solutions probabilistically at high temperature to avoid local minima.',
      },
      {
        title: 'Connection to SAMPE Work',
        body: 'The Python simulated annealing optimizer in this toolkit directly generated the [0/±45/90]s stacking sequence used in the SAMPE competition build — the sequence that achieved 38% deflection reduction over the baseline [0/90]s schedule. CalculiX FEA cross-validation gave confidence before committing prepreg to the autoclave.',
      },
    ],
    skills: ['Classical Lamination Theory', 'Simulated Annealing', 'CalculiX FEA', 'Python', 'NumPy', 'Tsai-Wu Failure Criterion', 'Hashin Failure Criterion', 'ABD Matrices', 'Navier Series', 'Composites Design'],
  },

  // ── EXPERIENCE ROLES ──────────────────────────────────

  'exp-tata': {
    type: 'experience',
    tag: 'Industry',
    title: 'Quality and MRB Intern',
    meta: 'Tata Boeing Aerospace · AH-64 Apache Fuselage Line · Oct 2022–Mar 2023 · Nagpur, India',
    accent: 'blue',
    metrics: [
      { val: '-22%', lbl: 'NCR Cycle Time' },
      { val: '15→3%', lbl: 'Defect Rate' },
      { val: '~$3k', lbl: 'Scrap Recovered' },
      { val: '8D', lbl: 'Methodology' },
    ],
    images: [],
    sections: [
      {
        title: 'The Role',
        body: 'Embedded with the AH-64 Apache fuselage production line at Tata Boeing Aerospace — a joint venture manufacturing composite fuselage sections for Boeing\'s attack helicopter program. Introduced 8D problem-solving to MRB disposition, drove Pareto-led RCCA on the top three recurring failure modes, and rebuilt the First Article Inspection process for nonconforming composites.',
      },
      {
        title: 'Role Progression',
        steps: [
          'WK 01-03 — QC shadowing: CMM inspection records, GD&T verification on composite fuselage sections',
          'WK 04 — 8D rollout: applied to the top-3 defect modes from Pareto analysis of NCR log',
          'WK 12 — CAPA loop closed: root cause (autoclave temperature deviation) addressed with SPC monitoring',
          'WK 24 — Standard work published: 8D template and SPC control plan handed off to full-time staff',
        ],
      },
      {
        title: 'Root Cause Analysis — CNC Tool Wear',
        body: 'Identified CNC tool wear as the source of recurring position-tolerance violations affecting 15% of incoming batches. Implemented tool-life tracking using X̄-R control charts on tool offset data — triggered replacement at statistical process signal rather than calendar schedule. Defect rate on the monitored feature dropped from 15% to under 3% within the first three months.',
      },
      {
        title: 'Supplier FMEA & MRB Disposition',
        body: 'Led FMEA investigation when a supplier delivered aluminum alloy below specification — affecting 200+ parts. Coordinated use-as-is disposition with engineering, backed by stress analysis showing adequate margin for the non-critical bracket application. Recovered approximately $3,000 in scrap value and maintained production schedule.',
      },
      {
        title: 'Why This Matters',
        body: 'Every part on this line was destined for GE Aerospace jet engines or Boeing Apache helicopters — zero margin for quality escapes. The progression from inspection to MRB disposition taught me that quality isn\'t about catching defects; it\'s about building systems that prevent them and providing engineering with the data to make sound disposition decisions.',
      },
    ],
    skills: ['8D Problem Solving', 'pFMEA (AIAG FMEA-4)', 'SPC / X̄-R Charts', 'CMM Inspection', 'GD&T (ASME Y14.5)', 'MRB Disposition', 'RCCA', 'AS9100', 'First Article Inspection'],
  },

  'exp-beckman': {
    type: 'experience',
    tag: 'Research',
    title: 'Graduate Research Assistant',
    meta: 'Beckman Institute, UIUC · Autonomous Materials Systems Lab · May–Dec 2024 · Urbana, IL',
    accent: 'blue',
    metrics: [
      { val: '8h → 5m', lbl: 'Cure Cycle Optimization' },
      { val: '-94%', lbl: 'Compute Time' },
      { val: '+12°C', lbl: 'Tg Margin' },
      { val: '38', lbl: 'Runs/Day' },
    ],
    images: [],
    sections: [
      {
        title: 'The Problem',
        body: 'Traditional cure cycle development for thermoset composites relies on overnight Design of Experiments sweeps — running one time/temperature/pressure combination per autoclave cycle. Each run takes 8+ hours. Finding the optimal cure schedule for a new resin system typically requires 30-50 runs, meaning weeks of calendar time.',
      },
      {
        title: 'What Was Built',
        body: 'Built a closed-loop Bayesian optimizer for resin cure cycles. Instead of exhaustive DOE sweeps, the Bayesian engine builds a probabilistic surrogate model of the cure response surface, selects the next experiment that maximizes expected improvement, and converges to the optimal schedule in a fraction of the runs. Same glass transition temperature (Tg) target — 94% faster to get there.',
      },
      {
        title: 'Technical Approach',
        steps: [
          '01 — DSC (Differential Scanning Calorimetry) baselines to characterize neat resin cure kinetics',
          '02 — Gaussian Process surrogate model maps time/temperature/pressure → Tg outcome',
          '03 — Bayesian optimization loop: Expected Improvement acquisition → next experiment selection',
          '04 — Closed-loop interface to autoclave controller — no manual re-programming between runs',
          '05 — Converged to optimal schedule in ~8 runs vs 40+ with classical full-factorial DOE',
        ],
      },
      {
        title: 'Results',
        body: 'Achieved +12°C Tg margin over the baseline cure schedule at equivalent cycle time. The 94% reduction in optimization wall-clock time (8 hours → 5 minutes per optimization iteration) unlocked same-day iteration — enabling 38 experimental runs per day versus the previous 1-2. Paper draft submitted Dec 2024.',
      },
    ],
    skills: ['Bayesian Optimization', 'Gaussian Process', 'DSC (Differential Scanning Calorimetry)', 'Autoclave Operations', 'Cure Kinetics', 'Python', 'Classical Lamination Theory', 'DOE', 'Scientific Writing'],
  },

  'exp-eqic': {
    type: 'experience',
    tag: 'Industry',
    title: 'Manufacturing Intern',
    meta: 'EQIC Dies & Moulds Engineers Pvt. Ltd. · Tool Room · Jun–Aug 2022 · Hyderabad, India',
    accent: 'blue',
    metrics: [
      { val: '12-stage', lbl: 'Die Workflow' },
      { val: '±0.02mm', lbl: 'GD&T Tolerance' },
      { val: '3', lbl: 'FMEAs Run' },
      { val: 'HPDC', lbl: 'Process' },
    ],
    images: [],
    sections: [
      {
        title: 'Company & Context',
        body: 'EQIC is a precision tooling supplier specializing in High-Pressure Die Casting (HPDC) dies for automotive clients including Lucas TVS, Hyundai, and Mahindra. Their dies produce aluminum components for engine blocks, transmission housings, and structural parts — each die represents 300–500 hours of skilled tool-room work and must be dimensionally correct to ±0.02mm on critical features.',
      },
      {
        title: 'The Assignment',
        body: 'Owned tool-room workflow documentation on a UNIRAC HPDC die from raw block to delivery — tracking every manufacturing stage, verifying GD&T on CMM, running process FMEAs on EDM and grinding operations, and mapping the complete route with cycle-time evidence.',
      },
      {
        title: '12-Stage Workflow Documented',
        steps: [
          '01 — Die design review: parting line, cooling channels, ejector pin layout',
          '02 — CAM programming: toolpath generation for rough and finish milling',
          '03 — CNC rough milling: P20 tool steel block, ±0.1mm tolerance',
          '04 — CNC finish milling: ±0.02mm on cavity surfaces and datums',
          '05 — Heat treatment: hardening + tempering to 48–52 HRC',
          '06 — Stress relieving: prevents distortion on re-machining',
          '07 — Wire EDM: complex parting line geometries',
          '08 — Sinker EDM: core pin pockets and lettering cavities',
          '09 — Surface grinding: reference surface flatness and parallelism',
          '10 — Hand polishing: mirror finish on A-surface cavities',
          '11 — CMM inspection: GD&T verification at ±0.02mm against nominal',
          '12 — Assembly and trial shots: fill pattern validation and part quality review',
        ],
      },
      {
        title: 'Key Takeaway',
        body: 'A single tooling defect gets replicated in every part the die produces — potentially thousands of parts before detection. Understanding the precision and effort required in die manufacturing directly improves how I design composite parts and write manufacturing plans: I now explicitly call out die-side tolerances, draft angles, and ejection constraints that would otherwise create expensive tooling rework.',
      },
    ],
    skills: ['HPDC Die Design', 'CNC Machining', 'Wire/Sinker EDM', 'Heat Treatment', 'CMM Inspection', 'GD&T (ASME Y14.5)', 'pFMEA', 'SolidWorks', 'Process Documentation'],
  },
};

// ─── DetailModal Component ─────────────────────────────────
function DetailModal({ id, onClose }) {
  const page = DETAIL_PAGES[id];
  const [imgIdx, setImgIdx] = useState(0);
  const panelRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  if (!page) return null;

  const accentClass = `detail--${page.accent}`;
  const hasImages = page.images && page.images.length > 0;
  const hasLinks = page.links;

  return (
    <div className="detail-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label={page.title}>
      <div className={`detail-panel ${accentClass}`} ref={panelRef}>

        {/* Chrome bar */}
        <div className="detail-chrome">
          <div className="detail-chrome__dots" aria-hidden="true"><span/><span/><span/></div>
          <span className="mono detail-chrome__id">{id.toUpperCase().replace('-','_')} · {page.type.toUpperCase()}</span>
          <button className="detail-chrome__close" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scroll content */}
        <div className="detail-body">

          {/* Header */}
          <div className="detail-header">
            <div className="detail-header__top">
              <span className={`chip chip--${page.tag.toLowerCase().split('·')[0].trim()}`}>{page.tag}</span>
              {hasLinks && (
                <div className="detail-header__links">
                  {hasLinks.demo && (
                    <a href={hasLinks.demo} target="_blank" rel="noreferrer" className="btn btn--amber btn--sm">
                      <span className="btn__pulse" aria-hidden="true"></span>
                      Live Demo
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M4 7l3-3M7 4H4.5M7 4v2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>
                    </a>
                  )}
                  {hasLinks.github && (
                    <a href={hasLinks.github} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M6 0a6 6 0 0 0-1.9 11.7c.3.05.4-.13.4-.29v-1c-1.66.36-2-.8-2-.8-.27-.69-.66-.87-.66-.87-.55-.37.04-.36.04-.36.6.04.92.62.92.62.54.92 1.4.65 1.74.5.05-.39.21-.65.38-.8-1.32-.15-2.71-.66-2.71-2.94 0-.65.23-1.18.62-1.6-.06-.15-.27-.76.06-1.59 0 0 .5-.16 1.65.61a5.7 5.7 0 0 1 3 0c1.14-.77 1.65-.61 1.65-.61.33.83.12 1.44.06 1.59.38.42.62.95.62 1.6 0 2.29-1.4 2.79-2.72 2.94.21.18.4.54.4 1.09v1.62c0 .16.1.34.4.28A6 6 0 0 0 6 0Z"/></svg>
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
            <h2 className="detail-title">{page.title}</h2>
            <p className="mono detail-meta">{page.meta}</p>
          </div>

          {/* Metrics */}
          <div className="detail-metrics">
            {page.metrics.map((m, i) => (
              <div key={i} className="detail-metric">
                <span className="detail-metric__val">{m.val}</span>
                <span className="mono detail-metric__lbl">{m.lbl}</span>
              </div>
            ))}
          </div>

          {/* Image gallery */}
          {hasImages && (
            <div className="detail-gallery">
              <div className="detail-gallery__main">
                <img src={page.images[imgIdx].src} alt={page.images[imgIdx].caption} className="detail-gallery__img" />
                <p className="mono detail-gallery__caption">{page.images[imgIdx].caption}</p>
              </div>
              {page.images.length > 1 && (
                <div className="detail-gallery__thumbs">
                  {page.images.map((img, i) => (
                    <button key={i} className={`detail-gallery__thumb ${imgIdx === i ? 'is-active' : ''}`} onClick={() => setImgIdx(i)}>
                      <img src={img.src} alt={img.caption} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content sections */}
          <div className="detail-sections">
            {page.sections.map((s, i) => (
              <div key={i} className="detail-section">
                <h3 className="detail-section__title mono">{s.title.toUpperCase()}</h3>
                {s.body && <p className="detail-section__body">{s.body}</p>}
                {s.steps && (
                  <ol className="detail-steps">
                    {s.steps.map((step, j) => (
                      <li key={j} className="detail-step">{step}</li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="detail-skills">
            <p className="mono detail-skills__lbl">SKILLS APPLIED</p>
            <div className="detail-skills__chips">
              {page.skills.map((s) => (
                <span key={s} className={`stack-chip stack-chip--${page.accent} mono`}>{s}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Export to window
Object.assign(window, { DetailModal });
