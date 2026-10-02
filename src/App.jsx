import { Plus } from "lucide-react"
import Button from "./components/ui/Button"

function App() {
  return (
    <main className="mx-auto max-w-296 px-4 py-10 sm:px-12">
      <h1 className="font-display text-display-mobile sm:text-display">
        Popcorn Diary<span className="text-lime">.</span>
      </h1>
      <Button icon={Plus}>Añadir</Button>
    </main>
  )
}

export default App
