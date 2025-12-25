#!/usr/bin/env python3
"""Run SQL migrations from ai/migrations in lexicographic order.

This script connects to DATABASE_URL and executes each .sql file found in the
migrations directory. Files are applied in sorted order. It's idempotent (you
should design migrations to be idempotent) and will print progress.
"""
import os
import sys
import glob
import psycopg

MIGRATIONS_DIR = os.path.join(os.path.dirname(__file__), '..', 'migrations')
DATABASE_URL = os.getenv('DATABASE_URL')


def run_migrations():
    if not DATABASE_URL:
        print('DATABASE_URL not set; skipping migrations')
        return 0

    files = sorted(glob.glob(os.path.join(MIGRATIONS_DIR, '*.sql')))
    if not files:
        print('No migration files found; nothing to do')
        return 0

    try:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                for path in files:
                    print('Applying:', os.path.basename(path))
                    with open(path, 'r', encoding='utf8') as f:
                        sql = f.read()
                    try:
                        cur.execute(sql)
                        conn.commit()
                    except Exception as e:
                        print(f'ERROR applying {path}:', e)
                        # exit on error to avoid partial migrations
                        return 2
        print('Migrations applied successfully')
        return 0
    except Exception as e:
        print('Failed to connect to DB or run migrations:', e)
        return 3


if __name__ == '__main__':
    rc = run_migrations()
    sys.exit(rc)
