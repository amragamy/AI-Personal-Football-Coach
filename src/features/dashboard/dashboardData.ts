import heroBallMarker from '../../assets/figma-dashboard/hero-ball-marker.svg'
import heroFieldCircle from '../../assets/figma-dashboard/hero-field-circle.svg'
import metricBodyAlignment from '../../assets/figma-dashboard/metric-body-alignment.svg'
import metricFollowThrough from '../../assets/figma-dashboard/metric-follow-through.svg'
import metricShootingTechnique from '../../assets/figma-dashboard/metric-shooting-technique.svg'
import metricSupportingFoot from '../../assets/figma-dashboard/metric-supporting-foot.svg'
import recommendationZap from '../../assets/figma-dashboard/recommendation-zap.svg'
import skillBallControl from '../../assets/figma-dashboard/skill-ball-control.svg'
import skillDefending from '../../assets/figma-dashboard/skill-defending.svg'
import skillPassing from '../../assets/figma-dashboard/skill-passing.svg'
import skillRingDefault from '../../assets/figma-dashboard/skill-ring-default.svg'
import skillRingSelected from '../../assets/figma-dashboard/skill-ring-selected.svg'
import skillShooting from '../../assets/figma-dashboard/skill-shooting.svg'
import streakFlame from '../../assets/figma-dashboard/streak-flame.svg'

export type SkillId = 'shooting' | 'passing' | 'defending' | 'ball-control'

export const skills: ReadonlyArray<{
  id: SkillId
  name: string
  description: string
  icon: string
}> = [
  {
    id: 'shooting',
    name: 'Shooting',
    description: 'Strike mechanics and balance',
    icon: skillShooting,
  },
  {
    id: 'passing',
    name: 'Passing',
    description: 'Accuracy and weight of pass',
    icon: skillPassing,
  },
  {
    id: 'defending',
    name: 'Defending',
    description: 'Stance and body position',
    icon: skillDefending,
  },
  {
    id: 'ball-control',
    name: 'Ball Control',
    description: 'First touch and close control',
    icon: skillBallControl,
  },
]

export const skillRings = {
  default: skillRingDefault,
  selected: skillRingSelected,
}

export const weeklyStreak = {
  count: 4,
  icon: streakFlame,
  days: [
    { label: 'Monday', initial: 'M', state: 'complete' },
    { label: 'Tuesday', initial: 'T', state: 'complete' },
    { label: 'Wednesday', initial: 'W', state: 'complete' },
    { label: 'Thursday', initial: 'T', state: 'complete' },
    { label: 'Friday', initial: 'F', state: 'current' },
    { label: 'Saturday', initial: 'S', state: 'upcoming' },
    { label: 'Sunday', initial: 'S', state: 'upcoming' },
  ] as const,
}

export const dashboardMetrics: ReadonlyArray<{
  id: string
  label: string
  value: number
  fillWidth: number
  icon: string
  priority?: boolean
}> = [
  {
    id: 'shooting-technique',
    label: 'Shooting Technique',
    value: 78,
    fillWidth: 182,
    icon: metricShootingTechnique,
  },
  {
    id: 'body-alignment',
    label: 'Body Alignment',
    value: 82,
    fillWidth: 182,
    icon: metricBodyAlignment,
  },
  {
    id: 'supporting-foot',
    label: 'Supporting Foot',
    value: 64,
    fillWidth: 146,
    icon: metricSupportingFoot,
    priority: true,
  },
  {
    id: 'follow-through',
    label: 'Follow-through',
    value: 75,
    fillWidth: 182,
    icon: metricFollowThrough,
  },
]

export const heroIllustration = {
  fieldCircle: heroFieldCircle,
  ballMarker: heroBallMarker,
}

export const recommendation = {
  icon: recommendationZap,
  title: 'Focus on your supporting foot',
  description:
    'Practice positioning your supporting foot beside the ball to improve balance and develop a more consistent shooting technique.',
}
