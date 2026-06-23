import Link from "next/link";

export default function ChampionshipMovies({
  movies,
}: {
  movies: any[];
}) {
  return (
    <section
  id="championship"
  className="scroll-mt-24 text-white"
>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">

        <div>
          <p className="text-[#fbbf24] text-sm font-black uppercase tracking-widest">
            🏆 SEASON ONE
          </p>

          <h2 className="text-3xl md:text-4xl font-black uppercase text-white">
            ⚔️ Current Fan Battles
          </h2>

          <p className="text-sm text-neutral-400 mt-2 max-w-md">
            Make your prediction. Earn CinePoints. Climb the rankings.
          </p>
        </div>

      </div>


      {/* Movie Cards */}
      <div
  id="movies"
  className="grid grid-cols-2 md:grid-cols-4 gap-5"
>

        {movies.map((movie) => (
          <div
            key={movie.movie_id}
            className="
              rounded-2xl
              overflow-hidden
              bg-[#120908]
              border border-[#2d1b18]
              hover:border-[#fbbf24]/60
              hover:shadow-[0_0_25px_rgba(251,191,36,0.18)]
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >

            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-52 md:h-60 object-cover"
            />

            <div className="p-3">

              <h3 className="font-black text-lg truncate">
                {movie.title}
              </h3>

              <p className="text-neutral-400 text-sm mt-1">
                {movie.release_date}
              </p>


              <div className="mt-4">

                <Link
                  href={`/movies/${movie.movie_id}`}
                  className="
                    block
                    rounded-xl
                    bg-gradient-to-r
                    from-[#facc15]
                    to-[#f59e0b]
                    py-2.5
                    text-center
                    text-xs
                    font-black
                    uppercase
                    text-black
                    shadow-[0_0_20px_rgba(251,191,36,0.25)]
                    hover:scale-[1.02]
                    transition-all
                  "
                >
                  🎯 Predict Now
                </Link>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}
