'use client';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function QuestionInput({ value, onChange, disabled }: QuestionInputProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="e.g., What does my career path look like?"
        className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-gray-800/80 border-2 border-gray-600/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg transition-all"
      />
      <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm font-medium text-gray-400 bg-gray-800/40 p-2 sm:p-3 rounded-lg border border-gray-700/30">
        Enter your question first, then draw 3 cards below.
      </p>
    </div>
  );
}
