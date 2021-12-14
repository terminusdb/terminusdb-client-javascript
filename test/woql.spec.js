const expect = require('chai').expect;

var WOQL = require('../lib/woql');
var {Var} = require('../lib/query/woqlDoc');

const idGenJson = require('./woqlJson/woqlIdgenJson');
const woqlStarJson = require('./woqlJson/woqlStarJson');
const woqlInsertJson = require('./woqlJson/woqlInsertJson');
const woqlDoctypeJson = require('./woqlJson/woqlDoctypeJson');
const woqlAndJson = require('./woqlJson/woqlAndJson');
const woqlOrJson = require('./woqlJson/woqlOrJson');
const woqlWhenJson = require('./woqlJson/woqlWhenJson');
const woqlOptJson = require('./woqlJson/woqlOptJson')
const woqlSelectJson = require('./woqlJson/woqlSelectJson')
const woqlTrimJson = require('./woqlJson/woqlTrimJson')
const woqlMathJson = require('./woqlJson/woqlMathJson')
const woqlCastJson = require('./woqlJson/woqlCastJson')
const woqlConcatJson = require('./woqlJson/woqlConcatJson')
const woqlReJson = require('./woqlJson/woqlReJson')
const woqlJoinSplitJson = require('./woqlJson/woqlJoinSplitJson')
const woqlJson= require('./woqlJson/woqlJson')

