import { useContext } from "react";
import { CampaignContext } from "../../contexts/CampaignContext";
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { SubCampaign } from "../../types/campaign";
import { SubCampaignContext } from "../../contexts/SubCampaignContext";

type SubCampaignInfoProps = {
  subCampaigns: SubCampaign[];
};
export default function SubCampaignInfo(props: SubCampaignInfoProps) {
  const { subCampaigns } = props;
  const { campaign, onChange } = useContext(CampaignContext);
  const { selected } = useContext(SubCampaignContext);

  const updateSubCampaign = (field: keyof SubCampaign, value: string | boolean) => {
    const subCampaignsCopy = [...subCampaigns];
    subCampaignsCopy.splice(selected, 1, { ...subCampaignsCopy[selected], [field]: value });

    return onChange({ ...campaign, subCampaigns: subCampaignsCopy });
  };

  return (
    <Box display={"flex"} alignItems={"flex-end"} gap={4}>
      <TextField
        style={{ flex: 2 }}
        variant="standard"
        margin="normal"
        required
        label="Tên chiến dịch con"
        value={subCampaigns[selected].name}
        onChange={(e) => updateSubCampaign("name", e.target.value)}
      />
      <FormControlLabel
        label="Dang hoạt động"
        control={
          <Checkbox checked={subCampaigns[selected].status} onChange={(e) => updateSubCampaign("status", e.target.checked)} />
        }
      />
    </Box>
  );
}
