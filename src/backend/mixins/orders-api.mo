import Types "../types";
import OrdersLib "../lib/Orders";
import ResellersLib "../lib/Resellers";
import ProductsLib "../lib/Products";
import BalancesLib "../lib/Balances";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

mixin (
  orders : List.List<Types.Order>,
  products : List.List<Types.Product>,
  resellers : List.List<Types.Reseller>,
  balances : Map.Map<Types.ResellerId, Types.ResellerBalance>,
  state : { var nextOrderId : Nat }
) {

  public query func getOrders() : async [Types.Order] {
    OrdersLib.getAll(orders)
  };

  public query func getOrdersByReseller(resellerId : Types.ResellerId) : async [Types.Order] {
    OrdersLib.getByReseller(orders, resellerId)
  };

  public func placeOrder(
    customerName : Text,
    customerPhone : Text,
    customerAddress : Text,
    location : Text,
    productId : Types.ProductId,
    size : Text,
    quantity : Nat,
    resellerId : Types.ResellerId
  ) : async Types.Order {
    let product = switch (ProductsLib.getById(products, productId)) {
      case (?p) p;
      case null { Runtime.trap("Product not found") };
    };
    let totalPrice = product.resellerPrice * quantity;
    let order = OrdersLib.place(orders, state, customerName, customerPhone, customerAddress, location, productId, size, quantity, totalPrice, resellerId);
    let profit : Nat = 0; // reseller earns from markup set externally
    ResellersLib.incrementStats(resellers, resellerId, profit);
    BalancesLib.credit(balances, resellerId, profit.toInt(), "Order #" # order.id.toText());
    order
  };

  public func adminUpdateOrderStatus(
    adminPassword : Text,
    id : Types.OrderId,
    status : Types.OrderStatus
  ) : async Bool {
    if (adminPassword != "MUNNA12061") { Runtime.trap("Unauthorized") };
    OrdersLib.updateStatus(orders, id, status)
  };

  public query func adminGetAllOrders(adminPassword : Text) : async [Types.Order] {
    if (adminPassword != "MUNNA12061") { Runtime.trap("Unauthorized") };
    OrdersLib.getAll(orders)
  };

};
