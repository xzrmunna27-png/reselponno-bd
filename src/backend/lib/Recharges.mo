import Types "../types";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  public func getAll(recharges : List.List<Types.MobileRecharge>) : [Types.MobileRecharge] {
    recharges.toArray()
  };

  public func submit(
    recharges : List.List<Types.MobileRecharge>,
    state : { var nextRechargeId : Nat },
    phone : Text,
    operator : Types.RechargeOperator,
    amount : Nat
  ) : Types.MobileRecharge {
    let id = state.nextRechargeId;
    state.nextRechargeId += 1;
    let recharge : Types.MobileRecharge = {
      id;
      phone;
      operator;
      amount;
      status = #pending;
      createdAt = Time.now();
    };
    recharges.add(recharge);
    recharge
  };

};
