function buildPatchedQuestion(raw: RawQuestionRow): Question | null {
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
