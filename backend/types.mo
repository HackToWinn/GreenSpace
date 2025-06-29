import Time "mo:base/Time";
import Principal "mo:base/Principal";
module {
  public type UserId = Principal;
  public type User = {
    id : UserId;
    pictureCid : Text;
    username : Text;
    email : Text;
    joinedAt : Time.Time;
  };
  public type Location = {
    latitude : Float;
    longitude : Float;
  };
  public type Report = {
    id : Text;
    user : UserId;
    category : Text;
    description : Text;
    title : Text;
    confidence : Text;
    presentage_confidence : Text;
    location : Text;
    coordinates : Location;
    imageCid : Text;
    timestamp : Time.Time;
    status : Text;
    rewardGiven : ?Float;
  };

  public type Comment = {
    id : Text;
    reportId : Text;
    message : Text;
    userId : UserId;
    rating : Float;
  };

  public type TrendData = {
    timestamp : Int;
    value : Float;
    category : Text;
  };

  public type ChartPoint = {
    name : Text;
    value : Nat;
  };

  public type AllTrends = {
    daily : [ChartPoint];
    weekly : [ChartPoint];
    monthly : [ChartPoint];
  };

  public type CategoryStats = {
    title : Text;
    value : Nat; // Total value for the category
    chartData : [ChartPoint]; // Data for the category's mini-chart
    changes : Text; // A string representing change, e.g., "+5" or "-2"
  };

};
