import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AlgoliaService {
  _indexName = "";
  _apiKey = null;
  _appId = null ;
   callBack ;
  AlgoliaUrl = "https://9khjlg93j1-dsn.algolia.net/1/indexes/*/queries";//"http://bhfngi9c92-dsn.algolia.net/1/indexes/products/query";

  constructor(private http: Http) { }
  setConfig(ApplicationID, apiKey) {

    this._apiKey = apiKey ;
    this._appId = ApplicationID;
  }

  indexName(index){
    this._indexName = index ;
  }

  search(queries, opts, callback) {
    this.callBack = callback;
    console.log( " callback "+this.callBack );

     var usage = 'Usage: client.search(arrayOfQueries[, callback])';

    return this.jsonRequest({params:queries});


};

jsonRequest(initialOpts) {
     var headers;
     var body ;

  if (

    initialOpts.body !== undefined &&
    (initialOpts.body.params !== undefined || // index.search()
    initialOpts.body.requests !== undefined) // client.search()
  ) {
    initialOpts.body.apiKey = this._apiKey;
    headers = this.computeRequestHeaders(false);
  } else {
    headers = this.computeRequestHeaders(true);
  }

  if (initialOpts.body !== undefined) {
    body = JSON.stringify(initialOpts.body);
  }

  let _headers = new Headers();
  _headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  let options = new RequestOptions({ headers: _headers });
  let params = initialOpts.params;
  params.indexName=this._indexName;

  params ={ requests:[{indexName:"S.Prod.UAE",params:{query:'ipad' ,hitsPerPage:24 ,maxValuesPerFacet:20, page:0, facets:['AEDPrice','ProductType','ScreenSize','OS','Internal','DisplayResolution','Brand','Color'] ,tagFilters:''}}]}



    let url = this.AlgoliaUrl+'?x-algolia-agent='+headers['x-algolia-agent']+'&x-algolia-application-id='+headers['x-algolia-application-id']+'&x-algolia-api-key='+headers['x-algolia-api-key'];

    return this.http.post(url, params, options).map(
    data => data.json() ,
    err => console.log(err)
  );

};
getSearchParams(args, params) {
  if (args === undefined || args === null) {
    return params;
  }
  for (var key in args) {
    if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
      params += params === '' ? '' : '&';
      params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? JSON.stringify(args[key]) : args[key]);
    }
  }
  return params;
};


computeRequestHeaders(withAPIKey) {


  var requestHeaders = {
    'x-algolia-agent': "Algolia for vanilla JavaScript (lite) 3.19.1;instantsearch.js 1.8.16",//"Algolia for vanilla JavaScript 3.8.1",
    'x-algolia-application-id': this._appId
  };

  // browser will inline headers in the url, node.js will use http headers
  // but in some situations, the API KEY will be too long (big secured API keys)
  // so if the request is a POST and the KEY is very long, we will be asked to not put
  // it into headers but in the JSON body
  if (withAPIKey !== false) {
    requestHeaders['x-algolia-api-key'] = this._apiKey;
  }

  return requestHeaders;
};

}
