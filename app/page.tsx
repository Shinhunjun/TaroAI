'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { CardWithOrientation } from '@/types/tarot';
import QuestionInput from '@/components/QuestionInput';
import CardSelector from '@/components/CardSelector';
import InterpretationResult from '@/components/InterpretationResult';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [cards, setCards] = useState<{
    past: CardWithOrientation | null;
    present: CardWithOrientation | null;
    future: CardWithOrientation | null;
  }>({
    past: null,
    present: null,
    future: null,
  });
  const [drawingCards, setDrawingCards] = useState(false);
  const [interpretationLoading, setInterpretationLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);

  const handleDrawAllCards = async () => {
    if (!question.trim()) {
      toast.error('Please enter a question first.');
      return;
    }

    setDrawingCards(true);

    try {
      const response = await fetch('/api/draw-all-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      console.log('Drew all 3 cards:', data.cards);
      setCards(data.cards);
      toast.success('Cards drawn successfully!');
    } catch (error) {
      console.error('Error drawing cards:', error);
      toast.error('Failed to draw cards. Please try again.');
    } finally {
      setDrawingCards(false);
    }
  };

  const handleInterpret = async () => {
    if (!question.trim()) {
      toast.error('Please enter a question.');
      return;
    }

    if (!cards.past || !cards.present || !cards.future) {
      toast.error('Please draw all three cards first.');
      return;
    }

    setInterpretationLoading(true);

    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ question: question.trim() }),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setInterpretation(data.interpretation);
      toast.success('Reading complete!');
    } catch (error) {
      console.error('Error getting interpretation:', error);
      toast.error('Failed to get interpretation. Please try again.');
    } finally {
      setInterpretationLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      const response = await fetch('/api/session', {
        method: 'DELETE',
        credentials: 'same-origin'
      });

      if (!response.ok) {
        throw new Error('Failed to reset session');
      }

      // Clear frontend state AFTER successful backend reset
      setQuestion('');
      setCards({ past: null, present: null, future: null });
      setInterpretation(null);

      toast.success('Session reset! You can ask a new question.');
    } catch (error) {
      console.error('Error resetting:', error);
      toast.error('Failed to reset session. Please refresh the page.');
    }
  };

  const allCardsDrawn = cards.past && cards.present && cards.future;

  // Animation variants for card flip effect
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // 0.5 second delay between each card
      },
    },
  };

  const cardVariants = {
    hidden: {
      rotateY: 180,
      opacity: 0,
      y: 50,
    },
    visible: {
      rotateY: 0,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number], // Custom cubic bezier easing
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 py-8 px-4">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
            border: '1px solid #4b5563',
          },
          success: {
            iconTheme: {
              primary: '#a78bfa',
              secondary: '#1f2937',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1f2937',
            },
          },
        }}
      />
      {/* Main Container Wrapper */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-8 sm:py-12 lg:px-12 bg-gradient-to-b from-gray-900/80 via-gray-800/60 to-gray-900/80 rounded-2xl sm:rounded-3xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-center">
            {/* Desktop Header */}
            <h1 className="hidden md:block text-5xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-accent via-purple-400 to-highlight bg-clip-text text-transparent">
              Discover Your Path Through Tarot
            </h1>

            {/* Mobile Header */}
            <h1 className="md:hidden text-4xl font-serif font-bold mb-4 bg-gradient-to-r from-accent via-purple-400 to-highlight bg-clip-text text-transparent">
              Your Tarot Reading
            </h1>

            {/* Desktop Subtitle */}
            <p className="hidden md:block text-gray-300 text-xl font-light tracking-wide">
              Discover insights into your <span className="text-highlight font-semibold">past</span>,{' '}
              <span className="text-accent font-semibold">present</span>, and{' '}
              <span className="text-purple-400 font-semibold">future</span>
            </p>

            {/* Mobile Subtitle */}
            <p className="md:hidden text-gray-300 text-base font-light">
              Past · Present · Future
            </p>
          </div>

          {/* Question Input */}
          <QuestionInput
            value={question}
            onChange={setQuestion}
            disabled={!!interpretation}
          />

          {/* Draw Cards Button */}
          {!allCardsDrawn && !interpretation && (
            <div className="text-center">
            <button
              onClick={handleDrawAllCards}
              disabled={!question || drawingCards}
              className="px-8 py-4 sm:px-12 sm:py-5 bg-gradient-to-r from-accent to-purple-600 text-white text-lg sm:text-xl font-semibold rounded-xl hover:from-purple-700 hover:to-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              {drawingCards ? 'Drawing Cards...' : 'Draw 3 Tarot Cards'}
            </button>
            {!question && (
              <p className="text-highlight mt-3 sm:mt-4 font-medium text-sm sm:text-base">
                Please enter a question first
              </p>
            )}
            </div>
          )}

          {/* Card Display */}
          <AnimatePresence>
            {allCardsDrawn && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                variants={cardContainerVariants}
                initial="hidden"
                animate="visible"
                style={{ perspective: 1000 }}
              >
                {/* Past Card */}
                <motion.div
                  className="flex flex-col items-center p-4 sm:p-6 md:p-8 bg-gray-800/60 rounded-xl border-2 border-highlight/40 shadow-lg hover:shadow-xl transition-shadow"
                  variants={cardVariants}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-highlight mb-4 sm:mb-6">Past</h3>
                  <img
                    src={`/cards/${cards.past?.img}`}
                    alt={cards.past?.name || 'Past card'}
                    className={`w-48 sm:w-56 md:w-64 lg:w-72 h-auto rounded-lg shadow-lg mb-3 sm:mb-4 transition-transform ${cards.past?.reversed ? 'rotate-180' : ''}`}
                  />
                  <p className="text-base sm:text-lg font-semibold text-foreground text-center">
                    {cards.past?.name}
                    {cards.past?.reversed && <span className="block sm:inline text-sm text-gray-400 sm:ml-2">(Reversed)</span>}
                  </p>
                </motion.div>

                {/* Present Card */}
                <motion.div
                  className="flex flex-col items-center p-4 sm:p-6 md:p-8 bg-gray-800/60 rounded-xl border-2 border-accent/40 shadow-lg hover:shadow-xl transition-shadow"
                  variants={cardVariants}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-accent mb-4 sm:mb-6">Present</h3>
                  <img
                    src={`/cards/${cards.present?.img}`}
                    alt={cards.present?.name || 'Present card'}
                    className={`w-48 sm:w-56 md:w-64 lg:w-72 h-auto rounded-lg shadow-lg mb-3 sm:mb-4 transition-transform ${cards.present?.reversed ? 'rotate-180' : ''}`}
                  />
                  <p className="text-base sm:text-lg font-semibold text-foreground text-center">
                    {cards.present?.name}
                    {cards.present?.reversed && <span className="block sm:inline text-sm text-gray-400 sm:ml-2">(Reversed)</span>}
                  </p>
                </motion.div>

                {/* Future Card */}
                <motion.div
                  className="flex flex-col items-center p-4 sm:p-6 md:p-8 bg-gray-800/60 rounded-xl border-2 border-purple-400/40 shadow-lg hover:shadow-xl transition-shadow"
                  variants={cardVariants}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-purple-400 mb-4 sm:mb-6">Future</h3>
                  <img
                    src={`/cards/${cards.future?.img}`}
                    alt={cards.future?.name || 'Future card'}
                    className={`w-48 sm:w-56 md:w-64 lg:w-72 h-auto rounded-lg shadow-lg mb-3 sm:mb-4 transition-transform ${cards.future?.reversed ? 'rotate-180' : ''}`}
                  />
                  <p className="text-base sm:text-lg font-semibold text-foreground text-center">
                    {cards.future?.name}
                    {cards.future?.reversed && <span className="block sm:inline text-sm text-gray-400 sm:ml-2">(Reversed)</span>}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interpret Button */}
          {allCardsDrawn && !interpretation && (
            <div className="text-center">
              <button
                onClick={handleInterpret}
                disabled={interpretationLoading}
                className="px-8 py-3 sm:px-10 sm:py-4 bg-accent text-white text-base sm:text-lg font-semibold rounded-xl hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                {interpretationLoading ? 'Interpreting...' : 'Interpret Tarot Cards'}
              </button>
            </div>
          )}

          {/* Interpretation Result */}
          <InterpretationResult
            interpretation={interpretation}
            question={question}
            loading={interpretationLoading}
            onReset={handleReset}
          />

          {/* Footer */}
          <footer className="text-center text-gray-500 text-sm">
            <p>This service provides advertisements through Kakao adfit</p>
            <p className="mt-2">
              <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
              {' | '}
              <a href="/terms" className="hover:text-gray-300">Terms of Service</a>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
