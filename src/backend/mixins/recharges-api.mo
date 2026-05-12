import Types "../types";
import RechargesLib "../lib/Recharges";
import List "mo:core/List";

mixin (
  recharges : List.List<Types.MobileRecharge>,
  state : { var nextRechargeId : Nat }
) {

  public func submitRecharge(
    phone : Text,
    operator : Types.RechargeOperator,
    amount : Nat
  ) : async Types.MobileRecharge {
    RechargesLib.submit(recharges, state, phone, operator, amount)
  };

  public query func adminGetAllRecharges(adminPassword : Text) : async [Types.MobileRecharge] {
    if (adminPassword != "MUNNA12061") { Runtime.trap("Unauthorized") };
    RechargesLib.getAll(recharges)
  };

};
