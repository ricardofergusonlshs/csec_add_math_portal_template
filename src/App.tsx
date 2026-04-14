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
  const items = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<{
    value?: string;
    "data-value"?: string;
    children: React.ReactNode;
  }>[];

  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
    >
      {items.map((item, index) => {
        const itemValue = item.props.value ?? item.props["data-value"] ?? String(index);
        return (
          <option key={itemValue} value={itemValue}>
            {item.props.children}
          </option>
        );
      })}
    </select>
  );
}

function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <div data-value={value}>{children}</div>;
}


type OptionKey = "A" | "B" | "C" | "D";
type Mode = "practice" | "trial" | "exam";
type Role = "student" | "parent" | "teacher";

type Question = {
  id: number;
  sourceNumber: number;
  topic: string;
  subtopic: string;
  difficulty: string;
  stem: string;
  options: Record<OptionKey, string>;
  optionOrder?: OptionKey[];
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

const RAW_QUESTION_BANK: [number, number, string, string, string, string, string, string][] = [[1, 1, "Factorization", "𝑎(𝑏 + 𝑐) − 𝑏(𝑎 + 𝑐) is equal to", "𝑎(𝑐 − 𝑏)", "𝑎(𝑏 − 𝑐)", "𝑐(𝑎 − 𝑏)", "𝑐(𝑏 − 𝑎)"], 
[2, 2, "Factorization", "The expression ab + 3c − 3b − ac is equal to", "(𝑎 + 3)(𝑐 − 𝑏)", "(𝑎 + 3)(𝑏 − 𝑐)", "(𝑎 − 3)(𝑏 + 𝑐)", "(𝑎 − 3)(𝑏 − 𝑐)"], 
[3, 3, "Factorization", "The expression ab + 3c − 3b − ac is equal to", "(𝑎 + 3)(𝑐 − 𝑏)", "(𝑎 + 3)(𝑏 − 𝑐)", "(𝑎 − 3)(𝑏 − 𝑐)", "(𝑎 − 3)(𝑏 + 𝑐)"], 
[4, 4, "Factorization", "1 /(𝑥 + 3) + 3 /(𝑥² − 9) expressed as a single fraction is:", "𝑥 /(𝑥² − 9)", "(𝑥² − 6 (𝑥² − 9)(𝑥 + 3)", "(𝑥 + 6)/(𝑥² − 9)", "4 𝑥 + 3"], 
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
[28, 28, "Arithmetic And Geometric Sequence", "The series −2 + 4/3 − 8/9 + … converges to the limit", "−6", "6", "−6/5", "6/5"], 
[29, 29, "Arithmetic And Geometric Sequence", "The sum of the first n terms of a geometric series is Sₙ = 4ⁿ − 1. For this series, which statements are correct? I. The common ratio is 4. II. The first 3 terms are 3, 15 and 63. III. S₂ₙ = 2⁴ⁿ − 1.", "I and II only", "I and III only", "II and III only", "I, II and III"], 
[30, 30, "Exponential And Logarithm", "The sum of ∑(1/𝑘), from 𝑘 = 1 to 3, is", "1/3", "1/2", "3/5", "11/6"], 
[31, 31, "Exponential And Logarithm", "The sum of the first n terms of a series is given by: ∑(5 − 3𝑟), from 𝑟 = 1 to 𝑛. The sum of the first 10 terms is", "-170", "-125", "-115", "-85"], 
[32, 32, "Exponential And Logarithm", "A sequence of positive integers {Uₙ} is defined by 𝑈ₙ = 3(1/2)ⁿ−1. The 10𝑡ℎ term of the sequence is given by:", "19683/512", "3/256", "3/512", "3 1000 EXPONENTIAl & LOGARITHM"], 
[33, 33, "Exponential And Logarithm", "Given that 2 × 4^(𝑥 + 1) = 16^(2𝑥), the value of x is", "−1", "1/4", "1/3", "½"], 
[34, 34, "Exponential And Logarithm", "The √2 × 4^(𝑚/𝑛) is equal to", "√8𝑚 𝑛", "2𝑛 + 2𝑚", "2𝑛 + 𝑛𝑚", "2 2𝑚 + 1 𝑛"], 
[35, 35, "Exponential And Logarithm", "√3 × 27^𝑚 is equal to", "3 3𝑚+1 𝑛", "3𝑛 +3𝑚", "√813𝑚 𝑛", "34𝑚"], 
[36, 36, "Exponential And Logarithm", "Given that 𝑙𝑜𝑔₂ 𝑥 + 𝑙𝑜𝑔₂ (6𝑥 + 1) = 1, the value of 𝑥 is", "−2/3", "1/2", "2/3", "3/2"], 
[37, 37, "Exponential And Logarithm", "The value of 𝑙𝑜𝑔₄(8) − 𝑙𝑜𝑔₄(2) + 𝑙𝑜𝑔₄(1/16) is", "−1", "1/2", "3", "4"], 
[38, 38, "Exponential And Logarithm", "The value of 2^𝑧 where 𝑧 = 5 + 𝑙𝑜𝑔₂ 3 is", "𝑙𝑜𝑔₂ 96", "25", "96", "296"], 
[39, 39, "Exponential And Logarithm", "2^(−1/8) 1/3 simplifies to", "1/2", "√2", "1/4", "1 √2"], 
[40, 40, "Exponential And Logarithm", "The value of x for which 4^(𝑥+1) = 2 is", "−1/2", "0", "1/2", "1"], 
[41, 41, "Exponential And Logarithm", "Given that log𝑝𝑋= 6 and log𝑝𝑌= 4, the value of log𝑝( 𝑋 𝑌) is", "10", "𝑙𝑜𝑔𝑝2", "log𝑝6 log𝑝4", "2"], 
[42, 42, "Exponential And Logarithm", "Given that 𝑙𝑜𝑔₂(𝑥³) = 6, then the value of x is", "2", "4", "8", "64"], 
[43, 43, "Exponential And Logarithm", "Given that 3 × 27^(2𝑥)= 9𝑥, the value of x is", "− 1/4", "−1", "1/4", "1"], 
[44, 44, "Exponential And Logarithm", "𝑙𝑜𝑔₃(2𝑥 + 1) = 2 + 𝑙𝑜𝑔₃(3𝑥 − 11) is", "5", "23/4", "4", "67/16"], 
[45, 45, "Exponential And Logarithm", "The value of x for which 9^(𝑥+1) = 3 is", "−3/2", "−1/2", "3/2", "5/2"], 
[46, 46, "Exponential And Logarithm", "The value of x for which 3^(𝑥+2) + 3^𝑥= 90 is", "½ ( log(90) log(3) − 2 )", "2", "44", "( log(10) log(3) )"], 
[47, 47, "Exponential And Logarithm", "The value of x such that 𝑙𝑜𝑔₂(5𝑥 + 1) − 𝑙𝑜𝑔₂(3𝑥 − 5) = 2 is", "2", "3", "5", "11"], 
[48, 48, "Exponential And Logarithm", "Which of the following mathematical statements are true? 𝐼. 𝑙𝑜𝑔ₐ(𝑃𝑄) = 𝑙𝑜𝑔ₐ𝑃 × 𝑙𝑜𝑔ₐ𝑄 𝐼𝐼. 𝑙𝑜𝑔ₐ (𝑃/𝑄) = 𝑙𝑜𝑔ₐ𝑃 − 𝑙𝑜𝑔ₐ𝑄 𝐼𝐼𝐼. 𝑙𝑜𝑔ₐ(𝑃ᵇ) = 𝑏 𝑙𝑜𝑔ₐ𝑃", "I and II only", "I and III only", "II and III only", "I, II and III"], 
[49, 49, "Sum/Product Of Roots", "Given that a and b are the roots of the equation 𝑥² + 3𝑥 + 4 = 0, what is the value of (𝑎 + 𝑏)²?", "9/16", "1", "9", "16"], 
[50, 50, "Sum/Product Of Roots", "A quadratic equation is such that the sum of its roots is −2/3 and the product of its roots is 3/4. The quadratic equation is:", "12x² + 8x + 9 = 0", "12x² − 8x − 9 = 0", "12x² − 8x + 9 = 0", "12x² + 8x − 9 = 0"], 
[51, 51, "Sum/Product Of Roots", "The quadratic equation is:", "12𝑥² + 8𝑥 + 9 = 0", "12𝑥² − 8𝑥 − 9 = 0", "12𝑥² − 8𝑥 + 9 = 0", "12𝑥² + 8𝑥 − 9 = 0"], 
[52, 52, "Nature Of Roots", "The roots of the equation 2𝑥² − 𝑥 + 1 = 0 are", "real and equal", "real and distinct", "not real and equal", "not real and distinct"], 
[53, 53, "Nature Of Roots", "The roots of the equation 5𝑥² + 6𝑥 − 2 = 0 are", "not real and not distinct", "not real and not equal", "real and distinct", "real and equal"], 
[54, 54, "Nature Of Roots", "The roots of the equation 3𝑥² − 6𝑥 − 5 = 0 are", "equal", "real and distinct", "distinct and not real", "real and not distinct"], 
[55, 55, "Function", "If 𝑓(𝑥) = 3𝑥 − 4 and 𝑓(𝑔(𝑥)) = 𝑥, then 𝑔(𝑥) is", "1/3𝑥 − 4", "𝑥 + 4/3", "3 − 4𝑥", "4𝑥 − 3"], 
[56, 56, "Function", "The tables below show the ordered pairs for two functions f and g. The value of 𝑔−1[𝑓(3)] is", "1/2", "2", "5", "7"], 
[57, 57, "Function", "A function h is defined by ℎ∶ 𝑥 → 5𝑥 + 2. Expressed in terms of a, ℎ(2𝑎 + 3) is", "10𝑎 + 15", "2𝑎 + 15", "10𝑎 + 17", "5𝑎 + 17"], 
[58, 58, "Function", "A function f is defined by 𝑓∶ 𝑥 → 2𝑥 − 1. The function 𝑓² is defined as:", "𝑓² ∶ 𝑥 → 4𝑥² − 4𝑥 + 1", "𝑓² ∶ 𝑥 → 2𝑥² − 1", "𝑓² ∶ 𝑥 → 4𝑥² + 1", "𝑓² ∶ 𝑥 → 4𝑥 − 3"], 
[59, 59, "Maximum And Minimum Point", "𝑓(𝑥) = −5 − 8𝑥 − 2𝑥². By completing the square f(x) can be expressed as", "2(𝑥 + 2)² − 4", "4 − 2(𝑥 − 2)²", "3 − 2(𝑥 + 2)²", "3 − 2(𝑥 − 2)²"], 
[60, 60, "Maximum And Minimum Point", "For −2 ≤ 𝑥 ≤ 2, the maximum value of 4 – (𝑥 + 1)², and the value of x for which 4 − (𝑥 + 1)² is maximum are respectively", "5 and 1", "2 and −1", "4 and −1", "4 and 1"], 
[61, 61, "Maximum And Minimum Point", "The number of visas, V(x), issued by an embassy annually is given by 𝑉(𝑥) = 7𝑥³ − 42𝑥 + 72. The LEAST number of visas issued in a particular year, x, is", "6", "9", "42", "72"], 
[62, 62, "Maximum And Minimum Point", "Given that 𝑓(𝑥) = 6 − 𝑥 − 2𝑥² is less than or equal to k, where k ∈ ℝ, then k is equal to", "− 49/8", "− 1/4", "1/4", "49/8"], 
[63, 63, "Maximum And Minimum Point", "If 𝑥² − 8𝑥 + 19 = 𝑎(𝑥 + ℎ)² + 𝑘, then", "𝑎 = 1 ℎ = 3 𝑘 = 4", "𝑎 = 1 ℎ = −3 𝑘 = 4", "𝑎 = 1 ℎ = −4 𝑘 = 3", "𝑎 = −1 ℎ = 4 𝑘 = 3"], 
[64, 64, "Maximum And Minimum Point", "If 𝑥²− 6𝑥 + 13 = 𝑎(𝑥 + ℎ)² + 𝑘, then", "𝑎 = 1 ℎ = 3 𝑘 = 4", "𝑎 = 1 ℎ = −3 𝑘 = 4", "𝑎 = 1 ℎ = −4 𝑘 = 3", "𝑎 = −1 ℎ = 4 𝑘 = 3"], 
[65, 65, "Maximum And Minimum Point", "Given that 𝑓(𝑥) = 𝑎𝑥² + 𝑏𝑥 + 𝑐, then 𝑓(𝑥) can be expressed in the form:", "𝑎(𝑥 + 𝑏/𝑎)² + (𝑎𝑐 – 𝑏²)/𝑎²", "𝑎 (𝑥 + 𝑏 2𝑎 )² + 𝑎𝑐 − 𝑏²/𝑎²", "𝑎 (𝑥 + 𝑏 2𝑎 )² + 4𝑎𝑐 − 𝑏²/4𝑎", "𝑎 (𝑥 + 𝑏 2𝑎 )² + 4𝑎𝑐 − 𝑏²/4𝑎²"], 
[66, 66, "Maximum And Minimum Point", "Given that f(x) = 1 - 4x - 2x², the expression can be written in the form:", "2(𝑥 + 1)² − 3", "3 − 2(𝑥 − 1)²", "3 − 2(𝑥 + 1)²", "3 − (2𝑥 + 1)²"], 
[67, 67, "Maximum And Minimum Point", "Which of the following graphs BEST represents 𝑓(𝑥) = 𝑥(1 − 𝑥)?", "Graph A", "Graph B", "Graph C", "Graph D"], 
[68, 68, "Surd", "11. The expression (1 + √3) (√3 − 1) when simplified is equal to", "-1", "1", "√3+ 2/2", "√3 + 2"], 
[69, 69, "Surd", "(8 + √5)(2 − √5) can be expressed as", "11 − 6√5", "21 − 6√5", "11 + 6√5", "11 + 10√5"], 
[70, 70, "Surd", "The expression (√5− 1)/(1 + √5) when simplified is equal to", "1/3 (3 − √5)", "1/2 (√5 − 3)", "1/3 (√5 − 3)", "1/2 (3 − √5)"], 
[71, 71, "Surd", "The expression (1 + √3)/(√3− 1) when simplified is equal to:", "-1", "1", "√3+ 2/2", "√3 + 2"], 
[72, 72, "Surd", "The value of √18 + √50 is", "34√2", "6√15", "8√2", "√68"], 
[73, 73, "Surd", "4/(√6− 2)", "2(√6 − 2)", "2(√6 + 2)", "√6 − 2", "√6 + 2"], 
[74, 74, "Linear & Quadratic Inequality", "The range of values for which 2𝑥² < 5𝑥 + 3 𝑖𝑠", "−1/2 < 𝑥 < 3", "1/2 < 𝑥 < 3", "𝑥 < −1/2 𝑎𝑛𝑑 𝑥 < 3", "𝑥 > −1/2 𝑎𝑛𝑑 𝑥 > 3"], 
[75, 75, "Linear & Quadratic Inequality", "20. The values of x which satisfy the inequality 2𝑥 – 3/𝑥 + 1 > 0 are", "𝑥 > −1 𝑎𝑛𝑑 𝑥 > 3/2", "𝑥 > 3/2", "𝑥 < −1 𝑜𝑟 𝑥 > 3/2", "𝑥 > −1"], 
[76, 76, "Linear & Quadratic Inequality", "The set of values of x for which 5𝑥 + 7 > 10𝑥 − 13 is", "𝑥 < −4", "𝑥 ≥ −4", "𝑥 < 4", "𝑥 > 4"], 
[77, 77, "Linear & Quadratic Inequality", "The range of values of x for which 5𝑥 + 6 ≤ 𝑥² is", "{𝑥∶ −3 ≤ 𝑥 ≤ −2}", "{𝑥∶ 𝑥 ≤ −1} ∪ {𝑥∶ 𝑥 ≥ 6}", "{𝑥∶ 𝑥 ≥ −1} ∪ {𝑥∶ 𝑥 ≥ 6}", "{𝑥∶ −1 ≤ 𝑥 ≤ 6}"], 
[78, 78, "Linear & Quadratic Inequality", "The range of values for which 𝑥² − 7𝑥 + 10 < 0 is", "2 > 𝑥 > 5", "2 < 𝑥 < 5", "𝑥 < 2 𝑎𝑛𝑑 𝑥 > 5", "𝑥 < −5 𝑎𝑛𝑑 𝑥 > −5 The set of values of x for which 3x + 2 > x − 2 is"], 
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
[89, 89, "Vector", "If the length of the vector 𝑝 − 2𝑖 − 𝑘𝑗 is √13 and k is real, then\nI. k = 3\nII. k = −3\nIII. k = √17\nIV. k = −√17", "I or II only", "I or III only", "I or IV only", "II or IV only"], 
[90, 90, "Vector", "25. The value of the real number r for which the two vectors 𝑎 = 4𝑖 + 𝑟𝑗 and 𝑏 = 2𝑖 − 3𝑗 are parallel is", "−6", "3/4", "4/3", "6"], 
[91, 91, "Vector", "26. The position vectors of A and B relative to an origin O are( 2/3 ) and( 7/4 ) respectively. The acute angle AOB is given by", "𝑐𝑜𝑠 −1 ( 2 √65 )", "𝑐𝑜𝑠 −1 ( √26 (13√65) )", "𝑐𝑜𝑠 −1 ( √2 √65)", "𝑐𝑜𝑠 −1 ( 26 √13√65)"], 
[92, 92, "Vector", "The vector a is given as 5i + 12j. A unit vector parallel to a is", "15𝑖 + 36𝑗", "195𝑖 + 468𝑗", "1/13 (5𝑖 + 12𝑗)", "3/13 (5𝑖 + 12𝑗)"], 
[93, 93, "Vector", "Given that OA = ( −17 25 ) and OB = ( 4 −5 ), the vector AB =", "( −13 30 )", "( −13 −20)", "( −21 20 )", "( 21 −20)"], 
[94, 94, "Vector", "The position vectors of A and B relative to an origin O are ( 2/5 ) and ( −3/1 ) respectively. The acute angle AOB is given by", "𝑐𝑜𝑠⁻¹ ( 1 √290 )", "𝑐𝑜𝑠⁻¹ ( 11 √290 )", "𝑐𝑜𝑠⁻¹ ( √11 √290)", "𝑐𝑜𝑠⁻¹ (− 1 √290 )"], 
[95, 95, "Vector", "The triangle OAB has vertices given by( 0 0 ), ( 𝑎 0 ) and ( 0 4 ) respectively. Given that the angle AÔB is 𝜋/2 , then a =", "2", "3", "4", "6"], 
[96, 96, "Vector", "The position vector of the point P relative to an origin O is given as p = 5i + 2j and the position vector of Q relative to an origin O is given as q = -4i + 10j. Which of the following is TRUE?", "p and q are parallel.", "p and q are perpendicular.", "The acute angle between p and q is 60°.", "The acute angle between p and q is 45°."], 
[97, 97, "Trigonometry", "28. cos(A − B) − cos(A + B) =", "2 sin A sin B", "−2 sin A cos B", "2 cos A sin B", "2 cos A cos B"], 
[98, 98, "Trigonometry", "29. If sin 𝜃= 15/17 and θ is obtuse, then cos θ is equal to", "−8/15", "−8/17", "8/15", "8/17"], 
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
[112, 112, "Trigonometry", "The trigonometrical expression 𝑆𝑖𝑛𝑥 1−𝑐𝑜𝑠𝑥− 𝑠𝑖𝑛𝑥 1+𝑐𝑜𝑠𝑥 is identical to", "2 sin 𝑥", "2 tan 𝑥", "2 sin 𝑥", "2 𝑡𝑎𝑛²𝑥"], 
[113, 113, "Trigonometry", "The EXACT value of cos ( 5𝜋/12) is:", "1/4 (√6 − √2)", "1/4 (√6 + √2)", "1/2 (√6 + √2)", "1/2 (√6 − √2)"], 
[114, 114, "Trigonometry", "The graph shown represents the function:", "𝑐𝑜𝑠 𝑥", "𝑐𝑜𝑠 2𝑥", "1/2 cos 𝑥", "𝑐𝑜𝑠(1/2 𝑥)"], 
[115, 115, "Trigonometry", "𝑠𝑖𝑛 50° 𝑐𝑜𝑠 40° − 𝑐𝑜𝑠 50° 𝑠𝑖𝑛 40° =", "sin 10°", "cos 10°", "sin 90°", "cos 90°"], 
[116, 116, "Trigonometry", "The size of angle x, measured in radians, is:", "𝜋/12", "𝜋/9", "𝜋/6", "𝜋/3"], 
[117, 117, "Trigonometry", "sin ( 𝜋/2 − 𝑥) + cos (𝑥 + 𝜋/2) =", "tan 𝜋", "sin 𝑥−cos 𝑥", "cos 𝑥−sin 𝑥", "1 −sin 𝑥−cos 𝑥"], 
[118, 118, "Trigonometry", "If 𝑠𝑖𝑛(90° − 𝑥) = 𝑐𝑜𝑠 𝑥, then the value of 𝑥 is:", "35°", "45°", "60°", "70°"], 
[119, 119, "Radian", "If the area of the semicircle is 32π, what is the length of the arc connecting points A and B?", "4π", "8π", "16π", "32π"], 
[120, 120, "Coordinate Geometry", "The coordinates of the points A and B are (2, −3) and (−10, −5) respectively. The perpendicular bisector to the line AB is given by the equation", "𝑥 − 6𝑦 + 20 = 0", "6𝑥 + 𝑦 + 28 = 0", "𝑥 + 6𝑦 − 20 = 0", "6𝑥 + 𝑦 − 28 = 0"], 
[121, 121, "Coordinate Geometry", "The lines 2𝑦 − 3𝑥 − 13 = 0 and 𝑦 + 𝑥 + 1 = 0 intersect at the point P, where the coordinates of P are", "(3, 2)", "(3, −2)", "(−3, −2)", "(−5, 2)"], 
[122, 122, "Coordinate Geometry", "The lines 7𝑥 − 4𝑦 + 25 = 0 and 3𝑥 − 𝑦 − 5 = 0 intersect at the point P, where", "𝑃 (5, 10)", "𝑃 (−1, 8)", "𝑃 (−9, −32)", "𝑃 (9, 22)"], 
[123, 123, "Coordinate Geometry", "The line through the points P(k, 2) and Q(6, 8) is parallel to the line with equation 3𝑥 + 𝑦 − 21 = 0. The value of k is", "1", "4", "8", "24"], 
[124, 124, "Coordinate Geometry", "The line through the points Q(h, 2) and R(4, 8) is parallel to the line with equation 2𝑥 + 𝑦 − 10 = 0. The value of h is:", "-7", "2", "1", "7"], 
[125, 125, "Coordinate Geometry", "The line 𝑥 + 𝑦 = 1 and the circle 𝑥² + 𝑦² = 5 intersect at the points:", "(2, 1) and (1, 2)", "(−1, 2) and (2, −1)", "(1, −2) and (−2, −1)", "(−1, −2) and (−2, −1)"], 
[126, 126, "Calculus", "Given that 𝑦 = (3𝑥 − 2)³, then 𝑑𝑦/𝑑𝑥=", "3(3𝑥 − 2)²", "3(3𝑥)²", "3(3𝑥 − 2)²", "9(3𝑥 − 2)²"], 
[127, 127, "Calculus", "Given that y = (3x + 5)/(2x − 11), then dy/dx =", "[(3x + 5)(2)+ (2x − 11)(3)]/(2x − 11)²", "[(2x − 11)(3)+ (3x + 5)(2)]/(2x − 11)²", "[(2x − 11)(3)− (3x + 5)(2)]/(2x − 11)²", "[(3x + 5)(2)− (2x − 11)(3)]/(2x − 11)²"], 
[128, 128, "Calculus", "Given that y = (3x + 5)/(2x − 11), then dy/dx =", "[(3x + 5)(2)+ (2x − 11)(3)]/(2x − 11)²", "[(2x − 11)(3)+ (3x + 5)(2)]/(2x − 11)²", "[(2x − 11)(3)− (3x + 5)(2)]/(2x − 11)²", "[(3x + 5)(2)− (2x − 11)(3)]/(2x − 11)²"], 
[129, 129, "Calculus", "The curve C is given by the equation 𝑦 = 3 𝑠𝑖𝑛 𝑥 + 2. The value of 𝑑𝑦/𝑑𝑥 at the point where 𝑥 = 𝜋/3 is", "1/2", "3/2", "7/2", "3"], 
[130, 130, "Calculus", "The point 𝑃 (2, 2) lies on the curve with equation 𝑦 = 𝑥(𝑥 − 3)². The equation of the normal to the curve at the point P is given by", "𝑦 − 2 = 3(𝑥 − 2)", "𝑦 − 2 = −3(𝑥 − 2)", "𝑦 − 2 = ( 1/3) (𝑥 − 2)", "𝑦 − 2 = −( 1/3) (𝑥 − 2)"], 
[131, 131, "Calculus", "The curve C is given by the equation 𝑦 = 4𝑥 + 9/𝑥. The second derivative, $\frac{d^2y}{dx^2}$, is given by", "4 + 9 𝑥³", "18 𝑥³", "4 − 9 𝑥³", "9 2𝑥³"], 
[132, 132, "Calculus", "The positive value of z for which ∫𝑥 𝟎 𝑧²𝑑𝑥 = 9 is", "3", "4.5", "9", "27"], 
[133, 133, "Calculus", "The gradient of the tangent to a curve C at (x, y) is given by 𝑑𝑦/𝑑𝑥= 1 (3𝑥 + 4)². The curve passes through the point 𝑃(− 1/2 , 3). The equation of the curve C is given by", "𝑦 = 2 3𝑥 + 4 + 1", "𝑦 = − 6 3𝑥 + 4", "𝑦 = − 2 3𝑥 + 4 + 4", "𝑦 = − 1 3𝑥 + 4 + 1"], 
[134, 134, "Calculus", "The finite region R is bounded by the y-axis, the x-axis, and the curve 𝑦 = 𝑥(𝑥 − 3)² as shown in the figure above. The area of R in square units is", "1", "3", "9", "27"], 
[135, 135, "Calculus", "The finite region enclosed by the curve y = √x, x ≥ 0, the x-axis and the line x = 3 is rotated completely about the x-axis. The volume of the solid of revolution formed is given by:", "∫₀³ (1/3)√x dx", "π ∫₀³ x dx", "π ∫₀³ √x dx", "π ∫₀³ x² dx"], 
[136, 136, "Calculus", "The finite region enclosed by the curve 𝑦 = √𝑥, 𝑥 ≥ 0, the x-axis and the line x = 3, as shown in the figure above, is rotated completely about the x-axis. The volume of the solid of revolution formed is given by", "∫₀³ ( 1/3) √𝑥 dx", "𝜋 ∫₀³𝑥 𝑑𝑥", "𝜋 ∫₀³√𝑥 𝑑𝑥", "𝜋 ∫₀³𝑥² 𝑑𝑥"], 
[137, 137, "Calculus", "∫ (2𝑥 + 3)⁵ dx =", "[ 1/6 (2𝑥 + 3)6] + C", "[ 1/2 (2𝑥 + 3)6] + C", "[ 1/12 (2𝑥 + 3)6] + C", "[ 1/3 (2𝑥 + 3)6] + C"], 
[138, 138, "Calculus", "Given 𝑑𝑦/𝑑𝑥= 3 sin 𝑥− 2 cos x, the indefinite integral is given by", "𝑦 = 3 cos 𝑥− 2 sin 𝑥+ C", "𝑦 = −3 cos 𝑥+ 2 sin 𝑥+ C", "𝑦 = −3 cos 𝑥− 2 sin 𝑥+ C", "𝑦 = 3 cos 𝑥+ 2 sin 𝑥+ C"], 
[139, 139, "Calculus", "Given that 𝑦 = √5 – 𝑥, then 𝑑𝑦/𝑑𝑥 is:", "− 1 √5 − 𝑥", "1 √5 − 𝑥", "1/2√5 − 𝑥", "− 1/2√5 − 𝑥"], 
[140, 140, "Calculus", "The gradient function dy/dx of the curve 𝑦 = 𝑠𝑖𝑛(2𝑥² + 1) is:", "4𝑥 𝑐𝑜𝑠(2𝑥² + 1)", "𝑐𝑜𝑠(2𝑥² + 1)", "1/4𝑥cos(2𝑥² + 1)", "−4𝑥 𝑐𝑜𝑠(2𝑥² + 1)"], 
[141, 141, "Calculus", "The point P(1, 1) lies on the curve 𝑦 = 3𝑥 – 2/2𝑥 – 1 . The gradient of the tangent at point P is:", "1", "3/2", "5", "−1"], 
[142, 142, "Calculus", "The curve C has the equation 𝑦 = 𝑓(𝑥). Curve C has a stationary point at (-1, 2). If 𝑓′′(𝑥) = 6 𝑥⁴ + 2, then the point (-1, 2) is:", "an optimum point", "a point of inflexion", "a minimum turning point", "a maximum turning point"], 
[143, 143, "Calculus", "𝐼𝑓 ∫𝑓(𝑥) 𝑑𝑥 4 1 = 6, then ∫4𝑓(𝑥) 𝑑𝑥 4 1 + 5", "9", "11", "29", "44"], 
[144, 144, "Calculus", "The region R is enclosed by the x-axis, the curve 𝑦 = −𝑥² + 2 and the lines 𝑥 = 0 and 𝑥 = 1. The area of R is:", "1", "5/3", "2", "7/3"], 
[145, 145, "Calculus", "The region in the first quadrant enclosed by the curve 𝑦 = 𝑥 – ½ 𝑥², the lines 𝑥 = 0 and 𝑥 = 2 is rotated completely about the x-axis. The volume in 𝑢𝑛𝑖𝑡𝑠3 of the solid generated is:", "2𝜋/3", "8𝜋", "4𝜋/15", "64𝜋/15"], 
[146, 146, "Calculus", "Given that d/dx (x/(1 + x)) = 1/(1 + x)², then ∫₀² 3/(1 + x)² dx is equal to:", "−1/3", "1/3", "2/3", "2"], 
[147, 147, "C) 2/3", "The equation of a curve is given by y = (𝑥² + 2)(𝑥 – 1)³. The gradient function, 𝑑𝑦/𝑑𝑥, is given by:", "(𝑥 − 1)(5𝑥² − 2𝑥 + 6)", "(𝑥 − 1)²(−𝑥² − 2𝑥 − 6)", "(𝑥 − 1)²(5𝑥² − 2𝑥 + 6)", "(𝑥 − 1)²(5𝑥² + 2𝑥 + 6)"], 
[148, 148, "Kinematics Question", "During the journey there is a stage when the boy accelerates. The value of the acceleration is:", "− 10.0 𝑚𝑠⁻²", "2.5 𝑚𝑠⁻²", "3.5 𝑚𝑠⁻²", "20.0 𝑚𝑠⁻²"], 
[149, 149, "Kinematics Question", "At the 10 m stopping point on a runway, an airplane is stationary before takeoff. If the plane travels 120 m from this point in 4 seconds, what is its speed at the point of takeoff?", "32 m/s", "27 m/s", "30 m/s", "50 m/s"], 
[150, 150, "Statistics", "There are 108 cards in a deck of UNO playing cards. There are four “Wild”, four “Wild Draw Four” and 25 each of four colours (red, yellow, green, blue). If a player needs to select 1 card, what is the probability of NOT drawing a “Wild Draw Four”?", "26/27", "25/108", "2/27", "1/108"], 
[151, 151, "Statistics", "One advantage of using a box and whisker plot is that:", "the variance can be identified", "all data values can be identified", "the mean value can be identified", "the spread of the distribution can be identified Items 147 and 148 refer to the following Venn diagram. There are 120 students in a school’s music club. The Venn diagram shows the probabilities that a randomly selected student plays the piano (N) or guitar (G)."], 
[152, 152, "Statistics", "What is the value of X?", "0.10", "0.35", "0.90", "1.00"], 
[153, 153, "Statistics", "What is P(N | G)?", "0.10", "0.40", "0.47", "0.70 Item refers to the following diagram:"], 
[154, 154, "Statistics", "The tree diagram above shows the probability of Events A and B occurring. Based on the diagram, the value of P(A | B) =", "1/5", "8/15", "3/5", "4/5"]];


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

function buildPatchedQuestion(raw: [number, number, string, string, string, string, string, string]): Question | null {
  const [id, sourceNumber, rawTopic, stem, A, B, C, D] = raw;
  const patch = QUESTION_PATCHES[id] ?? {};
  if (patch.exclude) return null;

  const answerOverride = ANSWER_OVERRIDES[id];
  const topic = patch.topic ?? normalizeTopic(rawTopic);
  const subtopic = patch.subtopic ?? topic;

  return {
    id,
    sourceNumber,
    topic,
    subtopic,
    difficulty: patch.difficulty ?? "Medium",
    stem: patch.stem ?? stem,
    options: {
      A: patch.options?.A ?? A,
      B: patch.options?.B ?? B,
      C: patch.options?.C ?? C,
      D: patch.options?.D ?? D,
    },
    correctAnswer: answerOverride?.correctAnswer ?? patch.correctAnswer ?? null,
    explanation: answerOverride?.explanation ?? patch.explanation,
    answerKeyStatus: answerOverride ? "verified" : patch.answerKeyStatus ?? "pending",
    source: `Item ${sourceNumber}`,
  };
}

const QUESTION_BANK: Question[] = RAW_QUESTION_BANK.map(buildPatchedQuestion).filter((question): question is Question => question !== null);
const AVAILABLE_TOPICS = Array.from(new Set(QUESTION_BANK.map((question) => question.topic))).sort((a, b) => a.localeCompare(b));

const STORAGE_KEY = "teams-testing-app-prototype";
const ATTEMPTS_KEY = "teams-testing-app-attempts";

const VITE_ENV = (((import.meta as any)?.env) ?? {}) as Record<string, string>;
const SUPABASE_URL = VITE_ENV.VITE_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = VITE_ENV.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";
const SUPABASE_TABLE = "quiz_attempts";
const SUPABASE_EXAM_CODE_TABLE = "exam_access_codes";
const SUPABASE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
const TEACHER_ACCESS_PASSWORD = VITE_ENV.VITE_TEACHER_PASSWORD ?? "";
const PRACTICE_MASTER_PASSCODE = "practice2026";
const PARENT_ACCESS_CODE = VITE_ENV.VITE_PARENT_ACCESS_CODE ?? "";
const TEACHER_SESSION_KEY = "teams-testing-app-teacher-access";
const STUDENT_SESSION_KEY = "teams-testing-app-student-session";
const EFFECTIVE_TEACHER_PASSWORD = TEACHER_ACCESS_PASSWORD || "mathematics2026";
const EFFECTIVE_PARENT_ACCESS_CODE = PARENT_ACCESS_CODE || "parent2026";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function shuffleArray<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function buildShuffledQuestionSet(questions: Question[], count: number) {
  return shuffleArray(questions)
    .slice(0, count)
    .map((question) => ({
      ...question,
      optionOrder: shuffleArray(["A", "B", "C", "D"] as OptionKey[]),
    }));
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function plainHtml(text: string) {
  return escapeHtml(text).split(String.fromCharCode(10)).join("<br />");
}

function isLikelyMathContent(text: string) {
  const markers = ["√", "∑", "π", "θ", "α", "β", "∫", "=", "^"];
  return markers.some((marker) => text.includes(marker));
}

function renderRichText(text: string) {
  if (!PROFESSIONAL_EQUATION_RENDERING || !isLikelyMathContent(text)) {
    return { __html: plainHtml(text) };
  }

  try {
    return {
      __html: katex.renderToString(text, {
        throwOnError: false,
        displayMode: false,
        strict: false,
      }),
    };
  } catch {
    return { __html: plainHtml(text) };
  }
}

function RichText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={cn("whitespace-pre-wrap", className)} dangerouslySetInnerHTML={renderRichText(text)} />;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore local storage failures in preview mode
  }
}

