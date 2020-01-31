javascript:(function(){
  // Author: Ross Jacobs
  // Purpose: Use as a browser bookmarklet to bulk delete notion pages in trash
  // License: Apache 2.0
  async function getSpaceId() {
    resp = await fetch("https://www.notion.so/api/v3/loadUserContent", {"credentials":"include","headers":{"accept":"*/*","cache-control":"no-cache","content-type":"application/json","pragma":"no-cache","sec-fetch-mode":"cors","sec-fetch-site":"same-origin"},"referrerPolicy":"same-origin","body":"{}","method":"POST","mode":"cors"}); 
    json = await resp.json(); 
    spaceId = Object.keys(json.recordMap.space)[0]; 
    return spaceId;
  }

  async function getBlockIds(spaceId) {
    resp = await fetch("https://www.notion.so/api/v3/search",{"credentials":"include","headers":{"accept":"*/*","cache-control":"no-cache","content-type":"application/json","pragma":"no-cache","sec-fetch-mode":"cors","sec-fetch-site":"same-origin"},"referrerPolicy":"same-origin","body":"{\"type\":\"BlocksInSpace\",\"query\":\"\",\"filters\":{\"isDeletedOnly\":true,\"excludeTemplates\":false,\"isNavigableOnly\":true,\"requireEditPermissions\":false,\"ancestors\":[],\"createdBy\":[],\"editedBy\":[],\"lastEditedTime\":{},\"createdTime\":{}},\"sort\":\"Relevance\",\"limit\":1000,\"spaceId\":\"" + spaceId + "\",\"source\":\"trash\"}","method":"POST","mode":"cors"}); 
    json = await resp.json(); 
    blockIds = json.results.map((el) => {return el.id}); 
    return blockIds;
  }

  (async ()=>{
    const spaceId = await getSpaceId();
    blockIds = await getBlockIds(spaceId);
    for (const blockId of blockIds) {
      const blockIdEscaped = '\"' + blockId + '\"';
      await fetch("https://www.notion.so/api/v3/deleteBlocks", {"credentials":"include","headers":{"accept":"*/*","cache-control":"no-cache","content-type":"application/json","pragma":"no-cache","sec-fetch-mode":"cors","sec-fetch-site":"same-origin"},"referrerPolicy":"same-origin","body":"{\"blockIds\":[" +blockIdEscaped+"],\"permanentlyDelete\":true}","method":"POST","mode":"cors"});
    }
  })();
})();
