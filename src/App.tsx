import { useState } from 'react'
import { Flower, Loader2, Sparkles } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Checkbox } from './components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'

interface GenerateMessageRequest {
  occasion: string
  recipient?: string
  rhyme: boolean
}

interface GenerateMessageResponse {
  message: string
}

function App() {
  const [occasion, setOccasion] = useState('')
  const [recipient, setRecipient] = useState('')
  const [rhyme, setRhyme] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      const requestBody: GenerateMessageRequest = {
        occasion,
        recipient: recipient || undefined,
        rhyme,
      }
      
      const res = await fetch('/api/generate-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      const data: GenerateMessageResponse = await res.json()
      setMessage(data.message)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(`Error: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-4">
      <div className="mx-auto max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
              <Flower className="h-8 w-8 text-violet-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Flower Message Generator
            </CardTitle>
            <CardDescription className="text-gray-600">
              Create personalized messages for your flower arrangements
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="occasion" className="text-sm font-medium text-gray-700">
                  Occasion *
                </Label>
                <Input
                  id="occasion"
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder="e.g. Birthday, Anniversary, Sympathy"
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipient" className="text-sm font-medium text-gray-700">
                  Recipient <span className="text-gray-500">(optional)</span>
                </Label>
                <Input
                  id="recipient"
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Mom, Friend, Colleague"
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rhyme"
                  checked={rhyme}
                  onCheckedChange={(checked) => setRhyme(checked as boolean)}
                />
                <Label htmlFor="rhyme" className="text-sm font-medium text-gray-700">
                  Make the message a rhyme
                </Label>
              </div>
              
              <Button
                type="submit"
                disabled={loading || !occasion}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Message
                  </>
                )}
              </Button>
            </form>
            
            {message && (
              <div className="mt-6 rounded-lg bg-violet-50 p-4">
                <h3 className="mb-2 text-lg font-semibold text-violet-900">
                  Suggested Message:
                </h3>
                <div className="rounded-md bg-white p-3 text-gray-800 shadow-sm">
                  <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">
                    {message}
                  </pre>
                </div>
              </div>
            )}
            
            {error && (
              <div className="mt-6 rounded-lg bg-red-50 p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
