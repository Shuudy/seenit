export function ChannelHeaderSkeleton() {
  return (
    <>
      <div className="from-accent/20 to-accent/10 relative z-0 h-40 w-full overflow-hidden bg-gradient-to-r md:h-56">
        <div className="bg-secondary/70 h-full w-full animate-pulse" />
        <div className="to-background/95 absolute inset-0 bg-gradient-to-b from-transparent via-transparent" />
      </div>

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="-mt-12 flex flex-col gap-4 pb-4 md:-mt-16 md:flex-row md:gap-6">
            <div className="relative z-10 flex-shrink-0">
              <div className="border-background bg-secondary/70 h-28 w-28 animate-pulse rounded-full border-4 shadow-lg md:h-40 md:w-40" />
            </div>

            <div className="relative z-10 flex flex-1 flex-col justify-end">
              <div className="mb-1 flex h-8 items-center md:h-9">
                <div className="bg-secondary/60 h-6 w-52 animate-pulse rounded md:h-7 md:w-64" />
              </div>

              <div className="mb-2 flex h-5 items-center">
                <div className="bg-secondary/40 h-3 w-40 animate-pulse rounded" />
              </div>

              <div className="mb-3 flex h-5 items-center gap-4">
                <div className="bg-secondary/60 h-3 w-32 animate-pulse rounded" />
                <div className="bg-secondary/60 h-3 w-28 animate-pulse rounded" />
              </div>

              <div className="mb-3 max-w-3xl">
                <div className="flex h-5 items-center">
                  <div className="bg-secondary/50 h-3 w-11/12 animate-pulse rounded" />
                </div>
                <div className="flex h-5 items-center">
                  <div className="bg-secondary/40 h-3 w-9/12 animate-pulse rounded" />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-secondary/70 h-9 w-[105.58px] animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
