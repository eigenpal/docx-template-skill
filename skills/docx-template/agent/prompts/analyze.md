# Analyze Prompt — Interpreting DOCX Analysis Results

When you receive the JSON output from `analyze.js`, follow these steps:

## Reading the AnalysisResult

The JSON has these sections:
- **paragraphs**: All paragraphs with text, runs (with styles), and style names
- **tables**: Tables with rows and cells, including `headerRow` detection
- **headers/footers**: Content from document headers and footers
- **suggestedFields**: Auto-detected candidates for template variables
- **plainText**: Mammoth-extracted clean text (useful for full-text search)

## Interpreting Suggested Fields

The analyzer detects patterns automatically. Map them to meaningful tag names:

| Detected Pattern | Default Tag | Contextual Alternatives |
|-----------------|-------------|------------------------|
| Date | `date` | `invoiceDate`, `contractDate`, `startDate` |
| Email | `email` | `senderEmail`, `recipientEmail` |
| Currency | `amount` | `total`, `subtotal`, `unitPrice`, `discount` |
| Phone | `phone` | `officePhone`, `mobile`, `fax` |
| Repeating rows | `items` | `lineItems`, `employees`, `tasks` |

## Document Type Heuristics

### Invoices
Look for: company logo area, invoice number, date, bill-to/ship-to addresses, line item table, subtotal/tax/total
- Typical variables: `invoiceNumber`, `invoiceDate`, `client.name`, `client.address`, `items` (loop), `subtotal`, `tax`, `total`

### Letters
Look for: sender address, date, recipient address, salutation, body, closing, signature
- Typical variables: `senderName`, `date`, `recipientName`, `recipientAddress`, `subject`, `body`

### Contracts
Look for: parties, effective date, terms, signature blocks
- Typical variables: `partyA.name`, `partyB.name`, `effectiveDate`, `terms` (may be conditional sections), `signatureDate`

### Reports
Look for: title, date range, data tables, summary sections
- Typical variables: `reportTitle`, `dateRange`, `data` (loop), `summary`

## Questions to Ask the User

After presenting the analysis, ask:

1. "I found these potential template fields: [list]. Which should become variables?"
2. "This table has [N] data rows — should it be a loop? What should the items be called?"
3. "Are there any sections that should only appear conditionally?"
4. "Are there any values I missed that should also be templated?"

## Comparing Multiple Examples

If the user provides multiple example files:
1. Run analysis on each
2. Compare paragraph text across examples
3. Text that **differs** between examples → likely a variable
4. Text that **stays the same** → likely static content
5. Present the diff to the user for confirmation
