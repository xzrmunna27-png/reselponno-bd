import Types "../types";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  public func getAll(orders : List.List<Types.Order>) : [Types.Order] {
    orders.toArray()
  };

  public func getByReseller(orders : List.List<Types.Order>, resellerId : Types.ResellerId) : [Types.Order] {
    orders.filter(func(o) { o.resellerId == resellerId }).toArray()
  };

  public func place(
    orders : List.List<Types.Order>,
    state : { var nextOrderId : Nat },
    customerName : Text,
    customerPhone : Text,
    customerAddress : Text,
    location : Text,
    productId : Types.ProductId,
    size : Text,
    quantity : Nat,
    totalPrice : Nat,
    resellerId : Types.ResellerId
  ) : Types.Order {
    let id = state.nextOrderId;
    state.nextOrderId += 1;
    let order : Types.Order = {
      id;
      customerName;
      customerPhone;
      customerAddress;
      location;
      productId;
      size;
      quantity;
      totalPrice;
      status = #pending;
      createdAt = Time.now();
      resellerId;
    };
    orders.add(order);
    order
  };

  public func updateStatus(
    orders : List.List<Types.Order>,
    id : Types.OrderId,
    status : Types.OrderStatus
  ) : Bool {
    var found = false;
    orders.mapInPlace(func(o) {
      if (o.id == id) { found := true; { o with status } } else { o }
    });
    found
  };

};
