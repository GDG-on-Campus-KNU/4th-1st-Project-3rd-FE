import { useCallback, useState } from 'react';

import { ChattingRoomItem } from '../ChattingRoomItem/ChattingRoomItem';

interface ChattingListProps {
  chattingPreviews: ChattingPreview[];
  initChat: (mbti: Mbti, onClose?: () => void) => void;
  deleteChat: (mbti: Mbti, onClose?: () => void) => void;
  onChattingRoomClick: (mbti: Mbti) => void;
}

export default function ChattingList(props: ChattingListProps) {
  const { chattingPreviews, initChat, deleteChat, onChattingRoomClick } = props;

  const [swipedMbti, setSwipedMbti] = useState<Mbti | null>(null);
  const checkIsSwiped = useCallback(
    (mbti: Mbti) => {
      return swipedMbti === mbti;
    },
    [swipedMbti],
  );

  const getSetSwiped = useCallback(
    (mbti: Mbti) => {
      const prevIsSwiped = swipedMbti === mbti;
      return (isSwiped: boolean | ((prev: boolean) => boolean)) => {
        if (typeof isSwiped === 'boolean') {
          setSwipedMbti(isSwiped ? mbti : swipedMbti);
        } else {
          const nextIsSwiped = isSwiped(prevIsSwiped);
          const cancelTargetWipe = prevIsSwiped ? null : swipedMbti;
          setSwipedMbti(nextIsSwiped ? mbti : cancelTargetWipe);
        }
      };
    },
    [swipedMbti],
  );

  return (
    <div>
      {chattingPreviews.map((chattingPreview) => (
        <ChattingRoomItem
          key={chattingPreview.mbti}
          mbti={chattingPreview.mbti}
          lastMessage={chattingPreview.lastMessage}
          isViewed={
            chattingPreview.lastMessage === null || chattingPreview.isViewed
          }
          isSwiped={checkIsSwiped(chattingPreview.mbti)}
          setIsSwiped={getSetSwiped(chattingPreview.mbti)}
          // TODO: initChat에서 mbti 채팅을 닫을 수 있도록 initChat에 함수를 넣음
          // 개선요망
          onRefresh={() =>
            initChat(chattingPreview.mbti, () => setSwipedMbti(null))
          }
          onDelete={() =>
            deleteChat(chattingPreview.mbti, () => setSwipedMbti(null))
          }
          onChattingRoomClick={() => onChattingRoomClick(chattingPreview.mbti)}
        />
      ))}
    </div>
  );
}
