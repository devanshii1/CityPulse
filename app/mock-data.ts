export type IssueStatus = "reported" | "verified" | "in_progress" | "resolved" | "reopened";

export type Issue = {
  id: number;
  title: string;
  category: string;
  severity: 1 | 2 | 3 | 4 | 5;
  status: IssueStatus;
  location: string;
  reports: number;
  updated: string;
  summary: string;
};

export type Report = {
  id: number;
  title: string;
  category: string;
  location: string;
  status: IssueStatus;
  severity: 1 | 2 | 3 | 4 | 5;
  submitted: string;
  description: string;
};

export const issueCards: Issue[] = [
  {
    id: 1,
    title: "Waterlogged underpass near City Hall",
    category: "waterlogging",
    severity: 4,
    status: "in_progress",
    location: "Riverside Ave",
    reports: 18,
    updated: "2 hours ago",
    summary: "Standing water is blocking pedestrians after heavy rain and reducing visibility near the bus stop.",
  },
  {
    id: 2,
    title: "Large pothole on Maple Road",
    category: "pothole",
    severity: 3,
    status: "verified",
    location: "Maple Road",
    reports: 9,
    updated: "Today",
    summary: "Multiple reports confirm a deep road defect affecting vehicle movement and local delivery routes.",
  },
  {
    id: 3,
    title: "Garbage overflow at neighborhood plaza",
    category: "garbage",
    severity: 2,
    status: "reported",
    location: "Oak Square",
    reports: 6,
    updated: "3 days ago",
    summary: "Bins are overflowing and waste is spreading around the public square during peak evening hours.",
  },
  {
    id: 4,
    title: "Broken streetlight near school zone",
    category: "streetlight",
    severity: 4,
    status: "resolved",
    location: "Northgate School",
    reports: 13,
    updated: "1 week ago",
    summary: "The lighting issue was repaired after repeated community reports and a maintenance visit.",
  },
];

export const reports: Report[] = [
  {
    id: 101,
    title: "Flooded road near bus stop",
    category: "flooding",
    location: "Riverside Ave",
    status: "in_progress",
    severity: 4,
    submitted: "June 28",
    description: "Water is standing over the curb and creating unsafe conditions for cyclists and pedestrians.",
  },
  {
    id: 102,
    title: "Pothole outside local clinic",
    category: "pothole",
    location: "Maple Road",
    status: "verified",
    severity: 3,
    submitted: "June 24",
    description: "The road is damaged near the clinic entrance and vehicles are slowing down heavily there.",
  },
  {
    id: 103,
    title: "Road blocked by tree debris",
    category: "road_blockage",
    location: "Hillside Walk",
    status: "reported",
    severity: 2,
    submitted: "June 22",
    description: "Debris from a recent storm is narrowing the road and limiting access for emergency vehicles.",
  },
];

export const profileStats = {
  name: "Aisha Patel",
  email: "aisha.patel@example.com",
  reportsSubmitted: 12,
  issuesTracked: 8,
  neighborhoods: ["Downtown", "Riverside", "Northgate"],
};