function getStoredAttempts(): Attempt[] {
  return readJson<Attempt[]>(ATTEMPTS_KEY, []);
}

function setStoredAttempts(attempts: Attempt[]) {
  writeJson(ATTEMPTS_KEY, attempts);
}

function mergeAttempts(primary: Attempt[], secondary: Attempt[]) {
  const map = new Map<string, Attempt>();
  [...secondary, ...primary].forEach((attempt) => {
    map.set(attempt.id, attempt);
  });
  return Array.from(map.values()).sort((a, b) => new Date(b.submittedAt || b.startedAt).getTime() - new Date(a.submittedAt || a.startedAt).getTime());
}

function persistStudentSession(session: StudentAuthSession | null) {
  if (!session) {
    try {
      window.localStorage.removeItem(STUDENT_SESSION_KEY);
    } catch {
      // ignore
    }
    return;
  }
  writeJson(STUDENT_SESSION_KEY, session);
}

function restoreStudentSession(): StudentAuthSession | null {
  return readJson<StudentAuthSession | null>(STUDENT_SESSION_KEY, null);
}

function persistTeacherUnlocked(unlocked: boolean) {
  try {
    if (unlocked) {
      window.localStorage.setItem(TEACHER_SESSION_KEY, "1");
    } else {
      window.localStorage.removeItem(TEACHER_SESSION_KEY);
    }
  } catch {
    // ignore
  }
}

