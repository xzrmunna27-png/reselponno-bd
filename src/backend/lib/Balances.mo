import Types "../types";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {

  public func getBalance(
    balances : Map.Map<Types.ResellerId, Types.ResellerBalance>,
    resellerId : Types.ResellerId
  ) : Types.ResellerBalance {
    switch (balances.get(resellerId)) {
      case (?b) b;
      case null {
        { resellerId; balance = 0; transactions = [] }
      };
    }
  };

  public func credit(
    balances : Map.Map<Types.ResellerId, Types.ResellerBalance>,
    resellerId : Types.ResellerId,
    amount : Int,
    description : Text
  ) {
    let current = getBalance(balances, resellerId);
    let tx : Types.BalanceTransaction = {
      amount;
      description;
      createdAt = Time.now();
    };
    let updated : Types.ResellerBalance = {
      resellerId;
      balance = current.balance + amount;
      transactions = current.transactions.concat([tx]);
    };
    balances.add(resellerId, updated);
  };

};
