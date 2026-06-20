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

def _detect_table_type(headers: list, rows: list) -> str:
    """Detect the logical type of the table based on cell contents."""
    headers_lower = [str(h).lower() for h in headers]
    all_text = " ".join(headers_lower) + " " + " ".join([str(cell).lower() for row in rows for cell in row if cell is not None])
    
    # Check for skills
    skills_keywords = {'skill', 'technology', 'technologies', 'tool', 'tools', 'language', 'languages', 'proficiency', 'level', 'expert', 'intermediate', 'beginner'}
    if any(kw in all_text for kw in skills_keywords):
        return "Skills Matrix"
        
    # Check for experience/work history
    experience_keywords = {'company', 'employer', 'role', 'title', 'year', 'years', 'date', 'dates', 'duration', 'description', 'responsibility', 'responsibilities', 'project', 'projects'}
    if any(kw in all_text for kw in experience_keywords):
        return "Work Experience/Timeline"
        
    # Check for education
    education_keywords = {'school', 'university', 'college', 'degree', 'major', 'gpa', 'graduation', 'education', 'institution', 'course', 'courses'}
    if any(kw in all_text for kw in education_keywords):
        return "Education History"
        
    return "Structured Table Data"

def _format_table_as_markdown(table) -> str:
    """Convert raw table structure from pdfplumber into Markdown with type detection."""
    if not table:
        return ""
        
    # Clean rows and filter out completely empty ones
    clean_rows = []
    for row in table:
        if not row:
            continue
        clean_row = [str(cell).strip() if cell is not None else "" for cell in row]
        if any(clean_row):
            clean_rows.append(clean_row)
            
    if not clean_rows:
        return ""
        
    # Determine headers and data rows
    headers = clean_rows[0]
    data_rows = clean_rows[1:]
    
    # Detect the logical type of table
    table_type = _detect_table_type(headers, data_rows)
    
    markdown = f"\n[Table Type: {table_type}]\n"
    # Header row
    markdown += "| " + " | ".join(headers) + " |\n"
    markdown += "| " + " | ".join(["---"] * len(headers)) + " |\n"
    
    # Data rows
    for row in data_rows:
        # Pad or truncate row to match headers count
        if len(row) < len(headers):
            row += [""] * (len(headers) - len(row))
        elif len(row) > len(headers):
            row = row[:len(headers)]
        markdown += "| " + " | ".join(row) + " |\n"
        
    return markdown

def _extract_from_pdf(content: bytes) -> str:
    """Extract text and tables from PDF using pdfplumber with OCR fallback (Beta)"""
    if not pdfplumber:
        logger.warning("pdfplumber not installed")
        return ""

    text = ""
    tables_text = ""
    try:
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page_num, page in enumerate(pdf.pages, 1):
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
                
                # Extract tables
                try:
                    tables = page.extract_tables()
                    for t_idx, table in enumerate(tables, 1):
                        md_table = _format_table_as_markdown(table)
                        if md_table:
                            tables_text += f"\n[Page {page_num}, Table {t_idx}]{md_table}"
                except Exception as table_err:
                    logger.warning(f"Failed to extract tables on page {page_num}: {table_err}")
    except Exception as e:
        logger.error(f"PDF extraction failed: {e}")
    
    # Merge tables with text
    if tables_text:
        text += "\n\n--- STRUCTURED TABLES DETECTED ---\n" + tables_text

    # BETA: OCR Fallback for scanned PDFs
    if not text.strip() and HAS_OCR:
        try:
            logger.info("PDF appears empty, attempting OCR...")
            images = _convert_pdf_to_images(content) # simplified placeholder
            # Real implementation would use pdf2image or similar
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
