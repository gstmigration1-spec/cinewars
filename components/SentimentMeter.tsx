export default function SentimentMeter({ score }: { score: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-black uppercase tracking-wider mb-2">
        <span className="text-brand-orange flex items-center gap-1">🔥 Bullish Hype ({score}%)</span>
        <span className="text-neutral-500">Bear Drop ({100 - score}%)</span>
      </div>
      <div className="h-3 w-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-800 p-[2px]">
        <div 
          className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-1000 ease-out"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}