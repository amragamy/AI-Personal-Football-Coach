import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  dashboardMetrics,
  heroIllustration,
  recommendation,
  skills,
  skillRings,
  type SkillId,
  weeklyStreak,
} from './dashboardData'
import './DashboardScreen.css'

interface DashboardScreenProps {
  onOpenDrill: () => void
}

export default function DashboardScreen({ onOpenDrill }: DashboardScreenProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillId>('shooting')

  return (
    <div className="dashboard-screen">
      <section className="dashboard-hero" aria-labelledby="dashboard-hero-title">
        <div className="dashboard-hero-copy">
          <h2 id="dashboard-hero-title">Ready to level up your game?</h2>
          <p className="dashboard-hero-description">
            Your personal AI coach helps you understand your technique, improve your weaknesses, and train with purpose.
          </p>
          <div className="dashboard-hero-actions">
            <Link className="dashboard-button dashboard-button-primary" to="/analyze-video">
              Analyze My Technique
            </Link>
            <Link className="dashboard-button dashboard-button-secondary" to="/training-plans">
              View Training Plan
            </Link>
          </div>
          <div
            className="dashboard-streak"
            aria-label={`${weeklyStreak.count}-day streak this week`}
          >
            <img className="dashboard-streak-icon" src={weeklyStreak.icon} alt="" />
            <span className="dashboard-streak-count">{weeklyStreak.count}-day streak</span>
            <ol className="dashboard-streak-days" aria-label="Training days this week">
              {weeklyStreak.days.map((day) => (
                <li key={day.label}>
                  <span
                    className={`dashboard-streak-day is-${day.state}`}
                    aria-label={`${day.label}: ${day.state}`}
                    title={`${day.label}: ${day.state}`}
                  >
                    {day.initial}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="dashboard-hero-visual" aria-hidden="true">
          <div className="dashboard-hero-field" />
          <img className="dashboard-hero-circle" src={heroIllustration.fieldCircle} alt="" />
          <img className="dashboard-hero-ball" src={heroIllustration.ballMarker} alt="" />
        </div>
      </section>

      <section className="dashboard-section" aria-labelledby="dashboard-skills-heading">
        <h2 className="dashboard-section-heading" id="dashboard-skills-heading">
          Choose Your Skill
        </h2>
        <div className="dashboard-skill-grid">
          {skills.map((skill) => {
            const isSelected = selectedSkill === skill.id

            return (
              <button
                className={`dashboard-skill-card${isSelected ? ' is-selected' : ''}`}
                key={skill.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedSkill(skill.id)}
              >
                <span className="dashboard-skill-art" aria-hidden="true">
                  <img
                    className="dashboard-skill-ring"
                    src={isSelected ? skillRings.selected : skillRings.default}
                    alt=""
                  />
                  <img className="dashboard-skill-icon" src={skill.icon} alt="" />
                </span>
                <span className="dashboard-skill-copy">
                  <span className="dashboard-skill-name">{skill.name}</span>
                  <span className="dashboard-skill-description">{skill.description}</span>
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section
        className="dashboard-section"
        aria-labelledby="dashboard-performance-heading"
        aria-label="Illustrative Shooting metrics"
      >
        <div className="dashboard-section-heading-row">
          <h2 className="dashboard-section-heading" id="dashboard-performance-heading">
            Performance overview
          </h2>
          <span className="dashboard-data-badge">Shooting metrics · Illustrative prototype data</span>
        </div>
        <div className="dashboard-metric-grid">
          {dashboardMetrics.map((metric) => (
            <article
              className={`dashboard-metric-card${metric.priority ? ' is-priority' : ''}`}
              key={metric.id}
            >
              <div className="dashboard-metric-top">
                <div className="dashboard-metric-label">
                  <img src={metric.icon} alt="" />
                  <span>{metric.label}</span>
                </div>
                {metric.priority ? <span className="dashboard-priority-badge">Priority</span> : null}
              </div>
              <div className="dashboard-metric-value">
                <span>{metric.value}</span>
                <span className="dashboard-metric-unit">/100</span>
              </div>
              <div
                className="dashboard-metric-track"
                role="meter"
                aria-label={`${metric.label}, illustrative Shooting score`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={metric.value}
                aria-valuetext={`${metric.value} out of 100, illustrative Shooting score`}
              >
                <span className="dashboard-metric-fill" style={{ width: `${metric.fillWidth}px` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-recommendation" aria-labelledby="dashboard-recommendation-title">
        <div className="dashboard-recommendation-copy">
          <span className="dashboard-recommendation-tag">
            <img src={recommendation.icon} alt="" />
            Coach's recommendation · Shooting
          </span>
          <h2 id="dashboard-recommendation-title">{recommendation.title}</h2>
          <p>{recommendation.description}</p>
        </div>
        <div className="dashboard-drill-action">
          <button
            className="dashboard-button dashboard-button-drill"
            type="button"
            onClick={onOpenDrill}
          >
            Start Recommended Drill
          </button>
        </div>
      </section>
    </div>
  )
}
