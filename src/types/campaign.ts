export type Campaign = {
  information: Information;
  subCampaigns: SubCampaign[];
};

export type Information = {
  name: string;
  describe?: string;
};

export type SubCampaign = {
  name: string;
  status: boolean;
  ads: Advertisement[];
};

export type Advertisement = {
  name: string;
  quantity: number;
};
