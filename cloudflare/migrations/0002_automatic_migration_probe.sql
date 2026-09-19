-- Verifies that CI applies schema changes before deploying code that reads them.
CREATE TABLE deployment_migration_probe (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
INSERT INTO deployment_migration_probe (id, value)
VALUES ('automatic-migration', 'main-ci-before-worker-deploy');
