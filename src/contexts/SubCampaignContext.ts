import { createContext } from "react";

type SubCampaignContextType = {
  selected: number;
  handleSelect: (index: number) => void;
};
export const SubCampaignContext = createContext<SubCampaignContextType>({
  selected: 0,
  handleSelect: () => {},
});
