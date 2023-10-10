import { Box, IconButton, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { CampaignContext } from "../../contexts/CampaignContext";
import AddIcon from "@mui/icons-material/Add";
import SubCampaignCard from "./SubCampaignCard";
import { SubCampaign } from "../../types/campaign";
import { SubCampaignContext } from "../../contexts/SubCampaignContext";
import SubCampaignInfo from "./SubCampaignInfo";
import AdTable from "./AdTable";

type SubCampaignProps = {
  category: "information" | "subCampaigns";
};
export default function SubCampaignTab(props: SubCampaignProps) {
  const { campaign, onChange } = useContext(CampaignContext);
  const { category } = props;
  const [selectedSubCampaign, setSelectedSubCampaign] = useState(0);

  const handleAddSubCampaign = () => {
    const subCampaigns = [...(campaign[category] as SubCampaign[])];
    subCampaigns.push({
      name: `Chiến dịch con ${subCampaigns.length + 1}`,
      status: true,
      ads: [
        {
          name: `Quảng cáo 1`,
          quantity: 1,
        },
      ],
    });
    return onChange({
      ...campaign,
      [category]: subCampaigns,
    });
  };

  return (
    <div>
      <Box display="flex" alignItems={"flex-start"} justifyContent="flex-start" gap={3}>
        <IconButton style={{ background: "#F2F2F0", alignSelf: "center" }} onClick={handleAddSubCampaign}>
          <AddIcon color="primary" />
        </IconButton>
        <SubCampaignContext.Provider value={{ selected: selectedSubCampaign, handleSelect: setSelectedSubCampaign }}>
          <SubCampaignCard subCampaigns={campaign.subCampaigns} />
        </SubCampaignContext.Provider>
      </Box>
      <SubCampaignContext.Provider value={{ selected: selectedSubCampaign, handleSelect: setSelectedSubCampaign }}>
        <SubCampaignInfo subCampaigns={campaign.subCampaigns} />
        <Typography variant="h6" mt={3}>
          DANH SÁCH QUẢNG CÁO
        </Typography>
        <AdTable subCampaigns={campaign.subCampaigns} />
      </SubCampaignContext.Provider>
    </div>
  );
}
