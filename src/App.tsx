<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CSEC Additional Mathematics MCQ Portal</title>
  <meta name="description" content="Static CSEC Additional Mathematics multiple choice assessment portal with student, parent, and teacher views." />
  <style>
    :root {
      --bg1: #1f3a8a;
      --bg2: #253b9f;
      --ink: #0f172a;
      --muted: #64748b;
      --line: #e2e8f0;
      --soft: #f8fafc;
      --card: #ffffff;
      --brand: #111827;
      --green: #047857;
      --green-soft: #ecfdf5;
      --red: #be123c;
      --red-soft: #fff1f2;
      --amber: #92400e;
      --amber-soft: #fffbeb;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      background: linear-gradient(180deg, var(--bg1) 0%, var(--bg2) 50%, #2f3a97 100%);
    }
    button, input, select, textarea { font: inherit; }
    .shell { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 28px 0 56px; }
    .hero {
      color: white;
      text-align: center;
      padding: 34px 24px 28px;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 28px;
      margin-bottom: 22px;
    }
    .eyebrow { font-size: 13px; letter-spacing: .34em; text-transform: uppercase; color: rgba(255,255,255,.78); }
    h1 { margin: 14px 0 6px; font-size: clamp(2.2rem, 6vw, 4.1rem); line-height: .98; letter-spacing: -.04em; }
    .hero p { margin: 0 0 24px; font-size: clamp(1.1rem, 2vw, 1.55rem); color: rgba(255,255,255,.9); }
    .tabs, .actions, .row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
    .tabs { justify-content: center; }
    .btn {
      border: 1px solid #cbd5e1;
      background: white;
      color: var(--ink);
      border-radius: 10px;
      padding: 10px 15px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: transform .15s ease, background .15s ease, box-shadow .15s ease;
      box-shadow: 0 6px 14px rgba(15,23,42,.13);
    }
    .btn:hover { transform: translateY(-1px); background: #f8fafc; }
    .btn:disabled { opacity: .55; cursor: not-allowed; transform: none; }
    .btn.primary, .btn.active { background: var(--brand); color: white; border-color: var(--brand); }
    .btn.secondary { background: #e2e8f0; border-color: #e2e8f0; }
    .btn.danger { background: var(--red); color: white; border-color: var(--red); }
    .grid { display: grid; gap: 18px; }
    .grid.two { grid-template-columns: minmax(0, 1.12fr) minmax(300px, .88fr); align-items: start; }
    .grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .grid.four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .card {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 14px;
      box-shadow: 0 10px 24px rgba(15,23,42,.07);
      overflow: hidden;
    }
    .card-header { padding: 22px 22px 12px; }
    .card-content { padding: 22px; }
    .card-header + .card-content { padding-top: 10px; }
    h2, h3 { margin: 0; letter-spacing: -.02em; }
    h2 { font-size: 1.55rem; }
    h3 { font-size: 1.18rem; }
    .desc { color: var(--muted); margin: 6px 0 0; font-size: 14px; line-height: 1.55; }
    label { display: block; margin-bottom: 7px; font-weight: 700; font-size: 14px; color: #1e293b; }
    input, select, textarea {
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      background: white;
      color: var(--ink);
      padding: 11px 12px;
      outline: none;
    }
    textarea { min-height: 105px; resize: vertical; }
    input:focus, select:focus, textarea:focus { border-color: #475569; }
    .field { margin-bottom: 16px; }
    .topic-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .topic-btn {
      text-align: left;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 12px;
      background: #fff;
      cursor: pointer;
      color: #334155;
    }
    .topic-btn.selected { background: var(--brand); color: white; border-color: var(--brand); }
    .note { border: 1px solid var(--line); background: var(--soft); border-radius: 10px; padding: 12px 14px; color: #334155; font-size: 14px; line-height: 1.55; }
    .note.warn { border-color: #fde68a; background: var(--amber-soft); color: var(--amber); }
    .note.good { border-color: #bbf7d0; background: var(--green-soft); color: var(--green); }
    .stat { padding: 18px; background: var(--soft); border: 1px solid var(--line); border-radius: 12px; }
    .stat small { color: var(--muted); display: block; margin-bottom: 8px; }
    .stat strong { font-size: 2rem; }
    .badge { display: inline-flex; align-items: center; border-radius: 999px; padding: 6px 10px; font-size: 12px; font-weight: 800; border: 1px solid #cbd5e1; color: #334155; background: #fff; }
    .badge.dark { background: var(--brand); color: white; border-color: var(--brand); }
    .badge.green { background: var(--green-soft); color: var(--green); border-color: #bbf7d0; }
    .badge.red { background: var(--red-soft); color: var(--red); border-color: #fecdd3; }
    .topbar { display: flex; justify-content: space-between; gap: 16px; align-items: center; margin-bottom: 18px; background: white; border: 1px solid var(--line); border-radius: 14px; padding: 14px 16px; box-shadow: 0 8px 20px rgba(15,23,42,.05); }
    .progress-wrap { min-width: min(260px, 100%); }
    .progress-label { display: flex; justify-content: space-between; color: var(--muted); font-size: 13px; margin-bottom: 6px; }
    .progress { height: 9px; border-radius: 999px; background: #e2e8f0; overflow: hidden; }
    .progress > span { display: block; height: 100%; background: var(--brand); transition: width .2s ease; }
    .question-box { border: 1px solid var(--line); background: var(--soft); border-radius: 18px; padding: 24px; margin-bottom: 24px; }
    .question-label { text-transform: uppercase; letter-spacing: .22em; color: #64748b; font-size: 12px; font-weight: 900; margin-bottom: 12px; }
    .question-text { font-size: clamp(1.25rem, 2.7vw, 1.85rem); line-height: 1.55; white-space: pre-wrap; }
    .option-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    .option {
      min-height: 86px;
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      background: white;
      padding: 18px;
      text-align: left;
      cursor: pointer;
      transition: transform .15s ease, box-shadow .15s ease, border .15s ease;
    }
    .option:hover { transform: translateY(-1px); box-shadow: 0 10px 18px rgba(15,23,42,.08); }
    .option.selected { background: var(--brand); color: white; border-color: var(--brand); box-shadow: 0 10px 22px rgba(15,23,42,.18); }
    .option.correct { background: var(--green-soft); border-color: #34d399; color: #064e3b; }
    .option.wrong { background: var(--red-soft); border-color: #fb7185; color: #881337; }
    .option .letter { display: block; font-weight: 900; margin-bottom: 7px; }
    .result-item { margin-top: 16px; }
    .attempt-card { margin-bottom: 16px; }
    .hidden { display: none !important; }
    .list { margin: 0; padding-left: 18px; color: #334155; line-height: 1.75; font-size: 14px; }
    .splitline { border-top: 1px solid var(--line); margin: 18px 0; }
    sup { font-size: .68em; }
    .frac { display: inline-flex; flex-direction: column; align-items: center; vertical-align: middle; line-height: 1; margin: 0 .1em; }
    .frac .top { border-bottom: 1px solid currentColor; padding: 0 .22em .1em; }
    .frac .bottom { padding: .12em .22em 0; }
    @media (max-width: 880px) {
      .grid.two, .grid.three, .grid.four, .option-grid, .topic-grid { grid-template-columns: 1fr; }
      .topbar { align-items: flex-start; flex-direction: column; }
      .shell { width: min(100% - 20px, 1180px); padding-top: 14px; }
    }
    @media print {
      body { background: white; }
      .hero, .tabs, .btn, .no-print { display: none !important; }
      .shell { width: 100%; padding: 0; }
      .card { box-shadow: none; break-inside: avoid; }
    }
  </style>
</head>
<body>
  <main class="shell">
    <section class="hero">
      <div class="eyebrow">Student Assessment Portal</div>
      <h1>CSEC Additional Mathematics</h1>
      <p>Multiple Choice Questions</p>
      <div class="tabs no-print">
        <button class="btn active" data-role-button="student">Student view</button>
        <button class="btn" data-role-button="parent">Parent view</button>
        <button class="btn" data-role-button="teacher">Teacher view</button>
      </div>
    </section>

    <section id="studentView"></section>
    <section id="parentView" class="hidden"></section>
    <section id="teacherView" class="hidden"></section>
  </main>

  <script>
    const RAW_QUESTION_BANK = [[1, 1, "Factorization", "𝑎(𝑏 + 𝑐) − 𝑏(𝑎 + 𝑐) is equal to", "𝑎(𝑐 − 𝑏)", "𝑎(𝑏 − 𝑐)", "𝑐(𝑎 − 𝑏)", "𝑐(𝑏 − 𝑎)"],
[2, 2, "Factorization", "The expression ab + 3c − 3b − ac is equal to", "(𝑎 + 3)(𝑐 − 𝑏)", "(𝑎 + 3)(𝑏 − 𝑐)", "(𝑎 − 3)(𝑏 + 𝑐)", "(𝑎 − 3)(𝑏 − 𝑐)"],
[3, 3, "Factorization", "The expression ab + 3c − 3b − ac is equal to", "(𝑎 + 3)(𝑐 − 𝑏)", "(𝑎 + 3)(𝑏 − 𝑐)", "(𝑎 − 3)(𝑏 − 𝑐)", "(𝑎 − 3)(𝑏 + 𝑐)"],
[4, 4, "Factorization", "1/(𝑥 + 3) + 3/(𝑥² − 9) expressed as a single fraction is:", "𝑥/(𝑥² − 9)", "(𝑥² − 6)/(𝑥² − 9)(𝑥 + 3)", "(𝑥 + 6)/(𝑥² − 9)", "4/(𝑥 + 3)"],
[5, 5, "Factorization", "The expression 𝑝𝑞 + 5𝑟 − 5𝑞 − 𝑝𝑟 is equal to", "(𝑝 − 5)(𝑞 − 𝑟)", "(𝑝 + 5)(𝑟 − 𝑞)", "(𝑝 + 5)(𝑞 − 𝑟)", "(𝑝 − 5)(𝑞 + 𝑟)"],
[6, 6, "Factor/Remainder Theorem", "Given that 𝑓(𝑥) = 𝑥³ + 2𝑥² − 5𝑥 + 𝑘, and that 𝑥 − 2 is a factor of 𝑓(𝑥) then k is equal to", "-6", "-2", "2", "6"],
[7, 7, "Factor/Remainder Theorem", "The expression 𝑥 − 2 is a factor of", "4𝑥⁴ − 2𝑥² − 56", "4𝑥³ + 2𝑥² − 16", "2𝑥³ + 2𝑥² − 4𝑥 − 8", "3𝑥⁴ − 10𝑥³ − 5𝑥 + 4"],
[8, 8, "Factor/Remainder Theorem", "When 𝑥³ − 7𝑥² + 2𝑥 − 1 is divided by 𝑥 + 2, the quotient is", "−17", "−39", "𝑥² − 5𝑥 − 8", "𝑥² − 9𝑥 + 20"],
[9, 9, "Factor/Remainder Theorem", "The expression 𝑥 − 2 is a factor of", "4𝑥⁴ − 2𝑥² − 56", "4𝑥³ + 2𝑥² − 16", "2𝑥³ + 2𝑥² − 4𝑥 − 8", "3𝑥⁴ − 10𝑥³ − 5𝑥² + 4"],
[10, 10, "Factor/Remainder Theorem", "Given that 𝑥 + 2 is a factor of 𝑓(𝑥) = 2𝑥³ − 3𝑥² − 5𝑥 + 𝑝 then p is equal to", "−18", "−2", "18", "33"],
[11, 11, "Factor/Remainder Theorem", "2𝑥³ + 𝑥² − 7𝑥 − 6 factorizes completely as", "(𝑥 + 2)(𝑥 − 1)(2𝑥 − 3)", "(𝑥 − 2)(𝑥 − 1)(2𝑥 + 3)", "(𝑥 − 2)(𝑥 + 1)(2𝑥 − 3)", "(𝑥 − 2)(𝑥 + 1)(2𝑥 + 3)"],
[12, 12, "Factor/Remainder Theorem", "When 2𝑥³ + 3𝑥² − 2𝑥 + 3 is divided by 2𝑥 − 1, the remainder is", "0", "1/2", "3", "6"],
[13, 13, "Factor/Remainder Theorem", "The function 𝑓(𝑥) = 2𝑥³ − 𝑥² + ℎ𝑥 − 6 can be expressed as 𝑓(𝑥) = (2𝑥 + 1)(𝑥 + 2)(𝑥 − 3). What is the value of h?", "−13", "−12", "7", "13"],
[14, 14, "Factor/Remainder Theorem", "The linear factor of 𝑥³ − 3𝑥² − 3𝑥 − 4 is", "𝑥 − 1", "𝑥 − 2", "𝑥 + 2", "𝑥 − 4"],
[15, 15, "Arithmetic And Geometric Sequence", "The value of ∑(3𝑟 − 1), from 𝑟 = 1 to 20, is", "590", "610", "650", "1220"],
[16, 16, "Arithmetic And Geometric Sequence", "A teacher illustrates AP’s by cutting a length of string into 10 pieces so that the lengths of the pieces are in arithmetic progression and the entire length of the string is used up exactly. If the first piece measures 30 cm and the fourth piece measures 24 cm, the total length of the string is", "60 cm", "210 cm", "240 cm", "390 cm"],
[17, 17, "Arithmetic And Geometric Sequence", "The first term of a GP is 16 and the fifth term is 81. Given that the common ratio is positive, the value of the 4th term is", "81/16", "24", "54", "64"],
[18, 18, "Arithmetic And Geometric Sequence", "Given that the common ratio is positive, the value of the 4th term is", "81/16", "24", "54", "64"],
[19, 19, "Arithmetic And Geometric Sequence", "The first four terms of a convergent GP is given by 81, 27, 9, 3. The sum to infinity of this GP is", "54", "120.5", "121.5", "243"],
[20, 20, "Arithmetic And Geometric Sequence", "In a geometric progression, each of whose terms is positive, the fifth term is 45 and the seventh term is 5. The SIXTH term is", "9", "15", "25", "40"],
[21, 21, "Arithmetic And Geometric Sequence", "The first four terms of a convergent geometric progression (GP) is given by 500, 200, 80, 32. The sum to infinity of this GP is", "200", "500/3", "300", "2500/3"],
[22, 22, "Arithmetic And Geometric Sequence", "A long-distance runner runs the first kilometre of a race in 3 minutes 45 seconds but finds that his speed drops steadily so that each kilometre takes him 12 seconds more than the preceding one. The time taken to cover the first 12 kilometres is", "58 mins 12 secs", "31 mins 48 secs", "9 mins 18 secs", "63 mins 36 secs"],
[23, 23, "Arithmetic And Geometric Sequence", "The sum of the ODD integers between 10 and 50 is", "60", "600", "630", "1960"],
[24, 24, "Arithmetic And Geometric Sequence", "The first four terms of a convergent geometric progression (GP) are 500, 200, 80, 32. The sum to infinity of this GP is", "200", "500/3", "300", "2500/3"],
[25, 25, "Arithmetic And Geometric Sequence", "The common ratio of the geometric sequence 8, 12, 18, ... is", "3/4", "2/3", "3/2", "1/2"],
[26, 26, "Arithmetic And Geometric Sequence", "For the arithmetic progression −12, −7, −2, 3, 8 ... the 𝑛ᵗʰ term is given by", "5𝑛 − 17", "5𝑛 − 12", "−12 − 5𝑛", "5𝑛 + 17"],
[27, 27, "Arithmetic And Geometric Sequence", "Which of the following is NOT an arithmetic sequence?", "11, 2, −8, −19, ...", "8, 12, 16, 20, ...", "51, 45, 39, 33, ...", "−7, −9, −11, −13, ..."],
[28, 28, "Arithmetic And Geometric Sequence", "The series −2 + 4/3 − 8/9 + …  converges to the limit", "−6", "6", "−6/5", "6/5"],
[29, 29, "Arithmetic And Geometric Sequence", "The sum of the first n terms of a geometric series is Sₙ = 4ⁿ − 1. For this series, which statements are correct? I The common ratio is 4. II. The first 3 terms are 3, 15 and 63. III. S₂ₙ = 2⁴ⁿ − 1.", "I and II only", "I and III only", "II and III only", "I, II and III"],
[30, 30, "Arithmetic And Geometric Sequence", "The sum of ∑(1/𝑘), from 𝑘 = 1 to 3, is", "1/3", "1/2", "3/5", "11/6"],
[31, 31, "Arithmetic And Geometric Sequence", "The sum of the first n terms of a series is given by: ∑(5−3𝑟), from 𝑟 = 1 to 𝑛. The sum of the first 10 terms is", "-170", "-125", "-115", "-85"],
[32, 32, "Exponential And Logarithm", "A sequence of positive integers {Uₙ} is defined by 𝑈ₙ = 3(1/2)ⁿ−1. The 10𝑡ℎ term of the sequence is given by:", "19683/512", "3/256", "3/512", "3/1000"],
[33, 33, "Exponential And Logarithm", "Given that 2 × 4^(𝑥 + 1) = 16^(2𝑥), the value of x is", "−1", "1/4", "1/3", "½"],
[34, 34, "Exponential And Logarithm", "The (√(2 × 4^𝑚))^1/n is equal to", "(√8^𝑚)^1/n", "2^(𝑛 + 2𝑚)", "2^(𝑛 + 𝑛𝑚)", "2^((2𝑚 + 1)/𝑛)"],
[35, 35, "Exponential And Logarithm", "n(√(3 × 27^𝑚)) is equal to", "3^((3𝑚+1)/𝑛)", "3^(𝑛 +3𝑚)", "n(√(81^3𝑚))", "3^4𝑚"],
[36, 36, "Exponential And Logarithm", "Given that 𝑙𝑜𝑔₂ 𝑥 + 𝑙𝑜𝑔₂ (6𝑥 + 1) = 1, the value of 𝑥 is", "−2/3", "1/2", "2/3", "3/2"],
[37, 37, "Exponential And Logarithm", "The value of 𝑙𝑜𝑔₄(8) − 𝑙𝑜𝑔₄(2) + 𝑙𝑜𝑔₄(1/16) is", "−1", "1/2", "3", "4"],
[38, 38, "Exponential And Logarithm", "The value of 2^𝑧 where 𝑧 = 5 + 𝑙𝑜𝑔₂ 3 is", "𝑙𝑜𝑔₂ 96", "25", "96", "296"],
[39, 39, "Exponential And Logarithm", "2^(−1)/8^(1/3) simplifies to", "1/2", "√2", "1/4", "1/(√2)"],
[40, 40, "Exponential And Logarithm", "The value of x for which 4^(𝑥+1) = 2 is", "−1/2", "0", "1/2", "1"],
[41, 41, "Exponential And Logarithm", "Given that log𝑝𝑋= 6 and log𝑝𝑌= 4, the value of log𝑝(𝑋𝑌) is", "10", "log𝑝2", "log𝑝6/log𝑝4", "2"],
[42, 42, "Exponential And Logarithm", "Given that 𝑙𝑜𝑔₂(𝑥³) = 6, then the value of x is", "2", "4", "8", "64"],
[43, 43, "Exponential And Logarithm", "Given that 3 × 27^(2𝑥)= 9𝑥, the value of x is", "− 1/4", "−1", "1/4", "1"],
[44, 44, "Exponential And Logarithm", "𝑙𝑜𝑔₃(2𝑥 + 1) = 2 + 𝑙𝑜𝑔₃(3𝑥 − 11) is", "5", "23/4", "4", "67/16"],
[45, 45, "Exponential And Logarithm", "The value of x for which 9^(𝑥+1) = 3 is", "−3/2", "−1/2", "3/2", "5/2"],
[46, 46, "Exponential And Logarithm", "The value of x for which 3^(𝑥+2) + 3^𝑥= 90 is", "½(log(90)/log(3)) − 2))", "2", "44", "(log(10)/log(3))"],
[47, 47, "Exponential And Logarithm", "The value of x such that 𝑙𝑜𝑔₂(5𝑥 + 1) − 𝑙𝑜𝑔₂(3𝑥 − 5) = 2 is", "2", "3", "5", "11"],
[48, 48, "Exponential And Logarithm", `Which of the following mathematical statements are true?
𝐼. 𝑙𝑜𝑔ₐ(𝑃𝑄) = 𝑙𝑜𝑔ₐ𝑃 × 𝑙𝑜𝑔ₐ𝑄
𝐼𝐼. 𝑙𝑜𝑔ₐ (𝑃/𝑄) = 𝑙𝑜𝑔ₐ𝑃 − 𝑙𝑜𝑔ₐ𝑄
𝐼𝐼𝐼. 𝑙𝑜𝑔ₐ(𝑃ᵇ) = 𝑏 𝑙𝑜𝑔ₐ𝑃`, "I and II only", "I and III only", "II and III only", "I, II and III"],
[49, 49, "Sum/Product Of Roots", "Given that a and b are the roots of the equation 𝑥² + 3𝑥 + 4 = 0, what is the value of (𝑎 + 𝑏)²?", "9/16", "1", "9", "16"],
[50, 50, "Sum/Product Of Roots", "A quadratic equation is such that the sum of its roots is −2/3 and the product of its roots is 3/4. The quadratic equation is:", "12x² + 8x + 9 = 0", "12x² − 8x − 9 = 0", "12x² − 8x + 9 = 0", "12x² + 8x − 9 = 0"],
[51, 51, "Sum/Product Of Roots", "The quadratic equation is:", "12𝑥² + 8𝑥 + 9 = 0", "12𝑥² − 8𝑥 − 9 = 0", "12𝑥² − 8𝑥 + 9 = 0", "12𝑥² + 8𝑥 − 9 = 0"],
[52, 52, "Nature Of Roots", "The roots of the equation 2𝑥² − 𝑥 + 1 = 0 are", "real and equal", "real and distinct", "not real and equal", "not real and distinct"],
[53, 53, "Nature Of Roots", "The roots of the equation 5𝑥² + 6𝑥 − 2 = 0 are", "not real and not distinct", "not real and not equal", "real and distinct", "real and equal"],
[54, 54, "Nature Of Roots", "The roots of the equation 3𝑥² − 6𝑥 − 5 = 0 are", "equal", "real and distinct", "distinct and not real", "real and not distinct"],
[55, 55, "Function", "If 𝑓(𝑥) = 3𝑥 − 4 and 𝑓(𝑔(𝑥)) = 𝑥, then 𝑔(𝑥) is", "1/(3𝑥 − 4)", "(𝑥 + 4)/3", "3 − 4𝑥", "4𝑥 − 3"],
[56, 56, "Function", "The tables below show the ordered pairs for two functions f and g. The value of 𝑔−1[𝑓(3)] is", "1/2", "2", "5", "7"],
[57, 57, "Function", "A function h is defined by ℎ∶ 𝑥 → 5𝑥 + 2. Expressed in terms of a, ℎ(2𝑎 + 3) is", "10𝑎 + 15", "2𝑎 + 15", "10𝑎 + 17", "5𝑎 + 17"],
[58, 58, "Function", "A function f is defined by 𝑓∶ 𝑥 → 2𝑥 − 1. The function 𝑓² is defined as:", "𝑓² ∶ 𝑥 → 4𝑥² − 4𝑥 + 1", "𝑓² ∶ 𝑥 → 2𝑥² − 1", "𝑓² ∶ 𝑥 → 4𝑥² + 1", "𝑓² ∶ 𝑥 → 4𝑥 − 3"],
[59, 59, "Maximum And Minimum Point", "𝑓(𝑥) = −5 − 8𝑥 − 2𝑥². By completing the square f(x) can be expressed as", "2(𝑥 + 2)² − 4", "4 − 2(𝑥 − 2)²", "3 − 2(𝑥 + 2)²", "3 − 2(𝑥 − 2)²"],
[60, 60, "Maximum And Minimum Point", "For −2 ≤ 𝑥 ≤ 2, the maximum value of 4 – (𝑥 + 1)², and the value of x for which 4 − (𝑥 + 1)² is maximum are respectively", "5 and 1", "2 and −1", "4 and −1", "4 and 1"],
[61, 61, "Maximum And Minimum Point", "The number of visas, V(x), issued by an embassy annually is given by 𝑉(𝑥) = 7x^3 − 42x + 72. The LEAST number of visas issued in a particular year, x, is", "6", "9", "42", "72"],
[62, 62, "Maximum And Minimum Point", "Given that 𝑓(𝑥) = 6 − 𝑥 − 2𝑥² is less than or equal to k, where k ∈ ℝ, then k is equal to", "− 49/8", "− 1/4", "1/4", "49/8"],
[63, 63, "Maximum And Minimum Point", "If 𝑥² − 8𝑥 + 19 = 𝑎(𝑥 + ℎ)² + 𝑘, then", "𝑎 = 1 ℎ = 3 𝑘 = 4", "𝑎 = 1 ℎ = −3 𝑘 = 4", "𝑎 = 1 ℎ = −4 𝑘 = 3", "𝑎 = −1 ℎ = 4 𝑘 = 3"],
[64, 64, "Maximum And Minimum Point", "If 𝑥²− 6𝑥 + 13 = 𝑎(𝑥 + ℎ)² + 𝑘, then", "𝑎 = 1 ℎ = 3 𝑘 = 4", "𝑎 = 1 ℎ = −3 𝑘 = 4", "𝑎 = 1 ℎ = −4 𝑘 = 3", "𝑎 = −1 ℎ = 4 𝑘 = 3"],
[65, 65, "Maximum And Minimum Point", "Given that 𝑓(𝑥) = 𝑎𝑥² + 𝑏𝑥 + 𝑐, then 𝑓(𝑥) can be expressed in the form:", "𝑎(𝑥 + 𝑏/𝑎)² + (𝑎𝑐 – 𝑏²)/𝑎²", "𝑎(𝑥 + 𝑏/2𝑎)^2 + (𝑎𝑐 − 𝑏^2)/𝑎^2", "𝑎(𝑥 + 𝑏/2𝑎)^2 + (4𝑎𝑐 − 𝑏^2)/4𝑎", "𝑎(𝑥 + 𝑏/2𝑎)^2 + (4𝑎𝑐 − 𝑏^2)/4𝑎²"],
[66, 66, "Maximum And Minimum Point", "Given that f(x) = 1 - 4x - 2x², the expression can be written in the form:", "2(𝑥 + 1)² − 3", "3 − 2(𝑥 − 1)²", "3 − 2(𝑥 + 1)²", "3 − (2𝑥 + 1)²"],
[67, 67, "Maximum And Minimum Point", "consider the function 𝑓(𝑥) = 𝑥(1 − 𝑥)?, Which of the following statements BEST describes the graph of this function?", "The graph is a straight line with a positive slope.", "The graph is a parabola opening upwards with a minimum point at x=1/2", "The graph is a parabola opening downwards with a maximum point at x=1/2", "The graph is a parabola opening downwards with no turning"],
[68, 68, "Surd", "The expression (1 + √3)/(√3 − 1) when simplified is equal to", "-1", "1", "(√3+ 2)/2", "√3 + 2"],
[69, 69, "Surd", "(8 + √5)(2 − √5) can be expressed as", "11 − 6√5", "21 − 6√5", "11 + 6√5", "11 + 10√5"],
[70, 70, "Surd", "The expression (√5− 1)/(1 + √5) when simplified is equal to", "1/3(3 − √5)", "1/2(√5 − 3)", "1/3 (√5 − 3)", "1/2 (3 − √5)"],
[71, 71, "Surd", "The expression (1 + √3)/(√3− 1) when simplified is equal to:", "-1", "1", "√3+ 2/2", "√3 + 2"],
[72, 72, "Surd", "The value of √18 + √50 is", "34√2", "6√15", "8√2", "√68"],
[73, 73, "Surd", "4/(√6− 2)", "2(√6 − 2)", "2(√6 + 2)", "√6 − 2", "√6 + 2"],
[74, 74, "Linear & Quadratic Inequality", "The range of values for which 2𝑥² < 5𝑥 + 3 𝑖𝑠", "−1/2 < 𝑥 < 3", "1/2 < 𝑥 < 3", "𝑥 < −1/2 𝑎𝑛𝑑 𝑥 < 3", "𝑥 > −1/2 𝑎𝑛𝑑 𝑥 > 3"],
[75, 75, "Linear & Quadratic Inequality", "The values of x which satisfy the inequality (2𝑥 – 3)/(𝑥 + 1)> 0 are", "𝑥 > −1 𝑎𝑛𝑑 𝑥 > 3/2", "𝑥 > 3/2", "𝑥 < −1 𝑜𝑟 𝑥 > 3/2", "𝑥 > −1"],
[76, 76, "Linear & Quadratic Inequality", "The set of values of x for which 5𝑥 + 7 > 10𝑥 − 13 is", "𝑥 < −4", "𝑥 ≥ −4", "𝑥 < 4", "𝑥 > 4"],
[77, 77, "Linear & Quadratic Inequality", "The range of values of x for which 5𝑥 + 6 ≤ 𝑥² is", "{𝑥∶ −3 ≤ 𝑥 ≤ −2}", "{𝑥∶ 𝑥 ≤ −1} ∪ {𝑥∶ 𝑥 ≥ 6}", "{𝑥∶ 𝑥 ≥ −1} ∪ {𝑥∶ 𝑥 ≥ 6}", "{𝑥∶ −1 ≤ 𝑥 ≤ 6}"],
[78, 78, "Linear & Quadratic Inequality", "The range of values for which 𝑥² − 7𝑥 + 10 < 0 is", "2 > 𝑥 > 5", "2 < 𝑥 < 5", "𝑥 < 2 𝑎𝑛𝑑 𝑥 > 5", "𝑥 < −5 𝑎𝑛𝑑 𝑥 > −5"],
[79, 79, "Linear & Quadratic Inequality", "The set of values of x for which (5x − 2)/(2 − 3x) ≥ 0 is given by:", "{x : x ≥ 2/5 ∪ x > 2/3}", "{x : x ≤ 2/5 ∪ x > 2/3}", "{x : 2/3 < x ≤ 2/5}", "{x : 2/5 ≤ x < 2/3}"],
[80, 80, "Linear & Quadratic Inequality", "Given that x > 0, the set of values of x for which 𝑥 – 2 < 15/𝑥 is:", "(A){𝑥∶ 𝑥 > 0 ∪ 𝑥 > 5}", "(B){𝑥∶ 0 < 𝑥 < 5}", "(C){𝑥∶ 𝑥 > 5}", "(D){𝑥∶ 𝑥 < 5}"],
[81, 81, "Linear & Quadratic Inequality", "The values of x for which (𝑥 + 15)² = 64𝑥 are", "3 𝑎𝑛𝑑 5", "9 𝑎𝑛𝑑 5", "3 𝑎𝑛𝑑 25", "9 𝑎𝑛𝑑 25"],
[82, 82, "Linear & Quadratic Inequality", "The values of x for which 3𝑥 – 2/2𝑥 + 1 ≤ 0 are", "𝑥 ≤ 2/3", "𝑥 > − 1/2", "− 1/2 < 𝑥 ≤ 2/3", "𝑥 ≤ − 1/2 𝑜𝑟 𝑥 ≥ 2/3"],
[83, 83, "Linear & Quadratic Inequality", "The range of values of x for which 4𝑥 − 3𝑥² > 0 is", "− 4/3 < 𝑥 < 0", "𝑥 < 0, 𝑥 > 4/3", "0 < 𝑥 < 4/3", "𝑥 > 0, 𝑥 > 4/3"],
[84, 84, "Equation Of A Circle", "The point (2, 3) is at one end of a diameter of the circle whose equation is 𝑥² + 𝑦² − 10𝑥 + 2𝑦 + 1 = 0. The coordinates of the other end of the diameter are", "(−12, −5)", "(−12, −1)", "(8, −1)", "(8, −5)"],
[85, 85, "Equation Of A Circle", "The radius, r, and the coordinates of the centre, C, of the circle with equation 𝑥² + 𝑦² − 6𝑥 + 4𝑦 − 12 = 0 are", "𝑟 = 5, 𝐶(−2, 3)", "𝑟 = 25, 𝐶(2, −3)", "𝑟 = 12, 𝐶(−3, 2)", "𝑟 = 5, 𝐶(3, −2)"],
[86, 86, "Equation Of A Circle", "The coordinates of the points A and B are (2, -3) and (-10, -5) respectively. The perpendicular bisector to the line AB is given by the equation:", "𝑥 − 6𝑦 + 20 = 0", "6𝑥 + 𝑦 + 28 = 0", "𝑥 + 6𝑦 − 20 = 0", "6𝑥 + 𝑦 − 28 = 0"],
[87, 87, "Equation Of A Circle", "The coordinates of the centre of a circle with equation (𝑥 − 1)² + (𝑦 + 3)² = 36 is", "(1, −3)", "(−1, 3)", "(3, −1)", "(−3, 1)"],
[88, 88, "Equation Of A Circle", "A circle C has centre (3, -2) and radius 4. The equation of C is", "x^2 + y^2 + 6x - 4y + 3 = 0", "x^2 + y^2 - 3 = 0", "x^2 + y^2 - 6x + 4y - 3 = 0", "x^2 + y^2 + 3x - 2y - 3 = 0"],
[89, 89, "Vector", `If the length of the vector 𝑝 − 2𝑖 − 𝑘𝑗 is √13 and k is real, then
I. k = 3
II. k = −3
III. k = √17
IV. k = −√17`, "I or II only", "I or III only", "I or IV only", "II or IV only"],
[90, 90, "Vector", "The value of the real number r for which the two vectors 𝑎 = 4𝑖 + 𝑟𝑗 and 𝑏 = 2𝑖 − 3𝑗 are parallel is", "−6", "3/4", "4/3", "6"],
[91, 91, "Vector", "The position vectors of A and B relative to an origin O are( 2/3 ) and( 7/4 ) respectively. The acute angle AOB is given by", "𝑐𝑜𝑠^−1 ( 2/√65 )", "𝑐𝑜𝑠^−1 ( √26/(13√65) )", "𝑐𝑜𝑠^−1 (√2/√65)", "𝑐𝑜𝑠^−1(26/√13√65)"],
[92, 92, "Vector", "The vector a is given as 5i + 12j. A unit vector parallel to a is", "15𝑖 + 36𝑗", "195𝑖 + 468𝑗", "1/13 (5𝑖 + 12𝑗)", "3/13 (5𝑖 + 12𝑗)"],
[93, 93, "Vector", "Given that OA = [-17 25] and OB = [4 -5], the vector AB =", "[-13 30]", "[-13 -20]", "[-21 20]", "[21 -20]"],
[94, 94, "Vector", "The position vectors of A and B relative to an origin O are (2/5) and (−3/1) respectively. The acute angle AOB is given by", "𝑐𝑜𝑠⁻¹ ( 1/√290 )", "𝑐𝑜𝑠⁻¹ ( 11/√290 )", "𝑐𝑜𝑠⁻¹ ( √11/√290)", "𝑐𝑜𝑠⁻¹ (− 1/√290 )"],
[95, 95, "Vector", "The triangle OAB has vertices given by( 0 0 ), ( 𝑎 0 ) and ( 0 4 ) respectively. Given that the angle AÔB is 𝜋/2 , then a =", "2", "3", "4", "6"],
[96, 96, "Vector", "The position vector of the point P relative to an origin O is given as p = 5i + 2j and the position vector of Q relative to an origin O is given as q = -4i + 10j. Which of the following is TRUE?", "p and q are parallel.", "p and q are perpendicular.", "The acute angle between p and q is 60°.", "The acute angle between p and q is 45°."],
[97, 97, "Trigonometry", "cos(A − B) − cos(A + B) =", "2 sin A sin B", "−2 sin A cos B", "2 cos A sin B", "2 cos A cos B"],
[98, 98, "Trigonometry", "If sin 𝜃= 15/17 and θ is obtuse, then cos θ is equal to", "−8/15", "−8/17", "8/15", "8/17"],
[99, 99, "Trigonometry", "The smallest positive angle for which the equation 𝑠𝑖𝑛 𝜃 + 𝑐𝑜𝑠 𝜃 = 0 is", "𝜋/4", "3𝜋/4", "5𝜋/4", "7𝜋/4"],
[100, 100, "Trigonometry", "For 0 ≤ θ ≤ 2π, solutions for the equation 4 sin² θ − 1 = 0 exist in", "1, 2 and 3", "1, 3 and 4", "2, 3 and 4", "1, 2, 3 and 4"],
[101, 101, "Trigonometry", "2 sin (𝑥 − 𝜋/2)is equal to", "2 sin 𝑥− 2", "−2 cos 𝑥", "2 cos (𝑥 + 𝜋/2)", "2 sin 𝑥− 𝜋"],
[102, 102, "Trigonometry", "For which of the following ranges of values is 𝑓(𝑥) = 2 + 𝑐𝑜𝑠 3𝑥 valid?", "−1 ≤ 𝑓(𝑥) ≤ 3", "1 ≤ 𝑓(𝑥) ≤ 1", "−2 ≤ 𝑓(𝑥) ≤ 2", "0 ≤ 𝑓(𝑥) ≤ 2"],
[103, 103, "Trigonometry", "For 0 ≤ x ≤ 2π, the values of x which satisfy the equation 2 𝑐𝑜𝑠² 𝑥 + 3 𝑠𝑖𝑛 𝑥 = 0 are", "𝑥 = 𝜋/6 , 𝑥 = 5𝜋/6", "𝑥 = 𝜋/6 , 𝑥 = − 5𝜋/6", "𝑥 = 7𝜋/6 , 𝑥 = 11𝜋/6", "𝑥 = 5𝜋/6 , 𝑥 = 7𝜋/6"],
[104, 104, "Trigonometry", "If sin 𝜃= 5/13 and θ is obtuse, then tan θ =", "−12/13", "−5/12", "5/12", "12/13"],
[105, 105, "Trigonometry", "𝑜𝑠(A + B) + 𝑐𝑜𝑠(A − B) =", "2 cos A", "2 cos A + 2 cos B", "cos² A cos² B", "2 cos A cos B"],
[106, 106, "Trigonometry", "If 𝑐𝑜𝑠 2𝑥 = 1 − 2𝑠², then sin x =", "s", "s²", "2s", "1 − s²"],
[107, 107, "Trigonometry", "The exact value of tan 150° is given by", "−1/√3", "1/√3", "−√3", "√3"],
[108, 108, "Trigonometry", "The graph of y = sin 2x is", "Graph A", "Graph B", "Graph C", "Graph D"],
[109, 109, "Trigonometry", "The SMALLEST positive angle for which the equation 𝑠𝑖𝑛 𝜃 − 𝑐𝑜𝑠 𝜃 = 0 𝑓𝑜𝑟 0 ≤ 𝜃 ≤ 2𝜋 is", "𝜋/6", "𝜋/4", "5𝜋/6", "2𝜋/3"],
[110, 110, "Trigonometry", "𝑠𝑖𝑛 (𝛼 + 45°) is equal to", "1/√2 (sin 𝛼+ cos 𝛼)", "1/√2 (cos 𝛼−sin 𝛼)", "1/2 (sin 𝛼−cos 𝛼)", "1/2 (cos 𝛼−sin 𝛼)"],
[111, 111, "Trigonometry", "Convert 4𝜋/5 radians into degrees.", "72", "144", "180", "288"],
[112, 112, "Trigonometry", "The trigonometrical expression 𝑆𝑖𝑛𝑥/(1 − 𝑐𝑜𝑠𝑥)− 𝑠𝑖𝑛𝑥/(1 + 𝑐𝑜𝑠𝑥) is identical to", "2sin𝑥", "2tan𝑥", "2/sin 𝑥", "2/𝑡𝑎𝑛²𝑥"],
[113, 113, "Trigonometry", "The EXACT value of cos ( 5𝜋/12) is:", "1/4 (√6 − √2)", "1/4 (√6 + √2)", "1/2 (√6 + √2)", "1/2 (√6 − √2)"],
[114, 114, "Trigonometry", "The graph shown represents the function:", "𝑐𝑜𝑠 𝑥", "𝑐𝑜𝑠 2𝑥", "1/2 cos 𝑥", "𝑐𝑜𝑠(1/2 𝑥)"],
[115, 115, "Trigonometry", "𝑠𝑖𝑛 50° 𝑐𝑜𝑠 40° − 𝑐𝑜𝑠 50° 𝑠𝑖𝑛 40° =", "sin 10°", "cos 10°", "sin 90°", "cos 90°"],
[116, 116, "Trigonometry", "The size of angle x = 20 degrees, measured in radians, is:", "𝜋/12", "𝜋/9", "𝜋/6", "𝜋/3"],
[117, 117, "Trigonometry", "sin(𝜋/2 − 𝑥) + cos(𝑥 + 𝜋/2) =", "tan𝜋", "sin𝑥 − cos𝑥", "cos𝑥 − sin𝑥", "1 − sin𝑥 − cos𝑥"],
[118, 118, "Trigonometry", "If 𝑠𝑖𝑛(90° − 𝑥) = 𝑐𝑜𝑠 𝑥, then the value of 𝑥 is:", "35°", "45°", "60°", "70°"],
[119, 119, "Radian", "If the area of the semicircle is 32π, what is the length of the arc connecting points A and B?", "4π", "8π", "16π", "32π"],
[120, 120, "Coordinate Geometry", "The coordinates of the points A and B are (2, −3) and (−10, −5) respectively. The perpendicular bisector to the line AB is given by the equation", "𝑥 − 6𝑦 + 20 = 0", "6𝑥 + 𝑦 + 28 = 0", "𝑥 + 6𝑦 − 20 = 0", "6𝑥 + 𝑦 − 28 = 0"],
[121, 121, "Coordinate Geometry", "The lines 2𝑦 − 3𝑥 − 13 = 0 and 𝑦 + 𝑥 + 1 = 0 intersect at the point P, where the coordinates of P are", "(3, 2)", "(3, −2)", "(−3, −2)", "(−5, 2)"],
[122, 122, "Coordinate Geometry", "The lines 7𝑥 − 4𝑦 + 25 = 0 and 3𝑥 − 𝑦 − 5 = 0 intersect at the point P, where", "𝑃 (5, 10)", "𝑃 (−1, 8)", "𝑃 (−9, −32)", "𝑃 (9, 22)"],
[123, 123, "Coordinate Geometry", "The line through the points P(k, 2) and Q(6, 8) is parallel to the line with equation 3𝑥 + 𝑦 − 21 = 0. The value of k is", "1", "4", "8", "24"],
[124, 124, "Coordinate Geometry", "The line through the points Q(h, 2) and R(4, 8) is parallel to the line with equation 2𝑥 + 𝑦 − 10 = 0. The value of h is:", "-7", "2", "1", "7"],
[125, 125, "Coordinate Geometry", "The line 𝑥 + 𝑦 = 1 and the circle 𝑥² + 𝑦² = 5 intersect at the points:", "(2, 1) and (1, 2)", "(−1, 2) and (2, −1)", "(1, −2) and (−2, −1)", "(−1, −2) and (−2, −1)"],
[126, 126, "Calculus", "Given that 𝑦 = (3𝑥 − 2)³, then 𝑑𝑦/𝑑𝑥=", "3(3𝑥 − 2)²", "3(3𝑥)²", "3(3𝑥 − 2)²", "9(3𝑥 − 2)²"],
[127, 127, "Calculus", "Given that y = (3x + 5)/(2x − 11), then dy/dx =", "[(3x + 5)(2)+ (2x − 11)(3)]/(2x − 11)^2", "[(2x − 11)(3)+ (3x + 5)(2)]/(2x − 11)^2", "[(2x − 11)(3)− (3x + 5)(2)]/(2x − 11)^2", "[(3x + 5)(2)− (2x − 11)(3)]/(2x − 11)^2"],
[128, 128, "Calculus", "Given that y = (3x + 5)/(2x − 11), then dy/dx =", "[(3x + 5)(2)+ (2x − 11)(3)]/(2x − 11)^2", "[(2x − 11)(3)+ (3x + 5)(2)]/(2x − 11)^2", "[(2x − 11)(3)− (3x + 5)(2)]/(2x − 11)^2", "[(3x + 5)(2)− (2x − 11)(3)]/(2x − 11)^2"],
[129, 129, "Calculus", "The curve C is given by the equation 𝑦 = 3 𝑠𝑖𝑛 𝑥 + 2. The value of 𝑑𝑦/𝑑𝑥 at the point where 𝑥 = 𝜋/3 is", "1/2", "3/2", "7/2", "3"],
[130, 130, "Calculus", "The point 𝑃 (2, 2) lies on the curve with equation 𝑦 = 𝑥(𝑥 − 3)². The equation of the normal to the curve at the point P is given by", "𝑦 − 2 = 3(𝑥 − 2)", "𝑦 − 2 = −3(𝑥 − 2)", "𝑦 − 2 = ( 1/3) (𝑥 − 2)", "𝑦 − 2 = −( 1/3) (𝑥 − 2)"],
[131, 131, "Calculus", "The curve C is given by the equation 𝑦 = 4𝑥 + 9/𝑥. The second derivative, (d^2y)/(dx^2), is given by", "4 + 9/x^3", "18/x^3", "4 − 9/x^3", "9/(2x^3)"],
[132, 132, "Calculus", "The positive value of z for which ∫x^2𝑑𝑥 = 9 when x=0 to x = z is", "3", "4.5", "9", "27"],
[133, 133, "Calculus", "The gradient of the tangent to a curve C at (x, y) is given by 𝑑𝑦/𝑑𝑥= 1/(3𝑥 + 4)². The curve passes through the point 𝑃(− 1/2 , 3). The equation of the curve C is given by", "𝑦 = 2/(3𝑥 + 4) + 1", "𝑦 = − 6/(3𝑥 + 4)", "𝑦 = − 2/(3𝑥 + 4) + 4", "𝑦 = − 1/(3𝑥 + 4) + 1"],
[134, 134, "Calculus", "The finite region R is bounded by the y-axis, the x-axis, and the curve 𝑦 = 𝑥(𝑥 − 3)² as shown in the figure above. The area of R in square units is", "1", "3", "9", "27"],
[135, 135, "Calculus", "The finite region enclosed by the curve y = x^2, the x-axis and the line x = 2 is rotated completely about the x-axis. The volume of the solid of revolution formed is given by:", "∫_0^2(1/3)x^2 dx", "∫_0^2 x^4 dx", "π ∫_0^2 x^2 dx", "π ∫_0^2 x^4 dx"],
[136, 136, "Calculus", "The finite region enclosed by the curve 𝑦 = √𝑥, 𝑥 ≥ 0, the x-axis and the line x = 3, as shown in the figure above, is rotated completely about the x-axis. The volume of the solid of revolution formed is given by", "∫₀³ ( 1/3) √𝑥 dx", "𝜋 ∫₀³𝑥 𝑑𝑥", "𝜋 ∫₀³√𝑥 𝑑𝑥", "𝜋 ∫₀³𝑥² 𝑑𝑥"],
[137, 137, "Calculus", "∫(2𝑥 + 3)^5 dx =", "[1/6 (2𝑥 + 3)6] + C", "[1/2 (2𝑥 + 3)6] + C", "[1/12 (2𝑥 + 3)6] + C", "[1/3 (2𝑥 + 3)6] + C"],
[138, 138, "Calculus", "Given 𝑑𝑦/𝑑𝑥= 3 sin 𝑥− 2 cos x, the indefinite integral is given by", "𝑦 = 3 cos𝑥 − 2 sin𝑥 + C", "𝑦 = −3 cos𝑥 + 2 sin𝑥 + C", "𝑦 = −3 cos 𝑥− 2 sin 𝑥+ C", "𝑦 = 3 cos 𝑥+ 2 sin 𝑥+ C"],
[139, 139, "Calculus", "Given that 𝑦 = √(5 – 𝑥), then 𝑑𝑦/𝑑𝑥 is:", "− 1/(√5 − 𝑥)", "1/(√5 − 𝑥)", "1/(2√5 − 𝑥)", "− 1/(2√5 − 𝑥)"],
[140, 140, "Calculus", "The gradient function dy/dx of the curve 𝑦 = 𝑠𝑖𝑛(2𝑥² + 1) is:", "4𝑥 𝑐𝑜𝑠(2𝑥² + 1)", "𝑐𝑜𝑠(2𝑥² + 1)", "(1/4𝑥)cos(2𝑥² + 1)", "−4𝑥 𝑐𝑜𝑠(2𝑥² + 1)"],
[141, 141, "Calculus", "The point P(1, 1) lies on the curve 𝑦 = (3𝑥 – 2)/(2𝑥 – 1). The gradient of the tangent at point P is:", "1", "3/2", "5", "−1"],
[142, 142, "Calculus", "The curve C has the equation 𝑦 = 𝑓(𝑥). Curve C has a stationary point at (-1, 2). If 𝑓′′(𝑥) = (6/𝑥⁴) + 2, then the point (-1, 2) is:", "an optimum point", "a point of inflexion", "a minimum turning point", "a maximum turning point"],
[143, 143, "Calculus", "𝐼𝑓 ∫𝑓(𝑥) 𝑑𝑥 = 6 when x = 1 to 4, then ∫𝑓(𝑥) dx + 5 when x = 1 to 4", "9", "11", "29", "44"],
[144, 144, "Calculus", "The region R is enclosed by the x-axis, the curve 𝑦 = −𝑥² + 2 and the lines 𝑥 = 0 and 𝑥 = 1. The area of R is:", "1", "5/3", "2", "7/3"],
[145, 145, "Calculus", "The region in the first quadrant enclosed by the curve 𝑦 = 𝑥 – (1/2)𝑥², the lines 𝑥 = 0 and 𝑥 = 2 is rotated completely about the x-axis. The volume in 𝑢𝑛𝑖𝑡𝑠3 of the solid generated is:", "2𝜋/3", "8𝜋", "4𝜋/15", "64𝜋/15"],
[146, 146, "Calculus", "Given that d/dx(x/(1+x))= 1/(1 + x)^2, then ∫3/(1 + x)^2 dx where x = 0 to 2 is equal to:", "−1/3", "1/3", "2/3", "2"],
[147, 147, "Calculus", "The equation of a curve is given by y = (𝑥^2 + 2)(𝑥 – 1)^3. The gradient function, 𝑑𝑦/𝑑𝑥, is given by:", "(𝑥 − 1)(5𝑥² − 2𝑥 + 6)", "(𝑥 − 1)²(−𝑥² − 2𝑥 − 6)", "(𝑥 − 1)²(5𝑥² − 2𝑥 + 6)", "(𝑥 − 1)²(5𝑥² + 2𝑥 + 6)"],
[148, 148, "Kinematics Question", "During the journey there is a stage when the boy accelerates. His velocity increased from 10 m/s to 20 m/s in 4 seconds. The value of the acceleration is:", "− 10.0 𝑚𝑠⁻²", "2.5 𝑚𝑠⁻²", "3.5 𝑚𝑠⁻²", "20.0 𝑚𝑠⁻²"],
[149, 149, "Kinematics Question", "At the 10 m stopping point on a runway, an airplane is stationary before takeoff. If the plane travels 120 m from this point in 4 seconds, what is its speed at the point of takeoff?", "32 m/s", "27 m/s", "30 m/s", "50 m/s"],
[150, 150, "Statistics", "There are 108 cards in a deck of UNO playing cards. There are four “Wild”, four “Wild Draw Four” and 25 each of four colours (red, yellow, green, blue). If a player needs to select 1 card, what is the probability of NOT drawing a “Wild Draw Four”?", "26/27", "25/108", "2/27", "1/108"],
[151, 151, "Statistics", "One advantage of using a box and whisker plot is that:", "the variance can be identified", "all data values can be identified", "the mean value can be identified", "the spread of the distribution can be identified."],
[152, 152, "Statistics", "What is the value of p(N or G)' given that p(N) = 0.40, p(G) = 0.15 and the p(N and G) = 0.35?", "0.10", "0.35", "0.90", "1.00"],
[153, 153, "Statistics", "What is P(N | G)?", "0.10", "0.40", "0.47", "0.70"],
[154, 154, "Statistics", "The tree diagram above shows the probability of Events A and B occurring. Based on the diagram, the value of P(A | B) =", "1/5", "8/15", "3/5", "4/5"]];

    const ANSWER_KEY = {1:'C',2:'D',3:'C',4:'A',5:'A',6:'A',7:'A',8:'D',9:'A',10:'C',11:'D',12:'C',13:'A',14:'D',15:'B',16:'B',17:'C',19:'C',20:'B',21:'D',22:'A',23:'B',24:'D',25:'C',26:'A',27:'A',28:'C',29:'B',30:'D',31:'C',32:'C',33:'D',34:'D',35:'A',36:'B',37:'A',38:'C',39:'C',40:'A',41:'A',42:'B',43:'A',44:'C',45:'B',46:'B',47:'B',48:'C',49:'C',50:'A',52:'D',53:'C',54:'B',55:'B',57:'C',58:'D',59:'C',60:'C',62:'D',63:'C',64:'B',65:'C',66:'C',67:'C',68:'D',69:'A',70:'D',71:'D',72:'C',73:'B',74:'A',75:'C',76:'C',77:'B',78:'B',79:'D',80:'B',81:'D',82:'C',83:'C',84:'D',85:'D',86:'B',87:'A',88:'C',89:'A',90:'A',91:'D',92:'C',94:'A',96:'B',97:'A',98:'B',99:'B',100:'D',101:'B',102:'B',103:'C',104:'B',105:'D',106:'A',107:'A',109:'B',110:'A',111:'B',113:'A',115:'A',116:'B',117:'C',119:'B',120:'B',122:'D',123:'C',124:'D',125:'B',126:'D',127:'C',128:'C',129:'B',130:'C',131:'B',132:'A',135:'D',136:'B',137:'C',138:'C',139:'D',140:'A',141:'A',142:'C',143:'C',144:'B',145:'C',146:'D',147:'C',148:'B',150:'A',151:'D',152:'A',153:'D'};
    const EXCLUDED_IDS = new Set([18, 51]);
    const AUDIT_NOTES = [
      'Items 18 and 51 are hidden because they were marked duplicate/incomplete in the original app.',
      'Some figure/table-dependent questions remain unscored until diagrams or tables are added.',
      'Exam mode is fixed at 45 questions and 90 minutes.',
      'Optional record syncing uses a private HTTP endpoint. Local browser storage remains the offline fallback.'
    ];
    const STORAGE_ATTEMPTS = 'csec-addmaths-static-attempts';
    const STORAGE_TEACHER = 'csec-addmaths-static-teacher-unlocked';
    const STORAGE_FLOW_URL = 'csec-addmaths-record-sync-url';
    const STORAGE_FLOW_URL_DISABLED = 'csec-addmaths-record-sync-url-disabled';
    const const DEFAULT_RECORD_SYNC_URL = 'https://default4637e720864b4700b2707cab63af0c.30.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ca4750743180420a9ae2cc1192a10801/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=S8Q9vmOv1OfhqI56dDqCJ7RPc02jscDbdBZcm8sPnj4';
    const decodeAccessValue = (value) => atob(value);
    const PARENT_CODE = decodeAccessValue('cGFyZW50MjAyNg==');
    const TEACHER_CODE = decodeAccessValue('bWF0aGVtYXRpY3MyMDI2');
    const PRACTICE_CODE = decodeAccessValue('cHJhY3RpY2UyMDI2');
    const EXAM_QUESTION_COUNT = 45;
    const EXAM_DURATION_SECONDS = 90 * 60;

    const state = {
      role: 'student',
      parentUnlocked: false,
      teacherUnlocked: localStorage.getItem(STORAGE_TEACHER) === '1',
      setup: { name: '', email: '', school: '', mode: 'practice', count: 10, code: '', selectedTopics: [] },
      quiz: null,
      timer: null,
      startedAt: null,
      elapsed: 0,
    };

    function buildQuestion(row) {
      const [id, sourceNumber, topic, stem, A, B, C, D] = row;
      if (EXCLUDED_IDS.has(id)) return null;
      return {
        id, sourceNumber,
        topic: id === 147 ? 'Calculus' : topic,
        subtopic: id === 147 ? 'Calculus' : topic,
        stem: id === 72 ? 'The value of √18 + √50 is' : stem,
        options: { A, B, C, D },
        correctAnswer: ANSWER_KEY[id] || null,
        source: `Item ${sourceNumber}`
      };
    }
    const QUESTION_BANK = RAW_QUESTION_BANK.map(buildQuestion).filter(Boolean);
    const AVAILABLE_TOPICS = [...new Set(QUESTION_BANK.map(q => q.topic))].sort((a,b) => a.localeCompare(b));

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const escapeHtml = (value = '') => String(value)
      .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
    function rich(text = '') {
      let html = escapeHtml(text);
      html = html.replace(/([A-Za-z0-9\)\]])\^\(?([A-Za-z0-9+\-]+)\)?/g, '$1<sup>$2</sup>');
      html = html.replace(/\n/g, '<br>');
      return html;
    }
    function readAttempts() {
      try { return JSON.parse(localStorage.getItem(STORAGE_ATTEMPTS) || '[]'); } catch { return []; }
    }
    function writeAttempts(attempts) { localStorage.setItem(STORAGE_ATTEMPTS, JSON.stringify(attempts)); }
    function saveAttempt(attempt) {
      const attempts = readAttempts().filter(item => item.id !== attempt.id);
      attempts.unshift(attempt);
      writeAttempts(attempts);
      saveAttemptToRecordSync(attempt).catch(error => {
        console.warn('Online save failed; kept locally.', error);
      });
    }
    function mergeAttempts(incoming = [], existing = readAttempts()) {
      const map = new Map();
      [...incoming, ...existing].forEach(attempt => {
        if (!attempt) return;
        const safeId = attempt.id || id();
        map.set(safeId, { ...attempt, id: safeId });
      });
      return [...map.values()].sort((a, b) => new Date(b.submittedAt || b.startedAt || 0) - new Date(a.submittedAt || a.startedAt || 0));
    }
    function getRecordSyncUrl() {
      if (localStorage.getItem(STORAGE_FLOW_URL_DISABLED) === '1') return '';
      return localStorage.getItem(STORAGE_FLOW_URL) || DEFAULT_RECORD_SYNC_URL;
    }
    function setRecordSyncUrl(url) {
      if (url && url.trim()) {
        localStorage.setItem(STORAGE_FLOW_URL, url.trim());
        localStorage.removeItem(STORAGE_FLOW_URL_DISABLED);
      } else {
        localStorage.removeItem(STORAGE_FLOW_URL);
        localStorage.setItem(STORAGE_FLOW_URL_DISABLED, '1');
      }
    }
    async function recordSyncRequest(action, payload = {}) {
      const url = getRecordSyncUrl();
      if (!url) throw new Error('Record sync URL is not configured.');
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app: 'csec-additional-maths-static-site',
          action,
          payload,
          sentAt: new Date().toISOString()
        })
      });
      const responseText = await response.text();
      let data = null;
      try { data = responseText ? JSON.parse(responseText) : null; } catch { data = responseText; }
      if (!response.ok) throw new Error(typeof data === 'string' ? data : (data?.message || `Record sync request failed (${response.status}).`));
      return data;
    }
    function normaliseAttemptFromRecordSyncRow(row) {
      if (!row) return null;
      if (row.payload && typeof row.payload === 'object') return row.payload;
      if (row.Payload && typeof row.Payload === 'object') return row.Payload;
      if (row.payload && typeof row.payload === 'string') {
        try { return JSON.parse(row.payload); } catch { /* ignore */ }
      }
      if (row.Payload && typeof row.Payload === 'string') {
        try { return JSON.parse(row.Payload); } catch { /* ignore */ }
      }
      if (row.id || row.Id || row.Title || row.StudentName) {
        return {
          id: row.AttemptId || row.id || row.Title || String(row.Id || id()),
          studentName: row.StudentName || row.studentName || 'Student',
          studentEmail: row.StudentEmail || row.studentEmail || '',
          schoolName: row.SchoolName || row.schoolName || '',
          mode: row.Mode || row.mode || 'practice',
          selectedTopics: typeof row.SelectedTopics === 'string' ? row.SelectedTopics.split(',').map(item => item.trim()).filter(Boolean) : (row.selectedTopics || []),
          questionCount: Number(row.QuestionCount || row.questionCount || 0),
          startedAt: row.StartedAt || row.startedAt || row.SubmittedAt || new Date().toISOString(),
          submittedAt: row.SubmittedAt || row.submittedAt || new Date().toISOString(),
          durationMinutes: Number(row.DurationMinutes || row.durationMinutes || 0),
          answers: row.Answers ? JSON.parse(row.Answers) : (row.answers || []),
          questions: row.Questions ? JSON.parse(row.Questions) : (row.questions || []),
          score: Number(row.Score || row.score || 0),
          percentage: Number(row.Percentage || row.percentage || 0),
          scoredQuestionCount: Number(row.ScoredQuestionCount || row.scoredQuestionCount || row.QuestionCount || 0),
          integrityEvents: row.IntegrityEvents ? JSON.parse(row.IntegrityEvents) : (row.integrityEvents || []),
          teacherFeedback: row.TeacherFeedback || row.teacherFeedback || ''
        };
      }
      return null;
    }
    function normaliseRecordSyncAttempts(data) {
      const raw = Array.isArray(data) ? data : Array.isArray(data?.attempts) ? data.attempts : Array.isArray(data?.value) ? data.value : [];
      return raw.map(normaliseAttemptFromRecordSyncRow).filter(Boolean);
    }
    async function saveAttemptToRecordSync(attempt) {
      if (!getRecordSyncUrl()) return;
      return recordSyncRequest('saveAttempt', { attempt });
    }
    async function loadAttemptsFromRecordSync() {
      const data = await recordSyncRequest('listAttempts');
      const remoteAttempts = normaliseRecordSyncAttempts(data);
      const merged = mergeAttempts(remoteAttempts, readAttempts());
      writeAttempts(merged);
      return merged;
    }
    async function saveFeedbackToRecordSync(attemptId, feedback, attempt) {
      if (!getRecordSyncUrl()) return;
      return recordSyncRequest('saveFeedback', { attemptId, feedback, attempt });
    }
    function shuffle(items) {
      const copy = [...items];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }
    function formatTime(seconds) { return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`; }
    function id() { return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`; }
    function setRole(role) {
      state.role = role;
      $$("[data-role-button]").forEach(btn => btn.classList.toggle('active', btn.dataset.roleButton === role));
      $('#studentView').classList.toggle('hidden', role !== 'student');
      $('#parentView').classList.toggle('hidden', role !== 'parent');
      $('#teacherView').classList.toggle('hidden', role !== 'teacher');
      render();
    }

    function render() {
      if (state.role === 'student') renderStudent();
      if (state.role === 'parent') renderParent();
      if (state.role === 'teacher') renderTeacher();
    }

    function renderStudent() {
      const root = $('#studentView');
      if (state.quiz?.submitted) return renderSubmitted(root);
      if (state.quiz?.questions?.length) return renderQuiz(root);
      const s = state.setup;
      root.innerHTML = `
        <div class="grid two">
          <section class="card">
            <div class="card-header">
              <h2>Let’s set up your quiz</h2>
              <p class="desc">Students enter details, choose topics, and start when ready.</p>
            </div>
            <div class="card-content">
              <div class="grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
                <div class="field"><label>Your name</label><input id="studentName" value="${escapeHtml(s.name)}" placeholder="Type your full name"></div>
                <div class="field"><label>Email address</label><input id="studentEmail" type="email" value="${escapeHtml(s.email)}" placeholder="Type your email address"></div>
              </div>
              <div class="field"><label>School name</label><input id="schoolName" value="${escapeHtml(s.school)}" placeholder="Type your school name"></div>
              <div class="field">
                <div class="row" style="justify-content: space-between; margin-bottom: 10px;"><label style="margin:0">Pick your topics</label><button class="btn secondary" id="selectAllTopics">${s.selectedTopics.length === AVAILABLE_TOPICS.length ? 'Clear all' : 'Select all'}</button></div>
                <div class="topic-grid">${AVAILABLE_TOPICS.map(topic => `<button class="topic-btn ${s.selectedTopics.includes(topic) ? 'selected' : ''}" data-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>`).join('')}</div>
              </div>
              <div class="grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
                <div class="field"><label>Mode</label><select id="mode"><option ${s.mode === 'practice' ? 'selected' : ''}>practice</option><option ${s.mode === 'trial' ? 'selected' : ''}>trial</option><option ${s.mode === 'exam' ? 'selected' : ''}>exam</option></select></div>
                <div class="field"><label>Question count</label><input id="questionCount" type="number" min="1" max="80" value="${s.mode === 'exam' ? EXAM_QUESTION_COUNT : s.count}" ${s.mode === 'exam' ? 'disabled' : ''}><p class="desc">${s.mode === 'exam' ? 'Exam mode is fixed at 45 questions.' : 'Choose any available practice/trial size.'}</p></div>
                <div class="field"><label>${s.mode === 'exam' ? 'Exam access code' : s.mode === 'trial' ? 'No code needed' : 'Practice passcode'}</label><input id="accessCode" ${s.mode === 'trial' ? 'disabled' : ''} value="${escapeHtml(s.code)}" placeholder="${s.mode === 'practice' ? 'Enter practice passcode' : s.mode === 'exam' ? 'teacher-issued code' : 'trial mode'}"></div>
              </div>
              <div class="actions"><button class="btn primary" id="startQuiz">Start quiz</button></div>
            </div>
          </section>
          <aside class="card">
            <div class="card-header"><h2>Quiz information</h2></div>
            <div class="card-content">
              <ul class="list">
                <li>Practice mode requires authorized access.</li>
                <li>Trial mode does not require a code.</li>
                <li>Exam mode is fixed at <strong>45 questions</strong> and <strong>90 minutes</strong>; it can request fullscreen and records integrity notes.</li>
                <li>Results can be reviewed later by authorized users.</li>
                <li>Parent and teacher views require authorized access codes.</li>
              </ul>
              <div class="splitline"></div>
              <div class="note warn"><strong>Static hosting note:</strong> upload this <code>index.html</code> to Netlify, GitHub Pages, Vercel, or any web server.</div>
            </div>
          </aside>
        </div>`;
      bindSetup();
    }

    function bindSetup() {
      const bind = (idName, prop) => $(`#${idName}`).addEventListener('input', e => state.setup[prop] = e.target.value);
      bind('studentName', 'name'); bind('studentEmail', 'email'); bind('schoolName', 'school');
      $('#mode').addEventListener('change', e => { state.setup.mode = e.target.value; if (e.target.value === 'trial') state.setup.code = ''; if (e.target.value === 'exam') state.setup.count = EXAM_QUESTION_COUNT; renderStudent(); });
      $('#questionCount')?.addEventListener('input', e => state.setup.count = Math.max(1, Number(e.target.value) || 1));
      $('#accessCode')?.addEventListener('input', e => state.setup.code = e.target.value);
      $$('.topic-btn').forEach(btn => btn.addEventListener('click', () => {
        const topic = btn.dataset.topic;
        state.setup.selectedTopics = state.setup.selectedTopics.includes(topic)
          ? state.setup.selectedTopics.filter(t => t !== topic)
          : [...state.setup.selectedTopics, topic];
        renderStudent();
      }));
      $('#selectAllTopics').addEventListener('click', () => { state.setup.selectedTopics = state.setup.selectedTopics.length === AVAILABLE_TOPICS.length ? [] : [...AVAILABLE_TOPICS]; renderStudent(); });
      $('#startQuiz').addEventListener('click', startQuiz);
    }

    async function startQuiz() {
      const s = state.setup;
      if (!s.name.trim()) return alert('Enter your name before starting.');
      if (!s.selectedTopics.length) return alert('Select at least one topic.');
      if (s.mode === 'practice' && s.code.trim() !== PRACTICE_CODE) return alert('That access code is not correct.');
      if (s.mode === 'exam' && !s.code.trim()) return alert('Enter the exam access code given by your teacher.');
      if (s.mode === 'exam' && document.documentElement.requestFullscreen) {
        try { await document.documentElement.requestFullscreen(); } catch { /* continue for browsers that block it */ }
      }
      const pool = QUESTION_BANK.filter(q => s.selectedTopics.includes(q.topic));
      const targetCount = s.mode === 'exam' ? EXAM_QUESTION_COUNT : Math.max(1, Number(s.count) || 10);
      if (s.mode === 'exam' && pool.length < EXAM_QUESTION_COUNT) return alert(`Exam mode needs at least ${EXAM_QUESTION_COUNT} questions from the selected topics. Select more topics or choose Select all.`);
      const questions = shuffle(pool).slice(0, Math.min(targetCount, pool.length)).map(q => ({...q, order: shuffle(['A','B','C','D'])}));
      if (!questions.length) return alert('No questions are available for the selected topics.');
      state.quiz = { questions, current: 0, answers: {}, integrity: [], submitted: null };
      state.startedAt = new Date().toISOString();
      state.elapsed = 0;
      if (state.timer) clearInterval(state.timer);
      state.timer = setInterval(() => {
        state.elapsed += 1;
        if (state.setup.mode === 'exam' && state.elapsed >= EXAM_DURATION_SECONDS && state.quiz && !state.quiz.submitted) {
          state.quiz.integrity.push({ type: 'time_expired', at: new Date().toISOString(), details: 'Exam time expired after 90 minutes.' });
          submitQuiz(true);
          return;
        }
        renderQuizHeaderOnly();
      }, 1000);
      document.addEventListener('visibilitychange', recordVisibility, { passive: true });
      renderStudent();
    }
    function recordVisibility() {
      if (!state.quiz || state.quiz.submitted) return;
      state.quiz.integrity.push({ type: document.hidden ? 'tab_blur' : 'tab_focus', at: new Date().toISOString(), details: document.hidden ? 'Student switched away from the quiz tab.' : 'Student returned to the quiz tab.' });
    }
    function renderQuizHeaderOnly() {
      const time = $('#elapsedTime');
      if (time) time.textContent = state.setup.mode === 'exam' ? `Time left: ${formatTime(Math.max(0, EXAM_DURATION_SECONDS - state.elapsed))}` : formatTime(state.elapsed);
    }
    function renderQuiz(root) {
      const q = state.quiz.questions[state.quiz.current];
      const selected = state.quiz.answers[q.id];
      root.innerHTML = `
        <div class="topbar">
          <div>Student: <strong>${escapeHtml(state.setup.name || 'Unnamed student')}</strong>${state.setup.email ? ` · <span style="color:#64748b">${escapeHtml(state.setup.email)}</span>` : ''}</div>
          <div class="row">
            <div class="progress-wrap"><div class="progress-label"><span>Progress</span><span>${state.quiz.current + 1}/${state.quiz.questions.length}</span></div><div class="progress"><span style="width:${((state.quiz.current + 1) / state.quiz.questions.length) * 100}%"></span></div></div>
            <span class="badge" id="elapsedTime">${state.setup.mode === 'exam' ? `Time left: ${formatTime(Math.max(0, EXAM_DURATION_SECONDS - state.elapsed))}` : formatTime(state.elapsed)}</span>
          </div>
        </div>
        <section class="card">
          <div class="card-header">
            <div class="row"><span class="badge">Question ${state.quiz.current + 1} of ${state.quiz.questions.length}</span><span class="badge dark">${escapeHtml(q.subtopic)}</span>${q.correctAnswer ? '<span class="badge green">verified key</span>' : '<span class="badge red">unscored</span>'}</div>
          </div>
          <div class="card-content">
            <div class="question-box"><div class="question-label">Question</div><div class="question-text">${rich(q.stem)}</div></div>
            <div class="option-grid">${q.order.map(letter => `<button class="option ${selected === letter ? 'selected' : ''}" data-answer="${letter}"><span class="letter">${letter}</span><span>${rich(q.options[letter])}</span></button>`).join('')}</div>
            <div class="splitline"></div>
            <div class="actions" style="justify-content: space-between">
              <div class="actions"><button class="btn" id="prevQuestion" ${state.quiz.current === 0 ? 'disabled' : ''}>Previous</button><button class="btn" id="nextQuestion" ${state.quiz.current === state.quiz.questions.length - 1 ? 'disabled' : ''}>Next</button></div>
              <div class="actions"><button class="btn danger" id="cancelQuiz">Cancel quiz</button><button class="btn primary" id="submitQuiz">Submit quiz</button></div>
            </div>
          </div>
        </section>`;
      $$('.option').forEach(btn => btn.addEventListener('click', () => { state.quiz.answers[q.id] = btn.dataset.answer; renderQuiz(root); }));
      $('#prevQuestion').addEventListener('click', () => { state.quiz.current = Math.max(0, state.quiz.current - 1); renderStudent(); });
      $('#nextQuestion').addEventListener('click', () => { state.quiz.current = Math.min(state.quiz.questions.length - 1, state.quiz.current + 1); renderStudent(); });
      $('#cancelQuiz').addEventListener('click', resetQuiz);
      $('#submitQuiz').addEventListener('click', () => { if (confirm('Submit this quiz now? You cannot change answers after submitting.')) submitQuiz(false); });
    }
    function submitQuiz(autoSubmitted = false) {
      const verifiedQuestions = state.quiz.questions.filter(q => q.correctAnswer);
      const score = verifiedQuestions.filter(q => state.quiz.answers[q.id] === q.correctAnswer).length;
      const percentage = verifiedQuestions.length ? Math.round((score / verifiedQuestions.length) * 100) : 0;
      if (state.elapsed > 0 && state.elapsed < state.quiz.questions.length * 12) state.quiz.integrity.push({ type: 'very_fast_finish', at: new Date().toISOString(), details: 'Quiz submitted very quickly compared with number of questions.' });
      const attempt = {
        id: id(),
        studentName: state.setup.name.trim(),
        studentEmail: state.setup.email.trim(),
        schoolName: state.setup.school.trim(),
        mode: state.setup.mode,
        selectedTopics: [...state.setup.selectedTopics],
        questionCount: state.quiz.questions.length,
        startedAt: state.startedAt,
        submittedAt: new Date().toISOString(),
        durationMinutes: Math.max(1, Math.round(state.elapsed / 60)),
        answers: state.quiz.questions.map(q => ({ questionId: q.id, selected: state.quiz.answers[q.id] || '', isCorrect: q.correctAnswer ? state.quiz.answers[q.id] === q.correctAnswer : undefined })),
        questions: state.quiz.questions,
        score,
        percentage,
        scoredQuestionCount: verifiedQuestions.length,
        integrityEvents: autoSubmitted ? [...state.quiz.integrity, { type: 'auto_submit', at: new Date().toISOString(), details: 'The exam was submitted automatically.' }] : state.quiz.integrity,
        teacherFeedback: ''
      };
      saveAttempt(attempt);
      state.quiz.submitted = attempt;
      clearInterval(state.timer);
      document.removeEventListener('visibilitychange', recordVisibility);
      if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => undefined);
      renderStudent();
    }
    function resetQuiz() {
      if (state.timer) clearInterval(state.timer);
      state.quiz = null; state.startedAt = null; state.elapsed = 0; state.setup.code = '';
      document.removeEventListener('visibilitychange', recordVisibility);
      if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => undefined);
      renderStudent();
    }
    function renderSubmitted(root) {
      const attempt = state.quiz.submitted;
      root.innerHTML = `
        <section class="card">
          <div class="card-header"><h2>Quiz submitted</h2><p class="desc">${escapeHtml(attempt.studentName)}, here is your result summary.</p></div>
          <div class="card-content">
            <div class="grid four">
              <div class="stat"><small>Score</small><strong>${attempt.score}/${attempt.scoredQuestionCount}</strong></div>
              <div class="stat"><small>Percentage</small><strong>${attempt.percentage}%</strong></div>
              <div class="stat"><small>Duration</small><strong>${attempt.durationMinutes} min</strong></div>
              <div class="stat"><small>Flags</small><strong>${attempt.integrityEvents.length}</strong></div>
            </div>
            <div class="splitline"></div>
            ${attempt.questions.map((q, index) => {
              const answer = attempt.answers.find(a => a.questionId === q.id);
              const isCorrect = answer?.isCorrect;
              return `<article class="card result-item"><div class="card-header"><div class="row" style="justify-content:space-between"><div><span class="badge">Question ${index + 1}</span><h3 style="margin-top:10px">${escapeHtml(q.topic)}</h3></div><span class="badge ${q.correctAnswer ? (isCorrect ? 'green' : 'red') : ''}">${q.correctAnswer ? (isCorrect ? 'Correct' : 'Incorrect') : 'Unscored'}</span></div></div><div class="card-content"><div class="question-box"><div class="question-label">Question</div><div>${rich(q.stem)}</div></div><div class="option-grid">${(q.order || ['A','B','C','D']).map(letter => {
                const classes = answer?.selected === letter && q.correctAnswer === letter ? 'correct' : answer?.selected === letter && q.correctAnswer !== letter ? 'wrong' : q.correctAnswer === letter ? 'correct' : '';
                return `<div class="option ${classes}" style="cursor:default; transform:none"><span class="letter">${letter}</span><span>${rich(q.options[letter])}</span></div>`;
              }).join('')}</div>${q.correctAnswer ? `<p class="note good" style="margin-top:14px">Correct answer: <strong>${q.correctAnswer}</strong></p>` : `<p class="note warn" style="margin-top:14px">This item has no verified answer key in the static bank, so it was not scored.</p>`}</div></article>`;
            }).join('')}
            <div class="actions" style="margin-top:18px"><button class="btn primary" id="anotherQuiz">Set up another quiz</button><button class="btn" onclick="window.print()">Print result</button></div>
          </div>
        </section>`;
      $('#anotherQuiz').addEventListener('click', resetQuiz);
    }

    function renderParent() {
      const root = $('#parentView');
      if (!state.parentUnlocked) {
        root.innerHTML = `<div class="grid two"><section class="card"><div class="card-header"><h2>Parent access</h2><p class="desc">Enter the parent access code to view student results.</p></div><div class="card-content"><div class="field"><label>Parent access code</label><input id="parentCode" type="password" placeholder="Enter parent code"></div><div class="actions"><button class="btn primary" id="unlockParent">Open parent view</button></div></div></section><aside class="card"><div class="card-header"><h2>Parent security</h2></div><div class="card-content"><p class="note">This read-only view searches available student records. Access is restricted to authorized users.</p></div></aside></div>`;
        $('#unlockParent').addEventListener('click', () => { if ($('#parentCode').value === PARENT_CODE) { state.parentUnlocked = true; renderParent(); } else alert('That parent access code is not correct.'); });
        return;
      }
      const attempts = readAttempts();
      root.innerHTML = `<section class="card"><div class="card-header"><div class="row" style="justify-content:space-between"><div><h2>Parent view</h2><p class="desc">Look up completed quizzes by student email or name.</p></div><button class="btn secondary" id="lockParent">Lock parent view</button></div></div><div class="card-content"><div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div class="field"><label>Student email</label><input id="parentEmail" type="email"></div><div class="field"><label>Student name</label><input id="parentName"></div></div><div class="actions"><button class="btn primary" id="searchParent">View student results</button><button class="btn" id="syncParentRecordSync">Refresh results</button><button class="btn" id="clearParent">Clear</button></div><div id="parentResults" style="margin-top:18px"></div></div></section>`;
      $('#lockParent').addEventListener('click', () => { state.parentUnlocked = false; renderParent(); });
      $('#clearParent').addEventListener('click', () => { $('#parentEmail').value = ''; $('#parentName').value = ''; $('#parentResults').innerHTML = ''; });
      $('#syncParentRecordSync').addEventListener('click', async () => {
        const target = $('#parentResults');
        try {
          target.innerHTML = '<p class="note">Refreshing records...</p>';
          await loadAttemptsFromRecordSync();
          target.innerHTML = '<p class="note good">Results refreshed. Search again to view the latest records.</p>';
        } catch (error) {
          target.innerHTML = `<p class="note warn">Refresh failed: ${escapeHtml(error.message || String(error))}</p>`;
        }
      });
      $('#searchParent').addEventListener('click', () => {
        const email = $('#parentEmail').value.trim().toLowerCase();
        const name = $('#parentName').value.trim().toLowerCase();
        const matches = attempts.filter(a => (!email || (a.studentEmail || '').toLowerCase() === email) && (!name || (a.studentName || '').toLowerCase().includes(name)));
        $('#parentResults').innerHTML = renderAttempts(matches, false);
      });
    }

    function renderTeacher() {
      const root = $('#teacherView');
      if (!state.teacherUnlocked) {
        root.innerHTML = `<div class="grid two"><section class="card"><div class="card-header"><h2>Teacher access</h2><p class="desc">Enter the teacher access code to review quiz attempts and save feedback.</p></div><div class="card-content"><div class="field"><label>Access code</label><input id="teacherCode" type="password" placeholder="Enter access code"></div><div class="actions"><button class="btn primary" id="unlockTeacher">Open teacher view</button></div></div></section><aside class="card"><div class="card-header"><h2>Teacher tools</h2></div><div class="card-content"><ul class="list"><li>Review available attempts.</li><li>Add parent/student feedback.</li><li>Configure optional record syncing.</li><li>Export/import JSON for backup.</li></ul><p class="note" style="margin-top:14px">Authorized access only.</p></div></aside></div>`;
        $('#unlockTeacher').addEventListener('click', () => { if ($('#teacherCode').value === TEACHER_CODE) { state.teacherUnlocked = true; localStorage.setItem(STORAGE_TEACHER, '1'); renderTeacher(); } else alert('That access code is not correct.'); });
        return;
      }
      const attempts = readAttempts();
      const flowUrl = getRecordSyncUrl();
      root.innerHTML = `<section class="card"><div class="card-header"><div class="row" style="justify-content:space-between"><div><h2>Teacher dashboard</h2><p class="desc">Review attempts, sync records, and leave feedback.</p></div><div class="actions"><button class="btn" id="syncRecordSync">Sync records</button><button class="btn" id="exportAttempts">Export JSON</button><label class="btn" for="importAttempts" style="margin:0">Import JSON</label><input id="importAttempts" type="file" accept="application/json" style="display:none"><button class="btn secondary" id="lockTeacher">Lock teacher view</button></div></div></div><div class="card-content"><div class="note warn">${AUDIT_NOTES.map(escapeHtml).join('<br>')}</div><div class="splitline"></div><div class="grid" style="grid-template-columns:minmax(0,1fr) auto"><div class="field"><label>Record sync URL</label><input id="flowUrl" value="${escapeHtml(flowUrl)}" placeholder="Paste the private record sync URL here"><p class="desc">The static website can sync attempts and feedback to a private records endpoint. Leave blank to use this device only.</p></div><div class="actions" style="align-items:flex-start;padding-top:26px"><button class="btn primary" id="saveFlowUrl">Save URL</button><button class="btn" id="clearFlowUrl">Clear</button></div></div><div id="syncStatus" class="note ${flowUrl ? 'good' : ''}">${flowUrl ? 'Record sync is configured on this device.' : 'Record sync is not configured yet. Attempts will remain on this device until it is added.'}</div><div style="margin-top:18px" id="attemptsList">${renderAttempts(attempts, true)}</div></div></section>`;
      $('#lockTeacher').addEventListener('click', () => { state.teacherUnlocked = false; localStorage.removeItem(STORAGE_TEACHER); renderTeacher(); });
      $('#exportAttempts').addEventListener('click', exportAttempts);
      $('#importAttempts').addEventListener('change', importAttempts);
      $('#saveFlowUrl').addEventListener('click', () => { setRecordSyncUrl($('#flowUrl').value); renderTeacher(); });
      $('#clearFlowUrl').addEventListener('click', () => { setRecordSyncUrl(''); renderTeacher(); });
      $('#syncRecordSync').addEventListener('click', async () => {
        const status = $('#syncStatus');
        try {
          status.className = 'note';
          status.textContent = 'Refreshing records...';
          const synced = await loadAttemptsFromRecordSync();
          status.className = 'note good';
          status.textContent = `Record sync complete. ${synced.length} attempt(s) available locally.`;
          $('#attemptsList').innerHTML = renderAttempts(synced, true);
          bindFeedbackButtons();
        } catch (error) {
          status.className = 'note warn';
          status.textContent = `Refresh failed: ${error.message || error}`;
        }
      });
      bindFeedbackButtons();
    }

    function bindFeedbackButtons() {
      $$('.save-feedback').forEach(btn => btn.addEventListener('click', async () => {
        const attemptId = btn.dataset.attemptId;
        const attemptsNow = readAttempts();
        const target = attemptsNow.find(a => a.id === attemptId);
        if (!target) return;
        target.teacherFeedback = $(`[data-feedback-for="${attemptId}"]`).value;
        writeAttempts(attemptsNow);
        btn.disabled = true;
        btn.textContent = 'Saving...';
        try {
          await saveFeedbackToRecordSync(attemptId, target.teacherFeedback, target);
          btn.textContent = 'Saved';
        } catch (error) {
          console.warn('Online feedback save failed; saved locally.', error);
          btn.textContent = 'Saved locally';
        } finally {
          btn.disabled = false;
          setTimeout(() => btn.textContent = 'Save feedback', 1400);
        }
      }));
    }

    function renderAttempts(attempts, editable) {
      if (!attempts.length) return `<p class="note">No matching quiz attempts found.</p>`;
      const total = attempts.length;
      const average = Math.round(attempts.reduce((sum, a) => sum + (a.percentage || 0), 0) / total);
      const best = Math.max(...attempts.map(a => a.percentage || 0));
      return `<div class="grid three" style="margin-bottom:18px"><div class="stat"><small>Completed quizzes</small><strong>${total}</strong></div><div class="stat"><small>Average score</small><strong>${average}%</strong></div><div class="stat"><small>Best score</small><strong>${best}%</strong></div></div>${attempts.map(a => `<article class="card attempt-card"><div class="card-header"><div class="row" style="justify-content:space-between"><div><h3>${escapeHtml(a.studentName || 'Student')}</h3><p class="desc">${escapeHtml(a.studentEmail || 'No email saved')}${a.schoolName ? ' · ' + escapeHtml(a.schoolName) : ''}${a.submittedAt ? ' · Submitted ' + new Date(a.submittedAt).toLocaleString() : ''}</p></div><div class="row"><span class="badge dark">${escapeHtml(a.mode)}</span><span class="badge green">${a.percentage}%</span><span class="badge ${a.integrityEvents?.length ? 'red' : ''}">${a.integrityEvents?.length || 0} flags</span></div></div></div><div class="card-content"><div class="grid three"><div class="stat"><small>Score</small><strong>${a.score}/${a.scoredQuestionCount || a.questionCount}</strong></div><div class="stat"><small>Questions</small><strong>${a.questionCount}</strong></div><div class="stat"><small>Duration</small><strong>${a.durationMinutes}m</strong></div></div><p class="note" style="margin-top:14px"><strong>Topics:</strong> ${escapeHtml((a.selectedTopics || []).join(', ') || 'No topics saved')}</p>${a.integrityEvents?.length ? `<div class="note warn" style="margin-top:14px"><strong>Integrity notes</strong><br>${a.integrityEvents.map(e => `• ${escapeHtml((e.type || '').replaceAll('_', ' '))} — ${escapeHtml(e.details || '')}`).join('<br>')}</div>` : ''}<div class="note good" style="margin-top:14px"><strong>Teacher feedback</strong><br>${escapeHtml(a.teacherFeedback || 'No teacher feedback has been added yet.')}</div>${editable ? `<div class="field" style="margin-top:14px"><label>Edit feedback</label><textarea data-feedback-for="${a.id}">${escapeHtml(a.teacherFeedback || '')}</textarea></div><button class="btn primary save-feedback" data-attempt-id="${a.id}">Save feedback</button>` : ''}</div></article>`).join('')}`;
    }

    function exportAttempts() {
      const blob = new Blob([JSON.stringify(readAttempts(), null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = `csec-addmaths-attempts-${new Date().toISOString().slice(0,10)}.json`;
      link.click(); URL.revokeObjectURL(url);
    }
    function importAttempts(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const incoming = JSON.parse(String(reader.result));
          if (!Array.isArray(incoming)) throw new Error('Expected an array of attempts.');
          const merged = [...incoming, ...readAttempts()].reduce((map, attempt) => map.set(attempt.id || id(), attempt), new Map());
          writeAttempts([...merged.values()].sort((a,b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0)));
          alert('Attempts imported.'); renderTeacher();
        } catch (error) { alert('Could not import that JSON file.'); }
      };
      reader.readAsText(file);
    }

    document.addEventListener('click', event => {
      const button = event.target.closest('[data-role-button]');
      if (button) setRole(button.dataset.roleButton);
    });
    setRole('student');
  </script>
</body>
</html>
