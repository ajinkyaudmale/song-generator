import SongGenerator from "@/components/song-generator"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">AI Song Generator</h1>
        <SongGenerator />
      </div>
    </main>
  )
}

