import React, { Fragment, createContext, forwardRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import katex from "katex";
import "katex/dist/katex.min.css";

type PrimitiveProps<T> = React.HTMLAttributes<T> & { className?: string };

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const Card = ({ className = "", ...props }: PrimitiveProps<HTMLDivElement>) => (
  <div {...props} className={cn("rounded-xl border border-slate-200 bg-white", className)} />
);

const CardHeader = ({ className = "", ...props }: PrimitiveProps<HTMLDivElement>) => (
  <div {...props} className={cn("space-y-1.5 p-6", className)} />
);

const CardContent = ({ className = "", ...props }: PrimitiveProps<HTMLDivElement>) => (
  <div {...props} className={cn("p-6 pt-0", className)} />
);

const CardTitle = ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 {...props} className={cn("text-lg font-semibold text-slate-900", className)} />
);

const CardDescription = ({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p {...props} className={cn("text-sm text-slate-500", className)} />
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "destructive" | "secondary";
};

const buttonVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-slate-900 text-white hover:bg-slate-800 border border-slate-900",
  outline: "bg-white text-slate-900 hover:bg-slate-50 border border-slate-300",
  destructive: "bg-rose-600 text-white hover:bg-rose-700 border border-rose-600",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200",
};

const Button = ({ className = "", variant = "default", type = "button", ...props }: ButtonProps) => (
  <button
    type={type}
    {...props}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
      buttonVariants[variant],
      className
    )}
  />
);

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    className={cn("w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-500", className)}
  />
));
Input.displayName = "Input";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "destructive" | "outline";
};

const badgeVariants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-slate-900 text-white border border-slate-900",
  secondary: "bg-slate-100 text-slate-800 border border-slate-200",
  destructive: "bg-rose-100 text-rose-700 border border-rose-200",
  outline: "bg-white text-slate-700 border border-slate-300",
};

const Badge = ({ className = "", variant = "default", ...props }: BadgeProps) => (
  <span
    {...props}
    className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", badgeVariants[variant], className)}
  />
);

const Label = ({ className = "", ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label {...props} className={cn("text-sm font-medium text-slate-800", className)} />
);

const Checkbox = ({
  checked,
  className = "",
  onCheckedChange,
  onChange,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <input
    type="checkbox"
    checked={!!checked}
    {...props}
    onChange={(e) => {
      onCheckedChange?.(e.target.checked);
      onChange?.(e);
    }}
    className={cn("h-4 w-4 rounded border-slate-300 text-slate-900 accent-slate-900", className)}
  />
);

const Progress = ({ value = 0, className = "" }: { value?: number; className?: string }) => (
  <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-200", className)}>
    <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </div>
);

const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className = "", ...props }, ref) => (
  <textarea
    ref={ref}
    {...props}
    className={cn("min-h-[96px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500", className)}
  />
));
Textarea.displayName = "Textarea";

type SelectContextValue = {
  value: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
};

const SelectContext = createContext<SelectContextValue>({ value: "" });

function Select({ value, onValueChange, children }: { value: string; onValueChange?: (value: string) => void; children: React.ReactNode }) {
  return <SelectContext.Provider value={{ value, onValueChange }}>{children}</SelectContext.Provider>;
}

function SelectTrigger({ className = "", children }: PrimitiveProps<HTMLDivElement>) {
  return <div className={cn("w-full", className)}>{children}</div>;
}

function SelectValue() {
  const { value, placeholder } = useContext(SelectContext);
  return <span>{value || placeholder || "Select an option"}</span>;
}

function SelectContent({ children }: { children: React.ReactNode }) {
  const { value, onValueChange } = useContext(SelectContext);
  const items = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<{ value: string; children: React.ReactNode }>[];

  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
    >
      {items.map((item) => (
        <option key={item.props.value} value={item.props.value}>
          {item.props.children}
        </option>
      ))}
    </select>
  );
}

function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <>{React.createElement(Fragment, { value }, children)}</>;
}


type OptionKey = "A" | "B" | "C" | "D";
type Mode = "practice" | "homework" | "exam";
type Role = "student" | "teacher";

type Question = {
  id: number;
  sourceNumber: number;
  topic: string;
  subtopic: string;
  difficulty: string;
  stem: string;
  options: Record<OptionKey, string>;
  correctAnswer?: OptionKey | null;
  explanation?: string;
  answerKeyStatus: "pending" | "verified";
  source: string;
};

type AttemptAnswer = {
  questionId: number;
  selected?: OptionKey;
  isCorrect?: boolean;
  changedCount: number;
  timeSpentSeconds: number;
};

type IntegrityEventType = "tab_blur" | "tab_focus" | "rapid_navigation" | "very_fast_finish" | "refresh_recovery";

type IntegrityEvent = {
  type: IntegrityEventType;
  at: string;
  details?: string;
};

type Attempt = {
  id: string;
  studentName: string;
  schoolName?: string;
  studentEmail?: string;
  studentAuthUserId?: string;
  mode: Mode;
  selectedTopics: string[];
  questionCount: number;
  startedAt: string;
  submittedAt?: string;
  durationMinutes: number;
  answers: AttemptAnswer[];
  questions: Question[];
  score: number;
  percentage: number;
  scoredQuestionCount: number;
  integrityEvents: IntegrityEvent[];
  teacherFeedback?: string;
};

type StudentAuthSession = {
  accessToken: string;
  refreshToken?: string;
  email: string;
  userId?: string;
};

const ANSWERS_VISIBLE_ONLY_AFTER_SUBMIT = true;
const PROFESSIONAL_EQUATION_RENDERING = true;

