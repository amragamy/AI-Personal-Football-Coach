import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import desktopYourBodyMass from '../../assets/figma-analysis/desktop-your-body-mass.svg'
import desktopYourBones from '../../assets/figma-analysis/desktop-your-bones.svg'
import desktopYourLeg from '../../assets/figma-analysis/desktop-your-supporting-leg.svg'
import desktopYourHead from '../../assets/figma-analysis/desktop-your-head.svg'
import desktopYourJoint from '../../assets/figma-analysis/desktop-your-joint.svg'
import desktopYourBall from '../../assets/figma-analysis/desktop-your-ball.svg'
import desktopYourDistanceLine from '../../assets/figma-analysis/desktop-your-distance-line.svg'
import desktopReferenceBodyMass from '../../assets/figma-analysis/desktop-ref-body-mass.svg'
import desktopReferenceBones from '../../assets/figma-analysis/desktop-ref-bones.svg'
import desktopReferenceLeg from '../../assets/figma-analysis/desktop-ref-supporting-leg.svg'
import desktopReferenceHead from '../../assets/figma-analysis/desktop-ref-head.svg'
import desktopReferenceJoint from '../../assets/figma-analysis/desktop-ref-joint.svg'
import desktopReferenceBall from '../../assets/figma-analysis/desktop-ref-ball.svg'
import desktopReferenceDistanceLine from '../../assets/figma-analysis/desktop-ref-distance-line.svg'
import mobileYourBodyMass from '../../assets/figma-analysis/mobile-your-body-mass.svg'
import mobileYourBones from '../../assets/figma-analysis/mobile-your-bones.svg'
import mobileYourLeg from '../../assets/figma-analysis/mobile-your-supporting-leg.svg'
import mobileYourHead from '../../assets/figma-analysis/mobile-your-head.svg'
import mobileYourJoint from '../../assets/figma-analysis/mobile-your-joint.svg'
import mobileYourBall from '../../assets/figma-analysis/mobile-your-ball.svg'
import mobileYourDistanceLine from '../../assets/figma-analysis/mobile-your-distance-line.svg'
import mobileReferenceBodyMass from '../../assets/figma-analysis/mobile-ref-body-mass.svg'
import mobileReferenceBones from '../../assets/figma-analysis/mobile-ref-bones.svg'
import mobileReferenceLeg from '../../assets/figma-analysis/mobile-ref-supporting-leg.svg'
import mobileReferenceHead from '../../assets/figma-analysis/mobile-ref-head.svg'
import mobileReferenceJoint from '../../assets/figma-analysis/mobile-ref-joint.svg'
import mobileReferenceBall from '../../assets/figma-analysis/mobile-ref-ball.svg'
import mobileReferenceDistanceLine from '../../assets/figma-analysis/mobile-ref-distance-line.svg'
import playIcon from '../../assets/figma-analysis/control-play.svg'
import stepBackIcon from '../../assets/figma-analysis/control-step-back.svg'
import stepForwardIcon from '../../assets/figma-analysis/control-step-forward.svg'
import scrubberThumb from '../../assets/figma-analysis/control-scrubber-thumb.svg'
import demoIndicator from '../../assets/figma-analysis/control-demo-indicator.svg'
import { shootingComparison } from './analysisData'
import './ComparisonWorkspaceScreen.css'

type Technique = 'your' | 'reference'

const desktopJointPositions = [
  [231.5, 125.5], [225.5, 248.5], [235.5, 139.5], [278.5, 188.5],
  [313.5, 215.5], [188.5, 183.5], [153.5, 221.5], [258.5, 328.5],
  [248.5, 413.5], [188.5, 328.5], [133.5, 365.5],
] as const
const desktopReferenceJointPositions = [
  [245.5, 125.5], [237.5, 243.5], [249.5, 139.5], [293.5, 183.5],
  [333.5, 198.5], [203.5, 178.5], [173.5, 208.5], [293.5, 328.5],
  [315.5, 413.5], [198.5, 323.5], [143.5, 355.5],
] as const
const mobileJointPositions = [
  [152.02, 82.26], [148.07, 163.21], [154.65, 91.47], [182.95, 123.72],
  [205.98, 141.49], [123.72, 120.43], [100.69, 145.44], [169.79, 215.85],
  [163.21, 271.79], [123.72, 215.85], [87.53, 240.2],
] as const
const mobileReferenceJointPositions = [
  [161.23, 82.26], [155.97, 159.92], [163.86, 91.47], [192.82, 120.43],
  [219.14, 130.3], [133.59, 117.14], [113.85, 136.88], [192.82, 215.85],
  [207.3, 271.79], [130.3, 212.56], [94.11, 233.62],
] as const

