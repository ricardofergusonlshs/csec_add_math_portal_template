import React, { Fragment, createContext, forwardRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import katex from "katex";
import "katex/dist/katex.min.css";

function ParentPanel() {
  const [lookupEmail, setLookupEmail] = useState("");
  const [lookupName, setLookupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [matchedAttempts, setMatchedAttempts] = useState<Attempt[]>([]);

  const summary = useMemo(() => {
    const total = matchedAttempts.length;
    const average = total
      ? Math.round(
          matchedAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / total
        )
      : 0;
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
        .sort(
          (a, b) =>
            new Date(b.submittedAt || b.startedAt).getTime() -
            new Date(a.submittedAt || a.startedAt).getTime()
        );

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
            <CardDescription>
              Look up a student's completed quizzes to see scores, feedback, and progress updates.
            </CardDescription>
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

            {message ? (
              <div className="rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                {message}
              </div>
            ) : null}

            <div className="relative z-10 flex flex-wrap gap-2 pointer-events-auto">
              <Button
                type="button"
                className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)] pointer-events-auto"
                onClick={() => void loadParentResults()}
                disabled={loading}
              >
                {loading ? "Loading..." : "View student results"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="rounded-md shadow-[0_6px_14px_rgba(15,23,42,0.16)] pointer-events-auto"
                onClick={clearLookup}
              >
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
        <>
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
              <Card
                key={attempt.id}
                className="rounded-md border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
              >
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
                      <Badge variant={attempt.integrityEvents.length ? "destructive" : "outline"}>
                        {attempt.integrityEvents.length} flags
                      </Badge>
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
                      <div className="mt-1 font-medium text-slate-900">
                        {attempt.selectedTopics.join(", ")}
                      </div>
                    </div>

                    <div className="rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                      <div className="text-slate-500">Questions</div>
                      <div className="mt-1 font-medium text-slate-900">{attempt.questionCount}</div>
                    </div>
                  </div>

                  <div className="rounded-sm border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    <div className="font-medium text-slate-900">Teacher feedback</div>
                    <div className="mt-2">
                      {attempt.teacherFeedback?.trim()
                        ? attempt.teacherFeedback
                        : "No teacher feedback has been added yet."}
                    </div>
                  </div>

                  {attempt.integrityEvents.length > 0 ? (
                    <div className="rounded-sm border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                      <div className="font-medium">Integrity notes</div>
                      <div className="mt-2 space-y-1">
                        {attempt.integrityEvents.map((event, index) => (
                          <div key={`${event.at}-${index}`}>
                            • {summarizeIntegrity(event.type)} — {event.details}
                            
                            export default function App() {
  ...
}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
