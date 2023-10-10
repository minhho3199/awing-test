import { TextField } from "@mui/material";
import { Information } from "../types/campaign";
import { useContext } from "react";
import { CampaignContext } from "../contexts/CampaignContext";
import { ErrorContext } from "../contexts/ErrorContext";

type InformationProps = {
  category: "information" | "subCampaigns";
};
export default function InformationTab(props: InformationProps) {
  const { campaign, onChange } = useContext(CampaignContext);
  const { campaignNameError } = useContext(ErrorContext);
  const { category } = props;

  function updateValue(field: keyof Information, value: any) {
    return onChange({ ...campaign, [category]: { ...campaign[category], [field]: value } });
  }
  return (
    <div>
      <TextField
        variant="standard"
        fullWidth
        margin="normal"
        required
        value={campaign.information.name}
        error={!!campaignNameError}
        helperText={campaignNameError}
        label="Tên chiến dịch"
        onChange={(e) => updateValue("name", e.target.value)}
      />
      <TextField
        variant="standard"
        margin="normal"
        fullWidth
        value={campaign.information.describe}
        label="Mô tả"
        onChange={(e) => updateValue("describe", e.target.value)}
      />
    </div>
  );
}
