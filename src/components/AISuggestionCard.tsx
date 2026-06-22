interface Props {
  suggestion: string;
  bestTime: string;
}

export default function AISuggestionCard({ suggestion, bestTime }: Props) {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl">
      <h2 className="text-lg font-bold mb-3">🤖 AI Suggestion</h2>
      <p className="text-white/90 leading-relaxed">{suggestion}</p>
      <div className="mt-4 bg-white/20 rounded-2xl p-3">
        <p className="text-sm text-white/80">⏰ Best time to go outside</p>
        <p className="font-semibold">{bestTime}</p>
      </div>
    </div>
  );
}