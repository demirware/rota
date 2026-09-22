(function(root){
function levelData(level){
 const n=level<=10?4:level<=35?5:level<=70?6:7;
 let seed=level*7919;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const edges=Array.from({length:n*n},()=>[]);const link=(a,b)=>{if(!edges[a].includes(b)){edges[a].push(b);edges[b].push(a)}};
 const neighbors=a=>[a%n?a-1:-1,a%n<n-1?a+1:-1,a>=n?a-n:-1,a<n*(n-1)?a+n:-1].filter(x=>x>=0);
 const seen=new Set([0]),stack=[0];while(stack.length){const a=stack.at(-1),next=neighbors(a).filter(x=>!seen.has(x));if(!next.length){stack.pop();continue}const b=next[Math.floor(rand()*next.length)];link(a,b);seen.add(b);stack.push(b)}
 for(let a=0;a<n*n;a++)for(const b of neighbors(a))if(a<b&&rand()<.27)link(a,b);
 const goal=n*n-1,queue=[0],prev=Array(n*n).fill(-1);prev[0]=0;for(let i=0;i<queue.length;i++)for(const b of edges[queue[i]])if(prev[b]===-1){prev[b]=queue[i];queue.push(b)}
 const solution=[goal];while(solution[0]!==0)solution.unshift(prev[solution[0]]);
 const gems=[...new Set([.25,.5,.75].map(t=>solution[Math.max(1,Math.min(solution.length-2,Math.floor((solution.length-1)*t)))]))];
 return {n,edges,goal,gems,solution};
}
root.levelData=levelData;if(typeof module!=='undefined')module.exports={levelData};
})(typeof window!=='undefined'?window:globalThis);
