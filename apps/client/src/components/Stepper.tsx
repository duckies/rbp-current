import clsx from "clsx";
import CheckIcon from "components/icons/CheckIcon";
import type { VariantProps } from "cva";
import { cva } from "cva";
import type { Step } from "hooks/useStepper";
import type { ComponentPropsWithoutRef } from "react";
import type { DOMProps } from "types/shared";

export interface StepperProps extends DOMProps<"nav"> {
  currentStep: number;
  steps: Step[];
}

const item = cva("group flex w-full items-center rounded-md md:rounded-none text-black", {
  variants: {
    status: {
      current: "bg-yellow-300",
      complete: "bg-yellow-400",
      incomplete: "",
    },
    border: {
      left: "md:rounded-l-md",
      right: "md:rounded-r-md",
    },
  },
  defaultVariants: {},
  compoundVariants: [
    {
      status: "current",
      border: null,
      class: "md:w-[calc(100%-30px)] md:rounded-none",
    },
    {
      status: "current",
      border: "left",
      class: "md:w-[calc(100%-30px)]",
    },
  ],
});

const arrow = cva("absolute top-0 right-0 hidden md:block w-[30px] fill-none", {
  variants: {
    status: {
      default: "",
      current: "md:fill-yellow-300",
      complete: "",
      incomplete: "",
    },
    border: {
      default: "",
      left: "",
      right: "hidden",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

const arrowInverse = cva("absolute top-0 left-[-26px] h-full w-[30px]", {
  variants: {
    status: {
      default: "fill-none",
      current: "md:fill-yellow-300 fill-none",
      complete: "fill-none",
      incomplete: "fill-none",
    },
    border: {
      default: "md:block",
      left: "hidden",
      right: "",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

export interface StepProps extends DOMProps<"div"> {
  step: Step;
  status: "current" | "complete" | "incomplete";
  border?: "left" | "right" | null;
}

export function StepItem({ step, status, border }: StepProps) {
  return (
    <div className={item({ status, border })}>
      <span className="flex items-center px-6 py-4 font-medium">
        <span
          className={clsx(
            "group-hover:bg-yellow-870 border-red flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-black",
            status === "complete" ? "border-surface-500 bg-surface-500 text-white" : "text-black"
          )}
        >
          {status === "complete" ? (
            <CheckIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <span className="">0{step.step}</span>
          )}
        </span>
        <span className="ml-4 font-semibold uppercase tracking-wider">{step.label}</span>
      </span>
    </div>
  );
}

export function Stepper({ steps, currentStep, ...props }: StepperProps) {
  return (
    <nav className="rounded-md bg-gradient-to-r from-yellow-500/60 to-yellow-300/70" aria-label="progress" {...props}>
      <ol role="list" className="divide-y rounded-md md:flex md:divide-y-0">
        {steps.map((step, i) => {
          const border = i === 0 ? "left" : i === steps.length - 1 ? "right" : null;

          const status = step.step === currentStep ? "current" : step.step < currentStep ? "complete" : "incomplete";
          return (
            <li key={step.step} className="relative md:flex md:flex-1">
              <InverseArrowSVG status={status} border={border} />
              <StepItem step={step} status={status} border={border} />
              <ArrowSVG status={status} border={border} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export interface ArrowProps extends ComponentPropsWithoutRef<"svg">, VariantProps<typeof arrow> {}

function ArrowSVG({ status, border, className, ...props }: ArrowProps) {
  return (
    <svg className={arrow({ status, border, class: className })} viewBox="0 0 30 80" aria-hidden="true" {...props}>
      <path d="M0 -5.49673e-05L2.63329 -7.1024e-05C4.72441 -8.37747e-05 6.66469 1.08863 7.75435 2.87341L28.1237 36.2369C29.2786 38.1286 29.2966 40.5027 28.1707 42.4117L7.74102 77.0481C6.66213 78.8773 4.6967 79.9999 2.57306 79.9999L0 79.9999V39.9999V-5.49673e-05Z" />
    </svg>
  );
}

export interface InverseArrowProps extends ComponentPropsWithoutRef<"svg">, VariantProps<typeof arrow> {}

function InverseArrowSVG({ className, status, border, ...props }: InverseArrowProps) {
  return (
    <svg
      className={arrowInverse({ class: className, status, border })}
      viewBox="0 0 26 80"
      aria-hidden="true"
      {...props}
    >
      <path d="M1.88116 9.22537C-0.6651 5.23124 2.2038 2.28882e-05 6.94052 2.28882e-05H26V40V80L6.94054 80C2.20381 80 -0.665096 74.7688 1.88117 70.7746L19.4438 43.2254C20.698 41.258 20.698 38.742 19.4438 36.7747L1.88116 9.22537Z" />
    </svg>
  );
}
