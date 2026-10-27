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
      github: 'https://github.com/siddardth7/fmea-risk-analyzer',
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
        body: 'Python 3.10+ · Streamlit 1.56 · Plotly 6.6 for interactive charts · Pandas for data processing · ReportLab for PDF generation · openpyxl for Excel export. 61 unit tests running on GitHub Actions CI. Engineering reference: AIAG FMEA-4 (4th Ed, 2008).',
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
      github: 'https://github.com/siddardth7/manufacturing-spc-dashboard',
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
      github: 'https://github.com/siddardth7/Virtual-Composite-Design-Optimization',
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
        body: 'The toolkit grew out of the layup code written for the SAMPE fuselage, where a simulated-annealing search explored symmetric, balanced stacking sequences for the design team. I helped write that code; the final layup was chosen by the design side and checked in FEA before cutting prepreg.',
      },
    ],
    skills: ['Classical Lamination Theory', 'Simulated Annealing', 'CalculiX FEA', 'Python', 'NumPy', 'Tsai-Wu Criterion', 'Hashin 1980 Criterion', 'ABD Matrices', 'Navier Series', 'Composites Design'],
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
