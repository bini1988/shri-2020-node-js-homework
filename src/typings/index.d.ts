
declare namespace CI {
  export type Settings = {
    id: string;
    repoName: string;
    buildCommand: string;
    mainBranch: string;
    period: number;
  }

  export type PostSettings =
    Partial<Omit<Settings, 'id'>>

  export type BuildStatus =
    'Waiting' |
    'InProgress' |
    'Success' |
    'Fail' |
    'Canceled';

  export type Build = {
    id: string;
    configurationId: string;
    buildNumber: number;
    commitMessage: string;
    commitHash: string;
    branchName: string;
    authorName: string;
    status: BuildStatus;
    start: string;
    duration: number;
  }
}
