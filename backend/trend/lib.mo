import Types "../types";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import BTree "mo:stableheapbtreemap/BTree";
import HashMap "mo:base/HashMap";

module Trend {

  /**
  * Processes a BTree of reports into daily, weekly, and monthly trend data.
  */
  public func getTrends(reports : BTree.BTree<Text, Types.Report>) : Types.AllTrends {
    let currentTime = Time.now();

    let oneDayInNanos : Nat = 24 * 60 * 60 * 1_000_000_000;
    let oneWeekInNanos : Nat = 7 * oneDayInNanos;
    let oneMonthInNanos : Nat = 30 * oneDayInNanos;

    let dailyBoundary = currentTime - oneDayInNanos;
    let weeklyBoundary = currentTime - oneWeekInNanos;
    let monthlyBoundary = currentTime - oneMonthInNanos;

    let dailyTrends = Buffer.Buffer<Types.ChartPoint>(0);
    let weeklyTrends = Buffer.Buffer<Types.ChartPoint>(0);
    let monthlyTrends = Buffer.Buffer<Types.ChartPoint>(0);

    var i : Nat = 0;
    for ((_, report) in BTree.entries(reports)) {
      let value = switch (Nat.fromText(report.presentage_confidence)) {
        case (?n) { n };
        case (null) { 0 };
      };

      let point : Types.ChartPoint = {
        name = "P" # Nat.toText(i);
        value = value;
      };
      i += 1;

      if (report.timestamp >= dailyBoundary) { dailyTrends.add(point) };
      if (report.timestamp >= weeklyBoundary) { weeklyTrends.add(point) };
      if (report.timestamp >= monthlyBoundary) { monthlyTrends.add(point) };
    };

    return {
      daily = Buffer.toArray(dailyTrends);
      weekly = Buffer.toArray(weeklyTrends);
      monthly = Buffer.toArray(monthlyTrends);
    };
  };

  /**
  * Aggregates reports by category to produce summary statistics.
  */
  public func getCategoryStatistics(reports : BTree.BTree<Text, Types.Report>) : [Types.CategoryStats] {
    let categoryMap = HashMap.HashMap<Text, Buffer.Buffer<Nat>>(0, Text.equal, Text.hash);

    for ((_, report) in BTree.entries(reports)) {
      let value = switch (Nat.fromText(report.presentage_confidence)) {
        case (?n) { n };
        case (null) { 0 };
      };

      switch (categoryMap.get(report.category)) {
        case (null) {
          let newBuffer = Buffer.Buffer<Nat>(1);
          newBuffer.add(value);
          categoryMap.put(report.category, newBuffer);
        };
        case (?existingBuffer) {
          existingBuffer.add(value);
        };
      };
    };

    let result = Buffer.Buffer<Types.CategoryStats>(0);
    for ((category, valuesBuffer) in categoryMap.entries()) {
      let values = Buffer.toArray(valuesBuffer);
      if (values.size() > 0) {
        var totalValue : Nat = 0;
        for (v in values.vals()) {
          totalValue += v;
        };

        let chartData = Buffer.Buffer<Types.ChartPoint>(0);
        let startIdx = if (values.size() > 5) { values.size() - 5 } else { 0 };
        let endIdx = values.size();

        var i = startIdx;
        while (i < endIdx) {
          chartData.add({
            name = "P" # Nat.toText(i);
            value = values[i];
          });
          i += 1;
        };

        var changes : Text = "+0";
        if (values.size() > 1) {
          let last = values[values.size() - 1];
          let secondLast = values[values.size() - 2];
          if (last >= secondLast) {
            changes := "+" # Nat.toText(last - secondLast);
          } else {
            changes := "-" # Nat.toText(secondLast - last);
          };
        };

        result.add({
          title = category;
          value = totalValue;
          chartData = Buffer.toArray(chartData);
          changes = changes;
        });
      };
    };

    Buffer.toArray(result);
  };
};
