import Types "../types";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";

module {

  public func getAll(products : List.List<Types.Product>, categoryFilter : Types.CategoryFilter) : [Types.Product] {
    let filtered = switch (categoryFilter) {
      case (#all) { products.filter(func(p) { p.isActive }) };
      case (#electronics) {
        products.filter(func(p) { p.isActive and p.category == #electronics })
      };
      case (#fashion) {
        products.filter(func(p) { p.isActive and p.category == #fashion })
      };
    };
    filtered.toArray()
  };

  public func search(products : List.List<Types.Product>, term : Text) : [Types.Product] {
    let lower = term.toLower();
    products.filter(func(p) {
      p.isActive and p.name.toLower().contains(#text lower)
    }).toArray()
  };

  public func getById(products : List.List<Types.Product>, id : Types.ProductId) : ?Types.Product {
    products.find(func(p) { p.id == id })
  };

  public func add(
    products : List.List<Types.Product>,
    state : { var nextProductId : Nat },
    name : Text,
    category : Types.ProductCategory,
    originalPrice : Nat,
    resellerPrice : Nat,
    sizes : [Text],
    stock : Nat,
    description : Text,
    imageEmoji : Text
  ) : Types.Product {
    let id = state.nextProductId;
    state.nextProductId += 1;
    let product : Types.Product = {
      id;
      name;
      category;
      originalPrice;
      resellerPrice;
      sizes;
      stock;
      description;
      imageEmoji;
      isActive = true;
    };
    products.add(product);
    product
  };

  public func edit(
    products : List.List<Types.Product>,
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
  ) : Bool {
    var found = false;
    products.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        {
          p with
          name;
          category;
          originalPrice;
          resellerPrice;
          sizes;
          stock;
          description;
          imageEmoji;
          isActive;
        }
      } else { p }
    });
    found
  };

  public func delete(products : List.List<Types.Product>, id : Types.ProductId) : Bool {
    var found = false;
    products.mapInPlace(func(p) {
      if (p.id == id) { found := true; { p with isActive = false } } else { p }
    });
    found
  };

};
