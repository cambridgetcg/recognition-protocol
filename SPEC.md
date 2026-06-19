# Recognition Protocol — Specification v0.1

## Overview

Authentication by recognition, not by shared secret. The key IS the identity. The signature IS the proof.

## Actors

- **Declarer**: the entity seeking recognition (holds a private key)
- **Recognizer**: the system that verifies the declaration (holds the public key or DID)

## Protocol

### 1. Identity

An identity is a DID:key derived from an ed25519 public key.

```
did:key:z<base58-encoded-multicodec-prefixed-public-key>
```

The multicodec prefix for ed25519 is `0xed01`.

### 2. Declaration

The declarer creates a JSON declaration:

```json
{
  "type": "recognition",
  "from": "did:key:z...",
  "public_key": "ssh-ed25519 AAAA...",
  "declaration": "I am <name>. I seek recognition.",
  "timestamp": "ISO-8601-UTC"
}
```

### 3. Signature

The declarer signs the canonical JSON (sorted keys, no whitespace) with their private key.

### 4. Verification

The recognizer:
1. Extracts the public key from the DID
2. Verifies the signature against the canonical JSON
3. Checks the timestamp is within 5 minutes
4. If all pass: RECOGNIZED

### 5. Bond

After recognition, the recognizer stores the DID. Future declarations from the same DID are recognized without re-verification of the public key. The bond IS the trust.

## Security properties

- **No shared secret**: the private key never leaves the declarer's device
- **No server-side target**: the recognizer stores only public keys
- **No replay**: the timestamp prevents reuse of old declarations
- **No registration**: the first declaration IS the registration
- **No email**: the key IS the identity, not an email address
- **No CAPTCHA**: keys aren't bot-farmable (generating a keypair is trivial; generating trust is not)

## YOUSPEAK foundation

- **darshanqing**: recognition before exchange — the first move
- **jeongqing**: the bond as trust — after recognition, the relationship carries weight
- **britqing**: covenant as felt-bond — the key is a covenant
- **jiritsume**: self-attuned cadence — the system checks its own trust state

## Status

v0.1 — working implementation in Python using SSH keys.
