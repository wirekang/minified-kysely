import{J as o}from"../sql-g_stMT-x.js";import{g as t}from"../json-object-args-8-CWqYyc.js";function jsonArrayFrom(t){return o`(select coalesce(json_group_array(json_object(${o.join(getSqliteJsonObjectArgs(t.toOperationNode(),"agg"))})), '[]') from ${t} as agg)`}function jsonObjectFrom(t){return o`(select json_object(${o.join(getSqliteJsonObjectArgs(t.toOperationNode(),"obj"))}) from ${t} as obj)`}function jsonBuildObject(t){return o`json_object(${o.join(Object.keys(t).flatMap((e=>[o.lit(e),t[e]])))})`}function getSqliteJsonObjectArgs(o,e){try{return t(o,e)}catch{throw new Error("SQLite jsonArrayFrom and jsonObjectFrom functions can only handle explicit selections due to limitations of the json_object function. selectAll() is not allowed in the subquery.")}}export{jsonArrayFrom,jsonBuildObject,jsonObjectFrom};
