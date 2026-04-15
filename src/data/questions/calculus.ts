
import type { RawQuestionRow } from "./types";

export const calculusQuestions: RawQuestionRow[] = [
  [126, 126, "Calculus", "Given that 𝑦 = (3𝑥 − 2)³, then 𝑑𝑦/𝑑𝑥=", "3(3𝑥 − 2)²", "3(3𝑥)²", "3(3𝑥 − 2)²", "9(3𝑥 − 2)²"],
  [127, 127, "Calculus", "Given that y = (3x + 5)/(2x − 11), then dy/dx =", "[(3x + 5)(2)+ (2x − 11)(3)]/(2x − 11)^2", "[(2x − 11)(3)+ (3x + 5)(2)]/(2x − 11)^2", "[(2x − 11)(3)− (3x + 5)(2)]/(2x − 11)^2", "[(3x + 5)(2)− (2x − 11)(3)]/(2x − 11)^2"],
  [128, 128, "Calculus", "Given that y = (3x + 5)/(2x − 11), then dy/dx =", "[(3x + 5)(2)+ (2x − 11)(3)]/(2x − 11)^2", "[(2x − 11)(3)+ (3x + 5)(2)]/(2x − 11)^2", "[(2x − 11)(3)− (3x + 5)(2)]/(2x − 11)^2", "[(3x + 5)(2)− (2x − 11)(3)]/(2x − 11)^2"],
  [129, 129, "Calculus", "The curve C is given by the equation 𝑦 = 3 𝑠𝑖𝑛 𝑥 + 2. The value of 𝑑𝑦/𝑑𝑥 at the point where 𝑥 = 𝜋/3 is", "1/2", "3/2", "7/2", "3"],
  [130, 130, "Calculus", "The point 𝑃 (2, 2) lies on the curve with equation 𝑦 = 𝑥(𝑥 − 3)². The equation of the normal to the curve at the point P is given by", "𝑦 − 2 = 3(𝑥 − 2)", "𝑦 − 2 = −3(𝑥 − 2)", "𝑦 − 2 = ( 1/3) (𝑥 − 2)", "𝑦 − 2 = −( 1/3) (𝑥 − 2)"],
  [131, 131, "Calculus", "The curve C is given by the equation 𝑦 = 4𝑥 + 9/𝑥. The second derivative, (d^2y)/(dx^2), is given by", "4 + 9/x^3", "18/x^3", "4 − 9/x^3", "9/(2x^3)"],
  [132, 132, "Calculus", "The positive value of z for which ∫x^2𝑑𝑥 = 9 when x=0 to x = z is", "3", "4.5", "9", "27"],
  [133, 133, "Calculus", "The gradient of the tangent to a curve C at (x, y) is given by 𝑑𝑦/𝑑𝑥= 1/(3𝑥 + 4)². The curve passes through the point 𝑃(− 1/2 , 3). The equation of the curve C is given by", "𝑦 = 2/(3𝑥 + 4) + 1", "𝑦 = − 6/(3𝑥 + 4)", "𝑦 = − 2/(3𝑥 + 4) + 4", "𝑦 = − 1/(3𝑥 + 4) + 1"],
  [134, 134, "Calculus", "The finite region R is bounded by the y-axis, the x-axis, and the curve 𝑦 = 𝑥(𝑥 − 3)² as shown in the figure above. The area of R in square units is", "1", "3", "9", "27"],
  [135, 135, "Calculus", "The finite region enclosed by the curve y = x^2, the x-axis and the line x = 2 is rotated completely about the x-axis. The volume of the solid of revolution formed is given by:", "\\int_0^2(1/3)x^2 dx", "\\int_0^2 x^4 dx", "π \\int_0^2 x^2 dx", "π \\int_0^2 x^4 dx"],
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
];
