import{H as o}from"../sql-E71jjei2.js";function jsonArrayFrom(j){return o`(select coalesce(json_agg(agg), '[]') from ${j} as agg)`}function jsonObjectFrom(j){return o`(select to_json(obj) from ${j} as obj)`}function jsonBuildObject(j){return o`json_build_object(${o.join(Object.keys(j).flatMap((n=>[o.lit(n),j[n]])))})`}export{jsonArrayFrom,jsonBuildObject,jsonObjectFrom};