import { useCallback, useState } from 'react';

export default function useMBTIInput() {
  const [energyChar, setEnergyChar] = useState<'E' | 'I' | null>(null);
  const [perspectiveChar, setPerspectiveChar] = useState<'S' | 'N' | null>(
    null,
  );
  const [judgeChar, setJudgeChar] = useState<'T' | 'F' | null>(null);
  const [planningChar, setPlanningChar] = useState<'J' | 'P' | null>(null);
  const isMBTICompleted = !!(
    energyChar &&
    perspectiveChar &&
    judgeChar &&
    planningChar
  );
  const mbti = isMBTICompleted
    ? `${energyChar}${perspectiveChar}${judgeChar}${planningChar}`
    : null;

  const changeEnergyChar = useCallback(
    (value: 'E' | 'I') =>
      setEnergyChar((prev) => {
        if (prev !== value) return value;
        if (prev === value) return null;
        return null;
      }),
    [],
  );

  const changePerspectiveChar = useCallback(
    (value: 'S' | 'N') =>
      setPerspectiveChar((prev) => {
        if (prev !== value) return value;
        if (prev === value) return null;
        return null;
      }),
    [],
  );

  const changeJudgeChar = useCallback(
    (value: 'T' | 'F') =>
      setJudgeChar((prev) => {
        if (prev !== value) return value;
        if (prev === value) return null;
        return null;
      }),
    [],
  );

  const changePlanningChar = useCallback(
    (value: 'J' | 'P') =>
      setPlanningChar((prev) => {
        if (prev !== value) return value;
        if (prev === value) return null;
        return null;
      }),
    [],
  );

  return {
    isMBTICompleted,
    mbti,
    changeEnergyChar,
    changePerspectiveChar,
    changeJudgeChar,
    changePlanningChar,
  };
}
