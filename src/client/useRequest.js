import { useState, useEffect } from "react";

import useClient from "./useClient";

export const makeUseInquiry = method => params => {
  const { client } = useClient();
  const [, setState] = useState();
  const inquiryInstance = client.getInquiry({ ...params, method });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    inquiryInstance.onStateChange(setState);
    return () => inquiryInstance.offStateChange(setState);
  });

  return inquiryInstance;
};

export const useGetInquiry = makeUseInquiry("get");
export const usePostInquiry = makeUseInquiry("post");
export const useDeleteInquiry = makeUseInquiry("delete");
export const usePutInquiry = makeUseInquiry("put");
export const useOptionInquiry = makeUseInquiry("option");
