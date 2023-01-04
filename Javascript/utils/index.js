import Iframe from "./iframe.js";
const iframe = new Iframe();

export function useIframe() {
  return iframe;
}

export const fields = [
  { text: "Client Id", value: "clientId" },
  { text: "Client name", value: "clientName" },
  { text: "Channel", value: "channel" },
  { text: "Campaign", value: "campaign" },
];