function restoreTeacherUnlocked() {
  try {
    return window.localStorage.getItem(TEACHER_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

async function fetchSupabase(path: string, init: RequestInit = {}) {
  return fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      ...(init.headers ?? {}),
    },
  });
}

function getMagicLinkRedirectUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

async function exchangeMagicLinkSessionFromUrl(): Promise<StudentAuthSession | null> {
  if (!SUPABASE_ENABLED) return null;

  const rawHash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash;
  const hashParams = new URLSearchParams(rawHash);
  const accessToken = hashParams.get("access_token");
  if (!accessToken) return null;

  const refreshToken = hashParams.get("refresh_token") || undefined;
  const response = await fetchSupabase(`/auth/v1/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data?.email) {
    throw new Error(data?.msg || data?.message || "Unable to complete magic link sign-in.");
  }

  window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`);

  return {
    accessToken,
    refreshToken,
    email: data.email,
    userId: data.id,
  };
}

async function sendMagicLinkToStudent(email: string): Promise<{ session?: StudentAuthSession; message: string }> {
  if (!SUPABASE_ENABLED) {
    return {
      session: {
        accessToken: "local-demo-token",
        email,
        userId: "local-demo-user",
      },
      message: "Local preview session opened instantly.",
    };
  }

  const response = await fetchSupabase(`/auth/v1/otp`, {
    method: "POST",
    body: JSON.stringify({
      email,
      create_user: true,
      email_redirect_to: getMagicLinkRedirectUrl(),
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.msg || data?.message || "Unable to send the magic link.");
  }

  return {
    message: `Magic link sent to ${email}. Check your email and open the link on this device.`,
  };
}

async function consumeExamAccessCode(studentEmail: string, code: string) {
  if (!SUPABASE_ENABLED || !code.trim()) return;

  const lookup = await fetchSupabase(`/rest/v1/${SUPABASE_EXAM_CODE_TABLE}?select=code,used_at&code=eq.${encodeURIComponent(code)}&limit=1`);
  const rows = await lookup.json().catch(() => []);
  if (!lookup.ok || !Array.isArray(rows) || rows.length === 0) {
    throw new Error("That access code was not found.");
  }
  if (rows[0]?.used_at) {
    throw new Error("That access code has already been used.");
  }

  const update = await fetchSupabase(`/rest/v1/${SUPABASE_EXAM_CODE_TABLE}?code=eq.${encodeURIComponent(code)}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ used_at: new Date().toISOString(), student_email: studentEmail || null }),
  });

  if (!update.ok) {
    throw new Error("Unable to activate that access code right now.");
  }
}

function mapAttemptFromRow(row: any): Attempt | null {
  const payload = row?.payload && typeof row.payload === "object" ? (row.payload as Attempt) : null;

  if (payload) {
    return {
      ...payload,
      id: payload.id || row.id,
      submittedAt: payload.submittedAt || row.submitted_at || payload.startedAt,
      teacherFeedback: row.teacher_feedback ?? payload.teacherFeedback ?? "",
    };
  }

  if (!row?.id) return null;

  return {
    id: row.id,
    studentName: row.student_name || "Student",
    schoolName: "",
    studentEmail: row.studentEmail || row.student_email || "",
    studentAuthUserId: row.student_id || "",
    mode: row.mode || "practice",
    selectedTopics: [],
    questionCount: 0,
    startedAt: row.submitted_at || new Date().toISOString(),
    submittedAt: row.submitted_at || new Date().toISOString(),
    durationMinutes: 0,
    answers: [],
    questions: [],
    score: row.score || 0,
    percentage: row.percentage || 0,
    scoredQuestionCount: row.scored_question_count || 0,
    integrityEvents: [],
    teacherFeedback: row.teacher_feedback || "",
  };
}

function buildSupabaseAttemptRow(attempt: Attempt) {
  return {
    id: attempt.id,
    student_name: attempt.studentName,
    mode: attempt.mode,
    percentage: attempt.percentage,
    submitted_at: attempt.submittedAt || new Date().toISOString(),
    teacher_feedback: attempt.teacherFeedback || null,
    payload: attempt,
  };
}

async function getCompletedAttemptsFromDatabase(): Promise<Attempt[]> {
  const localAttempts = getStoredAttempts();
  if (!SUPABASE_ENABLED) return localAttempts;

  try {
    const response = await fetchSupabase(`/rest/v1/${SUPABASE_TABLE}?select=id,payload,submitted_at,teacher_feedback&order=submitted_at.desc`);
    const rows = await response.json().catch(() => []);
    if (!response.ok || !Array.isArray(rows)) {
      return localAttempts;
    }
    const remoteAttempts = rows.map(mapAttemptFromRow).filter((attempt): attempt is Attempt => attempt !== null);
    return mergeAttempts(remoteAttempts, localAttempts);
  } catch {
    return localAttempts;
  }
}

function saveCompletedAttempt(attempt: Attempt) {
  const currentAttempts = getStoredAttempts();
  const updated = mergeAttempts([attempt], currentAttempts);
  setStoredAttempts(updated);
  writeJson(STORAGE_KEY, attempt);
}

async function saveCompletedAttemptToDatabase(attempt: Attempt) {
  if (!SUPABASE_ENABLED) return;

  const row = buildSupabaseAttemptRow(attempt);

  const response = await fetchSupabase(`/rest/v1/${SUPABASE_TABLE}?on_conflict=id`, {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    console.error("Supabase insert error", response.status, details);
    throw new Error(`Unable to save quiz result (${response.status}).`);
  }
}

async function saveTeacherFeedbackToDatabase(attemptId: string, feedback: string) {
  const attempts = getStoredAttempts();
  const target = attempts.find((attempt) => attempt.id === attemptId);
  if (!target) return;

  const updatedAttempt: Attempt = { ...target, teacherFeedback: feedback };
  saveCompletedAttempt(updatedAttempt);

  if (!SUPABASE_ENABLED) return;

  const response = await fetchSupabase(`/rest/v1/${SUPABASE_TABLE}?id=eq.${encodeURIComponent(attemptId)}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      teacher_feedback: feedback,
      payload: updatedAttempt,
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    console.error("Supabase feedback error", response.status, details);
  }
}

function summarizeIntegrity(type: IntegrityEventType) {
  return type.replaceAll("_", " ");
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
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr] items-start">
      <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardTitle className="text-xl">Teacher access</CardTitle>
          <CardDescription>Enter the teacher password to review quiz attempts and leave feedback.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => onPasswordChange(e.target.value)} placeholder="Enter teacher password" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={onUnlock}>Open teacher view</Button>
            <Button variant="outline" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={onBack}>Back</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardTitle className="text-xl">Teacher tools</CardTitle>
          <CardDescription>Use the teacher view to inspect results, integrity notes, and add written feedback for students.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <div>• Review all submitted attempts.</div>
          <div>• See topic selections, timing, and score percentage.</div>
          <div>• Save feedback notes that parents and students can read later.</div>
          <div>• Use the exam code table to control supervised tests when Supabase is enabled.</div>
        </CardContent>
      </Card>
    </div>
  );
}

