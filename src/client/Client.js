import Inquiry from "./Inquiry";
import invariant from "../util/invariant";

class RestClient {
  constructor(options) {
    const { apiRoot, initialState } = options || {};
    this.apiRoot = apiRoot || "";
    this.inquiries = {};
    this.initialState = initialState;
    this.lastInquiryNumber = 0;
  }

  getInquiry = (params = {}) => {
    const { id } = params;
    invariant(
      typeof id === "string",
      "Request parameters must have id as a string."
    );
    invariant(id.legnth > 0, "Id param is empty.");
    const inquiry =
      this.inquiries[id] ||
      (this.inquiries[id] = new Inquiry(this, params, this.initialState[id]));
    return inquiry;
  };

  getNextInquiryNumber = () => {
    this.lastInquiryNumber += 1;
    return this.lastInquiryNumber;
  };

  // extractCacheData = () => {
  //   return Object.entries(this.inquiries);
  // };
  //
}

export default RestClient;
