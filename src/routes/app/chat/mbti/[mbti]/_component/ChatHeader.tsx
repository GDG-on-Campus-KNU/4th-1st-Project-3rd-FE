import TriSectionHeader from '@_/components/common/TrisectionHeader/TriSectionHeader';
import useImageOnError from '@_/hooks/useImageOnError';

interface ChatHeaderProps {
  onMenuClick: () => void;
  title: string;
  profileSrc?: string;
}

export default function ChatHeader(props: ChatHeaderProps) {
  const { onMenuClick, title, profileSrc } = props;
  const imageOnError = useImageOnError(profileSrc);

  return (
    <TriSectionHeader
      center={<span>{title}</span>}
      right={<img src={profileSrc} onError={imageOnError} />}
    />
  );
}
