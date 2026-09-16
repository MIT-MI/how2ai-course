---
layout: page
permalink: /fall2026/openai-key/
title: Course OpenAI API Key
description: Enter the password given in class to reveal the shared API key
---

<p>The key below is stored encrypted (AES-256-GCM, password-derived key). It is decrypted in your browser only; nothing is sent to a server.</p>

<div id="unlock-box" style="margin: 1.5em 0;">
  <input id="pw" type="password" placeholder="Password" autocomplete="off"
         style="padding: 8px 10px; font-size: 15px; width: 260px; max-width: 100%; border: 1px solid #ccc; border-radius: 4px;">
  <button id="unlock" style="padding: 8px 16px; font-size: 15px; border-radius: 4px; border: 1px solid #888; background: #f5f5f5; cursor: pointer;">Reveal key</button>
  <div id="msg" style="margin-top: 8px; font-size: 14px; color: #a33;"></div>
</div>

<div id="result" style="display: none; margin: 1.5em 0;">
  <p style="margin-bottom: 6px;"><strong>OPENAI_API_KEY</strong></p>
  <pre id="key" style="white-space: pre-wrap; word-break: break-all; padding: 12px; background: #f6f8fa; border: 1px solid #ddd; border-radius: 4px; font-size: 13px; user-select: all;"></pre>
  <button id="copy" style="padding: 6px 14px; font-size: 14px; border-radius: 4px; border: 1px solid #888; background: #f5f5f5; cursor: pointer;">Copy to clipboard</button>
  <span id="copied" style="margin-left: 8px; font-size: 14px; color: #2a7;"></span>
  <p style="margin-top: 1em; font-size: 14px; color: #555;">Please use this key only for course assignments and do not share it or commit it to any public repository.</p>
</div>

<script>
(function () {
  var BLOB = {
    salt: "rb6c5ALx7QKJkzQFbX7Geg==",
    iv: "5nv+19jZOQpEk3rZ",
    ct: "CA+XcQdQy+YsBBD8cFWOp+y9ncSVztbRUd1pivVcMuR3xdK+YIzU7/ECxIfXcsKD7nbKlh7emnLTCnBGCp1gpUvsoEzq+9sFEFAlUjK/HxcClfYO0i2sfcNfDqIUIY32cS8CFb7dePxE/YgyXWCqvphvjnaxmQvO6nJtJQWftyk6kyB5sTkvnYDb84cH1rwzcWWfPS9ZrfT7o/hKNdcBpQ2bKh8Yyd8cYVXQrgm4I4R1GDOk",
    iter: 600000
  };
  function b64(s) { var bin = atob(s), a = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; }
  var pw = document.getElementById("pw"), msg = document.getElementById("msg"), btn = document.getElementById("unlock");

  async function unlock() {
    var password = pw.value.trim();
    if (!password) { msg.textContent = "Please enter the password."; return; }
    if (!window.crypto || !crypto.subtle) { msg.textContent = "Your browser does not support Web Crypto (needs HTTPS)."; return; }
    btn.disabled = true; msg.style.color = "#555"; msg.textContent = "Decrypting…";
    try {
      var base = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
      var key = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: b64(BLOB.salt), iterations: BLOB.iter, hash: "SHA-256" },
        base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
      var pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(BLOB.iv) }, key, b64(BLOB.ct));
      document.getElementById("key").textContent = new TextDecoder().decode(pt);
      document.getElementById("unlock-box").style.display = "none";
      document.getElementById("result").style.display = "block";
    } catch (e) {
      msg.style.color = "#a33"; msg.textContent = "Wrong password.";
    } finally { btn.disabled = false; }
  }
  btn.addEventListener("click", unlock);
  pw.addEventListener("keydown", function (e) { if (e.key === "Enter") unlock(); });
  document.getElementById("copy").addEventListener("click", function () {
    navigator.clipboard.writeText(document.getElementById("key").textContent).then(function () {
      document.getElementById("copied").textContent = "Copied!";
      setTimeout(function () { document.getElementById("copied").textContent = ""; }, 2000);
    });
  });
})();
</script>
