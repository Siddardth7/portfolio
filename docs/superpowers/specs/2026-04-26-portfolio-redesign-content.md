# Portfolio Redesign — Content & Structure Spec
**Date:** 2026-04-26
**Phase:** 2 of 4 — Content Plan (approved)
**Owner:** Siddardth Pathipaka
**Target Roles:** Quality Engineer · Manufacturing Engineer · Process / CI Engineer

---

## Overview

Full redesign of the personal portfolio website. The site was last built February 2025 and is significantly outdated — wrong company names, inflated claims, missing 3 new software projects, and stale availability copy. This spec defines the approved content for every section of the redesigned site, verified against the April 2026 resume files and the Resume Audit Report.

**Key positioning shift:** From "composites researcher" → **Quality + Manufacturing Engineer with Process/CI focus and Six Sigma Green Belt.**

---

## Architecture

- **Type:** Single HTML file, fully self-contained
- **Navigation:** One scrollable page with anchor-based nav (replaces the JS page-switcher that broke browser back-button)
- **Pages removed:** No more separate JS-toggled "pages" — everything scrolls
- **Detail pages:** Project and experience detail pages retained as expandable or linked sections

---

## Section Order

```
01  Hero
02  Built in the Lab        (engineering projects)
03  Built in Code           (software tools)
04  Experience
05  Skills & Credentials
06  Contact
    Footer
```

**Removed:** Philosophy section (Precision Under Pressure · Theory Meets Reality · Constraints Spark Innovation) — values folded into hero bio.

---

## 01 — Hero

### Badge
```
Open to Full-Time Roles
```

### Headline (H1)
```
Engineering Quality Into Every Process
```

### Name intro
```
I'm Siddardth Pathipaka
```

### Tagline
```
Manufacturing & Quality Engineer · Six Sigma Green Belt (CSSC) · Aerospace Composites
```

### Bio paragraph
```
I bring quality systems thinking, process improvement methodology, and hands-on composites 
manufacturing to aerospace production. From introducing 8D problem-solving that cut 
nonconformance cycle time by 22% at Tata Boeing Aerospace, to building pFMEA and SPC tools 
that automate what engineers do in spreadsheets — I close the loop between the shop floor 
and the data that drives it.
```

### Stats bar (3 items only)
| Value | Label |
|---|---|
| 7 | Projects |
| 3 | Internships |
| GB | Six Sigma |

### CTAs
- Primary: **View My Work** (scrolls to Built in the Lab)
- Secondary: **Download Resume** (Google Drive link, existing)

### Visual elements
- Photo of Siddardth (existing, keep)
- Remove spacecraft animations (performance + professionalism)
- Background grid + radial glow: keep (defines the aesthetic)

---

## 02 — Built in the Lab

**Section label:** Built in the Lab
**Purpose:** 4 hands-on engineering projects — competitions, research, fabrication

### Project cards (order locked)

#### 1. SAMPE Fuselage Competition
- **Role:** Manufacturing Lead
- **Date:** Jan–May 2025
- **Tag:** Competition
- **Card highlight:** `2,700 lbf structural test · 38% deflection reduction`
- **Detail page:** Keep existing page. Correct the following:
  - Replace all references to "1,000 lbf" → **2,700 lbf**
  - Replace "<2% void content" → **first-article structural acceptance**
  - Replace "automated leak detection" → **pressurized hold test (20 psi)**
  - Add: "38% deflection reduction via Python simulated annealing + ABAQUS FEA"
  - Dual-blanket redesign story (7 inner + 7 outer plies) — keep, it's accurate

#### 2. Electric Solar Vehicle Championship
- **Role:** Manufacturing Lead & Brake/Suspension Specialist
- **Date:** 2019–2023
- **Tag:** Competition
- **Card highlight:** `7th place nationally · 180.43/200 Cross Pad · zero mechanical failures`
- **Detail page:** Keep existing, content confirmed accurate

