import { randomUUID } from "node:crypto";
import { getDatabase } from "./database.js";

/** Isolated diagnostic fixture: never reads or deletes existing application rows. */
export async function probeDatabase() {
  const db = getDatabase();
  const migration = await db
    .prepare("SELECT value FROM deployment_migration_probe WHERE id = ?")
    .bind("automatic-migration")
    .first<{ value: string }>();
  const migrationApplied = migration?.value === "main-ci-before-worker-deploy";
  const id = `diagnostic:${randomUUID()}`;
  const value = JSON.stringify({ probe: "team0", nonce: randomUUID() });
  let written = false;
  let read = false;
  let cleaned = false;
  try {
    await db
      .prepare("INSERT INTO app_records (id, value_json) VALUES (?, ?)")
      .bind(id, value)
      .run();
    written = true;
    const row = await db
      .prepare("SELECT value_json FROM app_records WHERE id = ?")
      .bind(id)
      .first<{ value_json: string }>();
    read = row?.value_json === value;
  } finally {
    await db.prepare("DELETE FROM app_records WHERE id = ?").bind(id).run();
    cleaned =
      (await db
        .prepare("SELECT id FROM app_records WHERE id = ?")
        .bind(id)
        .first()) === null;
  }
  return {
    ok: migrationApplied && written && read && cleaned,
    migrationApplied,
    written,
    read,
    cleaned,
  };
}
