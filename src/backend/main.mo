import Types "types";
import ProductsMixin "mixins/products-api";
import OrdersMixin "mixins/orders-api";
import ResellersMixin "mixins/resellers-api";
import JobNoticesMixin "mixins/jobnotices-api";
import RechargesMixin "mixins/recharges-api";
import Demo "lib/Demo";
import List "mo:core/List";
import Map "mo:core/Map";

actor {
  // State
  let products = List.empty<Types.Product>();
  let orders = List.empty<Types.Order>();
  let resellers = List.empty<Types.Reseller>();
  let notices = List.empty<Types.JobNotice>();
  let recharges = List.empty<Types.MobileRecharge>();
  let balances = Map.empty<Types.ResellerId, Types.ResellerBalance>();

  let state = {
    var nextProductId : Nat = 0;
    var nextOrderId : Nat = 0;
    var nextResellerId : Nat = 0;
    var nextJobNoticeId : Nat = 0;
    var nextRechargeId : Nat = 0;
    var seeded : Bool = false;
  };

  // Seed demo data on first run
  if (not state.seeded) {
    state.seeded := true;
    Demo.seed(products, notices, state, state);
  };

  // Mixins
  include ProductsMixin(products, state);
  include OrdersMixin(orders, products, resellers, balances, state);
  include ResellersMixin(resellers, balances, state);
  include JobNoticesMixin(notices, state);
  include RechargesMixin(recharges, state);

  // Admin auth check
  public query func adminLogin(password : Text) : async Bool {
    password == "MUNNA12061"
  };
};

