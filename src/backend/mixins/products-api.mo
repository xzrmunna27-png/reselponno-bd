import Types "../types";
import ProductsLib "../lib/Products";
import List "mo:core/List";

mixin (
  products : List.List<Types.Product>,
  state : { var nextProductId : Nat }
) {

  public query func getProducts(categoryFilter : Types.CategoryFilter) : async [Types.Product] {
    ProductsLib.getAll(products, categoryFilter)
  };

  public query func searchProducts(term : Text) : async [Types.Product] {
    ProductsLib.search(products, term)
  };

  public query func getProductById(id : Types.ProductId) : async ?Types.Product {
    ProductsLib.getById(products, id)
  };

  public func adminAddProduct(
    adminPassword : Text,
    name : Text,
    category : Types.ProductCategory,
    originalPrice : Nat,
    resellerPrice : Nat,
    sizes : [Text],
    stock : Nat,
    description : Text,
    imageEmoji : Text
  ) : async Types.Product {
    if (adminPassword != "MUNNA12061") { Runtime.trap("Unauthorized") };
    ProductsLib.add(products, state, name, category, originalPrice, resellerPrice, sizes, stock, description, imageEmoji)
  };

  public func adminEditProduct(
    adminPassword : Text,
    id : Types.ProductId,
    name : Text,
    category : Types.ProductCategory,
    originalPrice : Nat,
    resellerPrice : Nat,
    sizes : [Text],
    stock : Nat,
    description : Text,
    imageEmoji : Text,
    isActive : Bool
  ) : async Bool {
    if (adminPassword != "MUNNA12061") { Runtime.trap("Unauthorized") };
    ProductsLib.edit(products, id, name, category, originalPrice, resellerPrice, sizes, stock, description, imageEmoji, isActive)
  };

  public func adminDeleteProduct(adminPassword : Text, id : Types.ProductId) : async Bool {
    if (adminPassword != "MUNNA12061") { Runtime.trap("Unauthorized") };
    ProductsLib.delete(products, id)
  };

};