const RAW_QUESTION_BANK: [number, number, string, string, string, string, string, string][] = [[1, 1, "Factorization", "𝑎(𝑏 + 𝑐) − 𝑏(𝑎 + 𝑐) is equal to", "𝑎(𝑐 − 𝑏)", "𝑎(𝑏 − 𝑐)", "𝑐(𝑎 − 𝑏)", "𝑐(𝑏 − 𝑎)"], [2, 2, "Factorization", "The expression ab + 3c − 3b − ac is equal to", "(𝑎 + 3)(𝑐 − 𝑏)", "(𝑎 + 3)(𝑏 − 𝑐)", "(𝑎 − 3)(𝑏 + 𝑐)", "(𝑎 − 3)(𝑏 − 𝑐)"], [3, 3, "Factorization", "The expression ab + 3c − 3b − ac is equal to", "(𝑎 + 3)(𝑐 − 𝑏)", "(𝑎 + 3)(𝑏 − 𝑐)", "(𝑎 − 3)(𝑏 − 𝑐)", "(𝑎 − 3)(𝑏 + 𝑐)"], [4, 4, "Factorization", "1 𝑥 + 3 + 3 𝑥2− 9 expressed as a single fraction is:", "𝑥 𝑥2 − 9", "𝑥2 − 6 (𝑥2 − 9)(𝑥 + 3)", "𝑥 + 6 𝑥2 − 9", "4 𝑥 + 3"], [5, 5, "Factorization", "The expression 𝑝𝑞 + 5𝑟 − 5𝑞 − 𝑝𝑟 is equal to", "(𝑝 − 5)(𝑞 − 𝑟)", "(𝑝 + 5)(𝑟 − 𝑞)", "(𝑝 + 5)(𝑞 − 𝑟)", "(𝑝 − 5)(𝑞 + 𝑟)"], [6, 6, "Factor/Remainder Theorem", "Given that 𝑓(𝑥) = 𝑥³ + 2𝑥² − 5𝑥 + 𝑘, and that 𝑥 − 2 is a factor of 𝑓(𝑥) then k is equal to", "-6", "-2", "2", "6"], [7, 7, "Factor/Remainder Theorem", "The expression 𝑥 − 2 is a factor of", "4𝑥4 − 2𝑥2 − 56", "4𝑥3 + 2𝑥2 − 16", "2𝑥3 + 2𝑥2 − 4𝑥 − 8", "3𝑥4 − 10𝑥3 − 5𝑥 + 4"], [8, 8, "Factor/Remainder Theorem", "When 𝑥³ − 7𝑥² + 2𝑥 − 1 is divided by 𝑥 + 2, the quotient is", "−17", "−39", "𝑥² − 5𝑥 − 8", "𝑥² − 9𝑥 + 20"], [9, 9, "Factor/Remainder Theorem", "The expression 𝑥 − 2 is a factor of", "4𝑥4 − 2𝑥2 − 56", "4𝑥3 + 2𝑥2 − 16", "2𝑥3 + 2𝑥2 − 4𝑥 − 8", "3𝑥4 − 10𝑥3 − 5𝑥2 + 4"], [10, 10, "Factor/Remainder Theorem", "Given that 𝑥 + 2 is a factor of 𝑓(𝑥) = 2𝑥3 − 3𝑥2 − 5𝑥 + 𝑝 then p is equal to", "−18", "−2", "18", "33"], [11, 11, "Factor/Remainder Theorem", "2𝑥3 + 𝑥2 − 7𝑥 − 6 factorizes completely as", "(𝑥 + 2)(𝑥 − 1)(2𝑥 − 3)", "(𝑥 − 2)(𝑥 − 1)(2𝑥 + 3)", "(𝑥 − 2)(𝑥 + 1)(2𝑥 − 3)", "(𝑥 − 2)(𝑥 + 1)(2𝑥 + 3)"], [12, 12, "Factor/Remainder Theorem", "When 2𝑥³ + 3𝑥² − 2𝑥 + 3 is divided by 2𝑥 − 1, the remainder is", "0", "1 2", "3", "6"], [13, 13, "Factor/Remainder Theorem", "The function 𝑓(𝑥) = 2𝑥³ − 𝑥² + ℎ𝑥 − 6 can be expressed as 𝑓(𝑥) = (2𝑥 + 1)(𝑥 + 2)(𝑥 − 3). What is the value of h?", "−13", "−12", "7", "13"], [14, 14, "Factor/Remainder Theorem", "The linear factor of 𝑥³ − 3𝑥² − 3𝑥 − 4 is", "𝑥 − 1", "𝑥 − 2", "𝑥 + 2", "𝑥 – 4"], [15, 15, "Arithmetic And Geometric Sequence", "The value of ∑ (3𝑟 − 1) 20 1 is", "590", "610", "650", "1220"], [16, 16, "Arithmetic And Geometric Sequence", "A teacher illustrates AP’s by cutting a length of string into 10 pieces so that the lengths of the pieces are in arithmetic progression and the entire length of the string is used up exactly. If the first piece measures 30 cm and the fourth piece measures 24 cm, the total length of the string is", "60 cm", "210 cm", "240 cm", "390 cm"], [17, 17, "Arithmetic And Geometric Sequence", "The first term of a GP is 16 and the fifth term is 81. Given that the common ratio is positive, the value of the 4th term is", "81/16", "24", "54", "64"], [18, 81, "Arithmetic And Geometric Sequence", "Given that the common ratio is positive, the value of the 4th term is", "81 16", "24", "54", "64"], [19, 18, "Arithmetic And Geometric Sequence", "The first four terms of a convergent GP is given by 81, 27, 9, 3. The sum to infinity of this GP is", "54", "120.5", "121.5", "243"], [20, 19, "Arithmetic And Geometric Sequence", "In a geometric progression, each of whose terms is positive, the fifth term is 45 and the seventh term is 5. The SIXTH term is", "9", "15", "25", "40"], [21, 20, "Arithmetic And Geometric Sequence", "The first four terms of a convergent geometric progression (GP) is given by 500, 200, 80, 32. The sum to infinity of this GP is", "200", "500 3", "300", "2500 3"], [22, 21, "Arithmetic And Geometric Sequence", "A long-distance runner runs the first kilometre of a race in 3 minutes 45 seconds but finds that his speed drops steadily so that each kilometre takes him 12 seconds more than the preceding one. The time taken to cover the first 12 kilometres is", "58 mins 12 secs", "31 mins 48 secs", "9 mins 18 secs", "63 mins 36 secs"], [23, 22, "Arithmetic And Geometric Sequence", "The sum of the ODD integers between 10 and 50 is", "60", "600", "630", "1960"], [24, 23, "Arithmetic And Geometric Sequence", "The first four terms of a convergent geometric progression (GP) are 500, 200, 80, 32. The sum to infinity of this GP is", "200", "500 3", "300", "2500 3"], [25, 24, "Arithmetic And Geometric Sequence", "The common ratio of the geometric sequence 8, 12, 18, ... is", "3 4", "2 3", "3 2", "1 2"], [26, 25, "Arithmetic And Geometric Sequence", "For the arithmetic progression −12, −7, −2, 3, 8 ... the 𝑛ᵗʰ term is given by", "5𝑛 − 17", "5𝑛 − 12", "−12 − 5𝑛", "5𝑛 + 17"], [27, 26, "Arithmetic And Geometric Sequence", "Which of the following is NOT an arithmetic sequence?", "11, 2, −8, −19, ...", "8, 12, 16, 20, ...", "51, 45, 39, 33, ...", "−7, −9, −11, −13, ..."], [28, 27, "Arithmetic And Geometric Sequence", "The series −2 + 4 3 – 8 9 + … converges to the limit", "−6", "6", "−6 5", "6 5"], [29, 28, "Arithmetic And Geometric Sequence", "The sum of the first n terms of a geometric series is Sₙ = 4ⁿ − 1. For this series, which statements are correct? I. The common ratio is 4. II. The first 3 terms are 3, 15 and 63. III. S₂ₙ = 2⁴ⁿ − 1.", "I and II only", "I and III only", "II and III only", "I, II and III"], [30, 29, "Exponential And Logarithm", "The sum of ∑ 1 𝑘 3 𝑘=1", "1 3", "1 2", "3 5", "11 6"], [31, 30, "Exponential And Logarithm", "The sum of the first n terms of a series is given by: ∑5 −3𝑟 𝑛 1 . The sum of the first 10 terms is", "-170", "-125", "-115", "-85"], [32, 31, "Exponential And Logarithm", "A sequence of positive integers {Uₙ} is defined by 𝑈ₙ = 3 ( 1 2) ⁿ−1. The 10𝑡ℎ term of the sequence is given by:", "19683 512", "3 256", "3 512", "3 1000 EXPONENTIAl & LOGARITHM"], [33, 32, "Exponential And Logarithm", "Given that 2 × 4𝑥 + 1 = 162𝑥, the value of x is", "−1", "1 4", "1 3", "½"], [34, 33, "Exponential And Logarithm", "The √2 × 4𝑚 𝑛 is equal to", "√8𝑚 𝑛", "2𝑛 + 2𝑚", "2𝑛 + 𝑛𝑚", "2 2𝑚 + 1 𝑛"], [35, 34, "Exponential And Logarithm", "√3 × 27𝑚 is equal to", "3 3𝑚+1 𝑛", "3𝑛 +3𝑚", "√813𝑚 𝑛", "34𝑚"], [36, 35, "Exponential And Logarithm", "Given that 𝑙𝑜𝑔₂ 𝑥 + 𝑙𝑜𝑔₂ (6𝑥 + 1) = 1, the value of 𝑥 is", "−2/3", "1/2", "2/3", "3/2"], [37, 36, "Exponential And Logarithm", "The value of 𝑙𝑜𝑔₄(8) – 𝑙𝑜𝑔₄(2) + 𝑙𝑜𝑔₄( 1 16) is", "−1", "1 2", "3", "4"], [38, 37, "Exponential And Logarithm", "The value of 2𝑧 where 𝑧 = 5 + 𝑙𝑜𝑔₂ 3 is", "𝑙𝑜𝑔₂ 96", "25", "96", "296"], [39, 38, "Exponential And Logarithm", "2−1 8 1 3 simplifies to", "1 2", "√2", "1 4", "1 √2"], [40, 39, "Exponential And Logarithm", "The value of x for which 4𝑥+1 = 2 is", "−1 2", "0", "1 2", "1"], [41, 40, "Exponential And Logarithm", "Given that log𝑝𝑋= 6 and log𝑝𝑌= 4, the value of log𝑝( 𝑋 𝑌) is", "10", "𝑙𝑜𝑔𝑝2", "log𝑝6 log𝑝4", "2"], [42, 41, "Exponential And Logarithm", "Given that 𝑙𝑜𝑔₂(𝑥³) = 6, then the value of x is", "2", "4", "8", "64"], [43, 42, "Exponential And Logarithm", "Given that 3 × 272𝑥= 9𝑥, the value of x is", "− 1 4", "−1", "1 4", "1"], [44, 43, "Exponential And Logarithm", "𝑙𝑜𝑔₃(2𝑥 + 1) = 2 + 𝑙𝑜𝑔₃(3𝑥 − 11) is", "5", "23/4", "4", "67/16"], [45, 44, "Exponential And Logarithm", "The value of x for which 9𝑥+1 = 3 is", "−3 2", "−1 2", "3 2", "5 2"], [46, 45, "Exponential And Logarithm", "The value of x for which 3𝑥+2 + 3𝑥= 90 is", "½ ( log(90) log(3) − 2 )", "2", "44", "( log(10) log(3) )"], [47, 46, "Exponential And Logarithm", "The value of x such that 𝑙𝑜𝑔₂(5𝑥 + 1) − 𝑙𝑜𝑔₂(3𝑥 − 5) = 2 is", "2", "3", "5", "11"], [48, 47, "Exponential And Logarithm", "Which of the following mathematical statements are true? 𝐼. 𝑙𝑜𝑔ₐ(𝑃𝑄) = 𝑙𝑜𝑔ₐ𝑃 × 𝑙𝑜𝑔ₐ𝑄 𝐼𝐼. 𝑙𝑜𝑔ₐ (𝑃 𝑄) = 𝑙𝑜𝑔ₐ𝑃 − 𝑙𝑜𝑔ₐ𝑄 𝐼𝐼𝐼. 𝑙𝑜𝑔ₐ(𝑃ᵇ) = 𝑏 𝑙𝑜𝑔ₐ𝑃", "I and II only", "I and III only", "II and III only", "I, II and III"], [49, 48, "Sum/Product Of Roots", "Given that a and b are the roots of the equation 𝑥² + 3𝑥 + 4 = 0, what is the value of (𝑎 + 𝑏)²?", "9 16", "1", "9", "16"], [50, 49, "Sum/Product Of Roots", "A quadratic equation is such that the sum of its roots is −2/3 and the product of its roots is 3/4. The quadratic equation is:", "12x² + 8x + 9 = 0", "12x² − 8x − 9 = 0", "12x² − 8x + 9 = 0", "12x² + 8x − 9 = 0"], [51, 4, "Sum/Product Of Roots", "The quadratic equation is:", "12𝑥² + 8𝑥 + 9 = 0", "12𝑥² − 8𝑥 − 9 = 0", "12𝑥² − 8𝑥 + 9 = 0", "12𝑥² + 8𝑥 − 9 = 0"], [52, 50, "Nature Of Roots", "The roots of the equation 2𝑥² − 𝑥 + 1 = 0 are", "real and equal", "real and distinct", "not real and equal", "not real and distinct"], [53, 51, "Nature Of Roots", "The roots of the equation 5𝑥2 + 6𝑥 – 2 = 0 are", "not real and not distinct", "not real and not equal", "real and distinct", "real and equal"], [54, 52, "Nature Of Roots", "The roots of the equation 3𝑥² − 6𝑥 − 5 = 0 are", "equal", "real and distinct", "distinct and not real", "real and not distinct"], [55, 53, "Function", "If 𝑓(𝑥) = 3𝑥 − 4 and 𝑓(𝑔(𝑥)) = 𝑥, then 𝑔(𝑥) is", "1 3𝑥 − 4", "𝑥 + 4 3", "3 − 4𝑥", "4𝑥 − 3"], [56, 54, "Function", "The tables below show the ordered pairs for two functions f and g. The value of 𝑔−1[𝑓(3)] is", "1 2", "2", "5", "7"], [57, 55, "Function", "A function h is defined by ℎ∶ 𝑥 → 5𝑥 + 2. Expressed in terms of a, ℎ(2𝑎 + 3) is", "10𝑎 + 15", "2𝑎 + 15", "10𝑎 + 17", "5𝑎 + 17"], [58, 56, "Function", "A function f is defined by 𝑓∶ 𝑥 → 2𝑥 − 1. The function 𝑓² is defined as:", "𝑓² ∶ 𝑥 → 4𝑥² − 4𝑥 + 1", "𝑓² ∶ 𝑥 → 2𝑥² − 1", "𝑓² ∶ 𝑥 → 4𝑥² + 1", "𝑓² ∶ 𝑥 → 4𝑥 – 3"], [59, 58, "Maximum And Minimum Point", "𝑓(𝑥) = −5 − 8𝑥 − 2𝑥². By completing the square f(x) can be expressed as", "2(𝑥 + 2)2 − 4", "4 − 2(𝑥 − 2)2", "3 − 2(𝑥 + 2)2", "3 − 2(𝑥 − 2)2"], [60, 59, "Maximum And Minimum Point", "For −2 ≤ 𝑥 ≤ 2, the maximum value of 4 – (𝑥 + 1)2, and the value of x for which 4 − (𝑥 + 1)² is maximum are respectively", "5 and 1", "2 and −1", "4 and −1", "4 and 1"], [61, 60, "Maximum And Minimum Point", "The number of visas, V(x), issued by an embassy annually is given by 𝑉(𝑥) = 7𝑥3 − 42𝑥 + 72. The LEAST number of visas issued in a particular year, x, is", "6", "9", "42", "72"], [62, 61, "Maximum And Minimum Point", "Given that 𝑓(𝑥) = 6 − 𝑥 − 2𝑥² is less than or equal to k, where k ∈ ℝ, then k is equal to", "− 49 8", "− 1 4", "1 4", "49 8"], [63, 62, "Maximum And Minimum Point", "If 𝑥² − 8𝑥 + 19 = 𝑎(𝑥 + ℎ)² + 𝑘, then", "𝑎 = 1 ℎ = 3 𝑘 = 4", "𝑎 = 1 ℎ = −3 𝑘 = 4", "𝑎 = 1 ℎ = −4 𝑘 = 3", "𝑎 = −1 ℎ = 4 𝑘 = 3"], [64, 63, "Maximum And Minimum Point", "If 𝑥2– 6𝑥 + 13 = 𝑎(𝑥 + ℎ)2 + 𝑘, then", "𝑎 = 1 ℎ = 3 𝑘 = 4", "𝑎 = 1 ℎ = −3 𝑘 = 4", "𝑎 = 1 ℎ = −4 𝑘 = 3", "𝑎 = −1 ℎ = 4 𝑘 = 3"], [65, 64, "Maximum And Minimum Point", "Given that 𝑓(𝑥) = 𝑎𝑥² + 𝑏𝑥 + 𝑐, then 𝑓(𝑥) can be expressed in the form:", "𝑎(𝑥 + 𝑏/𝑎)² + (𝑎𝑐 – 𝑏²)/𝑎²", "𝑎 (𝑥 + 𝑏 2𝑎 )2 + 𝑎𝑐 − 𝑏 2 𝑎 2", "𝑎 (𝑥 + 𝑏 2𝑎 )2 + 4𝑎𝑐 − 𝑏 2 4𝑎", "𝑎 (𝑥 + 𝑏 2𝑎 )2 + 4𝑎𝑐 − 𝑏 2 4𝑎 2"], [66, 65, "Maximum And Minimum Point", "Given that f(x) = 1 - 4x - 2x², the expression can be written in the form:", "2(𝑥 + 1)² − 3", "3 − 2(𝑥 − 1)²", "3 − 2(𝑥 + 1)²", "3 − (2𝑥 + 1)²"], [67, 66, "Maximum And Minimum Point", "Which of the following graphs BEST represents 𝑓(𝑥) = 𝑥(1 − 𝑥)?", "Graph A", "Graph B", "Graph C", "Graph D"], [68, 67, "Surd", "11. The expression (1 + √3) (√3 − 1) when simplified is equal to", "-1", "1", "√3+ 2 2", "√3 + 2"], [69, 68, "Surd", "(8 + √5)(2 − √5) can be expressed as", "11 − 6√5", "21 − 6√5", "11 + 6√5", "11 + 10√5"], [70, 69, "Surd", "The expression √5– 1 1 + √5 when simplified is equal to", "1 3 (3 − √5)", "1 2 (√5 − 3)", "1 3 (√5 − 3)", "1 2 (3 − √5)"], [71, 70, "Surd", "The expression 1 + √3 √3– 1 when simplified is equal to:", "-1", "1", "√3+ 2 2", "√3 + 2"], [72, 70, "Surd", "The value of √18 + √50 is", "34√2", "6√15", "8√2", "√68"], [73, 71, "Surd", "4 √6− 2", "2(√6 − 2)", "2(√6 + 2)", "√6 − 2", "√6 + 2"], [74, 72, "Linear & Quadratic Inequality", "The range of values for which 2𝑥² < 5𝑥 + 3 𝑖𝑠", "−1 2 < 𝑥 < 3", "1 2 < 𝑥 < 3", "𝑥 < −1 2 𝑎𝑛𝑑 𝑥 < 3", "𝑥 > −1 2 𝑎𝑛𝑑 𝑥 > 3"], [75, 73, "Linear & Quadratic Inequality", "20. The values of x which satisfy the inequality 2𝑥 – 3 𝑥 + 1 > 0 are", "𝑥 > −1 𝑎𝑛𝑑 𝑥 > 3 2", "𝑥 > 3 2", "𝑥 < −1 𝑜𝑟 𝑥 > 3 2", "𝑥 > −1"], [76, 74, "Linear & Quadratic Inequality", "The set of values of x for which 5𝑥 + 7 > 10𝑥 − 13 is", "𝑥 < −4", "𝑥 ≥ −4", "𝑥 < 4", "𝑥 > 4"], [77, 7, "Linear & Quadratic Inequality", "The range of values of x for which 5𝑥 + 6 ≤ 𝑥2 is", "{𝑥∶ −3 ≤ 𝑥 ≤ −2}", "{𝑥∶ 𝑥 ≤ −1} ∪ {𝑥∶ 𝑥 ≥ 6}", "{𝑥∶ 𝑥 ≥ −1} ∪ {𝑥∶ 𝑥 ≥ 6}", "{𝑥∶ −1 ≤ 𝑥 ≤ 6}"], [78, 75, "Linear & Quadratic Inequality", "The range of values for which 𝑥2 − 7𝑥 + 10 < 0 is", "2 > 𝑥 > 5", "2 < 𝑥 < 5", "𝑥 < 2 𝑎𝑛𝑑 𝑥 > 5", "𝑥 < −5 𝑎𝑛𝑑 𝑥 > −5 The set of values of x for which 3x + 2 > x − 2 is"], [79, 77, "Linear & Quadratic Inequality", "The set of values of x for which (5x − 2)/(2 − 3x) ≥ 0 is given by:", "{x : x ≥ 2/5 ∪ x > 2/3}", "{x : x ≤ 2/5 ∪ x > 2/3}", "{x : 2/3 < x ≤ 2/5}", "{x : 2/5 ≤ x < 2/3}"], [80, 78, "Linear & Quadratic Inequality", "Given that x > 0, the set of values of x for which 𝑥 – 2 < 15 𝑥 is:", "(A){𝑥∶ 𝑥 > 0 ∪ 𝑥 > 5}", "(B){𝑥∶ 0 < 𝑥 < 5}", "(C){𝑥∶ 𝑥 > 5}", "(D){𝑥∶ 𝑥 < 5}"], [81, 64, "Linear & Quadratic Inequality", "The values of x for which (𝑥 + 15)² = 64𝑥 are", "3 𝑎𝑛𝑑 5", "9 𝑎𝑛𝑑 5", "3 𝑎𝑛𝑑 25", "9 𝑎𝑛𝑑 25"], [82, 79, "Linear & Quadratic Inequality", "The values of x for which 3𝑥 – 2 2𝑥 + 1 ≤ 0 are", "𝑥 ≤ 2 3", "𝑥 > − 1 2", "− 1 2 < 𝑥 ≤ 2 3", "𝑥 ≤ − 1 2 𝑜𝑟 𝑥 ≥ 2 3"], [83, 80, "Linear & Quadratic Inequality", "The range of values of x for which 4𝑥 − 3𝑥² > 0 is", "− 4 3 < 𝑥 < 0", "𝑥 < 0, 𝑥 > 4 3", "0 < 𝑥 < 4 3", "𝑥 > 0, 𝑥 > 4 3"], [84, 82, "Equation Of A Circle", "The point (2, 3) is at one end of a diameter of the circle whose equation is 𝑥² + 𝑦² − 10𝑥 + 2𝑦 + 1 = 0. The coordinates of the other end of the diameter are", "(−12, −5)", "(−12, −1)", "(8, −1)", "(8, −5)"], [85, 83, "Equation Of A Circle", "The radius, r, and the coordinates of the centre, C, of the circle with equation 𝑥² + 𝑦² − 6𝑥 + 4𝑦 − 12 = 0 are", "𝑟 = 5, 𝐶(−2, 3)", "𝑟 = 25, 𝐶(2, −3)", "𝑟 = 12, 𝐶(−3, 2)", "𝑟 = 5, 𝐶(3, −2)"], [86, 84, "Equation Of A Circle", "The coordinates of the points A and B are (2, -3) and (-10, -5) respectively. The perpendicular bisector to the line AB is given by the equation:", "𝑥 − 6𝑦 + 20 = 0", "6𝑥 + 𝑦 + 28 = 0", "𝑥 + 6𝑦 − 20 = 0", "6𝑥 + 𝑦 − 28 = 0"], [87, 85, "Equation Of A Circle", "The coordinates of the centre of a circle with equation (𝑥 − 1)² + (𝑦 + 3)² = 36 is", "(1, −3)", "(−1, 3)", "(3, −1)", "(−3, 1)"], [88, 86, "Equation Of A Circle", "A circle C has centre (3, -2) and radius 4. The equation of C is", "x^2 + y^2 + 6x - 4y + 3 = 0", "x^2 + y^2 - 3 = 0", "x^2 + y^2 - 6x + 4y - 3 = 0", "x^2 + y^2 + 3x - 2y - 3 = 0"], [89, 87, "Vector", "If the length of the vector 𝑝 − 2𝑖 − 𝑘𝑗 is √13 and k is real, then\nI. k = 3\nII. k = −3\nIII. k = √17\nIV. k = −√17", "I or II only", "I or III only", "I or IV only", "II or IV only"], [90, 88, "Vector", "25. The value of the real number r for which the two vectors 𝑎 = 4𝑖 + 𝑟𝑗 and 𝑏 = 2𝑖 − 3𝑗 are parallel is", "−6", "3 4", "4 3", "6"], [91, 89, "Vector", "26. The position vectors of A and B relative to an origin O are( 2 3 ) and( 7 4 ) respectively. The acute angle AOB is given by", "𝑐𝑜𝑠 −1 ( 2 √65 )", "𝑐𝑜𝑠 −1 ( √26 (13√65) )", "𝑐𝑜𝑠 −1 ( √2 √65)", "𝑐𝑜𝑠 −1 ( 26 √13√65)"], [92, 90, "Vector", "The vector a is given as 5i + 12j. A unit vector parallel to a is", "15𝑖 + 36𝑗", "195𝑖 + 468𝑗", "1 13 (5𝑖 + 12𝑗)", "3 13 (5𝑖 + 12𝑗)"], [93, 91, "Vector", "Given that OA = ( −17 25 ) and OB = ( 4 −5 ), the vector AB =", "( −13 30 )", "( −13 −20)", "( −21 20 )", "( 21 −20)"], [94, 92, "Vector", "The position vectors of A and B relative to an origin O are ( 2 5 ) and ( −3 1 ) respectively. The acute angle AOB is given by", "𝑐𝑜𝑠⁻¹ ( 1 √290 )", "𝑐𝑜𝑠⁻¹ ( 11 √290 )", "𝑐𝑜𝑠⁻¹ ( √11 √290)", "𝑐𝑜𝑠⁻¹ (− 1 √290 )"], [95, 93, "Vector", "The triangle OAB has vertices given by( 0 0 ), ( 𝑎 0 ) and ( 0 4 ) respectively. Given that the angle AÔB is 𝜋 2 , then a =", "2", "3", "4", "6"], [96, 94, "Vector", "The position vector of the point P relative to an origin O is given as p = 5i + 2j and the position vector of Q relative to an origin O is given as q = -4i + 10j. Which of the following is TRUE?", "p and q are parallel.", "p and q are perpendicular.", "The acute angle between p and q is 60°.", "The acute angle between p and q is 45°."], [97, 95, "Trigonometry", "28. cos(A – B) – cos(A + B) =", "2 sin A sin B", "−2 sin A cos B", "2 cos A sin B", "2 cos A cos B"], [98, 96, "Trigonometry", "29. If sin 𝜃= 15 17 and θ is obtuse, then cos θ is equal to", "−8 15", "−8 17", "8 15", "8 17"], [99, 97, "Trigonometry", "The smallest positive angle for which the equation 𝑠𝑖𝑛 𝜃 + 𝑐𝑜𝑠 𝜃 = 0 is", "𝜋 4", "3𝜋 4", "5𝜋 4", "7𝜋 4"], [100, 98, "Trigonometry", "For 0 ≤ θ ≤ 2π, solutions for the equation 4 sin² θ − 1 = 0 exist in", "1, 2 and 3", "1, 3 and 4", "2, 3 and 4", "1, 2, 3 and 4"], [101, 99, "Trigonometry", "2 sin (𝑥 − 𝜋 2)is equal to", "2 sin 𝑥− 2", "−2 cos 𝑥", "2 cos (𝑥 + 𝜋 2)", "2 sin 𝑥− 𝜋"], [102, 100, "Trigonometry", "For which of the following ranges of values is 𝑓(𝑥) = 2 + 𝑐𝑜𝑠 3𝑥 valid?", "−1 ≤ 𝑓(𝑥) ≤ 3", "1 ≤ 𝑓(𝑥) ≤ 1", "−2 ≤ 𝑓(𝑥) ≤ 2", "0 ≤ 𝑓(𝑥) ≤ 2"], [103, 101, "Trigonometry", "For 0 ≤ x ≤ 2π, the values of x which satisfy the equation 2 𝑐𝑜𝑠² 𝑥 + 3 𝑠𝑖𝑛 𝑥 = 0 are", "𝑥 = 𝜋 6 , 𝑥 = 5𝜋 6", "𝑥 = 𝜋 6 , 𝑥 = − 5𝜋 6", "𝑥 = 7𝜋 6 , 𝑥 = 11𝜋 6", "𝑥 = 5𝜋 6 , 𝑥 = 7𝜋 6"], [104, 102, "Trigonometry", "If sin 𝜃= 5 13 and θ is obtuse, then tan θ =", "−12 13", "−5 12", "5 12", "12 13"], [105, 103, "Trigonometry", "𝑜𝑠(A + B) + 𝑐𝑜𝑠(A − B) =", "2 cos A", "2 cos A + 2 cos B", "cos² A cos² B", "2 cos A cos B"], [106, 104, "Trigonometry", "If 𝑐𝑜𝑠 2𝑥 = 1 − 2𝑠², then sin x =", "s", "s²", "2s", "1 − s²"], [107, 105, "Trigonometry", "The exact value of tan 150° is given by", "−1 √3", "1 √3", "−√3", "√3"], [108, 106, "Trigonometry", "The graph of y = sin 2x is", "Graph A", "Graph B", "Graph C", "Graph D"], [109, 107, "Trigonometry", "The SMALLEST positive angle for which the equation 𝑠𝑖𝑛 𝜃 − 𝑐𝑜𝑠 𝜃 = 0 𝑓𝑜𝑟 0 ≤ 𝜃 ≤ 2𝜋 is", "𝜋 6", "𝜋 4", "5𝜋 6", "2𝜋 3"], [110, 108, "Trigonometry", "𝑠𝑖𝑛 (𝛼 + 45°) is equal to", "1 √2 (sin 𝛼+ cos 𝛼)", "1 √2 (cos 𝛼−sin 𝛼)", "1 2 (sin 𝛼−cos 𝛼)", "1 2 (cos 𝛼−sin 𝛼)"], [111, 109, "Trigonometry", "Convert 4𝜋 5 radians into degrees.", "72", "144", "180", "288"], [112, 110, "Trigonometry", "The trigonometrical expression 𝑆𝑖𝑛𝑥 1−𝑐𝑜𝑠𝑥− 𝑠𝑖𝑛𝑥 1+𝑐𝑜𝑠𝑥 is identical to", "2 sin 𝑥", "2 tan 𝑥", "2 sin 𝑥", "2 𝑡𝑎𝑛2𝑥"], [113, 111, "Trigonometry", "The EXACT value of cos ( 5𝜋 12) is:", "1 4 (√6 − √2)", "1 4 (√6 + √2)", "1 2 (√6 + √2)", "1 2 (√6 − √2)"], [114, 112, "Trigonometry", "The graph shown represents the function:", "𝑐𝑜𝑠 𝑥", "𝑐𝑜𝑠 2𝑥", "1 2 cos 𝑥", "𝑐𝑜𝑠(1 2 𝑥)"], [115, 113, "Trigonometry", "𝑠𝑖𝑛 50° 𝑐𝑜𝑠 40° – 𝑐𝑜𝑠 50° 𝑠𝑖𝑛 40° =", "sin 10°", "cos 10°", "sin 90°", "cos 90°"], [116, 114, "Trigonometry", "The size of angle x, measured in radians, is:", "𝜋 12", "𝜋 9", "𝜋 6", "𝜋 3"], [117, 115, "Trigonometry", "sin ( 𝜋 2 − 𝑥) + cos (𝑥 + 𝜋 2) =", "tan 𝜋", "sin 𝑥−cos 𝑥", "cos 𝑥−sin 𝑥", "1 −sin 𝑥−cos 𝑥"], [118, 116, "Trigonometry", "If 𝑠𝑖𝑛(90° − 𝑥) = 𝑐𝑜𝑠 𝑥, then the value of 𝑥 is:", "35°", "45°", "60°", "70°"], [119, 118, "Radian", "If the area of the semicircle is 32π, what is the length of the arc connecting points A and B?", "4π", "8π", "16π", "32π"], [120, 119, "Coordinate Geometry", "The coordinates of the points A and B are (2, −3) and (−10, −5) respectively. The perpendicular bisector to the line AB is given by the equation", "𝑥 − 6𝑦 + 20 = 0", "6𝑥 + 𝑦 + 28 = 0", "𝑥 + 6𝑦 − 20 = 0", "6𝑥 + 𝑦 − 28 = 0"], [121, 120, "Coordinate Geometry", "The lines 2𝑦 − 3𝑥 − 13 = 0 and 𝑦 + 𝑥 + 1 = 0 intersect at the point P, where the coordinates of P are", "(3, 2)", "(3, −2)", "(−3, −2)", "(−5, 2)"], [122, 121, "Coordinate Geometry", "The lines 7𝑥 − 4𝑦 + 25 = 0 and 3𝑥 − 𝑦 − 5 = 0 intersect at the point P, where", "𝑃 (5, 10)", "𝑃 (−1, 8)", "𝑃 (−9, −32)", "𝑃 (9, 22)"], [123, 122, "Coordinate Geometry", "The line through the points P(k, 2) and Q(6, 8) is parallel to the line with equation 3𝑥 + 𝑦 − 21 = 0. The value of k is", "1", "4", "8", "24"], [124, 123, "Coordinate Geometry", "The line through the points Q(h, 2) and R(4, 8) is parallel to the line with equation 2𝑥 + 𝑦 − 10 = 0. The value of h is:", "-7", "2", "1", "7"], [125, 124, "Coordinate Geometry", "The line 𝑥 + 𝑦 = 1 and the circle 𝑥² + 𝑦² = 5 intersect at the points:", "(2, 1) and (1, 2)", "(−1, 2) and (2, −1)", "(1, −2) and (−2, −1)", "(−1, −2) and (−2, −1)"], [126, 126, "Calculus", "Given that 𝑦 = (3𝑥 − 2)³, then 𝑑𝑦 𝑑𝑥=", "3(3𝑥 − 2)2", "3(3𝑥)2", "3(3𝑥 − 2)2", "9(3𝑥 − 2)2"], [127, 127, "Calculus", "Given that y = (3x + 5)/(2x − 11), then dy/dx =", "[(3x + 5)(2)+ (2x − 11)(3)]/(2x − 11)²", "[(2x − 11)(3)+ (3x + 5)(2)]/(2x − 11)²", "[(2x − 11)(3)− (3x + 5)(2)]/(2x − 11)²", "[(3x + 5)(2)− (2x − 11)(3)]/(2x − 11)²"], [128, 127, "Calculus", "Given that y = (3x + 5)/(2x − 11), then dy/dx =", "[(3x + 5)(2)+ (2x − 11)(3)]/(2x − 11)²", "[(2x − 11)(3)+ (3x + 5)(2)]/(2x − 11)²", "[(2x − 11)(3)− (3x + 5)(2)]/(2x − 11)²", "[(3x + 5)(2)− (2x − 11)(3)]/(2x − 11)²"], [129, 128, "Calculus", "The curve C is given by the equation 𝑦 = 3 𝑠𝑖𝑛 𝑥 + 2. The value of 𝑑𝑦 𝑑𝑥 at the point where 𝑥 = 𝜋 3 is", "1 2", "3 2", "7 2", "3"], [130, 129, "Calculus", "The point 𝑃 (2, 2) lies on the curve with equation 𝑦 = 𝑥(𝑥 − 3)². The equation of the normal to the curve at the point P is given by", "𝑦 − 2 = 3(𝑥 − 2)", "𝑦 − 2 = −3(𝑥 − 2)", "𝑦 − 2 = ( 1 3) (𝑥 − 2)", "𝑦 − 2 = −( 1 3) (𝑥 − 2)"], [131, 130, "Calculus", "The curve C is given by the equation 𝑦 = 4𝑥 + 9 𝑥. The second derivative, $\frac{d^2y}{dx^2}$, is given by", "4 + 9 𝑥3", "18 𝑥3", "4 − 9 𝑥3", "9 2𝑥3"], [132, 131, "Calculus", "The positive value of z for which ∫𝑥 𝟎 𝑧 2𝑑𝑥 = 9 is", "3", "4.5", "9", "27"], [133, 132, "Calculus", "The gradient of the tangent to a curve C at (x, y) is given by 𝑑𝑦 𝑑𝑥= 1 (3𝑥 + 4)2. The curve passes through the point 𝑃(− 1 2 , 3). The equation of the curve C is given by", "𝑦 = 2 3𝑥 + 4 + 1", "𝑦 = − 6 3𝑥 + 4", "𝑦 = − 2 3𝑥 + 4 + 4", "𝑦 = − 1 3𝑥 + 4 + 1"], [134, 133, "Calculus", "The finite region R is bounded by the y-axis, the x-axis, and the curve 𝑦 = 𝑥(𝑥 − 3)² as shown in the figure above. The area of R in square units is", "1", "3", "9", "27"], [135, 134, "Calculus", "The finite region enclosed by the curve y = √x, x ≥ 0, the x-axis and the line x = 3 is rotated completely about the x-axis. The volume of the solid of revolution formed is given by:", "∫₀³ (1/3)√x dx", "π ∫₀³ x dx", "π ∫₀³ √x dx", "π ∫₀³ x² dx"], [136, 43, "Calculus", "The finite region enclosed by the curve 𝑦 = √𝑥, 𝑥 ≥ 0, the x-axis and the line x = 3, as shown in the figure above, is rotated completely about the x-axis. The volume of the solid of revolution formed is given by", "∫₀³ ( 1 3) √𝑥 dx", "𝜋 ∫₀³𝑥 𝑑𝑥", "𝜋 ∫₀³√𝑥 𝑑𝑥", "𝜋 ∫₀³𝑥² 𝑑𝑥"], [137, 135, "Calculus", "∫ (2𝑥 + 3)⁵ dx =", "[ 1 6 (2𝑥 + 3)6] + C", "[ 1 2 (2𝑥 + 3)6] + C", "[ 1 12 (2𝑥 + 3)6] + C", "[ 1 3 (2𝑥 + 3)6] + C"], [138, 136, "Calculus", "Given 𝑑𝑦 𝑑𝑥= 3 sin 𝑥− 2 cos x, the indefinite integral is given by", "𝑦 = 3 cos 𝑥− 2 sin 𝑥+ C", "𝑦 = −3 cos 𝑥+ 2 sin 𝑥+ C", "𝑦 = −3 cos 𝑥− 2 sin 𝑥+ C", "𝑦 = 3 cos 𝑥+ 2 sin 𝑥+ C"], [139, 137, "Calculus", "Given that 𝑦 = √5 – 𝑥, then 𝑑𝑦 𝑑𝑥 is:", "− 1 √5 − 𝑥", "1 √5 − 𝑥", "1 2√5 − 𝑥", "− 1 2√5 − 𝑥"], [140, 138, "Calculus", "The gradient function dy/dx of the curve 𝑦 = 𝑠𝑖𝑛(2𝑥² + 1) is:", "4𝑥 𝑐𝑜𝑠(2𝑥² + 1)", "𝑐𝑜𝑠(2𝑥² + 1)", "1 4𝑥cos(2𝑥2 + 1)", "−4𝑥 𝑐𝑜𝑠(2𝑥² + 1)"], [141, 139, "Calculus", "The point P(1, 1) lies on the curve 𝑦 = 3𝑥 – 2 2𝑥 – 1 . The gradient of the tangent at point P is:", "1", "3 2", "5", "−1"], [142, 140, "Calculus", "The curve C has the equation 𝑦 = 𝑓(𝑥). Curve C has a stationary point at (-1, 2). If 𝑓′′(𝑥) = 6 𝑥4 + 2, then the point (-1, 2) is:", "an optimum point", "a point of inflexion", "a minimum turning point", "a maximum turning point"], [143, 141, "Calculus", "𝐼𝑓 ∫𝑓(𝑥) 𝑑𝑥 4 1 = 6, then ∫4𝑓(𝑥) 𝑑𝑥 4 1 + 5", "9", "11", "29", "44"], [144, 142, "Calculus", "The region R is enclosed by the x-axis, the curve 𝑦 = −𝑥² + 2 and the lines 𝑥 = 0 and 𝑥 = 1. The area of R is:", "1", "5 3", "2", "7 3"], [145, 143, "Calculus", "The region in the first quadrant enclosed by the curve 𝑦 = 𝑥 – ½ 𝑥2, the lines 𝑥 = 0 and 𝑥 = 2 is rotated completely about the x-axis. The volume in 𝑢𝑛𝑖𝑡𝑠3 of the solid generated is:", "2𝜋 3", "8𝜋", "4𝜋 15", "64𝜋 15"], [146, 144, "Calculus", "Given that d/dx (x/(1 + x)) = 1/(1 + x)², then ∫₀² 3/(1 + x)² dx is equal to:", "−1/3", "1/3", "2/3", "2"], [147, 145, "C) 2/3", "The equation of a curve is given by y = (𝑥2 + 2)(𝑥 – 1)3. The gradient function, 𝑑𝑦 𝑑𝑥, is given by:", "(𝑥 − 1)(5𝑥2 − 2𝑥 + 6)", "(𝑥 − 1)2(−𝑥2 − 2𝑥 − 6)", "(𝑥 − 1)2(5𝑥2 − 2𝑥 + 6)", "(𝑥 − 1)2(5𝑥2 + 2𝑥 + 6)"], [148, 146, "Kinematics Question", "During the journey there is a stage when the boy accelerates. The value of the acceleration is:", "– 10.0 𝑚𝑠⁻²", "2.5 𝑚𝑠⁻²", "3.5 𝑚𝑠⁻²", "20.0 𝑚𝑠⁻²"], [149, 147, "Kinematics Question", "At the 10 m stopping point on a runway, an airplane is stationary before takeoff. If the plane travels 120 m from this point in 4 seconds, what is its speed at the point of takeoff?", "32 m/s", "27 m/s", "30 m/s", "50 m/s"], [150, 148, "Statistics", "There are 108 cards in a deck of UNO playing cards. There are four “Wild”, four “Wild Draw Four” and 25 each of four colours (red, yellow, green, blue). If a player needs to select 1 card, what is the probability of NOT drawing a “Wild Draw Four”?", "26 27", "25 108", "2 27", "1 108"], [151, 149, "Statistics", "One advantage of using a box and whisker plot is that:", "the variance can be identified", "all data values can be identified", "the mean value can be identified", "the spread of the distribution can be identified Items 147 and 148 refer to the following Venn diagram. There are 120 students in a school’s music club. The Venn diagram shows the probabilities that a randomly selected student plays the piano (N) or guitar (G)."], [152, 150, "Statistics", "What is the value of X?", "0.10", "0.35", "0.90", "1.00"], [153, 151, "Statistics", "What is P(N | G)?", "0.10", "0.40", "0.47", "0.70 Item refers to the following diagram:"], [154, 152, "Statistics", "The tree diagram above shows the probability of Events A and B occurring. Based on the diagram, the value of P(A | B) =", "1 5", "8 15", "3 5", "4 5"]];

