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
    meta: 'Manufacturing Lead · University of Illinois Urbana-Champaign · Jan–May 2025',
    highlight: '2,700 lbf structural test · 38% deflection reduction · first-article acceptance',
    accent: 'green',
    metrics: [
      { val: '2,700 lbf', lbl: 'Structural Load' },
      { val: '38%', lbl: 'Deflection ↓' },
      { val: '20 psi', lbl: 'Pressure Hold Test' },
      { val: '0', lbl: 'Failures' },
    ],
    heroImage: { src: 'images/sampe/testing-mts.jpg', caption: 'Team with the finished fuselage at the MTS testing machine' },
    images: [],
    sections: [
      {
        title: 'What Was Built',
        body: 'Manufactured a composite fuselage cylinder (24"×6" OD) capable of withstanding 2,700 lbf in three-point bending using vacuum bagging and autoclave cure. Stacking sequence was optimized via Python simulated annealing and validated in ABAQUS FEA - achieving 38% deflection reduction versus the baseline [0/90]s schedule. Final build achieved first-article structural acceptance on the first attempt.',
        image: { src: 'images/sampe/cad-model-old.png', caption: 'CAD model - SolidWorks' },
      },
      {
        title: 'The Challenge',
        body: 'Meet aerospace-grade quality with university lab constraints, prepreg-only materials, four structural cutouts, and no room for iteration - all in one semester. The 8D risk register identified vacuum bag leak (RPN 60) as the highest-priority failure mode. The pressurized hold test at 20 psi (24-hour hold) was the structural acceptance gate before cure.',
      },
      {
        title: 'How It Was Built',
        steps: [
          '01 - Stacking sequence optimized: Python simulated annealing over 12-ply symmetric layup, validated in ABAQUS FEA',
          '02 - Prepreg layup on aluminum mandrel with debulking every 4–6 plies',
          '03 - Dual-blanket redesign: 7 inner + 7 outer continuous prepreg wraps (solving the circumference gap problem)',
          '04 - Two-stage autoclave cure: 275°F, 40 psi, 90 min dwell',
          '05 - Pressurized hold test at 20 psi - 24-hour leak check acceptance gate',
          '06 - Waterjet cutouts (4 structural cutouts) and surface finishing',
          '07 - MTS three-point bending test - 2,700 lbf sustained with <1" deflection',
        ],
        gallery: [
          { src: 'images/sampe/nomex-core.jpg', caption: 'Nomex honeycomb core wrapped on aluminum mandrel' },
          { src: 'images/sampe/prepreg-layup.jpg', caption: 'Continuous prepreg blanket layup - the innovative solution' },
          { src: 'images/sampe/autoclave.jpg', caption: 'Vacuum-bagged part loaded into autoclave for cure' },
        ],
      },
      {
        title: 'The Crisis & Solution',
        body: 'At ply 10 of 14, a 3-inch circumferential gap appeared - the prepreg wouldn\'t close around the mandrel. Root cause: all plies had been cut to identical length, but increasing wall thickness meant each successive ply needed a longer circumference. The all-nighter redesign abandoned 14 individual wraps and created one continuous prepreg blanket with progressive ply lengths applied in a single roll. This eliminated delamination risk, maintained fiber continuity, and achieved perfect fit on the first re-attempt.',
      },
      {
        title: 'Testing & Results',
        body: 'First-article structural acceptance on the first attempt. 2,700 lbf peak load with zero failures. 38% deflection reduction over the baseline schedule confirmed by ABAQUS FEA cross-validation.',
        gallery: [
          { src: 'images/sampe/finished-cylinder.jpg', caption: 'Finished composite cylinder - post-cure' },
          { src: 'images/sampe/utm-test.png', caption: 'MTS machine readout during structural testing' },
        ],
      },
    ],
    skills: ['Prepreg Layup', 'Vacuum Bagging', 'Autoclave Operation', 'pFMEA', 'ABAQUS FEA', 'Classical Lamination Theory', 'Python · Simulated Annealing', 'ASME GD&T', 'Process Documentation'],
  },

  'lab-esvc': {
    type: 'lab',
    tag: 'Competition',
    title: 'Electric Solar Vehicle Championship',
    meta: 'Manufacturing Lead & Brake/Suspension Specialist · Team Solarians · 2019–2023',
    highlight: '7th place nationally · 180.43/200 Cross Pad · zero mechanical failures',
    accent: 'green',
    metrics: [
      { val: '7th', lbl: 'National Rank' },
      { val: '180.43', lbl: '/ 200 Cross Pad' },
      { val: '0', lbl: 'Mechanical Failures' },
      { val: '30', lbl: 'Team Members Led' },
    ],
    heroImage: { src: 'images/esvc/vehicle-competition.jpg', caption: "Team Solarians' solar-electric vehicle competing at ESVC 2023 National Championship" },
    images: [],
    sections: [
      {
        title: 'What Was Built',
        body: 'Led manufacturing and brake/suspension systems for a 30-member team building a solar-electric three-wheeler for the national Electric Solar Vehicle Championship. Over four years, progressed from junior team member to Manufacturing Lead - coordinating chassis welding, hydraulic brake integration, suspension mounting, and final vehicle assembly for four consecutive competition seasons.',
      },
      {
        title: 'Brake System',
        body: 'Adapted motorcycle disc brake components (203mm rotors, twin-piston calipers) with custom mounting brackets. Implemented 70/30 front/rear pressure distribution for optimal stopping power. Designed braking system to meet ESVC safety requirements while minimizing unsprung weight.',
      },
      {
        title: 'Suspension Engineering',
        body: '2023 rulebook changes required a complete redesign of suspension mounting brackets mid-season. Preserved 100mm wheel travel while meeting new compliance requirements - delivered revised brackets within one week to avoid competition eligibility risk. The fix required rethinking the pickup point geometry without touching the chassis.',
      },
      {
        title: 'Prototype & Validation Method',
        steps: [
          '01 - Built full-scale PVC pipe mockup to validate driver ergonomics before metal fabrication',
          '02 - Adjusted seating position, pedal reach, steering wheel placement, and sightlines with competition driver',
          '03 - Three-stage inspection protocol implemented across all 30 team members\' workstations',
          '04 - Pre-competition systems check: wheel bearing, brake bleed, wiring chafe - all caught before race day',
          '05 - Chassis welding (TIG/MIG), solar panel integration, and final assembly coordination',
        ],
        image: { src: 'images/esvc/pvc-prototype.jpg', caption: 'PVC pipe mockup for driver ergonomics validation' },
      },
      {
        title: 'Key Lesson',
        body: 'Zero mechanical failures was not luck. It was the direct result of a three-stage inspection protocol I implemented - catching three pre-competition issues (loose wheel bearing, brake bleed air pocket, wiring chafe) before they could become race-day failures. Quality control on a student team is harder than on a factory floor because the consequences of a missed inspection are felt in front of a crowd.',
      },
    ],
    skills: ['Chassis Welding (TIG/MIG)', 'Hydraulic Brake Systems', 'Suspension Design', 'Team Leadership (30 members)', 'Quality Control Protocol', 'Prototype Testing', 'Vehicle Dynamics', 'Manufacturing Coordination'],
  },

  'lab-borosilicate': {
    type: 'lab',
    tag: 'Academic',
    title: 'Borosilicate Glass-Ceramic Composites',
    meta: 'Project Lead (Undergraduate Thesis) · VNR VJIET · Aug 2022–Apr 2023',
    highlight: '27% hardness improvement (548 → 699 HV) across 24 powder-metallurgy formulations',
    accent: 'green',
    metrics: [
      { val: '+27%', lbl: 'Hardness Improvement' },
      { val: '699 HV', lbl: 'Peak Hardness' },
      { val: '24', lbl: 'Formulations Tested' },
      { val: '850°C', lbl: 'Sintering Temperature' },
    ],
    heroImage: { src: 'images/borosilicate/poster-presentation.jpg', caption: 'Team presenting research findings at the departmental "Show and Tell" symposium' },
    images: [],
    sections: [
      {
        title: 'What Was Built',
        body: 'Developed borosilicate-alumina-copper oxide glass-ceramic composites to address vial breakage in pharmaceutical packaging. As Project Lead, designed, fabricated, and characterized 24 composite formulations using powder metallurgy techniques - achieving up to 27% hardness improvement (548 → 699 HV) while maintaining commercial viability. The work resulted in a 52-page technical thesis and a departmental research symposium presentation.',
      },
      {
        title: 'How It Was Built',
        steps: [
          '01 - Precision weighing (±0.01g) of borosilicate glass, Al₂O₃, and n-Cu₂O powders',
          '02 - Wet grinding with 2% PVA binder in ball mill to achieve homogeneous powder mix',
          '03 - Hydraulic compaction at 50 kgf to form green pellets',
          '04 - Multi-stage sintering: 300°C (20 min binder burnout) → 5°C/min ramp → 850°C (30 min isothermal)',
          '05 - Micro Vickers Hardness testing (ASTM E384) across all 24 formulations',
          '06 - XRD analysis to confirm amorphous structure preservation (no cristobalite formation)',
          '07 - SEM/EDS characterization of phase distribution and bonding quality',
        ],
        image: { src: 'images/borosilicate/pellet-samples.png', caption: 'Sintered pellets: (a) Pure BS, (b) BS+Al₂O₃, (c) BS+n-Cu₂O, (d) BS+Al₂O₃+n-Cu₂O' },
      },
      {
        title: 'Critical Challenge - Cristobalite Suppression',
        body: 'The primary risk in borosilicate sintering is cristobalite phase formation - a crystalline transformation that causes catastrophic volume changes and cracking on thermal cycling. Introduced alumina as a network modifier: Al³⁺ ions diffuse into the glass matrix, increasing viscosity and suppressing nucleation sites. XRD analysis across all 24 formulations confirmed amorphous structure preservation in alumina-containing compositions.',
      },
      {
        title: 'Characterization Results',
        body: 'Best-performing formulation: 90% borosilicate glass + 10% Al₂O₃ at 850°C - achieving 698.66 HV versus the 548 HV baseline. Copper oxide additions improved density but introduced crystallinity risk at higher concentrations; the alumina-only route produced more consistent results across the 24-sample matrix.',
        gallery: [
          { src: 'images/borosilicate/hardness-chart.png', caption: 'Micro Vickers Hardness: (a) BS/Al₂O₃ composites (b) BS/n-Cu₂O composites' },
          { src: 'images/borosilicate/xrd-analysis.png', caption: 'XRD patterns confirming amorphous structure across compositions' },
        ],
      },
    ],
    skills: ['Powder Metallurgy', 'Sintering Optimization', 'Micro Vickers Hardness (ASTM E384)', 'XRD Analysis', 'SEM/EDS Characterization', 'Design of Experiments', 'Technical Writing', 'Research Presentation'],
  },

  'lab-aero': {
    type: 'lab',
    tag: 'Competition',
    title: 'SAE Aero Design Challenge',
    meta: 'CFD Analysis Specialist & Manufacturing Planner · Team Ethereal Predators · Aug 2021–Mar 2022',
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
        body: 'Conducted comprehensive CFD analysis and manufacturing planning for a 7-member team designing a radio-controlled cargo aircraft for SAE Aero Design Challenge. The aircraft featured a 92-inch tapered wing optimized for maximum payload capacity under strict competition weight limits. Primary responsibility: airfoil selection and aerodynamic validation from theory to CFD to physical design.',
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

  'code-fmea': {
    type: 'code',
    tag: 'Python · Streamlit',
    title: 'FMEA Risk Analyzer',
    meta: 'Quality Engineering Tool · 78 Unit Tests · Live on Streamlit Cloud',
    highlight: 'Automates pFMEA risk analysis with AIAG FMEA-4 compliance, Pareto ranking, and PDF/Excel export',
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
        body: 'Process FMEA risk analysis is mandatory in aerospace (AS9100) and automotive (IATF 16949) manufacturing. In practice, engineers manage pFMEA tables in sprawling Excel spreadsheets - RPN scores calculated manually, Pareto ranking done by hand, and AIAG criticality flags routinely missed. This tool replaces that entire workflow with a live, interactive Streamlit application.',
      },
      {
        title: 'How It Works',
        steps: [
          '01 - Upload pFMEA data as CSV/Excel, or click "Use Demo Dataset" (30-row composite panel FMEA)',
          '02 - Engine computes RPN = Severity × Occurrence × Detection for all failure modes',
          '03 - AIAG FMEA-4 criticality flags applied: Severity ≥ 9 auto-flagged regardless of total RPN',
          '04 - Interactive Pareto chart identifies the 20% of failure modes driving 80% of total risk',
          '05 - Heatmap visualization maps Severity vs Detection across the full risk matrix',
          '06 - Export publication-ready PDF report or ranked Excel file with one click',
        ],
      },
      {
        title: 'Tech Stack',
        body: 'Python 3.10+ · Streamlit 1.56 · Plotly 6.6 for interactive charts · Pandas for data processing · ReportLab for PDF generation · openpyxl for Excel export. 78 unit tests running on GitHub Actions CI. Engineering reference: AIAG FMEA-4 (4th Ed, 2008) and AIAG/VDA FMEA Handbook (5th Ed, 2019).',
      },
      {
        title: 'Demo Dataset',
        body: 'The 30-row demo dataset is a realistic composite panel pFMEA with autoclave cure temperature deviation, vacuum bag leak, ply misalignment, and 27 other failure modes. The top 6 modes (of 30) account for approximately 29% of total RPN - the Pareto chart makes this immediately visible, showing exactly where corrective action spending should be concentrated.',
      },
    ],
    skills: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'pFMEA', 'AIAG FMEA-4', 'RPN Calculation', 'Pareto Analysis', 'ReportLab PDF', 'GitHub Actions CI'],
  },

  'code-spc': {
    type: 'code',
    tag: 'Python · Streamlit',
    title: 'SPC Manufacturing Dashboard',
    meta: 'Process Control Tool · 83 Unit Tests · Live on Streamlit Cloud',
    highlight: 'Full-featured SPC with 5 chart types, Western Electric + Nelson rule detection, and Cp/Cpk capability',
    accent: 'amber',
    metrics: [
      { val: '83', lbl: 'Unit Tests' },
      { val: '5', lbl: 'Chart Types' },
      { val: 'Cp/Cpk', lbl: 'Capability Indices' },
      { val: 'Live', lbl: 'Disturbance Simulator' },
    ],
    images: [],
    links: {
      demo: 'https://manufacturing-spc-dashboard-k8hyyj2fylnvjfrpcgqhyr.streamlit.app',
      github: 'https://github.com/Siddardth7/manufacturing-spc-dashboard',
    },
    sections: [
      {
        title: 'The Problem It Solves',
        body: 'SPC charts are the industry standard for separating common-cause from special-cause variation. Most production environments either track SPC in Excel (no automated rule detection) or pay for expensive MES software. This dashboard provides full-featured SPC analysis - five chart types, both Western Electric and Nelson rule detection, plus Cp/Cpk/Pp/Ppk - free and open-source.',
      },
      {
        title: 'Three Application Pages',
        steps: [
          'Control Charts - X̄-R, X̄-S, I-MR, p-chart, and u-chart for five aerospace process streams with rule violation markers',
          'Process Capability - Cp, Cpk, Pp, Ppk with distribution histogram and Shapiro-Wilk normality test',
          'Live Simulation - real-time subgroup generation with injected mean-shift and variance-increase disturbances',
        ],
      },
      {
        title: 'Tech Stack',
        body: 'Python 3.11+ · Streamlit 1.50+ · Plotly for interactive charts · Pandas + NumPy for SPC math · SciPy for Shapiro-Wilk normality test. 83 unit tests covering every control limit formula, every rule detection case (Western Electric 8 rules + Nelson 10 rules), and every capability index calculation. Deterministic 370-row demo dataset committed to the repo (seed=42).',
      },
      {
        title: 'Why 83 Tests?',
        body: 'SPC math has well-defined correct answers. A test suite that covers every control limit formula and every rule detection case guarantees the charts are numerically correct. Western Electric Rule 2 (2 of 3 beyond 2σ) and Nelson Rule 7 (15 in a row within 1σ) are the trickiest to implement correctly - both have explicit test cases. The test suite runs on every GitHub push via Actions CI.',
      },
    ],
    skills: ['Python', 'Streamlit', 'Plotly', 'SPC', 'X̄-R Control Charts', 'Cp/Cpk Capability', 'Western Electric Rules', 'Nelson Rules', 'Pandas', 'NumPy', 'SciPy'],
  },

  'code-composite': {
    type: 'code',
    tag: 'Python · CLT · FEA',
    title: 'Virtual Composite Design Toolkit',
    meta: 'Composites Analysis Engine · CLT + Simulated Annealing + CalculiX FEA Validation',
    highlight: '<1% deflection error vs CalculiX FEA · stacking sequence optimizer for the SAMPE competition build',
    accent: 'amber',
    metrics: [
      { val: '<1%', lbl: 'Deflection Error vs FEA' },
      { val: '<3%', lbl: 'Stress Error (IM7/8552)' },
      { val: 'SA', lbl: 'Stacking Optimizer' },
      { val: 'ABD', lbl: 'Full Matrix Output' },
    ],
    heroImage: { src: 'images/composite/fea-comparison.png', caption: 'CLT vs CalculiX FEA deflection comparison - <1% error' },
    images: [],
    links: {
      github: 'https://github.com/Siddardth7/Virtual-Composite-Design-Optimization',
    },
    sections: [
      {
        title: 'What It Does',
        body: 'A complete engineering toolkit for analyzing, validating, and optimizing composite laminate structures - built from first principles for the SAMPE Fuselage Competition, then extended into a fully validated open-source composites library. Computes full [A],[B],[D] stiffness matrices, recovers ply-level stresses and strains, evaluates failure indices via Tsai-Wu and Hashin criteria, predicts plate deflection via Navier series, and optimizes stacking sequences using Simulated Annealing.',
        image: { src: 'images/composite/laminate-stack.png', caption: 'ABD matrix stiffness by ply angle - [0/±45/90]s' },
      },
      {
        title: 'Validation Results',
        steps: [
          'CLT vs CalculiX FEA deflection: <1% error on IM7/8552 simply-supported plate (3 configurations verified)',
          'CLT vs FEA max principal stress: <3% error at plate center and free edges',
          'Simulated Annealing optimizer finds [0/±45/90]s optimum in <10 min - matches analytical result',
          'Angle sweep Ex vs θ: curves match CFRP handbook published data for all standard material systems',
        ],
        gallery: [
          { src: 'images/composite/failure-indices.png', caption: 'Tsai-Wu & Hashin failure index map' },
          { src: 'images/composite/angle-sweep.png', caption: "Young's modulus Ex vs ply angle θ" },
        ],
      },
      {
        title: 'Engineering Theory',
        body: 'Built on Classical Laminate Theory (Kirchhoff-Love plate kinematics: small deflections, perfect bonding, plane stress per ply). The ABD constitutive system relates force/moment resultants to mid-plane strains and curvatures. Failure criteria: Tsai-Wu (quadratic tensor polynomial) and Hashin 1980 (physically-motivated fiber/matrix splitting modes). Simulated Annealing drives the stacking optimizer - accepts worse solutions probabilistically at high temperature to escape local minima.',
      },
      {
        title: 'Connection to SAMPE',
        body: 'The Python Simulated Annealing optimizer in this toolkit directly generated the [0/±45/90]s stacking sequence used in the SAMPE competition fuselage - the sequence that achieved 38% deflection reduction over the baseline [0/90]s schedule. CalculiX FEA cross-validation confirmed the prediction before a single sheet of prepreg was cut.',
      },
    ],
    skills: ['Classical Lamination Theory', 'Simulated Annealing', 'CalculiX FEA', 'Python', 'NumPy', 'Tsai-Wu Criterion', 'Hashin 1980 Criterion', 'ABD Matrices', 'Navier Series', 'Composites Design'],
  },

  // ── EXPERIENCE ROLES ──────────────────────────────────

  'exp-tata': {
    type: 'experience',
    tag: 'Industry',
    title: 'Quality Assurance & MRB Coordinator',
    meta: 'Tata Boeing Aerospace · QC Inspector to MRB Coordinator · Oct 2022 - Mar 2023 · Hyderabad, India',
    highlight: '450+ flight-critical components inspected for CFM LEAP engine programs powering Boeing 737 MAX and Airbus A320neo',
    accent: 'blue',
    metrics: [
      { val: '450+', lbl: 'Parts Inspected' },
      { val: '22%', lbl: 'Cycle Time ↓' },
      { val: '15→3%', lbl: 'Defect Rate' },
      { val: '₹2.5L', lbl: 'Scrap Recovered' },
    ],
    images: [],
    sections: [
      {
        title: 'Role Progression',
        steps: [
          'QC Inspector (Months 1–3): Dimensional inspection using CMM (0.02mm accuracy), surface roughness testing, and GD&T interpretation. Achieved 100% report accuracy with zero customer escapes on GE/Boeing programs.',
          'MRB Coordinator (Months 4–6): Promoted to lead cross-functional Material Review Board meetings - coordinating disposition decisions between quality, engineering, and production for nonconforming parts.',
        ],
      },
      {
        title: 'Root Cause Analysis',
        body: 'Identified CNC tool wear as the source of recurring position-tolerance violations affecting 15% of batches. Implemented tool-life tracking using SPC - triggering replacement at a statistical signal rather than a calendar schedule. Defect rate on the monitored feature dropped from 15% to under 3% within three months.',
      },
      {
        title: 'Supplier FMEA & Scrap Recovery',
        body: 'Led FMEA investigation when a supplier delivered aluminum alloy below specification - affecting 200+ parts. Negotiated use-as-is MRB disposition with engineering, backed by stress analysis confirming adequate margin for the non-critical bracket application. Recovered ₹2.5L in scrap value and maintained production schedule without delay.',
      },
      {
        title: 'Process Optimization',
        body: 'Streamlined MRB documentation workflow using 8D methodology. Reduced average nonconformance cycle time by 22% through standardized root-cause templates across the quality team.',
      },
      {
        title: 'Working with Aerospace Standards',
        body: 'The components inspected were flight hardware for the CFM International LEAP engine - the fastest-selling engine in commercial aviation history, powering Boeing 737 MAX and Airbus A320neo family aircraft. With 14,000+ engine orders and production ramping to 2,000 engines per year, zero quality escapes was not a slogan - it was a production requirement. Working under AS9100 and Boeing supplier quality requirements gave real-world grounding to Six Sigma methodology that no classroom can replicate.',
      },
    ],
    skills: ['CMM Operation', 'GD&T (ASME Y14.5)', '8D Problem Solving', 'pFMEA', 'Statistical Process Control', 'Root Cause Analysis', 'AS9100 / ISO 9001', 'MRB Coordination'],
  },

  'exp-beckman': {
    type: 'experience',
    tag: 'Research',
    title: 'Graduate Research Assistant',
    meta: 'Beckman Institute, UIUC · Autonomous Materials Systems Lab · May 2024 - Dec 2024 · Urbana, IL',
    highlight: 'Out-of-autoclave cure via frontal polymerization: 8+ hour cycle reduced to under 5 minutes',
    accent: 'blue',
    metrics: [
      { val: '8h → 5m', lbl: 'Cure Cycle' },
      { val: '94%', lbl: 'Faster Optimization' },
      { val: '10%', lbl: 'Velocity Accuracy' },
      { val: '3°C', lbl: 'Temp. Error' },
    ],
    images: [],
    sections: [
      {
        title: 'Research Focus',
        body: 'Developed and validated an out-of-autoclave cure method using frontal polymerization - a self-propagating reaction front that cures thermoset composites in under 5 minutes, compared to 8+ hour conventional autoclave cycles. Work conducted at the Autonomous Materials Systems Lab under Prof. Philippe H. Geubelle.',
      },
      {
        title: 'Computational Modeling',
        steps: [
          '01 - Developed level-set and reaction-diffusion models using the MOOSE finite element framework',
          '02 - Implemented Adaptive Mesh Refinement concentrating elements at the moving reaction front',
          '03 - Predicted front velocity within 10% accuracy and peak temperatures within 3°C of experimental results',
          '04 - Accelerated process parameter optimization by 94% compared to full reaction-diffusion simulation',
        ],
      },
      {
        title: 'Physical Fabrication and Characterization',
        body: 'Fabricated thermoset composite specimens via frontal polymerization and characterized mechanical properties. Correlated cure parameters - initiator concentration and fiber volume fraction - to final composite quality, validating computational predictions against physical specimens.',
      },
    ],
    skills: ['Frontal Polymerization', 'MOOSE Framework', 'Level-Set Methods', 'Adaptive Mesh Refinement', 'Composite Fabrication', 'Mechanical Characterization', 'C++', 'Python', 'Scientific Writing'],
  },

  'exp-eqic': {
    type: 'experience',
    tag: 'Industry',
    title: 'Manufacturing Intern',
    meta: 'EQIC Dies & Moulds Engineers Pvt. Ltd. · Tool Room · Jun–Aug 2022 · Hyderabad, India',
    highlight: '12-stage progressive die workflow documented · ±0.02mm GD&T verified on CMM · 3 FMEAs run',
    accent: 'blue',
    metrics: [
      { val: '12-stage', lbl: 'Die Workflow' },
      { val: '±0.02mm', lbl: 'GD&T Tolerance' },
      { val: '3', lbl: 'FMEAs Run' },
      { val: 'HPDC', lbl: 'Specialty Process' },
    ],
    images: [],
    sections: [
      {
        title: 'Company & Context',
        body: 'EQIC is a precision tooling supplier specializing in High-Pressure Die Casting (HPDC) dies for automotive clients including Lucas TVS, Hyundai, and Mahindra. Their dies produce aluminum components for engine blocks, transmission housings, and structural castings - each die represents 300–500 hours of skilled tool-room work and must hold ±0.02mm on critical cavity surfaces.',
      },
      {
        title: 'The Assignment',
        body: 'Tracked a UNIRAC HPDC die through its complete manufacturing lifecycle - from design review to trial shots - documenting each process stage, verifying GD&T on CMM, and running process FMEAs on EDM and grinding operations. Produced a cycle-time atlas of the complete 12-stage workflow.',
      },
      {
        title: '12-Stage Workflow Documented',
        steps: [
          '01 - Die design review: parting line optimization, cooling channel layout, ejector pin placement',
          '02 - CAM programming: toolpath generation for rough and finish milling operations',
          '03 - CNC rough milling: P20 tool steel block, ±0.1mm tolerance',
          '04 - CNC finish milling: ±0.02mm on cavity surfaces and datum references',
          '05 - Heat treatment: hardening + tempering to 48–52 HRC, then stress relieving',
          '06 - Wire EDM: complex parting line geometries and tight-tolerance slots',
          '07 - Sinker EDM: core pin pockets, lettering cavities, draft-angle features',
          '08 - Surface grinding: reference surface flatness and parallelism to datum A',
          '09 - Hand polishing: mirror finish on A-surface cavities (Ra < 0.4μm)',
          '10 - CMM inspection: full GD&T verification at ±0.02mm against CAD nominal',
          '11 - Assembly: die halves, ejector pins, cooling line connections',
          '12 - Trial shots: fill pattern validation, part quality review, first-article acceptance',
        ],
      },
      {
        title: 'Key Takeaway',
        body: 'A single tooling defect gets replicated in every part the die produces - potentially 50,000+ parts before detection. Understanding the precision and effort behind die manufacturing now directly shapes how I design composite parts and write manufacturing plans: I explicitly call out die-side tolerances, draft angles, ejection constraints, and parting line locations that would otherwise create expensive tooling rework cycles.',
      },
    ],
    skills: ['HPDC Die Design', 'CNC Machining (Rough & Finish)', 'Wire/Sinker EDM', 'Heat Treatment (HRC)', 'CMM Inspection', 'GD&T (ASME Y14.5)', 'pFMEA', 'SolidWorks', 'Process Documentation'],
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
                    <a href={page.links.demo} target="_blank" rel="noreferrer" className="btn btn--amber btn--sm">
                      <span className="btn__pulse" aria-hidden="true"></span>
                      Live Demo
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M4 7l3-3M7 4H4.5M7 4v2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>
                    </a>
                  )}
                  {page.links.github && (
                    <a href={page.links.github} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
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
