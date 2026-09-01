export const issueCategories = [
  "waterlogging",
  "flooding",
  "pothole",
  "road_blockage",
  "garbage",
  "streetlight",
  "other",
] as const;

export const issueStatuses = [
  "reported",
  "verified",
  "in_progress",
  "resolved",
  "reopened",
] as const;

export type IssueCategory = (typeof issueCategories)[number];
export type IssueStatus = (typeof issueStatuses)[number];

export type MockIssue = {
  id: string;
  title: string;
  category: IssueCategory;
  severity: 1 | 2 | 3 | 4 | 5;
  latitude: number;
  longitude: number;
  status: IssueStatus;
  report_count: number;
};

export const mockIssues: MockIssue[] = [
  {
    id: "issue-001",
    title: "Large pothole near Connaught Place",
    category: "pothole",
    severity: 4,
    latitude: 28.6315,
    longitude: 77.2167,
    status: "verified",
    report_count: 8,
  },
  {
    id: "issue-002",
    title: "Streetlight outage near India Gate",
    category: "streetlight",
    severity: 2,
    latitude: 28.6129,
    longitude: 77.2295,
    status: "in_progress",
    report_count: 3,
  },
  {
    id: "issue-003",
    title: "Waterlogging around Laxmi Nagar",
    category: "waterlogging",
    severity: 4,
    latitude: 28.6304,
    longitude: 77.2773,
    status: "reported",
    report_count: 7,
  },
  {
    id: "issue-004",
    title: "Overflowing garbage near Anand Vihar",
    category: "garbage",
    severity: 3,
    latitude: 28.6469,
    longitude: 77.315,
    status: "reopened",
    report_count: 6,
  },
  {
    id: "issue-005",
    title: "Road blockage near Saket market",
    category: "road_blockage",
    severity: 5,
    latitude: 28.5245,
    longitude: 77.2066,
    status: "reported",
    report_count: 10,
  },
  {
    id: "issue-006",
    title: "Damaged public utility near Hauz Khas",
    category: "other",
    severity: 2,
    latitude: 28.5494,
    longitude: 77.2001,
    status: "verified",
    report_count: 2,
  },
  {
    id: "issue-007",
    title: "Flooding near Noida Sector 18 market",
    category: "flooding",
    severity: 5,
    latitude: 28.5708,
    longitude: 77.326,
    status: "reported",
    report_count: 12,
  },
  {
    id: "issue-008",
    title: "Road surface damage on the DND approach",
    category: "pothole",
    severity: 4,
    latitude: 28.5792,
    longitude: 77.3164,
    status: "in_progress",
    report_count: 5,
  },
  {
    id: "issue-009",
    title: "Waterlogging in Noida Sector 62",
    category: "waterlogging",
    severity: 3,
    latitude: 28.627,
    longitude: 77.3649,
    status: "verified",
    report_count: 8,
  },
  {
    id: "issue-010",
    title: "Garbage accumulation in Noida Sector 63",
    category: "garbage",
    severity: 2,
    latitude: 28.6256,
    longitude: 77.3913,
    status: "resolved",
    report_count: 4,
  },
  {
    id: "issue-011",
    title: "Blocked lane near Greater Noida Pari Chowk",
    category: "road_blockage",
    severity: 4,
    latitude: 28.465,
    longitude: 77.508,
    status: "reported",
    report_count: 9,
  },
  {
    id: "issue-012",
    title: "Streetlights out near Greater Noida Knowledge Park",
    category: "streetlight",
    severity: 3,
    latitude: 28.4595,
    longitude: 77.483,
    status: "in_progress",
    report_count: 5,
  },
  {
    id: "issue-013",
    title: "Flooding near Indirapuram Habitat Centre",
    category: "flooding",
    severity: 5,
    latitude: 28.6387,
    longitude: 77.3715,
    status: "reopened",
    report_count: 11,
  },
  {
    id: "issue-014",
    title: "Deep pothole on a Raj Nagar road",
    category: "pothole",
    severity: 4,
    latitude: 28.6816,
    longitude: 77.4358,
    status: "verified",
    report_count: 7,
  },
  {
    id: "issue-015",
    title: "Waterlogging near Ghaziabad Old Bus Stand",
    category: "waterlogging",
    severity: 4,
    latitude: 28.6692,
    longitude: 77.4538,
    status: "reported",
    report_count: 6,
  },
  {
    id: "issue-016",
    title: "Damaged civic fixture near Vaishali",
    category: "other",
    severity: 1,
    latitude: 28.6494,
    longitude: 77.3391,
    status: "resolved",
    report_count: 2,
  },
];
