import type { RawQuestionRow } from "./types";

import { ArithmeticAndGeometricSequenceQuestions } from "./Arithmetic And Geometric Sequence";
import { EquationOfCirclesQuestions } from "./Equation of circles";
import { ExponentialAndLogarithmQuestions } from "./ExponentialAndLogarithm";
import { FactorizationQuestions } from "./Factorization";
import { FunctionsQuestions } from "./Function";
import { MaximumAndMinimumQuestions } from "./Maximum and Minimum";
import { NatureOfRootsQuestions } from "./Nature of roots";
import { RadiansQuestions } from "./Radians";
import { SumAndProductOfRootsQuestions } from "./SumAndProduct of Roots";
import { TrigonometryQuestions } from "./Trigonometry";
import { calculusQuestions } from "./calculus";
import { coordinateGeometryQuestions } from "./coordinate geometry";
import { linearAndQuadraticInequalityQuestions } from "./linear & Quadratic Inequality";
import { logarithmsQuestions } from "./logarithms";
import { sequencesQuestions } from "./sequences";
import { StatisticsQuestions } from "./Statistics";
import { surdQuestions } from "./surd";
import { vectorQuestions } from "./vector";

export const RAW_QUESTION_BANK: RawQuestionRow[] = [
  ...FactorizationQuestions,
  ...ArithmeticAndGeometricSequenceQuestions,
  ...ExponentialAndLogarithmQuestions,
  ...SumAndProductOfRootsQuestions,
  ...NatureOfRootsQuestions,
  ...FunctionsQuestions,
  ...MaximumAndMinimumQuestions,
  ...surdQuestions,
  ...linearAndQuadraticInequalityQuestions,
  ...EquationOfCirclesQuestions,
  ...vectorQuestions,
  ...TrigonometryQuestions,
  ...RadiansQuestions,
  ...coordinateGeometryQuestions,
  ...calculusQuestions,
  ...StatisticsQuestions,
  ...logarithmsQuestions,
  ...sequencesQuestions,
];