#### 3. Borosilicate Glass-Ceramic Composites
- **Role:** Project Lead (Undergraduate Thesis)
- **Date:** Aug 2022–Apr 2023
- **Tag:** Academic
- **Card highlight:** `27% hardness improvement (548 → 699 HV) · 24 formulations`
- **Detail page:** Keep existing, content confirmed accurate

#### 4. SAE Aero Design Challenge
- **Role:** CFD Analysis Specialist & Manufacturing Planner
- **Date:** Aug 2021–Mar 2022
- **Tag:** Competition
- **Card highlight:** `85% CFD-to-theory correlation · 92" tapered wing`
- **Detail page:** Keep existing, content confirmed accurate

---

## 03 — Built in Code

**Section label:** Built in Code
**Purpose:** 3 purpose-built engineering software tools — all live, all tested
**Section intro copy:**
```
I build the tools quality engineers wish they had. Each runs live — built in Python, 
deployed on Streamlit, with 160+ unit tests across all three tools.
```

### Tool cards (order locked)

#### 1. FMEA Risk Analyzer
- **Stack:** Python · Streamlit · Plotly · AIAG FMEA-4
- **Key metric:** 78 unit tests (README authoritative — resume figure of 61 is outdated)
- **Links:** Live demo (Streamlit Cloud) · GitHub: `Siddardth7/fmea-risk-analyzer`
- **One-line description:** Automates pFMEA risk analysis — RPN scoring, Pareto 80/20 ranking, AIAG criticality flagging, PDF/Excel export

#### 2. SPC Manufacturing Dashboard
- **Stack:** Python · Streamlit · Plotly · 5 chart types (Xbar-R, Xbar-S, I-MR, p, u)
- **Key metric:** 83 unit tests · Cp/Cpk/Pp/Ppk · Western Electric + Nelson rules
- **Links:** Live demo (Streamlit Cloud) · GitHub: `Siddardth7/manufacturing-spc-dashboard`
- **One-line description:** Interactive SPC dashboard for aerospace manufacturing — control charts, process capability, live disturbance simulator

#### 3. Virtual Composite Design Toolkit
- **Stack:** Python · Classical Lamination Theory · CalculiX FEA · Simulated Annealing
- **Key metric:** <1% deflection error vs CalculiX FEA · <3% stress error on IM7/8552
- **Links:** GitHub: `Siddardth7/Virtual-Composite-Design-Optimization`
- **One-line description:** CLT engine with Simulated Annealing stacking sequence optimizer, validated against CalculiX FEA

### Card design requirements
Each Built in Code card must show:
- Tool name
- One-line purpose
- Tech stack chips
- "Live Demo" button (where applicable)
- "GitHub" link
- Visually distinct from Built in the Lab cards (different accent color — amber vs green)

---

## 04 — Experience

**Section label:** Experience
**Purpose:** 3 professional roles, ordered by relevance to QE/Manufacturing positioning

### Experience cards (order locked)

#### 1. Tata Boeing Aerospace
- **Title:** Quality and MRB Intern
- **Dates:** Oct 2022–Mar 2023
- **Tag:** Industry
- **Card highlight:** `22% NCR cycle time reduction · 15%→3% defect rate`
- **Detail page corrections:**
  - Company name: "Tata Advanced Systems Ltd" → **Tata Boeing Aerospace**
  - Title: "QC Inspector → MRB Coordinator" → **Quality and MRB Intern**
  - Scrap value: "₹2.5L" → **~$3,000**
  - Defect stat: "60% defect reduction" → **15% → under 3%**
  - "CMM inspection" framing → **audited GD&T-based CMM inspection records**

#### 2. Beckman Institute, UIUC
- **Title:** Graduate Research Assistant
- **Dates:** May–Dec 2024
- **Tag:** Research
- **Card highlight:** `8hrs → 5min cure cycle · 94% faster optimization`
- **Detail page corrections:**
  - Lab name: "Autonomous Materials Systems Lab" → **Beckman Institute, UIUC**
  - Remove "1/150th computational cost" framing → use **94% faster process parameter optimization**

