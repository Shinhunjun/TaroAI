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
      <div className="w-full p-6 sm:p-8 bg-gray-800/60 rounded-xl shadow-xl border border-gray-700/50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-accent mb-4"></div>
          <p className="text-accent text-base sm:text-lg font-medium">Finding your path...</p>
        </div>
      </div>
    );
  }

  if (!interpretation) {
    return null;
  }

  return (
    <div className="w-full p-6 sm:p-8 bg-gray-800/60 rounded-xl shadow-xl border border-gray-700/50">
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-foreground mb-4 sm:mb-6">
        Tarot Card Interpretation
      </h2>
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-900/50 rounded-lg border border-gray-700/30">
        <p className="text-gray-300 text-sm sm:text-base">
          <strong className="text-highlight font-semibold">Question:</strong> {question}
        </p>
      </div>
      <div className="text-gray-200 leading-relaxed whitespace-pre-line mb-6 sm:mb-8 text-base sm:text-lg">
        {interpretation}
      </div>
      <div className="text-center">
        <button
          onClick={onReset}
          className="px-6 py-3 sm:px-8 sm:py-3 bg-accent text-white rounded-xl hover:bg-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform text-sm sm:text-base"
        >
          Ask New Question
        </button>
      </div>
    </div>
  );
}
