'use client';

interface InterpretationResultProps {
  interpretation: string | null;
  question: string;
  loading: boolean;
  onReset: () => void;
}

export default function InterpretationResult({
  interpretation,
  question,
  loading,
  onReset,
}: InterpretationResultProps) {
  if (loading) {
    return (
      <div className="w-full p-8 bg-gray-800/60 rounded-xl shadow-xl border border-gray-700/50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent mb-4"></div>
          <p className="text-accent text-lg font-medium">Finding your path...</p>
        </div>
      </div>
    );
  }

  if (!interpretation) {
    return null;
  }

  return (
    <div className="w-full p-8 bg-gray-800/60 rounded-xl shadow-xl border border-gray-700/50">
      <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-6">
        Tarot Card Interpretation
      </h2>
      <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700/30">
        <p className="text-gray-300">
          <strong className="text-highlight font-semibold">Question:</strong> {question}
        </p>
      </div>
      <div className="text-gray-200 leading-relaxed whitespace-pre-line mb-8 text-lg">
        {interpretation}
      </div>
      <div className="text-center">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-accent text-white rounded-xl hover:bg-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform"
        >
          Ask New Question
        </button>
      </div>
    </div>
  );
}
