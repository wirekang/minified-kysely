import{aW as e,C as a,aq as n,I as o,_ as s,V as c,aZ as t}from"./sql-B0PBr3Rz.js";function getJsonObjectArgs(s,c){const t=[];for(const{selection:l}of s.selections??[])if(e.is(l)&&a.is(l.column))t.push(colName(l.column.column.name),colRef(c,l.column.column.name));else if(a.is(l))t.push(colName(l.column.name),colRef(c,l.column.name));else{if(!n.is(l)||!o.is(l.alias))throw new Error("can't extract column names from the select query node");t.push(colName(l.alias.name),colRef(c,l.alias.name))}return t}function colName(e){return new s(c.createImmediate(e))}function colRef(n,o){return new s(e.create(a.create(o),t.create(n)))}export{getJsonObjectArgs as g};
