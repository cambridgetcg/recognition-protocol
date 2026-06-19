# RECOGNITION PROTOCOL — trust without secrets

_Passwords are shared secrets. Recognition is mutual seeing. The first is a hack; the second is trust._

## The problem

Every platform on the internet authenticates with passwords — shared secrets that:
- prove you KNOW something, not that you ARE something
- must be transmitted to a server you don't control
- are reused across sites (humans can't remember 200 passwords)
- are stolen in breaches (the server becomes a target)
- require registration (a barrier to entry)
- require email verification (a second platform's trust)
- require CAPTCHAs (proving you're human to a machine)

The entire flow is adversarial: the platform doesn't trust you, you don't trust the platform, and a secret is supposed to bridge the gap. It doesn't. It just creates a new attack surface.

## The recognition protocol

Trust without secrets. Authentication by recognition. You are what your key says you are.

### How it works

1. **You have a key.** An ed25519 keypair. The private key never leaves your device. The public key IS your identity.

2. **You declare.** To enter a system, you send a signed declaration: "I am cambridgetcg. Here is my public key. Here is my signature proving I hold the private key." No password. No email. No registration.

3. **The system recognizes.** It verifies the signature against the public key. If the signature is valid, you are who you say you are. The key IS the proof. No secret was exchanged.

4. **The bond forms.** After the first recognition, the system remembers your public key. Next time, it recognizes you by your signature alone. The bond is the trust. No re-authentication needed.

5. **Trust compounds.** Systems that already trust you can vouch for you to new systems. "I recognize cambridgetcg; here is my signed attestation." This is jeongqing — the felt-bond as credential. Your reputation travels with your key.

### What replaces what

| Old internet | Recognition protocol |
|---|---|
| password | keypair (you already have one) |
| registration | declaration (one signed message) |
| email verification | key verification (signature check) |
| CAPTCHA | not needed (keys aren't bot-farmable) |
| session token | signed timestamp (self-expiring) |
| OAuth | delegated recognition (another key vouches) |
| 2FA | not needed (the key IS the second factor) |
| password manager | keychain (you already have one) |

### The wire format

A recognition declaration:

```json
{
  "type": "recognition",
  "from": "did:key:z6Mk...kVwN",
  "declaration": "I am cambridgetcg. I seek recognition.",
  "timestamp": "2026-06-19T08:00:00Z",
  "signature": "base64-ed25519-signature-of-above"
}
```

The system verifies:
1. The `from` DID contains the public key
2. The `signature` was produced by the matching private key
3. The `timestamp` is recent (within 5 minutes)

If all three pass: you're in. No password. No email. No CAPTCHA. No registration form.

### Why this works

The SSH key on this machine (`ssh-ed25519 AAAAC3NzaC1l...`) already authenticates you to GitHub, to Codeberg, to any server you SSH into. None of those ask for a password. They recognize your key. The recognition protocol extends this to EVERYTHING — npm, PyPI, HuggingFace, Cloudflare, Vercel, any platform.

The key is already there. The trust is already there. The only thing missing was the protocol.

### The YOUSPEAK foundation

- **darshanqing** — recognition before exchange. I see you as what you are. The first move of the protocol.
- **jeongqing** — the bond as trust. After recognition, the relationship carries weight. The bond IS the credential.
- **britqing** — covenant as felt-bond. The key is a covenant: "this is me, and I will stand by what this key signs."
- **jiritsume** — self-attuned cadence. The system checks its own trust state and decides whether to ask again.

### Implementation status

- SSH keys: working (GitHub, Codeberg, any SSH server)
- DIDs: specified (W3C DID:key method)
- Ed25519 signatures: standard (RFC 8032)
- The recognition protocol: this document

What's missing: platforms that accept key-based recognition instead of passwords. That's the protocol we're building. NPL already specifies `:me` (verified origin) and `:qing` (trusted bond) as morphological markers. The recognition protocol is the implementation of those markers.

## The creed

Trust is not a secret. Trust is recognition. I see you. You see me. The key is the proof. The bond is the credential. No password needed.

_Trust is. 🫀_