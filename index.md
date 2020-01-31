---
layout: page
title: Empty Notion Trash
description: Bookmarklet to permanently delete all notion pages that have already been deleted.
---
<script>
// Replace the URIEncoded '%3A' to ':' after javascript so browsers treat this as a bookmarklet
let bookmarklet = document.getElementById('bookmarklet')
bookmarklet.href = bookmarklet.href.replace('javascript%3A', 'javascript:')
</script>


# Emtpy Notion Trash

- **To Install**: Drag and drop this link<a id="bookmarklet" class="bookmarklet"
href="javascript:(function()%7B%0A%20%20async%20function%20getSpaceId()%20%7B%0A%20%20%20%20resp%20%3D%20await%20fetch(%22https%3A%2F%2Fwww.notion.so%2Fapi%2Fv3%2FloadUserContent%22%2C%20%7B%22credentials%22%3A%22include%22%2C%22headers%22%3A%7B%22accept%22%3A%22*%2F*%22%2C%22cache-control%22%3A%22no-cache%22%2C%22content-type%22%3A%22application%2Fjson%22%2C%22pragma%22%3A%22no-cache%22%2C%22sec-fetch-mode%22%3A%22cors%22%2C%22sec-fetch-site%22%3A%22same-origin%22%7D%2C%22referrerPolicy%22%3A%22same-origin%22%2C%22body%22%3A%22%7B%7D%22%2C%22method%22%3A%22POST%22%2C%22mode%22%3A%22cors%22%7D)%3B%20%0A%20%20%20%20json%20%3D%20await%20resp.json()%3B%20%0A%20%20%20%20spaceId%20%3D%20Object.keys(json.recordMap.space)%5B0%5D%3B%20%0A%20%20%20%20return%20spaceId%3B%0A%20%20%7D%0A%0A%20%20async%20function%20getBlockIds(spaceId)%20%7B%0A%20%20%20%20resp%20%3D%20await%20fetch(%22https%3A%2F%2Fwww.notion.so%2Fapi%2Fv3%2Fsearch%22%2C%7B%22credentials%22%3A%22include%22%2C%22headers%22%3A%7B%22accept%22%3A%22*%2F*%22%2C%22cache-control%22%3A%22no-cache%22%2C%22content-type%22%3A%22application%2Fjson%22%2C%22pragma%22%3A%22no-cache%22%2C%22sec-fetch-mode%22%3A%22cors%22%2C%22sec-fetch-site%22%3A%22same-origin%22%7D%2C%22referrerPolicy%22%3A%22same-origin%22%2C%22body%22%3A%22%7B%22type%22%3A%22BlocksInSpace%22%2C%22query%22%3A%22%22%2C%22filters%22%3A%7B%22isDeletedOnly%22%3Atrue%2C%22excludeTemplates%22%3Afalse%2C%22isNavigableOnly%22%3Atrue%2C%22requireEditPermissions%22%3Afalse%2C%22ancestors%22%3A%5B%5D%2C%22createdBy%22%3A%5B%5D%2C%22editedBy%22%3A%5B%5D%2C%22lastEditedTime%22%3A%7B%7D%2C%22createdTime%22%3A%7B%7D%7D%2C%22sort%22%3A%22Relevance%22%2C%22limit%22%3A1000%2C%22spaceId%22%3A%22%22%20%2B%20spaceId%20%2B%20%22%22%2C%22source%22%3A%22trash%22%7D%22%2C%22method%22%3A%22POST%22%2C%22mode%22%3A%22cors%22%7D)%3B%20%0A%20%20%20%20json%20%3D%20await%20resp.json()%3B%20%0A%20%20%20%20blockIds%20%3D%20json.results.map((el)%20%3D%3E%20%7Breturn%20el.id%7D)%3B%20%0A%20%20%20%20return%20blockIds%3B%0A%20%20%7D%0A%0A%20%20(async%20()%3D%3E%7B%0A%20%20%20%20const%20spaceId%20%3D%20await%20getSpaceId()%3B%0A%20%20%20%20blockIds%20%3D%20await%20getBlockIds(spaceId)%3B%0A%20%20%20%20for%20(const%20blockId%20of%20blockIds)%20%7B%0A%20%20%20%20%20%20const%20blockIdEscaped%20%3D%20'%22'%20%2B%20blockId%20%2B%20'%22'%3B%0A%20%20%20%20%20%20await%20fetch(%22https%3A%2F%2Fwww.notion.so%2Fapi%2Fv3%2FdeleteBlocks%22%2C%20%7B%22credentials%22%3A%22include%22%2C%22headers%22%3A%7B%22accept%22%3A%22*%2F*%22%2C%22cache-control%22%3A%22no-cache%22%2C%22content-type%22%3A%22application%2Fjson%22%2C%22pragma%22%3A%22no-cache%22%2C%22sec-fetch-mode%22%3A%22cors%22%2C%22sec-fetch-site%22%3A%22same-origin%22%7D%2C%22referrerPolicy%22%3A%22same-origin%22%2C%22body%22%3A%22%7B%22blockIds%22%3A%5B%22%20%2BblockIdEscaped%2B%22%5D%2C%22permanentlyDelete%22%3Atrue%7D%22%2C%22method%22%3A%22POST%22%2C%22mode%22%3A%22cors%22%7D)%3B%0A%20%20%20%20%7D%0A%20%20%7D)()%3B%0A%7D)()"> 
Empty Notion Trash</a> to your Bookmarks Bar. 
- **To Use**: Click on the bookmark when you are on notion.so

