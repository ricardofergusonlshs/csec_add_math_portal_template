import React, { Fragment, createContext, forwardRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import katex from "katex";
import "katex/dist/katex.min.css";
import { RAW_QUESTION_BANK } from "./data/questions";
import type { RawQuestionRow } from "./data/questions/types";
