import unittest
import sys
import os
from unittest.mock import MagicMock, patch

# Add parent directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from resume_parser.extractor import extract_text

class TestExtractor(unittest.TestCase):
    def test_extract_text_plain(self):
        content = b"Simple text resume"
        result = extract_text(content, "resume.txt", "text/plain")
        self.assertEqual(result, "Simple text resume")

    @patch('resume_parser.extractor.pdfplumber.open')
    def test_extract_text_pdf(self, mock_pdf_open):
        # Mock PDF behavior
        mock_page = MagicMock()
        mock_page.extract_text.return_value = "PDF extracted text"
        
        mock_pdf = MagicMock()
        mock_pdf.pages = [mock_page]
        
        mock_pdf_open.return_value.__enter__.return_value = mock_pdf
        
        content = b"%PDF-1.4..."
        result = extract_text(content, "resume.pdf", "application/pdf")
        self.assertIn("PDF extracted text", result)

    @patch('resume_parser.extractor.docx')
    def test_extract_text_docx(self, mock_docx):
        # Mock DOCX behavior
        mock_doc = MagicMock()
        mock_para = MagicMock()
        mock_para.text = "DOCX extracted text"
        mock_doc.paragraphs = [mock_para]
        
        mock_docx.Document.return_value = mock_doc
        
        content = b"PK..."
        result = extract_text(content, "resume.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        self.assertEqual(result, "DOCX extracted text")

    def test_extract_text_html(self):
        content = b"<html><body><p>HTML extracted text</p></body></html>"
        result = extract_text(content, "resume.html", "text/html")
        self.assertIn("HTML extracted text", result)

    @patch('resume_parser.extractor.pdfplumber.open')
    def test_extract_text_pdf_with_tables(self, mock_pdf_open):
        # Mock PDF page with text and table
        mock_page = MagicMock()
        mock_page.extract_text.return_value = "Normal text before table"
        mock_page.extract_tables.return_value = [
            [
                ["Skill", "Proficiency"],
                ["Python", "Expert"],
                ["TypeScript", "Intermediate"]
            ]
        ]
        
        mock_pdf = MagicMock()
        mock_pdf.pages = [mock_page]
        mock_pdf_open.return_value.__enter__.return_value = mock_pdf
        
        content = b"%PDF-1.4..."
        result = extract_text(content, "resume.pdf", "application/pdf")
        
        self.assertIn("Normal text before table", result)
        self.assertIn("--- STRUCTURED TABLES DETECTED ---", result)
        self.assertIn("[Table Type: Skills Matrix]", result)
        self.assertIn("| Skill | Proficiency |", result)
        self.assertIn("| Python | Expert |", result)
        self.assertIn("| TypeScript | Intermediate |", result)

if __name__ == '__main__':
    unittest.main()
