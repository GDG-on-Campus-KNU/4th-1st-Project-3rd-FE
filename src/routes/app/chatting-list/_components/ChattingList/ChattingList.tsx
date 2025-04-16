import { useCallback, useState } from 'react';

import { ChattingRoomItem } from '../ChattingRoomItem/ChattingRoomItem';

interface ChattingListProps {
  chattingPreviews: ChattingPreview[];
  initChat: (mbti: Mbti) => void;
  deleteChat: (mbti: Mbti) => void;
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
    <div
      style={{
        width: '80vw',
      }}
    >
      {chattingPreviews.map((chattingPreview) => (
        <ChattingRoomItem
          key={chattingPreview.mbti}
          mbti={chattingPreview.mbti}
          lastMessage={chattingPreview.lastMessage}
          isViewed={chattingPreview.isViewed}
          isSwiped={checkIsSwiped(chattingPreview.mbti)}
          setIsSwiped={getSetSwiped(chattingPreview.mbti)}
          onRefresh={() => initChat(chattingPreview.mbti)}
          onDelete={() => deleteChat(chattingPreview.mbti)}
          onChattingRoomClick={() => onChattingRoomClick(chattingPreview.mbti)}
        />
      ))}
    </div>
  );
}
