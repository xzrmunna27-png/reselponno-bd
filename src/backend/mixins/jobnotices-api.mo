import Types "../types";
import JobNoticesLib "../lib/JobNotices";
import List "mo:core/List";

mixin (
  notices : List.List<Types.JobNotice>,
  state : { var nextJobNoticeId : Nat }
) {

  public query func getJobNotices() : async [Types.JobNotice] {
    JobNoticesLib.getAll(notices)
  };

  public func adminAddJobNotice(
    adminPassword : Text,
    title : Text,
    company : Text,
    description : Text,
    deadline : Text,
    salary : Text,
    location : Text
  ) : async Types.JobNotice {
    if (adminPassword != "MUNNA12061") { Runtime.trap("Unauthorized") };
    JobNoticesLib.add(notices, state, title, company, description, deadline, salary, location)
  };

  public func adminDeactivateJobNotice(adminPassword : Text, id : Types.JobNoticeId) : async Bool {
    if (adminPassword != "MUNNA12061") { Runtime.trap("Unauthorized") };
    JobNoticesLib.deactivate(notices, id)
  };

};