#### 3. EQIC Dies & Moulds Engineers Pvt. Ltd.
- **Title:** Manufacturing Intern
- **Dates:** Jun–Aug 2022
- **Tag:** Industry
- **Card highlight:** `12-stage die workflow documented · ±0.02mm GD&T verification`
- **Detail page:** Keep existing, content confirmed accurate

---

## 05 — Skills & Credentials

**Section label:** Skills & Credentials
**Purpose:** New section — Surface the Six Sigma Green Belt prominently, group all skills by domain

### Certifications (featured at top, badge-style display)
1. **Six Sigma Green Belt** — Council for Six Sigma Certification (CSSC)
2. **Inspection & Quality Control in Manufacturing** — NPTEL, IIT Roorkee

### Quality Engineering
pFMEA (AIAG FMEA-4) · SPC · 8D Problem Solving · RCCA · CAPA · CMM Inspection · GD&T (ASME Y14.5) · First Article Inspection · MRB Disposition

### Process & Manufacturing
Lean Principles · Prepreg Layup & Autoclave · Cure Cycle Development · Out-of-Autoclave Methods · Powder Metallurgy · CNC Machining · Wire/Sinker EDM · HPDC Process

### Software & Simulation
Python · Streamlit · ABAQUS FEA · Classical Lamination Theory · ANSYS Fluent · SolidWorks · MATLAB · AutoCAD

### Standards
AIAG FMEA-4 / VDA · AS9100 · ASME Y14.5 · ASTM E384 · MIL-HDBK-17

---

## 06 — Contact

### Availability copy
```
Actively seeking full-time roles in Quality, Process, and Manufacturing Engineering. 
Open to aerospace, defense, and advanced manufacturing industries.
```

### Contact details
| Type | Value |
|---|---|
| Email | siddardth1524@gmail.com |
| LinkedIn | linkedin.com/in/siddardth-pathipaka |
| GitHub | github.com/Siddardth7 |

### Contact form
- Replace existing `alert()` submit handler with `mailto:` fallback
- Fields: Name · Email · Message · Send button
- No backend required

---

## Footer

```
© 2026 Siddardth Pathipaka · Built with precision and purpose · Get in touch
```
(Updated year from 2025 → 2026)

---

## Accuracy Corrections Applied (from Resume Audit)

| Location | Was | Now | Source |
|---|---|---|---|
| Tata company name | Tata Advanced Systems Ltd | **Tata Boeing Aerospace** | All resume variants |
| Tata job title | QC Inspector → MRB Coordinator | **Quality and MRB Intern** | All resume variants |
| SAMPE structural load | 1,000 lbf | **2,700 lbf** | Resume + Audit Report S1 |
| SAMPE card highlight | <2% void content | **2,700 lbf · 38% deflection reduction** | Audit Report S1, S4 |
| SAMPE cure method | automated leak detection | **pressurized hold test (20 psi)** | Audit Report S3 |
| Tata scrap value | ₹2.5L | **~$3,000** | Resume_Quality_Engineer.tex |
| Tata defect reduction | 60% reduction | **15% → under 3%** | All resume variants |
| UIUC lab name | Autonomous Materials Systems Lab | **Beckman Institute, UIUC** | Resume_April.tex |
| UIUC metric framing | 1/150th computational cost | **94% faster optimization** | All resume variants |
| FMEA test count | 61 (stale) | **78** (README authoritative) | fmea-risk-analyzer README |
| Second certification | Missing | **NPTEL IIT Roorkee** | Resume_April.tex |
| Skills gaps | Missing RCCA, CAPA, Lean | **Added** | Resume_Process_CI.tex |
| Stats bar | 4 stats incl. "450+ Parts QC'd" | **3 stats only** | User decision |
| Footer year | 2025 | **2026** | Current date |

---

## What This Spec Does NOT Cover

- Visual design system (colors, typography, spacing) → Phase 3
- Responsive layout breakpoints → Phase 3
- Animation and interaction design → Phase 3
- Implementation code → Phase 4
