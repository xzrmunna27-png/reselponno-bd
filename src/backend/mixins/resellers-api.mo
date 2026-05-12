import Types "../types";
import ResellersLib "../lib/Resellers";
import BalancesLib "../lib/Balances";
import List "mo:core/List";
import Map "mo:core/Map";

mixin (
  resellers : List.List<Types.Reseller>,
  balances : Map.Map<Types.ResellerId, Types.ResellerBalance>,
  state : { var nextResellerId : Nat }
) {

  public func createResellerAccount(
    name : Text,
    phone : Text,
    email : Text,
    address : Text
  ) : async Types.Reseller {
    ResellersLib.create(resellers, state, name, phone, email, address)
  };

  public query func getResellerById(id : Types.ResellerId) : async ?Types.Reseller {
    ResellersLib.getById(resellers, id)
  };

  public query func adminGetAllResellers(adminPassword : Text) : async [Types.Reseller] {
    if (adminPassword != "MUNNA12061") { Runtime.trap("Unauthorized") };
    ResellersLib.getAll(resellers)
  };

  public query func getResellerBalance(resellerId : Types.ResellerId) : async Types.ResellerBalance {
    BalancesLib.getBalance(balances, resellerId)
  };

};
