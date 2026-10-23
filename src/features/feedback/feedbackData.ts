export interface FeedbackMetric {
  id: string
  label: string
  score: number
  priority?: boolean
  icon: string
}

export interface FeedbackCardData {
  id: string
  title: string
  message: string
  icon: string
  iconTone: 'positive' | 'priority' | 'neutral'
  tags: string[]
}

export const feedbackDisclaimer = 'Illustrative mock data · unrelated to your uploaded video.'

export const feedbackSummary = {
  score: 78,
  headline: '78 / 100 — a solid base with one clear fix',
  description: 'Your balance and alignment are good. Work on where your supporting foot lands and your shot will feel more consistent.',
  bodyHighlight: 'Supporting foot · Torso',
} as const

export const feedbackMetrics: readonly FeedbackMetric[] = [
  { id: 'body-alignment', label: 'Body alignment', score: 82, icon: 'metric-body-alignment.svg' },
  { id: 'supporting-foot', label: 'Support foot', score: 64, priority: true, icon: 'metric-supporting-foot.svg' },
  { id: 'hip-rotation', label: 'Hip rotation', score: 74, icon: 'metric-hip-rotation.svg' },
  { id: 'knee-angle', label: 'Knee angle', score: 70, icon: 'metric-knee-angle.svg' },
  { id: 'arm-balance', label: 'Arm balance', score: 80, icon: 'metric-arm-balance.svg' },
  { id: 'follow-through', label: 'Follow-through', score: 75, icon: 'metric-follow-through.svg' },
]

export const coachingFeedback: readonly FeedbackCardData[] = [
  {
    id: 'doing-well',
    title: 'Doing well',
    message: 'Your upper-body balance remains relatively stable during the approach.',
    icon: 'feedback-icon-doing-well.svg',
    iconTone: 'positive',
    tags: ['Severity: Low', 'Torso'],
  },
  {
    id: 'needs-improvement',
    title: 'Needs improvement',
    message: 'Your supporting foot appears too far from the ball in this example.',
    icon: 'feedback-icon-needs-improvement.svg',
    iconTone: 'priority',
    tags: ['Severity: High', 'Supporting foot'],
  },
  {
    id: 'how-to-improve',
    title: 'How to improve',
    message: 'Practice placing your supporting foot beside the ball while maintaining balance and directing your toes toward the intended target.',
    icon: 'feedback-icon-how-to-improve.svg',
    iconTone: 'neutral',
    tags: ['Actionable', 'Drill: 10 min'],
  },
]
