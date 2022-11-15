import { isNumber } from "@rbp/shared";
import { useState } from "react";

export interface Step {
  step: number;
  label: string;
}

export interface StepperProps {
  /**
   * The step to start at. Useful for resuming a multi-step form.
   * 
   * @default 1
   */
  startAt?: number;

  /**
   * Steps to display, in order.
   */
  steps: Step[];
}

export function useStepper({ steps, startAt }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(startAt || 1);

  const hasStep = (step: number) => {
    return steps.some(s => s.step === step);
  }

  if (isNumber(startAt) && (!hasStep(startAt) || startAt < 1)) {
    throw new Error('Invalid startAt value');
  }

  const next = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  }

  const previous = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  return {
    currentStep,
    steps,
    next,
    previous,
  }
}
