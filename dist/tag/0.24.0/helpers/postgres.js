import{B as o}from"../sql-HMtWStn6.js";function jsonArrayFrom(j){return o`(select coalesce(jsonb_agg(agg), '[]') from ${j} as agg)`}function jsonObjectFrom(j){return o`(select to_jsonb(obj) from ${j} as obj)`}function jsonbBuildObject(j){return o`jsonb_build_object(${o.join(Object.keys(j).flatMap((n=>[o.lit(n),j[n]])))})`}export{jsonArrayFrom,jsonObjectFrom,jsonbBuildObject};