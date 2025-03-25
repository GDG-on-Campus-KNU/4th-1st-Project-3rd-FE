import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@_/components/common/Button/Button';
import SolidStepIndicator from '@_/components/common/SoildStepper/SolidStepIndicator';
import SolidArrowHeadSVG from '@_/components/common/svgs/SolidArrowHeadSVG';
import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';
import useNonLoginPage from '@_/hooks/useNonLoginPage';

import styles from './AppRegisterPage.module.css';
import useEmailVerify from './_hooks/useEmailVerify';
import useMBTIInput from './_hooks/useMBTIInput';
import usePassword from './_hooks/usePassword';
import RegisterCodePage from './_pages/RegisterCodePage/RegisterCodePage';
import RegisterEmailPage from './_pages/RegisterEmailPage/RegisterEmailPage';
import RegisterMBTIPage from './_pages/RegisterMBTIPage/RegisterMBTIPage';
import RegisterPasswordPage from './_pages/RegisterPasswordPage/RegisterPasswordPage';

type Step = 1 | 2 | 3 | 4 | 5;
const getButtonStr = (step: Step) => {
  if (step === 1) return '인증번호 받기';
  if (step === 2) return '확인';
  if (step === 5) return '로그인 하러가기';
  return '다음으로';
};

const checkIsButtonDisabled = ({
  step,
  isValidEmail,
  isVerified,
  isValidPassword,
  isValidMBTI,
}: {
  step: Step;
  isValidEmail: boolean;
  isVerified: boolean;
  isValidPassword: boolean;
  isValidMBTI: boolean;
}) => {
  if (step === 1 && !isValidEmail) return true;
  if (step === 2 && !isVerified) return true;
  if (step === 3 && !isValidPassword) return true;
  if (step === 4 && !isValidMBTI) return true;
  return false;
};
export default function AppRegisterPage() {
  useNonLoginPage();
  const navigate = useNavigate();
  const [nowStep, setNowStep] = useState<Step>(1);
  const {
    email,
    code,
    leftCnt,
    hasEmailError,
    leftSecond,
    isVerified,
    hasCodeError,
    sendCode,
    verifyCode,
    handleChangeEmail,
    handleChangeCode,
  } = useEmailVerify();
  const {
    password,
    passwordChecker,
    passwordErrorMessage,
    passwordCheckerErrorMessage,
    hasPasswordError,
    hasPasswordCheckerError,
    handleChangePassword,
    handleChangePasswordChecker,
  } = usePassword();

  const {
    isMBTICompleted,
    mbti,
    energyChar,
    perspectiveChar,
    judgeChar,
    planningChar,
    changeEnergyChar,
    changePerspectiveChar,
    changeJudgeChar,
    changePlanningChar,
  } = useMBTIInput();

  const handleGoBackward = useCallback(() => {
    if (nowStep === 1) {
      navigate(-1);
      return;
    }
    setNowStep((prev) => (prev - 1) as Step);
  }, [nowStep, navigate]);

  const handleGoNextStep = useCallback(async () => {
    if (nowStep === 1) {
      await sendCode();
      setNowStep(2);
      return;
    }
    if (nowStep === 4) {
      await postFetch<RegisterRequestBody>(HTTP_API_END_POINT.register, {
        body: { email: '', password: '', mbti: 'ISFJ' },
      });
      setNowStep(5);
      return;
    }
    if (nowStep === 5) {
      navigate(APP_END_POINT.login);
      return;
    }
    return setNowStep((prev) => (prev + 1) as Step);
  }, [nowStep, navigate, sendCode]);

  return (
    <section>
      <header className={styles.header}>
        <SolidArrowHeadSVG
          direction="left"
          onClick={handleGoBackward}
          className={styles['header-backward-button']}
        />
      </header>
      <SolidStepIndicator
        maxStep={5}
        nowStep={nowStep}
        className={styles['step-indicator']}
      />
      <section className={styles['section-layout']}>
        <div>
          {nowStep === 1 && (
            <RegisterEmailPage
              email={email}
              hasEmailError={hasEmailError}
              onEmailChange={handleChangeEmail}
            />
          )}
          {nowStep === 2 && (
            <RegisterCodePage
              email={email}
              code={code}
              leftCnt={leftCnt}
              maxVerifyCnt={5}
              hasCodeError={hasCodeError}
              leftSecond={leftSecond}
              isVerified={isVerified}
              verify={verifyCode}
              resend={sendCode}
              onCodeChange={handleChangeCode}
            />
          )}
          {nowStep === 3 && (
            <RegisterPasswordPage
              password={password}
              passwordChecker={passwordChecker}
              passwordErrorMessage={passwordErrorMessage}
              passwordCheckerErrorMessage={passwordCheckerErrorMessage}
              hasPasswordError={hasPasswordError}
              hasPasswordCheckerError={hasPasswordCheckerError}
              onChangePassword={handleChangePassword}
              onChangePasswordChecker={handleChangePasswordChecker}
            />
          )}
          {nowStep === 4 && (
            <RegisterMBTIPage
              energyChar={energyChar}
              perspectiveChar={perspectiveChar}
              judgeChar={judgeChar}
              planningChar={planningChar}
              changeEnergyChar={changeEnergyChar}
              changePerspectiveChar={changePerspectiveChar}
              changeJudgeChar={changeJudgeChar}
              changePlanningChar={changePlanningChar}
            />
          )}
        </div>

        <Button
          className={styles.button}
          isValid={
            !checkIsButtonDisabled({
              step: nowStep,
              isValidEmail: !hasEmailError,
              isVerified,
              isValidPassword: !!(
                password &&
                !hasPasswordError &&
                !hasPasswordCheckerError
              ),
              isValidMBTI: isMBTICompleted,
            })
          }
          onClick={handleGoNextStep}
        >
          {getButtonStr(nowStep)}
        </Button>
      </section>
    </section>
  );
}
