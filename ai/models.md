# Models used by CareerForge AI ✅

This document lists the Hugging Face and related models referenced by the AI services in this repository, explains their purpose, where they are referenced in source code, and provides a recommended manifest template and deployment checklist.

---

## Models found (explicit references)

### 1) `dslim/bert-base-NER` 🔍
- **Purpose:** Named Entity Recognition (NER) used to extract people, organizations, etc. from resumes.
- **Where used:** `ai/shared/config.py` (constant `NER_MODEL`); pipeline instantiated in `ai/resume_parser/parser.py`.
- **Model card:** https://huggingface.co/dslim/bert-base-NER

### 2) `sentence-transformers/all-MiniLM-L6-v2` 🧠
- **Purpose:** Embeddings for semantic similarity (skill extraction and job matching).
- **Where used:** `ai/shared/config.py` (`EMBEDDING_MODEL`); used by `ai/resume_parser/parser.py` and `ai/matching_engine/matcher.py` (SentenceTransformer).
- **Model card:** https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2

### 3) `google/flan-t5-base` ✍️
- **Purpose:** Text generation (career advice, cover letters, LinkedIn optimization).
- **Where used:** `ai/shared/config.py` (`GENERATION_MODEL`); used by `ai/career_coach/coach.py` (transformers `pipeline`).
- **Model card:** https://huggingface.co/google/flan-t5-base

### 4) `lp://efficientdet` (LayoutParser / Detectron2) 🖼️
- **Purpose:** Layout detection for image-based resumes (detect text blocks, tables, forms).
- **Where used:** `ai/resume_parser/parser.py` via `lp.Detectron2LayoutModel('lp://efficientdet')` (LayoutParser model zoo URI).
- **Docs:** https://layout-parser.readthedocs.io/en/latest/model_zoo.html

### 5) Test / Example models (in `ai/test_hf_api.py`) 🧪
- `microsoft/DialoGPT-medium` — conversational example. https://huggingface.co/microsoft/DialoGPT-medium
- `distilbert-base-uncased-finetuned-sst-2-english` — sentiment example. https://huggingface.co/distilbert-base-uncased-finetuned-sst-2-english

> Note: The `HuggingFaceAPIClient` in `ai/shared/utils.py` supports calling any arbitrary HF model string at runtime via the inference API.

---

## Recommended manifest (example)

Add a `ai/models.yaml` or update this file with a structured manifest so that model metadata can be audited and validated automatically.

```yaml
models:
  - id: dslim/bert-base-NER
    purpose: NER for resume parsing
    config: ai/shared/config.py#NER_MODEL
    model_card: https://huggingface.co/dslim/bert-base-NER
    license: (check model card)
    pinned_revision: null  # consider pinning to a revision hash or tag

  - id: sentence-transformers/all-MiniLM-L6-v2
    purpose: Embeddings for semantic similarity
    config: ai/shared/config.py#EMBEDDING_MODEL
    model_card: https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2
    license: (check model card)
    pinned_revision: null

  - id: google/flan-t5-base
    purpose: Text generation for career coach
    config: ai/shared/config.py#GENERATION_MODEL
    model_card: https://huggingface.co/google/flan-t5-base
    license: (check model card)
    pinned_revision: null

  - id: lp://efficientdet
    purpose: Layout detection for image resumes
    config: ai/resume_parser/parser.py#layout_model
    docs: https://layout-parser.readthedocs.io/en/latest/model_zoo.html
    notes: "Model URI from LayoutParser model zoo; verify Detectron2 compatibility"
```

---

## Checklist before production deployment ✅
- **Pin model revisions**: Pin to HF revision SHAs or upload model files to an internal registry to ensure reproducibility.
- **Verify licenses**: Confirm license on each model card allows your intended use (commercial vs. non-commercial restrictions).
- **Model cards & limitations**: Add a short summary of each model’s limitations (bias, hallucination, failure modes) to the repo.
- **Add tests**: Create CI tests to validate model access (or mocked responses) and basic output sanity checks.
- **Secrets & quotas**: Ensure `HF_API_KEY` is stored in CI secrets and monitor API quotas and latency.
- **Privacy / PII**: Add a data handling note for PII in resumes — consider redaction or differential handling for sensitive data.
- **Monitoring**: Add basic metrics (latency, error rates) and validation checks to catch model regressions.

---

## How to update this file ✍️
1. Add new model entries to the `models.yaml` (or append here) with `id`, `purpose`, `config` pointer, and `model_card` URL.
2. Run model access tests or add a small smoke test that tries to instantiate or call the model (sample prompts/sample inputs).
3. Update the `CHECKLIST` when you have pinned the model or verified licensing.

---

I have added the following artifacts to the repository:

- `ai/models.yaml` — the structured manifest for models (see file for entries).
- `ai/tests/test_models.py` — pytest smoke tests that validate the manifest structure and optionally check model access when `HF_API_KEY` is present.
- `ai/scripts/precache_models.py` — script to pre-download/cache models listed in `ai/models.yaml` into `config.CACHE_DIR` (supports `--dry-run`).
- `ai/tests/test_precache.py` — dry-run test that ensures the precache script executes without errors.
- `.github/workflows/ai-models-check.yml` — GitHub Actions workflow that runs the model manifest tests on pushes and PRs affecting `ai/`.

These items are now present in the repo. Next step: open a PR with these changes and (optionally) pin model revisions and verify licenses before merging.