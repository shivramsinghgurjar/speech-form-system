import { useSpeech } from "../hooks/useSpeech";

export default function VoiceInput({ setText }) {
  const { text, startListening } = useSpeech();

  return (
    <div>
      <button onClick={startListening}>🎤 Start Speaking</button>

      <p>{text}</p>

      <button onClick={() => setText(text)}>Use Text</button>
    </div>
  );
}