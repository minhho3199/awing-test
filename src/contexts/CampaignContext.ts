import { createContext } from "react";
import { Campaign } from "../types/campaign";

type CampaignContextType = {
  campaign: Campaign;
  onChange: (props: Campaign) => void;
};
export const CampaignContext = createContext<CampaignContextType>({
  campaign: {
    information: {
      name: "",
    },
    subCampaigns: [
      {
        name: "Chiến dịch con 1",
        status: true,
        ads: [
          {
            name: "Quảng Cáo 1",
            quantity: 1,
          },
        ],
      },
    ],
  },
  onChange: () => {},
});

