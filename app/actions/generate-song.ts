"use server"

export async function generateSong(theme: string, language: string, artist: string): Promise<string> {
  const API_KEY = process.env.HUGGING_FACE_API_KEY

  // Input validation
  if (!theme || theme.trim().length < 3) {
    throw new Error("Theme must be at least 3 characters long")
  }

  if (!artist || artist.trim().length < 2) {
    throw new Error("Artist name must be at least 2 characters long")
  }

  if (!API_KEY) {
    throw new Error("API key is not configured. Please check your environment variables.")
  }

  try {
    // Using the Hugging Face Inference API with a text generation model
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        inputs: `<s>[INST] Write a song in the style of ${artist} about ${theme} in ${language} language. Include verses, chorus, and a bridge. Make it sound authentic to the artist's style. [/INST]`,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("API Error:", errorData)
      
      if (response.status === 429) {
        throw new Error("Too many requests. Please try again in a few moments.")
      } else if (response.status === 401) {
        throw new Error("Invalid API key. Please check your configuration.")
      } else {
        throw new Error(`API request failed: ${response.statusText}`)
      }
    }

    const result = await response.json()

    if (!Array.isArray(result) || result.length === 0 || !result[0].generated_text) {
      console.error("Unexpected API response:", result)
      throw new Error("Received invalid response from the API")
    }

    let generatedText = result[0].generated_text

    // Clean up the response to extract just the song
    const promptEnd = generatedText.indexOf("[/INST]")
    if (promptEnd !== -1) {
      generatedText = generatedText.substring(promptEnd + 7).trim()
    }

    if (!generatedText) {
      throw new Error("Generated song is empty. Please try again.")
    }

    return generatedText
  } catch (error) {
    console.error("Error generating song:", error)
    
    if (error instanceof Error) {
      throw error // Re-throw the error with its original message
    }
    
    throw new Error("An unexpected error occurred while generating the song")
  }
}

