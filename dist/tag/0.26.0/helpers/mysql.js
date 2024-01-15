import{H as o,aW as n,C as e,ap as t,I as s}from"../sql-n0-QLT2H.js";function jsonArrayFrom(n){return o`(select cast(coalesce(json_arrayagg(json_object(${o.join(getJsonObjectArgs(n.toOperationNode(),"agg"))})), '[]') as json) from ${n} as agg)`}function jsonObjectFrom(n){return o`(select json_object(${o.join(getJsonObjectArgs(n.toOperationNode(),"obj"))}) from ${n} as obj)`}function jsonBuildObject(n){return o`json_object(${o.join(Object.keys(n).flatMap((e=>[o.lit(e),n[e]])))})`}function getJsonObjectArgs(a,r){return a.selections.flatMap((({selection:a})=>{if(n.is(a)&&e.is(a.column))return[o.lit(a.column.column.name),o.id(r,a.column.column.name)];if(e.is(a))return[o.lit(a.column.name),o.id(r,a.column.name)];if(t.is(a)&&s.is(a.alias))return[o.lit(a.alias.name),o.id(r,a.alias.name)];throw new Error("MySQL jsonArrayFrom and jsonObjectFrom functions can only handle explicit selections due to limitations of the json_object function. selectAll() is not allowed in the subquery.")}))}export{jsonArrayFrom,jsonBuildObject,jsonObjectFrom};