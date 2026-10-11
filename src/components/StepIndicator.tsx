import type { StepId } from '../App'

interface StepIndicatorProps {
  steps: { id: StepId; label: string }[]
  currentStepId: StepId
}

export default function StepIndicator({ steps, currentStepId }: StepIndicatorProps) {
  return (
    <ol className="step-indicator">
      {steps.map((step) => {
        const isCurrent = step.id === currentStepId
        return (
          <li key={step.id} className={isCurrent ? 'step-indicator-item is-current' : 'step-indicator-item'}>
            {step.label}
          </li>
        )
      })}
    </ol>
  )
}
