export const idlFactory = ({ IDL }) => {
  const UserId = IDL.Principal;
  const Time = IDL.Int;
  const Location = IDL.Record({
    'latitude' : IDL.Float64,
    'longitude' : IDL.Float64,
  });
  const Report = IDL.Record({
    'id' : IDL.Text,
    'status' : IDL.Text,
    'title' : IDL.Text,
    'user' : UserId,
    'description' : IDL.Text,
    'imageCid' : IDL.Text,
    'rewardGiven' : IDL.Opt(IDL.Float64),
    'timestamp' : Time,
    'category' : IDL.Text,
    'presentage_confidence' : IDL.Text,
    'confidence' : IDL.Text,
    'location' : IDL.Text,
    'coordinates' : Location,
  });
  const ChartPoint = IDL.Record({ 'value' : IDL.Nat, 'name' : IDL.Text });
  const CategoryStats = IDL.Record({
    'title' : IDL.Text,
    'chartData' : IDL.Vec(ChartPoint),
    'value' : IDL.Nat,
    'changes' : IDL.Text,
  });
  const User = IDL.Record({
    'id' : UserId,
    'username' : IDL.Text,
    'pictureCid' : IDL.Text,
    'joinedAt' : Time,
    'email' : IDL.Text,
  });
  const AllTrends = IDL.Record({
    'monthly' : IDL.Vec(ChartPoint),
    'daily' : IDL.Vec(ChartPoint),
    'weekly' : IDL.Vec(ChartPoint),
  });
  return IDL.Service({
    'addReport' : IDL.Func([IDL.Text, Report], [], []),
    'addUser' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Record({ 'error' : IDL.Opt(IDL.Text), 'success' : IDL.Bool })],
        [],
      ),
    'getCategoryStatistics' : IDL.Func([], [IDL.Vec(CategoryStats)], ['query']),
    'getLatestReports' : IDL.Func([], [IDL.Vec(Report)], []),
    'getMostReportedCategory' : IDL.Func([], [IDL.Opt(IDL.Text)], []),
    'getMyProfile' : IDL.Func([], [IDL.Opt(User)], []),
    'getReport' : IDL.Func([IDL.Text], [IDL.Opt(Report)], []),
    'getReportByUser' : IDL.Func([], [IDL.Vec(Report)], []),
    'getReportsThisWeek' : IDL.Func([], [IDL.Vec(Report)], []),
    'getTrends' : IDL.Func([], [AllTrends], ['query']),
    'getUsers' : IDL.Func([], [IDL.Vec(User)], []),
    'getValidReportCount' : IDL.Func([], [IDL.Nat], []),
    'getValidReports' : IDL.Func([], [IDL.Vec(Report)], []),
    'getValidWeeklyReportCount' : IDL.Func([], [IDL.Nat], []),
    'updateUser' : IDL.Func(
        [IDL.Opt(IDL.Text), IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [IDL.Record({ 'error' : IDL.Opt(IDL.Text), 'success' : IDL.Bool })],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