const normalizeTopic = (topic: string) => {
  if (topic === "C) 2/3") return "Calculus";
  return topic;
};

type QuestionPatch = {
  topic?: string;
  subtopic?: string;
  difficulty?: string;
  stem?: string;
  options?: Partial<Record<OptionKey, string>>;
  correctAnswer?: OptionKey | null;
  explanation?: string;
  answerKeyStatus?: "pending" | "verified";
  exclude?: boolean;
};

const QUESTION_PATCHES: Record<number, QuestionPatch> = {
  18: {
    exclude: true,
    explanation: "Duplicate/incomplete item removed from active bank until cleaned.",
  },
  51: {
    exclude: true,
    explanation: "Duplicate item removed from active bank until cleaned.",
  },
  72: {
    stem: "The value of √18 + √50 is",
  },
  147: {
    topic: "Calculus",
    subtopic: "Calculus",
  },
};

const ANSWER_OVERRIDES: Record<number, { correctAnswer: OptionKey; explanation: string }> = {
  1: {
    correctAnswer: "C",
    explanation: "Expand first: a(b + c) − b(a + c) = ab + ac − ab − bc = ac − bc = c(a − b).",
  },
  2: {
    correctAnswer: "D",
    explanation: "Group terms: ab + 3c − 3b − ac = a(b − c) − 3(b − c) = (a − 3)(b − c).",
  },
  3: {
    correctAnswer: "C",
    explanation: "Group terms: ab + 3c − 3b − ac = a(b − c) − 3(b − c) = (a − 3)(b − c).",
  },
  4: {
    correctAnswer: "A",
    explanation: "Interpret as 1/(x + 3) + 3/(x^2 − 9). Since x^2 − 9 = (x + 3)(x − 3), the combined numerator is (x − 3) + 3 = x, giving x/(x^2 − 9).",
  },
  5: {
    correctAnswer: "A",
    explanation: "Rearrange: pq + 5r − 5q − pr = p(q − r) − 5(q − r) = (p − 5)(q − r).",
  },
  6: {
    correctAnswer: "A",
    explanation: "If x − 2 is a factor, then f(2) = 0. So 2^3 + 2(2^2) − 5(2) + k = 8 + 8 − 10 + k = 0, hence k = −6.",
  },
  7: {
    correctAnswer: "A",
    explanation: "Use the factor theorem. Substituting x = 2 gives 4(2^4) − 2(2^2) − 56 = 64 − 8 − 56 = 0, so x − 2 is a factor.",
  },
  8: {
    correctAnswer: "D",
    explanation: "Synthetic division of x^3 − 7x^2 + 2x − 1 by x + 2 gives quotient x^2 − 9x + 20 and remainder −41.",
  },
  9: {
    correctAnswer: "A",
    explanation: "Again test x = 2. For 4x^4 − 2x^2 − 56, substituting x = 2 gives 64 − 8 − 56 = 0, so x − 2 is a factor.",
  },
  10: {
    correctAnswer: "C",
    explanation: "If x + 2 is a factor, then f(−2) = 0. So 2(−2)^3 − 3(−2)^2 − 5(−2) + p = −16 − 12 + 10 + p = 0, hence p = 18.",
  },
  11: {
    correctAnswer: "D",
    explanation: "Using the factor theorem, x = 2 is a root. Dividing gives 2x² + 5x + 3, which factorizes to (2x + 3)(x + 1). So the full factorization is (x − 2)(x + 1)(2x + 3).",
  },
  12: {
    correctAnswer: "C",
    explanation: "For division by 2x − 1, use x = 1/2. Substituting gives 2(1/2)^3 + 3(1/2)^2 − 2(1/2) + 3 = 3, so the remainder is 3.",
  },
  13: {
    correctAnswer: "A",
    explanation: "Expand (2x + 1)(x + 2)(x − 3). This becomes 2x³ − x² − 13x − 6, so h = −13.",
  },
  14: {
    correctAnswer: "D",
    explanation: "Test the listed linear factors. Substituting x = 4 into x³ − 3x² − 3x − 4 gives 64 − 48 − 12 − 4 = 0, so x − 4 is a factor.",
  },
  15: {
    correctAnswer: "B",
    explanation: "∑(3r − 1) from r = 1 to 20 = 3∑r − ∑1 = 3(20×21/2) − 20 = 630 − 20 = 610.",
  },
  16: {
    correctAnswer: "B",
    explanation: "This is an AP with first term 30 and fourth term 24, so the common difference is −2. The 10th term is 12, so the total is 10/2 × (30 + 12) = 210 cm.",
  },
  17: {
    correctAnswer: "C",
    explanation: "For a GP, ar⁴ = 81 with a = 16. So r⁴ = 81/16 = (3/2)⁴, hence r = 3/2. The fourth term is 16(3/2)³ = 54.",
  },
  19: {
    correctAnswer: "C",
    explanation: "This GP has first term 81 and ratio 1/3. Sum to infinity = 81 / (1 − 1/3) = 81 / (2/3) = 121.5.",
  },
  20: {
    correctAnswer: "B",
    explanation: "In a GP, T₅ = 45 and T₇ = 5. Then r² = 5/45 = 1/9, so r = 1/3 since terms are positive. Therefore T₆ = 45 × 1/3 = 15.",
  },
  131: {
    correctAnswer: "A",
    explanation: "Using the power rule on y = 4x + 9/x gives a second derivative matching option A in the current answer key setup.",
  },
  137: {
    correctAnswer: "C",
    explanation: "Let u = 2x + 3, so du = 2 dx. Then ∫(2x + 3)^5 dx = 1/2 ∫u^5 du = 1/12 (2x + 3)^6 + C.",
  },
  146: {
    correctAnswer: "D",
    explanation: "Since d/dx [x/(1+x)] = 1/(1+x)^2, ∫_0^2 3/(1+x)^2 dx = 3[x/(1+x)]_0^2 = 3(2/3) = 2.",
  },
};

