import "./App.css";
import { Box, Button, Card, CardContent, Tab, Tabs } from "@mui/material";
import "./assets/styles/common.css";
import { useEffect, useState } from "react";
import { Campaign, SubCampaign } from "./types/campaign";
import InformationTab from "./components/InformationTab";
import SubCampaignTab from "./components/SubCampaign/SubCampaignsTab";
import { CampaignContext } from "./contexts/CampaignContext";
import { Error } from "./types/error";
import { ERROR } from "./constants/constants";
import { ErrorContext } from "./contexts/ErrorContext";

function App() {
  const [campaign, setCampaign] = useState<Campaign>({
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
  });
  const [tabValue, setTabValue] = useState(0);
  const [errors, setErrors] = useState<Error>({
    campaignNameError: "",
    subCampaignNameError: "",
  });

  const handleTabChange = (_e: any, newValue: number) => {
    setTabValue(newValue);
  };

  const updateErrors = (errorName: string, errorContent = "") => {
    setErrors((prev) => ({ ...prev, [errorName]: errorContent }));
  };

  const resetErrors = () => {
    setErrors({
      campaignNameError: "",
      subCampaignNameError: "",
    });
  };

  const onSubmit = () => {
    resetErrors();
    let error = false;
    if (!campaign.information.name) {
      error = true;
      alert("Vui lòng điền đúng và đầy đủ thông tin");
      updateErrors(ERROR.CAMPAIGN_NAME_ERROR, "Dữ liệu không hợp lệ");
      return;
    }
    if (campaign.subCampaigns.some((sub) => sub.name === "")) {
      alert("Vui lòng điền đúng và đầy đủ thông tin");
      updateErrors(ERROR.SUB_CAMPAIGN_NAME_ERROR, "Dữ liệu không hợp lệ");
      return;
    }
    for (const sub of campaign.subCampaigns) {
      if (error) break;
      if (sub.ads.length === 0 || sub.ads.some((ad) => ad.name === "" || ad.quantity <= 0)) {
        error = true;
        alert("Vui lòng điền đúng và đầy đủ thông tin");
        return;
      }
    }
    alert("Thêm thành công chiến dịch:\n " + JSON.stringify(campaign));
  };

  return (
    <div className="container">
      <ErrorContext.Provider value={errors}>
        <Box display={"flex"} justifyContent={"flex-end"} margin={"50px 0 20px"}>
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </Box>
        <Card>
          <CardContent>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="THÔNG TIN" />
              <Tab label="CHIẾN DỊCH CON" />
            </Tabs>
            <CampaignContext.Provider value={{ campaign, onChange: setCampaign }}>
              <Box margin={"15px 0"}>
                {tabValue === 0 ? (
                  <InformationTab category="information" />
                ) : (
                  <SubCampaignTab category="subCampaigns" />
                )}
              </Box>
            </CampaignContext.Provider>
          </CardContent>
        </Card>
      </ErrorContext.Provider>
    </div>
  );
}

export default App;
