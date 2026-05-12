import Time "mo:core/Time";

module {
  public type ProductId = Nat;
  public type OrderId = Nat;
  public type ResellerId = Nat;
  public type JobNoticeId = Nat;
  public type RechargeId = Nat;
  public type Timestamp = Int;

  public type ProductCategory = { #electronics; #fashion };

  public type Product = {
    id : ProductId;
    name : Text;
    category : ProductCategory;
    originalPrice : Nat;
    resellerPrice : Nat;
    sizes : [Text];
    stock : Nat;
    description : Text;
    imageEmoji : Text;
    isActive : Bool;
  };

  public type OrderStatus = {
    #pending;
    #confirmed;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type Order = {
    id : OrderId;
    customerName : Text;
    customerPhone : Text;
    customerAddress : Text;
    location : Text;
    productId : ProductId;
    size : Text;
    quantity : Nat;
    totalPrice : Nat;
    status : OrderStatus;
    createdAt : Timestamp;
    resellerId : ResellerId;
  };

  public type Reseller = {
    id : ResellerId;
    name : Text;
    phone : Text;
    email : Text;
    address : Text;
    joinedAt : Timestamp;
    isActive : Bool;
    totalOrders : Nat;
    totalEarnings : Nat;
  };

  public type JobNotice = {
    id : JobNoticeId;
    title : Text;
    company : Text;
    description : Text;
    deadline : Text;
    salary : Text;
    location : Text;
    isActive : Bool;
  };

  public type RechargeOperator = {
    #grameenphone;
    #banglalink;
    #robi;
    #airtel;
    #teletalk;
  };

  public type RechargeStatus = { #pending; #completed; #failed };

  public type MobileRecharge = {
    id : RechargeId;
    phone : Text;
    operator : RechargeOperator;
    amount : Nat;
    status : RechargeStatus;
    createdAt : Timestamp;
  };

  public type BalanceTransaction = {
    amount : Int;
    description : Text;
    createdAt : Timestamp;
  };

  public type ResellerBalance = {
    resellerId : ResellerId;
    balance : Int;
    transactions : [BalanceTransaction];
  };

  // Shared (API boundary) versions
  public type CategoryFilter = { #all; #electronics; #fashion };
};
