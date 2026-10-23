import bodyFigure from '../../assets/figma-feedback/feedback-body-figure.svg'
import scoreRingBase from '../../assets/figma-feedback/feedback-score-ring-base.svg'
import scoreRingProgress from '../../assets/figma-feedback/feedback-score-ring-progress.svg'
import armBalanceIcon from '../../assets/figma-feedback/metric-arm-balance.svg'
import bodyAlignmentIcon from '../../assets/figma-feedback/metric-body-alignment.svg'
import followThroughIcon from '../../assets/figma-feedback/metric-follow-through.svg'
import hipRotationIcon from '../../assets/figma-feedback/metric-hip-rotation.svg'
import kneeAngleIcon from '../../assets/figma-feedback/metric-knee-angle.svg'
import supportingFootIcon from '../../assets/figma-feedback/metric-supporting-foot.svg'
import doingWellIcon from '../../assets/figma-feedback/feedback-icon-doing-well.svg'
import needsImprovementIcon from '../../assets/figma-feedback/feedback-icon-needs-improvement.svg'
import howToImproveIcon from '../../assets/figma-feedback/feedback-icon-how-to-improve.svg'
import { coachingFeedback, feedbackDisclaimer, feedbackMetrics, feedbackSummary } from './feedbackData'
import './CoachingFeedbackScreen.css'

const metricIcons: Record<string, string> = {
  'metric-body-alignment.svg': bodyAlignmentIcon,
  'metric-supporting-foot.svg': supportingFootIcon,
  'metric-hip-rotation.svg': hipRotationIcon,
  'metric-knee-angle.svg': kneeAngleIcon,
  'metric-arm-balance.svg': armBalanceIcon,
  'metric-follow-through.svg': followThroughIcon,
}

const cardIcons: Record<string, string> = {
  'feedback-icon-doing-well.svg': doingWellIcon,
  'feedback-icon-needs-improvement.svg': needsImprovementIcon,
  'feedback-icon-how-to-improve.svg': howToImproveIcon,
}

interface CoachingFeedbackScreenProps {
  onOpenDrill: () => void
}

export default function CoachingFeedbackScreen({ onOpenDrill }: CoachingFeedbackScreenProps) {
  return (
    <div className="feedback-screen">
      <section className="feedback-overview-row" aria-label="Illustrative technique overview">
        <article className="feedback-score-card">
          <div className="feedback-score-ring" aria-label={`Illustrative score ${feedbackSummary.score} out of 100`} role="img">
            <img src={scoreRingBase} alt="" />
            <img src={scoreRingProgress} alt="" />
            <span>{feedbackSummary.score}</span>
          </div>
          <div className="feedback-score-copy">
            <span className="feedback-score-label">Overall technique score</span>
            <strong>{feedbackSummary.headline}</strong>
            <p>{feedbackSummary.description}</p>
            <span className="feedback-source-note" role="note">{feedbackDisclaimer}</span>
          </div>
        </article>
        <article className="feedback-body-card" aria-label="Illustrative areas of focus">
          <img src={bodyFigure} alt="" />
          <span>{feedbackSummary.bodyHighlight}</span>
        </article>
      </section>

      <section className="feedback-section" aria-labelledby="feedback-breakdown-title">
        <h2 id="feedback-breakdown-title">Movement breakdown</h2>
        <div className="feedback-metric-grid">
          {feedbackMetrics.map((metric) => (
            <article className={`feedback-metric-card${metric.priority ? ' is-priority' : ''}`} key={metric.id}>
              <div className="feedback-metric-label">
                <img src={metricIcons[metric.icon]} alt="" />
                <span>{metric.label}</span>
                {metric.priority ? <span className="feedback-priority-badge">Priority</span> : null}
              </div>
              <div className="feedback-metric-value"><strong>{metric.score}</strong><span>/100</span></div>
              <div
                className="feedback-metric-track"
                role="meter"
                aria-label={`${metric.label}, illustrative score`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={metric.score}
                aria-valuetext={`${metric.score} out of 100, illustrative mock data`}
              >
                <span style={{ width: `${metric.score}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="feedback-section" aria-labelledby="feedback-cards-title">
        <h2 id="feedback-cards-title">Your Coach’s Feedback</h2>
        <div className="feedback-card-grid">
          {coachingFeedback.map((item) => (
            <article className="feedback-card-column" key={item.id}>
              <div className="feedback-card">
                <span className={`feedback-card-icon is-${item.iconTone}`} aria-hidden="true">
                  <img src={cardIcons[item.icon]} alt="" />
                </span>
                <div className="feedback-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.message}</p>
                </div>
              </div>
              <div className="feedback-card-tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
        <button className="feedback-practice-button" type="button" onClick={onOpenDrill}>
          Practice This Correction
        </button>
      </section>
    </div>
  )
}