const QUESTION_AUDIT_NOTES: Array<{ id: number; note: string }> = [
  { id: 18, note: "Duplicate/incomplete arithmetic progression item." },
  { id: 51, note: "Duplicate quadratic equation item." },
  { id: 147, note: "Bad imported topic label fixed to Calculus." },
  { id: 151, note: "Statistics stem appears merged with the next prompt and should be split later." },
  { id: 153, note: "Statistics stem appears truncated and should be cleaned later." },
];

function buildPatchedQuestion(
  id: number,
  sourceNumber: number,
  topic: string,
  stem: string,
  A: string,
  B: string,
  C: string,
  D: string
): Question | null {
  const patch = QUESTION_PATCHES[id];
  if (patch?.exclude) return null;

  const safeTopic = patch?.topic ?? normalizeTopic(topic);
  const override = ANSWER_OVERRIDES[id];
  const options: Record<OptionKey, string> = {
    A: patch?.options?.A ?? A,
    B: patch?.options?.B ?? B,
    C: patch?.options?.C ?? C,
    D: patch?.options?.D ?? D,
  };

  return {
    id,
    sourceNumber,
    topic: safeTopic,
    subtopic: patch?.subtopic ?? safeTopic,
    difficulty: patch?.difficulty ?? "Medium",
    stem: patch?.stem ?? stem,
    options,
    correctAnswer: patch?.correctAnswer ?? override?.correctAnswer ?? null,
    explanation: patch?.explanation ?? override?.explanation ?? "",
    answerKeyStatus: patch?.answerKeyStatus ?? (override ? "verified" : "pending"),
    source: "Uploaded PDF",
  };
}

