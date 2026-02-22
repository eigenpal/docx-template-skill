# Generate Prompt — Creating Template Field Mappings

## Building field-mapping.json

After the user confirms which fields to template, construct the mapping:

### Variables Section

Map exact text values to tag names:
```json
{
  "variables": {
    "Exact text from document": "camelCaseTagName"
  }
}
```

Rules:
- Keys must be **exact matches** of text in the document
- Values are camelCase tag names
- Order matters: longer/more specific matches first to avoid partial replacements
- Include text from headers/footers if needed (processed automatically)

### Loops Section

For table-based loops:
```json
{
  "loops": [
    {
      "tag": "items",
      "tableIndex": 0,
      "startRow": 1,
      "fields": {
        "description": 0,
        "quantity": 1,
        "unitPrice": 2,
        "total": 3
      }
    }
  ]
}
```

- `tableIndex`: 0-based index of the table in the document
- `startRow`: First data row (usually 1, after header at row 0)
- `fields`: Maps tag names to 0-based column indices

### Conditionals Section

For paragraphs that should appear conditionally:
```json
{
  "conditionals": [
    {
      "tag": "showDiscount",
      "paragraphText": "Discount: 10%"
    }
  ]
}
```

- `paragraphText`: Partial text match to find the target paragraph
- The paragraph gets wrapped with `{#tag}` and `{/tag}`

## Creating sample_data.json

Generate sample data matching every tag in the template:

```json
{
  "companyName": "Acme Corporation",
  "invoiceDate": "March 15, 2025",
  "items": [
    { "description": "Widget A", "quantity": 10, "unitPrice": "$5.00", "total": "$50.00" },
    { "description": "Widget B", "quantity": 5, "unitPrice": "$12.00", "total": "$60.00" }
  ],
  "subtotal": "$110.00",
  "showDiscount": true,
  "discount": "$11.00",
  "total": "$99.00"
}
```

Rules:
- Every template tag must have a corresponding key
- Loop tags need arrays of objects
- Conditional tags need boolean values
- Use realistic sample values that match the document context
- Keep the same formatting (currency symbols, date formats) as the original

## Validation Checklist

After generating the template:
1. All `{tags}` appear in the output DOCX XML
2. Loop tags `{#tag}` and `{/tag}` are properly paired
3. No orphaned open/close tags
4. The template loads in docxtemplater without errors
5. Rendering with sample_data.json produces a valid document

## Common Pitfalls

1. **Partial matches**: "John" might match "Johnson" — use the longest unique string
2. **Repeated values**: If "Acme Corp" appears in multiple places, all instances get replaced (usually desired)
3. **Run-split text**: If replacement fails silently, the text may be split across XML runs differently than expected. Check the raw XML.
4. **Table structure**: Verify `tableIndex` by counting tables in the analysis output
5. **Currency formatting**: Include the currency symbol in the sample data to match original formatting
