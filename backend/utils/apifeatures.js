class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const exampleCopy = this.queryStr; //! Basad ho jayega
    const queryStrCopy = { ...this.queryStr };
    const removedFields = ["keyword", "page", "limit","resultsPerPage"];
    removedFields.forEach((key) => delete queryStrCopy[key]);

    // filter for price and rating
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resultsPerPage){
    console.log("pagination",resultsPerPage)
    const currentPage=Number(this.queryStr.page)||1;
    const skip=resultsPerPage*(currentPage-1)
    this.query=this.query.limit(resultsPerPage).skip(skip)
    return this

  }
}
module.exports = ApiFeatures;
