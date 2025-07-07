import { useState } from 'react'
import { Flower, Loader2, Sparkles, Heart, MessageCircle, Copy, Check } from 'lucide-react'
import { Checkbox } from './components/ui/checkbox'

import './App.css'

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
  const [copied, setCopied] = useState(false)

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="app-container">
      {/* Floating decorative elements */}
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>

      <div className="content-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <div className="logo-container">
            <Flower className="logo-icon" />
          </div>
          <h1 className="main-title">Flower Message Generator</h1>
          <p className="subtitle">
            Create heartfelt, personalized messages for your beautiful flower arrangements
          </p>
        </div>

        {/* Main Form Card */}
        <div className="main-card">
          <div className="card-header">
            <div className="card-header-icon">
              <MessageCircle className="button-icon" />
              <h2 className="card-title">Message Details</h2>
            </div>
            <p className="card-description">
              Tell us about the occasion and we'll craft the perfect message
            </p>
          </div>
          
          <div className="card-content">
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-group">
                <label htmlFor="occasion" className="form-label">
                  <Heart className="form-label-icon" />
                  Occasion *
                </label>
                <input
                  id="occasion"
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder="e.g. Birthday, Anniversary, Sympathy, Congratulations"
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="recipient" className="form-label">
                  Recipient *
                </label>
                <input
                  id="recipient"
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Mom, Friend, Colleague, Loved One"
                  required
                  className="form-input"
                />
              </div>
              
              <div className="checkbox-container">
                <Checkbox
                  id="rhyme"
                  checked={rhyme}
                  onCheckedChange={(checked) => setRhyme(checked as boolean)}
                />
                <label htmlFor="rhyme" className="checkbox-label">
                  Make the message rhyme for extra charm ✨
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading || !occasion || !recipient}
                className="submit-button"
              >
                {loading ? (
                  <>
                    <Loader2 className="button-icon spinner" />
                    Crafting your message...
                  </>
                ) : (
                  <>
                    <Sparkles className="button-icon" />
                    Generate Beautiful Message
                  </>
                )}
              </button>
            </form>
            
            {/* Generated Message Section */}
            {message && (
              <div className="message-section">
                <div className="message-header">
                  <h3 className="message-title">
                    <MessageCircle className="button-icon" />
                    Your Personalized Message
                  </h3>
                  <button
                    onClick={copyToClipboard}
                    className="copy-button"
                  >
                    {copied ? (
                      <>
                        <Check style={{ width: '1rem', height: '1rem' }} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy style={{ width: '1rem', height: '1rem' }} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="message-container">
                  <div className="message-content">
                    <p className="message-text">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Error Section */}
            {error && (
              <div className="error-section">
                <div className="error-content">
                  <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="error-text">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>Made with ❤️ for Artsy Flora</p>
        </div>
      </div>
    </div>
  )
}

export default App
