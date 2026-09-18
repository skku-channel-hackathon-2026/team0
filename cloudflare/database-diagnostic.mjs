import { withDatabase } from "../server/dist/src/database.js";
import { probeDatabase } from "../server/dist/src/database-probe.js";

// Operator-only diagnostic; no SQL, row id or payload is accepted from the caller.
export async function databaseDiagnostic(request, bindings) {
  const timestamp = request.headers.get("x-diagnostic-timestamp") ?? "";
  const signature = request.headers.get("x-diagnostic-signature") ?? "";
  const keyHex = bindings.SIGNING_KEY ?? "";
  if (
    !/^\d{13}$/.test(timestamp) ||
    Math.abs(Date.now() - Number(timestamp)) > 60_000 ||
    !/^[a-f0-9]{64}$/.test(signature) ||
    !/^[a-f0-9]{64}$/i.test(keyHex)
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  const key = await crypto.subtle.importKey(
    "raw",
    Uint8Array.from(keyHex.match(/../g), (hex) => parseInt(hex, 16)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    Uint8Array.from(signature.match(/../g), (hex) => parseInt(hex, 16)),
    new TextEncoder().encode(`POST\n/api/diagnostics/database\n${timestamp}`),
  );
  if (!valid) return new Response("Unauthorized", { status: 401 });
  try {
    const result = await withDatabase(bindings.DB, probeDatabase);
    return Response.json(result, { status: result.ok ? 200 : 500 });
  } catch {
    // A transport failure can leave the diagnostic fixture; never report success.
    return Response.json({ ok: false, state: "unverified" }, { status: 500 });
  }
}
