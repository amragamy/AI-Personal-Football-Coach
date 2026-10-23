import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import ball from '../../assets/figma-feedback/drill-ball.svg'
import cone from '../../assets/figma-feedback/drill-cone.svg'
import placementLine from '../../assets/figma-feedback/drill-foot-placement-line.svg'
import { supportingFootDrill } from './drillData'
import './DrillDetailOverlay.css'

interface DrillDetailOverlayProps {
  onClose: () => void
}

export default function DrillDetailOverlay({ onClose }: DrillDetailOverlayProps) {
  const dialogRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      if (previouslyFocused?.isConnected) previouslyFocused.focus()
    }
  }, [])

  function handleDialogKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key !== 'Tab' || !dialogRef.current) return
    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      className="drill-overlay-backdrop"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <section
        aria-labelledby="drill-title"
        aria-modal="true"
        className="drill-dialog"
        onKeyDown={handleDialogKeyDown}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className="drill-header">
          <div className="drill-title-block">
            <span className="drill-tag">{supportingFootDrill.skill} · {supportingFootDrill.level}</span>
            <h2 id="drill-title">{supportingFootDrill.title}</h2>
          </div>
          <button ref={closeButtonRef} className="drill-close-button" type="button" onClick={onClose} aria-label="Close drill details">
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="drill-content">
          <div className="drill-illustration" aria-hidden="true">
            <div className="drill-field-boundary" />
            <img className="drill-ball" src={ball} alt="" />
            <img className="drill-cone cone-one" src={cone} alt="" />
            <img className="drill-cone cone-two" src={cone} alt="" />
            <img className="drill-cone cone-three" src={cone} alt="" />
            <img className="drill-cone cone-four" src={cone} alt="" />
            <span className="drill-current-foot" />
            <span className="drill-target-foot" />
            <img className="drill-placement-line" src={placementLine} alt="" />
          </div>

          <section className="drill-copy-section" aria-labelledby="drill-instructions-title">
            <h3 id="drill-instructions-title">Instructions</h3>
            <ol className="drill-instruction-list">
              {supportingFootDrill.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
            </ol>
          </section>

          <section className="drill-copy-section" aria-labelledby="drill-mistakes-title">
            <h3 id="drill-mistakes-title">Common mistakes</h3>
            <ul className="drill-bullet-list is-error">
              {supportingFootDrill.commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
            </ul>
          </section>

          <section className="drill-copy-section" aria-labelledby="drill-tips-title">
            <h3 id="drill-tips-title">Coaching tips</h3>
            <ul className="drill-bullet-list is-positive">
              {supportingFootDrill.coachingTips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </section>

          <div className="drill-recommendation">
            <span>Recommended</span>
            <strong>{supportingFootDrill.recommendation}</strong>
          </div>
        </div>

        <div className="drill-action-area">
          {isCompleted ? <p className="drill-completion-message" role="status" aria-live="polite">Drill marked as completed.</p> : null}
          <button
            className={`drill-complete-button${isCompleted ? ' is-completed' : ''}`}
            type="button"
            aria-pressed={isCompleted}
            onClick={() => setIsCompleted(true)}
          >
            {isCompleted ? <><span aria-hidden="true">✓</span> Completed</> : 'Mark as Completed'}
          </button>
        </div>
      </section>
    </div>
  )
}
