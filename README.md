# AI Song Generator

A Next.js application that generates songs in different languages using AI, powered by the Hugging Face Mistral-7B-Instruct model.

## Features

- Generate songs in multiple languages
- Reference any artist's style
- Custom themes and topics
- Modern, responsive UI
- Real-time validation and error handling

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Hugging Face API
- Shadcn/UI Components

## Prerequisites

- Node.js 18+
- npm or yarn
- Hugging Face API key

## Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd song-generator
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Hugging Face API key:

```
HUGGING_FACE_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a theme for your song
2. Select the desired language
3. Enter a reference artist
4. Click "Generate Song" and wait for the AI to create your custom song

## Environment Variables

- `HUGGING_FACE_API_KEY`: Your Hugging Face API key (required)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