const QUESTION_BANK: Question[] = RAW_QUESTION_BANK
  .map(([id, sourceNumber, topic, stem, A, B, C, D]) => buildPatchedQuestion(id, sourceNumber, topic, stem, A, B, C, D))
  .filter((question): question is Question => question !== null);

const STORAGE_KEY = "teams-testing-app-prototype";
const ATTEMPTS_KEY = "teams-testing-app-attempts";
const RUNTIME_ENV: Record<string, string> = (() => {
  try {
    return (((import.meta as any)?.env ?? {}) as Record<string, string>);
  } catch {
    return {};
  }
})();
const SUPABASE_URL = RUNTIME_ENV.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = RUNTIME_ENV.VITE_SUPABASE_PUBLISHABLE_KEY || "";
const SUPABASE_TABLE = "quiz_attempts";
const SUPABASE_EXAM_CODE_TABLE = "exam_access_codes";
const SUPABASE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
const TEACHER_ACCESS_PASSWORD = RUNTIME_ENV.VITE_TEACHER_PASSWORD || "";
const TEACHER_SESSION_KEY = "teams-testing-app-teacher-access";
const STUDENT_SESSION_KEY = "teams-testing-app-student-session";

function normalizeMathWords(input: string) {
  let result = "";
  let buffer = "";

  const flush = () => {
    if (!buffer) return;
    result += buffer.length >= 2 ? buffer.normalize("NFKD") : buffer;
    buffer = "";
  };

  for (const char of input) {
    const normalized = char.normalize("NFKD");
    const isMathStyledLatinLetter = normalized.length === 1 && /[A-Za-z]/.test(normalized) && normalized !== char;

    if (isMathStyledLatinLetter) {
      buffer += char;
    } else {
      flush();
      result += char;
    }
  }

  flush();
  return result;
}

function promoteSimplePowers(text: string) {
  const isLetter = (char: string) => {
    const normalized = char.normalize("NFKD");
    return Boolean(normalized && normalized.toLowerCase() !== normalized.toUpperCase());
  };
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const prev = result[result.length - 1] || "";
    const next = text[i + 1] || "";
    const nextIsDigit = next >= "0" && next <= "9";

    if (
      char >= "2" &&
      char <= "9" &&
      !nextIsDigit &&
      prev !== "^" &&
      (isLetter(prev) || prev === ")" || prev === "]")
    ) {
      result += "^" + char;
      continue;
    }

    result += char;
  }

  return result;
}

function normalizeImportedMath(input: string) {
  let text = normalizeMathWords((input || "").trim());
  const bs = String.fromCharCode(92);
  const frac = (a: string, b: string) => `$${bs}frac{${a}}{${b}}$`;

  const replacements: Array<[string, string]> = [
    ["81/16", frac("81", "16")],
    ["23/4", frac("23", "4")],
    ["67/16", frac("67", "16")],
    ["−2/3", `-${frac("2", "3").replace(/^\$/, "").replace(/\$$/, "")}`],
    ["-2/3", `-${frac("2", "3").replace(/^\$/, "").replace(/\$$/, "")}`],
    ["-1/3", `-${frac("1", "3").replace(/^\$/, "").replace(/\$$/, "")}`],
    ["1/2", frac("1", "2")],
    ["1/3", frac("1", "3")],
    ["2/3", frac("2", "3")],
    ["3/2", frac("3", "2")],
    ["5/2", frac("5", "2")],
    ["x/(1 + x)", `$${bs}frac{x}{(1 + x)}$`],
    ["1/(1 + x)²", `$${bs}frac{1}{(1 + x)^2}$`],
    ["(3x + 5)/(2x − 11)", `$${bs}frac{(3x + 5)}{(2x − 11)}$`],
    ["(5x − 2)/(2 − 3x)", `$${bs}frac{(5x − 2)}{(2 − 3x)}$`],
    ["[(3x + 5)(2)+ (2x − 11)(3)]/(2x − 11)²", `$${bs}frac{[(3x + 5)(2)+ (2x − 11)(3)]}{(2x − 11)^2}$`],
    ["[(2x − 11)(3)+ (3x + 5)(2)]/(2x − 11)²", `$${bs}frac{[(2x − 11)(3)+ (3x + 5)(2)]}{(2x − 11)^2}$`],
    ["[(2x − 11)(3)− (3x + 5)(2)]/(2x − 11)²", `$${bs}frac{[(2x − 11)(3)− (3x + 5)(2)]}{(2x − 11)^2}$`],
    ["[(3x + 5)(2)− (2x − 11)(3)]/(2x − 11)²", `$${bs}frac{[(3x + 5)(2)− (2x − 11)(3)]}{(2x − 11)^2}$`],
    ["𝑑𝑦 𝑑𝑥", `$${bs}frac{dy}{dx}$`],
    ["dy/dx", `$${bs}frac{dy}{dx}$`],
    ["𝑑2𝑦 𝑑𝑥2", `$${bs}frac{d^2y}{dx^2}$`],
    ["d2y/dx2", `$${bs}frac{d^2y}{dx^2}$`],
    ["d/dx", `$${bs}frac{d}{dx}$`],
  ];

  replacements.forEach(([from, to]) => {
    text = text.replaceAll(from, to);
  });

  text = text
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/⁴/g, "^4")
    .replace(/⁵/g, "^5")
    .replace(/⁶/g, "^6")
    .replace(/⁷/g, "^7")
    .replace(/⁸/g, "^8")
    .replace(/⁹/g, "^9")
    .replace(/₀/g, "_0")
    .replace(/₁/g, "_1")
    .replace(/₂/g, "_2")
    .replace(/₃/g, "_3")
    .replace(/₄/g, "_4")
    .replace(/₅/g, "_5")
    .replace(/₆/g, "_6")
    .replace(/₇/g, "_7")
    .replace(/₈/g, "_8")
    .replace(/₉/g, "_9");

  text = promoteSimplePowers(text);

  const sentenceWords = [
    "the", "given", "value", "equation", "curve", "line", "point", "roots", "expression", "function",
    "which", "when", "what", "find", "then", "where", "between", "through", "parallel", "perpendicular",
    "radius", "centre", "graph", "sum", "first", "term", "range", "probability", "area", "volume",
    "coordinates", "enclosed", "bounded", "rotated", "question", "maximum", "minimum", "factorizes", "completely"
  ];
  const lowerText = text.toLowerCase();
  const hasSentenceWords = sentenceWords.some((word) => lowerText.includes(word));
  const shouldRenderAsMath = /\^|_|\frac|√|π|∫|Σ|∑|≤|≥/.test(text);
  if (PROFESSIONAL_EQUATION_RENDERING && shouldRenderAsMath && !hasSentenceWords && !text.includes(String.fromCharCode(36))) {
    return String.fromCharCode(36) + text + String.fromCharCode(36);
  }

  return text;
}

function RichMathText({ text, block = false }: { text: string; block?: boolean }) {
  const safeText = normalizeImportedMath((text || "").trim());
  const dollar = String.fromCharCode(36);

  const renderTextWithBreaks = (value: string) => {
    const lines = value.split("\n");
    return lines.map((line, index) => (
      <Fragment key={index}>
        {index > 0 ? <br /> : null}
        {line}
      </Fragment>
    ));
  };

  if (!PROFESSIONAL_EQUATION_RENDERING || !safeText.includes(dollar)) {
    return block
      ? <div className="whitespace-pre-wrap leading-relaxed">{renderTextWithBreaks(safeText)}</div>
      : <span className="whitespace-pre-wrap leading-relaxed">{renderTextWithBreaks(safeText)}</span>;
  }

  const pattern = /(\$\$[\s\S]+?\$\$|\$[^$]+\$)/g;
  const segments = safeText.split(pattern).filter(Boolean);

  const content = segments.map((segment, index) => {
    const isBlock = segment.startsWith(dollar + dollar) && segment.endsWith(dollar + dollar);
    const isInline = segment.startsWith(dollar) && segment.endsWith(dollar) && !isBlock;

    if (isBlock || isInline) {
      const math = isBlock ? segment.slice(2, -2) : segment.slice(1, -1);
      const html = katex.renderToString(math, {
        throwOnError: false,
        displayMode: isBlock || block,
        strict: "ignore",
      });

      return (
        <span
          key={index}
          className={isBlock ? "block my-2 overflow-x-auto" : "inline-block align-middle"}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    return <Fragment key={index}>{renderTextWithBreaks(segment)}</Fragment>;
  });

  return block
    ? <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
    : <span className="whitespace-pre-wrap leading-relaxed">{content}</span>;
}

function shuffleArray<T>(input: T[]) {
  const copy = [...input];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function optionEntries(options: Record<OptionKey, string>) {
  return Object.entries(options) as [OptionKey, string][];
}

function formatSeconds(total: number) {
  const safe = Math.max(0, total);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function getTopics() {
  return Array.from(
    new Set(
      QUESTION_BANK.map((q) => q.topic).filter((topic) => topic.trim() && topic !== "C) 2/3")
    )
  ).sort();
}

function modeLabel(mode: Mode) {
  return mode === "homework" ? "trial" : mode;
}

function optionTileClasses(selected: boolean) {
  return [
    "w-full rounded-md border p-4 text-left shadow-sm transition-all",
    selected
      ? "border-slate-900 bg-slate-900 text-white ring-2 ring-slate-900/25"
      : "border-slate-200 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50",
  ].join(" ");
}

function optionKeyClasses(selected: boolean) {
  return selected ? "text-2xl font-bold text-white" : "text-2xl font-bold text-slate-900";
}

function optionTextClasses(selected: boolean) {
  return selected ? "mt-2 text-sm leading-6 text-white md:text-base" : "mt-2 text-sm leading-6 text-slate-800 md:text-base";
}

function buildAttempt(config: {
  studentName: string;
  schoolName?: string;
  studentEmail?: string;
  studentAuthUserId?: string;
  selectedTopics: string[];
  questionCount: number;
  mode: Mode;
}) {
  const bank = QUESTION_BANK.filter((q) => config.selectedTopics.includes(q.topic));
  const shuffledQuestions = shuffleArray(bank).slice(0, config.questionCount).map((q) => {
    const shuffledOptions = shuffleArray(optionEntries(q.options));
    const remapped = shuffledOptions.reduce((acc, [_, value], index) => {
      const newKey = ["A", "B", "C", "D"][index] as OptionKey;
      acc[newKey] = value;
      return acc;
    }, {} as Record<OptionKey, string>);
    const originalCorrectText = q.correctAnswer ? q.options[q.correctAnswer] : undefined;
    const newCorrect = originalCorrectText
      ? ((Object.entries(remapped).find(([_, value]) => value === originalCorrectText)?.[0] || "A") as OptionKey)
      : null;
    return { ...q, options: remapped, correctAnswer: newCorrect, answerKeyStatus: newCorrect ? "verified" : "pending" };
  });

  const durationMinutes = config.mode === "exam" ? 90 : config.mode === "homework" ? Math.max(20, config.questionCount * 2) : 0;

  const attempt: Attempt = {
    id: crypto.randomUUID(),
    studentName: config.studentName,
    schoolName: config.schoolName || "",
    studentEmail: config.studentEmail || "",
    studentAuthUserId: config.studentAuthUserId || "",
    selectedTopics: config.selectedTopics,
    questionCount: shuffledQuestions.length,
    mode: config.mode,
    startedAt: new Date().toISOString(),
    durationMinutes,
    questions: shuffledQuestions,
    answers: shuffledQuestions.map((q) => ({
      questionId: q.id,
      changedCount: 0,
      timeSpentSeconds: 0,
    })),
    score: 0,
    percentage: 0,
    scoredQuestionCount: 0,
    integrityEvents: [],
  };
  return attempt;
}

function saveCurrentAttempt(attempt: Attempt | null) {
  if (!attempt) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempt));
}

function getSavedAttempt(): Attempt | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Attempt;
  } catch {
    return null;
  }
}

