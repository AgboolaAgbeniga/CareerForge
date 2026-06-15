#!/usr/bin/env python3
"""
Test script for Hugging Face API connectivity and model access.
"""
import os
from dotenv import load_dotenv
from huggingface_hub import HfApi
from transformers import pipeline

def test_hf_api_connectivity():
    """Test basic Hugging Face API connectivity."""
    print("Testing Hugging Face API connectivity...")

    # Load environment variables
    load_dotenv()

    api_key = os.getenv('HF_API_KEY')
    if not api_key:
        print("ERROR: HF_API_KEY not found in environment variables")
        return False

    try:
        # Initialize API client
        api = HfApi(token=api_key)

        # Test API connectivity by getting user info
        user_info = api.whoami()
        print(f"SUCCESS: Connected to Hugging Face API as: {user_info['name']}")
        return True

    except Exception as e:
        print(f"ERROR: Failed to connect to Hugging Face API: {e}")
        return False

def test_model_access():
    """Test access to specific models used by the AI services."""
    print("\nTesting model access...")

    load_dotenv()
    api_key = os.getenv('HF_API_KEY')

    models_to_test = [
        "sentence-transformers/all-MiniLM-L6-v2",  # Used for embeddings
        "microsoft/DialoGPT-medium",  # Example conversational model
        "distilbert-base-uncased-finetuned-sst-2-english",  # Sentiment analysis
    ]

    success_count = 0

    for model_name in models_to_test:
        try:
            print(f"  Testing access to {model_name}...")

            # Try to load the model (this will download if not cached)
            # Using pipeline for quick test
            if "sentence-transformers" in model_name:
                # For sentence transformers, just test import
                from sentence_transformers import SentenceTransformer
                model = SentenceTransformer(model_name, token=api_key)
                print(f"  SUCCESS: Successfully loaded {model_name}")
                success_count += 1
            else:
                # For other models, test pipeline creation
                pipe = pipeline("text-classification", model=model_name, token=api_key)
                print(f"  SUCCESS: Successfully created pipeline for {model_name}")
                success_count += 1

        except Exception as e:
            print(f"  ERROR: Failed to access {model_name}: {e}")

    print(f"\nModel access test results: {success_count}/{len(models_to_test)} models accessible")
    return success_count > 0

def main():
    """Main test function."""
    print("Starting Hugging Face API and Model Access Tests")
    print("=" * 60)

    # Test API connectivity
    api_success = test_hf_api_connectivity()

    # Test model access
    model_success = test_model_access()

    print("\n" + "=" * 60)
    print("TEST SUMMARY:")
    print(f"  API Connectivity: {'PASS' if api_success else 'FAIL'}")
    print(f"  Model Access: {'PASS' if model_success else 'FAIL'}")

    if api_success and model_success:
        print("\nAll tests passed! Hugging Face integration is ready.")
        return 0
    else:
        print("\nSome tests failed. Please check your API key and model access.")
        return 1

if __name__ == "__main__":
    exit(main())