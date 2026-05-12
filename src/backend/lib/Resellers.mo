import Types "../types";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  public func getAll(resellers : List.List<Types.Reseller>) : [Types.Reseller] {
    resellers.toArray()
  };

  public func getById(resellers : List.List<Types.Reseller>, id : Types.ResellerId) : ?Types.Reseller {
    resellers.find(func(r) { r.id == id })
  };

  public func create(
    resellers : List.List<Types.Reseller>,
    state : { var nextResellerId : Nat },
    name : Text,
    phone : Text,
    email : Text,
    address : Text
  ) : Types.Reseller {
    let id = state.nextResellerId;
    state.nextResellerId += 1;
    let reseller : Types.Reseller = {
      id;
      name;
      phone;
      email;
      address;
      joinedAt = Time.now();
      isActive = true;
      totalOrders = 0;
      totalEarnings = 0;
    };
    resellers.add(reseller);
    reseller
  };

  public func incrementStats(
    resellers : List.List<Types.Reseller>,
    id : Types.ResellerId,
    earnings : Nat
  ) {
    resellers.mapInPlace(func(r) {
      if (r.id == id) {
        { r with totalOrders = r.totalOrders + 1; totalEarnings = r.totalEarnings + earnings }
      } else { r }
    })
  };

};
