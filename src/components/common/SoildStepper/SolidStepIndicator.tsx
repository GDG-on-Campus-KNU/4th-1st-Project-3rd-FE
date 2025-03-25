import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from './SolidStepIndicator.module.css';

export interface SolidStepIndicatorProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  maxStep: number;
  nowStep: number;
}

const WORKING_MS = 300;

const getStyle = (
  targetStep: number,
  workingStep: number,
  isIncreasing: boolean,
) => {
  const defaultStyles = styles['step-indicator'];
  if (!isIncreasing && workingStep + 1 === targetStep)
    return [defaultStyles, styles['before-using']].join(' ');
  if (targetStep > workingStep) return [defaultStyles, styles.unused].join(' ');
  if (targetStep < workingStep) return [defaultStyles, styles.used].join(' ');
  if (isIncreasing && targetStep === workingStep)
    return [defaultStyles, styles.increasing].join(' ');
  return [defaultStyles, styles.used].join(' ');
};

export default function SolidStepIndicator(props: SolidStepIndicatorProps) {
  const { maxStep, nowStep, style, className, ...restProps } = props;

  const [workingStep, setWorkingStep] = useState(0);
  const lastWorkingStep = useRef<number>(0);
  const isIncreasing = lastWorkingStep.current <= workingStep;
  const intervalId = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const targetStep = Math.floor(nowStep);
    intervalId.current = setInterval(() => {
      setWorkingStep((prev) => {
        lastWorkingStep.current = prev;
        return prev <= targetStep
          ? Math.min(maxStep, prev + 1)
          : Math.max(prev - 1, 0);
      });
    }, WORKING_MS);

    return () => clearInterval(intervalId.current);
  }, [nowStep, maxStep]);

  useEffect(() => {
    if (nowStep === workingStep || maxStep < workingStep) {
      clearInterval(intervalId.current);
    }
  }, [nowStep, workingStep, maxStep]);

  return (
    <div
      style={style}
      className={[className, styles['stepper-container']].join(' ')}
      {...restProps}
    >
      {new Array(maxStep + 1).fill(null).map((_, step) =>
        step === 0 ? null : (
          <div key={step} className={styles.step}>
            <div className={getStyle(step, workingStep, isIncreasing)} />
          </div>
        ),
      )}
    </div>
  );
}
