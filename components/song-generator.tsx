"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { generateSong } from "@/app/actions/generate-song"
import { Loader2, Music } from "lucide-react"

export default function SongGenerator() {
  const [theme, setTheme] = useState("")
  const [language, setLanguage] = useState("English")
  const [artist, setArtist] = useState("")
  const [generatedSong, setGeneratedSong] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")

  const validateInputs = () => {
    if (theme.trim().length < 3) {
      setError("Theme must be at least 3 characters long")
      return false
    }
    if (artist.trim().length < 2) {
      setError("Artist name must be at least 2 characters long")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateInputs()) {
      return
    }

    setIsGenerating(true)

    try {
      const song = await generateSong(theme.trim(), language, artist.trim())
      setGeneratedSong(song)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate song. Please try again."
      setError(errorMessage)
      console.error("Song generation error:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Song Theme</Label>
          <Input
            id="theme"
            placeholder="Enter a theme (e.g., love, adventure, heartbreak)"
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value)
              setError("")
            }}
            required
            minLength={3}
            className={error && error.includes("Theme") ? "border-red-500" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage} required>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="German">German</SelectItem>
              <SelectItem value="Italian">Italian</SelectItem>
              <SelectItem value="Portuguese">Portuguese</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
              <SelectItem value="Korean">Korean</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
              <SelectItem value="Hindi">Hindi</SelectItem>
              <SelectItem value="Arabic">Arabic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="artist">Reference Artist</Label>
          <Input
            id="artist"
            placeholder="Enter an artist (e.g., Taylor Swift, Drake, Bob Dylan)"
            value={artist}
            onChange={(e) => {
              setArtist(e.target.value)
              setError("")
            }}
            required
            minLength={2}
            className={error && error.includes("Artist") ? "border-red-500" : ""}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Song...
            </>
          ) : (
            <>
              <Music className="mr-2 h-4 w-4" />
              Generate Song
            </>
          )}
        </Button>
      </form>

      {error && (
        <div className="text-red-500 text-center p-2 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {generatedSong && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Your Generated Song</h2>
            <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">{generatedSong}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

