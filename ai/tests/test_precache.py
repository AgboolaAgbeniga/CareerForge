import subprocess
import sys
from pathlib import Path

AI_ROOT = Path(__file__).resolve().parents[1]
PRECACHE_SCRIPT = AI_ROOT / "scripts" / "precache_models.py"


def test_precache_dry_run():
    """Dry-run should exit 0 and print model ids without downloading."""
    assert PRECACHE_SCRIPT.exists(), f"Precache script not found: {PRECACHE_SCRIPT}"

    res = subprocess.run([sys.executable, str(PRECACHE_SCRIPT), "--dry-run"], cwd=str(AI_ROOT))
    assert res.returncode == 0