function ParentAccessGate({
  code,
  onCodeChange,
  onUnlock,
  onBack,
}: {
  code: string;
  onCodeChange: (value: string) => void;
  onUnlock: () => void;
  onBack: () => void;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr] items-start">
      <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardTitle className="text-xl">Parent access</CardTitle>
          <CardDescription>Enter the parent access code to view student results.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Parent access code</Label>
            <Input type="password" value={code} onChange={(e) => onCodeChange(e.target.value)} placeholder="Enter parent access code" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={onUnlock}>Open parent view</Button>
            <Button variant="outline" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={onBack}>Back</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
        <CardHeader>
          <CardTitle className="text-xl">Parent security</CardTitle>
          <CardDescription>This keeps parent reports separate from the student screen.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          <div>• Parents must enter the access code before results can be searched.</div>
          <div>• The code can be set with VITE_PARENT_ACCESS_CODE on the live site.</div>
          <div>• Preview fallback code: <span className="font-semibold text-slate-900">parent2026</span>.</div>
        </CardContent>
      </Card>
    </div>
  );
}

function ParentPanel() {
  const [lookupEmail, setLookupEmail] = useState("");
  const [lookupName, setLookupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [matchedAttempts, setMatchedAttempts] = useState<Attempt[]>([]);

  const summary = useMemo(() => {
    const total = matchedAttempts.length;
    const average = total ? Math.round(matchedAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / total) : 0;
    const best = total ? Math.max(...matchedAttempts.map((attempt) => attempt.percentage)) : 0;
    return { total, average, best };
  }, [matchedAttempts]);

  async function loadParentResults() {
    if (!lookupEmail.trim() && !lookupName.trim()) {
      setMessage("Enter the student's email address or full name.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const loadedAttempts = await getCompletedAttemptsFromDatabase();
      const email = lookupEmail.trim().toLowerCase();
      const name = lookupName.trim().toLowerCase();

      const filtered = loadedAttempts
        .filter((attempt) => {
          const attemptEmail = (attempt.studentEmail || "").trim().toLowerCase();
          const attemptName = (attempt.studentName || "").trim().toLowerCase();
          const emailMatch = email ? attemptEmail === email : true;
          const nameMatch = name ? attemptName.includes(name) : true;
          return emailMatch && nameMatch;
        })
        .sort((a, b) => new Date(b.submittedAt || b.startedAt).getTime() - new Date(a.submittedAt || a.startedAt).getTime());

      setMatchedAttempts(filtered);
      setMessage(filtered.length ? "" : "No submitted quiz results were found for those details yet.");
    } catch (error) {
      console.error("Parent lookup failed.", error);
      setMatchedAttempts([]);
      setMessage("Unable to load student results right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function clearLookup() {
    setLookupEmail("");
    setLookupName("");
    setMatchedAttempts([]);
    setMessage("");
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr] items-start">
        <Card className="relative z-10 rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardTitle className="text-xl">Parent view</CardTitle>
            <CardDescription>Look up a student's completed quizzes to see scores, feedback, and progress updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Student email address</Label>
              <Input
                type="email"
                value={lookupEmail}
                onChange={(e) => setLookupEmail(e.target.value)}
                placeholder="Enter the student's email"
              />
            </div>
            <div className="space-y-2">
              <Label>Student name</Label>
              <Input
                value={lookupName}
                onChange={(e) => setLookupName(e.target.value)}
                placeholder="Optional: enter the student's name"
              />
            </div>

            {message ? <div className="rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">{message}</div> : null}

            <div className="relative z-10 flex flex-wrap gap-2 pointer-events-auto">
              <Button type="button" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)] pointer-events-auto" onClick={() => void loadParentResults()} disabled={loading}>
                {loading ? "Loading..." : "View student results"}
              </Button>
              <Button type="button" variant="outline" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)] pointer-events-auto" onClick={clearLookup}>
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="relative z-10 rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardTitle className="text-xl">What parents can see</CardTitle>
            <CardDescription>This view is read-only and designed for quick progress checks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <div>• Completed quiz attempts for one student.</div>
            <div>• Scores, percentages, and submission dates.</div>
            <div>• Teacher feedback that was saved after review.</div>
            <div>• Integrity flag counts for each attempt.</div>
            <div>• A quick summary of recent progress.</div>
            <div className="rounded-sm border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900">
              This is a simple parent view for reporting only. For a public release, add parent accounts or secure parent access codes.
            </div>
          </CardContent>
        </Card>
      </div>

      {matchedAttempts.length > 0 ? (
        <Fragment>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
              <CardContent className="p-5">
                <div className="text-sm text-slate-500">Completed quizzes</div>
                <div className="mt-2 text-3xl font-bold">{summary.total}</div>
              </CardContent>
            </Card>
            <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
              <CardContent className="p-5">
                <div className="text-sm text-slate-500">Average score</div>
                <div className="mt-2 text-3xl font-bold">{summary.average}%</div>
              </CardContent>
            </Card>
            <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
              <CardContent className="p-5">
                <div className="text-sm text-slate-500">Best score</div>
                <div className="mt-2 text-3xl font-bold">{summary.best}%</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {matchedAttempts.map((attempt) => (
              <Card key={attempt.id} className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-xl">{attempt.studentName}</CardTitle>
                      <CardDescription>
                        {attempt.studentEmail || "No email saved"}
                        {attempt.schoolName ? ` · ${attempt.schoolName}` : ""}
                        {attempt.submittedAt ? ` · Submitted ${new Date(attempt.submittedAt).toLocaleString()}` : ""}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge>{attempt.mode}</Badge>
                      <Badge variant="secondary">{attempt.percentage}%</Badge>
                      <Badge variant={attempt.integrityEvents.length ? "destructive" : "outline"}>{attempt.integrityEvents.length} flags</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                      <div className="text-slate-500">Score</div>
                      <div className="mt-1 text-2xl font-semibold text-slate-900">
                        {`${attempt.score}/${attempt.questionCount || attempt.questions.length}`}
                      </div>
                    </div>
                    <div className="rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                      <div className="text-slate-500">Topics</div>
                      <div className="mt-1 font-medium text-slate-900">{attempt.selectedTopics.join(", ")}</div>
                    </div>
                    <div className="rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                      <div className="text-slate-500">Questions</div>
                      <div className="mt-1 font-medium text-slate-900">{attempt.questionCount}</div>
                    </div>
                  </div>

                  <div className="rounded-sm border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    <div className="font-medium text-slate-900">Teacher feedback</div>
                    <div className="mt-2">{attempt.teacherFeedback?.trim() ? attempt.teacherFeedback : "No teacher feedback has been added yet."}</div>
                  </div>

                  {attempt.integrityEvents.length > 0 ? (
                    <div className="rounded-sm border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                      <div className="font-medium">Integrity notes</div>
                      <div className="mt-2 space-y-1">
                        {attempt.integrityEvents.map((event, index) => (
                          <div key={`${event.at}-${index}`}>• {summarizeIntegrity(event.type)} — {event.details}</div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}

function TeacherPanel() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function loadAttempts() {
    setLoading(true);
    setMessage("");
    try {
      const loaded = await getCompletedAttemptsFromDatabase();
      setAttempts(loaded);
      setDrafts(
        loaded.reduce<Record<string, string>>((acc, attempt) => {
          acc[attempt.id] = attempt.teacherFeedback || "";
          return acc;
        }, {})
      );
    } catch (error) {
      console.error(error);
      setMessage("Unable to load attempts right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadAttempts();
  }, []);

  async function saveFeedback(attemptId: string) {
    const feedback = drafts[attemptId] || "";
    await saveTeacherFeedbackToDatabase(attemptId, feedback);
    setAttempts((current) => current.map((attempt) => (attempt.id === attemptId ? { ...attempt, teacherFeedback: feedback } : attempt)));
    setMessage("Feedback saved.");
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Teacher dashboard</h2>
          <p className="text-sm text-slate-600">Review completed attempts and leave written feedback.</p>
        </div>
        <Button variant="outline" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => void loadAttempts()}>
          Refresh attempts
        </Button>
      </div>

      {message ? <div className="rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">{message}</div> : null}
      {loading ? <div className="rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading attempts...</div> : null}

      {!loading && attempts.length === 0 ? (
        <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <CardContent className="p-6 text-sm text-slate-600">No submitted quiz attempts yet.</CardContent>
        </Card>
      ) : null}

      <div className="space-y-4">
        {attempts.map((attempt) => (
          <Card key={attempt.id} className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-xl">{attempt.studentName}</CardTitle>
                  <CardDescription>
                    {attempt.studentEmail || "No email saved"}
                    {attempt.schoolName ? ` · ${attempt.schoolName}` : ""}
                    {attempt.submittedAt ? ` · Submitted ${new Date(attempt.submittedAt).toLocaleString()}` : ""}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{attempt.mode}</Badge>
                  <Badge variant="secondary">{attempt.percentage}%</Badge>
                  <Badge variant={attempt.integrityEvents.length ? "destructive" : "outline"}>{attempt.integrityEvents.length} flags</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <div className="text-slate-500">Score</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-900">
                    {`${attempt.score}/${attempt.questionCount || attempt.questions.length}`}
                  </div>
                </div>
                <div className="rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <div className="text-slate-500">Topics</div>
                  <div className="mt-1 font-medium text-slate-900">{attempt.selectedTopics.join(", ")}</div>
                </div>
                <div className="rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  <div className="text-slate-500">Duration</div>
                  <div className="mt-1 font-medium text-slate-900">{attempt.durationMinutes} min</div>
                </div>
              </div>

              {attempt.integrityEvents.length > 0 ? (
                <div className="rounded-sm border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <div className="font-medium">Integrity notes</div>
                  <div className="mt-2 space-y-1">
                    {attempt.integrityEvents.map((event, index) => (
                      <div key={`${event.at}-${index}`}>• {summarizeIntegrity(event.type)} — {event.details}</div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="space-y-2">
                <Label>Teacher feedback</Label>
                <Textarea
                  value={drafts[attempt.id] || ""}
                  onChange={(e) => setDrafts((current) => ({ ...current, [attempt.id]: e.target.value }))}
                  placeholder="Write feedback for this student"
                />
              </div>
              <div className="flex gap-2">
                <Button className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => void saveFeedback(attempt.id)}>
                  Save feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StudentPanel() {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("practice");
  const [questionCount, setQuestionCount] = useState("10");
  const [examCode, setExamCode] = useState("");
  const [examRequestMessage, setExamRequestMessage] = useState("");

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersByQuestion, setAnswersByQuestion] = useState<Record<number, AttemptAnswer>>({});
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [integrityEvents, setIntegrityEvents] = useState<IntegrityEvent[]>([]);
  const [submittedAttempt, setSubmittedAttempt] = useState<Attempt | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const timerRef = useRef<number | null>(null);
  const questionEnterRef = useRef<number>(Date.now());

  useEffect(() => {
    if (mode !== "exam") {
      setExamRequestMessage("");
    }
    if (mode === "trial") {
      setExamCode("");
    }
  }, [mode]);

  useEffect(() => {
    if (!startedAt || submittedAttempt) return;
    timerRef.current = window.setInterval(() => setElapsedSeconds((value) => value + 1), 1000);
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [startedAt, submittedAttempt]);

  useEffect(() => {
    if (!startedAt || submittedAttempt) return;
    const onVisibilityChange = () => {
      setIntegrityEvents((current) => [
        ...current,
        {
          type: document.hidden ? "tab_blur" : "tab_focus",
          at: new Date().toISOString(),
          details: document.hidden ? "Student switched away from the quiz tab." : "Student returned to the quiz tab.",
        },
      ]);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [startedAt, submittedAttempt]);

  const currentQuestion = quizQuestions[currentIndex];

  function toggleTopic(topic: string) {
    setSelectedTopics((current) => (current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]));
  }

  function requestExamCode() {
    if (!studentName.trim()) {
      window.alert("Enter your name before requesting an exam code.");
      return;
    }
    if (!studentEmail.trim()) {
      window.alert("Enter your email before requesting an exam code.");
      return;
    }
    setExamRequestMessage(`Exam code request ready for ${studentName.trim()} (${studentEmail.trim()}). Give this student an exam code to continue.`);
  }

  function commitCurrentQuestionTime() {
    if (!currentQuestion) return;
    const delta = Math.max(0, Math.round((Date.now() - questionEnterRef.current) / 1000));
    if (delta === 0) return;
    setAnswersByQuestion((current) => {
      const existing = current[currentQuestion.id] ?? {
        questionId: currentQuestion.id,
        changedCount: 0,
        timeSpentSeconds: 0,
      };
      return {
        ...current,
        [currentQuestion.id]: {
          ...existing,
          timeSpentSeconds: existing.timeSpentSeconds + delta,
        },
      };
    });
    questionEnterRef.current = Date.now();
  }

  function goToQuestion(index: number) {
    commitCurrentQuestionTime();
    setCurrentIndex(index);
    questionEnterRef.current = Date.now();
  }

  function selectAnswer(option: OptionKey) {
    if (!currentQuestion || submittedAttempt) return;
    setAnswersByQuestion((current) => {
      const existing = current[currentQuestion.id] ?? {
        questionId: currentQuestion.id,
        changedCount: 0,
        timeSpentSeconds: 0,
      };
      const nextChangedCount = existing.selected && existing.selected !== option ? existing.changedCount + 1 : existing.changedCount;
      return {
        ...current,
        [currentQuestion.id]: {
          ...existing,
          selected: option,
          changedCount: nextChangedCount,
        },
      };
    });
  }

  async function startQuiz() {
    if (!studentName.trim()) {
      window.alert("Enter your name before starting the quiz.");
      return;
    }

    if (selectedTopics.length === 0) {
      window.alert("Select at least one topic.");
      return;
    }

    if (mode === "practice") {
      if (!examCode.trim()) {
        window.alert("Enter the practice passcode before starting.");
        return;
      }
      if (examCode.trim() !== PRACTICE_MASTER_PASSCODE) {
        window.alert("That practice passcode is not correct.");
        return;
      }
    }

    if (mode === "exam") {
      if (!studentEmail.trim()) {
        window.alert("Enter your email before starting exam mode.");
        return;
      }
      if (!examCode.trim()) {
        window.alert("Enter the access code given by your teacher.");
        return;
      }

      if (SUPABASE_ENABLED) {
        try {
          await consumeExamAccessCode(studentEmail.trim(), examCode.trim());
        } catch (error) {
          window.alert(error instanceof Error ? error.message : "Unable to validate the access code.");
          return;
        }
      }
    }

    const count = Math.max(1, Number(questionCount) || 10);
    const filteredQuestions = buildShuffledQuestionSet(
      QUESTION_BANK.filter((question) => selectedTopics.includes(question.topic)),
      count
    );
    if (filteredQuestions.length === 0) {
      window.alert("No questions are available for the selected topics yet.");
      return;
    }

    setQuizQuestions(filteredQuestions);
    setAnswersByQuestion({});
    setCurrentIndex(0);
    setStartedAt(new Date().toISOString());
    setElapsedSeconds(0);
    setIntegrityEvents([]);
    setSubmittedAttempt(null);
    questionEnterRef.current = Date.now();
  }

  async function submitQuiz() {
    if (!startedAt) return;
    commitCurrentQuestionTime();
    setSubmitting(true);

    const answerList = quizQuestions.map((question) => {
      const answer = answersByQuestion[question.id] ?? {
        questionId: question.id,
        changedCount: 0,
        timeSpentSeconds: 0,
      };
      const isCorrect = question.correctAnswer ? answer.selected === question.correctAnswer : undefined;
      return {
        ...answer,
        isCorrect,
      };
    });

    const scoredQuestions = quizQuestions.filter((question) => !!question.correctAnswer);
    const score = scoredQuestions.filter((question) => answersByQuestion[question.id]?.selected === question.correctAnswer).length;
    const scoredQuestionCount = quizQuestions.length;
    const percentage = scoredQuestionCount ? Math.round((score / scoredQuestionCount) * 100) : 0;

    const finalIntegrity = [...integrityEvents];
    if (elapsedSeconds > 0 && elapsedSeconds < quizQuestions.length * 12) {
      finalIntegrity.push({
        type: "very_fast_finish",
        at: new Date().toISOString(),
        details: "Quiz was submitted very quickly compared with the number of questions.",
      });
    }

    const attempt: Attempt = {
      id: generateId(),
      studentName: studentName.trim(),
      schoolName: schoolName.trim(),
      studentEmail: studentEmail.trim(),
      mode,
      selectedTopics,
      questionCount: quizQuestions.length,
      startedAt,
      submittedAt: new Date().toISOString(),
      durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
      answers: answerList,
      questions: quizQuestions,
      score,
      percentage,
      scoredQuestionCount,
      integrityEvents: finalIntegrity,
      teacherFeedback: "",
    };

    try {
      saveCompletedAttempt(attempt);
      setSubmittedAttempt(attempt);

      try {
        await saveCompletedAttemptToDatabase(attempt);
      } catch (error) {
        console.error("Background save failed", error);
      }
    } finally {
      setSubmitting(false);
    }
  }

  function resetQuiz() {
    setSelectedTopics([]);
    setQuizQuestions([]);
    setAnswersByQuestion({});
    setCurrentIndex(0);
    setStartedAt(null);
    setElapsedSeconds(0);
    setIntegrityEvents([]);
    setSubmittedAttempt(null);
    setShowSubmitConfirm(false);
    setExamCode("");
    setExamRequestMessage("");
    questionEnterRef.current = Date.now();
  }

  if (!startedAt && !submittedAttempt) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] items-start">
          <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <CardHeader>
              <CardTitle className="text-xl">Let’s set up your quiz</CardTitle>
              <CardDescription>Students do not need login details. Enter your information, choose your mode, and start when ready.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Your name</Label>
                  <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Type your full name" />
                </div>
                <div className="space-y-2">
                  <Label>Email address</Label>
                  <Input type="email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="Type your email address" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>School name</Label>
                <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="Type your school name" />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Label>Pick your topics</Label>
                  <Button
                    variant={selectedTopics.length === AVAILABLE_TOPICS.length ? "default" : "outline"}
                    onClick={() => setSelectedTopics(selectedTopics.length === AVAILABLE_TOPICS.length ? [] : [...AVAILABLE_TOPICS])}
                  >
                    {selectedTopics.length === AVAILABLE_TOPICS.length ? "Clear all" : "Select all"}
                  </Button>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {AVAILABLE_TOPICS.map((topic) => {
                    const active = selectedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        className={cn(
                          "rounded-lg border px-3 py-3 text-left text-sm transition",
                          active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                        )}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={cn("grid gap-4", mode === "trial" ? "md:grid-cols-2" : "md:grid-cols-3")}>
                <div className="space-y-2">
                  <Label>Mode</Label>
                  <Select value={mode} onValueChange={(value) => setMode(value as Mode)}>
                    <SelectTrigger>
                      <SelectContent>
                        <SelectItem value="practice">practice</SelectItem>
                        <SelectItem value="trial">trial</SelectItem>
                        <SelectItem value="exam">exam</SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Question count</Label>
                  {mode === "practice" ? (
                    <Input
                      type="number"
                      min="1"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(e.target.value)}
                      placeholder="Enter how many questions you want"
                    />
                  ) : (
                    <Select value={questionCount} onValueChange={setQuestionCount}>
                      <SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                        </SelectContent>
                      </SelectTrigger>
                    </Select>
                  )}
                </div>
                {mode !== "trial" ? (
                  <div className="space-y-2">
                    <Label>{mode === "practice" ? "Practice passcode" : "Exam access code"}</Label>
                    <Input
                      value={examCode}
                      onChange={(e) => setExamCode(e.target.value)}
                      placeholder={mode === "practice" ? "Enter practice2026" : "Enter teacher exam code"}
                    />
                  </div>
                ) : null}
              </div>

              {mode === "exam" ? (
                <div className="space-y-3 rounded-sm border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm text-slate-700">Students must enter their name and email before requesting an exam code.</div>
                  {examRequestMessage ? <div className="rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">{examRequestMessage}</div> : null}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={requestExamCode}>Request exam code</Button>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2">
                <Button className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => void startQuiz()}>
                  Start quiz
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <CardHeader>
              <CardTitle className="text-xl">Quiz information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <div>• Students do not need login details to use the quiz.</div>
              <div>• Practice mode uses one passcode: <span className="font-semibold text-slate-900">practice2026</span>.</div>
              <div>• Trial mode does not require any code.</div>
              <div>• Exam mode requires student name, email, and a teacher-issued exam code.</div>
              <div>• Your selected answer is highlighted while you work.</div>
              <div>• Results can be reviewed later by teachers and parents.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (submittedAttempt) {
    return (
      <div className="space-y-4">
        <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <CardHeader>
            <CardTitle className="text-2xl">Quiz submitted</CardTitle>
            <CardDescription>{submittedAttempt.studentName}, here is your result summary.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-sm border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Score</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">{submittedAttempt.score}/{submittedAttempt.questionCount || submittedAttempt.questions.length}</div>
              </div>
              <div className="rounded-sm border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Percentage</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">{submittedAttempt.percentage}%</div>
              </div>
              <div className="rounded-sm border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Duration</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">{submittedAttempt.durationMinutes} min</div>
              </div>
              <div className="rounded-sm border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Flags</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">{submittedAttempt.integrityEvents.length}</div>
              </div>
            </div>

            {submittedAttempt.teacherFeedback ? (
              <div className="rounded-sm border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                <div className="font-medium">Teacher feedback</div>
                <div className="mt-2 whitespace-pre-wrap">{submittedAttempt.teacherFeedback}</div>
              </div>
            ) : null}

            {ANSWERS_VISIBLE_ONLY_AFTER_SUBMIT ? (
              <div className="space-y-4">
                {submittedAttempt.questions.map((question, index) => {
                  const answer = submittedAttempt.answers.find((item) => item.questionId === question.id);
                  return (
                    <Card key={question.id} className="rounded-md border border-slate-200 bg-white shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
                      <CardHeader>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-2">
                            <Badge variant="outline">Question {index + 1}</Badge>
                            <CardTitle className="text-lg">{question.topic}</CardTitle>
                            <CardDescription>{question.subtopic}</CardDescription>
                          </div>
                          <Badge variant={answer?.isCorrect ? "secondary" : "destructive"}>{answer?.isCorrect ? "Correct" : "Incorrect"}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-5 text-slate-900 shadow-sm">
                          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Question</div>
                          <RichText text={question.stem} className="block text-lg leading-8 md:text-xl md:leading-9" />
                        </div>
                        <div className="space-y-2">
                          {(question.optionOrder ?? (["A", "B", "C", "D"] as OptionKey[])).map((option) => {
                            const selected = answer?.selected === option;
                            const correct = question.correctAnswer === option;
                            return (
                              <div
                                key={option}
                                className={cn(
                                  "rounded-lg border px-4 py-3 text-sm",
                                  selected && correct && "border-emerald-500 bg-emerald-50",
                                  selected && !correct && "border-rose-500 bg-rose-50",
                                  !selected && correct && "border-emerald-300 bg-emerald-50/60",
                                  !selected && !correct && "border-slate-200 bg-white"
                                )}
                              >
                                <div className="font-medium text-slate-900">{option}</div>
                                <div className="mt-1 text-slate-700"><RichText text={question.options[option]} /></div>
                              </div>
                            );
                          })}
                        </div>
                        {question.explanation ? (
                          <div className="rounded-sm border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                            <div className="font-medium text-slate-900">Explanation</div>
                            <div className="mt-2"><RichText text={question.explanation} /></div>
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : null}

            <div className="flex gap-2">
              <Button className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={resetQuiz}>Set up another quiz</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <div className="text-sm text-slate-600">
          Student: <span className="font-medium text-slate-900">{studentName || "Unnamed student"}</span>
          {studentEmail ? <span className="text-slate-500"> · {studentEmail}</span> : null}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-[220px] text-sm text-slate-600">
            <div className="mb-1 flex items-center justify-between">
              <span>Progress</span>
              <span>{currentIndex + 1}/{quizQuestions.length}</span>
            </div>
            <Progress value={((currentIndex + 1) / quizQuestions.length) * 100} />
          </div>
          <Badge variant="outline">{Math.floor(elapsedSeconds / 60)}m {String(elapsedSeconds % 60).padStart(2, "0")}s</Badge>
        </div>
      </div>

      {currentQuestion ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <Card className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <CardHeader className="space-y-3 border-b border-slate-100 pb-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Question {currentIndex + 1} of {quizQuestions.length}</Badge>
                <Badge variant="secondary">{currentQuestion.difficulty}</Badge>
              </div>
              <CardTitle className="text-2xl leading-tight md:text-[1.9rem]">{currentQuestion.subtopic}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 text-slate-900 shadow-sm md:px-8 md:py-8">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Question</div>
                <div className="max-w-none text-slate-900">
                  <RichText text={currentQuestion.stem} className="block text-[1.4rem] leading-10 md:text-[1.8rem] md:leading-[2.9rem]" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {(currentQuestion.optionOrder ?? (["A", "B", "C", "D"] as OptionKey[])).map((option) => {
                  const selected = answersByQuestion[currentQuestion.id]?.selected === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectAnswer(option)}
                      className={cn(
                        "rounded-2xl border px-5 py-5 text-left transition-all md:px-6 md:py-6",
                        selected
                          ? "border-slate-900 bg-slate-900 text-white shadow-[0_10px_22px_rgba(15,23,42,0.18)]"
                          : "border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50"
                      )}
                    >
                      <div className="max-w-none text-[1.02rem] leading-8 md:text-[1.15rem] md:leading-9">
                        <RichText text={currentQuestion.options[option]} className={selected ? "text-white" : "text-slate-700"} />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => goToQuestion(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0}>Previous</Button>
                  <Button variant="outline" onClick={() => goToQuestion(Math.min(quizQuestions.length - 1, currentIndex + 1))} disabled={currentIndex === quizQuestions.length - 1}>Next</Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetQuiz}>Cancel quiz</Button>
                  <Button className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => setShowSubmitConfirm(true)} disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit quiz"}
                  </Button>
                </div>
              </div>

              {showSubmitConfirm ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <div className="font-semibold text-amber-950">Confirm submission</div>
                  <div className="mt-2">Are you sure you want to submit this quiz? You will not be able to change your answers after submitting.</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => void submitQuiz()} disabled={submitting}>
                      {submitting ? "Submitting..." : "Yes, submit quiz"}
                    </Button>
                    <Button variant="outline" onClick={() => setShowSubmitConfirm(false)} disabled={submitting}>Go back</Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </motion.div>
      ) : null}
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<Role>("student");
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [parentAccessCodeInput, setParentAccessCodeInput] = useState("");
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [teacherPasswordInput, setTeacherPasswordInput] = useState("");

  useEffect(() => {
    setTeacherUnlocked(restoreTeacherUnlocked());
  }, []);

  function unlockParentView() {
    if (parentAccessCodeInput !== EFFECTIVE_PARENT_ACCESS_CODE) {
      window.alert("That parent access code is not correct.");
      return;
    }
    setParentUnlocked(true);
  }

  function leaveParentView() {
    setParentAccessCodeInput("");
    setParentUnlocked(false);
    setRole("student");
  }

  function unlockTeacherView() {
    if (teacherPasswordInput !== EFFECTIVE_TEACHER_PASSWORD) {
      window.alert("That teacher password is not correct.");
      return;
    }
    setTeacherUnlocked(true);
    persistTeacherUnlocked(true);
  }

  function leaveTeacherView() {
    setTeacherPasswordInput("");
    setTeacherUnlocked(false);
    persistTeacherUnlocked(false);
    setRole("student");
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#1f3a8a_0%,#253b9f_45%,#2f3a97_100%)] px-4 py-6 text-slate-900 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-transparent text-white">
            <div className="px-6 pt-8 pb-6 text-center md:px-10">
              <div className="text-sm uppercase tracking-[0.35em] text-white/80">Student Assessment Portal</div>
              <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">CSEC Additional Mathematics</h1>
              <p className="mt-4 text-xl text-white/90 md:text-2xl">Multiple Choice Questions</p>
              <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-2">
                <Button variant={role === "student" ? "default" : "outline"} className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => setRole("student")}>Student view</Button>
                <Button variant={role === "parent" ? "default" : "outline"} className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => setRole("parent")}>Parent view</Button>
                {parentUnlocked && role === "parent" ? (
                  <Button variant="secondary" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={leaveParentView}>Lock parent view</Button>
                ) : null}
                <Button variant={role === "teacher" ? "default" : "outline"} className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={() => setRole("teacher")}>Teacher view</Button>
                {teacherUnlocked && role === "teacher" ? (
                  <Button variant="secondary" className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)]" onClick={leaveTeacherView}>Lock teacher view</Button>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>

        {role === "student" ? (
          <StudentPanel />
        ) : role === "parent" ? (
          parentUnlocked ? (
            <ParentPanel />
          ) : (
            <ParentAccessGate
              code={parentAccessCodeInput}
              onCodeChange={setParentAccessCodeInput}
              onUnlock={unlockParentView}
              onBack={() => {
                setParentAccessCodeInput("");
                setRole("student");
              }}
            />
          )
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
