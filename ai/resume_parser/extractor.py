"""
Resume content extractor for various file formats.
Handles PDF, DOCX, HTML, and TXT files.
"""
import io
import logging
import re
from typing import Optional, Tuple

try:
    import pdfplumber
except ImportError:
    pdfplumber = None

try:
    import docx
except ImportError:
    docx = None

try:
    from bs4 import BeautifulSoup
except ImportError:
    BeautifulSoup = None

try:
    import pytesseract
    from PIL import Image
    HAS_OCR = True
except ImportError:
    HAS_OCR = False

logger = logging.getLogger(__name__)

def extract_text(content: bytes, filename: str, content_type: Optional[str] = None) -> str:
    """
    Extract text from file content based on extension or mime type.
    """
    filename_lower = filename.lower()
    
    # Determine format
    if filename_lower.endswith('.pdf') or content_type == 'application/pdf':
        return _extract_from_pdf(content)
    elif filename_lower.endswith(('.docx', '.doc')) or content_type in ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']:
        return _extract_from_docx(content)
    elif filename_lower.endswith(('.html', '.htm')) or content_type == 'text/html':
        return _extract_from_html(content)
    else:
        # Default to text
        return _decode_text(content)

def _extract_from_pdf(content: bytes) -> str:
    """Extract text from PDF using pdfplumber with OCR fallback (Beta)"""
    if not pdfplumber:
        logger.warning("pdfplumber not installed")
        return ""

    text = ""
    try:
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        logger.error(f"PDF extraction failed: {e}")
    
    # BETA: OCR Fallback for scanned PDFs
    if not text.strip() and HAS_OCR:
        try:
            logger.info("PDF appears empty, attempting OCR...")
            images = _convert_pdf_to_images(content) # simplified placeholder
            # Real implementation would use pdf2image or similar
            # For now, just logging availability
            pass 
        except Exception as e:
            logger.warning(f"OCR failed: {e}")

    return text

def _extract_from_docx(content: bytes) -> str:
    """Extract text from DOCX"""
    if not docx:
        logger.warning("python-docx not installed")
        return ""

    try:
        doc = docx.Document(io.BytesIO(content))
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        logger.error(f"DOCX extraction failed: {e}")
        return ""

def _extract_from_html(content: bytes) -> str:
    """Extract text from HTML"""
    if not BeautifulSoup:
        logger.warning("beautifulsoup4 not installed")
        return ""

    try:
        soup = BeautifulSoup(content, 'html.parser')
        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()
        return soup.get_text(separator='\n')
    except Exception as e:
        logger.error(f"HTML extraction failed: {e}")
        return ""

def _decode_text(content: bytes) -> str:
    """Decode text with fallback encodings"""
    try:
        return content.decode('utf-8')
    except UnicodeDecodeError:
        try:
            return content.decode('latin-1')
        except UnicodeDecodeError:
            return content.decode('utf-8', errors='ignore')

def _convert_pdf_to_images(content: bytes):
    # Placeholder for pdf2image dependency if we add it later
    return []
