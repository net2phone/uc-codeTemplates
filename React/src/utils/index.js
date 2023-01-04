import Iframe from "./iframe.js";
const iframe = new Iframe();

export function isEmpty(value) {
  if (value === null || value === undefined || value === "") {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  return false;
}
export function useIframe() {
  return iframe;
}

export const fields = [
  { text: "Client Id", value: "clientId" },
  { text: "Client name", value: "clientName" },
  { text: "Channel", value: "channel" },
  { text: "Campaign", value: "campaign" },
];
