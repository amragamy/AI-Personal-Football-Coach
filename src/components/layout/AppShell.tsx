import { useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import DashboardScreen from '../../features/dashboard/DashboardScreen'
import VideoUploadScreen from '../../features/video-upload/VideoUploadScreen'
import ComparisonWorkspaceScreen from '../../features/analysis/ComparisonWorkspaceScreen'
import CoachingFeedbackScreen from '../../features/feedback/CoachingFeedbackScreen'
import DrillDetailOverlay from '../../features/training/DrillDetailOverlay'
import aiCoachIcon from '../../assets/figma-shell/ai-coach.svg'
import analyzeVideoIcon from '../../assets/figma-shell/analyze-video.svg'
import avatar from '../../assets/figma-shell/avatar.svg'
import bellIcon from '../../assets/figma-shell/bell.svg'
import myProgressIcon from '../../assets/figma-shell/my-progress.svg'
import profile from '../../assets/figma-shell/profile.svg'
import trainingPlansIcon from '../../assets/figma-shell/training-plans.svg'

const navigation = [
  { id: 'ai-coach', label: 'AI Coach', icon: aiCoachIcon },
  { id: 'analyze-video', label: 'Analyze Video', icon: analyzeVideoIcon },
  { id: 'training-plans', label: 'Training Plans', icon: trainingPlansIcon },
  { id: 'my-progress', label: 'My Progress', icon: myProgressIcon },
] as const

export default function AppShell() {
  const { pathname } = useLocation()
  const [isDrillOpen, setIsDrillOpen] = useState(false)
  const currentDestination = pathname.replace(/^\//, '')
  const currentPage = navigation.find((item) => item.id === currentDestination) ?? navigation[1]
  const isDashboard = currentDestination === 'ai-coach'
  const isVideoUpload = currentDestination === 'analyze-video'
  const isComparison = currentDestination === 'analysis-workspace'
  const isFeedback = currentDestination === 'analysis-feedback'
  const isAnalysisFlow = isComparison || isFeedback
  const activeNavigationDestination = isAnalysisFlow ? 'analyze-video' : currentDestination

  return (
    <>
      <div className={`app-shell${isComparison ? ' is-analysis-workspace' : ''}`}>
      <aside className="sidebar" aria-label="Application sidebar">
        <Link className="brand-row" to="/ai-coach" aria-label="PITCH AI home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">PITCH AI</span>
        </Link>

        <nav className="primary-navigation" aria-label="Core navigation">
          {navigation.map((item) => {
            const isActive = item.id === activeNavigationDestination

            return (
              <Link
                key={item.id}
                className={`navigation-link${isActive ? ' is-active' : ''}`}
                to={`/${item.id}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <img className="navigation-icon" src={item.icon} alt="" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="player-profile">
          <img className="player-avatar" src={avatar} alt="" />
          <div className="player-profile-copy">
            <span className="player-name">Osama Ramadan</span>
            <span className="player-level">Intermediate · Lvl 7</span>
          </div>
        </div>
      </aside>

      <div className="workspace">
        <header className="top-bar">
          <div className="top-bar-title">
            <span className="breadcrumb">
              {isComparison
                ? 'Analyze Video / Shooting Analysis'
                : isFeedback
                ? 'Analyze Video / Feedback'
                : isDashboard
                ? 'AI Coach / Dashboard'
                : isVideoUpload
                  ? 'Analyze Video / Upload'
                  : `AI Coach / ${currentPage.label}`}
            </span>
            <h1>{isComparison ? 'Shooting Analysis' : isFeedback ? 'Coaching Feedback' : currentPage.label}</h1>
          </div>

          <div className="top-bar-actions">
            <span className="notification-display" aria-hidden="true">
              <img src={bellIcon} alt="" />
            </span>
            <span className="account-display" aria-hidden="true">
              <img src={profile} alt="" />
            </span>
            {isFeedback ? (
              <button className="analyze-cta feedback-header-action" type="button" onClick={() => setIsDrillOpen(true)}>
                Practice This Correction
              </button>
            ) : isComparison ? (
              <Link className="analyze-cta comparison-header-feedback" to="/analysis-feedback">
                View Coaching Feedback
              </Link>
            ) : (
              <Link className="analyze-cta" to="/analyze-video">Analyze Video</Link>
            )}
          </div>
        </header>

        <main className="workspace-content" aria-label={`${isComparison ? 'Shooting Analysis' : isFeedback ? 'Coaching Feedback' : currentPage.label} workspace`}>
          {isVideoUpload || isAnalysisFlow ? <div hidden={!isVideoUpload}><VideoUploadScreen /></div> : null}
          <Routes>
            <Route path="/" element={<Navigate to="/ai-coach" replace />} />
            <Route path="/ai-coach" element={<DashboardScreen onOpenDrill={() => setIsDrillOpen(true)} />} />
            <Route path="/analyze-video" element={null} />
            <Route path="/analysis-workspace" element={<ComparisonWorkspaceScreen />} />
            <Route path="/analysis-feedback" element={<CoachingFeedbackScreen onOpenDrill={() => setIsDrillOpen(true)} />} />
            <Route path="/training-plans" element={null} />
            <Route path="/my-progress" element={null} />
            <Route path="*" element={<Navigate to="/ai-coach" replace />} />
          </Routes>
        </main>
      </div>
      </div>
      {isDrillOpen ? <DrillDetailOverlay onClose={() => setIsDrillOpen(false)} /> : null}
    </>
  )
}
