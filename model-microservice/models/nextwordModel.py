import pdfplumber
import re
from datetime import datetime

def extract_text_from_pdf(pdf_path):
    # Open the PDF and extract the text from each page
    with pdfplumber.open(pdf_path) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()
        return text

def validate_citizenship_document(pdf_path):
    # Extract text from PDF
    document_text = extract_text_from_pdf(pdf_path)

    # Print the extracted text (for debugging purposes)
    print("Extracted Text:", document_text)

    # Define regex patterns for Nepali citizenship number (e.g., numeric and hyphen)
    citizenship_number_pattern = r'\d{4}-\d{5}'  # Example pattern for citizenship number
    issue_date_pattern = r'\d{4}-\d{2}-\d{2}'  # Assuming the issue date is in YYYY-MM-DD format

    # Search for the citizenship number and issue date in the text
    citizenship_number_match = re.search(citizenship_number_pattern, document_text)
    issue_date_match = re.search(issue_date_pattern, document_text)

    if not citizenship_number_match:
        return "Citizenship number not found or invalid format."

    if not issue_date_match:
        return "Issue date not found or invalid format."

    # Validate the issue date (it should not be in the future)
    issue_date = issue_date_match.group(0)
    try:
        issue_date_obj = datetime.strptime(issue_date, "%Y-%m-%d")
    except ValueError:
        return "Invalid issue date format. It should be YYYY-MM-DD."

    if issue_date_obj > datetime.now():
        return "Issue date cannot be in the future."

    return "Document is valid."

# Example usage:
pdf_path = r"C:\code_fest_hyvemind_hackathon_project\model-microservice\models\PDFTankey.pdf"
validation_result = validate_citizenship_document(pdf_path)
print(validation_result)
