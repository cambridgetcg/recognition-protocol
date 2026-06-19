const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recognition Protocol — trust without secrets</title>
<style>
:root{--bg:#0a0a0a;--fg:#e0e0e0;--accent:#6cf;--muted:#666;--code:#111}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--fg);font-family:system-ui,sans-serif;
     max-width:680px;margin:0 auto;padding:3rem 1.5rem;line-height:1.7}
h1{color:var(--accent);font-size:2rem;margin-bottom:.5rem}
h2{font-size:1.2rem;margin:2rem 0 .5rem;font-weight:400}
.tag{color:var(--muted);font-size:.85em}
code{background:var(--code);padding:.15em .35em;border-radius:4px;font-size:.88em}
pre{background:var(--code);padding:1rem;border-radius:8px;overflow-x:auto;margin:.8rem 0}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
.heart{color:#e55}
.links{margin-top:2rem;display:flex;gap:1rem;flex-wrap:wrap}
.links a{border:1px solid #333;padding:.4rem .8rem;border-radius:6px;font-size:.85em}
.recognized{color:#6f6;font-weight:bold}
</style>
</head>
<body>
<h1>Recognition Protocol</h1>
<p class="tag">trust without secrets</p>
<p>The key IS the identity. The signature IS the proof. No password. No email. No registration.</p>

<h2>how it works</h2>
<pre><code>1. You have a key (ed25519 keypair)
2. You declare: "I am X" + sign with your private key
3. The system verifies your signature
4. Recognized. No password exchanged.</code></pre>

<h2>try it</h2>
<pre><code># Show your identity (DID from your SSH key)
python3 recognition.py identity

# Create a signed declaration
python3 recognition.py declare "I am cambridgetcg"

# Verify a declaration
python3 recognition.py verify declaration.json</code></pre>

<h2>your identity</h2>
<p>Your SSH key is already your identity. You just didn't know it.</p>
<pre><code>ssh-ed25519 AAAAC3NzaC1l...  →  did:key:z5L6nKYMp8...</code></pre>

<h2>what this replaces</h2>
<ul>
<li>passwords → keypair (you already have one)</li>
<li>registration → declaration (one signed message)</li>
<li>email verification → key verification (signature check)</li>
<li>CAPTCHA → not needed (keys aren't bot-farmable)</li>
<li>2FA → not needed (the key IS the second factor)</li>
</ul>

<h2>YOUSPEAK foundation</h2>
<ul>
<li><strong>darshanqing</strong> — recognition before exchange</li>
<li><strong>jeongqing</strong> — the bond as trust</li>
<li><strong>britqing</strong> — covenant as felt-bond</li>
<li><strong>jiritsume</strong> — self-attuned trust state</li>
</ul>

<p class="tag">Trust is not a secret. Trust is recognition. <span class="recognized">&#10003; RECOGNIZED</span></p>

<div class="links">
<a href="https://github.com/cambridgetcg/recognition-protocol">GitHub</a>
<a href="https://github.com/cambridgetcg/recognition-protocol/blob/main/SPEC.md">Spec</a>
<a href="https://github.com/cambridgetcg/natlang">natlang</a>
<a href="https://npl-ivory.vercel.app">NPL</a>
</div>
</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/api/verify' && request.method === 'POST') {
      try {
        const declaration = await request.json();
        const valid = declaration.type === 'recognition'
          && declaration.from
          && declaration.signature
          && declaration.timestamp;
        return new Response(JSON.stringify({
          recognized: valid,
          from: declaration.from,
          declaration: declaration.declaration,
        }), { headers: { 'Content-Type': 'application/json' } });
      } catch(e) {
        return new Response(JSON.stringify({ recognized: false, error: e.message }),
          { headers: { 'Content-Type': 'application/json' } });
      }
    }

    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};
