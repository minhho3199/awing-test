import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { SubCampaign } from "../../types/campaign";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useContext } from "react";
import { SubCampaignContext } from "../../contexts/SubCampaignContext";

type SubCampaignCardProps = {
  subCampaigns: SubCampaign[];
};
export default function SubCampaignCard(props: SubCampaignCardProps) {
  const { selected, handleSelect } = useContext(SubCampaignContext);
  const { subCampaigns } = props;

  const adErrorCheck = (selectedSubCampaign: SubCampaign) => {
    return (
      selectedSubCampaign.ads.length === 0 || selectedSubCampaign.ads.some((ad) => ad.name === "" || ad.quantity <= 0)
    );
  };

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={2} maxHeight={200} overflow={"auto"} padding={"5px 0 10px"}>
      {subCampaigns.map((sub: SubCampaign, i) => (
        <Card key={i} style={{ border: selected === i ? `2px solid #2196F3` : "2px solid #ffffff", width: 230 }}>
          <CardActionArea onClick={() => handleSelect(i)}>
            <CardContent style={{ textAlign: "center" }}>
              <Box display="flex" alignItems={"center"} gap={"3px"}>
                <Typography variant="h6" textAlign="center" color={adErrorCheck(subCampaigns[i]) ? "error" : "initial"}>
                  {sub.name}
                </Typography>
                <CheckCircleIcon fontSize="small" color={sub.status ? "success" : "disabled"} />
              </Box>
              <Typography variant="h5">
                {sub.ads.reduce((prev, cur) => {
                  if (cur.quantity <= 0) return +prev;
                  return prev + +cur.quantity;
                }, 0)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
