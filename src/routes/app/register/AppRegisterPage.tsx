import { useCallback, useEffect, useState } from 'react';

import { Navigate, useLocation, useNavigate } from 'react-router-dom';

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

type Step = 1 | 2 | 3 | 4;
const noop = () => {};
const MAX_STEP = 4;
const getButtonStr = (
  step: Step,
  isCodeExpired: boolean,
  email: string | null,
  verifiedEmail: string | null,
) => {
  if (step === 1) {
    if (!verifiedEmail) return '인증번호 받기';
    if (verifiedEmail && email !== verifiedEmail)
      return '다른 메일로 다시 인증받기';
    return '다음으로';
  }
  if (step === 2) {
    if (isCodeExpired) return '인증메일 다시 받기';
    return '확인';
  }
  if (step === MAX_STEP) return '회원가입 완료하기';
  return '다음으로';
};

const checkIsButtonDisabled = ({
  step,
  isValidEmail,
  isVerified,
  isValidPassword,
  isValidMBTI,
  isCodeExpired,
}: {
  step: Step;
  isValidEmail: boolean;
  isVerified: boolean;
  isValidPassword: boolean;
  isValidMBTI: boolean;
  isCodeExpired: boolean;
}) => {
  if (step === 1 && !isValidEmail) return true;
  if (step === 2 && !isVerified && !isCodeExpired) return true;
  if (step === 3 && !isValidPassword) return true;
  if (step === 4 && !isValidMBTI) return true;
  return false;
};

const checkIsFilled = ({
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
  if (step === 1 && isValidEmail) return true;
  if (step === 2 && isVerified) return true;
  if (step === 3 && isValidPassword) return true;
  if (step === 4 && isValidMBTI) return true;
  return false;
};

export default function AppRegisterPage() {
  useNonLoginPage();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    email,
    code,
    leftCnt,
    hasEmailFormatError,
    usedEmail,
    isEmailSending,
    isCodeSending,
    leftSecond,
    isVerified,
    hasCodeError,
    codeErrorMessage,
    isCodeExpired,
    verifiedEmail,
    sendEmail,
    verifyCode,
    handleChangeEmail,
    handleChangeCode,
    resetCode,
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

  const nowStep: Step = location.state?.step || 1;

  const [isRegisterSending, setIsRegisterSending] = useState(false);

  const [maxCompletedStep, setMaxCompletedStep] = useState(0);

  const isAutoNext = nowStep !== 1 && nowStep === maxCompletedStep + 1;

  const handleGoBackward = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const updateMaxStep = useCallback(
    (step: Step) => {
      if (step === maxCompletedStep + 1) {
        setMaxCompletedStep(step);
      }
    },
    [maxCompletedStep],
  );
  const isLoading =
    (nowStep === 1 && isEmailSending) ||
    (nowStep === 2 && isEmailSending) ||
    (nowStep === 4 && isRegisterSending);

  const isFilled = checkIsFilled({
    step: nowStep,
    isValidEmail: !!(email && !hasEmailFormatError && email !== usedEmail),
    isVerified,
    isValidPassword: !!(
      password &&
      passwordChecker &&
      !hasPasswordError &&
      !hasPasswordCheckerError
    ),
    isValidMBTI: !!(mbti && isMBTICompleted),
  });

  const isButtonDisabled = checkIsButtonDisabled({
    step: nowStep,
    isValidEmail: !!(email && !hasEmailFormatError && email !== usedEmail),
    isVerified,
    isValidPassword: !!(
      password &&
      passwordChecker &&
      !hasPasswordError &&
      !hasPasswordCheckerError
    ),
    isValidMBTI: !!(mbti && isMBTICompleted),
    isCodeExpired,
  });

  const handleGoNextStep = useCallback(async () => {
    if (nowStep === 1 && email !== verifiedEmail) {
      try {
        await sendEmail();
        navigate(location.pathname, {
          state: { step: 2 },
        });
        updateMaxStep(1);
        return;
      } catch (_) {
        noop();
        return;
      }
    }
    if (nowStep === 2 && isCodeExpired && !isVerified) {
      return sendEmail();
    }
    if (nowStep === 4) {
      setIsRegisterSending(true);
      try {
        await postFetch<RegisterRequestBody>(HTTP_API_END_POINT.register, {
          body: { email, password, mbti: mbti as Mbti },
          handleCode: (code) => {
            if (code === 'E001') {
              alert('이메일이 만료되었습니다. 처음부터 다시 시도해주세요.');
            } else alert('알 수 없는 오류입니다. 다시 시도해주세요.');
            navigate(APP_END_POINT.register, {
              state: { step: 0 },
            });
          },
        });
        setIsRegisterSending(false);
        navigate(APP_END_POINT.registerSuccess);
        updateMaxStep(4);
        return;
      } catch (_) {
        setIsRegisterSending(false);
        return;
      }
    }

    navigate(location.pathname, {
      state: { step: Math.min(MAX_STEP, nowStep + 1) },
    });
    updateMaxStep(nowStep);
  }, [
    nowStep,
    email,
    password,
    mbti,
    isVerified,
    isCodeExpired,
    verifiedEmail,
    navigate,
    sendEmail,
    updateMaxStep,
    location.pathname,
  ]);

  const shouldShowButton =
    !isAutoNext || (nowStep === 2 && (leftCnt === 0 || leftSecond === 0));

  useEffect(() => {
    if (isFilled && isAutoNext) {
      handleGoNextStep();
    }
  }, [isFilled, isAutoNext, handleGoNextStep]);

  if (nowStep > maxCompletedStep + 1)
    return <Navigate to={APP_END_POINT.register} state={{ step: 0 }} replace />;

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
        maxStep={MAX_STEP}
        nowStep={nowStep}
        className={styles['step-indicator']}
      />
      <section className={styles['section-layout']}>
        <div>
          {nowStep === 1 && (
            <RegisterEmailPage
              verifiedEmail={verifiedEmail}
              email={email}
              hasEmailFormatError={hasEmailFormatError}
              usedEmail={usedEmail}
              onEmailChange={handleChangeEmail}
              isEmailSending={isEmailSending}
            />
          )}
          {nowStep === 2 && (
            <RegisterCodePage
              email={email}
              code={code}
              leftCnt={leftCnt}
              maxVerifyCnt={5}
              hasCodeError={hasCodeError}
              codeErrorMessage={codeErrorMessage}
              leftSecond={leftSecond}
              isVerified={isVerified}
              isCodeSending={isCodeSending || isEmailSending}
              isExpired={isCodeExpired}
              isAuto={isAutoNext}
              verify={verifyCode}
              onCodeChange={handleChangeCode}
              resetCode={resetCode}
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
              canChange={!isRegisterSending}
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

        {shouldShowButton && (
          <Button
            className={styles.button}
            isLoading={isLoading}
            isValid={!isButtonDisabled}
            onClick={handleGoNextStep}
          >
            {getButtonStr(nowStep, isCodeExpired, email, verifiedEmail)}
          </Button>
        )}
      </section>
    </section>
  );
}
