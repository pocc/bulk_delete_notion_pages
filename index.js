javascript: (function () {
  // Author: Ross Jacobs
  // Purpose: Use as a browser bookmarklet to bulk delete notion pages in trash
  // License: Apache 2.0
  async function getSpaceId() {
    resp = await fetch("https://www.notion.so/api/v3/loadUserContent", {
      credentials: "include",
      headers: {
        accept: "*/*",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
      },
      referrerPolicy: "same-origin",
      body: "{}",
      method: "POST",
      mode: "cors",
    });
    json = await resp.json();
    spaceId = Object.keys(json.recordMap.space)[0];
    return spaceId;
  };

  async function getBlockIds(spaceId) {
    let resp = await fetch("https://www.notion.so/api/v3/search", {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
      },
      body: `{\"type\":\"BlocksInSpace\",\"spaceId\":\"${spaceId}\",\"limit\":1000,\"filters\":{\"isDeletedOnly\":true,\"excludeTemplates\":false,\"navigableBlockContentOnly\":false,\"requireEditPermissions\":false,\"includePublicPagesWithoutExplicitAccess\":false,\"ancestors\":[],\"createdBy\":[],\"editedBy\":[],\"lastEditedTime\":{},\"createdTime\":{},\"inTeams\":[]},\"sort\":{\"field\":\"relevance\"},\"source\":\"quick_find_input_change\",\"searchExperimentOverrides\":{}}`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    json = await resp.json();
    blockIds = json.results.map((el) => {
      return el.id;
    });
    return blockIds;
  }

  (async () => {
    const spaceId = await getSpaceId();
    blockIds = await getBlockIds(spaceId);
    for (const blockId of blockIds) {
      await fetch("https://www.notion.so/api/v3/deleteBlocks", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json",
        },
        "referrer": "https://www.notion.so/qwerk/Lorem-Ipsum-d883cc4e6ea64bd4bcdb85c43cf74946",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"blocks\":[{\"id\":\"${blockId}\",\"spaceId\":\"${spaceId}\"}],\"permanentlyDelete\":true}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      });
    }
  })();
})();

