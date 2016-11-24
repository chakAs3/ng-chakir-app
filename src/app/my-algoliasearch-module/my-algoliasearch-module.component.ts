import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'app-my-algoliasearch-module',
  templateUrl: './my-algoliasearch-module.component.html',
  styleUrls: ['./my-algoliasearch-module.component.css']
})
export class MyAlgoliasearchModuleComponent implements OnInit {
  _indexName = "";
  _apiKey = null;
  _appId = null ;
  hits =[];
  AlgoliaUrl = "http://bhfngi9c92-dsn.algolia.net/1/indexes/products/query";

  callBack ;

  constructor(private http: Http) {


  }

  setConfig(ApplicationID, apiKey) {

    this._apiKey = apiKey ;
    this._appId = ApplicationID;
  }

  ngOnInit() {
  }

  indexName(index){
    this._indexName = index ;
  }

  search(queries, opts, callback) {
    this.callBack = callback;
    console.log( " callback "+this.callBack );

     var usage = 'Usage: client.search(arrayOfQueries[, callback])';

     this.jsonRequest({params:queries});


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



    let url = this.AlgoliaUrl+'?x-algolia-agent='+headers['x-algolia-agent']+'&x-algolia-application-id='+headers['x-algolia-application-id']+'&x-algolia-api-key='+headers['x-algolia-api-key'];

    this.http.post(url, params, options).subscribe(
    data => this.callBack( data.json()) ,
    err => console.log(err),
    () => console.log('Call Complete '+this.callBack)
  );

};

private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return errMsg;

}
private extractData(res: Response) {
    let body = res.json();
    console.log(" extractData "+body);
    this.hits = body.hits;

    console.log(this+"  "+this._indexName);

    return body.data || { };
  }


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
    'x-algolia-agent': "Algolia for vanilla JavaScript 3.8.1",
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