function PoseArtwork({ technique, mobile = false, scale = 1 }: { technique: Technique; mobile?: boolean; scale?: number }) {
  const isReference = technique === 'reference'
  const body = mobile
    ? isReference ? mobileReferenceBodyMass : mobileYourBodyMass
    : isReference ? desktopReferenceBodyMass : desktopYourBodyMass
  const bones = mobile
    ? isReference ? mobileReferenceBones : mobileYourBones
    : isReference ? desktopReferenceBones : desktopYourBones
  const leg = mobile
    ? isReference ? mobileReferenceLeg : mobileYourLeg
    : isReference ? desktopReferenceLeg : desktopYourLeg
  const head = mobile
    ? isReference ? mobileReferenceHead : mobileYourHead
    : isReference ? desktopReferenceHead : desktopYourHead
  const joint = mobile
    ? isReference ? mobileReferenceJoint : mobileYourJoint
    : isReference ? desktopReferenceJoint : desktopYourJoint
  const ball = mobile
    ? isReference ? mobileReferenceBall : mobileYourBall
    : isReference ? desktopReferenceBall : desktopYourBall
  const distance = mobile
    ? isReference ? mobileReferenceDistanceLine : mobileYourDistanceLine
    : isReference ? desktopReferenceDistanceLine : desktopYourDistanceLine
  const jointPositions = mobile
    ? isReference ? mobileReferenceJointPositions : mobileJointPositions
    : isReference ? desktopReferenceJointPositions : desktopJointPositions

  return (
    <div className={`pose-artboard ${mobile ? 'is-mobile-art' : 'is-desktop-art'}`} style={{ transform: `scale(${scale})` }} aria-hidden="true">
      {mobile ? (
        <>
          <img className="pose-image mobile-body-mass" src={body} alt="" />
          <img className="pose-image mobile-bones" src={bones} alt="" />
          <img className="pose-image mobile-supporting-leg" src={leg} alt="" />
          <img className="pose-image mobile-head" src={head} alt="" />
          {jointPositions.map(([left, top], index) => (
            <img className="pose-image mobile-joint" style={{ left, top }} src={joint} alt="" key={index} />
          ))}
          <img className="pose-image mobile-ball" src={ball} alt="" />
          <img className="pose-image mobile-distance-line" src={distance} alt="" />
        </>
      ) : (
        <>
          <img className="pose-image desktop-body-mass" src={body} alt="" />
          <img className="pose-image desktop-bones" src={bones} alt="" />
          <img className="pose-image desktop-supporting-leg" src={leg} alt="" />
          <img className="pose-image desktop-head" src={head} alt="" />
          {jointPositions.map(([left, top], index) => (
            <img className="pose-image desktop-joint" style={{ left, top }} src={joint} alt="" key={index} />
          ))}
          <img className="pose-image desktop-ball" src={ball} alt="" />
          <img className="pose-image desktop-distance-line" src={distance} alt="" />
        </>
      )}
    </div>
  )
}

function PosePanel({ technique }: { technique: Technique }) {
  const [desktopScale, setDesktopScale] = useState(1)
  const [mobileScale, setMobileScale] = useState(1)
  const desktopRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const isReference = technique === 'reference'
  const label = isReference ? 'REFERENCE TECHNIQUE' : 'YOUR TECHNIQUE'
  const angle = isReference
    ? shootingComparison.referenceTechnique.kneeAngle
    : shootingComparison.yourTechnique.kneeAngle
  const distance = isReference
    ? shootingComparison.referenceTechnique.supportingFootDistance
    : shootingComparison.yourTechnique.supportingFootDistance

  useEffect(() => {
    const observeScale = (element: HTMLDivElement | null, width: number, update: (value: number) => void) => {
      if (!element) return () => undefined
      const observer = new ResizeObserver(([entry]) => {
        if (entry.contentRect.width > 0) update(Math.min(entry.contentRect.width / width, 1))
      })
      observer.observe(element)
      return () => observer.disconnect()
    }
    const stopDesktop = observeScale(desktopRef.current, 548, setDesktopScale)
    const stopMobile = observeScale(mobileRef.current, 358, setMobileScale)
    return () => { stopDesktop(); stopMobile() }
  }, [])

  return (
    <section className={`comparison-pose-panel ${isReference ? 'is-reference' : 'is-your-technique'}`} aria-label={label}>
      <div className="pose-canvas desktop-pose-canvas" ref={desktopRef}>
        <div className="pose-ground" />
        <div className="pose-ground-line" />
        <PoseArtwork technique={technique} scale={desktopScale} />
        <span className="pose-panel-label"><span aria-hidden="true" />{label}</span>
        <span className="pose-angle-label">{angle}</span>
        <span className="pose-distance-label">{distance}</span>
      </div>
      <div className="pose-canvas mobile-pose-canvas" ref={mobileRef}>
        <div className="pose-ground-line" />
        <PoseArtwork technique={technique} mobile scale={mobileScale} />
        <span className="pose-panel-label"><span aria-hidden="true" />{label}</span>
        <span className="pose-distance-label">{distance}</span>
      </div>
      <span className="sr-only">Illustrative Shooting pose artwork. This is not from the uploaded video.</span>
    </section>
  )
}

