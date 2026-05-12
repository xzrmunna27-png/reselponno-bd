import Types "../types";
import ProductsLib "./Products";
import JobNoticesLib "./JobNotices";
import List "mo:core/List";

module {

  public func seed(
    products : List.List<Types.Product>,
    notices : List.List<Types.JobNotice>,
    productState : { var nextProductId : Nat },
    noticeState : { var nextJobNoticeId : Nat }
  ) {
    // Electronics
    ignore ProductsLib.add(
      products, productState,
      "Samsung Galaxy A54", #electronics,
      35000, 32000, [], 50,
      "সর্বশেষ স্যামসাং গ্যালাক্সি A54 স্মার্টফোন। ৫০ মেগাপিক্সেল ক্যামেরা সহ।",
      "📱"
    );
    ignore ProductsLib.add(
      products, productState,
      "JBL Headphones", #electronics,
      3500, 2800, [], 100,
      "JBL ওয়্যারলেস হেডফোন। গভীর বেস ও ক্রিস্টাল ক্লিয়ার সাউন্ড।",
      "🎧"
    );
    ignore ProductsLib.add(
      products, productState,
      "iPhone 15 Back Cover", #electronics,
      500, 350, [], 200,
      "আইফোন ১৫ এর জন্য প্রিমিয়াম মানের ব্যাক কভার।",
      "📦"
    );
    ignore ProductsLib.add(
      products, productState,
      "Xiaomi Redmi Note 13", #electronics,
      22000, 19500, [], 75,
      "শাওমি রেডমি নোট ১৩। ৬৪ মেগাপিক্সেল ক্যামেরা ও ৫০০০ mAh ব্যাটারি।",
      "📲"
    );
    // Fashion T-Shirts
    let tshirtSizes = ["S", "M", "L", "XL", "XXL"];
    ignore ProductsLib.add(
      products, productState,
      "White Polo T-Shirt", #fashion,
      350, 250, tshirtSizes, 150,
      "উচ্চমানের সাদা পোলো টি-শার্ট। সব বয়সের জন্য উপযুক্ত।",
      "👕"
    );
    ignore ProductsLib.add(
      products, productState,
      "Black Graphic T-Shirt", #fashion,
      400, 300, tshirtSizes, 120,
      "স্টাইলিশ কালো গ্রাফিক টি-শার্ট। ট্রেন্ডি ডিজাইন।",
      "🖤"
    );
    ignore ProductsLib.add(
      products, productState,
      "Red Sports T-Shirt", #fashion,
      450, 350, tshirtSizes, 100,
      "লাল স্পোর্টস টি-শার্ট। ড্রাই-ফিট কাপড়।",
      "🔴"
    );
    ignore ProductsLib.add(
      products, productState,
      "Blue Casual T-Shirt", #fashion,
      380, 280, tshirtSizes, 130,
      "নীল ক্যাজুয়াল টি-শার্ট। আরামদায়ক ও মসৃণ কাপড়।",
      "🔵"
    );
    ignore ProductsLib.add(
      products, productState,
      "Green Premium T-Shirt", #fashion,
      500, 400, tshirtSizes, 90,
      "সবুজ প্রিমিয়াম টি-শার্ট। উচ্চমানের সুতা ও কারুকাজ।",
      "🟢"
    );
    ignore ProductsLib.add(
      products, productState,
      "Yellow Striped T-Shirt", #fashion,
      420, 320, tshirtSizes, 110,
      "হলুদ স্ট্রাইপ টি-শার্ট। গ্রীষ্মকালীন পোশাকের জন্য আদর্শ।",
      "🟡"
    );
    // Job Notices
    ignore JobNoticesLib.add(
      notices, noticeState,
      "সফটওয়্যার ডেভেলপার নিয়োগ",
      "টেক বাংলাদেশ লিমিটেড",
      "আমাদের কোম্পানিতে অভিজ্ঞ সফটওয়্যার ডেভেলপার প্রয়োজন। React, Node.js ও MySQL জানা আবশ্যক।",
      "৩১ মে ২০২৬",
      "২৫,০০০ - ৪৫,০০০ টাকা",
      "ঢাকা"
    );
    ignore JobNoticesLib.add(
      notices, noticeState,
      "গ্রাফিক ডিজাইনার চাই",
      "ক্রিয়েটিভ স্টুডিও BD",
      "ফ্রিল্যান্স ও ফুল-টাইম গ্রাফিক ডিজাইনার নিয়োগ। Adobe Photoshop ও Illustrator দক্ষতা আবশ্যক।",
      "১৫ জুন ২০২৬",
      "২০,০০০ - ৩৫,০০০ টাকা",
      "চট্টগ্রাম"
    );
    ignore JobNoticesLib.add(
      notices, noticeState,
      "অ্যাকাউন্টেন্ট নিয়োগ",
      "আল-আমিন ট্রেডার্স",
      "অভিজ্ঞ অ্যাকাউন্টেন্ট প্রয়োজন। Tally ও MS Excel দক্ষতা আবশ্যক।",
      "২০ জুন ২০২৬",
      "১৫,০০০ - ২৫,০০০ টাকা",
      "সিলেট"
    );
  };

};
