export interface pagepermissionDTO {
    id: number;
    pageName: string;
    pageURL: string;
    parentPageId: number;
    pageStatus: Boolean;
    createdat:Date;
    updatedat:Date;
    createdBy: number;
  }