function formatTime(seconds: number) {
  return `00:${seconds.toFixed(1).padStart(4, '0')}`
}

export default function ComparisonWorkspaceScreen() {
  const [time, setTime] = useState<number>(shootingComparison.initialTimeSeconds)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying) return
    const timer = window.setInterval(() => {
      setTime((current) => {
        return Math.min(shootingComparison.durationSeconds, Math.round((current + 0.1) * 10) / 10)
      })
    }, 100)
    return () => window.clearInterval(timer)
  }, [isPlaying])

  useEffect(() => {
    if (time >= shootingComparison.durationSeconds) {
      setIsPlaying(false)
    }
  }, [time])

  function stepTime(amount: number) {
    setIsPlaying(false)
    setTime((current) => Math.min(shootingComparison.durationSeconds, Math.max(0, Math.round((current + amount) * 10) / 10)))
  }

  return (
    <div className="comparison-screen">
      <header className="comparison-mobile-appbar">
        <Link to="/analyze-video" className="comparison-back-link" aria-label="Back to video upload">‹</Link>
        <div><strong>Shooting Analysis</strong><span>Sample data</span></div>
        <span className="comparison-mobile-avatar" aria-hidden="true" />
      </header>

      <div className="comparison-content">
        <div className="comparison-heading-row">
          <nav className="comparison-tabs" aria-label="Analysis sections">
            <Link to="/analysis-workspace" className="comparison-tab is-active" aria-current="page">Comparison</Link>
            <Link to="/analysis-feedback" className="comparison-tab">Feedback</Link>
          </nav>
          <div className="comparison-tags">
            <span>Frame: {shootingComparison.frame}</span>
            <span>Illustrative prototype data</span>
          </div>
        </div>
        <p className="comparison-disclaimer" id="comparison-disclaimer">{shootingComparison.disclaimer}</p>
        <div className="comparison-pose-grid">
          <PosePanel technique="your" />
          <PosePanel technique="reference" />
        </div>
        <section className="comparison-playback" aria-label="Illustrative demo timeline controls">
          <div className="comparison-playback-buttons">
            <button className="comparison-control comparison-play-control" type="button" onClick={() => { if (!isPlaying && time >= shootingComparison.durationSeconds) setTime(0); setIsPlaying((playing) => !playing) }} aria-label={isPlaying ? 'Pause demo timeline' : 'Play demo timeline'}>
              {isPlaying ? <span aria-hidden="true">Ⅱ</span> : <img src={playIcon} alt="" />}
            </button>
            <button className="comparison-control" type="button" onClick={() => stepTime(-0.1)} aria-label="Move demo timeline back 0.1 seconds"><img src={stepBackIcon} alt="" /></button>
            <button className="comparison-control" type="button" onClick={() => stepTime(0.1)} aria-label="Move demo timeline forward 0.1 seconds"><img src={stepForwardIcon} alt="" /></button>
          </div>
          <label className="comparison-time" htmlFor="comparison-timeline">{formatTime(time)} / 00:08.0</label>
          <input id="comparison-timeline" className="comparison-timeline" style={{ '--timeline-thumb': `url(${scrubberThumb})`, '--timeline-progress': `${(time / shootingComparison.durationSeconds) * 100}%` } as CSSProperties} type="range" min="0" max={shootingComparison.durationSeconds} step="0.1" value={time} onChange={(event) => { setIsPlaying(false); setTime(Number(event.target.value)) }} aria-label="Demo timeline position" />
          <label className="comparison-time comparison-mobile-time" htmlFor="comparison-timeline">{time.toFixed(1)}s</label>
          <div className="comparison-mobile-time-controls">
            <button type="button" onClick={() => stepTime(-0.1)} aria-label="Move demo timeline back 0.1 seconds">‹</button>
            <button type="button" onClick={() => stepTime(0.1)} aria-label="Move demo timeline forward 0.1 seconds">›</button>
          </div>
          <span className="comparison-demo-indicator"><img src={demoIndicator} alt="" />Demo timeline</span>
        </section>
        <div className="comparison-summary">
          <article><span>Your supporting foot</span><strong className="your-supporting-strong">{shootingComparison.yourTechnique.summary}</strong></article>
          <article><span>Reference</span><strong className="reference-strong">{shootingComparison.referenceTechnique.summary}</strong></article>
          <article className="coaching-priority-article"><span>Coaching priority</span><strong>{shootingComparison.coachingPriority}</strong></article>
        </div>
        <p className="comparison-context-note">{shootingComparison.contextNote}</p>
        <Link className="comparison-feedback-cta" to="/analysis-feedback">View Coaching Feedback</Link>
      </div>
    </div>
  )
}
