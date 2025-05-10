import { useCallback, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

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
const MAX_STEP = 4;
const getButtonStr = (step: Step) => {
  if (step === 1) return '인증번호 받기';
  if (step === 2) return '확인';
  if (step === MAX_STEP) return '회원가입 완료하기';
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
  const location = useLocation();
  const {
    email,
    code,
    leftCnt,
    hasEmailError,
    isEmailSending,
    isCodeSending,
    leftSecond,
    isVerified,
    hasCodeError,
    codeErrorMessage,
    sendEmail,
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

  const nowStep: Step = location.state?.step || 1;

  const [isRegisterSending, setIsRegisterSending] = useState(false);

  const handleGoBackward = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleGoNextStep = useCallback(async () => {
    if (nowStep === 1) {
      await sendEmail();
      navigate(location.pathname, {
        state: { step: 2 },
      });
      return;
    }
    if (nowStep === 4) {
      setIsRegisterSending(true);
      await postFetch<RegisterRequestBody>(HTTP_API_END_POINT.register, {
        body: { email, password, mbti: mbti as Mbti },
      }).finally(() => setIsRegisterSending(false));
      navigate(APP_END_POINT.registerSuccess);
      return;
    }

    navigate(location.pathname, {
      state: { step: Math.min(MAX_STEP, nowStep + 1) },
    });
  }, [nowStep, email, password, mbti, navigate, sendEmail, location.pathname]);

  const isLoading =
    (nowStep === 1 && isEmailSending) || (nowStep === 4 && isRegisterSending);
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
              email={email}
              hasEmailError={hasEmailError}
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
              isCodeSending={isCodeSending}
              verify={verifyCode}
              resend={sendEmail}
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

        <Button
          className={styles.button}
          isLoading={isLoading}
          isValid={
            !checkIsButtonDisabled({
              step: nowStep,
              isValidEmail: !!(email && !hasEmailError),
              isVerified,
              isValidPassword: !!(
                password &&
                passwordChecker &&
                !hasPasswordError &&
                !hasPasswordCheckerError
              ),
              isValidMBTI: !!(mbti && isMBTICompleted),
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
