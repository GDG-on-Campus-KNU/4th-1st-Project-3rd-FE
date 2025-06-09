import { useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import Button from '@_/components/common/Button/Button';
import { Modal } from '@_/components/common/Modal/Modal';
import CameraSVG from '@_/components/common/svgs/CameraSvg';
import GallerySVG from '@_/components/common/svgs/GallareySvg';
import SolidPlusSVG from '@_/components/common/svgs/SolidPlusSVG';

import styles from './page.module.css';

const validImageTypes = ['image/jpeg', 'image/heif', 'image/png'];
const UploadModalContent = ({
  onCamera,
  onGallery,
}: {
  onCamera: (image: File) => void;
  onGallery: (image: File) => void;
}) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles['modal-content']}>
      사진 업로드하기
      <div className={styles['button-container']}>
        <label htmlFor="cameraInput">
          <CameraSVG color="white" />
          카메라로 촬영하기
          <input
            type="file"
            accept={validImageTypes.join(',')}
            // @ts-expect-error camera 기능 있음
            capture="camera"
            id="cameraInput"
            ref={cameraInputRef}
            style={{ display: 'none' }}
            onChange={() => {
              if (cameraInputRef.current?.files?.length) {
                onCamera(cameraInputRef.current.files[0]);
              }
            }}
          />
        </label>
        <label htmlFor="galleryInput">
          <GallerySVG color="white" />
          갤러리에서 불러오기
          <input
            type="file"
            accept={validImageTypes.join(',')}
            id="galleryInput"
            ref={galleryInputRef}
            style={{ display: 'none' }}
            onChange={() => {
              if (galleryInputRef.current?.files?.length) {
                onGallery(galleryInputRef.current.files[0]);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default function AnalysisFaceStep3({
  goNextStep,
  divRef,
  photo,
  updateImage: updatePhoto,
  photoUrl,
}: {
  goNextStep: () => void;
  divRef: React.RefObject<HTMLDivElement | null>;
  photo: File | null;
  updateImage: (image: File) => void;
  photoUrl: string | null;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasPhoto = photo !== null;

  return (
    <>
      <div className={styles.container}>
        <span className={styles.description}>
          <h2>얼굴 사진 업로드 </h2>
          <br />
          정면에서 찍은 사진이 필요해요!
        </span>
        <div
          className={[
            styles['photo-container'],
            hasPhoto ? '' : styles['no-photo'],
          ].join(' ')}
          style={
            hasPhoto
              ? {
                  backgroundImage: `url(${photoUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
          onClick={() => setIsModalOpen(true)}
        >
          {hasPhoto && <div className={styles.dimmer} />}
          <div className={styles['photo-container-content']}>
            <SolidPlusSVG className={styles.svg} />
            <br />
            <span>
              {hasPhoto ? '다른 사진 업로드하기' : '사진을 업로드 해주세요'}
            </span>
          </div>
        </div>
        <Button
          className={styles.button}
          onClick={goNextStep}
          isValid={hasPhoto}
        >
          분석하기
        </Button>
      </div>
      {isModalOpen &&
        createPortal(
          <Modal onClose={() => setIsModalOpen(false)}>
            <UploadModalContent
              onCamera={(image) => {
                updatePhoto(image);
                setIsModalOpen(false);
              }}
              onGallery={(image) => {
                updatePhoto(image);
                setIsModalOpen(false);
              }}
            />
          </Modal>,
          divRef.current?.parentElement || document.body,
        )}
    </>
  );
}