describe('woql queries', function () {


	it('check the start properties values',function(){

		const woqlObject=WOQL.query();
		expect(woqlObject.chain_ended).to.equal(false);
		expect(woqlObject.contains_update).to.equal(false);
	})

  it('check the insert method',function(){

		const woqlObject=WOQL.insert("v:Bike_URL", "Bicycle");
    const woqlObjectDB=WOQL.insert("v:Bike_URL", "Bicycle", "myDB");


    const jsonObjDB={ "add_quad": [ 'v:Bike_URL', 'rdf:type', '@schema:Bicycle', 'db:myDB' ] };

    expect(woqlObject.json()).to.eql(woqlInsertJson.onlyNode);
    //expect(woqlObjectDB.json()).to.eql(jsonObjDB);


     //console.log(JSON.stringify(woqlObject.json(), null, 4));
	})

  it('check the limit method',function(){
    const woqlObject=WOQL.limit(10);

    const limitJson={}
    expect(woqlObject.json()).to.eql(limitJson);
	})

	it('check the start method',function(){

		const woqlObject=WOQL.limit(10).start(0);


		/*const jsonObj={"@type": "woql:Limit",
                  "woql:limit": {
                      "@type": "woql:DataValue",
                      "woql:datatype": {
                          "@type": "xsd:nonNegativeInteger",
                          "@value": 10
                      }
                  },
                  "woql:query": {
                      "@type": "woql:Start",
                      "woql:start": {
                          "@type": "woql:DataValue",
                          "woql:datatype": {
                              "@type": "xsd:nonNegativeInteger",
                              "@value": 0
                          }
                      },
                      "woql:query": {}
                  }
              }*/


		//expect(woqlObject.json()).to.eql({});

	})

  it('check the not method',function(){

		const woqlObject=WOQL.not(WOQL.triple("a", "b", "c"));

    const woqlObjectChain=WOQL.not().triple("a", "b", "c");
		const jsonObj={"@type": "Not",
                  "query": {
                      "@type": "Triple",
                      "subject": {
                          "@type": "NodeValue",
                          "node": "a"
                      },
                      "predicate": {
                          "@type": "NodeValue",
                          "node": "b"
                      },
                      "object": {
                          "@type": "Value",
                          "node": "c"
                      }
                  }
              }

		expect(woqlObject.json()).to.eql(jsonObj);
    expect(woqlObjectChain.json()).to.eql(jsonObj);

	})


  it('check the and method',function(){
		const woqlObject=WOQL.and(WOQL.triple("a", "b", "c"),WOQL.triple("1", "2", "3"));
    //console.log(woqlObject.json());
		expect(woqlObject.json()).to.eql(woqlAndJson);
	})


  it('check the or method',function(){
		const woqlObject=WOQL.or(WOQL.triple("a", "b", "c"),WOQL.triple("1", "2", "3"));
		expect(woqlObject.json()).to.eql(woqlOrJson);
	})

  it('check the opt method',function(){

		const woqlObject=WOQL.opt(WOQL.triple("a", "b", "c"));

    const woqlObjectChain=WOQL.opt().triple("a", "b", "c");

    //console.log(JSON.stringify(woqlObjectChain.json(), null, 4));

		expect(woqlObject.json()).to.eql(woqlOptJson);
    expect(woqlObjectChain.json()).to.eql(woqlOptJson);
	})

  it('check the from method',function(){

    const WOQLQuery=WOQL.limit(10);

    const woqlObjectChain=WOQL.from("http://dburl").limit(10);
    const woqlObject=WOQL.from("http://dburl", WOQLQuery);
    const jsonObj={
                    "@type": "From",
                    "graph": "http://dburl",
                    "query": {
                        "@type": "Limit",
                        "limit": 10,
                        "query": {}
                    }
                }

    //expect(woqlObject.json()).to.eql(jsonObj);
    //expect(woqlObjectChain.json()).to.eql(jsonObj);

  })


  it('check the star method',function(){

    const woqlObject=WOQL.limit(10).star();

    expect(woqlObject.json()).to.eql(woqlStarJson);

  })


  it('check the select method',function(){

		const woqlObject=WOQL.select("V1", WOQL.triple("a", "b", "c"));
    const woqlObjectMultiple=WOQL.select("V1", "V2", WOQL.triple("a", "b", "c"));

    const woqlObjectChain=WOQL.select("V1").triple("a", "b", "c");
    const woqlObjectChainMultiple=WOQL.select("V1","V2").triple("a", "b", "c");


    //console.log(JSON.stringify(woqlObjectMultiple.json(), null, 4));

	  expect(woqlObject.json()).to.eql(woqlSelectJson.jsonObj);
    expect(woqlObjectChain.json()).to.eql(woqlSelectJson.jsonObj);
    expect(woqlObjectMultiple.json()).to.eql(woqlSelectJson.jsonObjMulti);
    expect(woqlObjectChainMultiple.json()).to.eql(woqlSelectJson.jsonObjMulti);

	})

  it('check the eq method',function(){

    const woqlObject=WOQL.eq("a","b");

    const jsonObj={ "@type": "Equals",
                    "left": {
                          "@type": "Value",
                          "node": "a"
                    },
                    "right": {
                          "@type": "Value",
                          "node": "b"
                    }
                  }

    expect(woqlObject.json()).to.eql(jsonObj);

  })

  it('check the trim method',function(){

    const woqlObject=WOQL.trim("a","b");
    const jsonObj={ trim: [ "a", "b" ] };

    expect(woqlObject.json()).to.eql(woqlTrimJson);

  })

  it('check the eval method',function(){

    const woqlObject=WOQL.eval("1+2","b");
    expect(woqlObject.json()).to.eql(woqlMathJson.evalJson);

  })

  it('check the minus method',function(){

    const woqlObject=WOQL.minus("2","1");
    expect(woqlObject.json()).to.eql(woqlMathJson.minusJson);

  })

  it('check the plus method',function(){

    const woqlObject=WOQL.plus("2","1");

    const jsonObj={ plus: [ '2', '1' ] };
    expect(woqlObject.json()).to.eql(woqlMathJson.plusJson);

  })

  it('check the times method',function(){

    const woqlObject=WOQL.times("2","1");
    expect(woqlObject.json()).to.eql(woqlMathJson.timesJson);

  })

  it('check the divide method',function(){

    const woqlObject=WOQL.divide("2","1");
    expect(woqlObject.json()).to.eql(woqlMathJson.divideJson);

  })

  it('check the div method',function(){

    const woqlObject=WOQL.div("2","1");
    expect(woqlObject.json()).to.eql(woqlMathJson.divJson);

  })

  it('check the exp method',function(){

    const woqlObject=WOQL.exp("2","1");
    const jsonObj={ exp: [ '2', '1' ] };
    expect(woqlObject.json()).to.eql(woqlMathJson.expJson);

  })

  it('check the get method',function(){

    const woqlObject=WOQL.get("Map", "Target");

    //const jsonObj={ "@type": "Get", "as_vars": "Map", "query_resource": "Target"}

    expect(woqlObject.json()).to.eql(woqlJson.getJson);

    //console.log(JSON.stringify(woqlObject.json(), null, 4))

  })

  it('check the remote method',function(){

    const woqlObject=WOQL.remote("http://url");

    const jsonObj={ "@type": "QueryResource",
                    "source": {
                      "@type": "Source",
                      "url": "http://url"
                    },
                    "format" : "csv"
                  }

    //console.log(JSON.stringify(woqlObject.json(), null, 4));
    expect(woqlObject.json()).to.eql(jsonObj);

  })

  it('check the idgen method',function(){

    const woqlObject=WOQL.idgen("Station",["v:Start_ID","v:End_ID"],"v:Start_Station_URL");

    //console.log("____ID___GEN___",JSON.stringify(woqlObject.json(), null, 4));

    expect(woqlObject.json()).to.eql(idGenJson);

  })

  it('check the typecast method',function(){

    const woqlObject=WOQL.typecast("v:Duration", "xsd:integer", "v:Duration_Cast");

    const jsonObj={'@type': 'Typecast',
                   'value': {
                       '@type': 'Value',
                       'variable': 'Duration'
                   },
                   'type': { '@type': 'NodeValue', 'node': 'xsd:integer' },
                   'result': {
                       '@type': 'Value',
                       'variable': 'Duration_Cast'
                   }
                }

    expect(woqlObject.json()).to.eql(jsonObj);

  })

  it('check the cast method',function(){

    const woqlObject=WOQL.cast("v:Duration", "xsd:integer", "v:Duration_Cast");

    //console.log(JSON.stringify(woqlObject.json(), null, 4));
    expect(woqlObject.json()).to.eql(woqlCastJson);

  })

  it('check the concat method',function(){

    const woqlObject=WOQL.concat("v:Duration yo v:Duration_Cast", "x");
    expect(woqlObject.json()).to.eql(woqlConcatJson);

  })

  it('check the re method',function(){

    const woqlObject=WOQL.re(".*", "v:string", "v:formated");
    expect(woqlObject.json()).to.eql(woqlReJson);

  })

  it('check the join method',function(){

    const woqlObject=WOQL.join(["v:A_obj", "v:B_obj"], ", ", "v:output");
    expect(woqlObject.json()).to.eql(woqlJoinSplitJson.joinJson);

  })

  it('check the split method',function(){

    const woqlObject=WOQL.split("A, B, C", ", ", "v:list_obj");

    expect(woqlObject.json()).to.eql(woqlJoinSplitJson.splitJson);

  })

  it('check the member method',function(){

    const woqlObject=WOQL.member("v:member", "v:list_obj");
    const jsonObj={ 'member': [ 'v:member', 'v:list_obj' ] };

    expect(woqlObject.json()).to.eql(woqlJson.memberJson);

  })

  it('check the group_by method',function(){
    const woqlObject=WOQL.group_by(["v:A", "v:B"],["v:C"],"v:New");
    const woqlObject01=WOQL.group_by(["v:A", "v:B"],["v:C"],"v:New").triple("v:A", "v:B", "v:C");

    expect(woqlObject01.json()).to.eql(woqlJson.groupbyJson);
    expect(woqlObject.json()).to.eql({});

    //console.log(JSON.stringify(woqlObject01.json(), null, 4));
  })

  it('check the order_by method',function(){
    const woqlObject=WOQL.order_by("v:A", "v:B", "v:C");

    expect(woqlObject.json()).to.eql({});


    const woqlObject01=WOQL.order_by("v:A", "v:B", "v:C").triple("v:A", "v:B", "v:C");

    expect(woqlObject01.json()).to.eql(woqlJson.orderbyJson);

    //console.log(JSON.stringify(woqlObject01.json(), null, 4));
  })

  it('check the read_document method',function(){
    const woqlObject=WOQL.read_document("A", "B", {});

    expect(woqlObject.json()).to.eql(woqlJson.readDocJson);
  })

  it('check the insert_document method',function(){
    const woqlObject=WOQL.insert_document("A", "B");

    expect(woqlObject.json()).to.eql(woqlJson.insertDocJson);
  })

  it('check the update_document method',function(){
    const woqlObject=WOQL.update_document("A", "B");

    expect(woqlObject.json()).to.eql(woqlJson.updateDocJson);
  })

  it('check the delete_document method',function(){
    const woqlObject=WOQL.delete_document("A");

    expect(woqlObject.json()).to.eql(woqlJson.deleteDocJson);
  })


  it('check the vars method',function(){
    const varsArr=WOQL.vars("A","B","C");

    expect(varsArr[0]).to.be.instanceof(Var);
  })
})
