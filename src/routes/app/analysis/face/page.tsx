import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import BackHeader from '@_/components/common/Header/BackHeader';
import APP_END_POINT from '@_/constants/appEndpoint';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';

import AnalysisFaceStep1 from './_step/1/page';
import AnalysisFaceStep2 from './_step/2/page';
import AnalysisFaceStep3 from './_step/3/page';
import AnalysisFaceStep4 from './_step/4/page';
import AnalysisFaceStep5 from './_step/5/page';
import styles from './page.module.css';

const AnalysisFacePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { step = 1, isFromChattingList = false } = (location.state || {}) as {
    step?: 1 | 2 | 3 | 4 | 5;
    isFromChattingList?: boolean;
  };
  const divRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const imageUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  const [imageStatusMap, setImageStatusMap] = useState<
    Map<
      string,
      { status: 'loading'; mbti: null } | { status: 'success'; mbti: Mbti }
    >
  >(new Map());

  const mbti: Mbti | null = imageStatusMap.get(imageUrl || '')?.mbti || null;
  const handleAddImageStatusMap = useCallback(
    (
      imageUrl: string,
      value:
        | { status: 'loading'; mbti: null }
        | { status: 'success'; mbti: Mbti },
    ) => {
      setImageStatusMap((prev) => {
        if (prev.get(imageUrl)?.status === 'success') return prev;
        return new Map(prev).set(imageUrl, value);
      });
    },
    [],
  );

  useEffect(() => {
    if (imageUrl) {
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [imageUrl]);

  const postAnalysisFace = useCallback(async () => {
    if (!image) return;
    if (!imageUrl) return;
    if (imageStatusMap.has(imageUrl)) return;
    handleAddImageStatusMap(imageUrl, { status: 'loading', mbti: null });

    const formData = new FormData();
    formData.append('image', image);
    const { mbti } = await postFetch(HTTP_API_END_POINT.analysisFace, {
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    handleAddImageStatusMap(imageUrl, { status: 'success', mbti });
  }, [image, imageUrl, handleAddImageStatusMap, imageStatusMap]);

  useEffect(() => {
    if (step === 4 && mbti) {
      navigate('.', { state: { step: 5 }, replace: true });
    }
  }, [step, mbti, navigate]);

  return (
    <div ref={divRef}>
      <BackHeader
        onBack={() => {
          if (isFromChattingList) {
            return navigate(APP_END_POINT.chattingList, {
              state: {
                isSidebarOpened: true,
              },
            });
          }
          return navigate(-1);
        }}
      >
        관상 MBTI
      </BackHeader>
      <div className={styles.container}>
        {step === 1 && (
          <AnalysisFaceStep1
            goNextStep={() => navigate('.', { state: { step: 2 } })}
          />
        )}
        {step === 2 && (
          <AnalysisFaceStep2
            goNextStep={() => navigate('.', { state: { step: 3 } })}
          />
        )}
        {step === 3 && (
          <AnalysisFaceStep3
            divRef={divRef}
            goNextStep={() => {
              if (!imageUrl) return;
              if (imageStatusMap.get(imageUrl)?.status === 'success') {
                return navigate('.', { state: { step: 5 } });
              }
              if (image) {
                postAnalysisFace();
                navigate('.', { state: { step: 4 } });
              }
            }}
            photo={image}
            updateImage={setImage}
            photoUrl={imageUrl}
          />
        )}
        {step === 4 && <AnalysisFaceStep4 />}
        {step === 5 && mbti && (
          <AnalysisFaceStep5
            mbti={mbti}
            retest={() => {
              setImage(null);
              navigate('.', { state: { step: 3 } });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AnalysisFacePage;
