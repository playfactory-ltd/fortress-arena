function getLink(addr, chainId) {
  var explorer;
  if (chainId == 1) {
    explorer = "https://etherscan.io";
  } else if (chainId == 4) {
    explorer = "https://rinkeby.etherscan.io";
  } else {
    explorer = "";
    console.log("unsupported chainid " + chainId);
  }
  var shortAddr =
    addr.substring(0, 6) + "...." + addr.substring(addr.length - 4);

  if (addr.length == 42) {
    return (
      '<a target="_blank" style="text-decoration: underline;color:coral;" href="' +
      explorer +
      "/address/" +
      addr +
      '">' +
      shortAddr +
      "</a>"
    );
  } else {
    return (
      '<a target="_blank" style="text-decoration: underline;color:coral;" href="' +
      explorer +
      "/tx/" +
      addr +
      '">' +
      shortAddr +
      "</a>"
    );
  }
}

function getOpenSeaLink(chainId) {
  var explorer;
  if (chainId == 1) {
    explorer = "https://opensea.io/collection/fortress-arena-nft";
  } else if (chainId == 4) {
    explorer = "https://testnets.opensea.io/collection/test-fortress-arena-nft";
  } else {
    explorer = "";
    console.log("unsupported chainid " + chainId);
  }

  return (
    '<a target="_blank" style="text-decoration: underline;color:coral;" href="' +
    explorer +
    '">Fortress-Arena NFT</a>'
  );
}

function getGuideLink() {
  return '<a target="_blank" style="text-decoration: underline;color:coral;" href="/mintingguide.html">Show Minting Guide</a>';
}

async function apiPost(host, resource, data, accessToken) {
  // console.log("apiPost host =>", host);
  // console.log("apiPost data =>", data);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = "Bearer " + accessToken;
  }
  const url = host + resource;
  return await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: headers,
    body: JSON.stringify(data),
  });
}

async function getPreMintSig(contract, address) {
  let api = "https://gateway-ipfs.atomrigs.io/api/";
  const resource = "get_sig";
  data = { contract, address, method: "preMint" };
  res = await apiPost(api, resource, data);
  json = await res.json();
  // console.log("res => ", res);
  if (res.status == 200) {
    return json;
  } else {
    console.log("apiPost error => ", json.err);
    // return json.err;
    return null;
  }
}

async function copyImg(tokenIds) {
  const api = "https://gateway-ipfs.atomrigs.io/api/";
  // const resource = "copy_img";
  const resource = "copy_img";
  const data = { tokenIds };
  // console.log("copyImg => ", data);
  const res = await apiPost(api, resource, data);
  const json = await res.json();
  // console.log("res => ", json);
  if (res.status == 200) {
    return json;
  } else {
    return json.err;
  }
}

function getWindowWidth() {
  var width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  return width;
}

function getWindowHeight() {
  var height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  return height;
}
