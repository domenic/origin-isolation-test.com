const send = document.querySelector("#send");
const output = document.querySelector("#output");
const syncScript = document.querySelector("#sync-script");

send.onclick = async () => {
  const module = await WebAssembly.compileStreaming(fetch("simple.wasm"));
  frames[0].postMessage(module, "*");
};

syncScript.onclick = () => {
  try {
    frames[0].document.querySelector("#output").textContent += `Was able to script the iframe\n`;
  } catch (e) {
    output.textContent += `Failed to script the iframe: ${e.message}\n`;
  }
};

output.textContent += `window.originAgentCluster: ${window.originAgentCluster}\n`;

document.domain = "origin-isolation-test.com";