function saveCompletedAttempt(attempt: Attempt) {
  const raw = localStorage.getItem(ATTEMPTS_KEY);
  const items = raw ? (JSON.parse(raw) as Attempt[]) : [];
  const withoutSameId = items.filter((x) => x.id !== attempt.id);
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify([attempt, ...withoutSameId]));
}

function getCompletedAttempts(): Attempt[] {
  const raw = localStorage.getItem(ATTEMPTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Attempt[];
  } catch {
    return [];
  }
}

async function saveCompletedAttemptToDatabase(attempt: Attempt) {
  saveCompletedAttempt(attempt);

  if (!SUPABASE_ENABLED) return;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify([
      {
        id: attempt.id,
        student_name: attempt.studentName,
        school_name: attempt.schoolName || null,
        studentEmail: attempt.studentEmail || null,
        mode: attempt.mode,
        percentage: attempt.percentage,
        submitted_at: attempt.submittedAt ?? new Date().toISOString(),
        integrity_flags: attempt.integrityEvents.length,
        teacher_feedback: attempt.teacherFeedback ?? null,
        payload: attempt,
      },
    ]),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Supabase insert error", response.status, details);
    throw new Error(`Failed to save attempt to Supabase (${response.status}). ${details}`);
  }
}

async function getCompletedAttemptsFromDatabase(): Promise<Attempt[]> {
  if (!SUPABASE_ENABLED) return getCompletedAttempts();

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?select=payload&order=submitted_at.desc.nullslast`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );

  if (!response.ok) {
    return getCompletedAttempts();
  }

  const rows = (await response.json()) as Array<{ payload?: Attempt }>;
  const attempts = rows.map((row) => row.payload).filter(Boolean) as Attempt[];
  return attempts.length ? attempts : getCompletedAttempts();
}

async function saveTeacherFeedbackToDatabase(attempt: Attempt) {
  const updatedAttempts = [attempt, ...getCompletedAttempts().filter((item) => item.id !== attempt.id)];
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(updatedAttempts));

  if (!SUPABASE_ENABLED) return;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(attempt.id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      teacher_feedback: attempt.teacherFeedback ?? null,
      payload: attempt,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Supabase feedback error", response.status, details);
    throw new Error(`Failed to save teacher feedback to Supabase (${response.status}). ${details}`);
  }
}

async function signInStudent(email: string, password: string): Promise<StudentAuthSession> {
  if (!SUPABASE_ENABLED) {
    throw new Error("Supabase is not configured for student login yet.");
  }

  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const raw = await response.text();
  let data: any = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = { message: raw };
  }

  if (!response.ok) {
    throw new Error(data?.msg || data?.message || "Unable to sign in.");
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    email: data.user?.email || email,
    userId: data.user?.id,
  };
}

async function signUpStudent(email: string, password: string): Promise<{ session?: StudentAuthSession; message: string }> {
  if (!SUPABASE_ENABLED) {
    throw new Error("Supabase is not configured for student login yet.");
  }

  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const raw = await response.text();
  let data: any = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = { message: raw };
  }

  if (!response.ok) {
    throw new Error(data?.msg || data?.message || "Unable to create account.");
  }

  if (data.access_token && data.user) {
    return {
      session: {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        email: data.user.email || email,
        userId: data.user.id,
      },
      message: "Account created and signed in.",
    };
  }

  return {
    message: "Account created. Sign in with your email and password to start the quiz.",
  };
}

async function consumeExamAccessCode(studentEmail: string, code: string) {
  if (!SUPABASE_ENABLED) {
    throw new Error("Supabase is not configured for exam codes yet.");
  }

  const checkResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/${SUPABASE_EXAM_CODE_TABLE}?select=code&code=eq.${encodeURIComponent(code)}&student_email=eq.${encodeURIComponent(studentEmail)}&used_at=is.null`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );

  const checkRaw = await checkResponse.text();
  let checkData: any = [];
  try {
    checkData = checkRaw ? JSON.parse(checkRaw) : [];
  } catch {
    checkData = [];
  }

  if (!checkResponse.ok) {
    throw new Error("Unable to validate the exam code right now.");
  }

  if (!Array.isArray(checkData) || checkData.length === 0) {
    throw new Error("This exam code is invalid, assigned to a different student, or has already been used.");
  }

  const patchResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/${SUPABASE_EXAM_CODE_TABLE}?code=eq.${encodeURIComponent(code)}&student_email=eq.${encodeURIComponent(studentEmail)}&used_at=is.null`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ used_at: new Date().toISOString() }),
    }
  );

  if (!patchResponse.ok) {
    const details = await patchResponse.text();
    throw new Error(`Unable to lock this exam code for one-time use. ${details}`);
  }
}

function scoreAttempt(attempt: Attempt) {
  const answers = attempt.answers.map((answer) => {
    const question = attempt.questions.find((q) => q.id === answer.questionId)!;
    return {
      ...answer,
      isCorrect: question.correctAnswer ? answer.selected === question.correctAnswer : undefined,
    };
  });
  const score = answers.filter((a) => a.isCorrect === true).length;
  const scoredQuestionCount = attempt.questions.filter((q) => !!q.correctAnswer).length;
  const totalTime = answers.reduce((sum, a) => sum + a.timeSpentSeconds, 0);
  const integrityEvents = [...attempt.integrityEvents];
  if (attempt.questions.length > 0 && totalTime > 0 && totalTime / attempt.questions.length < 8) {
    integrityEvents.push({
      type: "very_fast_finish",
      at: new Date().toISOString(),
      details: "Average response time was under 8 seconds per question.",
    });
  }
  return {
    ...attempt,
    answers,
    score,
    percentage: scoredQuestionCount ? Math.round((score / scoredQuestionCount) * 100) : 0,
    scoredQuestionCount,
    integrityEvents,
    submittedAt: new Date().toISOString(),
  } as Attempt;
}

function StudentLoginGate({
  mode,
  email,
  password,
  message,
  busy,
  onModeChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: {
  mode: "signin" | "signup";
  email: string;
  password: string;
  message: string;
  busy: boolean;
  onModeChange: (value: "signin" | "signup") => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.75fr] items-start">
      <Card className="rounded-md border border-slate-200 overflow-hidden bg-white shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
        <CardHeader className="border-b border-slate-200 bg-slate-50/80">
          <CardTitle className="text-2xl">Student login</CardTitle>
          <CardDescription>Sign in with your email and password before you start the quiz.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant={mode === "signin" ? "default" : "outline"} className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => onModeChange("signin")}>Sign in</Button>
            <Button variant={mode === "signup" ? "default" : "outline"} className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => onModeChange("signup")}>Create account</Button>
          </div>
          <div className="space-y-2">
            <Label>Email address</Label>
            <Input type="email" value={email} onChange={(e) => onEmailChange(e.target.value)} placeholder="Enter your email address" className="rounded-sm" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => onPasswordChange(e.target.value)} placeholder="Enter your password" className="rounded-sm" />
          </div>
          {message ? <div className="rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">{message}</div> : null}
          <Button className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={onSubmit} disabled={busy}>
            {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </CardContent>
      </Card>
      <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardTitle className="text-xl">Student access</CardTitle>
          <CardDescription>Use your email and password to open the quiz.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <div>• New students should create an account first.</div>
          <div>• Returning students can sign in with the same details.</div>
          <div>• After signing in, complete your quiz setup and start the test.</div>
          <div>• Keep your login details private.</div>
        </CardContent>
      </Card>
    </div>
  );
}

function StudentPanel() {
  const topics = getTopics();
  const [studentName, setStudentName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentSession, setStudentSession] = useState<StudentAuthSession | null>(null);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [examCode, setExamCode] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(topics.slice(0, 3));
  const [questionCount, setQuestionCount] = useState("10");
  const [mode, setMode] = useState<Mode>("practice");
  const EXAM_MODE_QUESTION_COUNT = 45;
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [submitted, setSubmitted] = useState<Attempt | null>(null);
  const questionStartRef = useRef(Date.now());

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STUDENT_SESSION_KEY);
      if (!raw) return;
      const restored = JSON.parse(raw) as StudentAuthSession;
      setStudentSession(restored);
      setStudentEmail(restored.email || "");
      setAuthEmail(restored.email || "");
    } catch {
      setStudentSession(null);
    }
  }, []);

  useEffect(() => {
    const saved = getSavedAttempt();
    if (saved && !saved.submittedAt) {
      const restored = {
        ...saved,
        integrityEvents: [
          ...saved.integrityEvents,
          { type: "refresh_recovery", at: new Date().toISOString(), details: "Attempt restored after refresh or reconnect." },
        ],
      };
      setAttempt(restored);
      setSecondsLeft(Math.max(0, restored.durationMinutes * 60 - Math.floor((Date.now() - new Date(restored.startedAt).getTime()) / 1000)));
    }
  }, []);

  useEffect(() => {
    if (!attempt || attempt.durationMinutes === 0 || submitted) return;
    const timer = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - new Date(attempt.startedAt).getTime()) / 1000);
      const remaining = Math.max(0, attempt.durationMinutes * 60 - elapsed);
      setSecondsLeft(remaining);
      if (remaining === 0) {
        submitAttempt();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [attempt, submitted]);

  useEffect(() => {
    const handleVisibility = () => {
      if (!attempt || submitted) return;
      const event: IntegrityEvent = {
        type: document.hidden ? "tab_blur" : "tab_focus",
        at: new Date().toISOString(),
        details: document.hidden ? "Student switched away from the test view." : "Student returned to the test view.",
      };
      setAttempt((prev) => (prev ? { ...prev, integrityEvents: [...prev.integrityEvents, event] } : prev));
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [attempt, submitted]);

  useEffect(() => {
    saveCurrentAttempt(attempt);
  }, [attempt]);

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((x) => x !== topic) : [...prev, topic]));
  }

  function toggleAllTopics(checked: boolean) {
    setSelectedTopics(checked ? [...topics] : []);
  }

  async function handleStudentAuth() {
    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthMessage("Enter your email address and password.");
      return;
    }

    setAuthBusy(true);
    setAuthMessage("");

    try {
      if (authMode === "signin") {
        const session = await signInStudent(authEmail.trim(), authPassword);
        setStudentSession(session);
        setStudentEmail(session.email);
        sessionStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(session));
        setAuthPassword("");
      } else {
        const result = await signUpStudent(authEmail.trim(), authPassword);
        if (result.session) {
          setStudentSession(result.session);
          setStudentEmail(result.session.email);
          sessionStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(result.session));
          setAuthPassword("");
          setAuthMessage(result.message);
        } else {
          setAuthMode("signin");
          setAuthPassword("");
          setAuthMessage(result.message);
        }
      }
    } catch (error) {
      setAuthMessage(error instanceof Error ? error.message : "Unable to continue with student login.");
    } finally {
      setAuthBusy(false);
    }
  }

  function signOutStudent() {
    const hasActiveAttempt = !!attempt && !submitted && !attempt.submittedAt;
    if (hasActiveAttempt) {
      const confirmed = window.confirm("Sign out and clear your current attempt?");
      if (!confirmed) return;
    }

    saveCurrentAttempt(null);
    setAttempt(null);
    setSubmitted(null);
    setIndex(0);
    setSecondsLeft(0);
    setStudentSession(null);
    setStudentEmail("");
    setStudentName("");
    setSchoolName("");
    setAuthEmail("");
    setAuthPassword("");
    setAuthMessage("");
    try {
      sessionStorage.removeItem(STUDENT_SESSION_KEY);
    } catch {
      // Ignore preview storage issues.
    }
  }

  async function startAttempt() {
    if (!studentName.trim()) {
      window.alert("Please enter your name before starting the quiz.");
      return;
    }

    if (mode === "exam" || mode === "practice") {
      if (!examCode.trim()) {
        window.alert("Enter the access code given by your teacher.");
        return;
      }

      try {
        await consumeExamAccessCode(studentSession?.email || studentEmail.trim(), examCode.trim());
      } catch (error) {
        window.alert(error instanceof Error ? error.message : "Unable to validate the access code.");
        return;
      }
    }

    const availableQuestionCount = QUESTION_BANK.filter((q) => selectedTopics.includes(q.topic)).length;
    const requestedCount = mode === "exam" ? EXAM_MODE_QUESTION_COUNT : mode === "homework" ? 10 : Number(questionCount || 1);
    const cleanCount = Math.min(Math.max(1, requestedCount), availableQuestionCount);
    const newAttempt = buildAttempt({
      studentName: studentName.trim() || "Student",
      schoolName: schoolName.trim(),
      studentEmail: studentSession?.email || studentEmail.trim(),
      studentAuthUserId: studentSession?.userId,
      selectedTopics: selectedTopics.length ? selectedTopics : [topics[0]],
      questionCount: cleanCount,
      mode,
    });
    setAttempt(newAttempt);
    setSubmitted(null);
    setIndex(0);
    questionStartRef.current = Date.now();
    setSecondsLeft(newAttempt.durationMinutes * 60);
    if (mode === "exam" || mode === "practice") {
      setExamCode("");
    }
  }

  function recordTimeOnCurrentQuestion() {
    if (!attempt) return;
    const currentQuestion = attempt.questions[index];
    const elapsed = Math.max(1, Math.floor((Date.now() - questionStartRef.current) / 1000));
    setAttempt((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        answers: prev.answers.map((a) =>
          a.questionId === currentQuestion.id ? { ...a, timeSpentSeconds: a.timeSpentSeconds + elapsed } : a
        ),
      };
    });
    questionStartRef.current = Date.now();
  }

  function selectAnswer(option: OptionKey) {
    if (!attempt) return;
    const currentQuestion = attempt.questions[index];
    setAttempt((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        answers: prev.answers.map((a) =>
          a.questionId === currentQuestion.id
            ? {
                ...a,
                selected: option,
                changedCount: a.selected && a.selected !== option ? a.changedCount + 1 : a.changedCount,
              }
            : a
        ),
      };
    });
  }

  function goToQuestion(nextIndex: number) {
    if (!attempt) return;
    recordTimeOnCurrentQuestion();
    setIndex(Math.max(0, Math.min(nextIndex, attempt.questions.length - 1)));
  }

  async function submitAttempt() {
    if (!attempt) return;
    recordTimeOnCurrentQuestion();
    const finalAttempt = scoreAttempt(attempt);

    try {
      await saveCompletedAttemptToDatabase(finalAttempt);
    } catch (error) {
      console.error("Supabase save failed. Keeping local result only.", error);
    } finally {
      saveCurrentAttempt(null);
      setSubmitted(finalAttempt);
      setAttempt(finalAttempt);
    }
  }

  function goHome() {
    const hasActiveAttempt = !!attempt && !submitted && !attempt.submittedAt;
    if (hasActiveAttempt) {
      const confirmed = window.confirm("Leave this quiz and return to Home? Your current attempt will be cleared.");
      if (!confirmed) return;
    }
    saveCurrentAttempt(null);
    setAttempt(null);
    setSubmitted(null);
    setIndex(0);
    setSecondsLeft(0);
  }

  const allTopicsSelected = topics.length > 0 && selectedTopics.length === topics.length;

  const currentQuestion = attempt?.questions[index];
  const currentAnswer = attempt?.answers.find((a) => a.questionId === currentQuestion?.id);
  const answeredCount = attempt?.answers.filter((a) => a.selected).length ?? 0;
  const progress = attempt ? (answeredCount / Math.max(1, attempt.questions.length)) * 100 : 0;

  const topicStats = useMemo(() => {
    if (!submitted) return [] as { topic: string; score: number; total: number }[];
    const grouped = new Map<string, { topic: string; score: number; total: number }>();
    submitted.questions.forEach((q) => {
      const answer = submitted.answers.find((a) => a.questionId === q.id);
      const entry = grouped.get(q.topic) || { topic: q.topic, score: 0, total: 0 };
      entry.total += 1;
      if (answer?.isCorrect) entry.score += 1;
      grouped.set(q.topic, entry);
    });
    return Array.from(grouped.values());
  }, [submitted]);

  if (!studentSession) {
    return (
      <StudentLoginGate
        mode={authMode}
        email={authEmail}
        password={authPassword}
        message={authMessage}
        busy={authBusy}
        onModeChange={setAuthMode}
        onEmailChange={setAuthEmail}
        onPasswordChange={setAuthPassword}
        onSubmit={() => void handleStudentAuth()}
      />
    );
  }

  if (submitted && submitted.mode === "homework") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-600">Trial submitted</div>
          <Button variant="outline" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={goHome}>Home</Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <CardHeader>
              <CardTitle className="text-xl">Trial completed</CardTitle>
              <CardDescription>{submitted.studentName}{submitted.schoolName ? ` · ${submitted.schoolName}` : ""}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm uppercase tracking-wide text-slate-500">Total marks</div>
              <div className="text-4xl font-bold">{submitted.scoredQuestionCount > 0 ? `${submitted.score}/${submitted.scoredQuestionCount}` : `${submitted.score}/${submitted.questions.length}`}</div>
              <div className="text-sm text-slate-600">Trial mode shows your total marks and question results only.</div>
              <div className="grid gap-2">
                <Button className="w-full rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => {
                  setSubmitted(null);
                  setAttempt(null);
                  setIndex(0);
                }}>Try another quiz</Button>
                <Button variant="outline" className="w-full rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={goHome}>Home</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <CardHeader>
              <CardTitle className="text-xl">Review your answers</CardTitle>
              <CardDescription>See the answer you selected for each trial question.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {submitted.questions.map((q, idx) => {
                const answer = submitted.answers.find((a) => a.questionId === q.id)!;
                return (
                  <Card key={q.id} className="rounded-md border">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-medium">Q{idx + 1}. <RichMathText text={q.stem} /></div>
                        <Badge variant={q.correctAnswer ? (answer.isCorrect ? "default" : "destructive") : "secondary"}>
                            {q.correctAnswer ? (answer.isCorrect ? "Correct" : "Incorrect") : "Correct answer unavailable"}
                        </Badge>
                      </div>

                      <div className="text-sm text-slate-700 space-y-1">
                        <div>
                          Selected: <strong>{answer.selected || "No answer"}</strong>
                          {answer.selected ? <> — <RichMathText text={q.options[answer.selected]} /></> : null}
                        </div>
                        {q.correctAnswer ? (
                          <div>
                            Correct answer: <strong>{q.correctAnswer}</strong>
                            <> — <RichMathText text={q.options[q.correctAnswer]} /></>
                          </div>
                        ) : null}
                      </div>

                      {q.correctAnswer ? (
                        <div className="rounded-sm bg-slate-50 p-3 text-sm text-slate-700">
                          <RichMathText text={q.explanation || "Answer key loaded. Explanation can be added next."} block />
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-600">Your results</div>
          <Button variant="outline" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={goHome}>Home</Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1 rounded-md shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Nice work!</CardTitle>
              <CardDescription>{submitted.studentName}{submitted.schoolName ? ` · ${submitted.schoolName}` : ""}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm uppercase tracking-wide text-slate-500">Total marks</div>
              <div className="text-4xl font-bold">{submitted.scoredQuestionCount > 0 ? `${submitted.score}/${submitted.scoredQuestionCount}` : `${submitted.score}/${submitted.questions.length}`}</div>
              <div className="text-sm text-slate-600">{submitted.scoredQuestionCount > 0 ? "Correct answers are shown for questions with loaded answer keys." : `All ${submitted.questions.length} questions are loaded, but the answer key still needs to be added.`}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm"><span>Mode</span><Badge>{submitted.mode}</Badge></div>
                <div className="flex items-center justify-between text-sm"><span>Integrity events</span><Badge variant="secondary">{submitted.integrityEvents.length}</Badge></div>
              </div>
              <div className="grid gap-2">
                <Button className="w-full rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => {
                  setSubmitted(null);
                  setAttempt(null);
                  setIndex(0);
                }}>Try another quiz</Button>
                <Button variant="outline" className="w-full rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={goHome}>Home</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 rounded-md shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">How you did</CardTitle>
              <CardDescription>See your score by topic and review each answer after you submit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {topicStats.map((item) => (
                  <Card key={item.topic} className="rounded-md border">
                    <CardContent className="p-4">
                      <div className="font-medium">{item.topic}</div>
                      <div className="mt-2 text-2xl font-semibold">{Math.round((item.score / item.total) * 100)}%</div>
                      <div className="text-sm text-slate-600">{item.score} of {item.total} correct</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-3">
                <div className="font-medium">Review your answers</div>
                {submitted.questions.map((q, idx) => {
                  const answer = submitted.answers.find((a) => a.questionId === q.id)!;
                  return (
                    <Card key={q.id} className="rounded-md border">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="font-medium">Q{idx + 1}. <RichMathText text={q.stem} /></div>
                          <Badge variant={q.correctAnswer ? (answer.isCorrect ? "default" : "destructive") : "secondary"}>
                            {q.correctAnswer ? (answer.isCorrect ? "Correct" : "Incorrect") : "Correct answer unavailable"}
                          </Badge>
                        </div>

                        <div className="text-sm text-slate-700 space-y-1">
                          <div>
                            Selected: <strong>{answer.selected || "No answer"}</strong>
                            {answer.selected ? <> — <RichMathText text={q.options[answer.selected]} /></> : null}
                          </div>
                          {q.correctAnswer ? (
                            <div>
                              Correct answer: <strong>{q.correctAnswer}</strong>
                              <> — <RichMathText text={q.options[q.correctAnswer]} /></>
                            </div>
                          ) : null}
                        </div>

                        {q.correctAnswer ? (
                          <div className="rounded-sm bg-slate-50 p-3 text-sm text-slate-700">
                            <RichMathText text={q.explanation || "Answer key loaded. Explanation can be added next."} block />
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="space-y-2 rounded-md border border-amber-200 bg-amber-50 p-4">
                <div className="font-medium text-amber-900">Fair play notes</div>
                {submitted.integrityEvents.length === 0 ? (
                  <div className="text-sm text-amber-900">No flagged integrity events were detected in this attempt.</div>
                ) : (
                  <div className="space-y-2 text-sm text-amber-900">
                    {submitted.integrityEvents.map((event, i) => (
                      <div key={`${event.at}-${i}`}>• {event.type.replaceAll("_", " ")} — {event.details}</div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (attempt && currentQuestion) {
    return (
      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardTitle className="text-lg">Quiz progress</CardTitle>
            <CardDescription>{studentName || attempt.studentName}{attempt.schoolName ? ` · ${attempt.schoolName}` : ""} · {modeLabel(attempt.mode)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{answeredCount}/{attempt.questions.length}</span>
              </div>
              <Progress value={progress} />
            </div>

            {attempt.durationMinutes > 0 ? (
              <div className="rounded-sm border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">Time left</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">{formatSeconds(secondsLeft)}</div>
              </div>
            ) : null}

            <div className="space-y-3">
              <div className="text-sm font-medium text-slate-700">Jump to a question</div>
              <div className="grid grid-cols-5 gap-2">
                {attempt.questions.map((question, questionIndex) => {
                  const answer = attempt.answers.find((a) => a.questionId === question.id);
                  const isCurrent = questionIndex === index;
                  const isAnswered = !!answer?.selected;
                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => goToQuestion(questionIndex)}
                      className={[
                        "rounded-sm border px-3 py-2 text-sm font-medium transition-colors",
                        isCurrent
                          ? "border-slate-900 bg-slate-900 text-white"
                          : isAnswered
                            ? "border-sky-200 bg-slate-50 text-slate-900"
                            : "border-slate-200 bg-white text-slate-700",
                      ].join(" ")}
                    >
                      {questionIndex + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-sm border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Stay in this quiz tab while you work. Your progress is saved as you go.
            </div>

            <div className="grid gap-2">
              <Button variant="outline" className="w-full rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={goHome}>Home</Button>
              <Button className="w-full rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={submitAttempt}>Submit test</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <Badge variant="outline" className="rounded-sm bg-white">{currentQuestion.topic}</Badge>
              <Badge variant="outline" className="rounded-sm bg-white">{currentQuestion.subtopic}</Badge>
              <Badge variant="outline" className="rounded-sm bg-white">{currentQuestion.difficulty}</Badge>
            </div>
            <CardTitle className="text-4xl font-bold tracking-tight">Question {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-6 text-lg leading-8 text-slate-900 md:text-xl">
              <RichMathText text={currentQuestion.stem} block />
            </div>

            <div className="space-y-4">
              {optionEntries(currentQuestion.options).map(([key, value]) => {
                const isSelected = currentAnswer?.selected === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectAnswer(key)}
                    className={optionTileClasses(isSelected)}
                  >
                    <div className={optionKeyClasses(isSelected)}>{key}</div>
                    <div className={optionTextClasses(isSelected)}>
                      <RichMathText text={value} block />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-sm bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Choose the best answer. You will see answers and explanations after you submit.
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button variant="outline" className="rounded-md px-6 shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => goToQuestion(index - 1)} disabled={index === 0}>Previous</Button>
              <div className="text-sm text-slate-600">Question {index + 1} of {attempt.questions.length}</div>
              {index < attempt.questions.length - 1 ? (
                <Button className="rounded-md px-6 shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => goToQuestion(index + 1)}>Next</Button>
              ) : (
                <Button className="rounded-md px-6 shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={submitAttempt}>Finish</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm text-slate-500">Signed in as {studentSession.email}</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={signOutStudent}>Sign out</Button>
          <Button variant="outline" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={goHome}>Home</Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.45fr_0.75fr] items-start">
        <Card className="rounded-md border border-slate-200 overflow-hidden bg-white shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
          <CardHeader className="border-b border-slate-200 bg-slate-50/80">
                        <CardTitle className="text-2xl">Let’s set up your quiz</CardTitle>
            <CardDescription>Pick your topics, choose how many questions you want, and start when you are ready.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Your name</Label>
                <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Type your full name" className="rounded-sm" />
                {!studentName.trim() && <div className="text-xs text-rose-600">Enter your name before you can start the quiz.</div>}
              </div>
              <div className="space-y-2">
                <Label>School name</Label>
                <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="Type your school name" className="rounded-sm" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Label>Pick your topics</Label>
                <Button
                  variant={allTopicsSelected ? "default" : "outline"}
                  className="rounded-md"
                  onClick={() => toggleAllTopics(!allTopicsSelected)}
                >
                  {allTopicsSelected ? "Clear topics" : "All topics"}
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {topics.map((topic) => {
                  const active = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={cn(
                        "rounded-md border p-3 text-left text-sm transition",
                        active
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-800 hover:border-slate-400"
                      )}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>How many questions?</Label>
                <Input type="number" min={1} max={QUESTION_BANK.length} value={mode === "exam" ? String(EXAM_MODE_QUESTION_COUNT) : mode === "homework" ? "10" : questionCount} onChange={(e) => setQuestionCount(e.target.value)} disabled={mode === "exam" || mode === "homework"} className="rounded-sm" />
              </div>
              <div className="space-y-2">
                <Label>Quiz type</Label>
                <Select value={mode} onValueChange={(value) => {
                  const nextMode = value as Mode;
                  setMode(nextMode);
                  if (nextMode === "exam") {
                    setQuestionCount(String(EXAM_MODE_QUESTION_COUNT));
                  } else if (nextMode === "homework") {
                    setQuestionCount("10");
                  }
                }}>
                  <SelectTrigger className="rounded-sm"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="practice">Practice mode</SelectItem>
                    <SelectItem value="homework">Trial mode (10 questions)</SelectItem>
                    <SelectItem value="exam">Exam mode (45 questions)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {mode === "exam" || mode === "practice" ? (
                <div className="space-y-2 md:col-span-2">
                  <Label>{mode === "exam" ? "One-time exam code" : "Practice access code"}</Label>
                  <Input value={examCode} onChange={(e) => setExamCode(e.target.value)} placeholder={mode === "exam" ? "Enter the one-time exam code given by your teacher" : "Enter the practice code given by your teacher"} className="rounded-sm" />
                  <div className="text-xs text-slate-500">This code can be used only once for {mode === "exam" ? "exam" : "practice"} mode.</div>
                </div>
              ) : null}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <Card className="rounded-md border border-slate-200 bg-slate-50">
                <CardContent className="p-4 text-sm">
                  <div className="font-medium">Mixed-up questions</div>
                  <div className="mt-2 text-slate-600">Questions and answer choices are shuffled each time you start.</div>
                </CardContent>
              </Card>
              <Card className="rounded-md border border-slate-200 bg-slate-50">
                <CardContent className="p-4 text-sm">
                  <div className="font-medium">Fair play check</div>
                  <div className="mt-2 text-slate-600">The quiz keeps track of tab switching and saves your progress as you work.</div>
                </CardContent>
              </Card>
              <Card className="rounded-md border border-slate-200 bg-slate-50">
                <CardContent className="p-4 text-sm">
                  <div className="font-medium">Answers later</div>
                  <div className="mt-2 text-slate-600">{ANSWERS_VISIBLE_ONLY_AFTER_SUBMIT ? "Answers and explanations stay hidden until after submission." : "Answers may be shown during the attempt."}</div>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              {mode === "exam" ? `Exam mode uses ${EXAM_MODE_QUESTION_COUNT} questions, a 90-minute timer, and a one-time access code.` : mode === "homework" ? "Trial mode uses 10 questions and does not show a performance summary after submission." : "Practice mode requires a teacher-issued access code before the quiz starts."}
            </div>

            <Button className="rounded-md px-6 text-base shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => void startAttempt()} disabled={selectedTopics.length === 0 || !studentName.trim()}>Start my quiz</Button>
          </CardContent>
        </Card>

        <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardTitle className="text-xl">Instructions</CardTitle>
            <CardDescription>Follow these steps to complete the test successfully.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <div>• Sign in before starting the test.</div>
            <div>• Enter your name before starting the test.</div>
            <div>• Add your school name if needed.</div>
            <div>• Your signed-in email is used only for login.</div>
            <div>• Choose one topic or select <strong>All topics</strong> for a mixed test.</div>
            <div>• Select the number of questions, then choose the quiz type.</div>
            <div>• Trial mode always uses 10 questions.</div>
            <div>• Read each question carefully and select the best answer.</div>
            <div>• Use <strong>Next</strong>, <strong>Previous</strong>, or the question buttons to move around the test.</div>
            <div>• Your answers are saved while you work.</div>
            <div>• In practice and exam modes, enter the access code given by your teacher.</div>
            <div>• In timed modes, watch the timer and submit before time runs out.</div>
            <div>• Click <strong>Submit test</strong> when you are finished.</div>
            <div>• You will see answers and explanations only after submission.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TeacherPanel() {
  const auditNotesById = useMemo(() => {
    return QUESTION_AUDIT_NOTES.reduce<Record<number, string>>((acc, item) => {
      acc[item.id] = item.note;
      return acc;
    }, {});
  }, []);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [feedbackDrafts, setFeedbackDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadAttempts() {
      try {
        const loadedAttempts = await getCompletedAttemptsFromDatabase();
        setAttempts(loadedAttempts);
      } catch (error) {
        console.error("Supabase load failed. Falling back to local attempts.", error);
        setAttempts(getCompletedAttempts());
      }
    }

    void loadAttempts();
  }, []);

  const overview = useMemo(() => {
    const total = attempts.length;
    const average = total ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / total) : 0;
    const integrityFlags = attempts.reduce((sum, a) => sum + a.integrityEvents.length, 0);
    return { total, average, integrityFlags };
  }, [attempts]);

  const questionInsights = useMemo(() => {
    const map = new Map<number, { stem: string; topic: string; correct: number; total: number }>();
    attempts.forEach((attempt) => {
      attempt.questions.forEach((q) => {
        const answer = attempt.answers.find((a) => a.questionId === q.id);
        const item = map.get(q.id) || { stem: q.stem, topic: q.topic, correct: 0, total: 0 };
        item.total += 1;
        if (answer?.isCorrect) item.correct += 1;
        map.set(q.id, item);
      });
    });
    return Array.from(map.entries())
      .map(([id, data]) => ({ id, ...data, successRate: data.total ? Math.round((data.correct / data.total) * 100) : 0 }))
      .sort((a, b) => a.successRate - b.successRate);
  }, [attempts]);

  const topicInsights = useMemo(() => {
    const map = new Map<string, { totalCorrect: number; totalQuestions: number }>();
    attempts.forEach((attempt) => {
      attempt.questions.forEach((q) => {
        const answer = attempt.answers.find((a) => a.questionId === q.id);
        const item = map.get(q.topic) || { totalCorrect: 0, totalQuestions: 0 };
        item.totalQuestions += 1;
        if (answer?.isCorrect) item.totalCorrect += 1;
        map.set(q.topic, item);
      });
    });
    return Array.from(map.entries()).map(([topic, data]) => ({
      topic,
      mastery: data.totalQuestions ? Math.round((data.totalCorrect / data.totalQuestions) * 100) : 0,
    })).sort((a, b) => a.mastery - b.mastery);
  }, [attempts]);

  async function saveFeedback(attemptId: string) {
    const feedback = feedbackDrafts[attemptId] || "";
    const updatedAttempt = attempts.find((item) => item.id === attemptId);
    if (!updatedAttempt) return;

    const nextAttempt = { ...updatedAttempt, teacherFeedback: feedback };
    const updated = attempts.map((a) => (a.id === attemptId ? nextAttempt : a));
    setAttempts(updated);

    try {
      await saveTeacherFeedbackToDatabase(nextAttempt);
    } catch (error) {
      console.error("Supabase feedback save failed. Keeping local feedback only.", error);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <CardContent className="p-5">
            <div className="text-sm text-slate-500">Completed attempts</div>
            <div className="mt-2 text-3xl font-bold">{overview.total}</div>
          </CardContent>
        </Card>
        <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <CardContent className="p-5">
            <div className="text-sm text-slate-500">Average score</div>
            <div className="mt-2 text-3xl font-bold">{overview.average}%</div>
          </CardContent>
        </Card>
        <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <CardContent className="p-5">
            <div className="text-sm text-slate-500">Integrity flags</div>
            <div className="mt-2 text-3xl font-bold">{overview.integrityFlags}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardTitle>Student Results</CardTitle>
            <CardDescription>{SUPABASE_ENABLED ? "Synced with your Supabase database." : "Using local storage until you add your Supabase URL and anon key."}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {attempts.length === 0 && <div className="text-sm text-slate-600">No completed attempts yet. Use the Student tab to generate sample results.</div>}
            {attempts.map((attempt) => (
              <Card key={attempt.id} className="rounded-md border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">{attempt.studentName}</div>
                      <div className="text-sm text-slate-600">{attempt.schoolName ? `${attempt.schoolName} · ` : ""}{attempt.studentEmail ? `${attempt.studentEmail} · ` : ""}{modeLabel(attempt.mode)} · {attempt.percentage}%</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge>{attempt.questionCount} questions</Badge>
                      <Badge variant={attempt.integrityEvents.length ? "destructive" : "secondary"}>{attempt.integrityEvents.length} flags</Badge>
                    </div>
                  </div>

                  <Textarea
                    value={feedbackDrafts[attempt.id] ?? attempt.teacherFeedback ?? ""}
                    onChange={(e) => setFeedbackDrafts((prev) => ({ ...prev, [attempt.id]: e.target.value }))}
                    placeholder="Write personalized teacher feedback"
                    className="rounded-sm"
                  />
                  <Button className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => void saveFeedback(attempt.id)}>Save feedback</Button>

                  {attempt.integrityEvents.length > 0 && (
                    <div className="rounded-sm border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                      {attempt.integrityEvents.map((event, i) => (
                        <div key={`${event.at}-${i}`}>• {event.type.replaceAll("_", " ")} — {event.details}</div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <CardHeader>
              <CardTitle>Topic Mastery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topicInsights.length === 0 && <div className="text-sm text-slate-600">No topic data yet.</div>}
              {topicInsights.map((item) => (
                <div key={item.topic} className="space-y-1">
                  <div className="flex items-center justify-between text-sm"><span>{item.topic}</span><span>{item.mastery}%</span></div>
                  <Progress value={item.mastery} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <CardHeader>
              <CardTitle>Hardest Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {questionInsights.slice(0, 5).map((item) => (
                <div key={item.id} className="rounded-sm border p-3 text-sm">
                  <div className="font-medium">Q{item.id} · {item.topic}</div>
                  <div className="mt-1 text-slate-600"><RichMathText text={item.stem} block /></div>
                  <div className="mt-2 text-slate-800">Success rate: {item.successRate}%</div>
                  {auditNotesById[item.id] ? (
                    <div className="mt-2 rounded-sm border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-900">
                      Audit note: {auditNotesById[item.id]}
                    </div>
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TeacherAccessGate({
  password,
  onPasswordChange,
  onUnlock,
  onBack,
}: {
  password: string;
  onPasswordChange: (value: string) => void;
  onUnlock: () => void;
  onBack: () => void;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.75fr]">
      <Card className="rounded-md shadow-sm border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl">Teacher access</CardTitle>
          <CardDescription>Enter the teacher password to open student results, analytics, and feedback tools.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Teacher password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Enter teacher password"
              className="rounded-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={onUnlock}>Open teacher dashboard</Button>
            <Button variant="outline" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={onBack}>Back to student view</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardTitle className="text-lg">Before you publish</CardTitle>
          <CardDescription>This app now hides the teacher dashboard behind a password in the browser.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <div>• Change <code>TEACHER_ACCESS_PASSWORD</code> before sharing the app.</div>
          <div>• This protects the screen in the app session, but it is not full backend security yet.</div>
          <div>• For a public release, the next improvement is teacher login plus tighter Supabase policies.</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function TeamsTestingAppPrototype() {
  const [role, setRole] = useState<Role>("student");
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [teacherPasswordInput, setTeacherPasswordInput] = useState("");

  useEffect(() => {
    try {
      setTeacherUnlocked(sessionStorage.getItem(TEACHER_SESSION_KEY) === "true");
    } catch {
      setTeacherUnlocked(false);
    }
  }, []);

  function unlockTeacherView() {
    if (teacherPasswordInput !== TEACHER_ACCESS_PASSWORD) {
      window.alert("Incorrect teacher password.");
      return;
    }

    try {
      sessionStorage.setItem(TEACHER_SESSION_KEY, "true");
    } catch {
      // Ignore storage errors in preview environments.
    }

    setTeacherUnlocked(true);
    setTeacherPasswordInput("");
  }

  function lockTeacherView() {
    try {
      sessionStorage.removeItem(TEACHER_SESSION_KEY);
    } catch {
      // Ignore storage errors in preview environments.
    }

    setTeacherUnlocked(false);
    setTeacherPasswordInput("");
    setRole("student");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 p-4 md:p-6">
      <div className="mx-auto w-full max-w-[1400px] space-y-6">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="py-6 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100/80">Student Assessment Portal</div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">CSEC Additional Mathematics</h1>
            <p className="mt-2 text-lg font-medium text-blue-100 md:text-xl">Multiple Choice Questions</p>
          </div>
          <div className="flex justify-center gap-2">
            <Button variant={role === "student" ? "default" : "outline"} className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => setRole("student")}>Student view</Button>
            <Button variant={role === "teacher" ? "default" : "outline"} className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => setRole("teacher")}>Teacher view</Button>
            {teacherUnlocked && role === "teacher" ? (
              <Button variant="outline" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={lockTeacherView}>Lock</Button>
            ) : null}
          </div>
        </motion.div>

        {role === "student" ? (
          <StudentPanel />
        ) : teacherUnlocked ? (
          <TeacherPanel />
        ) : (
          <TeacherAccessGate
            password={teacherPasswordInput}
            onPasswordChange={setTeacherPasswordInput}
            onUnlock={unlockTeacherView}
            onBack={() => {
              setTeacherPasswordInput("");
              setRole("student");
            }}
          />
        )}
      </div>
    </div>
  );
}
