import Types "../types";
import List "mo:core/List";

module {

  public func getAll(notices : List.List<Types.JobNotice>) : [Types.JobNotice] {
    notices.filter(func(n) { n.isActive }).toArray()
  };

  public func add(
    notices : List.List<Types.JobNotice>,
    state : { var nextJobNoticeId : Nat },
    title : Text,
    company : Text,
    description : Text,
    deadline : Text,
    salary : Text,
    location : Text
  ) : Types.JobNotice {
    let id = state.nextJobNoticeId;
    state.nextJobNoticeId += 1;
    let notice : Types.JobNotice = {
      id;
      title;
      company;
      description;
      deadline;
      salary;
      location;
      isActive = true;
    };
    notices.add(notice);
    notice
  };

  public func deactivate(notices : List.List<Types.JobNotice>, id : Types.JobNoticeId) : Bool {
    var found = false;
    notices.mapInPlace(func(n) {
      if (n.id == id) { found := true; { n with isActive = false } } else { n }
    });
    found
  };

};
