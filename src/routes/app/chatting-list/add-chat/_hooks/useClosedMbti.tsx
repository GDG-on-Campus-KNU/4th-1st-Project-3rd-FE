import { useEffect, useState } from 'react';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { getFetch } from '@_/fetches/BaseFetches';
import getTargetMbtiBit from '@_/utils/getTargetMbtiBit';

export default function useClosedMbti() {
  const [closedMbti, setClosedMbti] = useState<Mbti[]>([]);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {
    const fetchClosedMbti = async () => {
      const { closedMbti } = await getFetch<ChatMbtiOpenGetResponseBody>(
        HTTP_API_END_POINT.mbtiChatOpenGet,
      );
      setClosedMbti(getTargetMbtiBit(closedMbti));
      setIsFirstLoading(false);
    };
    fetchClosedMbti();
  }, []);

  return isFirstLoading ? null : closedMbti;
}
